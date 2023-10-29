import {
  render,
  screen,
  waitFor,
  act,
  within,
  cleanup,
} from "@testing-library/react"
import { App } from "./App"
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest"
import userEvent from "@testing-library/user-event"
import { DependenciesContext } from "./context/Dependencies"
import { TemperatureService } from "./services/TemperatureService.js"
import { CountriesService } from "./services/CountriesService.ts"
import { setLocalEnv } from "./setEnv/setLocalEnv.js"

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

const tempFetchMock = vi.fn(async () => ({
  json: async () => ({ temperature: 10 }),
  ok: true,
}))

let countryFetchMock = vi.fn(async () => ({
  json: async () => ({ countryList }),
  ok: true,
}))

const expectedUrl = "http://localhost:3000/temperature"
const expectedHeaders = {
  headers: {
    "x-forwarded-for": "1.178.255.255",
  },
}

describe("App integration", () => {
  let countriesService, temperatureService
  beforeEach(async () => {
    countriesService = new CountriesService(countryFetchMock)
    temperatureService = new TemperatureService(tempFetchMock)

    await act(async () =>
      render(
        <DependenciesContext.Provider
          value={{ countriesService, temperatureService }}
        >
          <App />
        </DependenciesContext.Provider>
      )
    )
  })

  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })

  describe("List of countries", async () => {
    it("renders the list of countries and their temperatures", async () => {
      const countries = within(screen.getByRole("list")).getAllByRole(
        "listitem"
      )
      countries.forEach((country, idx) =>
        expect(country.textContent).toMatch(
          `${countryList[idx].name} --> 10 ºC`
        )
      )
    })
  })

  describe("Get Temperature button", () => {
    beforeAll(() => {
      countryFetchMock = vi.fn(async () => ({
        json: async () => ({ countryList: [] }),
        ok: true,
      }))
    })
    it("TemperatureService is called when button is clicked", async () => {
      setLocalEnv()
      userEvent.setup()
      const btn = await screen.findByText("Get Temperature")

      expect(tempFetchMock).toHaveBeenNthCalledWith(
        1,
        expectedUrl,
        expectedHeaders
      )
      expect(screen.findByText("Current temperature is 10 ºC"))

      await userEvent.click(btn)

      await waitFor(() => expect(tempFetchMock).toHaveBeenCalledTimes(2))
    })
  })
})
