from app import db


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
    task_due_date = db.Column(db.Date())

    @staticmethod
    def get_all():
        return Tasks.query.all()

    @staticmethod
    def get_active():
        return Tasks.query.filter_by(task_is_archived='f').all()

    @staticmethod
    def get_archived():
        return Tasks.query.filter_by(task_is_archived=True).all()
