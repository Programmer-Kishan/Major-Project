import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import StandardScaler

import os

class AdaBoostClassifier:
    
    def __init__(self, base_learner, T=100):
        self.T = T
        self.base_learner = base_learner
    
    def fit(self, X_train, y_train):
        N = X_train.shape[0]
        self.W = np.full(N, fill_value=1/N)
        self.h_t = []
        self.a_t = []

        for i in range(self.T-1):
            ht = self.base_learner.fit(X_train, y_train)
            self.h_t.append(ht)

            incorrect = 1 - (ht.predict(X_train) == y_train)
            errt = np.sum(self.W*incorrect) / np.sum(self.W, axis=0)

            at = np.log((1 - errt) / errt)
            self.a_t.append(at)

            self.W = self.W * np.exp(at*incorrect)
    
    def predict(self, X):
        y_preds = []
        for ht in self.h_t:
            y_preds.append(ht.predict(X))

        y_preds = np.asarray(y_preds)
        self.a_t = np.array(self.a_t).reshape(len(self.a_t), 1)

        preds = np.sign(y_preds.T@self.a_t).flatten()

        return preds

    def get_accuracy(sel, X, y):
        acc = sum(model.predict(X) == y) / len(y)
        return acc
print(os.getcwd())
data = pd.read_csv("./Allergy/allergy.csv")
X = data.drop(columns=['TYPE'], axis=1)
X = np.array(X)
y = data['TYPE'] #target
y = data['TYPE'].map({'ALLERGY':1, 'NO ALLERGY':-1})
y = np.array(y)

scaler = StandardScaler()
scaler.fit(X)
standardized_data = scaler.transform(X)
# print(standardized_data)
X = standardized_data
y = data['TYPE'].map({'ALLERGY':1, 'NO ALLERGY':-1})

X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

base_model = DecisionTreeClassifier(max_depth=3)

model = AdaBoostClassifier(base_learner=base_model, T=100)
model.fit(X_train, y_train)

acc = model.get_accuracy(X_test, y_test)
print(acc)