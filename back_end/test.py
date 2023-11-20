#!/usr/bin/python3
from engin import storage
from flask import Flask, jsonify

app = Flask(__name__)

app.url_map.strict_slashes = False

@app.route('/')
@app.route('/api/v1/questions')
def home():
    return jsonify(storage.getq())

@app.route('/api/v1/statistics')
def statistics():
    return jsonify(storage.getall())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
