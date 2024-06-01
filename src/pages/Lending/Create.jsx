import { useState, useEffect } from "react";
import Case from "../../components/Case";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InboundCreate() {
    const [formData, setFormData] = useState({
        name: '',
        stuff_id: '',
        date_time: '',
        total_stuff: '',
        notes: ''
    });

    const [error, setError] = useState('');
    const [stuffOptions, setStuffOptions] = useState([]);
    const navigate = useNavigate();

    const instance = axios.create({
        baseURL: 'http://localhost:8000/',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('access_token')
        }
    });

    useEffect(() => {
        instance.get('stuff')
            .then(res => {
                setStuffOptions(res.data.data);
            })
            .catch(err => {
                setError(err.response.data);
            });
    }, [instance]);

    const handleCreateLending = (event) => {
        event.preventDefault();

        const formDataObj = new FormData();
        formDataObj.append('name', formData.name);
        formDataObj.append('stuff_id', formData.stuff_id);
        formDataObj.append('date_time', formData.date_time);
        formDataObj.append('notes', formData.notes);
        formDataObj.append('total_stuff', formData.total_stuff);

        instance.post('lendings/store', formDataObj, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res => {
            navigate('/lending');
        })
        .catch(err => {
            setError(err.response.data.data);
        });
    };

    return (
        <Case>
            <div className="block m-auto h-screen bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="items-center m-5 pb-10 pt-10">
                    {error && (
                        <div role="alert">
                            <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                                Gagal!
                            </div>
                            <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                                {error}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-center">
                        <h5 className="mb-1 ml-5 text-3xl font-medium text-gray-900 dark:text-white">Lending</h5>
                    </div>
                    <form onSubmit={handleCreateLending} className="max-w-sm mx-auto">
                        <div className="mb-5">
                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Peminjam</label>
                            <input type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nama" required onChange={e =>
                                setFormData({ ...formData, name: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="stuff_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Kategori Barang</label>
                            <select id="stuff_id" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={e =>
                                setFormData({ ...formData, stuff_id: e.target.value })}>
                                <option value="">Pilih Barang</option>
                                {stuffOptions.map(stuff=> (
                                    <option key={stuff.id} value={stuff.id}>{stuff.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="date_time" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Waktu Pinjam</label>
                            <input type="date" id="date_time" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required onChange={e =>
                                setFormData({ ...formData, date_time: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="total_stuff" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Total Barang</label>
                            <input type="number" id="total_stuff" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Total Barang" required onChange={e =>
                                setFormData({ ...formData, total_stuff: e.target.value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Notes</label>
                            <textarea id="notes" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 
                                dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="notes" required onChange={e =>
                                setFormData({ ...formData, notes: e.target.value })} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 
                            py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </Case>
    );
}
