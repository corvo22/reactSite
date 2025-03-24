from flask import Flask, jsonify
from flask_cors import CORS
from pathlib import Path

app = Flask(__name__)
cors = CORS(app, origins='*')


@app.route("/api/sections/<section>", methods=['GET'])
def sections(section):
    file_path = Path(__file__).parent / f'../portfolio/src/sections/{section}.md'
    file_path = file_path.resolve()
    f = open(file_path)
    return f.read()

@app.route("/api/projects/<project>", methods=['GET'])
def projects(project):
    file_path = Path(__file__).parent / f'../portfolio/src/projects/{project}.md'
    file_path = file_path.resolve()
    f = open(file_path)
    return f.read()

if __name__=="__main__":
    app.run(debug=True, port=8080)