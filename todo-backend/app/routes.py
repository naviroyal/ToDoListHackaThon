import json

from flask import request, jsonify
from app import app, db
from app.models import Tasks


@app.route('/')
def test():
    """Serves functionality to test weather the server is working or not"""
    return app.send_static_file('index.html')


@app.route('/sign-in', methods=["GET", "POST"])
def sign_in():
    if request.method == "POST":
        req = request.form
        username = req.get("username")
        password = req.get("password")
        # if not username in users:
        #     print("Username not found")
        #     return redirect(request.url)
        # else:
        #     user = users[username]
        #
        # if not password == user["password"]:
        #     print("Incorrect password")
        #     return redirect(request.url)
        # else:
        #     session["USERNAME"] = user["username"]
        #     print("session username set")
        #     return redirect(url_for("profile"))
        #
        # return render_template("public/sign_in.html")


@app.route('/add-task', methods=["GET", "POST","PUT"])
def add_task():
    if request.method == "POST":
        content = request.get_json()
        # print(content);
        task_header = content['task_header']
        task_due_date = content['task_due_date']
        task_type = content['task_type']
        task_description = content['task_description']
        task_points = content['task_points']
        task_status = content['task_status']
        task_priority = content['task_priority']
        task_is_archived = False
        new_task = Tasks(task_header=task_header,
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

    elif request.method == "GET":
        results = Tasks.get_active()
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

    if request.method == "PUT":
        content = request.get_json()
        # print("successssss")
        # print(content['id'])
        data = Tasks.query.filter_by(id=content['id']).first()
        # print(data)
        data.task_is_archived = True
        # new_task = Tasks(task_header=task_header,
        #                  task_due_date=task_due_date,
        #                  task_priority=task_priority,
        #                  task_description=task_description,
        #                  task_status=task_status,
        #                  task_points=task_points,
        #                  task_type=task_type,
        #                  task_is_archived=task_is_archived
        #                  )
        # db.session.add(new_task)
        db.session.commit()

        return "Success put"