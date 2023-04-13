from flask import request, jsonify, Blueprint
from flaskr.db import *
from datetime import datetime
bp = Blueprint('agreement', __name__, url_prefix='/agreements')


@bp.route('')
def getAgreementList():
    user_id = int(request.headers.get('user_id'))
    status = request.values.get('status')
    sql = f"SELECT p.*,a.*,rank FROM agreement a JOIN project p ON a.project_id = p.project_id JOIN director_agreement da ON da.agreement_id=a.agreement_id WHERE da.user_id={user_id};"
    data = pd_getdata(sql)
    if data.empty:
        return jsonify([])
    res = data.groupby('agreement_id').apply(lambda x:x.sort_values(by=['version'],ascending=False).iloc[0])
    if status:
        status=int(status)
        res = res[res['agr_state']==status]
    if res.empty:
        return jsonify([])
    res =list(res.sort_values(by=['rank'],ascending=False).to_dict(orient='records'))
    return jsonify(res)


@bp.route('/<int:agreement_id>')
def getAgreement(agreement_id):
    role = request.headers.get('user_role').lower()
    user_id = request.headers.get('user_id')
    if role == "researcher": 
        sql = f"SELECT u.user_name, a.content, a.version, ra.permission, a.agr_state FROM agreement a JOIN researcher_agreement ra ON ra.agreement_id = a.agreement_id JOIN application ap  ON ap.project_id = a.project_id  JOIN user u  ON ap.lead_researcher_id = u.user_id WHERE a.agreement_id = {agreement_id} AND ra.user_id = {user_id} ORDER BY version DESC limit 1;"
    elif role == "director":
        sql = f"SELECT u.user_name, a.content, a.version, 2 as permission, a.agr_state FROM agreement a JOIN director_agreement da ON da.agreement_id = a.agreement_id JOIN application ap  ON ap.project_id = a.project_id  JOIN user u  ON ap.lead_researcher_id = u.user_id WHERE a.agreement_id = {agreement_id} AND da.user_id = {user_id} ORDER BY a.version DESC limit 1;"
    sql1 = f"SELECT u.user_name, u.user_id, aa.comments, aa.created_time FROM approver_agreement aa JOIN user u ON aa.user_id = u.user_id WHERE agreement_id = {agreement_id};"
    sql2 = f"SELECT aa.*, user_name FROM user JOIN approver_agreement aa ON user.user_id = aa.user_id WHERE agreement_id = {agreement_id};"
    try:
        res = getdata(sql, 'one')
        comments_info = getdata(sql1, 'all')
        approver_info = getdata(sql2, 'all')
    except:
        return jsonify({'ok':0})
    if comments_info:
        res['comments'] = comments_info
    else:
        res['comments'] = []
    if approver_info:
        res['approver'] = approver_info
    else:
        res['approver'] = []
    return jsonify(res)


@bp.route('/<int:agreement_id>/status')
def getAgreementStatus(agreement_id):
    user_id = int(request.headers.get('user_id'))# get parameter
    role = request.headers.get('user_role').lower()
    sql1 = f"SELECT * FROM agreement WHERE agreement_id={agreement_id} ORDER BY version DESC;"
    agr_info = getdata(sql1,'one')
    sql2 = f'SELECT user.*, aa.* FROM user JOIN approver_agreement aa ON aa.user_id=user.user_id WHERE aa.agreement_id={agreement_id};'
    user_aa = pd_getdata(sql2)
    sql3 = f"SELECT * FROM {role}_agreement WHERE user_id = {user_id} AND agreement_id = {agreement_id};"
    agr_state = getdata(sql3, 'one')
    if agr_info and agr_state and not user_aa.empty:
        agr_info['organization'] = list(user_aa.groupby('organization').apply(lambda x: {'name':x['organization'].iloc[0], 'approver':x.to_dict(orient='records')}))
        return jsonify({**agr_info, **agr_state})
    return jsonify()


#for director
@bp.route('/<int:agreement_id>/ranks', methods=['POST'])
def rankAgreement(agreement_id):
    user_id = int(request.headers.get('user_id'))
    before_id = int(request.json.get('before'))
    after_id = int(request.json.get('after'))
    if before_id:
        sql1 = f"SELECT rank FROM director_agreement WHERE agreement_id = {before_id};"
        before_rank = getdata(sql1, 'one')['rank']
    if after_id:
        sql2 = f"SELECT rank FROM director_agreement WHERE agreement_id = {after_id};"
        after_rank = getdata(sql2, 'one')['rank']
    if before_id and after_id:
        new_rank = (before_rank + after_rank)//2
    elif not before_id:
        new_rank = after_rank +100
    elif not after_id:
        new_rank = before_rank -100
    sql3=f"UPDATE director_agreement SET rank = {new_rank} WHERE agreement_id = {agreement_id} and user_id = {user_id};"
    try:
        modifydata(sql3)
    except:
        return jsonify({'ok':0})
    return jsonify({'ok':1})


#for approver
@bp.route('/<int:agreement_id>/approve', methods=['POST'])
def approveAgreement(agreement_id):
    user_id = int(request.headers.get('user_id'))
    status = int(request.json.get('status'))
    comments = request.json.get('content')
    sql1 = f"UPDATE approver_agreement SET agr_status = {status}, comments = '{comments}' WHERE agreement_id = {agreement_id} AND user_id = {user_id};"
    sql2 = f"SELECT DISTINCT agr_status FROM approver_agreement WHERE agreement_id={agreement_id};"
    try:
        #Not only modify this data table, but also check whether another data table needs to be modified
        modifydata(sql1)
        if status ==3 and len(getdata(sql2,'all'))==1:
            sql3 = f"UPDATE agreement SET agr_state=4 WHERE agreement_id={agreement_id};"
            modifydata(sql3)
        elif status ==2 or status==1:
            sql4 = f"UPDATE agreement SET agr_state=3 WHERE agreement_id={agreement_id};"
            modifydata(sql4)
    except:
        return jsonify({'ok':0})
    return jsonify({'ok':1})

#for approver
@bp.route('/approver')
def getAgreementTask():
    user_id = int(request.headers.get('user_id'))
    sql = f"SELECT a.*, p.*,rank, permission, agr_status FROM agreement a \
            JOIN project p ON a.project_id=p.project_id \
            JOIN approver_agreement aa ON aa.agreement_id = a.agreement_id \
            JOIN director_agreement da ON da.agreement_id = a.agreement_id \
            JOIN user dau ON da.user_id = dau.user_id\
            JOIN user aau ON aa.user_id = aau.user_id\
            WHERE aa.user_id={user_id} AND aau.organization= dau.organization;"
    data= pd_getdata(sql)
    if data.empty:
        return jsonify([])
    res = data.groupby('agreement_id').apply(lambda x:x.sort_values(by=['version'],ascending=False).iloc[0])
    return jsonify(res.sort_values(by=['rank'],ascending=False).to_dict(orient='records'))


#for researcher, Create
@bp.route('/<int:agreement_id>/colloborators', methods=['POST'])
def inviteAgreementColloborator(agreement_id):
    user_id = request.json.get('user_id')
    permission = request.json.get('permission')
    sql = f"SELECT project_id from agreement WHERE agreement_id = '{agreement_id}';"
    project_id = getdata(sql,'one').get('project_id')
    try:
        #Not only modify this data table, but also check whether another data table needs to be modified
        sql1 = f"SELECT project_id from user_project WHERE user_id = {user_id} AND project_id = {project_id};"
        res = getdata(sql1, 'all')
        if len(res) == 1:
            sql2 = f"INSERT INTO researcher_agreement(agreement_id,user_id,permission) values({agreement_id},{user_id},{permission});"
            modifydata(sql2)
        else:
            sql3 = f"INSERT INTO user_project VALUES('{user_id}','{project_id}',1,0,0);"
            modifydata(sql3)
            sql4 = f"INSERT INTO researcher_agreement(agreement_id,user_id,permission) values({agreement_id},{user_id},{permission});"
            modifydata(sql4)
    except:
        return jsonify({'ok':0})
    else:
        return jsonify({'ok':1})


#for researcher, Update
@bp.route('/<int:agreement_id>/colloborators', methods=['PUT'])
def assignAgrColloboratorPermission(agreement_id):
    permission = request.json.get('permission')
    user_id = request.json.get('user_id')
    try:
        sql = f"UPDATE researcher_agreement SET permission = '{permission}' WHERE user_id = '{user_id}' and agreement_id = '{agreement_id}'; "
        modifydata(sql)
    except:
        return jsonify({'ok':0})
    else:
        return jsonify({'ok':1})


#for researcher, Read
@bp.route('/<int:agreement_id>/colloborators')
def getAgrColloboratorList(agreement_id):
    user_id = request.headers.get('user_id')
    sql = f"SELECT user_id, permission, user_name, organization FROM researcher_agreement join user using(user_id) WHERE agreement_id = {agreement_id};"
    sql1 = f"SELECT permission FROM researcher_agreement WHERE user_id = '{user_id}' AND agreement_id = '{agreement_id}'"
    try:
       res = getdata(sql, 'all')
       res1 = getdata(sql1,'one')
       res1['list'] = res
       return jsonify(res1)
    except:
       return jsonify({'ok':0})


#for researcher, Delete
@bp.route('/<int:agreement_id>/colloborators', methods=['DELETE'])
def deleteAgrColloborator(agreement_id):
    user_id = request.json.get('user_id')
    sql = f"SELECT distinct application_id from application join project using(project_id) join agreement using(project_id)  where agreement_id = {agreement_id}"
    application_id = getdata(sql,'one')['application_id']
    sql4 = f"SELECT project_id from agreement natural join project where agreement_id = {agreement_id}"
    project_id = getdata(sql4,'one')['project_id']
    try:
        #Not only modify this data table, but also check whether another data table needs to be modified
        sql1 = f"SELECT user_id FROM researcher_application WHERE application_id={application_id} AND user_id = {user_id};"
        res = getdata(sql1)
        if len(res) ==1:
            sql2 = f"DELETE FROM researcher_agreement WHERE agreement_id = '{agreement_id}' AND user_id = '{user_id}';"
            modifydata(sql2)
        elif len(res) == 0:
            sql3 = f"DELETE FROM researcher_agreement WHERE agreement_id = '{agreement_id}' AND user_id = '{user_id}';"
            modifydata(sql3)
            sql4 = f"DELETE FROM user_project WHERE project_id={project_id} AND user_id = {user_id};"
            modifydata(sql4)
    except:
        return jsonify({'ok':0})
    else:
        return jsonify({'ok':1})


#for director, Create
@bp.route('/<int:agreement_id>/approvers', methods=['POST'])
def inviteAgreementApprover(agreement_id):
    user_id = request.json.get('user_id')
    try:
        sql1 = f"SELECT user_id FROM approver_agreement where agreement_id = '{agreement_id}'"
        res = getdata(sql1,'all')
        if len(res) == 0:
            sql = f"INSERT INTO approver_agreement(agreement_id,user_id) values('{agreement_id}','{user_id}');"
            modifydata(sql)
            sql2 = f"UPDATE agreement SET agr_state=2 WHERE agreement_id = '{agreement_id}'AND agr_state=1 ;"
            modifydata(sql2)
        else:
            sql3 = f"INSERT INTO approver_agreement(agreement_id,user_id) values('{agreement_id}','{ user_id}');"
            modifydata(sql3)
    except:
        return jsonify({'ok':0})
    else:
        return jsonify({'ok':1})


#for director, Update
@bp.route('/<int:agreement_id>/approvers',methods=['PUT'])
def assignApproverPermission(agreement_id):
    permission = request.json.get('permission')
    user_id = request.json.get('user_id')
    sql = f"UPDATE approver_agreement SET permission = '{permission}' WHERE user_id = '{user_id}' and agreement_id = '{agreement_id}';"
    try:
        modifydata(sql)
        return jsonify({'ok':1})
    except:
        return jsonify({'ok':0})



#for director, Delete
@bp.route('/<int:agreement_id>/approvers', methods=['DELETE'])
def deleteAgreementApprover(agreement_id):
    approver_id = request.json.get('user_id')
    try:
        sql1 = f"SELECT user_id FROM approver_agreement where agreement_id = '{agreement_id}'"
        res = getdata(sql1,'all')
        if len(res) == 1:
            sql = f"DELETE FROM approver_agreement WHERE agreement_id='{agreement_id}' AND user_id='{approver_id}'; "
            modifydata(sql)
            sql2 = f"UPDATE agreement SET agr_state=1 WHERE agreement_id = '{agreement_id}' AND agr_state=2 ; "
            modifydata(sql2)
        else:
            sql3 = f"DELETE FROM approver_agreement WHERE agreement_id='{agreement_id}' AND user_id='{approver_id}'; "
            modifydata(sql3)
    except:
        return jsonify({'ok':0})
    else:
        return jsonify({'ok':1})



#for researcher
@bp.route('/<int:agreement_id>', methods=['PUT'])
def saveAgreement(agreement_id):
    content = request.json.get('content')
    content_html = request.json.get('content_html')
    sql1 = f"SELECT project_id, created_time, agr_state, MAX(a.version) AS max_version FROM agreement a WHERE a.agreement_id = '{agreement_id}' GROUP BY a.agreement_id;"
    res1 = getdata(sql1, 'one')
    version = res1['max_version'] + 1
    project_id = res1['project_id']
    created_time = res1['created_time']
    agr_state = res1['agr_state']

    sql2 = f"INSERT INTO agreement(agreement_id, project_id, content, version, created_time, agr_state, content_html) VALUES('{agreement_id}', '{project_id}', '{content}', '{version}', '{created_time}', '{agr_state}', '{content_html}');"
    try:
        modifydata(sql2)
    except:
        return jsonify({'ok':0})
    else:
        return jsonify({'ok':1})


#for researcher
@bp.route('/<int:agreement_id>', methods=['POST'])
def submitAgreement(agreement_id):
    content = request.json.get('content')
    agr_state = int(request.json.get('state'))
    sql1 = f"SELECT project_id, created_time, agr_state, MAX(a.version) AS max_version, content_html FROM agreement a WHERE a.agreement_id = '{agreement_id}' GROUP BY a.agreement_id;"
    sql2 = f"SELECT DISTINCT agr_status FROM approver_agreement WHERE agreement_id = {agreement_id} AND agr_status=2;"
    sql3 = f"UPDATE approver_agreement SET agr_status=0 WHERE agreement_id={agreement_id} AND agr_status=1;"
    try:
        res1 = getdata(sql1, 'one')
        version = res1['max_version'] + 1
        project_id = res1['project_id']
        created_time = res1['created_time']
        content_html = res1['content_html']
        sql = f"INSERT INTO agreement(agreement_id, project_id, content, version, created_time, agr_state, content_html) VALUES('{agreement_id}', '{project_id}', '{content}', '{version}', '{created_time}', '{agr_state}', '{content_html}');"
        modifydata(sql)
        modifydata(sql3)
        if  getdata(sql2,'one'):
            sql4 = f"UPDATE approver_agreement SET agr_status=0 WHERE agreement_id={agreement_id};"
            modifydata(sql4)
    except:
        return jsonify({'ok':0})
    return jsonify({'ok':1})


#for approver
@bp.route('/<int:agreement_id>/suggestion', methods=['POST'])
def commentAgreement(agreement_id):
    user_id = int(request.headers.get('user_id'))
    comments = request.json.get('comments')
    sql = f"UPDATE approver_agreement SET comments = '{comments}' WHERE agreement_id = '{agreement_id}' AND user_id = {user_id};"
    try:
        modifydata(sql)
    except:
        return jsonify({'ok':0})
    return jsonify({'ok':1})


@bp.route('/<int:agreement_id>/comments', methods=['POST'])
def postAgreementComment(agreement_id):
    user_id = request.headers.get('user_id')
    comments = request.json.get('content')
    sql = f"INSERT INTO comments (agreement_id, user_id, comments) VALUES ({agreement_id}, {user_id}, '{comments}');"
    try:
        modifydata(sql)
    except:
        return jsonify({'ok':0})
    else:
        return jsonify({'ok':1})


@bp.route('/<int:agreement_id>/comments')
def getAgreementComments(agreement_id):
    sql = f"SELECT c.user_id AS user_id, u.user_name AS user_name, c.comments AS content, c.created_time AS created_time \
            FROM comments c \
            JOIN user u \
            ON c.user_id = u.user_id \
            WHERE c.agreement_id = {agreement_id} \
            ORDER BY c.created_time ASC;"
    try:
        res = getdata(sql, 'all')
        return jsonify(res)
    except:
        return jsonify({'ok':0})


@bp.route('/<int:agreement_id>/history')
def getAgreementHistory(agreement_id):
    sql = f"SELECT agreement_id, content, version, created_time, agr_state, altered_time \
FROM agreement \
WHERE agreement_id = {agreement_id} \
ORDER BY version DESC;"
    try:
        res = getdata(sql, 'all')
        return jsonify(res)
    except:
        return jsonify({'ok':0})
