from app import db

class Quiz(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    question = db.Column(db.String(500), nullable=False)
    options = db.Column(db.JSON, nullable=False)
    answer = db.Column(db.String(100), nullable=False)

    def __repr__(self):
        return f"<Quiz {self.question}>"
