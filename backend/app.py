from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/quiz'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# Ensure db.create_all() runs within the app context
with app.app_context():
    db.create_all()

class Quiz(db.Model):
    __tablename__ = 'quiz'

    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(255), nullable=False)
    answer = db.Column(db.String(255), nullable=False)
    options = db.relationship('Option', backref='quiz', lazy=True)

    # Update the constructor to match the model fields
    def __init__(self, question, answer):
        self.question = question
        self.answer = answer
\
class Option(db.Model):
    __tablename__ = 'options'

    id = db.Column(db.Integer, primary_key=True)
    option_text = db.Column(db.String(255), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)

# Example route to return quiz data
@app.route('/get', methods=['GET'])
def get_quizz():
    quiz_data = [
        {
            "id": "1",
            "question": "2+2",
            "options": [
                "2",
                "0",
                "4",
                "10"
            ],
            "answer": "4"
        },
        {
            "id": "2",
            "question": "9*0",
            "options": [
                "0",
                "10",
                "11",
                "50"
            ],
            "answer": "0"
        },
        {
            "id": "3",
            "question": "10+10",
            "options": [
                "22",
                "10",
                "19",
                "20"
            ],
            "answer": "20"
        },
        {
            "id": "4",
            "question": "10*2",
            "options": [
                "20",
                "1",
                "30",
                "40"
            ],
            "answer": "20"
        }
    ]

    return jsonify(quiz_data)

if __name__ == '__main__':
    app.run(debug=True)






# from flask import Flask, jsonify, request
# from flask_sqlalchemy import SQLAlchemy
# from flask_marshmallow import Marshmallow

# app = Flask(__name__)

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/quiz'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# db = SQLAlchemy(app)
# ma = Marshmallow(app)

# # Mock database (you would replace this with actual database queries)
# quiz_data = [
#     {
#         "id": 1,
#         "question": "2+2",
#         "options": ["2", "0", "4", "10"],
#         "answer": "4"
#     },
#     {
#         "id": 2,
#         "question": "9*0",
#         "options": ["0", "10", "11", "50"],
#         "answer": "0"
#     }
# ]

# class Quiz(db.Model):
#     id = db.Column(db Integer, primary_key=True)
#     question = db.Column(db.String(255), nullable=False)
#     options = db.Column(db.JSON, nullable=False)
#     answer = db.Column(db.String(255), nullable=False)

#     def __init__(self, question, options, answer):
#         self.question = question
#         self.options = options
#         self.answer = answer

# class QuizSchema(ma.Schema):
#     class Meta:
#         fields = ('id', 'question', 'options', 'answer')

# quiz_schema = QuizSchema()
# quizzes_schema = QuizSchema(many=True)
# # Get all quiz data
# @app.route('/quiz', methods=['GET'])
# def get_all_quiz():
#     return jsonify(quiz_data)

# # Add a new quiz question
# @app.route('/quiz', methods=['POST'])
# def add_quiz():
#     new_quiz = request.json
#     quiz_data.append(new_quiz)
#     return jsonify(new_quiz), 201

# # Update a quiz question
# @app.route('/quiz/<int:id>', methods=['PATCH'])
# def update_quiz(id):
#     updated_data = request.json
#     for quiz in quiz_data:
#         if quiz["id"] == id:
#             quiz.update(updated_data)
#             return jsonify(quiz)
#     return jsonify({"error": "Quiz not found"}), 404

# # Delete a quiz question
# @app.route('/quiz/<int:id>', methods=['DELETE'])
# def delete_quiz(id):
#     global quiz_data
#     quiz_data = [quiz for quiz in quiz_data if quiz["id"] != id]
#     return jsonify({"message": "Deleted successfully"}), 200

# if __name__ == '__main__':
#     app.run(debug=True, port=8000)
