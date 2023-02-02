from google.cloud import vision
import os
import io
import json
import uuid
import random
import requests
from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS, cross_origin
from flask import send_from_directory
app = Flask(__name__, static_folder='font-end/build', static_url_path='')

CORS(app, support_credentials=True)

emails = []

# os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = str(
#     os.getcwd())+'/flask-server/yttnanlaysis-4919c47df72c.json'
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'yttnanlaysis-4919c47df72c.json'
client = vision.ImageAnnotatorClient()
client = vision.ImageAnnotatorClient()


def detect_faces(path):
    """Detects faces in an image."""
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.face_detection(image=image)
    faces = response.face_annotations

    # Names of likelihood from google.cloud.vision.enums
    likelihood_name = ('0', '1', '2', '3',
                       '4', '5')
    faceVal = ["faces"]
    for face in faces:
        angerVal = float('{}'.format(likelihood_name[face.anger_likelihood]))
        joyVal = float('{}'.format(likelihood_name[face.joy_likelihood]))
        surprisedVal = float('{}'.format(
            likelihood_name[face.surprise_likelihood]))
        sorrowVal = float('{}'.format(likelihood_name[face.sorrow_likelihood]))
        # blurredVal = ('{}'.format(likelihood_name[face.blurred_likelihood]))
        facesScore = (angerVal*1 + joyVal*1 +
                      surprisedVal*2 + sorrowVal*1)/25*15
        faceVal.append([facesScore, angerVal, joyVal, surprisedVal, sorrowVal])
        # faceVal.append([0])
    numFaces = len(faceVal)-1
    sumFaceScore = 0
    for i in range(1, len(faceVal)):
        sumFaceScore += faceVal[i][0]
    if numFaces > 0:
        finalFaceScore = sumFaceScore/numFaces + 15
    else:
        finalFaceScore = 0
    faceVal.insert(1, finalFaceScore)
    bestFace = 2
    for i in range(2, len(faceVal)):
        if faceVal[i][0] > faceVal[bestFace][0]:
            bestFace = i
    faceVal.insert(2, bestFace+1)
    return (faceVal)


def detect_landmarks(path):
    """Detects landmarks in the file."""

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.landmark_detection(image=image)
    landmarks = response.landmark_annotations
    landmarkVal = ["landmark"]
    for landmark in landmarks:
        landmarkName = landmark.description
        for location in landmark.locations:
            lat_lng = location.lat_lng
            # landmarkLat = ('Latitude {}'.format(lat_lng.latitude))
            # landmarkLong = ('Longitude {}'.format(lat_lng.longitude))
        landmarkVal.append(landmarkName)
    if len(landmarkVal)-1 > 0:
        landmarkVal.insert(1, 0)
    else:
        landmarkVal.insert(1, 5)
    return (landmarkVal)


def detect_logos(path):
    """Detects logos in the file."""
    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.logo_detection(image=image)
    logos = response.logo_annotations
    logoVal = ["logos"]

    for logo in logos:
        logoVal.append(logo.description)
    if len(logoVal)-1 > 0:
        logoVal.insert(1, 0)
    else:
        logoVal.insert(1, 5)
    return (logoVal)


def detect_safe_search(path):
    data = []
    """Detects unsafe features in the file."""
    from google.cloud import vision
    import io
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.Image(content=content)

    response = client.safe_search_detection(image=image)
    safe = response.safe_search_annotation

    likelihood_name = ('0', '1', '2', '3',
                       '4', '5')

    adultVal = float('{}'.format(likelihood_name[safe.adult]))
    # medicalVal = float('{}'.format(likelihood_name[safe.medical]))
    spoofedVal = float('{}'.format(likelihood_name[safe.spoof]))
    violenceVal = float('{}'.format(likelihood_name[safe.violence]))
    racyVal = float('{}'.format(likelihood_name[safe.racy]))
    safeSearchScore = ((adultVal*-2) + (spoofedVal*100) +
                       (violenceVal*10) + (racyVal*-1))/550*70
    safeSearchVal = ["safeSearch", safeSearchScore, adultVal,
                     spoofedVal, violenceVal, racyVal]

    facesVal = detect_faces(path)
    landmarkVal = detect_landmarks(path)
    logoVal = detect_logos(path)

    safeSearchFinalScore = float("%.2f" % safeSearchVal[1])
    facesFinalScore = float("%.2f" % facesVal[1])
    landmarkFinalScore = float("%.2f" % landmarkVal[1])
    logoFinalScore = float("%.2f" % logoVal[1])
    finalTNScore = float("%.2f" % (safeSearchFinalScore + facesFinalScore -
                                   landmarkFinalScore-logoFinalScore))
    safeSearchVal[1] = safeSearchFinalScore
    facesVal[1] = facesFinalScore
    landmarkVal[1] = landmarkFinalScore
    logoVal[1] = logoFinalScore
    data.append(safeSearchVal)
    data.append(facesVal)
    data.append(landmarkVal)
    data.append(logoVal)
    data.append(finalTNScore)
    return (data)


results = []


@app.route("/members")
@cross_origin()
def members():
    return {"test": ["12", "89%", "32%"]}


@app.route("/uploads", methods=['GET', 'POST'])
@cross_origin()
def upload():
    file = request.files['file']

    # filename = 'uploadedFiles/'+str(uuid.uuid4())+'.png'
    # filename = 'flask-server/images/analysisImage.png'
    filename2 = 'front-end/src/component/counterup/analysisImage.png'
    file.save(filename2)
    print(file)

    # for image in (os.listdir(str(os.getcwd())+"/flask-server/images")):
    global results
    results = (detect_safe_search(
        "front-end/src/component/counterup/analysisImage.png"))
    print(results)
    return "done"
    # return redirect(url_for('analysis'))


@app.route("/analyse")
@cross_origin()
def analysis():
    # file = request.files['file']
    # # filename = 'uploadedFiles/'+str(uuid.uuid4())+'.png'
    # filename = 'flask-server/images/analysisImage.png'
    # file.save(filename)
    # for image in (os.listdir(str(os.getcwd())+"/flask-server/images")):
    #     results = (detect_safe_search(str(os.getcwd()) +
    #                "/flask-server/images/" + image))
    #     print(results)
    return {"safeSearch": results[0], "faces": results[1], "landmark": results[2], "logos": results[3], "finalScore": results[4]}

# if __name__ == "__main__":
#     app.run(debug=True)


@app.route("/emails", methods=['POST'])
@cross_origin()
def get_emails():

    email = request.form.get('email')
    print(email)
    # jstr = json.dumps(email, indent=4)
    # emails.append(email)
    DATA_FILENAME = 'emails.json'
    with open(DATA_FILENAME, mode='w', encoding='utf-8') as f:
        json.dump([], f)

    with open(DATA_FILENAME, mode='w', encoding='utf-8') as feedsjson:
        entry = {'email': email}
        emails.append(entry)
        json.dump(emails, feedsjson)

    # print(jstr)
    return emails


@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    app.run(debug=True)
