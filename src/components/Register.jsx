// import React, { useState } from 'react'
// import axios from "axios";

// const Register = () => {
//     const [name, setName] = useState("");
//     const [file, setFile] = useState(null);

//     // console.log("name", name);
//     // console.log("file", file);

//     // const addUserData = async (e) => {
//     //     e.preventDefault();
//     //     console.log("name:", name);

//     //     const formData = new FormData();
//     //     formData.append("name", name);
//     //     formData.append("photo", file);
//     //     console.log("formdata:", formData);

//     //     const config = {
//     //         //when we have to send img or file from frontend to backend
//     //         headers: {
//     //             "Content-Type": "multipart/form-data"
//     //         }
//     //     }

//     //     try {
//     //         const res = await fetch('http://localhost:4004/register', {
//     //             method: "POST",
//     //             headers: {
//     //                 "Content-Type": "multipart/form-data"
//     //             },
//     //             body: formData,
//     //         });
//     //         // console.log('Response:', res.data);
//     //         if (res.ok) {
//     //             const data = await res.json();
//     //             console.log('Response:', data);
//     //         } else {
//     //             console.error('Response error:', res.status, res.statusText);
//     //         }
//     //     } catch (error) {
//     //         console.error('Error:', error);
//     //     }

//     //     // console.log("test", res.file);
//     // }

//     const addUserData = async (e) => {
//         e.preventDefault();

//         // Read the file content and convert it to Base64
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onloadend = () => {
//             const fileData = reader.result.split(',')[1]; // Extract Base64 data

//             const userData = {
//                 name,
//                 file: fileData, // Include the Base64-encoded file data in the object
//             };

//             // Send the user data object to the backend using fetch
//             fetch('http://localhost:4004/register', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(userData),
//             })
//                 .then(response => {
//                     if (!response.ok) {
//                         throw new Error('Network response was not ok');
//                     }
//                     return response.json();
//                 })
//                 .then(data => {
//                     console.log('Response:', data);
//                 })
//                 .catch(error => {
//                     console.error('Error:', error);
//                 });
//         };
//     };

//     return (
//         <div className="flex justify-center items-center w-full h-screen flex-col gap-4">
//             <h1 className="text-green-400 text-3xl">Enter you details</h1>
//             <form action="" className="flex flex-col p-4 justify-center items-center gap-4 bg-gray-100 rounded-xl">
//                 <input
//                     type="text"
//                     placeholder="name"
//                     name="name"
//                     className="w-full py-2 pl-4 rounded-xl border-[1px] border-blue-300"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                 />

//                 <input
//                     type="file"
//                     className="w-full py-2 pl-4 rounded-xl border-[1px] border-blue-300"
//                     onChange={(e) => setFile(e.target.files[0])}
//                 />

//                 <button
//                     type="submit"
//                     onClick={addUserData}
//                     className="py-2 px-4 rounded-xl bg-blue-500 text-white">Submit</button>
//             </form>
//         </div>
//     )
// }

// export default Register



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

