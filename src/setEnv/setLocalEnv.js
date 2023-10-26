import dotenv from "dotenv"

export function setLocalEnv() {
  dotenv.config({
    path: "./.env.local",
  })
}

setLocalEnv()
