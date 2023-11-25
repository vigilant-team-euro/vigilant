import cv2
import os
from deepface import DeepFace

video_path = "C:\\Users\\Efe ERKAN\\Videos\\Captures\\Zoom Toplantı 2023-02-28 15-57-02.mp4" # Change this
output_folder = "output_folder"
interval_seconds = 30

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
      print(f"Analysis result: {result}")

   frame_number += 1

cap.release()