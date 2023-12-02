from flask import Flask, request, jsonify

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

@app.route('/api/video', methods=['POST'])
def process_video():
    if 'video' in request.files:
        video_file = request.files['video']
        # Do something with the video here
        return {'message': 'Video uploaded successfully'}, 200
    else:
        return {'error': 'No video file provided'}, 400

if __name__ == '__main__':
    app.run(debug=True)
