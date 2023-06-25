import json
import os

import requests
from PIL import Image
from flask import Flask, request, send_file
from flask_cors import CORS

from neural_style_transfer import run_style_transfer


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


def verify_world_id(world_id_response):
    WORLDCOIN_API_URL = "https://developer.worldcoin.org/api/v1/verify/app_946a85ccdca5b48f37f64c4fadb38467"
    headers = {"Content-Type": "application/json"}
    data = {
        "nullifier_hash": world_id_response["nullifier_hash"],
        "merkle_root": world_id_response["merkle_root"],
        "proof": world_id_response["proof"],
        "credential_type": world_id_response["credential_type"],
        "action": "probo-avatar",
        "signal": "",
    }
    response = requests.post(WORLDCOIN_API_URL, headers=headers, json=data)
    return response.status_code == 200


@app.route("/image_prompt", methods=["POST"])
def image_prompt():
    if "file" not in request.files:
        return {"error": "No file part"}, 400
    world_id = json.loads(request.form.get("worldId"))
    file = request.files["file"]
    artist_style = request.form.get("artistStyle")
    if file.filename == "":
        return {"error": "No selected file"}, 400
    if not file:
        return {"error": "File not found"}, 400
    if not allowed_file(file.filename):
        return {"error": "File type not supported"}, 400

    if not verify_world_id(world_id):
        return {"error": "Could not verify World ID"}, 400
    nullifier_hash = world_id["nullifier_hash"]

    current_file_path = os.path.realpath(__file__)
    parent_directory = os.path.dirname(current_file_path)
    image_upload_folder = os.path.join(parent_directory, "image_uploads")
    image_upload_file = os.path.join(image_upload_folder, file.filename)
    image_output_folder = os.path.join(parent_directory, "image_outputs")
    image_output_file = os.path.join(image_output_folder, file.filename)

    file.save(image_upload_file)
    style_folder = os.path.join(parent_directory, "artist_styles")
    if artist_style == "van_gogh":
        style_file = os.path.join(style_folder, "van_gogh.jpeg")
    elif artist_style == "rembrandt":
        style_file = os.path.join(style_folder, "rembrandt.jpeg")
    elif artist_style in ["spedward", "amir", "andy"]:
        style_file = os.path.join(style_folder, "van_gogh.jpeg")
    else:
        return {"error": "Artist style not found"}, 400

    best, _ = run_style_transfer(image_upload_file, style_file, num_iterations=1)
    res = Image.fromarray(best)
    res.save(image_output_file)

    return send_file(image_output_file, mimetype="image/jpeg")


if __name__ == "__main__":
    app.run()
