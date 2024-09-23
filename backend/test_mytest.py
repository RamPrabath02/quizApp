import requests
import pytest

ENDPOINT = "http://127.0.0.1:5000/createQuiz"

def test_can_call_endpoint():
    response = requests.get("http://127.0.0.1:5000/quiz")
    assert response.status_code == 200
    pass

def test_create():
    payload = {
        "id": 50,
        "questions": [
            {
                "answer": "10",
                "id": 3,
                "options": ["10", "120", "50", "5"],
                "question": "what is 5+5"
            }
        ],
        "quizName": "new math"
    }

    response = requests.post(ENDPOINT, json=payload)
    
    print(response.text)
    
    
    data = response.json()
    print(data)
    
    
    assert response.status_code == 201

def test_update_quiz():
    # quiz_id = test_create()
    
    payload = {
        "id": 51,
        "questions": [
            {
                "answer": "10",
                "id": 40,
                "options": ["10", "120", "50", "5"],
                "question": "what is 5+5 (updated)"
            }
        ],
        "quizName": "new math(updated)"
    }

    
    response = requests.patch("http://127.0.0.1:5000/updateQuiz/51", json=payload)
    
    print(response.text)
    
    
    data = response.json()
    print(data)
    
    
    assert response.status_code == 200

def test_delete():

    response = requests.delete("http://127.0.0.1:5000/deleteQuiz/52")

    data=response.json()
    print(data)

    assert response.status_code==200