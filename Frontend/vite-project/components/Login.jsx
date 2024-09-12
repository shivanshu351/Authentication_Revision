import React from "react";
import { useState } from "react";

export default function Signup()
{
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const setDetails = async (e)=>{
        e.preventDefault();
        const response = await fetch('http://localhost:4000/login',{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify({
                email,
                password
            }),
        })

        const data = await response.json();

        console.log(data)
    }
    
    return(
        <>
            <div className="container">
                <label>Email</label>
                <input placeholder="email" type="email" value={email} onChange={(e)=>(setEmail(e.target.value))}></input>
                <label>Password</label>
                <input placeholder="password" type="password" value={password} onChange={(e)=>(setPassword(e.target.value))}></input>
                <button onClick={setDetails}>Submit</button>
            </div>
        </>
    )
}