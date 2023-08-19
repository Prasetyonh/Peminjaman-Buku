import Buku from "../models/bukuModels.js";

export const getAllBuku = async (req, res) => {
  try {
    const bukus = await Buku.findAll({
      attributes: ["id", "judul", "pengarang", "penerbit", "isbn"],
    });
    res.json(bukus);
  } catch (error) {
    console.log(error);
  }
};

export const getBukuById = async (req, res) => {
  try {
    const response = await Buku.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createBuku = async (req, res) => {
  const buku = await Buku.findOne({
    where: { isbn: req.body.isbn },
  });
  if (buku) return res.status(400).json({ msg: "ISBN buku sudah terdaftar" });

  try {
    await Buku.create(req.body);
    res.json({ msg: "buku berhasil ditambah" });
  } catch (error) {
    console.log(error);
  }
};

export const updateBuku = async (req, res) => {
  try {
    await Buku.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Buku berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteBuku = async (req, res) => {
  try {
    await Buku.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Buku berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
  }
};
