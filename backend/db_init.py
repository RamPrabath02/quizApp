from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

from config import Config
from models import User

# Initialize database and Marshmallow (for serializing data)
db = SQLAlchemy()
ma = Marshmallow()
