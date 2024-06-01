import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function LendingRestoration() {
    const { id } = useParams();
    const [lending, setLending] = useState(null);
    const [forms, setForms] = useState({
        date_time: '',
        total_good_stuff: '',
        total_defect_stuff: ''
    });

    const [error, setError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        console.log('Lending ID:', id);
        const fetchLendingDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/lendings/${id}`, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                    },
                });
                setLending(response.data.data);
            } catch (err) {
                console.error('Failed to fetch lending details:', err);
                setError({ message: 'Failed to fetch lending details.' });
            }
        };

        fetchLendingDetails();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8000/restorations/${id}`, forms, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
                }                
            });
            // onClose();
            navigate('/lending');
        } catch (err) {
            if (err.response) {
                setError(err.response.data);
                console.error('Error response:', err.response);
            } else if (err.request) {
                console.error('Error request:', err.request);
                setError({ message: 'No response received from the server.' });
            } else {
                console.error('Error message:', err.message);
                setError({ message: 'An error occurred while processing the request.' });
            }
        }
    };

    
    return (
        <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {Object.keys(error).length > 0 && (
                <div role="alert" className="mb-4">
                    <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                        Gagal
                    </div>
                    <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                        <ul>
                            {typeof error === 'string' ? (
                                <li>{error}</li>
                            ) : (
                                Object.entries(error).map(([key, value]) => (
                                    <li key={key}>{`${key}: ${value}`}</li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            )}

            <div className="items-center m-5 mt-8 pb-10 pt-8">
                <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Return</h5>
                    </div>
                    <br />
                    {lending && (
                        <div className="bg-white p-4 rounded-lg shadow mb-5">
                            <p className="text-lg font-medium text-gray">
                                <strong>Detail Barang:</strong> 
                            </p>
                            <p className="text-lg font-medium text-gray">
                                <strong>Barang:</strong> {lending.stuff ? lending.stuff.name : "0"}
                            </p>
                            <p className="text-lg font-medium text-gray">
                                <strong>Tanggal:</strong> {lending.date_time}
                            </p>
                            <p className="text-lg font-medium text-gray break-all">
                                <strong>Total Barang yang dipinjam:</strong> {lending.total_stuff}
                            </p>
                        </div>
                    )}

                    <div className="mb-5">
                        <label htmlFor="date_time" className="block mb-2 text-sm font-medium text-white">Waktu Kembali</label>
                        <input
                            type="datetime-local"
                            id="date_time"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                            required
                            onChange={e => setForms({ ...forms, date_time: e.target.value })}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="total_good_stuff" className="block mb-2 text-sm font-medium text-white">Total Barang Bagus</label>
                        <input
                            type="number"
                            id="total_good_stuff"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                            required
                            onChange={e => setForms({ ...forms, total_good_stuff: e.target.value })}
                        />
                    </div>

                    <div className="mb-5">
                        <label htmlFor="total_defect_stuff" className="block mb-2 text-sm font-medium text-white">Total Barang Rusak</label>
                        <input
                            type="number"
                            id="total_defect_stuff"
                            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5"
                            required
                            onChange={e => setForms({ ...forms, total_defec_stuff: e.target.value })}
                        />
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="text-white bg-teal-700 hover:bg-teal-800 focus:ring-4 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
