import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const navigate = useNavigate(); // useNavigate instead of useHistory
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setDetails = async (e) => {
        e.preventDefault(); // Prevent form reload on submit

        const response = await fetch('http://localhost:4000/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password
            }),
        });

        const data = await response.json();

        if (data.success) {
            // Redirect to login page if signup is successful
            navigate('/login');
        }

        console.log(data);
    }

    return (
        <div className="container">
            <form onSubmit={setDetails}>
                <label>Name</label>
                <input 
                    placeholder="name" 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                />

                <label>Email</label>
                <input 
                    placeholder="email" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                />

                <label>Password</label>
                <input 
                    placeholder="password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
