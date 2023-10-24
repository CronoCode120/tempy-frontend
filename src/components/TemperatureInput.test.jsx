import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { TemperatureInput } from "./TemperatureInput.jsx"
import userEvent from "@testing-library/user-event"
import { toSymbol } from "../models/TemperatureUnit.js"

vi.mock("../models/TemperatureUnit.js", async () => ({
  ...(await vi.importActual("../models/TemperatureUnit.js")),
  toSymbol: vi.fn(() => "::symbol::"),
}))

describe("TemperatureInput", () => {
  afterEach(() => cleanup())
  it("renders properly", () => {
    const props = {
      unit: "Celsius",
      value: "20",
      onChange: vi.fn(),
    }
    render(<TemperatureInput {...props} />)

    const input = screen.getByLabelText("Degrees")
    const symbol = screen.getByText("::symbol::")

    expect(input.value).toBe("20")
    expect(symbol).toBeInTheDocument()
    expect(toSymbol).toBeCalledWith("Celsius")
  })

  it("input element changes properly", async () => {
    const props = {
      unit: "Celsius",
      value: "20",
      onChange: vi.fn(),
    }

    const user = userEvent.setup()
    render(<TemperatureInput {...props} />)

    const input = screen.getByLabelText("Degrees")

    await user.type(input, "4")

    expect(props.onChange).toBeCalledWith("204")
  })
})
