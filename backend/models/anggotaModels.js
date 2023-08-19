import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Anggota = db.define(
  "anggota",
  {
    name: {
      type: DataTypes.STRING,
    },
    nim: {
      type: DataTypes.STRING,
    },
    prodi: {
      type: DataTypes.STRING,
    },
    no_hp: {
      type: DataTypes.TEXT,
    },
  },
  {
    freezTableName: true,
  }
);

export default Anggota;
