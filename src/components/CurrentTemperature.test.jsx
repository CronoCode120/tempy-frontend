import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { CurrentTemperature } from "./CurrentTemperature"
import { toEmoji, toLabel } from "../models/Temperature"

vi.mock("../models/Temperature", () => ({
  toLabel: vi.fn(() => "mocked"),
  toEmoji: vi.fn(() => "mockEmoji"),
}))

describe("CurrentTemperature", () => {
  afterEach(() => cleanup())

  it("renders properly according to the temperature", () => {
    render(<CurrentTemperature temperature={24} />)
    const title = screen.getByLabelText("Current weather is mocked")
    const subtitle = screen.getByText("Current temperature is 24 ºC")

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
    expect(toEmoji).toBeCalled()
    expect(toLabel).toBeCalled()
  })

  it("renders properly if temperature is missing", () => {
    render(<CurrentTemperature />)
    const title = screen.getByLabelText("Current weather is mocked")
    const subtitle = screen.getByText("Current temperature is - ºC")

    expect(title).toBeInTheDocument()
    expect(subtitle).toBeInTheDocument()
    expect(toEmoji).toBeCalled()
    expect(toLabel).toBeCalled()
  })
})
