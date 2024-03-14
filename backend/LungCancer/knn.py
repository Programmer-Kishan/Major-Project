from collections import Counter

import numpy as np
from sklearn.metrics import confusion_matrix


def euclidean_distance(x1, x2):
    return np.sqrt(np.sum((x1 - x2) ** 2))


class KNN:
    def __init__(self, k=3):
        self.k = k

    def fit(self, X, y):
        y.reset_index(drop=True, inplace=True)
        self.X_train = X
        self.y_train = y

    def predict(self, X):
        y_pred = [self._predict(x) for x in X]
        return np.array(y_pred)

    def _predict(self, x):
        # Compute distances between x and all examples in the training set
        distances = [euclidean_distance(x, x_train) for x_train in self.X_train]
        # Sort by distance and return indices of the first k neighbors
        k_idx = np.argsort(distances)[: self.k]
        # Extract the labels of the k nearest neighbor training samples
        k_neighbor_labels = [self.y_train[i] for i in k_idx]
        # return the most common class label
        most_common = Counter(k_neighbor_labels).most_common(1)
        return most_common[0][0]


if __name__ == "__main__":
    # Imports
    from sklearn.preprocessing import StandardScaler
    from matplotlib.colors import ListedColormap
    import pandas as pd
    from sklearn.model_selection import train_test_split

    

    def accuracy(y_true, y_pred):
        accuracy = np.sum(y_true == y_pred) / len(y_true)
        return accuracy

    # data = pd.read_csv("diabetes.csv")

    # X = np.array(data.drop(['Outcome'],1))
    # y = np.array(data['Outcome'])

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

    # X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state = None)
    # print(X.shape, X_train.shape, X_test.shape)

    # clf = KNN()
    # clf.fit(X_train, y_train)


    # # accuracy on test data
    # X_test_prediction = clf.predict(X_test)
    # test_data_accuracy = accuracy(y_test, X_test_prediction)
    # print('Accuracy score on test data = ', test_data_accuracy)



    from sklearn.model_selection import KFold
    from sklearn.metrics import confusion_matrix

    kfold = KFold(n_splits=10)

    score_knn = []

    for train_index, test_index in kfold.split(X):
        #print("Train : \n", train_index, "\nTest : \n", test_index)
        X_train, X_test, y_train, y_test = X[train_index], X[test_index], y[train_index], y[test_index]
        k = 13 #Square root of Total Samples
        clf = KNN(k=k)
        clf.fit(X_train, y_train)
        predictions = clf.predict(X_test)
        a = accuracy(y_test, predictions)
        score_knn.append(a)
        cm = confusion_matrix(y_test, predictions)
        print(cm)
    print(score_knn)

    final_accuracy = sum(score_knn) / len(score_knn)
    print("KNN Accuracy = ", final_accuracy)

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
