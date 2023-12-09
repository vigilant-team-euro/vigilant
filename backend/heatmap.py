import supervision as sv
from ultralytics import YOLO
import cv2
import numpy as np
import cv2
from firebase import firebase
import matplotlib.pyplot as plt


def generate_heatmap(video_path:str, interval_seconds:int):
   model = YOLO('yolov8x.pt')
   cap = cv2.VideoCapture(video_path)
   fps = int(cap.get(cv2.CAP_PROP_FPS))

   heat_map_annotator = sv.HeatMapAnnotator()

   video_info = sv.VideoInfo.from_video_path(video_path='store.mp4')
   frames_generator = sv.get_video_frames_generator(source_path='store.mp4', stride=interval_seconds * fps)

   annotated_frame = None

   for frame in frames_generator:
      result = model(frame)[0]
      detections = sv.Detections.from_ultralytics(result)
      annotated_frame = heat_map_annotator.annotate(
         scene=frame.copy(),            
         detections=detections)
         
   return annotated_frame

def send_heatmap(annotated_frame):
   # Convert the 2D numpy array to an image
   image = np.uint8(annotated_frame)
   cv2.imwrite('heatmap.jpg', image)

   # Send the image to Firebase
   firebase = firebase.FirebaseApplication('https://your-firebase-url.firebaseio.com/', None)
   result = firebase.put('/images', 'heatmap', 'heatmap.jpg')

   return result
