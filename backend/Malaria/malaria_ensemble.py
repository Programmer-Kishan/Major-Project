import os
from RF_Malaria.prediction import single_image
from XG_Malaria.prediction import predict_single_image

def ensemble_model_malaria(image_path):
    result1 = single_image(image_path)
    print(result1)#wrong output for unseenNormal


    result2 = predict_single_image(image_path)
    print(result2)

    Predicted_Percentage = (result1+result2)*100/2
    print(Predicted_Percentage)

    return {
        "malaria": Predicted_Percentage
    }

if __name__ == '__main__':
    print(os.getcwd())
    image_path = 'C33P1thinF_IMG_20150619_121229a_cell_177.png'
    print(ensemble_model_malaria(image_path))