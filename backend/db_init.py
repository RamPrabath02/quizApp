from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from config import Config
from models import User

# Initialize database and Marshmallow (for serializing data)
db = SQLAlchemy()
ma = Marshmallow()

try:
    admin_user = User(username=Config.ADMIN_USERNAME, role="admin")
    admin_user.set_password(Config.ADMIN_PASSWORD)
    db.session.add(admin_user)
    db.session.commit()
except Exception as e:
    db.session.rollback()
    print("error in creating admin user: ", str(e))
