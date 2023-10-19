import { describe, it, expect, vi, beforeEach } from "vitest"
import { getTemperature } from "./getTemperature"

const mockSetTemperature = vi.fn()
const mockSetCurTemperature = vi.fn()
const mockService = { getTemperature: vi.fn() }

describe("getTemperature", () => {
  beforeEach(() => vi.resetAllMocks())

  it("calls service and updates state accordingly", async () => {
    vi.mocked(mockService.getTemperature).mockResolvedValueOnce(10)
    await getTemperature({
      setCurrentTemperature: mockSetCurTemperature,
      setTemperature: mockSetTemperature,
      temperatureService: mockService,
      url: "http://localhost:5000",
    })

    expect(mockService.getTemperature).toHaveBeenCalledWith(
      "http://localhost:5000"
    )
    expect(mockSetCurTemperature).toBeCalled()
    expect(mockSetTemperature).toBeCalled()
  })

  it("returns if url is falsy", async () => {
    await getTemperature({
      setCurrentTemperature: mockSetCurTemperature,
      setTemperature: mockSetTemperature,
      temperatureService: mockService,
      url: "",
    })

    expect(mockService.getTemperature).not.toBeCalled()
    expect(mockSetCurTemperature).not.toBeCalled()
    expect(mockSetTemperature).not.toBeCalled()
  })
})
