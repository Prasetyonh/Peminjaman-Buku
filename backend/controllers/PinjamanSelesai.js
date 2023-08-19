import Pinjaman from "../models/pinjamanModels.js";

export const getPinjamanDone = async (req, res) => {
  try {
    const pinjamans = await Pinjaman.findAll({
      attributes: [
        "id",
        "nama",
        "judul",
        "tanggal_pinjam",
        "tanggal_kembali",
        "status",
      ],
      where: { status: "selesai" },
    });
    res.json(pinjamans);
  } catch (error) {
    console.log(error);
  }
};
