from flask import Flask, request

app = Flask(__name__)


@app.route("/hello")
def hello():
    return "Hello World!\n"


@app.route("/text_prompt", methods=["POST"])
def text_prompt():
    prompt = request.form.get("prompt")
    return prompt


if __name__ == "__main__":
    app.run()