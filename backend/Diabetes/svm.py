import numpy as np

class SVM():

  # initiating the hyperparameters
  def __init__(self, learning_rate, no_of_iterations, lambda_parameter):
    self.learning_rate = learning_rate
    self.no_of_iterations = no_of_iterations
    self.lambda_parameter = lambda_parameter

  # fitting the dataset to SVM Classifier
  def fit(self, X, Y):
    # m  --> number of Data points --> number of rows
    # n  --> number of input features --> number of columns
    self.m, self.n = X.shape
    # initiating the weight value and bias value
    self.w = np.zeros(self.n)
    self.b = 0
    self.X = X
    self.Y = Y

    # implementing Gradient Descent algorithm for Optimization
    for i in range(self.no_of_iterations):
      self.update_weights()

  # function for updating the weight and bias value
  def update_weights(self):
    # label encoding
    y_label = np.where(self.Y <= 0, -1, 1)
    # gradients ( dw, db)
    for index, x_i in enumerate(self.X):
      condition = y_label[index] * (np.dot(x_i, self.w) - self.b) >= 1
      if (condition == True):
        dw = 2 * self.lambda_parameter * self.w
        db = 0
      else:
        dw = 2 * self.lambda_parameter * self.w - np.dot(x_i, y_label[index])
        db = y_label[index]

      self.w = self.w - self.learning_rate * dw
      self.b = self.b - self.learning_rate * db

  # predict the label for a given input value
  def predict(self, X):
    output = np.dot(X, self.w) - self.b  
    predicted_labels = np.sign(output)
    y_hat = np.where(predicted_labels <= -1, 0, 1)
    return y_hat
  
if __name__ == "__main__":
  import pandas as pd
  from sklearn.preprocessing import StandardScaler
  from sklearn.model_selection import train_test_split
  from sklearn.metrics import accuracy_score
  from sklearn.model_selection import KFold
  from sklearn.metrics import confusion_matrix

  # data = pd.read_csv("diabetes.csv")

  # X = np.array(data.drop(['Outcome'],1))
  # y = np.array(data['Outcome'])

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


  #WITHOUT KFOLD CROSS VALIDATION

  # X_train, X_test, Y_train, Y_test = train_test_split(X, y, test_size=0.2, random_state = 2)
  # print(X.shape, X_train.shape, X_test.shape)

  # classifier = SVM(learning_rate=0.001, no_of_iterations=1000, lambda_parameter=0.01)

  # # training the SVM classifier with training data
  # classifier.fit(X_train, Y_train)


  # # accuracy on test data
  # X_test_prediction = classifier.predict(X_test)
  # test_data_accuracy = accuracy_score(Y_test, X_test_prediction)
  # print('Accuracy score on test data = ', test_data_accuracy)



  kfold = KFold(n_splits=10)
  score_svm = []

  for train_index, test_index in kfold.split(X):
          #print("Train : \n", train_index, "\nTest : \n", test_index)
          X_train, X_test, y_train, y_test = X[train_index], X[test_index], y[train_index], y[test_index]
          k = 13 #Square root of Total Samples
          classifier = SVM(learning_rate=0.001, no_of_iterations=1000, lambda_parameter=0.01)
          classifier.fit(X_train, y_train)
          predictions = classifier.predict(X_test)
          a = accuracy_score(y_test, predictions)
          score_svm.append(a)
          cm = confusion_matrix(y_test, predictions)
          print(cm)
  print(score_svm)

  final_accuracy = sum(score_svm) / len(score_svm)
  print("SVM Accuracy = ", final_accuracy)



# input_data = (1,85,66,29,0,26.6,0.351,31)

# # change the input data to numpy array
# input_data_as_numpy_array = np.asarray(input_data)

# # reshape the array
# input_data_reshaped = input_data_as_numpy_array.reshape(1,-1)

# # standardizing the input data
# std_data = scaler.transform(input_data_reshaped)
# print(std_data)

# prediction = classifier.predict(std_data)

# if (prediction[0] == 0):
#   print('Non-Diabetic')
# else:
#   print('Diabetic')