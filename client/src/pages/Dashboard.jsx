import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {useNavigate} from 'react-router-dom';
function Dashboard() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [urlsData, setUrlsData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
      try {
        const res = await axios.get(
          process.env.REACT_APP_API_URL + "/user/" + userInfo._id,{headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }}
        );
        console.log(res.data.data[0]);
        
        setUrlsData(res.data.data);
        setLoading(false);
      } catch (error) {
        setError("An error occurred. Please try again later.");
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="my-16  flex flex-col justify-center items-center">
      <div className="bg-gray-100 shadow-md rounded-lg p-8 w-full max-w-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Dashboard</h1>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-600">Name:</h2>
          <p className="text-lg text-gray-700">{userInfo.name}</p>
        </div>

        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-600">Email:</h2>
          <p className="text-lg text-gray-700">{userInfo.email}</p>
        </div>
        {loading ? (
          <p className="text-xl">Loading...</p>
        ) : urlsData.length > 0 ? (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-600">
                Total URLs Shortened:
              </h2>
              <p className="text-lg text-gray-700">{urlsData[0].totalUrls}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-600">
                Total No. of Visits:
              </h2>
              <p className="text-lg text-gray-700">{urlsData[0].totalVisits}</p>
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-600">
                Total URLs Enabled:
              </h2>
              <p className="text-lg text-gray-700">{urlsData[0].totalEnabled}</p>
            </div>

            <div className="mt-6">
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg transition duration-300" onClick={()=>navigate("/dashboard/urls")}>
                Manage URLs
              </button>
            </div>
          </>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <p className="text-red-500">No URLs shortened yet</p>
        )}
        <button className="bg-green-500 hover:bg-green-600 text-white mt-4 py-2 px-6 rounded-lg transition duration-300" onClick={()=>navigate("/")}>
          Shorten Url
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
