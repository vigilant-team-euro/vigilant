from flask import Flask, request, jsonify
from deep_face_algorithm import deep_face
import os

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

        video_path = 'videos/' + video_file.filename
        video_file.save(video_path)

        deep_face(video_path, 30)

        os.remove(video_path)

        return {'message': 'Video uploaded successfully'}, 200
    else:
        return {'error': 'No video file provided'}, 400

if __name__ == '__main__':
    app.run(debug=True)
