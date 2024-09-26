import React from 'react'
import { TbError404 } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
function Error() {
    const nav=useNavigate()
  return (
    <div className="flex flex-col ">
      <div className="flex-grow flex flex-col text-2xl justify-center gap-1 items-center">
      <TbError404 className='text-9xl'/>
      Error Page Not Found 
      <button className='border p-3 rounded border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white duration-300 mt-7' onClick={()=>{nav("/")}}>Go to Home</button>
      </div>
    </div>
  )
}

export default Error