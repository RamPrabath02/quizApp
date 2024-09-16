from flask import request, jsonify
from config import app, db
from models import QuizForm, QuizQuestion

# Route to create or add questions to a quiz
@app.route("/quiz", methods=["POST"])
def create_question():
    data = request.json
    quiz_name = data.get("quizName")
    question_text = data.get("question")
    options = data.get("options")
    answer = data.get("answer")

    quiz = QuizForm.query.filter_by(quiz_name=quiz_name).first()
    if not quiz:
        quiz = QuizForm(quiz_name=quiz_name)
        db.session.add(quiz)
        db.session.commit()

    new_question = QuizQuestion(
        question=question_text,
        options=options,
        answer=answer,
        quiz_id=quiz.id
    )
    db.session.add(new_question)
    db.session.commit()

    return jsonify({"message": "Question added!"}), 201

# Route to submit the entire quiz form
@app.route("/submit_quiz", methods=["POST"])
def submit_quiz():
    data = request.json
    quiz_name = data.get("quizName")
    questions = data.get("questions")

    quiz = QuizForm(quiz_name=quiz_name)
    db.session.add(quiz)
    db.session.commit()

    for question_data in questions:
        new_question = QuizQuestion(
            question=question_data["question"],
            options=question_data["options"],
            answer=question_data["answer"],
            quiz_id=quiz.id
        )
        db.session.add(new_question)

    db.session.commit()
    return jsonify({"message": "Quiz form submitted!"}), 201
