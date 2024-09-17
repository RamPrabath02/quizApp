import uuid
from sqlalchemy.dialects.postgresql import UUID
from werkzeug.security import generate_password_hash, check_password_hash

from db_init import db


class Quiz(db.Model):
    __tablename__ = 'quizzes'
    id = db.Column(db.Integer, primary_key=True)
    quizName = db.Column(db.String(100), nullable=False)
    questions = db.relationship('Question', backref='quiz', cascade="all, delete", lazy=True)


class Question(db.Model):
    __tablename__ = "questions"
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(200), nullable=False)
    options = db.Column(db.JSON, nullable=False)
    answer = db.Column(db.String(100), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz.id'), nullable=False)

    def to_dict(self):
        return{
            "id": self.id,
            "question": self.question,
            "options": self.options,
            "answer": self.answer,
            "quiz_id": self.quiz_id
        }
