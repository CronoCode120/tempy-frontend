import React from "react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { cleanup, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import CountriesList from "./CountriesList.tsx"

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
  CountryItem: vi.fn(() => <li>::CountryItem::</li>),
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
      expect(props.CountryItem).toHaveBeenNthCalledWith(
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
        CountryItem={props.CountryItem}
        temperatureService={props.temperatureService}
        getTemperature={props.getTemperature}
      />
    )

    expect(screen.getByText("No countries information available"))
  })
})
