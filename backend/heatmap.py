import supervision as sv
from ultralytics import YOLO
import cv2
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image

import os
from firebase import bucket


def generate_heatmap(video_path:str, interval_seconds:int):
   model = YOLO('yolov8x.pt')
   cap = cv2.VideoCapture(video_path)
   fps = int(cap.get(cv2.CAP_PROP_FPS))

   heat_map_annotator = sv.HeatMapAnnotator()

   video_info = sv.VideoInfo.from_video_path(video_path=video_path)
   frames_generator = sv.get_video_frames_generator(source_path=video_path, stride=interval_seconds * fps)

   annotated_frame = None

   for frame in frames_generator:
      result = model(frame)[0]
      detections = sv.Detections.from_ultralytics(result)
      annotated_frame = heat_map_annotator.annotate(
         scene=frame.copy(),            
         detections=detections)
         
   return annotated_frame

def send_heatmap(annotated_frame):
   img = Image.fromarray(annotated_frame, 'RGB')
   img.save('images/heatmap.png')

   # Send the image to the database
   blob = bucket.blob('images/heatmap.png')
   blob.upload_from_filename('images/heatmap.png')

   # Remove the image from the local storage
   os.remove('images/heatmap.png')