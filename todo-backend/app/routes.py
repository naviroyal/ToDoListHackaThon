import datetime
import json

import pytz as pytz
from flask import request, jsonify
from app import app, db
from app.models import Tasks,Admins
from flask import session
from werkzeug.security import generate_password_hash, check_password_hash


@app.route('/')
def test():
    """Serves functionality to test weather the server is working or not"""
    return app.send_static_file('index.html')


@app.route('/login', methods=['POST', 'GET'])
def login_post():
    if request.method == "POST":
        content = request.get_json()
        password = content['password']
        email = content['email']
        print(email, password)
        d={'success':True}
        user = Admins.query.filter_by(email=email).first()
        if user and user.password == password:
            session['email'] = user.email
            print('yeah')
            return json.dumps(d)
        # if not user or not check_password_hash(user.password, password):
        #     print(jsonify("BAD request login"))
        #     return json.dumps("BAD request login")
        else:
            print('yup')
            d['success']=False
            return json.dumps(d)



@app.route('/signup', methods=['POST', 'GET'])
def signup_post():
    if request.method == "POST":
        content = request.get_json()
        username = content['username'],
        password = content['password'],
        gender = content['gender'],
        email = content['email']
        temp_password = password
        phone_number = content['phone_number']
        try:
            admin = Admins(
                username=username,
                password=temp_password,
                email=email,
                gender=gender,
                phone_number=phone_number
            )
            db.session.add(admin)
            db.session.commit()
        except Exception as e:
            return str(e)
        return 'success'


@app.route('/logout')
def logout():
    if 'email' in session:
        session.pop('email', None)
        return "you are logged out"
    else:
        return "User Not logged in!"


@app.route('/add-task', methods=["GET", "POST","PUT"])
def add_task():
    if request.method == "POST":
        content = request.get_json()
        id = content['id']
        email=content['email']
        task_header = content['task_header']
        task_due_date = content['task_due_date']
        task_type = content['task_type']
        task_description = content['task_description']
        task_points = content['task_points']
        task_status = content['task_status']
        task_priority = content['task_priority']
        task_is_archived = False
        new_task = Tasks(id=id,
                         email=email,
                         task_header=task_header,
                         task_due_date=task_due_date,
                         task_priority=task_priority,
                         task_description=task_description,
                         task_status=task_status,
                         task_points=task_points,
                         task_type=task_type,
                         task_is_archived=task_is_archived
                         )
        db.session.add(new_task)
        db.session.commit()

        return "Success"

    elif  request.method == "GET":
        print(request.args.get('email'))
        results = Tasks.get_active(request.args.get('email'))
        items = []
        response = None
        for result in results:
            obj = {
                'id': result.id,
                'task_header': result.task_header,
                'task_description': result.task_description,
                'task_type': result.task_type,
                'task_priority': result.task_priority,
                'task_points': result.task_points,
                'task_status': result.task_status,
                'task_is_archived': result.task_is_archived,
                'task_due_date': result.task_due_date
            }
            items.append(obj)
            response = jsonify(items)
        if response is None:
            s='empty'
            print(s)
            return s
        return response

    if  request.method == "PUT":
        content = request.get_json()
        data = Tasks.query.filter_by(id=content['id']).first()
        data.task_is_archived = True
        db.session.commit()

        return "Success put"


@app.route('/update-status', methods=["GET","PUT"])
def update_status():
    if request.method == "PUT":
        content = request.get_json()
        data = Tasks.query.filter_by(id=content['id']).first()
        print(content['task_status'])
        data.task_status = content['task_status']
        db.session.commit()

        return "Success put"


@app.route('/task-by-priority',methods=["GET"])
def get_by_priorities():
    if request.method == "GET":
        results = Tasks.get_by_priority(request.args.get('email'))
        print(results);
        items = []
        response = None
        for result in results:
            obj = {
                'id': result.id,
                'task_header': result.task_header,
                'task_description': result.task_description,
                'task_type': result.task_type,
                'task_priority': result.task_priority,
                'task_points': result.task_points,
                'task_status': result.task_status,
                'task_is_archived': result.task_is_archived,
                'task_due_date': result.task_due_date
            }
            items.append(obj)
            response = jsonify(items)
        if response is None:
            s = 'empty'
            print(s)
            return s
        return response


@app.route('/task-by-label',methods=["GET"])
def get_by_label():
    if request.method == "GET":
        results = Tasks.get_by_label(request.args.get('email'))
        print(results);
        items = []
        response = None
        for result in results:
            obj = {
                'id': result.id,
                'task_header': result.task_header,
                'task_description': result.task_description,
                'task_type': result.task_type,
                'task_priority': result.task_priority,
                'task_points': result.task_points,
                'task_status': result.task_status,
                'task_is_archived': result.task_is_archived,
                'task_due_date': result.task_due_date
            }
            items.append(obj)
            response = jsonify(items)
        if response is None:
            s = 'empty'
            print(s)
            return s
        return response