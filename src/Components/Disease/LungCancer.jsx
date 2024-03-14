import React, { useState } from "react";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";
import BlueRectangle from "../../assets/Videos/BlueRectangle.mp4";
import Result from "./Result";

const LungCancer = () => {
  const [formData, setFormData] = useState({
    Gender: {
      name: "Gender", inputValue: "",
    },
    Age: {
      name: "age",
      min: "1",
      max: "100",
      step: "1",
      inputValue: "",
    },
    smoke: {
      name: "Smoking",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    yellow_finger: {
      name: "Yellow Finger",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    anxiety: {
      name: "Anxiety",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    peer_pressure: {
      name: "Peer Pressure",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    chronic_disease: {
      name: "Chronic Disease",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    fatigue: {
      name: "Fatigue",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    allergies: {
      name: "Allergies",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    wheezing_issue: {
      name: "Wheezing Issues",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    alcohol: {
      name: "Alcohol Consumption",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    cough: {
      name: "Coughing Frequently",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    breath_shortness: {
      name: "Shortness of Breath",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    swallowing: {
      name: "Swallowing Difficulties",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
    chest_pain: {
      name: "Chest Pain",
      min: "0",
      max: "1",
      step: "1",
      inputValue: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("input");
  const [data, setData] = useState("");

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
        Gender: {
          name: "Gender",
          inputValue: value
        }
      }))
    }
    if (name === "Smoking") {
      setFormData((prev) => ({
        ...prev,
        smoke: {
          name: "Smoking",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Yellow Finger") {
      setFormData((prev) => ({
        ...prev,
        yellow_finger: {
          name: "Yellow Finger",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Anxiety") {
      setFormData((prev) => ({
        ...prev,
        anxiety: {
          name: "Anxiety",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Peer Pressure") {
      setFormData((prev) => ({
        ...prev,
        peer_pressure: {
          name: "Peer Pressure",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Chronic Disease") {
      setFormData((prev) => ({
        ...prev,
        chronic_disease: {
          name: "Chronic Disease",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Fatigue") {
      setFormData((prev) => ({
        ...prev,
        fatigue: {
          name: "Fatigue",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Allergies") {
      setFormData((prev) => ({
        ...prev,
        allergies: {
          name: "Allergies",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Wheezing Issues") {
      setFormData((prev) => ({
        ...prev,
        wheezing_issue: {
          name: "Wheezing Issues",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Alcohol Consumption") {
      setFormData((prev) => ({
        ...prev,
        alcohol: {
          name: "Alcohol Consumption",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Coughing Frequently") {
      setFormData((prev) => ({
        ...prev,
        cough: {
          name: "Coughing Frequently",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Shortness of Breath") {
      setFormData((prev) => ({
        ...prev,
        breath_shortness: {
          name: "Shortness of Breath",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Swallowing Difficulties") {
      setFormData((prev) => ({
        ...prev,
        swallowing: {
          name: "Swallowing Difficulties",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "Chest Pain") {
      setFormData((prev) => ({
        ...prev,
        chest_pain: {
          name: "Chest Pain",
          min: "0",
          max: "1",
          step: "1",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const inputFormData = Object.values(formData).map((data) => {
      if (data.inputValue === 'M' || data.inputValue === 'F')
        return data.inputValue
      return Number(data.inputValue);
    });
    console.log(inputFormData);
    setState("result");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000//api/lungcancer",
        {
          lungCancer: inputFormData,
        }
      );
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
        <source src={BlueRectangle} type="video/mp4" />
      </video> 
      {!loading ? (
        state === "input" ? (
          <div className="w-1/2 mx-auto p-6 bg-teal-500 rounded-md shadow-md animate-slide-right">
            <h2 className="text-2xl font-semibold mb-4">
              Lung Cancer Assessment Form
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
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                      </select>
                    </div>
                  )
                }
                if (index === 1) {
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
                // onClick={handleSubmit}
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full h-screen grid place-items-center">
            <Result percent={data.lungCancer} disease="Lung Cancer" />
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

export default LungCancer;
