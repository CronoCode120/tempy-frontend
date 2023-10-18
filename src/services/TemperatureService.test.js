import { describe, it, expect } from "vitest"
import { TemperatureService } from "./TemperatureService.js"

describe("TemperatureService", () => {
  it("returns the current temperature", async () => {
    const fetchMock = async () => ({
      json: async () => ({ temperature: 10 }),
      ok: true,
    })
    const ip = "::ip::"

    const temperatureService = new TemperatureService(fetchMock)

    const temperature = await temperatureService.getTemperature(ip)

    expect(temperature).toEqual(10)
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3000/temperature",
      { headers: { "x-forwaded-for": ip } }
    )
  })

  it("throws error if response not ok", async () => {
    const fetchMock = async () => ({
      json: async () => ({ temperature: 10 }),
      ok: false,
    })

    const temperatureService = new TemperatureService(fetchMock)

    const result = temperatureService.getTemperature()

    expect(result).rejects.toThrow("Could not get temperature")
  })
})
