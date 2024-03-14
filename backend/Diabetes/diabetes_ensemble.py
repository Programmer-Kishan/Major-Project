import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

from random_forest import RandomForest
from knn import KNN
from naivebayes import NaiveBayes
from svm import SVM
from logistic import LogisticRegression

from csv import writer


def ensemble_model_diabetes(inputData):
    print(inputData, len(inputData))
    Age,Gender,Polyuria,Polydipsia,SuddenWeightLoss,Weakness,Polyphagia,GenitalThrush,VisualBlurring,Itching,Irritability,DelayedHealing,PartialParasis,MuscleStiffness,Alopecia,Obesity = inputData
    #FOR ALGORITHMS WHICH ARE USING STANDARDIZED DATA
    data = pd.read_csv("Diabetes\diabetesbin.csv")
    # data = pd.read_csv("./backend/Diabetes/diabetesbin.csv")

    if Gender == 'Male':
        Gender = 1
    else: 
        Gender = 0

    X = data.drop(columns=['class', 'Gender','Age','Gender'], axis=1)
    age = data['Age']
    gender = data['Gender'].map({'Male':1, 'Female':0})
    mapping = {'Yes': 1, 'No': 0}
    X = X.applymap(mapping.get)
    X.insert(loc = 0, column = 'Age', value = age)
    X.insert(loc = 1, column = 'Gender', value = gender)
    y = data['class'] #target
    y = data['class'].map({'Positive':1, 'Negative':0})
    print(X)

    scaler = StandardScaler()
    scaler.fit(X)
    standardized_data = scaler.transform(X)
    # print(standardized_data)
    X = standardized_data
    y = data['class'].map({'Positive':1, 'Negative':0})

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state = 2)

    knn = KNN(k=13)
    nb = NaiveBayes()
    svm = SVM(learning_rate=0.001, no_of_iterations=1000, lambda_parameter=0.01)
    log = LogisticRegression(learning_rate=0.0001, n_iters=1000)

    knn.fit(X_train, y_train)
    nb.fit(X_train, y_train)
    svm.fit(X_train, y_train)
    log.fit(X_train, y_train)


    # def accuracy(y_true, y_pred):
    #         accuracy = np.sum(y_true == y_pred) / len(y_true)
    #         return accuracy

    # predictknn = knn.predict(X_test)
    # accuracyknn = accuracy(y_test, predictknn)
    # print("Accuracy Of KNN = ", accuracyknn)

    # predictnb = nb.predict(X_test)
    # accuracynb = accuracy(y_test, predictnb)
    # print("Accuracy Of Naive Bayes = ", accuracynb)

    # predictsvm = svm.predict(X_test)
    # accuracysvm = accuracy(y_test, predictsvm)
    # print("Accuracy Of SVM = ", accuracysvm)

    # predictlog = log.predict(X_test)
    # accuracylog = accuracy(y_test, predictlog)
    # print("Accuracy Of Logistic Regression = ", accuracylog)


    datarf = pd.read_csv("Diabetes\diabetesbin.csv")
    # datarf = pd.read_csv("./backend/Diabetes/diabetesbin.csv")

    Xrf = datarf.drop(columns=['class', 'Gender','Age', 'Gender'], axis=1)
    age = datarf['Age']
    gender = datarf['Gender'].map({'Male':1, 'Female':0})
    mapping = {'Yes': 1, 'No': 0}
    Xrf = Xrf.applymap(mapping.get)
    Xrf.insert(loc = 0, column = 'Age', value = age)
    Xrf.insert(loc = 1, column = 'Gender', value = gender)
    Xrf = np.array(Xrf)
    yrf = np.array(datarf['class'].map({'Positive':1, 'Negative':0}))

    X_trainrf, X_testrf, y_trainrf, y_testrf = train_test_split(Xrf, yrf, test_size=0.2, random_state = 2)

    rf = RandomForest(n_trees=3, max_depth=5)
    rf.fit(X_trainrf, y_trainrf)
    # predictrf = rf.predict(X_test)
    # accuracyrf = accuracy(y_test, predictrf)
    # print("Accuracy Of Random Forest = ", accuracyrf)


    # Age = eval(input("Enter Your Age : "))
    # Gender = eval(input("What is Your Gender : "))
    # Polyuria = eval(input("Do You Have Polyuria : "))
    # Polydipsia = eval(input("Do You Have Polydipsia : "))
    # SuddenWeightLoss = eval(input("Have You Suffered From Sudden Weight Loss : "))
    # Weakness = eval(input("Do You Have Weakness : "))
    # Polyphagia = eval(input("Do You Have Polyphagia : "))
    # GenitalThrush = eval(input("Do You Have Genital Thrush : "))
    # VisualBlurring = eval(input("Are You Experiencing Visual Blurring : "))
    # Itching = eval(input("Are You Experiencing Any Itching : "))
    # Irritability = eval(input("Are You Feeling More Irritable Than Usual : "))
    # DelayedHealing = eval(input("Is Your Injury Taking Longer To Heal Than Expected : "))
    # PartialParasis = eval(input("Are You Experiencing Any Partial Parasis : "))
    # MuscleStiffness = eval(input("Are You Experiencing Muscle Stiffness : "))
    # Alopecia = eval(input("Do You Have Alopecia : "))
    # Obesity = eval(input("Are You Obese : "))

    data = (Age,Gender,Polyuria,Polydipsia,SuddenWeightLoss,Weakness,Polyphagia,GenitalThrush,VisualBlurring,Itching,Irritability,DelayedHealing,PartialParasis,MuscleStiffness,Alopecia,Obesity)

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
    csvData = []

    
    print(inputData, len(inputData))
    for i in range(len(inputData)):
        if (i == 1):
            csvData.append(inputData[i])
        elif i == 0:
            csvData.append(inputData[i])
        else:
            if inputData[i] == 1:
                csvData.append('Yes')
            elif inputData[i] == 0:
                csvData.append('No')
        print(csvData, i)
    print(len(csvData))

    if(ones>zeros):
        print('The Person Is Diabetic With Percentage Of : ',percentagediabetic,"%")
        result = "Positive"
    else:
        print('The Person Is Not Diabetic With Percentage Of : ', percentagenotdiabetic, "%")
        result = "Negative"

    csvData.append(result)

    if csvData[1] == 'Yes':
        csvData[1] = 'Male'
    else:
        csvData[1] = 'Female'

    print(csvData, len(csvData))


    with open('./Diabetes/diabetesbin.csv', 'a') as f_object:
    # with open('./backend/Diabetes/diabetesbin.csv', 'a') as f_object:
        writer_object = writer(f_object)
        writer_object.writerow(csvData)
        f_object.close()

    return {
        "diabetes": percentagediabetic,
    }

if __name__ == '__main__':
    ensemble_model_diabetes([60, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1])