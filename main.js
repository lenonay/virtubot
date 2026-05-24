import { Telegraf } from "telegraf";

// Cargar el token
process.loadEnvFile();

const bot = new Telegraf(process.env.token)

bot.start((ctx) => {
  ctx.reply("Usa /registrar mamaguevo")
  console.log(ctx.message.from);
})

bot.launch()