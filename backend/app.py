from flask import Flask
from config import Config
from db_init import db, ma  # Import db and ma from db_init
from quiz_routes import quiz_routes
from flask_cors import CORS

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)


db.init_app(app)
ma.init_app(app)

# Registering blueprint for routes
app.register_blueprint(quiz_routes, url_prefix="/")

if __name__ == "__main__":
    app.run(debug=True, port=5000)

