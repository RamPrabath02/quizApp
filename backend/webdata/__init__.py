from flask import Flask

def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'hard to guess string'

    from .db_data import db_data_bp

    # Register the Blueprint object with the app
    app.register_blueprint(db_data_bp, url_prefix='/db_data')

    return app
