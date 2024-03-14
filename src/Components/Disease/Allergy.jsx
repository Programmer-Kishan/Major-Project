import React, { useState } from "react";
import axios from "axios";
import { CirclesWithBar } from "react-loader-spinner";
import Galaxy from '../../assets/Videos/Galaxy.mp4'
import Result from "./Result";
// COUGH,MUSCLE_ACHES,TIREDNESS,SORE_THROAT,RUNNY_NOSE,STUFFY_NOSE,FEVER,NAUSEA,VOMITING,DIARRHEA,SHORTNESS_OF_BREATH,DIFFICULTY_BREATHING,LOSS_OF_TASTE,LOSS_OF_SMELL,ITCHY_NOSE,ITCHY_EYES,ITCHY_MOUTH,ITCHY_INNER_EAR,SNEEZING,PINK_EYE,TYPE
const Allergy = () => {
  const [formData, setFormData] = useState({
    Cough: {
      name: "Cough",
      inputValue: "",
    },
    MuscleAche: {
      name: "Muscle Ache",
      inputValue: "",
    },
    TIREDNESS: {
      name: "TIREDNESS",
      inputValue: "",
    },
    SORE_THROAT: {
      name: "SORE_THROAT",
      inputValue: "",
    },
    RUNNY_NOSE: {
      name: "RUNNY_NOSE",
      inputValue: "",
    },
    STUFFY_NOSE: {
      name: "STUFFY_NOSE",
      inputValue: "",
    },
    FEVER: {
      name: "FEVER",
      inputValue: "",
    },
    NAUSEA: {
      name: "NAUSEA",
      inputValue: "",
    },
    VOMITING: {
      name: "VOMITING",
      inputValue: "",
    },
    DIARRHEA: {
      name: "DIARRHEA",
      inputValue: "",
    },
    SHORTNESS_OF_BREATH: {
      name: "SHORTNESS_OF_BREATH",
      inputValue: "",
    },
    DIFFICULTY_BREATHING: {
      name: "DIFFICULTY_BREATHING",
      inputValue: "",
    },
    LOSS_OF_TASTE: {
      name: "LOSS_OF_TASTE",
      inputValue: "",
    },
    LOSS_OF_SMELL: {
      name: "LOSS_OF_SMELL",
      inputValue: "",
    },
    ITCHY_NOSE: {
      name: "ITCHY_NOSE",
      inputValue: "",
    },
    ITCHY_EYES: {
      name: "ITCHY_EYES",
      inputValue: "",
    },
    ITCHY_MOUTH: {
      name: "ITCHY_MOUTH",
      inputValue: "",
    },
    ITCHY_INNER_EAR: {
      name: "ITCHY_INNER_EAR",
      inputValue: "",
    },
    SNEEZING: {
      name: "SNEEZING",
      inputValue: "",
    },
    PINK_EYE: {
      name: "PINK_EYE",
      inputValue: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("input");
  const [data, setData] = useState("");
// COUGH,MUSCLE_ACHES,TIREDNESS,SORE_THROAT,RUNNY_NOSE,STUFFY_NOSE,FEVER,NAUSEA,VOMITING,DIARRHEA,SHORTNESS_OF_BREATH,DIFFICULTY_BREATHING,LOSS_OF_TASTE,LOSS_OF_SMELL,ITCHY_NOSE,ITCHY_EYES,ITCHY_MOUTH,ITCHY_INNER_EAR,SNEEZING,PINK_EYE,TYPE

  const handleSelectChange = (e, name) => {
    const value = e.target.value;
    if (name === "Cough") {
      setFormData((prev) => ({
        ...prev,
        Cough: {
          name: "Cough",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    }
    if (name === "Muscle Ache") {
      setFormData((prev) => ({
        ...prev,
        MuscleAche: {
          name: "Muscle Ache",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "TIREDNESS") {
      setFormData((prev) => ({
        ...prev,
        TIREDNESS: {
          name: "TIREDNESS",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "SORE_THROAT") {
      setFormData((prev) => ({
        ...prev,
        SORE_THROAT: {
          name: "SORE_THROAT",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "RUNNY_NOSE") {
      setFormData((prev) => ({
        ...prev,
        RUNNY_NOSE: {
          name: "RUNNY_NOSE",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "STUFFY_NOSE") {
      setFormData((prev) => ({
        ...prev,
        STUFFY_NOSE: {
          name: "STUFFY_NOSE",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "FEVER") {
      setFormData((prev) => ({
        ...prev,
        FEVER: {
          name: "FEVER",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "NAUSEA") {
      setFormData((prev) => ({
        ...prev,
        NAUSEA: {
          name: "NAUSEA",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "VOMITING") {
      setFormData((prev) => ({
        ...prev,
        VOMITING: {
          name: "VOMITING",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "DIARRHEA") {
      setFormData((prev) => ({
        ...prev,
        DIARRHEA: {
          name: "DIARRHEA",
          inputValue: value === "Yes" ? 1 : 0,
        },
      }));
    } else if (name === "SHORTNESS_OF_BREATH") {
      setFormData(prev => ({
        ...prev,
        SHORTNESS_OF_BREATH: {
          name: "SHORTNESS_OF_BREATH",
          inputValue: value === 'Yes' ? 1 : 0,
        }
      }))
    } else if (name === "DIFFICULTY_BREATHING") {
      setFormData(prev => ({
        ...prev,
        DIFFICULTY_BREATHING: {
          name: "DIFFICULTY_BREATHING",
          inputValue: value === 'Yes' ? 1 : 0,
        }
      }))
    } else if (name === "LOSS_OF_TASTE") {
      setFormData(prev => ({
        ...prev,
        LOSS_OF_TASTE: {
          name: "LOSS_OF_TASTE",
          inputValue: value === 'Yes' ? 1 : 0,
        }
      }))
    } else if (name === "LOSS_OF_SMELL") {
      setFormData(prev => ({
        ...prev,
        LOSS_OF_SMELL: {
          name: "LOSS_OF_SMELL",
          inputValue: value === 'Yes' ? 1 : 0,
        }
      }))
    } else if (name === "ITCHY_NOSE") {
      setFormData(prev => ({
        ...prev,
        ITCHY_NOSE: {
          name: "ITCHY_NOSE",
          inputValue: value === 'Yes' ? 1 : 0,
        }
      }))
    } else if (name === "ITCHY_EYES") {
      setFormData(prev => ({
        ...prev,
        ITCHY_EYES: {
          name: "ITCHY_EYES",
          inputValue: value === 'Yes' ? 1 : 0,
        }
      }))
    } else if (name === "ITCHY_MOUTH") {
      setFormData(prev => ({
        ...prev,
        ITCHY_MOUTH: {
          name: "ITCHY_MOUTH",
          inputValue: value === 'Yes' ? 1 : 0,
        }
      }))
    } else if (name === "ITCHY_INNER_EAR") {
      setFormData(prev => ({
        ...prev,
        ITCHY_INNER_EAR: {
          name: "ITCHY_INNER_EAR",
          inputValue: value === 'Yes' ? 1 : 0,
        }
      }))
    } else if (name === "SNEEZING") {
      setFormData(prev => ({
        ...prev,
        SNEEZING: {
          name: "SNEEZING",
          inputValue: value === 'Yes' ? 1 : 0,
        }
      }))
    } else if (name === "PINK_EYE") {
      setFormData(prev => ({
        ...prev,
        PINK_EYE: {
          name: "PINK_EYE",
          inputValue: value === 'Yes' ? 1 : 0,
        }
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    setState("result");
    setLoading(true);

    const inputFormData = Object.values(formData).map((data) => {
      return Number(data.inputValue);
    });

    try {
      const response = await axios.post("http://localhost:5000//api/allergy", {
        allergy: inputFormData,
      });
      console.log(response);
      setData(response.data["allergy"]);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  }

  return (
    <div className="w-full h-screen grid place-items-center">
      <video autoPlay loop muted width="100%" className="absolute -z-10">
        <source src={Galaxy} type="video/mp4" />
      </video>
      {!loading ? (
        state === "input" ? (
          <div className="w-1/2 mx-auto p-6 bg-violet-500 rounded-md shadow-md animate-slide-right">
            <h2 className="text-2xl font-semibold mb-4">
              Allergy Assessment Form
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-4 gap-6">
              {/* Render input fields */}
              {Object.values(formData).map((field, index) => {
                return (
                  <div key={field.name} className="mb-4">
                    <label
                      htmlFor={field.name}
                      className="block text-sm font-medium text-white"
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
            <Result
              percent={data}
              disease="Allergy"
              className="text-white"
            />
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

export default Allergy;
