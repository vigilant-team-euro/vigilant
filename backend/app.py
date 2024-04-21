from flask import Flask, request, jsonify
from flask_cors import CORS
from firebase import emotion, gender, storeNames, customerDaily, age
from forecasting import forecast
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

@app.route('/get_store_data', methods=['GET'])
def get_store_data():
    print("Request args:", request.args)  # Debug print statement
    user_id = request.args.get('user_id')
    store_id = request.args.get('store_id')
    print("User ID:", user_id)  # Debug print statement
    print("Store ID:", store_id)  # Debug print statement
    return forecast(user_id, store_id)

if __name__ == '__main__':
    app.run(debug=True)
