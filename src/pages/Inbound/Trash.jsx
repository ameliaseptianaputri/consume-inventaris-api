import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function TrashInbound() {
  const [trashInbounds, setTrashInbounds] = useState([]);
  const [error, setError] = useState({});
  const navigate = useNavigate();

  const instance = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access_token"),
    },
  });

  useEffect(() => {
    instance
      .get("inbound/trash")
      .then((res) => {
        setTrashInbounds(res.data.data);
      })
      .catch((err) => {
        console.log(err);
        if (err.response?.status === 401) {
          navigate(
            "/login?message=" + encodeURIComponent("Anda belum login!")
          );
        }
      });
  }, [navigate]);

  const restoreInbound = (id) => {
    instance
      .put(`inbound/restore/${id}`)
      .then((res) => {
        setTrashInbounds(trashInbounds.filter((inbound) => inbound.id !== id));
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  const permanentDeleteInbound = (id) => {
    instance
      .delete(`inbound/permanent/${id}`)
      .then((res) => {
        setTrashInbounds(trashInbounds.filter((inbound) => inbound.id !== id));
      })
      .catch((err) => {
        setError(err.response.data);
      });
  };

  return (
    <Case>
      <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="items-center m-5 pb-10 pt-10">
          <div className="flex justify-between">
            <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">
              Trash Inbound
            </h5>
            <div className="flex justify-end">
              <Link
                to="/inbound"
                className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-5"
              >
                Back to Inbound <FontAwesomeIcon className="pl-1 w-4 h-4 text-inherit" />
              </Link>
            </div>
          </div>
          {Object.keys(error).length > 0 && (
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                Gagal!
              </div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                <ul>
                  {Object.entries(error).map(([key, value], i) => (
                    <li key={key}>{key !== "status" ? i + 1 + '. ' + value : ''}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <div className="flex mt-4 md:mt-6">
            <table className="min-w-full text-left text-sm font-light text-white">
              <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">No</th>
                  <th scope="col" className="px-6 py-4">ID</th>
                  <th scope="col" className="px-6 py-4">Total</th>
                  <th scope="col" className="px-6 py-4">Date</th>
                  <th scope="col" className="px-6 py-4">Photo</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {trashInbounds.map((inbound, index) => (
                  <tr key={inbound.id} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{inbound.stuff_id}</td>
                    <td className="whitespace-nowrap px-6 py-4">{inbound.total}</td>
                    <td className="whitespace-nowrap px-6 py-4">{inbound.date}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <img src={`http://localhost:8000/proff/${inbound.proff_file}`} className="w-16 h-16 object-cover rounded" />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <button
                        type="button"
                        onClick={() => restoreInbound(inbound.id)}
                        className="px-4 py-2 bg-green-500 rounded-lg mr-2 font-bold text-white"
                      >
                        Restore
                      </button>
                      <button
                        type="button"
                        onClick={() => permanentDeleteInbound(inbound.id)}
                        className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white"
                      >
                        Permanent Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Case>
  );
}
