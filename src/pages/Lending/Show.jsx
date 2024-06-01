import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Show() {
  const { id } = useParams();
  const [lending, setLending] = useState(null);
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
      .get(`lendings/${id}`)
      .then((res) => {
        console.log("Data received from API:", res.data.data);
        setLending(res.data.data);
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          navigate("/login?message=" + encodeURIComponent("Anda belum login!"));
        } else {
          setError(err.response.data);
        }
      });
  }, [id, navigate]);

  if (!lending) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-800">
      <div className="bg-gray-300 rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">Detail Lending</h2>
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
        {lending && (
          <>
            <div className="text-center mb-4">
                <p className="text-lg font-medium text-gray-900">
                    <strong>Nama:</strong> {lending.name}
                </p>
                <p className="text-lg font-medium text-gray-900">
                    <strong>Barang:</strong> {lending.stuff ? lending.stuff.name : "0"}
                </p>
                <p className="text-lg font-medium text-gray-900">
                    <strong>Tanggal:</strong> {lending.date_time}
                </p>
                <p className="text-lg font-medium text-gray-900 break-all">
                    <strong>Total Barang yang dipinjam:</strong> {lending.total_stuff}
                </p>
                <p className="text-lg font-medium text-gray-900">
                    <strong>Notes:</strong> {lending.notes}
                </p>
                <p className="text-lg font-medium text-gray-900">
                    <strong>Status:</strong>{" "}
                    {lending.restoration ? (
                      <span className="text-lg font-medium text-gray-900">Sudah Dikembalikan</span>
                    ) : (
                      <span className="text-lg font-medium text-gray-900">Belum Dikembalikan</span>
                    )}
                </p>
            </div>
          </>
        )}
        <div className="flex justify-center">
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bgx-blue-600 transition duration-200"
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
