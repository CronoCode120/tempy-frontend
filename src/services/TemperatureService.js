import process from "node:process"

export class TemperatureService {
  baseUrl = "http://localhost:3000"
  environment = process.env.APP_ENV

  constructor(fetch = (...args) => globalThis.fetch(...args)) {
    this.fetch = fetch
  }

  async getTemperature(ip) {
    // if (!url) throw Error("Url must be defined")
    let response
    if (ip) {
      response = await this.fetch("/temperature", {
        headers: {
          "x-forwarded-for": ip,
        },
      })
    }

    if (!ip && this.environment === "local") {
      response = await this.fetch(`${this.baseUrl}/temperature`, {
        headers: {
          "x-forwarded-for": "1.178.255.255",
        },
      })
    }

    if (!ip && this.environment !== "local") {
      response = await this.fetch("/temperature")
    }

    if (!response.ok) {
      throw new Error("Could not get temperature")
    }

    const data = await response.json()

    return data.temperature
  }
}
