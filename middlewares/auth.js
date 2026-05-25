import { bot, authUsers } from "../main.js";

export function auth(ctx, next){
  const userID = ctx.message.from.id;

  // Comprobamos el usuario
  if (!authUsers.find(row => row.id == userID)) {
    // Si no coincide con los que tenemos guardados le indicamos error
    ctx.reply("Acceso no autorizado. Desaparezcase parcero");
  }
  else {
    // Si está registrado podemos continuar.
    next();
  }
}