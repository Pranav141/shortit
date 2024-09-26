import axios from "axios";
import React, { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";

function UrlForm() {
  const [form, setForm] = useState({
    url: "",
    timeLimit: "",
  });
  const [url,setUrl]=useState("")
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token=localStorage.getItem('token');
    const urlPattern = /^(https?:\/\/)?([\da-zA-Z0-9.-]+)\.([a-zA-Z]{2,6})([\/\w.-]*)*\/?(\?.*)?(#.*)?$/;
    if (urlPattern.test(form.url)) {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/url/create`, // URL endpoint
          {
              url: form.url, // The body of the request (sent as JSON automatically)
          },
          {
              headers: {
                  'Content-Type': 'application/json', // Content-Type header
                  'Authorization': `Bearer ${token}`, // Authorization header with Bearer token
              },
          }
      );
      
      
        // if (!response.ok) {
        //   throw new Error("Network response was not ok " + response.statusText);
        // }
        // const result=await response.json();
        console.log(response);
        
        setUrl(`${process.env.REACT_APP_URL}/${response.data.url.hashedUrl}`)
        toast.success("Shortened URL created successfully");
      } catch (error) {
        toast.error("There was an error creating the shortened URL");
        console.error('There has been a problem with your fetch operation:', error);
      }
    }
    else {
      toast.error("Please enter a valid url and time limit");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center ">
      <Toaster position="top-right"/>
      <form
        action=""
        className="flex flex-col my-20 gap-4 w-full justify-center items-center"
      >
        <div className="flex items-center w-full justify-center">
          <label htmlFor="" className="text-xl">
            URL:-
          </label>
          <input
            type="text"
            className="border text-xl p-2 mx-2 rounded border-gray-400 w-2/3"
            placeholder="Enter your url here"
            name="url"
            value={form.url}
            onChange={handleChange}
          />
        </div>
        {/* <div className="flex items-center w-full justify-center">
          <label htmlFor="" className="text-xl">
            Hours:-{" "}
          </label>
          <input
            type="number"
            className="text-xl w-[200px] border p-2 mx-2 rounded border-gray-400"
            placeholder="Enter no. of hours"
            min={1}
            max={48}
            name="timeLimit"
            value={form.timeLimit}
            onChange={handleChange}
          />
        </div> */}
        {/* <span className="text-sm text-gray-500">
          *Note:-Link can be active for min 1 hr and max 48 hrs.{" "}
        </span> */}
        <button
          onClick={handleSubmit}
          className="bg-blue-400 text-white p-4 text-xl rounded border border-blue-400 hover:bg-white hover:text-blue-400 duration-300"
        >
          Shorten It
        </button>
      </form>
      <div>
        <input
          type="text"
          value={url}
          disabled
          className="p-4 text-lg border border-t-gray-400 border-b-gray-400 border-s-gray-400 rounded-s bg-white"
        />
        <CopyToClipboard text={url}>
          <button onClick={()=>toast.success("URL Copied")} className="hover:opacity-90 p-[17px] w-fit text-white text-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-e">
            Copy
          </button>
        </CopyToClipboard>
      </div>
    </div>
  );
}

export default UrlForm;
