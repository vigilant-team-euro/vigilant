from flask import Flask, request, jsonify
from flask_cors import CORS
from deep_face_algorithm import deep_face
from heatmap import generate_heatmap, send_heatmap
from firebase import emotion, gender, storeNames, customerDaily, age
import os

# Create a Flask application
app = Flask(__name__)
CORS(app)

# Define a route that returns a JSON response
# @app.route('/data', methods=['GET'])
# def get_data():
#     data = {
#         'message': 'Hello from the Flask backend!',
#         'data': [1, 2, 3, 4, 5]
#     }
#     return jsonify(data)

@app.route('/api/video', methods=['POST'])
def process_video():
    if 'video' in request.files:
        video_file = request.files['video']

        video_path = 'videos/' + video_file.filename
        video_file.save(video_path)

        # deep_face(video_path, 180)

        # os.remove(video_path)

        generate_heatmap(video_path, 1)
        send_heatmap()

        return {'message': 'Video uploaded successfully'}, 200
    else:
        return {'error': 'No video file provided'}, 400

@app.route('/getEmotions', methods=['POST'])
def getEmotions():
    if "branch_name" in request.get_json():
        return jsonify(emotion(request.get_json()["branch_name"]))
    
@app.route('/getGenders', methods=['POST'])
def getGenders():
    if "branch_name" in request.get_json():
        return jsonify(gender(request.get_json()["branch_name"]))

@app.route('/getStoreNames', methods=['GET'])
def getStoreNames():
    return storeNames()

@app.route('/getCustomerDaily', methods=['POST'])
def getCustomerDaily():
    return customerDaily((request.get_json()["branch_name"]))

@app.route('/getAges', methods=['POST'])
def getAges():
    return age((request.get_json()["branch_name"]))
if __name__ == '__main__':
    app.run(debug=True)
