import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Pinjaman = db.define(
  "pinjaman",
  {
    nama: {
      type: DataTypes.STRING,
    },
    judul: {
      type: DataTypes.STRING,
    },
    tanggal_pinjam: {
      type: DataTypes.DATEONLY,
    },
    tanggal_kembali: {
      type: DataTypes.DATEONLY,
    },
    status: {
      type: DataTypes.STRING,
    },
  },
  {
    freezTableName: true,
  }
);

export default Pinjaman;
