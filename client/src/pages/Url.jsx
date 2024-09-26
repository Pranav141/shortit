import React, { useEffect, useState } from 'react';
import AnalyticsLineChart from '../components/AnalyticsLineChart';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import CopyToClipboard from 'react-copy-to-clipboard';
import Switch from "react-switch";


function Url() {
    const { urlId } = useParams();
    const [urlData, setUrlData] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    console.log(urlId);
     
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${process.env.REACT_APP_API_URL}/url/${urlId}/analytics`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(res);
                
                if (res.status !== 200) {
                    toast.error("An error occurred while fetching data");
                    setError("An error occurred while fetching data");
                    setLoading(false);
                    return;
                }
                setUrlData(res.data.url);
                setLoading(false);
            } catch (error) {
                console.error("Fetch error:", error);
                setError("An error occurred while fetching data");
                setLoading(false);
            }
        };
        fetchData();
    }, [urlId]); // Ensure urlId is a dependency

    // const handleToggle = async (urlId, currentStatus) => {
    //     try {
    //       const data=await axios.put(
    //         `${process.env.REACT_APP_API_URL}/url/${urlId}`,
    //         { isEnabled: !currentStatus },
    //         {
    //           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    //         }
    //       );
    //       console.log(data);
    //         setUrlData(urlData.map((url) => (url._id === urlId ? { ...url, isEnabled: !currentStatus } : url)));
    //     } catch (err) {
    //       console.error("Error toggling link:", err);
    //     }
    //   };
    // Rendering logic
    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    console.log(urlData);
    
    return (
        <>
        {
        !urlData?
    <p>Error loading data</p>:

    <div className='w-full my-auto text-center '>
    <div
    key={urlData._id}
                className="bg-white shadow-md rounded-lg p-4 my-2 flex flex-row justify-between items-center"
                >
                <div className="mb-4 flex-1 me-4">
                <h2 className="text-xl font-semibold">Shortened URL</h2>
                <div className="flex items-center">
                <input
                type="text"
                readOnly
                value={`${process.env.REACT_APP_URL}/${urlData.hashedUrl}`}
                            className="border px-2 py-1 rounded-l w-full"
                            />
                        <CopyToClipboard text={`${process.env.REACT_APP_URL}/${urlData.hashedUrl}`}>
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
                        value={urlData.originalUrl}
                        className="border px-2 py-1 w-full rounded"
                    />
                    </div>
                    
                    <div className="mb-4 mx-6">
                    <h2 className="text-xl text-center font-semibold">Total Visits</h2>
                    <p className="text-center border rounded-lg py-2 text-lg">
                    {urlData.totalVisits}
                    </p>
                </div>

                <div className="mb-4 mx-6">
                <h2 className="text-xl text-center font-semibold">Created At</h2>
                <p className="border px-2 py-1 w-full rounded bg-gray-100">
                {urlData?.createdAt?.split("T")[0]}
                </p>
              </div>
              
              
              <div className="mb-4 mx-6">
                <h2 className="text-xl text-center font-semibold">Updated At</h2>
                <p className="border px-2 py-1 w-full rounded bg-gray-100">
                  {urlData?.updatedAt?.split("T")[0]+" "+urlData?.updatedAt?.split("T")[1].split(".")[0]}
                </p>
                </div>
                
                {/* <div className="mb-4 flex flex-col items-center">
              <h2 className="text-xl font-semibold">Enabled</h2>
                <Switch
                onChange={() => handleToggle(urlData._id, urlData.isEnabled)}
                  checked={urlData.isEnabled}
                  offColor="#888"
                  onColor="#0D6EFD"
                  />
                  </div> */}
                  
              
                  </div>
                  <div className='w-1/2'>
                  
                  <AnalyticsLineChart analytics={urlData?.analytics} />
            </div>

            </div>
        }
        </>

    );
}

export default Url;
