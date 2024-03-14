import React, { useState } from "react";
import Diabeties from "./Diabeties";
import LungCancer from "./LungCancer";
import { useNavigate } from "react-router-dom";

const Disease = () => {
  const [disease, setDisease] = useState(<></>);

  const idata = ["Tuberculosis(TB)", "Malaria", "Covid19"];
  const cdata = ["Diabetes", "Heart Disease", "Kindey Disease"];
  const cadata = ["Breast Cancer", "Lung Cancer", "Skin Cancer"];

  const candata = [
    {
      data: idata,
      color: "bg-yellow-400",
    },
    {
      data: cdata,
      color: "bg-sky-500",
    },
    {
      data: cadata,
      color: "bg-red-500",
    },
  ];

  const navigate = useNavigate();

  const handleChange1 = (e) => {
    let d = e.target.value;

    if (d === "Tuberculosis(TB)") console.log(d);
    else if (d === "Malaria") console.log(d);
    else if (d === "Covid19") console.log(d);
  };

  const handleChange2 = (e) => {
    let d = e.target.value;

    if (d === "Diabetes") setDisease(<Diabeties />);
    else if (d === "Heart Disease") console.log(d);
    else if (d === "Kindey Disease") console.log(d);
  };

  const handleChange3 = (e) => {
    let d = e.target.value;

    if (d === "Breast Cancer") console.log(d);
    else if (d === "Lung Cancer") setDisease(<LungCancer />);
    else if (d === "Skin Cancer") console.log(d);
  };

  //   return (
  //     <div className='flex flex-col bg-gradient-to-b from-[#000] to-[#4b5c60] h-full'>
  //         <div className='w-full p-4 text-center'>
  //             <h1 className='text-5xl font-extrabold mt-4 mb-9 text-white'>Select the type of disease you want to check</h1>
  //             <div className='flex gap-10 justify-around'>
  //                 <select className='select-style bg-yellow-400' onChange={handleChange1}>
  //                     {idata.map((ele, ind) => {
  //                         if(ind === 0)
  //                             return (
  //                                 <>
  //                                     <option selected>Select the type of infectious disease</option>
  //                                     <option>{ele}</option>
  //                                 </>
  //                             )
  //                         return <option>{ele}</option>
  //                     })}
  //                 </select>
  //                 <select className='select-style bg-blue-400' onChange={handleChange2}>
  //                     {cdata.map((ele, ind) => {
  //                         if(ind === 0)
  //                             return (
  //                                 <>
  //                                     <option selected>Select the type of Chronic disease</option>
  //                                     <option>{ele}</option>
  //                                 </>
  //                             )
  //                         return <option>{ele}</option>
  //                     })}
  //                 </select>
  //                 <select className='select-style bg-red-400' onChange={handleChange3}>
  //                     {cadata.map((ele, ind) => {
  //                         if(ind === 0)
  //                             return (
  //                                 <>
  //                                     <option selected>Select the type of Cancer</option>
  //                                     <option>{ele}</option>
  //                                 </>
  //                             )
  //                         return <option>{ele}</option>
  //                     })}
  //                 </select>
  //             </div>
  //         </div>
  //         <div className='w-full mt-5 p-4 text-center'>
  //             <h1 className='font-extrabold text-5xl inline-block text-white'>Enter the disease symptoms</h1>
  //             {disease}
  //         </div>
  //     </div>
  //   )
  return (
    <div className="h-screen p-4">
      <div className="grid grid-cols-2 md:grid-cols-3 grid-rows-3 md:grid-rows-2 gap-6 h-screen w-full">
        <div
          className="bg-[url('../src/images/TuberCulosis.jpg')] disease-box"
          onClick={() => navigate("/TB")}
        >
          <span className="disease-text">Tuberculosis</span>
        </div>
        <div
          className="bg-[url('../src/images/LungCancer.jpg')] disease-box"
          onClick={() => navigate("/LungCancer")}
        >
          <span className="disease-text">Lung Cancer</span>
        </div>
        <div
          className="bg-[url('../src/images/Diabetes.jpg')] disease-box"
          onClick={() => navigate("/Diabetes")}
        >
          <span className="disease-text">Diabetes</span>
        </div>
        <div 
          className="bg-[url('../src/images/pneumonia.jpg')] disease-box"
          onClick={() => navigate('/Pneumonia')}
        >
          <span className="disease-text">Pneumonia</span>
        </div>
        <div 
          className="bg-[url('../src/images/SkinCancer.jpg')] disease-box"
          onClick={() => navigate('/Allergy')}  
        >
          <span className="disease-text">Allergy</span>
        </div>
        <div
          className="bg-[url('../src/images/HeartDisease.jpg')] disease-box"
          onClick={() => navigate("/Heart")}
        >
          <span className="disease-text">Heart Disease</span>
        </div>
        <div
          className="bg-[url('../src/images/flu.webp')] disease-box"
          onClick={() => navigate("/Flu")}
        >
          <span className="disease-text">Flu</span>
        </div>
        <div
          className="bg-[url('../src/images/Malaria.jpg')] disease-box"
          onClick={() => navigate("/Malaria")}
        >
          <span className="disease-text">Malaria</span>
        </div>
      </div>
    </div>
  );
};

export default Disease;
