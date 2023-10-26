import React from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import CountryItem from "./CountryItem.tsx"

const props = {
  getTemperature: vi.fn(({ setCurrentTemperature }) => {
    setCurrentTemperature(30)
  }),
  temperatureService: "::mockService::",
  countryIp: "::ip::",
  country: "España",
}

describe("CountryItem", () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })
  it("renders properly", async () => {
    await act(async () => render(<CountryItem {...props} />))
    expect(props.getTemperature).toBeCalled()

    expect(screen.getByText("España --> 30 ºC")).toBeInTheDocument()
  })

  it.skip("shows no temperature in the first render", () => {
    render(<CountryItem {...props} />)

    expect(screen.getByText("España --> - ºC")).toBeInTheDocument()
    expect(props.getTemperature).not.toBeCalled()
  })
})
