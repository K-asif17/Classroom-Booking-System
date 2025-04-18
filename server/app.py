from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail, Message
from datetime import datetime
import re

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# SQLAlchemy Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Mail Configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'boydevil77740@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'qokj gjuw pnrl wdzl'  # Replace with your email password
app.config['MAIL_DEFAULT_SENDER'] = 'boydevil77740@gmail.com'  # Replace with your email
mail = Mail(app)

# Models
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(100))
    year = db.Column(db.String(10))
    section = db.Column(db.String(10))
    phone = db.Column(db.String(20))
    approved = db.Column(db.Boolean, default=False)

class CR(db.Model):
    __tablename__ = 'cr'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True)
    password = db.Column(db.String(100))
    year = db.Column(db.String(10))
    section = db.Column(db.String(10))
    phone = db.Column(db.String(20))
    batch = db.Column(db.String(10))
    issues = db.relationship('Issue', backref='cr', lazy=True)

class Issue(db.Model):
    __tablename__ = 'issue'
    id = db.Column(db.Integer, primary_key=True)
    cr_id = db.Column(db.Integer, db.ForeignKey('cr.id'))
    subject = db.Column(db.String(200))
    description = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
    resolved = db.Column(db.Boolean, default=False)
    reply = db.relationship('AdminReply', backref='issue', uselist=False)

class AdminReply(db.Model):
    __tablename__ = 'admin_reply'
    id = db.Column(db.Integer, primary_key=True)
    issue_id = db.Column(db.Integer, db.ForeignKey('issue.id'))
    message = db.Column(db.Text)
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())

# Routes
@app.route('/')
def home():
    return "Server is running!"

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    year = data.get('year')
    section = data.get('section')
    phone = data.get('phone')

    if not all([name, email, password, year, section, phone]):
        return jsonify({'success': False, 'message': 'All fields are required'}), 400

    if not email.endswith('@rguktrkv.ac.in'):
        return jsonify({'success': False, 'message': 'Invalid email domain'}), 400

    if not re.match(r'^\d{10}$', phone):
        return jsonify({'success': False, 'message': 'Invalid phone number'}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': 'Email already exists'}), 400

    new_user = User(name=name, email=email, password=password, year=year, section=section, phone=phone)

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Signup request sent for admin approval'}), 200
    except Exception:
        db.session.rollback()
        return jsonify({'success': False, 'message': 'Database error'}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'success': False, 'message': 'Email and password are required'}), 400

    if email == "admincbs@rguktrkv.ac.in" and password == "Admin@CBS":
        return jsonify({'success': True, 'message': 'Admin login successful', 'role': 'admin'}), 200

    cr = CR.query.filter_by(email=email).first()
    if cr and cr.password == password:
        return jsonify({'success': True, 'message': 'Login successful', 'user_id': cr.id, 'role': 'cr'}), 200

    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        if user.approved:
            return jsonify({'success': True, 'message': 'Login successful (User)', 'user_id': user.id, 'role': 'user'}), 200
        else:
            return jsonify({'success': False, 'message': 'User not approved yet'}), 403

    return jsonify({'success': False, 'message': 'Invalid credentials'}), 401

@app.route('/get-signup-requests', methods=['GET'])
def get_signup_requests():
    unapproved_users = User.query.filter_by(approved=False).all()

    if not unapproved_users:
        return jsonify({"success": False, "message": "No signup requests available."}), 200

    user_data = [{
        "id": user.id,
        "name": user.name,
        "email": user.email,
        "phone": user.phone,
        "section": user.section,
        "year": user.year
    } for user in unapproved_users]

    return jsonify({"success": True, "requests": user_data}), 200

@app.route('/approve-cr', methods=['POST'])
def approve_cr():
    data = request.get_json()
    user_id = data.get('id')
    phone = data.get('phone')
    batch = data.get('batch')

    if not all([user_id, phone, batch]):
        return jsonify({"error": "Missing required approval details."}), 400

    user = User.query.get(user_id)
    if user:
        new_cr = CR(name=user.name, email=user.email, password=user.password, year=user.year,
                    section=user.section, phone=phone, batch=batch)
        try:
            db.session.add(new_cr)
            db.session.delete(user)
            db.session.commit()
            return jsonify({"success": True, "message": "CR approved and moved to CR list."}), 200
        except Exception:
            db.session.rollback()
            return jsonify({"error": "An error occurred during approval."}), 500

    return jsonify({"error": "User not found."}), 400

@app.route('/reject-cr', methods=['POST'])
def reject_cr():
    data = request.get_json()
    user_id = data.get('id')

    user = User.query.get(user_id)
    if user:
        try:
            db.session.delete(user)
            db.session.commit()
            return jsonify({"success": True, "message": "Signup request rejected."}), 200
        except Exception:
            db.session.rollback()
            return jsonify({"success": False, "message": "Error while rejecting."}), 500

    return jsonify({"success": False, "message": "User not found."}), 404

@app.route('/approved-crs', methods=['GET'])
def get_approved_crs():
    crs = CR.query.all()
    if not crs:
        return jsonify({"success": False, "message": "No approved CRs found."}), 404

    cr_data = [{
        "id": cr.id,
        "name": cr.name,
        "email": cr.email,
        "phone": cr.phone,
        "section": cr.section,
        "year": cr.year,
        "batch": cr.batch
    } for cr in crs]

    return jsonify({"success": True, "crs": cr_data}), 200

@app.route('/remove-cr', methods=['POST'])
def remove_cr():
    data = request.get_json()
    cr_id = data.get('id')

    cr = CR.query.get(cr_id)
    if cr:
        try:
            db.session.delete(cr)
            db.session.commit()
            return jsonify({"success": True, "message": "CR removed successfully."}), 200
        except Exception:
            db.session.rollback()
            return jsonify({"success": False, "message": "Error while removing CR."}), 500
    return jsonify({"success": False, "message": "CR not found."}), 404

@app.route('/report-issue', methods=['POST'])
def report_issue():
    try:
        data = request.get_json()
        cr_email = data.get("crEmail")
        issue_title = data.get("issueTitle")
        issue_description = data.get("issueDescription")
        date_str = data.get("date")

        if not cr_email or not issue_title or not issue_description or not date_str:
            return jsonify({"success": False, "message": "Missing fields"}), 400

        cr = CR.query.filter_by(email=cr_email).first()
        if not cr:
            return jsonify({"success": False, "message": "CR not found"}), 404

        timestamp = datetime.fromisoformat(date_str.replace('Z', '+00:00'))

        new_issue = Issue(
            cr_id=cr.id,
            subject=issue_title,
            description=issue_description,
            timestamp=timestamp
        )

        db.session.add(new_issue)
        db.session.commit()

        return jsonify({"success": True, "message": "Issue reported successfully"}), 200

    except Exception as e:
        print("Error reporting issue:", e)
        return jsonify({"success": False, "message": "An error occurred while reporting the issue"}), 500

@app.route('/issues', methods=['GET'])
def get_issues():
    issues = Issue.query.order_by(Issue.timestamp.desc()).all()
    result = []
    for issue in issues:
        cr = issue.cr
        result.append({
            'id': issue.id,
            'subject': issue.subject,
            'description': issue.description,
            'timestamp': issue.timestamp,
            'resolved': issue.resolved,
            'cr_name': cr.name if cr else None,
            'cr_email': cr.email if cr else None,
            'reply': issue.reply.message if issue.reply else None
        })

    return jsonify({'success': True, 'issues': result}), 200

@app.route('/reply-to-issue', methods=['POST'])
def reply_to_issue():
    data = request.get_json()
    issue_id = data.get('issue_id')
    message = data.get('message')

    if not all([issue_id, message]):
        return jsonify({'success': False, 'message': 'All fields are required'}), 400

    issue = db.session.get(Issue, issue_id)

    if not issue:
        return jsonify({'success': False, 'message': 'Issue not found'}), 404

    try:
        reply = AdminReply(issue_id=issue_id, message=message)
        issue.resolved = True
        db.session.add(reply)
        db.session.commit()

        if issue.cr:
           cr_email = issue.cr.email
           cr_name = issue.cr.name
           msg = Message(
                'Response to Your Reported Issue',
                recipients=[cr_email],
                body=f"Dear {cr_name},\n\n"
                     f"The admin has replied to your reported issue:\n\n"
                     f"Subject: {issue.subject}\n"
                     f"Reply: {message}\n\n"
                     "Kind regards,\nYour Admin Team"
            )   
        mail.send(msg)

        return jsonify({'success': True, 'message': 'Reply submitted successfully and email sent'}), 200

    except Exception as e:
        db.session.rollback()
        print("Error while replying:", str(e))
        return jsonify({'success': False, 'message': f'Error while submitting reply: {str(e)}'}), 500



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
