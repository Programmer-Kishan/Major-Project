import tensorflow as tf
import os

def predict_pneumonia_with_cnn(image_path):
    print("working directory for CNN: ", os.getcwd())
    # Load the pre-trained CNN model
    model = tf.keras.models.load_model('./Pneumonia/P_CNN/CNN_pneumonia_model.keras')

    # Load and preprocess the image
    image = tf.keras.preprocessing.image.load_img(image_path, target_size=(224, 224))
    image = tf.keras.preprocessing.image.img_to_array(image)
    image = tf.expand_dims(image, axis=0)

    # Predict the probability of tuberculosis
    prediction = model.predict(image)

    # Get the probability of tuberculosis
    probability_of_p = prediction[0][0]

    # Convert the probability to a binary output
    if probability_of_p > 0.5:
        output = 'TB'
    else:
        output = 'Normal'
#     print(output)
    return probability_of_p


if __name__ == '__main__':
    result = predict_pneumonia_with_cnn('./unseen_P.jpeg')
    print(result)

