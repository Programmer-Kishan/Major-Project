import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

class Perceptron:
    def __init__(self, learning_rate=0.01, n_iters=1000):
        self.lr = learning_rate
        self.n_iters = n_iters
        self.activation_func = self._unit_step_func
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        n_samples, n_features = X.shape

        # init parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        y_ = np.array([1 if i > 0 else 0 for i in y])

        for _ in range(self.n_iters):

            for idx, x_i in enumerate(X):

                linear_output = np.dot(x_i, self.weights) + self.bias
                y_predicted = self.activation_func(linear_output)

                # Perceptron update rule
                update = self.lr * (y_[idx] - y_predicted)

                self.weights += update * x_i
                self.bias += update

    def predict(self, X):
        linear_output = np.dot(X, self.weights) + self.bias
        y_predicted = self.activation_func(linear_output)
        return y_predicted

    def _unit_step_func(self, x):
        return np.where(x >= 0, 1, 0)


# Testing
if __name__ == "__main__":
    # Imports
    import matplotlib.pyplot as plt
    from sklearn.model_selection import train_test_split
    from sklearn import datasets

    def accuracy(y_true, y_pred):
        accuracy = np.sum(y_true == y_pred) / len(y_true)
        return accuracy

    data = pd.read_csv("heart.csv")
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

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=123
    )

    p = Perceptron(learning_rate=0.01, n_iters=1000)
    p.fit(X_train, y_train)
    predictions = p.predict(X_test)

    print("Perceptron classification accuracy", accuracy(y_test, predictions))