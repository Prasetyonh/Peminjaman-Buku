import Navbar from "../components/Navbar";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/Constant";

const Dashboard = () => {
  const [setToken] = useState("");
  const [setExp] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
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

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="text-center mt-3 font-bold text-3xl">
          Selamat Datang di Aplikasi Peminjaman Buku
        </h1>
      </div>
    </>
  );
};

export default Dashboard;
