import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import { SelectUnit } from "./SelectUnit.jsx"
import userEvent from "@testing-library/user-event"
import { AllUnits } from "../models/TemperatureUnit.js"

vi.mock("../models/TemperatureUnit.js", () => ({
  AllUnits: ["Unit 1", "Unit 2", "Unit 3"],
}))

describe("SelectUnit", () => {
  afterEach(() => cleanup())
  it("renders properly", () => {
    const props = {
      id: "::id::",
      label: "::label::",
      value: "Unit 1",
      onChange: vi.fn(),
    }
    render(<SelectUnit {...props} />)

    const select = screen.getByLabelText("::label::")
    const options = screen.getAllByRole("option")
    expect(select.value).toBe("Unit 1")
    options.forEach((option, idx) =>
      expect(option.textContent).toEqual(AllUnits[idx])
    )
  })

  it("select element changes properly", async () => {
    const props = {
      id: "::id::",
      label: "::label::",
      value: "Unit 1",
      onChange: vi.fn(),
    }
    const user = userEvent.setup()
    render(<SelectUnit {...props} />)

    const select = screen.getByLabelText("::label::")
    const option2 = screen.getByText("Unit 2")
    expect(select.value).toBe("Unit 1")

    await user.selectOptions(select, option2)

    expect(props.onChange).toBeCalledWith("Unit 2")
  })
})
