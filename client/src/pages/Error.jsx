import React from 'react'
import Navbar from '../components/Navbar'
import { TbError404 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
function Error() {
    const nav=useNavigate()
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex flex-col text-2xl justify-center gap-1 items-center">
      <TbError404 className='text-9xl'/>
      Error Page Not Found 
      <button className='border p-3 rounded border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white duration-300 mt-7' onClick={()=>{nav("/")}}>Go to Home</button>
      </div>
      <Footer/>
    </div>
  )
}

export default Error