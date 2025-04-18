SQLALCHEMY_DATABASE_URI = 'sqlite:///users.db'
SQLALCHEMY_TRACK_MODIFICATIONS = False

from flask_mail import Mail, Message

# Add this to your Flask app configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Change this for other email providers
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'boydevil77740@gmail.com'  # Replace with your email
app.config['MAIL_PASSWORD'] = 'Devil@2001'  # Replace with your email password
app.config['MAIL_DEFAULT_SENDER'] = 'boydevil77740@gmail.com'

# Initialize Flask-Mail
mail = Mail(app)

