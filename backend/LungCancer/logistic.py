import numpy as np


class LogisticRegression:
    def __init__(self, learning_rate=0.001, n_iters=1000):
        self.lr = learning_rate
        self.n_iters = n_iters
        self.weights = None
        self.bias = None

    def fit(self, X, y):
        n_samples, n_features = X.shape

        # init parameters
        self.weights = np.zeros(n_features)
        self.bias = 0

        # gradient descent
        for _ in range(self.n_iters):
            # approximate y with linear combination of weights and x, plus bias
            linear_model = np.dot(X, self.weights) + self.bias
            # apply sigmoid function
            y_predicted = self._sigmoid(linear_model)

            # compute gradients
            dw = (1 / n_samples) * np.dot(X.T, (y_predicted - y))
            db = (1 / n_samples) * np.sum(y_predicted - y)
            # update parameters
            self.weights -= self.lr * dw
            self.bias -= self.lr * db

    def predict(self, X):
        linear_model = np.dot(X, self.weights) + self.bias
        y_predicted = self._sigmoid(linear_model)
        y_predicted_cls = [1 if i > 0.5 else 0 for i in y_predicted]
        return np.array(y_predicted_cls)

    def _sigmoid(self, x):
        return 1 / (1 + np.exp(-x))


# Testing
if __name__ == "__main__":
    # Imports
    from sklearn.model_selection import train_test_split
    from sklearn import datasets
    import pandas as pd
    from sklearn.preprocessing import StandardScaler

    def accuracy(y_true, y_pred):
        accuracy = np.sum(y_true == y_pred) / len(y_true)
        return accuracy

    data = pd.read_csv("lung.csv")
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

    #WITHOUT KFOLD CROSS VALIDATION
    # X_train, X_test, y_train, y_test = train_test_split(
    #     X, y, test_size=0.2, random_state=1234
    # )

    # regressor = LogisticRegression(learning_rate=0.0001, n_iters=1000)
    # regressor.fit(X_train, y_train)
    # predictions = regressor.predict(X_test)

    # print("LR classification accuracy:", accuracy(y_test, predictions))


    from sklearn.model_selection import KFold
    from sklearn.metrics import confusion_matrix

    kfold = KFold(n_splits=10)

    score_log = []

    for train_index, test_index in kfold.split(X):
        #print("Train : \n", train_index, "\nTest : \n", test_index)
        X_train, X_test, y_train, y_test = X[train_index], X[test_index], y[train_index], y[test_index]
        k = 13 #Square root of Total Samples
        clf = LogisticRegression(learning_rate=0.0001, n_iters=1000)
        clf.fit(X_train, y_train)
        predictions = clf.predict(X_test)
        a = accuracy(y_test, predictions)
        score_log.append(a)
        cm = confusion_matrix(y_test, predictions)
        print(cm)
    print(score_log)

    final_accuracy = sum(score_log) / len(score_log)
    print("Logistic Accuracy = ", final_accuracy)

    # data = (6,148,72,35,0,33.6,0.627,50)
    # # scaler.fit(X)

    # #Converting to numpy array
    # data_array = np.asarray(data)

    # #Reshaping the array
    # data_reshape =  data_array.reshape(1,-1)
    # print(data_reshape)

    # #Standardizing the data
    # data_standard = scaler.transform(data_reshape)

    # prediction = clf.predict(data_standard)
    # print(prediction)


    # if(prediction[0] == 0):
    #     print('Not-diabetic')
    # else:
    #     print('Diabetic')
