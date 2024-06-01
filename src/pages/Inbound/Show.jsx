import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Show() {
  const { id } = useParams();
  const [inbound, setInbound] = useState(null);
  const [error, setError] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const instance = axios.create({
      baseURL: "http://localhost:8000/",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });

    instance
      .get(`inbound/${id}`)
      .then((res) => {
        console.log("Data received from API:", res.data.data); 
        setInbound(res.data.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login!"));
        } else {
          setError(err.response.data);
        }
      });
  }, [id, navigate]);

  if (!inbound) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-300 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">Detail Inbound</h2>
        {Object.keys(error).length > 0 && (
          <div role="alert">
            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Gagal!</div>
            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
              <ul>
                {Object.entries(error).map(([key, value], i) => (
                  <li key={key}>{key !== "status" ? i + 1 + '. ' + value : ''}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
        <div className="flex justify-center mb-4">
          <img
            src={`http://localhost:8000/proff/${inbound.proff_file}`}
            alt={inbound.name}
            className="w-32 h-32 object-cover rounded-full border-2 border-gray-300"
          />
        </div>
        <div className="text-center mb-4">
          <p className="text-lg font-medium text-gray-900">
            <strong>Nama:</strong> {inbound.stuff ? inbound.stuff.name : "0"}
          </p>
          <p className="text-lg font-medium text-gray-900">
            <strong>Total:</strong> {inbound.total}
          </p>
          <p className="text-lg font-medium text-gray-900">
            <strong>Tanggal:</strong> {inbound.date}
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-200"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
