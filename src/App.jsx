import { useState, useEffect } from 'react';

import './App.css'

import {Routes, Route} from 'react-router-dom';

import HomePage from './Components/HomePage/HomePage';
import Login from './Components/Login/Login';
import Register from './Components/Login/Register';
import Disease from "./Components/Disease/Disease";
import Diabeties from './Components/Disease/Diabeties';
import LungCancer from './Components/Disease/LungCancer';
import Heart from './Components/Disease/Heart';
import TB from "./Components/Disease/TB";
import Pneumonia from './Components/Disease/Pneumonia';
import Allergy from './Components/Disease/Allergy';
import Flu from './Components/Disease/Flu'
import Malaria from './Components/Disease/Malaria';

import axios from 'axios';

function App() {

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/data');
  //       console.log(response);
  //     } catch (error) {
  //       console.error('Error fetching posts:', error);
  //     }
  //   }

  //   async function postData() {
  //     const x = 1;
  //     const y = 'hello';
  //     try {
  //       const response = await axios.post('http://127.0.0.1:5000/api/data', { 'var1': x, 'var2': y });
  //       // alert(`POST Request Successful!\nResponse: ${JSON.stringify(response.data)}`);
  //       console.log(response);
  //     } catch (error) {
  //       console.error('Error making POST request:', error);
  //     }
  //   }

  //   getData();
  //   postData();
  // }, [])

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="disease" element={<Disease/>} />
      <Route path="Diabetes" element={<Diabeties/>} />
      <Route path="LungCancer" element={<LungCancer/>} />
      <Route path="Heart" element={<Heart/>} />
      <Route path="TB" element={<TB/>} />
      <Route path="Pneumonia" element={<Pneumonia/>} />
      <Route path="Allergy" element={<Allergy/>} />
      <Route path="Flu" element={<Flu/>} />
      <Route path="Malaria" element={<Malaria/>} />
    </Routes>
    // <h1>Hello World</h1>
  )
}

export default App
