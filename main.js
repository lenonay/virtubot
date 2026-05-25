import * as fs from "node:fs";
import { Telegraf } from "telegraf";

import { Database } from "./db/db.js";
import { auth } from "./middlewares/auth.js";
import { registrar } from "./commands/registrar.js";

// Cargamos el ENV
process.loadEnvFile();

// Creamos una nueva variable en process con los usuarios actuales.
export let authUsers = await Database.getUsers();

export const bot = new Telegraf(process.env.token);

bot.start((ctx) => {
  ctx.reply(fs.readFileSync("./static/start.txt"));
});

// Registrar usuarios
bot.command("registrar", registrar);

bot.use(auth);

bot.on("text", (ctx) => {
  ctx.reply("hola caracola");
});

bot.launch();