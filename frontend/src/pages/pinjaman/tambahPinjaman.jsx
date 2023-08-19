import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../utils/Constant";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const TambahPinjaman = () => {
  const [setToken] = useState("");
  const [setExp] = useState("");

  const [nama, setNama] = useState("");
  const [judul, setJudul] = useState("");
  const [tanggal_pinjam, setTanggalPinjam] = useState("");

  const [dataAnggota, setDataAnggota] = useState();
  const [dataBuku, setDataBuku] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
    getAnggotas();
    getAllBuku();
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    setTanggalPinjam(formattedDate);
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

  const addPinjaman = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/pinjaman`, {
        nama: nama,
        judul: judul,
        tanggal_pinjam: tanggal_pinjam,
      });
      navigate("/pinjaman");
    } catch (error) {
      console.log(error);
    }
  };

  const getAnggotas = async () => {
    try {
      await axios.get(`${API_URL}/anggota`).then((res) => {
        const data = res.data;
        setDataAnggota(data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getAllBuku = async () => {
    try {
      await axios.get(`${API_URL}/buku`).then((res) => {
        const data = res.data;
        setDataBuku(data);
        console.log(data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container p-16 card">
        <p className="text-center font-bold text-3xl mb-3">Tambah Pinjaman</p>
        <form onSubmit={addPinjaman}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Nama
            </label>
            <select
              id="Nama"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="Masukkan Judul Buku"
              required
              value={nama}
              onChange={(e) => setNama(e.target.value)}
            >
              <option value="" hidden>
                Pilih Nama Anggota
              </option>
              {dataAnggota &&
                dataAnggota.map((anggota) => (
                  <option key={anggota.id} value={anggota.name}>
                    {anggota.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Buku
            </label>
            <select
              id="judul"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              value={judul}
              onChange={(e) => setJudul(e.target.value)}
            >
              <option value="" hidden>
                Pilih Judul Buku
              </option>
              {dataBuku &&
                dataBuku.map((buku) => (
                  <option key={buku.id} value={buku.judul}>
                    {buku.judul}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              Tanggal Pinjam
            </label>
            <input
              type="date"
              id="tanggalPinjam"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              required
              placeholder="Masukkan Penerbit"
              value={tanggal_pinjam}
              onChange={(e) => setTanggalPinjam(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Simpan
          </button>
          <Link
            to={"/buku"}
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

export default TambahPinjaman;
