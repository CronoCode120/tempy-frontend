import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, within } from "@testing-library/react"
import { App } from "./App.jsx"
import userEvent from "@testing-library/user-event"
import { DependenciesContext } from "./context/Dependencies.js"
import { TemperatureServiceFake } from "./services/TemperatureServiceFake.js"
import { getTemperature } from "./lib/getTemperature.js"

vi.mock("./lib/getTemperature.js", () => ({
  getTemperature: vi.fn(({ setTemperature, setCurrentTemperature }) => {
    setTemperature("24.4")
    setCurrentTemperature(24.4)
  }),
}))

describe("App", () => {
  beforeEach(async () => {
    const temperatureService = new TemperatureServiceFake()

    const dependencies = { temperatureService }

    render(
      <DependenciesContext.Provider value={dependencies}>
        <App />
      </DependenciesContext.Provider>
    )
  })

  afterEach(() => {
    cleanup()
  })

  it("loads the current temperature as an emoji", async () => {
    const element = await screen.findByText("😌")

    expect(element).toBeInTheDocument()
  })

  it("loads the current temperature as an an area label on the emoji", async () => {
    const element = await screen.findByLabelText("Current weather is warm")

    expect(element).toBeInTheDocument()
  })

  it("converts from celsius to kelvin the current weather", async () => {
    const user = userEvent.setup()

    await user.selectOptions(screen.getByLabelText("To"), "Kelvin")

    const element = await screen.findByText(
      (_, { textContent }) => textContent === "Conversion result: 297.5 K"
    )
    expect(element).toBeInTheDocument()
  })

  it('calls temperature service when button "Get Temperature" is clicked', async () => {
    const user = userEvent.setup()

    const btn = screen.getByText("Get Temperature")
    await user.click(btn)

    expect(getTemperature).toBeCalled()
  })

  it("renders a list of countries", () => {
    const countryList = ["España", "Francia", "Portugal", "Italia"]

    const list = screen.getByRole("list")
    const countries = within(list).getAllByRole("listitem")

    countries.forEach((country, idx) => {
      expect(country.textContent).toContain(countryList[idx])
    })
  })
})
