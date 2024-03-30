import React, { useState, useEffect } from 'react'
import axios from "axios";
import moment from "moment"

const Home = () => {
    const [data, setData] = useState([]);
    // console.log("data:", data);

    const getUserData = async () => {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getData`, {
            headers: {
                "Content-Type": "application/json",
            }
        })
        // console.log(res.data);

        if (res.status == 200) {
            setData(res.data);
        }
        else {
            alert("error");
        }
    }

    const deleteUser = async (id) => {
        try {
            const res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteUser/${id}`);
            if (res.status === 200) {
                // Update the UI or fetch data again
                getUserData();
                alert("User deleted successfully");
            } else {
                alert("Error deleting user");
            }
        } catch (error) {
            console.error('Error:', error);
            alert("Error deleting user");
        }
    };


    useEffect(() => {
        getUserData();
        // console.log(users);
    }, [])
    return (
        <div className="flex w-full h-auto px-8 py-4 flex-col gap-4 justify-center items-center">

            <h1 className="w-full text-center text-gray-600 text-3xl font-semibold">MERN Cloudinary Project</h1>

            <div className="Cards flex flex-wrap gap-8 justify-center items-center">

                {data.length !== 0 && data.map((d) => (

                    <div key={d._id} className="card flex flex-col w-[400px] h-auto gap-4 p-4 justify-center items-center border-[1px] rounded-xl border-blue-500" >

                        <img src={d.img} className="size-[200px]" />
                        <div>
                            Username: {d.name}
                        </div>
                        <div>
                            Date Created: {moment(d.date).format("L")}
                        </div>
                        <button className="py-2 px-4 rounded-xl bg-red-500 text-white" onClick={() => deleteUser(d._id)}>Delete</button>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Home
