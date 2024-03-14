import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.tree import DecisionTreeClassifier
from sklearn.preprocessing import StandardScaler

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
y = data['HeartDisease'].map({'Yes':1, 'No':-1})

scaler = StandardScaler()
scaler.fit(X)
standardized_data = scaler.transform(X)
# print(standardized_data)
X = standardized_data
y = data['HeartDisease'].map({'Yes':1, 'No':-1})

X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

base_model = DecisionTreeClassifier(max_depth=3)

model = AdaBoostClassifier(base_learner=base_model, T=100)
model.fit(X_train, y_train)

acc = model.get_accuracy(X_test, y_test)
print(acc)