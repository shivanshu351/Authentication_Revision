import React, { useEffect, useState } from "react";
import {jwtDecode }from 'jwt-decode'; // Correct default import

export default function Quote() {
    const [quote, setQuote] = useState(""); // Correctly initialize state

    async function populateQuote() {
        try {
            const response = await fetch('http://localhost:5173/quote', { // Ensure URL is correct
                headers: {
                    'x-access-token': localStorage.getItem('token')
                }
            });

            const data = await response.json();
            if (response.ok) {
                setQuote(data.quote); // Assuming the response contains a "quote" field
            } else {
                console.error("Failed to fetch the quote:", data.message);
            }
        } catch (error) {
            console.error("Error fetching quote:", error);
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const user = jwtDecode(token); // Correctly decode the token
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
        } else {
            window.location.href = '/'; // Redirect if no token is present
        }
    }, []);

    return (
        <>
            <h1>User Welcome</h1>
            <p>{quote}</p> {/* Display the quote */}
        </>
    );
}
