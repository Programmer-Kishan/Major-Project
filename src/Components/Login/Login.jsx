import React, { useState } from 'react';

import Input from "../Helper/Input";
import { NavLink } from 'react-router-dom';

const Login = () => {

    const [creds, setCreds] = useState({
        name: '',
        password: ''
    })

  return (
    <div className={`w-full h-screen grid place-items-center  bg-gradient-to-b from-[#000] to-[#4b5c60]`}>
        <form className='w-[70%] p-10 flex flex-col gap-8'>
            <h1 className="text-5xl text-white font-extrabold mx-auto">Enter Your details</h1>
            <p className='text-center text-white'>Don't have Account
             <NavLink className="underline" to="/register"> Sign Up Here</NavLink>
            </p>
            <Input type='text' placeholder='Name' onChange={(e) => {
                setCreds(prev => ({...prev, name: e.target.value}))
            }}/>
            <Input type='password' placeholder='Password' onChange={(e) => {
                setCreds(prev => ({...prev, password: e.target.value}))
            }}/>
            <button 
                className="bg-blue-700 w-1/2 py-3 text-xl text-white rounded-xl mx-auto disabled:bg-blue-300"
                disabled={creds.name === '' || creds.password === ''}
            >
                Submit
            </button>
        </form>
    </div>
  )
}

export default Login