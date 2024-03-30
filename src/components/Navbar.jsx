import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    return (
        <nav className="w-full h-16 bg-blue-600 flex px-8 justify-center items-center gap-8 text-white font-semibold text-2xl">
            <NavLink className="hover:underline hover:text-blue-300 active:text-green-400" to="/">Home</NavLink>
            <NavLink className="hover:underline hover:text-blue-300 active:text-green-400" to="/register">Register</NavLink>
        </nav>
    )
}

export default Navbar
