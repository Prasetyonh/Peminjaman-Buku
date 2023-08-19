import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/Constant";
import jwt_decode from "jwt-decode";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/Navbar";

const EditAnggota = () => {
  const [setToken] = useState("");
  const [setExp] = useState("");

  const [name, setName] = useState("");
  const [nim, setnim] = useState("");
  const [prodi, setProdi] = useState("");
  const [noHp, setNoHp] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    refreshToken();
    getAnggota();
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

  const getAnggota = async () => {
    const res = await axios.get(`${API_URL}/anggota/${id}`);
    setName(res.data.name);
    setnim(res.data.nim);
    setProdi(res.data.prodi);
    setNoHp(res.data.no_hp);
  };

  const updateAnggota = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${API_URL}/anggota/${id}`, {
        name,
        nim,
        prodi,
        noHp,
      });
      navigate("/anggota");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container p-16 card">
        <p className="text-center font-bold text-3xl mb-3">Edit Anggota</p>
        <form onSubmit={updateAnggota}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nama
            </label>
            <input
              type="text"
              id="name"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukkan Nama"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              NIM
            </label>
            <input
              type="number"
              id="nim"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              placeholder="Masukkan NIM"
              value={nim}
              onChange={(e) => setnim(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Prodi
            </label>
            <input
              type="text"
              id="prodid"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              placeholder="Masukkan Prodi"
              value={prodi}
              onChange={(e) => setProdi(e.target.value)}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nomor HP
            </label>
            <input
              type="number"
              id="no_hp"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukkan Nomor HP"
              required
              value={noHp}
              onChange={(e) => setNoHp(e.target.value)}
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

export default EditAnggota;
