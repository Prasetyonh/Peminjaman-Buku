import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/Constant";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import * as XLSX from "xlsx";

const Pinjaman = () => {
  const [setToken] = useState("");
  const [setExp] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getAllPinjaman();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshToken = async () => {
    try {
      const res = await axios.get(`${API_URL}/token`);
      setToken(res.data.accessToken);
      const decoded = jwt_decode(res.data.accessToken);
      setExp(decoded.exp);
    } catch (error) {
      if (error.response) {
        navigate("/");
      }
    }
  };

  const getAllPinjaman = async () => {
    try {
      await axios.get(`${API_URL}/pinjaman`).then((res) => {
        const data = res.data;
        setData(data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin menyelesaikan pinjaman?");

    if (confirmDelete) {
      try {
        await axios.delete(`${API_URL}/pinjaman/${id}`);
        getAllPinjaman(); // Refresh the list after deletion
      } catch (error) {
        console.log(error);
      }
    }
  };
  const onClickExport = () => {
    let wb = XLSX.utils.book_new(),
      ws = XLSX.utils.json_to_sheet(data);

    XLSX.utils.book_append_sheet(wb, ws, "Anggota");

    XLSX.writeFile(wb, "Anggota.xlsx");
  };
  return (
    <>
      <Navbar />
      <div>
        <div className=" container mx-auto px-4">
          <Link
            to={"/tambahpinjaman"}
            type="button"
            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Tambah Pinjaman
          </Link>
          <button
            onClick={onClickExport}
            type="button"
            className="mt-5 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring- font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            Eksport
          </button>
          <div className=" relative mt-2">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      NO.
                    </th>
                    <th scope="col" className="px-6 py-3">
                      NAMA
                    </th>

                    <th scope="col" className="px-6 py-3">
                      BUKU
                    </th>
                    <th scope="col" className="px-6 py-3">
                      TANGGAL PINJAM
                    </th>
                    <th scope="col" className="px-6 py-3">
                      STATUS
                    </th>
                    <th scope="col" className="px-6 py-3">
                      ACTION
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((result, idx) => {
                    return (
                      <>
                        <tr
                          key={idx}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                          >
                            {idx + 1}
                          </th>
                          <td className="px-6 py-4">{result.nama}</td>
                          <td className="px-6 py-4">{result.judul}</td>
                          <td className="px-6 py-4">{result.tanggal_pinjam}</td>
                          <td className="px-6 py-4">{result.status}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => handleDelete(result.id)}
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline ms-3"
                            >
                              Mengembalikan
                            </button>
                          </td>
                        </tr>
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>{" "}
    </>
  );
};

export default Pinjaman;
