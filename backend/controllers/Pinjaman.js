import Pinjaman from "../models/pinjamanModels.js";

export const getAllPinjaman = async (req, res) => {
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
      where: { status: "pinjam" },
    });
    res.json(pinjamans);
  } catch (error) {
    console.log(error);
  }
};

export const getPinjamanById = async (req, res) => {
  try {
    const response = await Pinjaman.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createPinjaman = async (req, res) => {
  try {
    // Menambahkan status "pinjam" ke body request sebelum membuat pinjaman
    req.body.status = "pinjam";

    await Pinjaman.create(req.body);
    res.json({ msg: "Pinjaman berhasil ditambah" });
  } catch (error) {
    console.log(error);
  }
};

export const deletePinjaman = async (req, res) => {
  try {
    const pinjaman = await Pinjaman.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!pinjaman) {
      return res.status(404).json({ msg: "Pinjaman not found" });
    }

    // Jika status sebelumnya bukan "selesai"
    if (pinjaman.status !== "selesai") {
      // Set status menjadi "selesai"
      pinjaman.status = "selesai";

      // Set tanggal kembali menjadi tanggal saat ini
      pinjaman.tanggal_kembali = new Date();

      await pinjaman.save();

      return res.json({ msg: "Pinjaman berhasil diselesaikan" });
    } else {
      return res.json({ msg: "Pinjaman sudah diselesaikan sebelumnya" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error deleting pinjaman" });
  }
};
