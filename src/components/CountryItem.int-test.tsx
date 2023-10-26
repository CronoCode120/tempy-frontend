import React from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import CountryItem from "./CountryItem.tsx"
import { getTemperature } from "../lib/getTemperature.ts"
import { TemperatureService } from "../services/TemperatureService.js"

const mockFetch = vi.fn(() =>
  Promise.resolve({
    json: vi.fn(() => Promise.resolve({ temperature: 35 })),
    ok: true,
  })
)

const props = {
  getTemperature,
  temperatureService: new TemperatureService(mockFetch as any),
  countryIp: "103.202.235.255",
  country: "España",
}

const headers = { headers: { "x-forwarded-for": props.countryIp } }

describe("CountryItem", () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })
  it("renders properly calling the service", async () => {
    await act(async () => render(<CountryItem {...props} />))
    await vi.waitFor(
      () => expect(mockFetch).toBeCalledWith("/temperature", headers) as any
    )

    expect(screen.getByText("España --> 35 ºC")).toBeInTheDocument()
  })
})
