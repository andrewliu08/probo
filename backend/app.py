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


ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route("/image_prompt", methods=["POST"])
def image_prompt():
    if "file" not in request.files:
        return {"error": "No file part"}, 400
    file = request.files["file"]
    if file.filename == "":
        return {"error": "No selected file"}, 400
    if not file:
        return {"error": "File not found"}, 400
    if not allowed_file(file.filename):
        return {"error": "File type not supported"}, 400

    current_file_path = os.path.realpath(__file__)
    parent_directory = os.path.dirname(current_file_path)
    image_upload_folder = os.path.join(parent_directory, "image_uploads")
    file.save(os.path.join(image_upload_folder, file.filename))

    response_file = os.path.join(parent_directory, "chimp_cheese.jpeg")
    return send_file(response_file, mimetype="image/jpeg")


if __name__ == "__main__":
    app.run()
