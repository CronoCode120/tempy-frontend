import { describe, it, expect, vi, beforeEach } from "vitest"
import { TemperatureService } from "./TemperatureService.js"
import { setLocalEnv } from "../setEnv/setLocalEnv.js"

const url = "http://localhost:5000"

describe("TemperatureService", () => {
  describe("local environment", () => {
    beforeEach(setLocalEnv)
    it("returns the current temperature", async () => {
      const fetchMock = vi.fn(async () => ({
        json: async () => ({ temperature: 10 }),
        ok: true,
      }))
      const ip = "1.178.255.255"

      const temperatureService = new TemperatureService(fetchMock)

      const temperature = await temperatureService.getTemperature(undefined)

      expect(temperature).toEqual(10)
      expect(fetchMock).toHaveBeenCalledWith(
        "http://localhost:3000/temperature",
        { headers: { "x-forwarded-for": ip } }
      )
    })

    it("throws error if response not ok", async () => {
      const fetchMock = async () => ({
        json: async () => ({ temperature: 10 }),
        ok: false,
      })

      const temperatureService = new TemperatureService(fetchMock)

      const result = temperatureService.getTemperature(url)

      expect(result).rejects.toThrow("Could not get temperature")
    })
  })
})
