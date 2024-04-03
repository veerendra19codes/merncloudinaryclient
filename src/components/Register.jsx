import React, { useState } from 'react';
import axios from "axios";
import { UNSAFE_DataRouterContext, useNavigate } from "react-router-dom"
// import dotenv from "dotenv";
// dotenv.config();

const Register = () => {
    const [name, setName] = useState("");
    const [file, setFile] = useState(null);

    const navigate = useNavigate();

    const addUserData = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("photo", file);
        formData.append("name", name);

        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            if (res.status == 200) {
                navigate("/")
            }
            else {
                alert("error");
            }
            console.log('Response:', res.data);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex justify-center items-center w-full h-screen flex-col gap-4">
            <h1 className="text-green-400 text-3xl">Enter your details</h1>
            <form action="" className="flex flex-col p-4 justify-center items-center gap-4 bg-gray-100 rounded-xl">
                <input
                    type="text"
                    placeholder="name"
                    name="name"
                    className="w-full py-2 pl-4 rounded-xl border-[1px] border-blue-300"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="file"
                    className="w-full py-2 pl-4 rounded-xl border-[1px] border-blue-300"
                    onChange={(e) => setFile(e.target.files[0])}
                />

                <button
                    type="submit"
                    onClick={addUserData}
                    className="py-2 px-4 rounded-xl bg-blue-500 text-white">Submit</button>
            </form>
        </div>
    );
};

export default Register;

