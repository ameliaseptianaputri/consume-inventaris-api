import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Case from "../../components/Case";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function LendingIndex() {
  const [lendings, setLendings] = useState([]);
  const [authUser, setAuthUser] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileAndLendings = async () => {
      try {
        const profileResponse = await axios.get('http://localhost:8000/profile', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          }
        });
        setAuthUser(profileResponse.data.data);

        const lendingsResponse = await axios.get('http://localhost:8000/lendings', {
          headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
          }
        });
        setLendings(lendingsResponse.data.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          navigate('/login?message=' + encodeURIComponent('Anda belum login!'));
        } else {
          setError('Terjadi kesalahan. Mohon coba lagi.');
        }
      }
    };

    fetchProfileAndLendings();
  }, [navigate]);

  const deleteLending = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/lendings/${id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      setLendings(lendings.filter(lending => lending.id !== id));
    } catch (err) {
      setError("Gagal menghapus item.");
    }
  };

  return (
    <Case>
      <div className="block m-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="items-center m-5 pb-10 pt-10">
          <div className="flex justify-between">
            <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Lending</h5>
            {authUser.role === 'staff' && (
              <div className="flex justify-end">
                <Link to={'create'} className="inline-flex items-center px-4 py-2 text-sm ml-3 font-medium text-center text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-orange-500 dark:bg-orange-500 dark:hover:bg-yellow-700 dark:focus:ring-green-800 mb-5 rounded-lg mr-2">
                  Create
                  <FontAwesomeIcon icon="fa-solid fa-plus" className="pl-1 w-4 h-4 text-inherit" />
                </Link>
              </div>
            )}
          </div>
          {error && (
            <div role="alert">
              <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">Gagal!</div>
              <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                {error}
              </div>
            </div>
          )}
          <div className="flex mt-4 md:mt-6">
            <table className="min-w-full text-left text-sm font-light text-white">
              <thead className="border-b font-medium dark:border-neutral-500 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-4">No</th>
                  <th scope="col" className="px-6 py-4">Nama</th>
                  <th scope="col" className="px-6 py-4">Nama barang</th>
                  <th scope="col" className="px-6 py-4">Tanggal</th>
                  <th scope="col" className="px-6 py-4">Total</th>
                  <th scope="col" className="px-6 py-4">Notes</th>
                  <th scope="col" className="px-6 py-4">Status</th>
                  <th scope="col" className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {lendings.map((lending, index) => (
                  <tr key={lending.id}>
                    <td className="whitespace-nowrap px-6 py-4">{index + 1}</td>
                    <td className="whitespace-nowrap px-6 py-4">{lending.name}</td>
                    <td className="whitespace-nowrap px-6 py-4">{lending.stuff ? lending.stuff.name : "0"}</td>
                    <td className="whitespace-nowrap px-6 py-4">{lending.date_time}</td>
                    <td className="whitespace-nowrap px-6 py-4">{lending.total_stuff}</td>
                    <td className="whitespace-nowrap px-6 py-4">{lending.notes}</td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {lending.restoration ? (
                        <span className="text-green-500 font-bold">Sudah Dikembalikan</span>
                      ) : (
                        <span className="text-red-500 font-bold">Belum Dikembalikan</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      <Link to={`/lending/${lending.id}/show`} className="px-4 py-2 bg-blue-500 rounded-lg mr-2 font-bold text-white">Show</Link>
                      {authUser.role === 'staff' && (
                        <>
                          <Link to={`/lending/${lending.id}/restoration`} className="px-4 py-2 bg-green-500 rounded-lg mr-2 font-bold text-white">Return</Link>
                          <button type="button" onClick={() => deleteLending(lending.id)} className="px-4 py-2 bg-red-500 rounded-lg mr-2 font-bold text-white">
                            Cancel
                          </button>
                        </>
                      )}
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
