import mysql from "mysql2/promise";
process.loadEnvFile();

export async function GetDB(){
  return await mysql.createConnection({
    database: process.env.db_db,
    host: process.env.db_host,
    port: process.env.db_port,
    user: process.env.db_user,
    password: process.env.db_pass,
    dateStrings: true
  })
}

// Database Init
export async function InitDB(){
  
}