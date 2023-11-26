#!/usr/bin/python3
from engin import storage
from flask import Flask, jsonify, abort, request
from flask_mail import Message
from flask_cors import CORS
from uuid import uuid4

app = Flask(__name__)

app.url_map.strict_slashes = False
CORS(app)


@app.route('/')
def index():
    """index 0"""

    data = {}
    data['email'] = "meemoo102039@gmail.com"

    if not data:
        abort(400, "Not json")

    storage.sende(app, data)

    return jsonify({"i love you" : "muah"}), 200


@app.route('/api/v1/questions')
def home():
    return jsonify(storage.getq())


@app.route('/api/v1/statistics')
def statistics():
    return jsonify(storage.getall())


@app.route('/api/v1/result/<string:unique_url_id>')
def unique(unique_url_id):
    if storage.exists(unique_url_id):
        return jsonify(storage.getone(unique_url_id))
    return abort(404, "Not found")


@app.route('/api/v1/result', methods=['POST'])
def post():
    data = request.get_json()

    if not data:
        return abort(400, "Not a JSON")


    data['uuid'] = uuid4()

    storage.insert(data)

    return jsonify({'uuid': data['uuid']}), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
