import React from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import CountriesList from "./CountriesList.tsx"
import CountryItem from "./CountryItem.tsx"

vi.mock("./CountryItem.tsx", () => ({
  default: vi.fn(() => <li>::CountryItem::</li>),
}))

const countryArray = [
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

const props = {
  countryArray,
  temperatureService: "::mockService::",
  getTemperature: vi.fn(),
}

describe("CountriesList", () => {
  afterEach(() => {
    cleanup()
    vi.clearAllMocks()
  })
  it("renders properly", async () => {
    render(<CountriesList {...props} />)

    const items = screen.getAllByText("::CountryItem::")
    items.forEach(country => {
      expect(country).toBeInTheDocument()
    })

    countryArray.forEach((country, idx) => {
      expect(CountryItem).toHaveBeenNthCalledWith(
        idx + 1,
        {
          country: country.name,
          countryIp: country.ip,
          temperatureService: props.temperatureService,
          getTemperature: props.getTemperature,
        },
        {}
      )
    })
  })

  it("renders a message when countryArray is empty", () => {
    render(
      <CountriesList
        countryArray={[]}
        temperatureService={props.temperatureService}
        getTemperature={props.getTemperature}
      />
    )

    expect(screen.getByText("No countries information available"))
  })
})
