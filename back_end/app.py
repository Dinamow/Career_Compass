#!/usr/bin/python3
from engin import storage
from flask import Flask, jsonify, abort, request, render_template
from flask_mail import Message
from flask_cors import CORS

app = Flask(__name__, static_folder='./build',
            static_url_path='/')

app.url_map.strict_slashes = False
CORS(app)


@app.route('/')
def frond_end():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

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

    storage.insert(data, app, data['uuid'])

    return jsonify({'uuid': data['uuid']}), 201


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)
