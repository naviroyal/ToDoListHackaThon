from app import db
from sqlalchemy import desc, Integer, ForeignKey,String


class Admins( db.Model):
    __tablename__ = 'admins'
    id = db.Column(db.Integer,unique=True)
    username = db.Column(db.String(100), index=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)
    phone_number = db.Column(db.String(64), nullable=False)
    email = db.Column(db.String(100), nullable=False, primary_key=True)
    gender = db.Column(db.String(64),nullable=False)


# class adminTaskConnect(db.Model):
#     __tablename__='AdminTaskConnect'
#     id=db.Column(Integer,primary_key=True)
#     AdminsEmail=db.Column(String,ForeignKey("Admins.email"))
#     TasksId=db.Column(Integer,ForeignKey("Tasks.id"))
#

class Tasks(db.Model):
    """
    task list storage in Tasks table in the database
    """
    __tablename__ = "Tasks"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100))
    task_header = db.Column(db.String(150))
    task_description = db.Column(db.Text)
    task_type = db.Column(db.String(50))
    task_priority = db.Column(db.String(50))
    task_points = db.Column(db.Integer)
    task_status = db.Column(db.String(50))
    task_is_archived = db.Column(db.Boolean)
    task_due_date = db.Column(db.DateTime())


    @staticmethod
    def get_all():
        return Tasks.query.all()


    @staticmethod
    def get_active(email):
        return Tasks.query.filter_by(task_is_archived='f',email=email).order_by('task_due_date').all()

    @staticmethod
    def get_archived(email):
        return Tasks.query.filter_by(task_is_archived=True,email=email).all()

    @staticmethod
    def get_by_priority(email):
        return Tasks.query.filter_by(task_is_archived='f',email=email).order_by(desc('task_priority')).all()

    @staticmethod
    def get_by_label(email):
        return Tasks.query.filter_by(task_is_archived='f',email=email).order_by(db.case(((Tasks.task_type=="Work",1),(Tasks.task_type=="Personal",2),(Tasks.task_type=="Shopping",3)))).all()
