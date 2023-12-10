import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import datetime

# Use a service account.
cred = credentials.Certificate('c:/Vigilant/vigilant/desktop-backend/config/firebaseConfig.json')
app = firebase_admin.initialize_app(cred)
db = firestore.client()


# users_ref = db.collection("branches")
# docs = users_ref.stream()


# for doc in docs:
#     id = doc.id
#     print(f"{doc.id} => {doc.to_dict()}")
#     branch_ref = db.collection("branches").document(doc.id).collection("frame2")
#     docs2 = branch_ref.stream()
#     for a in docs2:
#         print(f"{a.id} => {a.to_dict()}")

def sendData(branch_name:str, result:list):
    now = datetime.datetime.now()
    now_str = now.strftime('%Y-%m-%d_%H:%M:%S')
    frame_name = f"frame_{now_str}"
    person_count = 1

    #db.collection(branch_name).document(frame_name).set({"datetime": now_str})
    
    for person in result:
        person_name = f"person{person_count}"
        data = {"name":person_name, "emotion": person["dominant_emotion"], "gender": person["dominant_gender"], "age": person["age"], "date_time":now}

        print(frame_name, person_name)
        db.collection(branch_name).document(frame_name).set(data)
        person_count += 1