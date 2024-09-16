from flask import Blueprint, render_template

# Rename the Blueprint object to avoid conflict
db_data_bp = Blueprint('db_data', __name__)

# Keep the route function named as db_data or change it
@db_data_bp.route('/')
def show_db_data():
    return render_template("db_data.html")
