import numpy as np


class NaiveBayes:
    def fit(self, X, y):
        n_samples, n_features = X.shape
        self._classes = np.unique(y)
        n_classes = len(self._classes)

        # calculate mean, var, and prior for each class
        self._mean = np.zeros((n_classes, n_features), dtype=np.float64)
        self._var = np.zeros((n_classes, n_features), dtype=np.float64)
        self._priors = np.zeros(n_classes, dtype=np.float64)

        for idx, c in enumerate(self._classes):
            X_c = X[y == c]
            self._mean[idx, :] = X_c.mean(axis=0)
            self._var[idx, :] = X_c.var(axis=0)
            self._priors[idx] = X_c.shape[0] / float(n_samples)

    def predict(self, X):
        y_pred = [self._predict(x) for x in X]
        return np.array(y_pred)

    def _predict(self, x):
        posteriors = []

        # calculate posterior probability for each class
        for idx, c in enumerate(self._classes):
            prior = np.log(self._priors[idx])
            posterior = np.sum(np.log(self._pdf(idx, x)))
            posterior = prior + posterior
            posteriors.append(posterior)

        # return class with highest posterior probability
        return self._classes[np.argmax(posteriors)]

    def _pdf(self, class_idx, x):
        mean = self._mean[class_idx]
        var = self._var[class_idx]
        numerator = np.exp(-((x - mean) ** 2) / (2 * var))
        denominator = np.sqrt(2 * np.pi * var)
        return numerator / denominator


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


    data = pd.read_csv("diabetesbin.csv")

    X = data.drop(columns=['class', 'Gender','Age','Gender'], axis=1)
    age = data['Age']
    gender = data['Gender'].map({'Male':1, 'Female':0})
    mapping = {'Yes': 1, 'No': 0}
    X = X.applymap(mapping.get)
    X.insert(loc = 0, column = 'Age', value = age)
    X.insert(loc = 1, column = 'Gender', value = gender)
    y = data['class'] #target
    y = data['class'].map({'Positive':1, 'Negative':0})

    scaler = StandardScaler()
    scaler.fit(X)
    standardized_data = scaler.transform(X)
    # print(standardized_data)
    X = standardized_data
    y = data['class'].map({'Positive':1, 'Negative':0})

    
    # X_train, X_test, y_train, y_test = train_test_split(
    #     X, y, test_size=0.2, random_state=123
    # )

    # nb = NaiveBayes()
    # nb.fit(X_train, y_train)
    # predictions = nb.predict(X_test)

    # print("Naive Bayes classification accuracy", accuracy(y_test, predictions))

    from sklearn.model_selection import KFold
    from sklearn.metrics import confusion_matrix

    kfold = KFold(n_splits=10)

    score_bayes = []

    for train_index, test_index in kfold.split(X):
        #print("Train : \n", train_index, "\nTest : \n", test_index)
        X_train, X_test, y_train, y_test = X[train_index], X[test_index], y[train_index], y[test_index]
        k = 13 #Square root of Total Samples
        clf = NaiveBayes()
        clf.fit(X_train, y_train)
        predictions = clf.predict(X_test)
        a = accuracy(y_test, predictions)
        score_bayes.append(a)
        cm = confusion_matrix(y_test, predictions)
        print(cm)
    print(score_bayes)

    final_accuracy = sum(score_bayes) / len(score_bayes)
    print("Naive Bayes Accuracy = ", final_accuracy)


    # data = (6,148,72,35,0,33.6,0.627,50)
    # # scaler.fit(X)

    # #Converting to numpy array
    # data_array = np.asarray(data)

    # #Reshaping the array
    # data_reshape =  data_array.reshape(1,-1)
    # print(data_reshape)

    # #Standardizing the data
    # data_standard = scaler.transform(data_reshape)
    # print(data_standard)

    # prediction = clf.predict(data_standard)
    # print(prediction)


    # if(prediction[0] == 0):
    #     print('Not-diabetic')
    # else:
    #     print('Diabetic')