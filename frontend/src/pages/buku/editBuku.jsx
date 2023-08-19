import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/Constant";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const EditBuku = () => {
  const [setToken] = useState("");
  const [setExp] = useState("");

  const [judul, setJudul] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [isbn, setIsbn] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    getBuku();
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

  const getBuku = async () => {
    const res = await axios.get(`${API_URL}/buku/${id}`);
    setJudul(res.data.judul);
    setPengarang(res.data.pengarang);
    setPenerbit(res.data.penerbit);
    setIsbn(res.data.isbn);
  };

  const updateBuku = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/buku/${id}`, {
        judul,
        pengarang,
        penerbit,
        isbn,
      });
      navigate("/buku");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container p-16 card">
        <p className="text-center font-bold text-3xl mb-3">Edit Buku</p>
        <form onSubmit={updateBuku}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Judul
            </label>
            <input
              type="text"
              id="judul"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukkan Judul Buku"
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Pengarang
            </label>
            <input
              type="text"
              id="pengarang"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              placeholder="Masukkan Pengarang"
              value={pengarang}
              onChange={(e) => setPengarang(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Penerbit
            </label>
            <input
              type="text"
              id="penerbit"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              placeholder="Masukkan Penerbit"
              value={penerbit}
              onChange={(e) => setPenerbit(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              ISBN
            </label>
            <input
              type="text"
              id="isbn"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukkan ISBN"
              required
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Simpan
          </button>
          <Link
            to={"/anggota"}
            type="button"
            className="ms-2 text-blue-700 bg-white hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Kembali
          </Link>
        </form>
      </div>
    </>
  );
};

export default EditBuku;
