from flask import Flask, jsonify

# Create a Flask application
app = Flask(__name__)

# Define a route that returns a JSON response
@app.route('/data', methods=['GET'])
def get_data():
    data = {
        'message': 'Hello from the Flask backend!',
        'data': [1, 2, 3, 4, 5]
    }
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
