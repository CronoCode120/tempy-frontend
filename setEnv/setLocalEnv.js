import dotenv from "dotenv"
import process from "node:process"

export function setLocalEnv() {
  dotenv.config({
    path: "./.env.local",
  })
  console.log(process.env.NODE_ENV)
  console.log(process.env.DEFINITIVE_ENV)
}

setLocalEnv()
