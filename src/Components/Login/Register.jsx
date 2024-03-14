import React, { useState } from 'react';

import Input from '../Helper/Input';
import { NavLink } from 'react-router-dom';

const Register = () => {

    const [creds, setCreds] = useState({
        name: '',
        email: '',
        age: '',
        gender: '',
    })

    const selectOption = ["Male", "Female"]

    return (
        <div className={`w-full h-screen grid place-items-center  bg-gradient-to-b from-[#000] to-[#4b5c60]`}>
            <form className='w-[70%] p-10 flex flex-col gap-8'>
                <h1 className="text-5xl text-white font-extrabold mx-auto">Enter Your details</h1>
                <p className='text-center text-white'>Already have an Account
                    <NavLink className="underline" to="/login"> Login</NavLink>
                </p>
                <Input type='text' placeholder='Name' onChange={(e) => {
                    setCreds(prev => ({...prev, name: e.target.value}))
                }}/>
                <Input type='email' placeholder='Email' onChange={(e) => {
                    setCreds(prev => ({...prev, email: e.target.value}))
                }}/>
                <Input type="number" placeholder='Age' onChange={(e) => {
                    setCreds(prev => ({...prev, age: e.target.value}))
                }}/>
                <Input type='password' placeholder='passoword' onChange={(e) => {
                    setCreds(prev => ({...prev, password: e.target.value}))
                }}/>
                <select 
                    className='w-1/2 bg-slate-500 opacity-60 mx-auto text-xl p-2 text-white outline-none'
                    onChange={(e) => {
                        setCreds(prev => ({...prev, gender: e.target.value}))
                    }}
                >
                    <option selected className='text-white'>Select Gender</option>
                    {selectOption.map((ele) => {
                        return <option className='text-white' value={ele}>{ele}</option>
                    })}
                </select>
                <button 
                    className="bg-blue-700 w-1/2 py-3 text-xl text-white rounded-xl mx-auto disabled:bg-blue-300"
                    disabled={
                        creds.name === '' || creds.gender === '' || creds.age === '' || creds.email === '' ||
                        creds.password === ''
                    }
                >
                    Submit
                </button>
            </form>
        </div>
      )
}

export default Register