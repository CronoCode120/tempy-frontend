import { describe, it, expect, vi } from "vitest"
import { getTemperature } from "./getTemperature"

describe("getTemperature", () => {
  it.only("calls service and updates state accordingly", async () => {
    const mockSetTemperature = vi.fn()
    const mockSetCurTemperature = vi.fn()
    const mockService = { getTemperature: vi.fn(() => Promise.resolve(10)) }

    await getTemperature({
      setCurrentTemperature: mockSetCurTemperature,
      setTemperature: mockSetTemperature,
      temperatureService: mockService,
    })

    expect(mockService.getTemperature).toHaveBeenCalledWith("1.178.255.255")
    expect(mockSetCurTemperature).toBeCalled()
    expect(mockSetTemperature).toBeCalled()
  })
})
