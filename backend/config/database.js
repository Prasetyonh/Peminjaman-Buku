import { Sequelize } from "sequelize";

const db = new Sequelize("peminjaman-buku", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

export default db;
