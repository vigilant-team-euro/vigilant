import firebase_admin
from firebase_admin import credentials, firestore, storage
import datetime

# Use a service account.
cred = credentials.Certificate('C:/Vigilant/vigilant/backend/config/firebaseConfig.json')
app = firebase_admin.initialize_app(cred, {'storageBucket': 'vigilant-36758.appspot.com'})
db = firestore.client()
bucket = storage.bucket()


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

    #db.collection("branches").document(branch_name).collection(frame_name).document("datetime").set({"datetime": now_str})
    
    for person in result:
        person_name = f"person{person_count}"
        data = {"emotion": person["dominant_emotion"], "gender": person["dominant_gender"], "age": person["age"]}

        db.collection(branch_name).document(frame_name).set(data)
        #db.collection("branches").document(branch_name).collection(frame_name).document(person_name).set(data)
        person_count += 1

def emotion(branch_name:str):
    happy = 0
    sad = 0
    fear = 0
    neutral = 0
    surprise = 0
    arr = db.collection(branch_name).stream()
    for a in arr:
        data = a.to_dict()["emotion"]
        if data == "happy":
            happy += 1
        if data == "sad":
            sad += 1
        if data == "fear":
            fear += 1
        if data == "neutral":
            neutral += 1
        if data == "surprise":
            surprise += 1
    return {"happy":happy, "sad":sad, "fear":fear, "neutral":neutral, "surprise":surprise}

def gender(branch_name:str):
    male = 0
    female = 0
    arr = db.collection(branch_name).stream()
    for a in arr:
        data = a.to_dict()["gender"]
        if data == "Man":
            male += 1
        else:
            female += 1
    return {"male":male, "female":female}
    