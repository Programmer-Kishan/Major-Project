import React, { useState } from "react";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";
import BlueShadeRectangle from "../../assets/Videos/BlueShadeRectangle.mp4";
import Result from "./Result";
// Pregnancies,Glucose,BloodPressure,SkinThickness,Insulin,BMI,DiabetesPedigreeFunction,Age
const Diabeties = () => {
  const [formData, setFormData] = useState({
    Age: {
      name: "Age",
      min: "0",
      max: "100",
      step: "1",
      inputValue: "",
    },
    gender: {
      name: "Gender",
      min: "0",
      max: "200",
      step: "1",
      inputValue: "",
    },
    Polyuria: {
      name: "Polyuria: increase in frequency and volume of urination?",
      min: "0",
      max: "150",
      step: "1",
      inputValue: "",
    },
    Polydipsia: {
      name: "Polydipsia: experience an unusually heightened and persistent sensation of thirst?",
      min: "0",
      max: "60",
      step: "1",
      inputValue: "",
    },
    weight_loss: {
      name: "Sudden Weight Loss",
      min: "0",
      max: "1000",
      step: "1",
      inputValue: "",
    },
    weakness: {
      name: "weakness",
      min: "0",
      max: "60",
      step: "0.001",
      inputValue: "",
    },
    Polyphagia: {
      name: "Polyphagia: heightened sensation of hunger and the need to eat larger quantities of food?",
      min: "0",
      max: "1",
      step: "0.001",
      inputValue: "",
    },
    genital_thrush: {
      name: "Genital Thrush: Itching and burning around genital areas?",
      min: "0",
      max: "100",
      step: "1",
      inputValue: "",
    },
    blurring: {
      name: "Visual Blurring",
      inputValue: "",
    },
    itching: {
      name: "Itching",
      inputValue: "",
    },
    irratation: {
      name: "Irritability",
      inputValue: "",
    },
    healing: {
      name: "Delayed Healing",
      inputValue: "",
    },
    paresis: {
      name: "Partial Paresis: muscle weakness or loss of muscle control in a particular area of the body?",
      inputValue: "",
    },
    stiffness: {
      name: "Muscle Stiffness: Muscle feel tight, tense, and resistant to movement?",
      inputValue: "",
    },
    alopecia: {
      name: "Alopecia: partial or complete loss of hair from areas of the body where it typically grow?",
      inputValue: "",
    },
    obseity: {
      name: "Obseity",
      inputValue: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("input");
  const [data, setData] = useState("");

  // Handle form field changes
  const handleInputChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      Age: {
        name: "Age",
        min: "1",
        max: "100",
        step: "1",
        inputValue: e.target.value,
      },
    }));
  };

  const handleSelectChange = (e, name) => {
    const value = e.target.value;
    if (name === "Gender") {
      setFormData((prev) => ({
        ...prev,
        gender: {
          name: "Gender",
          min: "0",
          max: "200",
          step: "1",
          inputValue: value,
        },
      }));
    } else if (
      name === "Polyuria: increase in frequency and volume of urination?"
    ) {
      setFormData((prev) => ({
        ...prev,
        Polyuria: {
          name: "Polyuria: increase in frequency and volume of urination?",
          min: "0",
          max: "150",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (
      name ===
      "Polydipsia: experience an unusually heightened and persistent sensation of thirst?"
    ) {
      setFormData((prev) => ({
        ...prev,
        Polydipsia: {
          name: "Polydipsia: experience an unusually heightened and persistent sensation of thirst?",
          min: "0",
          max: "60",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Sudden Weight Loss") {
      setFormData((prev) => ({
        ...prev,
        weight_loss: {
          name: "Sudden Weight Loss",
          min: "0",
          max: "1000",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "weakness") {
      setFormData((prev) => ({
        ...prev,
        weakness: {
          name: "weakness",
          min: "0",
          max: "60",
          step: "0.001",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (
      name ===
      "Polyphagia: heightened sensation of hunger and the need to eat larger quantities of food?"
    ) {
      setFormData((prev) => ({
        ...prev,
        Polyphagia: {
          name: "Polyphagia: heightened sensation of hunger and the need to eat larger quantities of food?",
          min: "0",
          max: "1",
          step: "0.001",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (
      name === "Genital Thrush: Itching and burning around genital areas?"
    ) {
      setFormData((prev) => ({
        ...prev,
        genital_thrush: {
          name: "Genital Thrush: Itching and burning around genital areas?",
          min: "0",
          max: "100",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Visual Blurring") {
      setFormData((prev) => ({
        ...prev,
        blurring: {
          name: "Visual Blurring",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Itching") {
      setFormData((prev) => ({
        ...prev,
        itching: {
          name: "Itching",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Irritability") {
      setFormData((prev) => ({
        ...prev,
        irratation: {
          name: "Irritability",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Delayed Healing") {
      setFormData((prev) => ({
        ...prev,
        healing: {
          name: "Delayed Healing",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (
      name ===
      "Partial Paresis: muscle weakness or loss of muscle control in a particular area of the body?"
    ) {
      setFormData((prev) => ({
        ...prev,
        paresis: {
          name: "Partial Paresis: muscle weakness or loss of muscle control in a particular area of the body?",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (
      name ===
      "Muscle Stiffness: Muscle feel tight, tense, and resistant to movement?"
    ) {
      setFormData((prev) => ({
        ...prev,
        stiffness: {
          name: "Muscle Stiffness: Muscle feel tight, tense, and resistant to movement?",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (
      name ===
      "Alopecia: partial or complete loss of hair from areas of the body where it typically grow?"
    ) {
      setFormData((prev) => ({
        ...prev,
        alopecia: {
          name: "Alopecia: partial or complete loss of hair from areas of the body where it typically grow?",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Obseity") {
      setFormData((prev) => ({
        ...prev,
        obseity: {
          name: "Obseity",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Do something with the form data, e.g., send it to an API
    console.log(formData);
    const inputFormData = Object.values(formData).map((data) => {
      if (data.inputValue === 'Male' || data.inputValue === 'Female')
        return data.inputValue
      return Number(data.inputValue);
    });
    console.log(inputFormData);
    setState("result");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/diabetes", {
        diabetesData: inputFormData,
      });
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen grid place-items-center p-3">
      <video autoPlay loop muted width="100%" className="absolute -z-10">
        <source src={BlueShadeRectangle} type="video/mp4" />
      </video> 
      {!loading ? (
        state === "input" ? (
          <div className="w-4/5 mx-auto p-6 bg-green-400 rounded-md shadow-md animate-slide-right">
            <h2 className="text-2xl font-semibold mb-4">
              Diabetes Risk Assessment Form
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
              {/* Render input fields */}
              {Object.values(formData).map((field, index) => {
                if (index === 0) {
                  return (
                    <div key={field.name} className="mb-4">
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-600"
                      >
                        {field.name}
                      </label>
                      <input
                        type="number"
                        id={field.name}
                        name={field.name}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        value={formData[field.inputValue]}
                        onChange={(e) => {
                          handleInputChange(e, index);
                        }}
                        className="mt-1 p-2 w-full border rounded-md"
                      />
                    </div>
                  );
                } else if (index === 1) {
                  return (
                    <div className="mb-4" key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-600"
                      >
                        {field.name}
                      </label>
                      <select
                        name={field.name}
                        id={field.name}
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={(e) => {
                          e.target.value !== "" &&
                            handleSelectChange(e, field.name);
                        }}
                      >
                        <option value="" selected>
                          {" "}
                        </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  );
                } else {
                  return (
                    <div className="mb-4" key={field.name}>
                      <label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-600"
                      >
                        {field.name}
                      </label>
                      <select
                        name={field.name}
                        id={field.name}
                        className="mt-1 p-2 w-full border rounded-md"
                        onChange={(e) => {
                          e.target.value !== "" &&
                            handleSelectChange(e, field.name);
                        }}
                      >
                        <option value="" selected>
                          {" "}
                        </option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  );
                }
              })}

              {/* Submit button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full h-screen">
            <Result percent={data.diabetes} disease="Diabetes" />
          </div>
        )
      ) : (
        <div className="w-full h-screen grid place-items-center my-10">
          <CirclesWithBar
            height="200"
            width="200"
            color="#ffffff"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            outerCircleColor=""
            innerCircleColor=""
            barColor=""
            ariaLabel="circles-with-bar-loading"
          />
        </div>
      )}
    </div>
  );
};

//     const data = ["Pregnancies","Glucose","BloodPressure","SkinThickness","Insulin","BMI","DiabetesPedigreeFunction","Age"]

//   return (
//     <div className='w-full flex flex-wrap'>
//         <form className='w-[80%] mx-auto my-5 flex flex-wrap'>
//             <div className='input-box w-1/4'>
//                 <label htmlFor="preg" className='label-style'>Pregnancies: </label>
//                 <input type="number" name="preg" id="preg" min='0' max='20' className='input-style'/>
//             </div>
//             <div className='input-box w-1/4'>
//                 <label htmlFor="glu" className='label-style'>Glucose</label>
//                 <input type="number" name="glu" id="glu" min='0' max='200' className='input-style'/>
//             </div>
//             <div className='input-box w-1/4'>
//                 <label htmlFor="bp" className='label-style'>BloodPressure</label>
//                 <input type="number" name="bp" id="bp" min='0' max='150' className='input-style'/>
//             </div>
//             <div className='input-box w-1/4'>
//                 <label htmlFor="sk" className='label-style'>SkinThickness</label>
//                 <input type="number" name="sk" id="sk" min='0' max='60' className='input-style'/>
//             </div>
//             <div className='input-box w-1/4'>
//                 <label htmlFor="ins" className='label-style'>Insulin</label>
//                 <input type="number" name="ins" id="ins" min='0' max='1000' className='input-style'/>
//             </div>
//             <div className='input-box w-1/4'>
//                 <label htmlFor="bmi" className='label-style'>BMI</label>
//                 <input type="number" name="bmi" id="bmi" min='0' max='60' step="0.001" className='input-style'/>
//             </div>
//             <div className='input-box w-1/4'>
//                 <label htmlFor="dpf" className='label-style'>DiabetesPedigreeFunction</label>
//                 <input type="number" name="dpf" id="dpf" min='0' max='1' step="0.001" className='input-style'/>
//             </div>
//             <div className='input-box w-1/4'>
//                 <label htmlFor="age" className='label-style'>Age</label>
//                 <input type="number" name="age" id="age" min='0' max='100' className='input-style'/>
//             </div>
//         </form>
//     </div>
//   )
// }

export default Diabeties;
