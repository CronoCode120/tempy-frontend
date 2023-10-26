import { describe, it, expect, vi, beforeEach } from "vitest"
import { getTemperature } from "./getTemperature.ts"

const mockSetTemperature = vi.fn()
const mockSetCurTemperature = vi.fn()
const mockService = { getTemperature: vi.fn() }

describe("getTemperature", () => {
  beforeEach(() => vi.resetAllMocks() as any)

  it("calls service and updates state accordingly", async () => {
    vi.mocked(mockService.getTemperature).mockResolvedValueOnce(10)
    await getTemperature({
      setCurrentTemperature: mockSetCurTemperature,
      setTemperature: mockSetTemperature,
      temperatureService: mockService,
      ip: '::ip::'
    })

    expect(mockService.getTemperature).toHaveBeenCalledWith(
      "::ip::"
    )
    expect(mockSetCurTemperature).toBeCalled()
    expect(mockSetTemperature).toBeCalled()
  })
})
