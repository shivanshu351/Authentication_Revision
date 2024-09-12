import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export default function Quote() {
    async function populateQuote() {
        const response = await fetch('/quote', {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });

        const data = await response.json();
        console.log(data);
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const user = jwtDecode(token); // Use the named export 'decode'
                console.log(user); // Inspect the decoded token
                
                if (!user) {
                    localStorage.removeItem('token');
                    window.location.href = '/';
                } else {
                    populateQuote();
                }
            } catch (error) {
                console.error("Invalid token", error);
                localStorage.removeItem('token');
                window.location.href = '/';
            }
        }
    }, []);

    return (
        <>
            <h1>User Welcome</h1>
        </>
    );
}
