import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../middleware/refreshToken.js";
import { getUsers, login, logout, register } from "../controllers/Users.js";
import {
  getAllAnggota,
  createAnggota,
  getAnggotaById,
  deleteAnggota,
  updateAnggota,
} from "../controllers/Anggota.js";
import {
  createBuku,
  deleteBuku,
  getAllBuku,
  getBukuById,
  updateBuku,
} from "../controllers/Buku.js";
import {
  createPinjaman,
  deletePinjaman,
  getAllPinjaman,
  getPinjamanById,
} from "../controllers/Pinjaman.js";
import { getPinjamanDone } from "../controllers/PinjamanSelesai.js";
const router = express.Router();

//user
router.get("/users", verifyToken, getUsers);
router.post("/users", register);
router.post("/login", login);
router.get("/token", refreshToken);
router.delete("/logout", logout);

//anggota
router.get("/anggota", getAllAnggota);
router.get("/anggota/:id", getAnggotaById);
router.post("/anggota", createAnggota);
router.patch("/anggota/:id", updateAnggota);
router.delete("/anggota/:id", deleteAnggota);

//buku
router.get("/buku", getAllBuku);
router.get("/buku/:id", getBukuById);
router.post("/buku", createBuku);
router.patch("/buku/:id", updateBuku);
router.delete("/buku/:id", deleteBuku);

//pinjaman
router.get("/pinjaman", getAllPinjaman);
router.get("/pinjaman/:id", getPinjamanById);
router.post("/pinjaman", createPinjaman);
router.delete("/pinjaman/:id", deletePinjaman);

router.get("/riwayat", getPinjamanDone);

export default router;
