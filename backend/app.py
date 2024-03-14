from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin  # Import the CORS module
# from ensemble import ensemble_model
import os
import sys

sys.path.insert(0, f"{os.getcwd()}/Diabetes")
sys.path.insert(0, f"{os.getcwd()}/LungCancer")
sys.path.insert(0, f"{os.getcwd()}/Heart")
sys.path.insert(0, f"{os.getcwd()}/TB_New_Disease")
sys.path.insert(0, f"{os.getcwd()}/Pneumonia")
sys.path.insert(0, f"{os.getcwd()}/Allergy")
sys.path.insert(0, f"{os.getcwd()}/Flu")
sys.path.insert(0, f"{os.getcwd()}/Malaria")

from diabetes_ensemble import ensemble_model_diabetes
from lung_ensemble import ensemble_model_lung
from heart_ensemble import ensemble_model_heart
from TB_ensemble import ensemble_model_TB
from Pneumonia_ensemble import pneumonia_ensemble
from allergy_ensemble import ensemble_model_allergy
from flu_ensemble import ensemble_model_flu
from malaria_ensemble import ensemble_model_malaria


app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})
# app.config['CORS_HEADERS'] = 'Content-Type'

UPLOAD_FOLDER = './Image_Folder'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def delete_file(file_path):
    print("From delete file: ", os.getcwd())
    try:
        os.remove(file_path)
        print(f"File {file_path} deleted successfully.")
    except FileNotFoundError:
        print(f"File {file_path} not found.")
    except Exception as e:
        print(f"An error occurred: {e}")

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/data', methods=['GET', 'POST'])
def api_data():
    print(request.method)
    if request.method == 'GET':
        # Handle GET request
        data = {'message': 'Hello from Flask!'}
        return jsonify(data)
    elif request.method == 'POST':
        # Handle POST request
        data = request.get_json()
        return jsonify(data)
    
@app.route('/api/diabetes', methods=['POST'])
def diabetesEnsemble():
    data = request.get_json()
    print(data['diabetesData'])
    Diabetes = ensemble_model_diabetes(data['diabetesData'])
    # print(percenteDiabetes)
    return jsonify(Diabetes)

@app.route('/api/lungcancer', methods=['POST'])
def lungEnsemble():
    data = request.get_json()
    lungs_data = ensemble_model_lung(data["lungCancer"])
    return jsonify(lungs_data)

@app.route('/api/heart', methods=['POST'])
def heartEnsemble():
    data = request.get_json()
    heart_data = ensemble_model_heart(data["heart"])
    return jsonify(heart_data)

@app.route('/api/allergy', methods=['POST'])
def allergyEnsemble():
    print(os.getcwd())
    data = request.get_json()
    allergy_data = ensemble_model_allergy(data['allergy'])
    return jsonify(allergy_data)

@app.route("/api/flu", methods=["POST"])
def fluEnsemble():
    data = request.get_json()
    flu_data = ensemble_model_flu(data['flu'])
    return jsonify(flu_data)

@app.route('/api/tb', methods=['POST']) 
def TBEnsemble():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'})
    
    image = request.files['image']
    if " " in image.filename:
        image.filename = image.filename.replace(" ", "%");
    image_path = f"./Image_Folder/{image.filename}"
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], image.filename))
    data = ensemble_model_TB(image_path)
    print("---------------------------------")
    print(data)
    delete_file(image_path)
    return {"response": data}

@app.route('/api/malaria', methods=['POST'])
def MalariaEnsemble():
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'})
    
    image = request.files['image']
    if " " in image.filename:
        image.filename = image.filename.replace(" ", "%");
    image_path = f"./Image_Folder/{image.filename}"
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], image.filename))
    data = ensemble_model_malaria(image_path)
    print("---------------------------------")
    print(data)
    delete_file(image_path)
    return {"malaria": data}

@app.route('/api/pneumonia', methods=['POST']) 
def pneumoniaEnsemble():
    print(f"Pneumonia Working directory: ", os.getcwd())
    if 'image' not in request.files:
        return jsonify({'error': 'No image part'})
    
    image = request.files['image']
    if " " in image.filename:
        image.filename = image.filename.replace(" ", '%')
    image_path = f"./Image_Folder/{image.filename}"
    image.save(os.path.join(app.config['UPLOAD_FOLDER'], image.filename))
    try:
        data = pneumonia_ensemble(image_path)
    except: 
        print("Some error Occured")
    print("---------------------------------")
    print(data)
    delete_file(image_path)
    return {"response": data}

if __name__ == '__main__':
    print("working directory: " + os.getcwd())
    app.run(debug=True)
