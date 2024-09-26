import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

function Count() {
  const [count, setCount] = useState(0);
  const [url, setUrl] = useState("");
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async (e) => {
    e.preventDefault();
    const response = await fetch(`${process.env.REACT_APP_API_URL}/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url: url,
      }),
    });
    if (response.status === 501) {
      toast.error("There was an error fetching the count");
      return;
    }
    const result = await response.json();
    if (response.status === 401) {
      toast.error(result.message);
      return;
    }
    toast.success("Count fetched successfully");
    setIsClicked(true);
    setCount(result.count);
  };
  return (
    <div className="flex flex-col">
      <Toaster position="top-right" />
      <div className="flex-grow flex flex-col justify-center w-full mt-10 items-center">
        <form
          action=""
          className="my-3 flex flex-col w-full justify-center items-center"
        >
          <div className="w-full flex justify-center items-center">
            <label htmlFor="" className="text-xl">
              URL :-
            </label>
            <input
              type="text"
              className="w-2/3 p-3 text-xl rounded border border-gray-400 mx-2"
              placeholder="Enter the Shortened Url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <button
            onClick={handleClick}
            className="mt-3 p-3 text-xl  border border-black rounded hover:border-white hover:bg-black hover:text-white duration-300"
          >
            Check Count
          </button>
        </form>
        {isClicked && (
          <h3 className="flex justify-center text-xl">
            The Count for your URL is {count}.
          </h3>
        )}
      </div>
    </div>
  );
}

export default Count;
