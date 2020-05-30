from app import db
from sqlalchemy import desc


class Tasks(db.Model):
    """
    task list storage in Tasks table in the database
    """
    __tablename__ = "Tasks"

    id = db.Column(db.Integer, primary_key=True)
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
    def get_active():
        return Tasks.query.filter_by(task_is_archived='f').order_by('task_due_date').all()

    @staticmethod
    def get_archived():
        return Tasks.query.filter_by(task_is_archived=True).all()

    @staticmethod
    def get_by_priority():
        return Tasks.query.filter_by(task_is_archived='f').order_by(desc('task_priority')).all()

    @staticmethod
    def get_by_label():
        return Tasks.query.filter_by(task_is_archived='f').order_by(db.case(((Tasks.task_type=="Work",1),(Tasks.task_type=="Personal",2),(Tasks.task_type=="Shopping",3)))).all()
