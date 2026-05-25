import { Database } from "../db/db.js";
import { authUsers } from "../main.js";
import { Responses } from "../static/responses.js";
import { logger } from "../utils/log.js";

export async function registrar(ctx) {
  const { text, from } = ctx.message;

  // Dividimos el texto por " " y buscamos el secreto
  if (!text.split(" ").includes(process.env.secret)) {
    // Si no lo encontramos damos error
    ctx.reply(Responses.register.badSecret);
    logger(`El usuario ${from.username} ha fallado el registro`);

    return;
  }

  // Comprobamos si el usuario no existe ya
  if (authUsers.find(row => row.id == from.id)) {
    // El usuario ya existe lo avisamos
    ctx.reply(Responses.register.alreadyRegistered);
    logger(`El usuario ${from.username} se ha intentado registrar dos veces`);

    return;
  }

  // Añadimos el usuario
  await Database.addUser(from);

  // Actualizamos los usuarios
  authUsers = await Database.getUsers();

  // Respondemos al usuario
  ctx.reply(Responses.register.registered);
}
;
