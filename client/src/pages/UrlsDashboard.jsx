import axios from "axios";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import toast, { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";
function UrlsDashboard() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const [urlsData, setUrlsData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
    const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/user/${userInfo._id}/urls`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setUrlsData(res.data.urls);
        setLoading(false);
      } catch (error) {
        setError("An error occurred. Please try again later.");
        setLoading(false);
        console.error("Fetch error:", error);
      }
    };
    fetchData();
  }, [userInfo._id]);
  const handleToggle = async (urlId, currentStatus) => {
    try {
      const data=await axios.put(
        `${process.env.REACT_APP_API_URL}/url/${urlId}`,
        { isEnabled: !currentStatus },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(data);
      
      setUrlsData(
        urlsData.map((url) =>
          url._id === urlId ? { ...url, isEnabled: !currentStatus } : url
        )
      );
    } catch (err) {
      console.error("Error toggling link:", err);
    }
  };

  const handleDelete = async (urlId) => {
    try {
        console.log(urlId);
        
      const data=await axios.delete(`${process.env.REACT_APP_API_URL}/url/${urlId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if(data.status===200){
        toast.success("URL Deleted");
      }else{
        toast.error("Error deleting URL");
        throw new Error("Error deleting URL");
      }
      
      setUrlsData(urlsData.filter((url) => url._id !== urlId));
    } catch (err) {
      console.error("Error deleting link:", err);
    }
  };

  return (
    <div className="p-4">
      <Toaster position="top-right" />
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="flex flex-col mb-20">
          {urlsData.map((url) => (
            <div
              key={url._id}
              className="bg-white shadow-md rounded-lg p-4 my-2 flex flex-row justify-between  items-center "
            >
              <div className="mb-4 flex-1 me-4">
                <h2 className="text-xl font-semibold">Shortened URL</h2>
                <div className="flex items-center">
                  <input
                    type="text"
                    readOnly
                    value={`${process.env.REACT_APP_URL}/${url.hashedUrl}`}
                    className="border  px-2 py-1 rounded-l w-full"
                  />

                  <CopyToClipboard
                    text={`${process.env.REACT_APP_URL}/${url.hashedUrl}`}
                  >
                    <button
                      onClick={() => toast.success("URL Copied")}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-r outline"
                    >
                      Copy
                    </button>
                  </CopyToClipboard>
                </div>
              </div>

              <div className="mb-4 flex-1 me-4">
                <h2 className="text-xl font-semibold">Original URL</h2>
                <input
                  type="text"
                  readOnly
                  value={url.originalUrl}
                  className="border px-2 py-1 w-full rounded"
                />
              </div>

              <div className="mb-4 mx-6">
                <h2 className="text-xl text-center font-semibold">Total Visits</h2>
                <p className="text-center border rounded-lg py-2 text-lg">
                  {url.totalVisits}
                </p>
              </div>

              <div className="mb-4 mx-6">
                <h2 className="text-xl text-center font-semibold">Created At</h2>
                <p className="border px-2 py-1 w-full rounded bg-gray-100">
                  {url.createdAt.split("T")[0]}
                </p>
              </div>


              <div className="mb-4 mx-6">
                <h2 className="text-xl text-center font-semibold">Updated At</h2>
                <p className="border px-2 py-1 w-full rounded bg-gray-100">
                  {url?.updatedAt.split("T")[0]+" "+url?.updatedAt.split("T")[1].split(".")[0]}
                </p>
              </div>

              <div className="mb-4 flex items-center">
                <Switch
                  onChange={() => handleToggle(url._id, url.isEnabled)}
                  checked={url.isEnabled}
                  offColor="#888"
                  onColor="#0D6EFD"
                />
              </div>

              <div className="flex justify-between flex-col mx-2">
                <button className="bg-green-500 my-2 hover:bg-green-600 text-white px-4 py-2 rounded" onClick={()=>{navigate(`/url/${url._id}`)}}>
                  View
                </button>
                <button
                  onClick={() => handleDelete(url._id)}
                  className="bg-red-500 my-2 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UrlsDashboard;
