import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier

from adaboost import AdaBoostClassifier
from gradient import GradientBoostingClassifier
from perceptron import Perceptron

import os

from csv import writer


#FOR ALGORITHMS WHICH ARE USING STANDARDIZED DATA
def ensemble_model_heart(inputData):
    print(os.getcwd())
    print(inputData)
    Smoking,AlcoholDrinking,Stroke,PhysicalHealth,MentalHealth,DiffWalking,Sex,Race,Diabetic,PhysicalActivity,GenHealth,SleepTime,Asthma,SkinProblems = inputData
    data = pd.read_csv("Heart/heart.csv")
    data = data.iloc[0:2000]
    X = data.drop(columns=['HeartDisease', 'Sex', 'Race', 'GenHealth', 'SleepTime', 'MentalHealth', 'PhysicalHealth'], axis=1)
    gender = data['Sex'].map({'Male':1, 'Female':0})
    race = data['Race'].map({'White':1, 'Black':2, 'Other':3})
    genhealth = data['GenHealth'].map({'Excellent':1, 'Very good':2, 'Good':3, 'Fair':4, 'Poor':5})
    sleeptime = data['SleepTime']
    mentalhealth = data['MentalHealth']
    physicalhealth = data['PhysicalHealth']
    mapping = {'Yes': 1, 'No': 0}
    X = X.applymap(mapping.get)
    X.insert(loc = 0, column = 'Gender', value = gender)
    X.insert(loc = 1, column = 'Race', value = race)
    X.insert(loc = 2, column = 'Genhealth', value = genhealth)
    X.insert(loc = 3, column = 'SleepTime', value = sleeptime)
    X.insert(loc = 4, column = 'MentalHealth', value = mentalhealth)
    X.insert(loc = 5, column = 'PhysicalHealth', value = physicalhealth)
    y = data['HeartDisease'] #target
    y = data['HeartDisease'].map({'Yes':1, 'No':0})

    scaler = StandardScaler()
    scaler.fit(X)
    standardized_data = scaler.transform(X)
    # print(standardized_data)
    X = standardized_data
    y = data['HeartDisease'].map({'Yes':1, 'No':0})

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state = 2)

    base_model = DecisionTreeClassifier(max_depth=3)
    adaboost = AdaBoostClassifier(base_learner=base_model, T=100)

    gradient = GradientBoostingClassifier(n_estimators=100, learning_rate=.1, max_depth=3)

    perceptron = Perceptron(learning_rate=0.01, n_iters=1000)

    adaboost.fit(X_train, y_train)
    gradient.fit(X_train, y_train)
    perceptron.fit(X_train, y_train)

    # data = (0,1,2,5,30,3,1,1,0,0,1,1,1,1)
    data = (Smoking,AlcoholDrinking,Stroke,PhysicalHealth,MentalHealth,DiffWalking,Sex,Race,Diabetic,PhysicalActivity,GenHealth,SleepTime,Asthma,SkinProblems)

    #Converting to numpy array
    data_array = np.asarray(data)

    #Reshaping the array
    data_reshape =  data_array.reshape(1,-1)

    #Standardizing the data
    data_standard = scaler.transform(data_reshape)

    prediction_adaboost = adaboost.predict(data_standard)
    prediction_gradient = gradient.predict(data_standard)
    prediction_perceptron = perceptron.predict(data_standard)

    AllPredictions = []
    print("Result Of Adaboost Classifier = ", prediction_adaboost)
    AllPredictions.append(prediction_adaboost[0])
    print("Result Of Gradient Boosting Classifier = ", prediction_gradient)
    AllPredictions.append(prediction_gradient[0])
    print("Result Of Perceptron Classifier = ", prediction_perceptron)
    AllPredictions.append(prediction_perceptron[0])

    print(AllPredictions)
    ones = AllPredictions.count(1)
    print(ones)
    zeros = AllPredictions.count(0)
    print(zeros)

    percentagediabetic = (ones/3)*100
    percentagenotdiabetic = 100 - percentagediabetic
    result = ""
    csvData = []

    if(ones>zeros):
        print('The Person Is Diabetic With Percentage Of : ',percentagediabetic,"%")
        result = "Yes"
    else:
        print('The Person Is Not Diabetic With Percentage Of : ', percentagenotdiabetic, "%")
        result = "No"

    csvData.append(result)
    for i in range(len(inputData)):
        if i == 6:
            if inputData[i] == 1:
                csvData.append("Male")
            elif inputData[i] == 0:
                csvData.append("Female")
        elif i == 7:
            if inputData[i] == 1:
                csvData.append("White")
            elif inputData[i] == 2:
                csvData.append("Black")
            elif inputData[i] == 3:
                csvData.append('Other')
        elif i == 10:
            if inputData[i] == 1:
                csvData.append("Excellent")
            elif inputData[i] == 2:
                csvData.append("Very good")
            elif inputData[i] == 3:
                csvData.append("Good")
            elif inputData[i] == 4:
                csvData.append("Fair")
            elif inputData[i] == 5:
                csvData.append("Poor")
        elif i == 11 or i == 4 or i == 3:
            csvData.append(inputData[i])
        else:
            if inputData[i] == 1:
                csvData.append("Yes")
            elif inputData[i] == 0:
                csvData.append("No")
    

    print(csvData, len(csvData))

    with open('./Heart/heart.csv', 'a') as f_object:
        writer_object = writer(f_object)
        writer_object.writerow(csvData)
        f_object.close()

    return {
        "HeartDisease": round(percentagediabetic, 2),
    }

if __name__ == '__main__':
    print("Hello World")