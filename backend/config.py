import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'sqlite:///quiz.db'  # Using SQLite for simplicity
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = os.environ.get('SECRET_KEY', 'mysecret')
    ADMIN_USERNAME = "testing_for_adminuser"
    ADMIN_PASSWORD = "admin_password"
