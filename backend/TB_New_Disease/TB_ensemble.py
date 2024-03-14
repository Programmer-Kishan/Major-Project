from CNN_jupyter.CNN import predict_tb_with_cnn
from RF_TB.code import single_image
from XGBoost_TB.code import predict_single_image

import os

def ensemble_model_TB(image_path):
    # print(f"Working directory for TB: {os.getcwd()}")
    # print(f"From TB ensemble: {image_path}")
    result1 = predict_tb_with_cnn(image_path)
    print(result1)

    result2 = single_image(image_path)
    print(result2)#wrong output for unseenNormal

    result3 = predict_single_image(image_path)
    print(result3)

    Predicted_Percentage = (result1+result2+result3)*100/3
    print(Predicted_Percentage)
    return { "percentTB": Predicted_Percentage[0] }

if __name__ == '__main__':
    image_path = './TB_New_Disease/unseenTB2.png'
    ensemble_model_TB(image_path)