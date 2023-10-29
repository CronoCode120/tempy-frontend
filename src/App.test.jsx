import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, within } from "@testing-library/react"
import { App } from "./App.jsx"
import userEvent from "@testing-library/user-event"
import { DependenciesContext } from "./context/Dependencies.js"
import { TemperatureServiceFake } from "./services/TemperatureServiceFake.js"
import { CountriesServiceFake } from "./services/CountriesServiceFake.ts"
import { getTemperature } from "./lib/getTemperature.ts"
import { getCountries } from "./lib/getCountries.ts"

vi.mock("./lib/getTemperature.ts", () => ({
  getTemperature: vi.fn(({ setTemperature, setCurrentTemperature }) => {
    if (setTemperature) setTemperature("24.4")
    setCurrentTemperature(24.4)
  }),
}))

vi.mock("./lib/getCountries.ts", () => ({
  getCountries: vi.fn(({ setCountries }) => {
    setCountries(countryList)
  }),
}))

const countryList = [
  {
    name: "España",
    ip: "103.202.235.255",
  },
  {
    name: "Francia",
    ip: "1.1.1.1",
  },
  {
    name: "Portugal",
    ip: "2.2.2.2",
  },
]

describe("App", () => {
  beforeEach(async () => {
    const temperatureService = new TemperatureServiceFake()
    const countriesService = new CountriesServiceFake()

    const dependencies = { temperatureService, countriesService }

    render(
      <DependenciesContext.Provider value={dependencies}>
        <App />
      </DependenciesContext.Provider>
    )
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
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

  describe("List of countries", () => {
    it("renders a list of countries", async () => {
      const list = screen.getByRole("list")
      const countries = await vi.waitFor(() =>
        within(list).getAllByRole("listitem")
      )

      countries.forEach((country, idx) => {
        expect(country.textContent).toMatch(
          `${countryList[idx].name} --> 24.4 ºC`
        )
      })

      expect(getCountries).toBeCalled()
    })
  })
})
