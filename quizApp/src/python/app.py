from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from flask_cors import CORS

app = Flask(__name__)
# CORS(app)  

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)

# from routes import *

# if __name__ == "__main__":
#     app.run(debug=True)
