from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

allowed_origins = [
    "http://localhost:3000",  # React app running on localhost
]
CORS(app, origins=allowed_origins, supports_credentials=True)


@app.route("/hello")
def hello():
    return "Hello World!\n"


@app.route("/text_prompt", methods=["POST"])
def text_prompt():
    prompt = request.json["prompt"]
    response = {"result": prompt}
    return jsonify(response)


if __name__ == "__main__":
    app.run()
