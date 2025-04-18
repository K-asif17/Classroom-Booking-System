from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    role = db.Column(db.String(20))  # cr, user, admin
    is_approved = db.Column(db.Boolean, default=False)
    cr = db.relationship('CR', backref='user', uselist=False)

class CR(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    branch = db.Column(db.String(100))
    section = db.Column(db.String(100))
    issues = db.relationship('Issue', backref='cr')

class Issue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cr_id = db.Column(db.Integer, db.ForeignKey('cr.id'))
    subject = db.Column(db.String(255))
    description = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    reply = db.relationship('AdminReply', backref='issue', uselist=False)

class AdminReply(db.Model):
    __tablename__ = 'admin_reply'
    id = db.Column(db.Integer, primary_key=True)
    issue_id = db.Column(db.Integer, db.ForeignKey('issue.id'))
    message = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    seen = db.Column(db.Boolean, default=False)  # NEW FIELD


    def __repr__(self):
        return f'<Issue {self.issue_title}>'



