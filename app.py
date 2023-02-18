from google.cloud import storage
from google.cloud import vision
import os
import io
import json
import uuid
import random
import requests
from flask import Flask, request, jsonify, session, redirect, url_for,render_template_string
from flask_cors import CORS, cross_origin
from flask import send_from_directory
from pathlib import Path
from datetime import timedelta

app = Flask(__name__, static_folder='front-end/build', static_url_path='')
# app.config['SECRET_KEY'] = os.urandom(24)
# app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days = 7)
app.secret_key = 'BAD_SECRET_KEY'

os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = 'yttnanlaysis-4919c47df72c.json'
client = vision.ImageAnnotatorClient()
# Imports the Google Cloud client library
# Instantiates a client
storage_client = storage.Client()
# # The name for the new bucket
bucket_name = "analysisimagebucket"



CORS(app, support_credentials=True)

emails = []
# filename = ''
results_main=[]







def detect_faces(path):
    """Detects faces in an image."""
    with io.open(path, 'rb') as image_file:
        content = image_file.read()
    # content = file.read()

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

    # content = file.read()

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

    # content = file.read()

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

    # content = file.read()

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




@app.route("/members")
@cross_origin()
def members():
    return {"test": ["12", "89%", "32%"]}


@app.route("/uploads", methods=['GET', 'POST'])
@cross_origin()
def upload():
    file = request.files['file']
    
    # print(file)
    filename = str(uuid.uuid4())+'.png'
    session['filename'] = filename
    storage_client = storage.Client()
    bucket = storage_client.get_bucket(bucket_name)
    blob = bucket.blob(filename)
    blob.upload_from_string(file.read(), content_type=file.content_type)
    blob.download_to_filename(filename)

    path = Path(session['filename'])
    while path.is_file()==False:
        pass
    results = (detect_safe_search(session['filename']))
    results.append(session['filename'])
    os.remove(session['filename'])
    session.pop('filename', default=None)
    session['results'] = results
   
    
    
    return "done"
    
@app.route("/uid", methods=['GET', 'POST'])
@cross_origin()
def uid():
    global results_main

    uid = request.data
    print(type(uid))
    uid = uid.decode('UTF-8')  
    print(type(uid))  
    print(uid)
    session['uid'] = uid
    session['results'].append(uid[1:-1])
    results_main.append(session['results'])
    # session['results_main'] = results_main
    
    print(session['results'])
    print(results_main)

    return "done"






@app.route("/analyse")
@cross_origin()
def analysis():
    global results_main
    
    # print(results)
    # os.remove(filename)
    # print(session['results'])
    # session['results_main']=[]
    return jsonify(dataAn=results_main)

@app.route("/delete",methods=['GET', 'POST'])
@cross_origin()
def delete():
    global results_main
    uid = request.data
    print(uid)
    print(type(uid))
    uid = uid.decode('UTF-8') 
    
    print(uid[1:-1])
    print(results_main[0][6])
    
    # os.remove(filename)
    # print(session['results'])
    # results_copy = results_main
    for i in range(len(results_main)):
        if results_main[i][6]==uid[1:-1]:
            print(results_main[i])
            del results_main[i]
            # session['results_main']=results_copy
            break

    return 'done'
    

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


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
@cross_origin()
def serve(path):
    # session['results_main']
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


if __name__ == "__main__":
    

    # os.chdir("./front-end")
    # os.system("npm run build")
    # os.chdir("../")
    app.run(debug=True,threaded=True)


# from flask import Flask, render_template_string, request, session, redirect, url_for


# # Create the Flask application
# app = Flask(__name__)

# # Details on the Secret Key: https://flask.palletsprojects.com/en/1.1.x/config/#SECRET_KEY
# # NOTE: The secret key is used to cryptographically-sign the cookies used for storing
# #       the session data.
# app.secret_key = 'BAD_SECRET_KEY'


# @app.route('/set_email', methods=['GET', 'POST'])
# def set_email():
#     if request.method == 'POST':
#         # Save the form data to the session object
#         session['email'] = request.form['email_address']
#         return redirect(url_for('get_email'))

#     return """
#         <form method="post">
#             <label for="email">Enter your email address:</label>
#             <input type="email" id="email" name="email_address" required />
#             <button type="submit">Submit</button
#         </form>
#         """


# @app.route('/get_email')
# def get_email():
#     return render_template_string("""
#             {% if session['email'] %}
#                 <h1>Welcome {{ session['email'] }}!</h1>
#             {% else %}
#                 <h1>Welcome! Please enter your email <a href="{{ url_for('set_email') }}">here.</a></h1>
#             {% endif %}
#         """)


# @app.route('/delete_email')
# def delete_email():
#     # Clear the email stored in the session object
#     session.pop('email', default=None)
#     return '<h1>Session deleted!</h1>'


# if __name__ == '__main__':
#     app.run()