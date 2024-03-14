import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.tree import DecisionTreeClassifier

from adaboost import AdaBoostClassifier
from gradient import GradientBoostingClassifier
from perceptron import Perceptron


def ensemble_model_allergy(allergy_data):
    #FOR ALGORITHMS WHICH ARE USING STANDARDIZED DATA
    data = pd.read_csv("./Allergy/allergycompressed.csv")
    X = data.drop(columns=['TYPE'], axis=1)
    X = np.array(X)
    y = data['TYPE'] #target
    y = data['TYPE'].map({'ALLERGY':1, 'NO ALLERGY':0})
    y = np.array(y)

    scaler = StandardScaler()
    scaler.fit(X)
    standardized_data = scaler.transform(X)
    # print(standardized_data)
    X = standardized_data
    y = data['TYPE'].map({'ALLERGY':1, 'NO ALLERGY':0})

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state = 2)

    base_model = DecisionTreeClassifier(max_depth=3)
    adaboost = AdaBoostClassifier(base_learner=base_model, T=100)

    gradient = GradientBoostingClassifier(n_estimators=100, learning_rate=.1, max_depth=3)

    perceptron = Perceptron(learning_rate=0.01, n_iters=1000)

    adaboost.fit(X_train, y_train)
    gradient.fit(X_train, y_train)
    perceptron.fit(X_train, y_train)

    # data = (1,0,1,1,0,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0)
    data = allergy_data

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

    percentageallergy = (ones/3)*100
    percentagenotallergy = 100 - percentageallergy

    if(ones>zeros):
        print('The Person Has Allergy With Percentage Of : ',percentageallergy,"%")
    else:
        print('The Person Has Allergy Diabetic With Percentage Of : ', percentagenotallergy, "%")

    return {
        'allergy': percentageallergy,
    }

if __name__ == '__main__':
    data = (1,0,1,1,0,1,1,0,1,0,1,0,1,0,0,0,0,0,0,0)
    ensemble_model_allergy(data)