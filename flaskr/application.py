from flask import request, jsonify, Blueprint
from flaskr.db import *
from datetime import datetime
bp = Blueprint('application', __name__, url_prefix='/applications')


@bp.route('')
def getApplicationList():
    status = request.values.get('status')
    user_id = request.headers.get('user_id')
    if status == None:
        sql = f"SELECT p.project_id, p.title, app.application_id, app.app_state, p.estimated_budget, da.rank FROM project p JOIN application app ON p.project_id = app.project_id JOIN director_application da ON app.application_id = da.application_id WHERE da.user_id = {user_id} ORDER BY da.rank DESC;"
    else:
        sql = f"SELECT p.project_id, p.title, app.application_id, app.app_state, p.estimated_budget, da.rank FROM project p JOIN application app ON p.project_id = app.project_id JOIN director_application da ON app.application_id = da.application_id WHERE app.app_state = {status} AND da.user_id = {user_id} ORDER BY da.rank DESC;"
    try:
        res = getdata(sql, 'all')
    except:
        return jsonify({'ok':0})
    return jsonify(res)


@bp.route('/<int:application_id>')
def getApplication(application_id):
    role = request.headers.get('user_role').lower()
    user_id = int(request.headers.get('user_id'))
    #Query the information of rank and Application
    sql1 = f"SELECT a.*,ra.*  FROM application a JOIN {role}_application ra ON ra.application_id=a.application_id WHERE a.application_id = {application_id} AND ra.user_id={user_id};"
    application = getdata(sql1, 'one')
    if application:
        #Query the information of project approver
        sql2 = f"SELECT approver_application.*, user.user_name FROM user JOIN approver_application ON user.user_id = approver_application.user_id WHERE application_id = {application_id};"
        approver_info = getdata(sql2, 'all')
        #Query information of project members
        sql3 = f"SELECT user.user_id, user.user_name FROM user_project JOIN user ON user.user_id = user_project.user_id WHERE user_project.project_id = {application['project_id']};"
        group_num_info = getdata(sql3, 'all')
        #Query the name of the project applicant
        sql4 = f"SELECT user_name AS lead_researcher_name FROM user WHERE user_id={application['lead_researcher_id']}"
        lead_researcher_name = getdata(sql4, 'one')
        application.update(lead_researcher_name)
        application['approver'] = approver_info
        application['group_number'] = group_num_info
        return jsonify(application)
    return jsonify()


@bp.route('/<int:application_id>', methods=['PUT'])
def saveApplication(application_id):
    content = request.json.get('content')
    sql = f"UPDATE application SET content = '{content}', altered_time='{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}'  WHERE application_id = {application_id};"
    try:
        modifydata(sql)
    except:
        return jsonify({'ok':0})
    return jsonify({'ok':1})

@bp.route('/<int:application_id>', methods=['POST'])
def submitApplication(application_id):
    state = request.json.get('state')
    content = request.json.get('content')
    sql1 = f"UPDATE application SET app_state = {state}, content = '{content}', altered_time='{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}' WHERE application_id = {application_id};"
    #如果有reject，就刷新这个状态
    sql2 = f"SELECT DISTINCT app_status FROM approver_application WHERE application_id = {application_id} AND app_status=2;"
    sql3 = f"UPDATE approver_application SET app_status=0 WHERE application_id={application_id} AND app_status=1;"
    try:
        modifydata(sql1)
        modifydata(sql3)
        if getdata(sql2,'one'):
            sql4 = f"UPDATE approver_application SET app_status=0 WHERE application_id={application_id};"
            modifydata(sql4)
    except:
        return jsonify({'ok':0})
    return jsonify({'ok':1})


@bp.route('/<int:application_id>/status')
def getApplicationStatus(application_id):
    user_id = int(request.headers.get('user_id'))# get parameter
    role = request.headers.get('user_role').lower()
    sql1 = f"SELECT * FROM application a JOIN project p ON p.project_id=a.project_id WHERE application_id={application_id};"
    app_info = getdata(sql1,'one')
    if app_info.get('cover_image'):
        del app_info['cover_image']
    sql2 = f"SELECT user.*, aa.* FROM user JOIN approver_application aa ON aa.user_id=user.user_id WHERE aa.application_id={application_id};"
    user_aa = pd_getdata(sql2)
    sql3 = f"SELECT * FROM {role}_application WHERE user_id = {user_id} AND application_id = {application_id};"
    app_state = getdata(sql3,'one')
    if app_info and app_state and not user_aa.empty:
        app_info['organization'] = list(user_aa.groupby('organization').apply(lambda x: {'name':x['organization'].iloc[0], 'approver':x.to_dict(orient='records')}))
        return jsonify({**app_info,**app_state})
    return jsonify()


@bp.route('/<int:application_id>/ranks', methods=['POST'])
def rankApplication(application_id):
    user_id = int(request.headers.get('user_id'))
    before_id = request.json.get('before')
    after_id = request.json.get('after')
    if before_id:
        sql1 = f"SELECT rank FROM director_application WHERE application_id = {before_id};"
        before_rank = getdata(sql1, 'one')['rank']
    if after_id:
        sql2 = f"SELECT rank FROM director_application WHERE application_id = {after_id};"
        after_rank = getdata(sql2, 'one')['rank']
    if before_id and after_id:
        new_rank = (before_rank + after_rank)//2
    elif before_id:
        new_rank = before_rank -100
    elif after_id:
        new_rank = after_rank +100
    sql3=f"UPDATE director_application SET rank = {new_rank} WHERE application_id = {application_id} and user_id = {user_id};"
    try:
        modifydata(sql3)
    except:
        return jsonify({'ok':0})
    return jsonify({'ok':1})

@bp.route('/<int:application_id>/approve', methods=['POST'])
def approveApplication(application_id):
    user_id = int(request.headers.get('user_id'))
    status = int(request.json.get('status'))
    comments = request.json.get('content')
    sql1 = f"UPDATE approver_application SET app_status = {status}, comments = '{comments}' WHERE application_id = {application_id} and user_id = {user_id};"
    sql2 = f"SELECT DISTINCT app_status FROM approver_application WHERE application_id={application_id};"
    try:
        #Not only modify this data table, but also check whether another data table needs to be modified
        modifydata(sql1)
        if status ==3 and len(getdata(sql2,'all')) ==1:
            sql3 = f"UPDATE application SET app_state=4 WHERE application_id={application_id};"
            modifydata(sql3)
        elif status ==2 or status==1:
            sql4 = f"UPDATE application SET app_state=3 WHERE application_id={application_id};"
            modifydata(sql4)
    except:
        return jsonify({'ok':0})
    return jsonify({'ok':1})


@bp.route('/approver')
def getApplicationTask():
    user_id = int(request.headers.get('user_id'))
    sql = f"SELECT a.*, p.*,rank,da.user_id, aa.* FROM application a\
            JOIN project p ON a.project_id=p.project_id\
            JOIN approver_application aa ON aa.application_id = a.application_id\
            JOIN director_application da ON da.application_id = a.application_id\
            JOIN user dau ON da.user_id = dau.user_id\
            JOIN user aau ON aa.user_id = aau.user_id\
            WHERE aa.user_id={user_id} AND aau.organization= dau.organization\
            ORDER BY rank DESC;"
    res = getdata(sql, 'all')
    return jsonify(res)

@bp.route('/<int:application_id>/colloborators')
def getColloboratorList(application_id):
    user_id = request.headers.get('user_id')
    sql = f"SELECT distinct user_id, permission, user_name, organization FROM researcher_application natural join application natural join user WHERE application_id = '{application_id}';"
    sql1 = f"SELECT permission FROM researcher_application WHERE user_id = '{user_id}' AND application_id = '{application_id}'"
    try:
       res = getdata(sql,'all')
       res1 = getdata(sql1,'one')
       res1['list'] = res
       return jsonify(res1)
    except:
       return jsonify({'ok':0})


#for researcher, Create
@bp.route('/<int:application_id>/colloborators', methods=['POST'])
def inviteColloborator(application_id):
    user_id = request.json.get('user_id')
    permission = request.json.get('permission')
    sql = f"SELECT project_id from application WHERE application_id = '{application_id}';"
    project_id = getdata(sql,'one').get('project_id')
    try:
        sql1 = f"SELECT project_id from user_project WHERE user_id = {user_id} AND project_id = {project_id};"
        res = getdata(sql1, 'all')
        if len(res) == 1:
            sql2 = f"INSERT INTO researcher_application(application_id,user_id,permission) values({application_id},{user_id},{permission});"
            modifydata(sql2)
        else:
            sql3 = f"INSERT INTO user_project VALUES('{user_id}','{project_id}',1,0,0);"
            modifydata(sql3)
            sql4 = f"INSERT INTO researcher_application(application_id,user_id,permission) values({application_id},{user_id},{permission});"
            modifydata(sql4)
    except:
        return jsonify({'ok':0})
    else:
        return jsonify({'ok':1})

#for researcher, Update
@bp.route('/<int:application_id>/colloborators', methods=['PUT'])
def assignColloboratorPermission(application_id):
    permission = request.json.get('permission')
    user_id = request.json.get('user_id')
    sql = f"UPDATE researcher_application SET permission = '{permission}' WHERE user_id = '{user_id}' and application_id = '{application_id}'; "
    try:
        modifydata(sql)
        return jsonify({'ok':1})
    except:
        return jsonify({'ok':0})

#for researcher, Delete
@bp.route('/<int:application_id>/colloborators', methods=['DELETE'])
def deleteColloborator(application_id):
    user_id = request.json.get('user_id')
    sql = f"SELECT distinct agreement_id from application join project using(project_id) join agreement using(project_id)  where application_id = {application_id}"
    agreement_id = getdata(sql,'one')['agreement_id']
    sql4 = f"SELECT project_id from application natural join project where application_id = {application_id}"
    project_id = getdata(sql4,'one')['project_id']
    try:
        #Not only modify this data table, but also check whether another data table needs to be modified
        sql1 = f"SELECT user_id FROM researcher_agreement WHERE agreement_id={agreement_id} AND user_id = {user_id};"
        res = getdata(sql1)
        if len(res) == 1:
            sql2 = f"DELETE FROM researcher_application WHERE application_id = '{application_id}' AND user_id = '{user_id}';"
            modifydata(sql2)
        elif len(res) == 0:
            sql4 = f"DELETE FROM user_project WHERE project_id={project_id} AND user_id = {user_id};"
            modifydata(sql4)
            sql3 = f"DELETE FROM researcher_application WHERE application_id = '{application_id}' AND user_id = '{user_id}';"
            modifydata(sql3)
    except:
        return jsonify({'ok':0})
    else:
        return jsonify({'ok':1})

#for director, Create
@bp.route('/<int:application_id>/approvers', methods=['POST'])
def inviteApplicationApprover(application_id):
    approver_id = request.json.get('user_id')
    try:
        sql1 = f"SELECT user_id FROM approver_application where application_id = '{application_id}'"
        res = getdata(sql1,'all')
        if len(res) == 0:
            sql = f"INSERT INTO approver_application(application_id,user_id) values('{application_id}','{approver_id}');"
            modifydata(sql)
            sql2 = f"UPDATE application SET app_state=2 WHERE application_id = '{application_id}'"
            modifydata(sql2)
        else:
            sql3 = f"INSERT INTO approver_application(application_id,user_id) values('{application_id}','{ approver_id}');"
            modifydata(sql3)
    except:
        return jsonify({'ok':0})
    else:
        return jsonify({'ok':1})

#for director, Delete
@bp.route('/<int:application_id>/approvers', methods=['DELETE'])
def deleteApplicationApprover(application_id):
    approver_id = request.json.get('user_id')
    try:
        #Not only modify this data table, but also check whether another data table needs to be modified
        sql1 = f"SELECT user_id from approver_application WHERE application_id = '{application_id}'"
        res = getdata(sql1,'all')
        if len(res) == 1:
            sql = f"DELETE FROM approver_application WHERE application_id='{application_id}' AND user_id='{approver_id}'; "
            modifydata(sql)
            sql2 = f"UPDATE application SET app_state=1 WHERE application_id = '{application_id}'; "
            modifydata(sql2)
        else:
            sql3 = f"DELETE FROM approver_application WHERE application_id='{application_id}' AND user_id='{approver_id}'; "
            modifydata(sql3)
    except:
        return jsonify({'ok':0})
    else:
        return jsonify({'ok':1})

