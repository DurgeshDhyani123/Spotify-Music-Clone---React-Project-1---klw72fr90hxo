import React, { useState } from "react";
import { FORM_TYPE } from "../constants";

export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false); // Added state for error

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false); // Reset error state

        if (email.length < 1 || pass.length < 1) {
            setError(true);
        } else {
            setIsLoading(true);
            try {
                const response = await fetch('https://academics.newtonschool.co/api/v1/user/login', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                        projectID: "drbdz4ox1jwn",
                    },
                    body: JSON.stringify({ email: email, password: pass, appType: 'music' })
                });

                const json = await response.json();
                setIsLoading(false);
                console.log(json);
                if (json.status == 'success') {
                    props.onClose();
                }
            } catch (error) {
                console.error('Login failed:', error);
                setIsLoading(false);

            }
        }
    }

    return (
        <div className="flex justify-center items-center bg-gray-200">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="relative">
                    <button
                        className="absolute top-0 right-0 mr-4 ml-4 text-blue-500"
                        onClick={props.onClose}
                    >
                        &#10006;
                    </button>
                </div>
                <h2 className="text-2xl mb-4">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>

                    <div>
                        <label htmlFor="email" className="block mb-1">Email</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="youremail@gmail.com"
                            id="email"
                            name="email"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">Password</label>
                        <input
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            type="password"
                            placeholder="********"
                            id="password"
                            name="password"
                            className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    {error && (
                        <div className="text-red-500">Please enter both email and password.</div>
                    )}
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 transition duration-300"
                    >
                        Log In
                    </button>
                </form>
                <button
                    className="block mt-4 text-blue-500 hover:underline"
                    onClick={() => props.onFormSwitch(FORM_TYPE.SIGNUP)}
                >
                    Don't have an account? SignUp here.
                </button>
            </div>
        </div>
    );
}
