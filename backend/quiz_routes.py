# from flask import Blueprint, jsonify, request
# from db_init import db
# from models import Quiz, Question
# # from models.User import check_password
# from flask_cors import CORS

# quiz_routes = Blueprint('quiz_routes', __name__)
# CORS(quiz_routes)

# # Create a new quiz
# @quiz_routes.route('/createQuiz', methods=['POST'])
# def create_quiz():
#     data = request.get_json()

#     # Check if quiz name or questions are missing
#     if 'quizName' not in data or not data['quizName']:
#         return jsonify({'error': 'Quiz name is required.'}), 400
#     if 'questions' not in data or len(data['questions']) == 0:
#         return jsonify({'error': 'At least one question is required.'}), 400

#     new_quiz = Quiz(quizName=data['quizName'])
#     db.session.add(new_quiz)
#     db.session.commit()

#     # Add questions to the quiz
#     for question_data in data['questions']:
#         new_question = Question(
#             question=question_data['question'],
#             options=question_data['options'],
#             answer=question_data['answer'],
#             quiz_id=new_quiz.id
#         )
#         db.session.add(new_question)
#     try:
#         db.session.commit()
#         return jsonify({'message': 'Quiz created successfully!', 'quiz': data}), 201
#     except Exception as e:
#         db.session.rollback()
#         print("Error in creating a quiz", str(e))


# # Fetch all quizzes
# @quiz_routes.route('/quiz', methods=['GET'])
# def get_all_quizzes():
#     quizzes = Quiz.query.all()
#     result = []
#     for quiz in quizzes:
#         questions = []
#         for question in quiz.questions:
#             questions.append({
#                 'id': question.id,
#                 'question': question.question,
#                 'options': question.options,
#                 'answer': question.answer
#             })
#         result.append({
#             'id': quiz.id,
#             'quizName': quiz.quizName,
#             'questions': questions
#         })
#     return jsonify(result), 200


# @quiz_routes.route("/quiz/<id>", methods=['GET'])
# def get_quiz_by_id(id):
#     quiz = Quiz.query.filter_by(id=id).first()
#     response = {"quizName":quiz.quizName,
#                 "questions": []}
#     for question in quiz.questions:
#         response['questions'].append(question.to_dict())
#     return jsonify(response), 200

# # Delete a quiz by ID
# @quiz_routes.route('/deleteQuiz/<int:quiz_id>', methods=['DELETE'])
# def delete_quiz(quiz_id):
#     quiz = Quiz.query.get(quiz_id)
#     if not quiz:
#         return jsonify({'error': 'Quiz not found.'}), 404

#     db.session.delete(quiz)
#     db.session.commit()
#     return jsonify({'message': 'Quiz deleted successfully!'}), 200

# # Update a specific question
# @quiz_routes.route('/updateQuestion/<int:question_id>', methods=['PATCH'])
# def update_question(question_id):
#     data = request.get_json()
#     question = Question.query.get(question_id)
    
#     if not question:
#         return jsonify({'error': 'Question not found.'}), 404
    
#     question.question = data.get('question', question.question)
#     question.options = data.get('options', question.options)
#     question.answer = data.get('answer', question.answer)
    
#     db.session.commit()
#     return jsonify({'message': 'Question updated successfully!'}), 200

# # Update quiz info
# @quiz_routes.route('/updateQuiz/<int:quiz_id>', methods=['PATCH'])
# def update_quiz(quiz_id):
#     data = request.get_json()
#     quiz = Quiz.query.get(quiz_id)

#     if not quiz:
#         return jsonify({'error': 'Quiz not found.'}), 404

#     quiz.quizName = data.get('quizName', quiz.quizName)

#     for question_data in data.get('questions', []):
#         question = Question.query.get(question_data['id'])
#         if question:
#             question.question = question_data.get('question', question.question)
#             question.options = question_data.get('options', question.options)
#             question.answer = question_data.get('answer', question.answer)

#     db.session.commit()
#     return jsonify({'message': 'Quiz updated successfully!'}), 200

# # @quiz_routes.route('/quiz/<int:id>', methods=['PUT'])
# # def update_quiz(id):
# #     quiz = Quiz.query.get(id)
# #     if not quiz:
# #         return jsonify({'message': 'Quiz not found'}), 404

# #     data = request.get_json()
# #     quiz.quizName = data.get('quizName', quiz.quizName)
# #     # Update other quiz fields as necessary

# #     db.session.commit()
# #     return jsonify({'message': 'Quiz updated successfully'})

from flask import Blueprint, jsonify, request
from db_init import db
from models import Quiz, Question
from flask_cors import CORS

quiz_routes = Blueprint('quiz_routes', __name__)
CORS(quiz_routes)

# Create a new quiz
@quiz_routes.route('/createQuiz', methods=['POST'])
def create_quiz():
    data = request.get_json()

    # Validate quiz data
    if 'quizName' not in data or not data['quizName'].strip():
        return jsonify({'error': 'Quiz name is required.'}), 400
    if 'questions' not in data or len(data['questions']) == 0:
        return jsonify({'error': 'At least one question is required.'}), 400

    # Validate questions and options
    for question in data['questions']:
        if not question['question'].strip():
            return jsonify({'error': 'Each question must have text.'}), 400
        if len(question['options']) < 2:
            return jsonify({'error': 'Each question must have at least two options.'}), 400
        if not question['answer'].strip():
            return jsonify({'error': 'Each question must have a correct answer.'}), 400

    try:
        new_quiz = Quiz(quizName=data['quizName'])
        db.session.add(new_quiz)
        db.session.commit()

        # Add questions to the quiz
        for question_data in data['questions']:
            new_question = Question(
                question=question_data['question'],
                options=question_data['options'],
                answer=question_data['answer'],
                quiz_id=new_quiz.id
            )
            db.session.add(new_question)
        db.session.commit()

        return jsonify({'message': 'Quiz created successfully!', 'quiz': data}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': 'Error in creating quiz: ' + str(e)}), 500

# Fetch all quizzes
@quiz_routes.route('/quiz', methods=['GET'])
def get_all_quizzes():
    quizzes = Quiz.query.all()
    result = []
    for quiz in quizzes:
        questions = []
        for question in quiz.questions:
            questions.append({
                'id': question.id,
                'question': question.question,
                'options': question.options,
                'answer': question.answer
            })
        result.append({
            'id': quiz.id,
            'quizName': quiz.quizName,
            'questions': questions
        })
    return jsonify(result), 200

# Fetch a quiz by ID
@quiz_routes.route("/quiz/<id>", methods=['GET'])
def get_quiz_by_id(id):
    quiz = Quiz.query.filter_by(id=id).first()
    if not quiz:
        return jsonify({'error': 'Quiz not found.'}), 404

    response = {"quizName": quiz.quizName, "questions": []}
    for question in quiz.questions:
        response['questions'].append(question.to_dict())
    return jsonify(response), 200

# Delete a quiz by ID
@quiz_routes.route('/deleteQuiz/<int:quiz_id>', methods=['DELETE'])
def delete_quiz(quiz_id):
    quiz = Quiz.query.get(quiz_id)
    if not quiz:
        return jsonify({'error': 'Quiz not found.'}), 404

    db.session.delete(quiz)
    db.session.commit()
    return jsonify({'message': 'Quiz deleted successfully!'}), 200

# Update a specific question
@quiz_routes.route('/updateQuestion/<int:question_id>', methods=['PATCH'])
def update_question(question_id):
    data = request.get_json()
    question = Question.query.get(question_id)
    
    if not question:
        return jsonify({'error': 'Question not found.'}), 404
    
    question.question = data.get('question', question.question)
    question.options = data.get('options', question.options)
    question.answer = data.get('answer', question.answer)
    
    db.session.commit()
    return jsonify({'message': 'Question updated successfully!'}), 200

# Update quiz info
@quiz_routes.route('/updateQuiz/<int:quiz_id>', methods=['PATCH'])
def update_quiz(quiz_id):
    data = request.get_json()
    quiz = Quiz.query.get(quiz_id)

    if not quiz:
        return jsonify({'error': 'Quiz not found.'}), 404

    quiz.quizName = data.get('quizName', quiz.quizName)

    # Update questions
    for question_data in data.get('questions', []):
        question = Question.query.get(question_data['id'])
        if question:
            question.question = question_data.get('question', question.question)
            question.options = question_data.get('options', question.options)
            question.answer = question_data.get('answer', question.answer)

    db.session.commit()
    return jsonify({'message': 'Quiz updated successfully!'}), 200
