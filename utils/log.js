import { writeFileSync } from "node:fs";

export function logger(text) {
  writeFileSync("./log.txt", `${new Date().toISOString()} - ${text}\n`, { flag: "a" });
}

export function logError(text) {
  writeFileSync("./log.txt", `${new Date().toISOString()} - [!] - ${text}\n`, { flag: "a" });
}