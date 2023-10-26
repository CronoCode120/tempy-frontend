import dotenv from "dotenv"

export function setProdEnv() {
  dotenv.config({
    path: "./.env.prod",
  })
}

setProdEnv()
