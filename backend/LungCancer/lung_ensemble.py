import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from random_forest import RandomForest
from knn import KNN
from naivebayes import NaiveBayes
from svm import SVM
from logistic import LogisticRegression
import os

from csv import writer

def ensemble_model_lung(inputData):
    print(os.getcwd())
    print(inputData)
    GENDER,AGE,SMOKING,YELLOW_FINGERS,ANXIETY,PEER_PRESSURE,CHRONIC_DISEASE,FATIGUE ,ALLERGY ,WHEEZING,ALCOHOL_CONSUMING,COUGHING,SHORTNESS_OF_BREATH,SWALLOWING_DIFFICULTY,CHEST_PAIN = inputData
    #FOR ALGORITHMS WHICH ARE USING STANDARDIZED DATA
    data = pd.read_csv("LungCancer\lung.csv")
    data['LUNG_CANCER'].value_counts()

    # separating the features and target
    X = data.drop(columns=['LUNG_CANCER', 'GENDER'], axis=1) #features
    y = data['LUNG_CANCER'] #target
    y = data['LUNG_CANCER'].map({'YES':1, 'NO':0})


    scaler = StandardScaler()
    scaler.fit(X)
    standardized_data = scaler.transform(X)
    # print(standardized_data)
    X = standardized_data
    y = data['LUNG_CANCER'].map({'YES':1, 'NO':0})

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state = 2)

    knn = KNN(k=13)
    nb = NaiveBayes()
    svm = SVM(learning_rate=0.001, no_of_iterations=1000, lambda_parameter=0.01)
    log = LogisticRegression(learning_rate=0.0001, n_iters=1000)

    knn.fit(X_train, y_train)
    nb.fit(X_train, y_train)
    svm.fit(X_train, y_train)
    log.fit(X_train, y_train)

    #FOR ALGORITHMS NOT USING STANDARDIZED DATA
    datarf = pd.read_csv("LungCancer\lung.csv")
    datarf['LUNG_CANCER'].value_counts()

    # separating the features and target
    Xrf = datarf.drop(columns=['LUNG_CANCER', 'GENDER'], axis=1) #features
    Xrf = np.array(X)
    yrf = datarf['LUNG_CANCER'] #target
    yrf = datarf['LUNG_CANCER'].map({'YES':1, 'NO':0})
    yrf = np.array(y)

    X_trainrf, X_testrf, y_trainrf, y_testrf = train_test_split(Xrf, yrf, test_size=0.2, random_state = 2)

    rf = RandomForest(n_trees=3, max_depth=5)
    rf.fit(X_trainrf, y_trainrf)

    # AGE = eval(input("Enter Age : "))
    # SMOKING = eval(input("Do You Smoke? : "))
    # YELLOW_FINGERS = eval(input("Do You Have Yellow Fingers? : "))
    # ANXIETY = eval(input("Do You Experience Anxiety? : "))
    # PEER_PRESSURE = eval(input("Do You Experience PEER_PRESSURE? : "))
    # CHRONIC_DISEASE = eval(input("Do You Have Any CHRONIC DISEASE? : "))
    # FATIGUE = eval(input("Do You Experience FATIGUE? : "))
    # ALLERGY = eval(input("Do You Have Any Allergies? : "))
    # WHEEZING = eval(input("Do You Have Any Wheezing Issues? : "))
    # ALCOHOL_CONSUMING = eval(input("Do You Consume Alcohol? : "))
    # COUGHING = eval(input("Do You Cough Frequently? : "))
    # SHORTNESS_OF_BREATH = eval(input("Do You Experience Shortness of Breath? : "))
    # SWALLOWING_DIFFICULTY = eval(input("Do You Experience Swallowing Difficulties? : "))
    # CHEST_PAIN = eval(input("Do You Experience Chest Pain? : "))
        

    data = (AGE,SMOKING,YELLOW_FINGERS,ANXIETY,PEER_PRESSURE,CHRONIC_DISEASE,FATIGUE ,ALLERGY ,WHEEZING,ALCOHOL_CONSUMING,COUGHING,SHORTNESS_OF_BREATH,SWALLOWING_DIFFICULTY,CHEST_PAIN)
        # scaler.fit(X)

    #Converting to numpy array
    data_array = np.asarray(data)

    #Reshaping the array
    data_reshape =  data_array.reshape(1,-1)

    #Standardizing the data
    data_standard = scaler.transform(data_reshape)

    predictionrf = rf.predict(data_reshape)
    predictionknn = knn.predict(data_standard)
    predictionnb = nb.predict(data_standard)
    predictionsvm = svm.predict(data_standard)
    predictionlog = log.predict(data_standard)

    AllPredictions = []
    print("Result Of Random Forest = ", predictionrf)
    AllPredictions.append(predictionrf[0])
    print("Result Of KNN = ", predictionknn)
    AllPredictions.append(predictionknn[0])
    print("Result Of Naive Bayes = ", predictionnb)
    AllPredictions.append(predictionnb[0])
    print("Result Of SVM = ", predictionsvm)
    AllPredictions.append(predictionsvm[0])
    print("Result Of Logistic Regression = ", predictionlog)
    AllPredictions.append(predictionlog[0])

    print(AllPredictions)
    ones = AllPredictions.count(1)
    print(ones)
    zeros = AllPredictions.count(0)
    print(zeros)

    percentagediabetic = (ones/5)*100
    percentagenotdiabetic = 100 - percentagediabetic
    result = ""

    if(ones>zeros):
        print('The Person has Lung Cancel With Percentage Of : ',percentagediabetic,"%")
        result = "YES"
    else:
        print('The Person Is does not have lung cancer With Percentage Of : ', percentagenotdiabetic, "%")
        result = "NO"

    with open('./LungCancer/lung.csv', 'a') as f_object:
        writer_object = writer(f_object)
        writer_object.writerow([inputData, result])
        f_object.close()

    return {
        "lungCancer": percentagediabetic,
    }

    # 2,180,70,20,150,25,0.56,70 #D
    # 0,120,50,10,100,40,0.56,70 #ND

if __name__ == '__main__':
    ensemble_model_lung([65, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1])