import { Telegraf } from "telegraf";
import { Database } from "./db/db.js";

// Cargamos el ENV
process.loadEnvFile();

// Creamos una nueva variable en process con los usuarios actuales.
let authUsers = await Database.getUsers();

const bot = new Telegraf(process.env.token)

bot.use((ctx, next) => {
  const userID = ctx.message.from.id;

  // Comprobamos el usuario
  if(!authUsers.find(row => row.id == userID)){
    // Si no coincide con los que tenemos guardados le indicamos error
    ctx.reply("Acceso no autorizado. Desaparezcase parcero")
  }
  else{
    // Si está registrado podemos continuar.
    next();
  }
})

bot.on("text",(ctx) => {
  ctx.reply("hola caracola")
});

bot.launch()