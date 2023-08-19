import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Buku = db.define(
  "buku",
  {
    judul: {
      type: DataTypes.STRING,
    },
    pengarang: {
      type: DataTypes.STRING,
    },
    penerbit: {
      type: DataTypes.STRING,
    },
    isbn: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezTableName: true,
  }
);

export default Buku;
