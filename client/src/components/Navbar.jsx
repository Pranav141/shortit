import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { verifyUser } from '../features/auth/authActions';
import { logoutUser } from '../features/auth/authSlice';

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch=useDispatch();
    const {userInfo,userToken}=useSelector(state=>state.auth);
    useEffect(() => {
      if(userToken && !userInfo?.name){
        
        dispatch(verifyUser())
      }
    }, [dispatch,userToken,userInfo])
    const handleLogout=()=>{
      localStorage.removeItem("token")
      dispatch(logoutUser())
    }
  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 ">
              <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">ShortIt</Link>
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4 ml-6">
              <Link to="/" className="px-3 py-2 rounded-md font-medium hover:text-red-500 ">Home</Link>
              {/* <Link to="/count" className="px-3 py-2 rounded-md  font-medium hover:text-red-500">Check Count</Link> */}
            </div>
            <div className="hidden md:flex md:items-center md:space-x-4 ml-6">
              {
              userInfo && userInfo?.name?
              <>
              <Link to="/dashboard" className="px-3 py-2 rounded-md font-medium hover:text-red-500 ">{userInfo?.name?.split(" ")[0]}</Link>
              <Link to='/login' className="border border-red-400 duration-200 hover:bg-red-400 bg-white  px-3 py-2 rounded-md font-medium text-red-400 hover:text-white   " onClick={handleLogout}>Logout</Link>
              </>
                :
                <>

              <Link to='/register' className="border border-blue-400 duration-200 hover:bg-blue-400 bg-white  px-3 py-2 rounded-md font-medium text-blue-400 hover:text-white  ">Register</Link>
              <Link to='/login' className="border border-green-400 duration-200 hover:bg-green-400 bg-white  px-3 py-2 rounded-md font-medium text-green-400 hover:text-white ">Login</Link>
                </>
            }

            </div>
          </div>
          <div className="flex items-center">
            <button
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path
                  className={`${isOpen ? 'hidden' : 'inline-flex'}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
                <path
                  className={`${isOpen ? 'inline-flex' : 'hidden'}`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500">Home</Link>
          <Link to="/count" className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500">Check Count</Link>
          {/* <Link to="/about" className="block px-3 py-2 rounded-md text-base font-medium hover:text-red-500">About</Link> */}

        </div>
      </div>
    </nav>
  )
}

export default Navbar