#!/usr/bin/env python
# coding: utf-8

# In[1]:


from sklearn.ensemble import RandomForestClassifier
# from sklearn.metrics import accuracy_score
# from sklearn.model_selection import KFold
from sklearn.preprocessing import StandardScaler
# from tqdm import tqdm
import cv2
import glob
import numpy as np
import joblib
# Initialize a StandardScaler
# scaler = StandardScaler()


# Load and preprocess a single X-ray image
def single_image(image_path):
    rf_model = joblib.load('./TB_New_Disease/RF_TB/random_forest_model.pkl')
    scaler = joblib.load('./TB_New_Disease/RF_TB/scaler.pkl')
    # Load image
    image = cv2.imread(image_path)
    
    # Preprocess image (resize, convert to grayscale, extract HOG features, etc.)
    resized_image = cv2.resize(image, (224, 224))
    gray_image = cv2.cvtColor(resized_image, cv2.COLOR_BGR2GRAY)
    # Compute GLCM-like features
    hist = cv2.calcHist([gray_image], [0], None, [256], [0, 256])
    hist /= hist.sum()
    mean = (hist * np.arange(256)).sum()
    variance = (hist * ((np.arange(256) - mean) ** 2)).sum()
    homogeneity = (hist / (1 + np.abs(np.arange(256) - np.arange(256)[:, None]))).sum()
    contrast = (hist * (np.abs(np.arange(256) - np.arange(256)[:, None]) ** 2)).sum()

    # Create feature vector
    X_processed = np.array([mean, variance, homogeneity, contrast]).reshape(1, -1)
    # Ensure the features are in the same format as used during training
    X_processed = scaler.transform(X_processed)  # Assuming you have a trained scaler

    # Make prediction
    y_pred_single_image = rf_model.predict(X_processed)

    # If you want probability scores for binary classification
    y_proba_single_image = rf_model.predict_proba(X_processed)[:, 1]

    # Display the prediction
#     print(f"Image: {image_path_to_test}, Prediction: {y_pred_single_image[0]}, Probability: {y_proba_single_image[0]}")
    return y_proba_single_image




