import React, { useState } from "react";
import Result from "./Result";
import { CirclesWithBar } from "react-loader-spinner";
import BallLights from "../../assets/Videos/BallLights.mp4";

const Pneumonia = () => {
  const [image, setImage] = useState("");

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState("input");
  const [data, setData] = useState("");
  const [buttonState, setButtonState] = useState(true);

  async function handleSubmit(e) {
    e.preventDefault();
    setButtonState(false);
    // setState("result");
    // setLoading(true);
    console.log("From Handle Submit")
    try {
      const formData = new FormData();
      formData.append("image", image);

      for (const key of formData.entries()) {
        console.log(key);
      }
      const response = await fetch("http://localhost:5000/api/pneumonia", {
        method: "POST",
        body: formData,
      })

      if (response.ok) {
        const data = await response.json();
        console.log(data); // This will log the actual data returned by the server
        setState("result");
        setData(data.pneumonia_percentage[0]); // Assuming the server returns the percentage in this format
      } else {
        console.error("Error:", response.status);
      }
      
    } catch (error) {
      console.log(error);
    }
    // setLoading(false);
    setButtonState(true);
  }

  function uploadImage(e) {
    setImage(e.target.files[0]);
  }

  return (
    <div className="w-full h-screen grid place-items-center p-3">
      <video autoPlay loop muted width="100%" className="absolute -z-10">
        <source src={BallLights} type="video/mp4" />
      </video>
      {!loading ? (
        state === "input" ? (
          <div className="w-4/5 mx-auto p-6 bg-gray-400 rounded-md shadow-md animate-slide-right">
            <h2 className="text-2xl font-semibold mb-4">
              Pneumonia Assessment Form
            </h2>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-3 gap-6"
              encType="multipart/form-data"
            >
              <div className="mb-4">
                {/* <label
                  htmlFor="First Name"
                  className="block text-sm font-medium text-gray-600"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="First Name"
                  name="First Name"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="Last Name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="Last Name"
                  name="Last Name"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="Age"
                  className="block text-sm font-medium text-gray-600"
                >
                  Age
                </label>
                <input
                  type="number"
                  id="Age"
                  name="Age"
                  className="mt-1 p-2 w-full border rounded-md"
                /> */}
              </div>
              <div className="mb-4 col-span-2">
                <label
                  htmlFor="X-Ray"
                  className="block text-sm font-medium text-gray-600"
                >
                  Upload X-Ray
                </label>
                <input
                  type="file"
                  id="X-Ray"
                  name="image"
                  onChange={uploadImage}
                  accept="image/*"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <button
                type="submit"
                disabled={!buttonState}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full h-screen">
            <Result percent={data.toFixed(2)} disease="Pneumonia" />
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

export default Pneumonia;
