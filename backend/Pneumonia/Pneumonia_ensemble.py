
from P_CNN.prediction import predict_pneumonia_with_cnn
from RF_P.rf_prediction import single_image
from XG_P.XG_prediction import predict_single_image

def pneumonia_ensemble(image_path):
    result1 = predict_pneumonia_with_cnn(image_path)
    print(result1)


    result2 = single_image(image_path)
    print(result2)


    result3 = predict_single_image(image_path)
    print(result3)

    Predicted_Percentage = (result1+result2+result3)*100/3
    print(Predicted_Percentage)

    return {"pneumonia_percentage": Predicted_Percentage}

if __name__ == "__main__":
    image_path = './unseen_P.jpeg'
    pneumonia_ensemble(image_path)
