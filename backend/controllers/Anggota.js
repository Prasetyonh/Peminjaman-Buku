import Anggota from "../models/anggotaModels.js";

export const getAllAnggota = async (req, res) => {
  try {
    const anggotas = await Anggota.findAll({
      attributes: ["id", "name", "nim", "prodi", "no_hp"],
    });
    res.json(anggotas);
  } catch (error) {
    console.log(error);
  }
};

export const getAnggotaById = async (req, res) => {
  try {
    const response = await Anggota.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createAnggota = async (req, res) => {
  const anggota = await Anggota.findOne({
    where: { nim: req.body.nim },
  });
  if (anggota)
    return res.status(400).json({ msg: "NIM anggota sudah terdaftar" });

  try {
    await Anggota.create(req.body);
    res.json({ msg: "anggota berhasil ditambah" });
  } catch (error) {
    console.log(error);
  }
};

export const updateAnggota = async (req, res) => {
  try {
    await Anggota.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Anggota berhasil diupdate" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteAnggota = async (req, res) => {
  try {
    await Anggota.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ msg: "Anggota berhasil dihapus" });
  } catch (error) {
    console.log(error.message);
  }
};
