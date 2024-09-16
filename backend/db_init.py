from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

# Initialize database and Marshmallow (for serializing data)
db = SQLAlchemy()
ma = Marshmallow()
