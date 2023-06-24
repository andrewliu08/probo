import os

from flask import Flask, jsonify, request, send_file
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
    print(prompt)

    current_file_path = os.path.realpath(__file__)
    parent_directory = os.path.dirname(current_file_path)
    image_file_path = os.path.join(parent_directory, "chimp_cheese.jpeg")
    return send_file(image_file_path, mimetype="image/jpeg")


if __name__ == "__main__":
    app.run()
