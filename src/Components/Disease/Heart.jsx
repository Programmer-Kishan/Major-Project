import React, { useState } from "react";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";
import RedHeart from '../../assets/Videos/RedHeart.mp4'
import Result from "./Result";

const Heart = () => {
  const [formData, setFormData] = useState({
    Smoking: {
      name: "Smoking",
      inputValue: "",
      type: "select",
      options: ["Yes", "No"],
    },
    AlcoholDrinking: {
      name: "AlcoholDrinking",
      inputValue: "",
      type: "select",
      options: ["Yes", "No"],
    },
    Stroke: {
      name: "Stroke",
      inputValue: "",
      type: "select",
      options: ["Yes", "No"],
    },
    PhysicalHealth: {
      name: "PhysicalHealth",
      inputValue: "",
      type: "number",
      min: "0",
      max: "30",
      step: "1",
    },
    MentalHealth: {
      name: "MentalHealth",
      inputValue: "",
      type: "number",
      min: "0",
      max: "30",
      step: "1",
    },
    DiffWalking: {
      name: "DiffWalking",
      inputValue: "",
      type: "select",
      options: ["Yes", "No"],
    },
    Sex: {
      name: "Sex",
      inputValue: "",
      type: "select",
      options: ["Male", "Female"],
    },
    Race: {
      name: "Race",
      inputValue: "",
      type: "select",
      options: ["White", "Black", "Other"],
    },
    Diabetic: {
      name: "Diabetic",
      inputValue: "",
      type: "select",
      options: ["Yes", "No"],
    },
    PhysicalActivity: {
      name: "PhysicalActivity",
      inputValue: "",
      type: "select",
      options: ["Yes", "No"],
    },
    GenHealth: {
      name: "GenHealth",
      inputValue: "",
      type: "select",
      options: ["Very good", "Fair", "Good", "Excellent", "Poor"],
    },
    SleepTime: {
      name: "SleepTime",
      inputValue: "",
      type: "number",
      min: "1",
      max: "15",
      step: "1",
    },
    Asthma: {
      name: "Asthma",
      inputValue: "",
      type: "select",
      options: ["Yes", "No"],
    },
    SkinProblem: {
      name: "SkinProblem",
      inputValue: "",
      type: "select",
      options: ["Yes", "No"],
    },
  });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("input");
  const [data, setData] = useState("");

  const handleSelectChange = (e, name) => {
    const value = e.target.value;
    if (name === "Smoking") {
      setFormData((prev) => ({
        ...prev,
        Smoking: {
          name: "Smoking",
          inputValue: value === "Yes" ? 1 : 0,
          type: "select",
          options: ["Yes", "No"],
        },
      }));
    }
    if (name === "AlcoholDrinking") {
      setFormData((prev) => ({
        ...prev,
        AlcoholDrinking: {
          name: "AlcoholDrinking",
          type: "select",
          options: ["Yes", "No"],
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Stroke") {
      setFormData((prev) => ({
        ...prev,
        Stroke: {
          name: "Stroke",
          inputValue: value === "Yes" ? 1 : 0,
          type: "select",
          options: ["Yes", "No"],
        },
      }));
    } else if (name === "PhysicalHealth") {
      setFormData((prev) => ({
        ...prev,
        PhysicalHealth: {
          name: "PhysicalHealth",
          min: "0",
          max: "30",
          step: "1",
          type: "number",
          inputValue: value
        },
      }));
    } else if (name === "MentalHealth") {
      setFormData((prev) => ({
        ...prev,
        MentalHealth: {
          name: "MentalHealth",
          min: "0",
          max: "30",
          step: "1",
          type: "number",
          inputValue: value
        },
      }));
    } else if (name === "DiffWalking") {
      setFormData((prev) => ({
        ...prev,
        DiffWalking: {
          name: "DiffWalking",
          inputValue: value === "Yes" ? 1 : 0,
          type: "select",
          options: ["Yes", "No"],
        },
      }));
    } else if (name === "Sex") {
      setFormData((prev) => ({
        ...prev,
        Sex: {
          name: "Sex",
          inputValue: value === "Male" ? 1 : 0,
          type: "select",
          options: ["Male", "Female"],
        },
      }));
    } else if (name === "Race") {
        let race =  ""
        if (value === 'White')
            race = 1
        else if (value === 'Black')
            race = 2
        else if (value === 'Other')
            race = 3
      setFormData((prev) => ({
        ...prev,
        Race: {
          name: "Race",
          inputValue: race,
          type: "select",
          options: ["White", "Black", "Other"],
        },
      }));
    } else if (name === "Diabetic") {
      setFormData((prev) => ({
        ...prev,
        Diabetic: {
          name: "Diabetic",
          inputValue: value === "Yes" ? 1 : 0,
          type: "select",
          options: ["Yes", "No"],
        },
      }));
    } else if (name === "PhysicalActivity") {
      setFormData((prev) => ({
        ...prev,
        PhysicalActivity: {
          name: "PhysicalActivity",
          inputValue: value === "Yes" ? 1 : 0,
          type: "select",
          options: ["Yes", "No"],
        },
      }));
    } else if (name === "GenHealth") {
        // 'Excellent':1, 'Very good':2, 'Good':3, 'Fair':4, 'Poor':5
      let genhealth = "";
      if (value == "Very good") genhealth = 2;
      else if (value == "Fair") genhealth = 4;
      else if (value == "Good") genhealth = 3;
      else if (value == "Excellent") genhealth = 1;
      else if (value == "Poor") genhealth = 5;
      setFormData((prev) => ({
        ...prev,
        GenHealth: {
          name: "GenHealth",
          inputValue: genhealth,
          type: "select",
          options: ["Very good", "Fair", "Good", "Excellent", 'Poor'],
        },
      }));
    } else if (name === "SleepTime") {
      setFormData((prev) => ({
        ...prev,
        SleepTime: {
          name: "SleepTime",
          min: "0",
          max: "15",
          step: "1",
          type: "number",
          inputValue: value
        },
      }));
    } else if (name === "Asthma") {
      setFormData((prev) => ({
        ...prev,
        Asthma: {
          name: "Asthma",
          inputValue: value === "Yes" ? 1 : 0,
          type: "select",
          options: ["Yes", "No"],
        },
      }));
    } else if (name === "SkinProblem") {
      setFormData((prev) => ({
        ...prev,
        SkinProblem: {
          name: "SkinProblem",
          inputValue: value === "Yes" ? 1 : 0,
          type: "select",
          options: ["Yes", "No"],
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const inputFormData = Object.values(formData).map((data) => {
      return Number(data.inputValue);
    });
    console.log(inputFormData);
    setState("result");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000//api/heart", {
        heart: inputFormData,
      });
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  return (
    <div className="w-full h-screen grid place-items-center">
      <video autoPlay loop muted width="100%" className="absolute -z-10">
        <source src={RedHeart} type="video/mp4" />
      </video>
      {!loading ? (
        state === "input" ? (
          <div className="w-1/2 mx-auto p-6 bg-red-400 rounded-md shadow-md animate-slide-right">
            <h2 className="text-2xl font-semibold mb-4">
              Heart Disease Assessment Form
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6">
              {/* Render input fields */}
              {Object.values(formData).map((field, index) => {
                if (field.type === "number") {
                    return (
                        <div key={field.name} className="mb-4">
                            <label
                                htmlFor={field.name}
                                className="block text-sm font-medium text-gray-600"
                            >
                                {field.name}
                            </label>
                            <input 
                                name={field.name}
                                id={field.name}
                                type={field.type}
                                min={field.min}
                                max={field.max}
                                step={field.step}
                                value={formData[field.inputValue]}
                                className="mt-1 p-2 w-full border rounded-md"
                                onChange={(e) => {
                                    e.target.value !== "" &&
                                    handleSelectChange(e, field.name);
                                }}
                            />
                        </div>
                    )
                } else if (field.type === "select") {
                    return (
                        <div key={field.name} className="mb-4">
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
                        {field.options.map(option => <option value={option}>{option}</option>)}
                      </select>
                    </div>
                  );
                }
              })}

              {/* Submit button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                // onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full h-screen grid place-items-center">
            <Result percent={data.HeartDisease} disease="Heart Disease" className="text-white"/>
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

export default Heart;