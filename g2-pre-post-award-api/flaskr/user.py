from flask import request, jsonify, Blueprint
from flaskr.db import *

bp = Blueprint('user', __name__, url_prefix='/users')

@bp.route('/login', methods=['POST'], strict_slashes=False)
def login():
    #in fact , "email" is unique so email is true username in IT
    #"user_name" means the name of user. Different users can have some "user_name" 
    #but we can not change it right now, because it is a common database, 
    #this column name is defined by other group

    email = request.json.get('email')
    password = request.json.get('password')
    sql1 = f"SELECT * FROM user WHERE email = '{email}' AND pass_word = '{password}';"
    user_info = getdata(sql1, 'one')
    if user_info:
        sql2 = f"SELECT * FROM user_project WHERE user_id={user_info['user_id']}"
        user_pro_info = getdata(sql2, 'one')
        if user_info.get('profile_picture'):
            del user_info['profile_picture']
        user_info.update(user_pro_info)
        return jsonify(user_info)
    return jsonify()

@bp.route('/', strict_slashes=False)
def getUsers():
    # get parameter
    user_id = int(request.headers.get('user_id'))
    username = request.values.get('query')
    same_org =  request.values.get('same_org')
    sql = f"SELECT * FROM user WHERE user_name LIKE '%{username}%';"
    user_info = pd_getdata(sql)
    if same_org =='1':
        org = user_info[user_info['user_id'] == user_id]['organization'].values[0]
        user_info = user_info[user_info['organization']==org]
    if user_info.empty:
        return jsonify()
    return jsonify(list(user_info.to_dict(orient='records')))