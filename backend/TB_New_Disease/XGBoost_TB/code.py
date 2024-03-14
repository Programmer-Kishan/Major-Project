#!/usr/bin/env python
# coding: utf-8

from skimage.feature import graycomatrix,hog

import xgboost as xgb
import cv2
import glob
from tqdm import tqdm
import time
import numpy as np
import joblib

# Load and preprocess a single X-ray image
def predict_single_image(image_path):
    xgb_model = xgb.XGBClassifier(objective='binary:logistic', eval_metric='logloss')
    xgb_model.load_model('./TB_New_Disease/XGBoost_TB/xgboost_model.json')
    
    scaler = joblib.load('./TB_New_Disease/XGBoost_TB/scaler.pkl')
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
    
    y_pred_single_image = xgb_model.predict(X_processed)
    y_proba_single_image = xgb_model.predict_proba(X_processed)[:, 1]
    return y_proba_single_image

#unseen TB : 0.81 probability i.e prediction = 1(TB)
#unseen normal : 0.68 probability
