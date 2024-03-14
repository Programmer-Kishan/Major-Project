import numpy as np
import pandas as pd
from scipy.special import expit
from sklearn.tree import DecisionTreeRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

class Node():
    def __init__(self, info, left=None, right=None):
        ''' constructor '''
        self.info = info
        self.left = left
        self.right = right

class BinomialDeviance:

    def __init__(self, Y):
        self.Y = Y

    def update_terminal_regions(self, tree, terminal_regions, i=0):
        for leaf in np.where(terminal_regions == np.array([i]))[0]:
            # Update each leaf node directly
            y_leaf = self.Y[leaf]
            residual = tree.value[leaf][0, 0] / (tree.value[leaf][0, 0] + tree.value[leaf][0, 1])
            num = np.sum(residual)
            denom = np.sum((y_leaf - residual) * (1 - y_leaf + residual))
            eps = np.finfo(np.float32).eps
            denom = np.clip(denom, eps, None)
            tree.value[leaf][0, 0] = num / denom

    def get_init_raw_predictions(self, X):
        class_prior_ = np.bincount(self.Y)
        probas = np.ones((X.shape[0], 1)) * (class_prior_ / class_prior_.sum())

        proba_pos_class = probas[:, 1]

        raw_predictions = np.log(proba_pos_class / (1 - proba_pos_class))

        return raw_predictions

class GradientBoostingClassifier:
    def __init__(self, learning_rate=0.1, min_samples_leaf=1, max_depth=3, n_estimators=10):
        self.learning_rate = learning_rate
        self.max_depth = max_depth
        self.min_samples_leaf = min_samples_leaf
        self.n_estimators = n_estimators

    def fit(self, X, Y):

        self.trees = []
        self.classes, Y = np.unique(Y, return_inverse=True)
        self.loss = BinomialDeviance(Y)

        raw_predictions = self.loss.get_init_raw_predictions(X)
        residual = Y - expit(raw_predictions)

        for i in range(self.n_estimators - 1):
            tree = DecisionTreeRegressor(max_depth=self.max_depth, min_samples_leaf=self.min_samples_leaf)
            tree.fit(X, residual)

            self.loss.update_terminal_regions(tree.tree_, tree.apply(X))

            self.trees.append(tree)

            raw_predictions += self.learning_rate * tree.predict(X)
            residual = Y - expit(raw_predictions)

        return self

    def predict_proba(self, X):
        raw_predictions = np.zeros((X.shape[0], self.n_estimators))
        raw_predictions[:, 0] = self.loss.get_init_raw_predictions(X)

        for i, tree in enumerate(self.trees):
            raw_predictions[:, i + 1] = tree.predict(X)

        raw_predictions = raw_predictions[:, 0] + (np.sum(
            self.learning_rate * raw_predictions[:, 1:], axis=1) if self.n_estimators > 1 else 0)

        return expit(raw_predictions)

    def predict(self, X):
        y_probas = self.predict_proba(X)
        encoded_labels = np.where(y_probas < 0.5, 0, 1)
        return self.classes[encoded_labels]

data = pd.read_csv("./Flu/flu.csv")
X = data.drop(columns=['TYPE'], axis=1)
X = np.array(X)
y = data['TYPE'] #target
y = data['TYPE'].map({'FLU':1, 'NO FLU':0})
y = np.array(y)

scaler = StandardScaler()
scaler.fit(X)
standardized_data = scaler.transform(X)
# print(standardized_data)
X = standardized_data
y = data['TYPE'].map({'FLU':1, 'NO FLU':0})
# Split data
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

clf = GradientBoostingClassifier(n_estimators=100, learning_rate=.1, max_depth=3).fit(X_train, y_train)
y_pred = clf.predict(X_test)

print(f"accuracy = {np.sum(y_pred == y_test) / y_test.shape[0]}")
