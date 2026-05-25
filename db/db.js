import mysql from "mysql2/promise";
import * as fs from "node:fs";

async function GetDB() {
  return await mysql.createConnection({
    database: process.env.db_db,
    host: process.env.db_host,
    port: process.env.db_port,
    user: process.env.db_user,
    password: process.env.db_pass,
    dateStrings: true,
  });
}

async function CreateTables(db) {
  // Leemos el archivo con la estructura y dividimos las consultas
  const queries = fs
    .readFileSync("./db/structure.sql", { encoding: "utf-8" })
    .split(";");

  // Iteramos para hacer las consultas
  queries.forEach(async (query) => {
    // Sacamos el index
    const current = queries.indexOf(query);
    console.log(`Ejecutando query [${current}/${queries.length}]`);

    // Hacemos la consulta
    const result = await db.query(query);

    if (!result) {
      process.exit(-1);
    }
  });
}

async function CreateDefaultUser(db) {
  const result = await db.query("INSERT INTO users VALUES(?,?,?,?)", [
    process.env.id,
    process.env.username,
    "Diego",
    "admin",
  ]);
}

// Database Init
export async function InitDB() {
  const db = await GetDB();

  // Comprobamos si esta vacia
  const empty = (await db.query("show tables"))[0].length == 0;

  // Si la base de datos esta vacia añadimos las tablas
  if (empty) {
    await CreateTables(db);
    console.log("Creando tablas");
  }

  // Comprobamos que el usuario este creado
  const user = await db.query(
    "SELECT * FROM users WHERE username LIKE ?",
    process.env.username,
  );

  if (!user) {
    console.log("[!] Creando usuario por defecto");
    await CreateDefaultUser(db);
  }

  db.end();
}

export class Database {
  static async getUsers(){
    // Cargamos una instancia de la base de datos
    const db = await GetDB();

    // Pedimos todos los usuarios
    const results = await db.query('SELECT * FROM users');

    // Devolvemos los usuarios
    return results[0]
  }
}
