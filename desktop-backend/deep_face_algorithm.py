import cv2
import os
from deepface import DeepFace
from firebase import sendData
import json

video_path = "videos\store.mp4" # Change this
output_folder = "output_folder"
f = open("config\\appConfig.json")
appConf = json.load(f)
branch_name = appConf["branch_name"]
interval_seconds = 5

cap = cv2.VideoCapture(video_path)
fps = int(cap.get(cv2.CAP_PROP_FPS))
frame_number = 0

while True:
   ret, frame = cap.read()
   if not ret:
      break

   if frame_number % (fps * interval_seconds) == 0:
      output_path = os.path.join(output_folder, f"frame_{frame_number}.jpg")
      cv2.imwrite(output_path, frame)
      result = DeepFace.analyze(output_path, enforce_detection=False)
      sendData(branch_name, result)
      print(f"Analysis result: {result}")

   frame_number += 1

   
cap.release()


# def sendToDb(result:str):
#    cred = credentials.Certificate('/firebaseConfig.json')
#    app = firebase_admin.initialize_app(cred) 
#    db = firestore.client()

#    users_ref = db.collection("users")
#    docs = users_ref.stream()

#    for doc in docs:
#       print(f"{doc.id} => {doc.to_dict()}")

