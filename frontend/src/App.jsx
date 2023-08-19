import { Routes, Route } from "react-router-dom";
import { Login, Register } from "./pages/user";
import Dashboard from "./pages/Dashboard";
import "./index.css";
import Anggota from "./pages/anggota/Anggota";
import TambahAnggota from "./pages/anggota/TambahAnggota";
import EditAnggota from "./pages/anggota/EditAnggota";
import Buku from "./pages/buku/Buku";
import TambahBuku from "./pages/buku/tambahBuku";
import EditBuku from "./pages/buku/editBuku";
import Pinjaman from "./pages/pinjaman/pinjaman";
import TambahPinjaman from "./pages/pinjaman/tambahPinjaman";
import Riwayat from "./pages/pinjaman/Riwayat";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/anggota" element={<Anggota />} />
      <Route path="/tambahanggota" element={<TambahAnggota />} />
      <Route path="/editanggota/:id" element={<EditAnggota />} />
      <Route path="/buku" element={<Buku />} />
      <Route path="/tambahbuku" element={<TambahBuku />} />
      <Route path="/editbuku/:id" element={<EditBuku />} />
      <Route path="/pinjaman" element={<Pinjaman />} />
      <Route path="/tambahpinjaman" element={<TambahPinjaman />} />
      <Route path="/riwayat" element={<Riwayat />} />
    </Routes>
  );
}

export default App;
