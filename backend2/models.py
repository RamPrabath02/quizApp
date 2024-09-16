from config import db

class QuizForm(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    quiz_name = db.Column(db.String(100), unique=True, nullable=False)
    questions = db.relationship('QuizQuestion', backref='quiz', lazy=True)

class QuizQuestion(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(200), nullable=False)
    options = db.Column(db.JSON, nullable=False)
    answer = db.Column(db.String(100), nullable=False)
    quiz_id = db.Column(db.Integer, db.ForeignKey('quiz_form.id'), nullable=False)
    quiz_name = db.Column(db.String(100), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "question": self.question,
            "options": self.options,
            "answer": self.answer
        }
