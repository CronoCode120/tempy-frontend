export class TemperatureService {
  baseUrl = "http://localhost:3000"

  constructor(fetch = (...args) => globalThis.fetch(...args)) {
    this.fetch = fetch
  }

  async getTemperature(url) {
    if (!url) throw Error("Url must be defined")
    let response
    if (url.includes("http://localhost:")) {
      response = await this.fetch(`${this.baseUrl}/temperature`, {
        headers: {
          "x-forwarded-for": "1.178.255.255",
        },
      })
    } else response = await this.fetch(`${url}/temperature`)

    if (!response.ok) {
      throw new Error("Could not get temperature")
    }

    const data = await response.json()

    return data.temperature
  }
}
