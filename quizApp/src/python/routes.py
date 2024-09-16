from flask import request, jsonify
from app import app, db
from models import Quiz

@app.route('/quizzes', methods=['GET'])
def get_quizzes():
    quizzes = Quiz.query.all()
    return jsonify([{
        'id': q.id,
        'question': q.question,
        'options': q.options,
        'answer': q.answer
    } for q in quizzes])

@app.route('/quiz', methods=['POST'])
def add_quiz():
    data = request.json
    new_quiz = Quiz(question=data['question'], options=data['options'], answer=data['answer'])
    db.session.add(new_quiz)
    db.session.commit()
    return jsonify({'message': 'Quiz added successfully!'}), 201

@app.route('/quiz/<int:id>', methods=['PUT'])
def update_quiz(id):
    quiz = Quiz.query.get(id)
    if quiz:
        data = request.json
        quiz.question = data['question']
        quiz.options = data['options']
        quiz.answer = data['answer']
        db.session.commit()
        return jsonify({'message': 'Quiz updated successfully!'})
    return jsonify({'message': 'Quiz not found'}), 404

@app.route('/quiz/<int:id>', methods=['DELETE'])
def delete_quiz(id):
    quiz = Quiz.query.get(id)
    if quiz:
        db.session.delete(quiz)
        db.session.commit()
        return jsonify({'message': 'Quiz deleted successfully!'})
    return jsonify({'message': 'Quiz not found'}), 404
