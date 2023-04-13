from flask import request, jsonify,Blueprint
from flaskr.db import *
bp = Blueprint('project', __name__, url_prefix='/projects')

@bp.route('')
def getProjectList():
    user_id = int(request.headers.get('user_id'))
    role = request.values.get('role').lower()
    sql = f"SELECT DISTINCT up.user_id, p.actual_budget, p.estimated_budget, p.funded, a.application_id, t.agreement_id, p.creator_user_id, p.description, p.project_id, p.start_date, p.title, t.version, t.agr_state, a.app_state\
        FROM project p\
        LEFT OUTER JOIN (SELECT project_id, agreement_id, agr_state, version FROM agreement a1 WHERE version >= ALL(SELECT version FROM agreement a2 WHERE a1.agreement_id=a2.agreement_id ) GROUP BY project_id, agreement_id) AS t\
        ON p.project_id = t.project_id\
        JOIN application a ON p.project_id = a.project_id\
        JOIN user_project up ON up.project_id = p.project_id\
        WHERE up.user_id = {user_id} AND up.is_{role} = 1;"
    res = getdata(sql, 'all')
    return jsonify(res)

@bp.route('/<int:project_id>')
def getProjectInfo(project_id):
    # get parameter
    user_id = int(request.headers.get('user_id'))
    
    #get user project info
    sql1 = f"SELECT * FROM user_project JOIN project ON user_project.project_id = project.project_id WHERE project.project_id = {project_id} AND user_project.user_id = {user_id};"
    #getdata is one of the function defined in db.py
    role_info = getdata(sql1, 'one')

    #get group number info
    sql2 = f"SELECT user.user_id, user.user_name FROM user_project JOIN user ON user.user_id = user_project.user_id WHERE user_project.project_id = {project_id};"
    group_num_info = getdata(sql2, 'all')
    
    #get application state
    sql3 = f"SELECT app_state, application_id FROM application WHERE project_id = {project_id};"
    app_state = getdata(sql3, 'one')
    sql4 =  f"SELECT agreement_id, agr_state,version FROM agreement WHERE project_id = {project_id} ORDER BY version DESC;"
    agr_state = getdata(sql4,'one')
    if role_info and group_num_info:
        if role_info.get('profile_picture'):
            del role_info['profile_picture']
        if role_info.get('cover_image'):
            del role_info['cover_image']
        role_info['group_num_info'] = group_num_info
        if app_state:
            role_info.update(app_state)
        else:
            role_info.update({'app_state': None, 'application_id': None})
        if agr_state:
            role_info.update(agr_state)
        else:
            role_info.update({'agreement_id': None, 'agr_state': None})
        return jsonify(role_info)
    return jsonify()

@bp.route('/<int:project_id>/agreements', methods=['POST'])
def createProjectAgreement(project_id):
    sql1 = f"INSERT INTO agreement (agreement_id, project_id, content, version, agr_state, created_time)\
        VALUES ({project_id}, {project_id}, '', 1, 0, '{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}');"
    lead_researcher = getdata(f"SELECT user_id FROM researcher_application WHERE application_id={project_id} AND is_lead_researcher=1;", 'one')['user_id']
    sql2 = f"INSERT INTO researcher_agreement (agreement_id, user_id, permission, is_lead_researcher)\
        VALUES ({project_id},{lead_researcher}, 2, 1);"
    sql3 = f"SELECT * FROM director_application WHERE application_id={project_id};"
    try:
        modifydata(sql1)
        modifydata(sql2)
        for i in getdata(sql3, 'all'):
            sql4 = f"INSERT INTO director_agreement (agreement_id, user_id, rank)\
                VALUES ({project_id}, {i['user_id']}, {i['rank']});"
            modifydata(sql4)
    except:
        return jsonify({'ok':0})
    return jsonify({'ok':1})