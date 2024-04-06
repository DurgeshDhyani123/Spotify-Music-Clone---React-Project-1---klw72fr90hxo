import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { Login } from "../pages/login";
import { SignUp } from "../pages/signup";
import { FORM_TYPE } from "../constants";
import { FaUser, FaHome, FaHeadphones } from 'react-icons/fa';
import { TbMessageHeart } from "react-icons/tb";
import { IoMdSearch } from "react-icons/io";
import logo from '../styles/soundCloud-logo.png';

const Navbar = ({ searchInput, setSearchInput }) => {
    const [currentForm, setCurrentForm] = useState('');

    const toggleForm = (formName) => {
        setCurrentForm(formName);
    };

    const handleCloseButtonClick = () => {
        setCurrentForm('');
    };

    return (
        <>
            <div className="sticky top-0 z-50 bg-black text-white p-4">
                <nav className="flex flex-col md:flex-row md:justify-between md:items-center px-20">
                    <div className="flex items-center mb-4 md:mb-0 gap-10 ">
                        <Link to="/">
                            <span className="flex items-center"> <img src={logo} alt="Logo" height={50} width={50} />
                                <b>SOUNDCLOUD</b>
                            </span>
                        </Link>

                        <Link to="/"><span className="flex hover:text-blue-400"><FaHome className="m-1" />Home</span></Link>
                        <Link to="/feed"><span className="flex hover:text-blue-400"><TbMessageHeart className="m-1 " />Feed</span></Link>
                        <Link to="/library"><span className="flex hover:text-blue-400"><FaHeadphones className="m-1" />Library</span></Link>
                    </div>
                    <div className="flex items-center ">
                        <input

                            className="border rounded w-96 text-black p-1 "
                            type="text"
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                            }}
                            placeholder="Search"
                        />
                        <button
                            className="md:hidden ml-4 text-white font-bold "
                            onClick={() => toggleForm("login")}
                        >
                            Sign in <FaUser />
                        </button>
                    </div>
                    <div className="hidden md:flex items-center gap-10">
                        <button className="ml-4 text-white hover:text-blue-400" onClick={() => toggleForm("login")}>
                            <FaUser size={20} />
                        </button>
                        <span className="text-white cursor-pointer hover:text-blue-400" onClick={() => toggleForm("signup")}>
                            Create account
                        </span>
                        <Link to="/upload"><span className="hover:text-blue-400">Upload</span></Link>
                    </div>
                </nav>
            </div>
            <Outlet />

            {currentForm === FORM_TYPE.LOGIN && (
                <div className="fixed inset-0 flex items-center z-50 justify-center bg-gray-300 bg-opacity-80">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <Login onFormSwitch={toggleForm} onClose={handleCloseButtonClick} />
                    </div>
                </div>
            )}

            {currentForm === FORM_TYPE.SIGNUP && (
                <div className="fixed inset-0 flex items-center z-50 justify-center bg-gray-300 bg-opacity-80">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <div className="relative">
                            <button
                                onClick={handleCloseButtonClick}
                                className="text-gray-500 hover:text-gray-700 absolute top-0 right-0 focus:outline-none"
                            >
                                &#10006;
                            </button>
                            <SignUp onFormSwitch={toggleForm} />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
