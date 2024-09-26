import React, { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaDirections } from "react-icons/fa";
import axios from "axios";

function Redirect() {
  const { id } = useParams();
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL +"/"+ id;
        console.log(apiUrl);
        const res = await axios.get(apiUrl);
        console.log(res);
        
        if (res.status !== 200) {
          toast.error(
            "URL not available/expired. Redirecting to home in 3 seconds.",
            { duration: 3000 }
          );
          setCountdown(3);
          setError(true);
        } 
        else {
          toast.success(`Redirecting to the original URL in 5 seconds`, {
            duration: 5000,
          });
          setCountdown(5);
          setTimeout(() => {
            window.location.href = res.data
          }, 5000);
        }
      } catch (err) {
        console.error("Fetch error:", err);
        toast.error("An error occurred. Redirecting to home in 3 seconds.");
        setCountdown(3);
        setError(true);
      }
    };
    fetchUrl();
  }, [id]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  if (error && countdown === 0) {
    return <Navigate to="*" />;
  }

  return (
    <div className="flex flex-col">
      <Toaster position="top-right" />
      <div className="flex-grow w-full h-full flex flex-col justify-center items-center p-10">
        <FaDirections className="text-9xl" />
        {error && (
          <div className="flex justify-center text-3xl ">
            The Link seems to be expired.
          </div>
        )}
        {countdown > 0 ? (
          <div className="text-center text-2xl ">
            Redirecting in {countdown} seconds...
          </div>
        ):
        <div className="text-center text-2xl ">
            Going there in full speed...
          </div>
        }
      </div>
    </div>
  );
}

export default Redirect;
