import { render, screen, waitFor } from "@testing-library/react"
import { App } from "./App"
import { describe, expect, it, vi } from "vitest"
import userEvent from "@testing-library/user-event"
import { DependenciesContext } from "./context/Dependencies"
import { TemperatureService } from "./services/TemperatureService"

const fetchMock = vi.fn(async () => ({
  json: async () => ({ temperature: 10 }),
  ok: true,
}))

const expectedUrl = "http://localhost:3000/temperature"
const expectedHeaders = {
  headers: {
    "x-forwarded-for": "1.178.255.255",
  },
}

describe("Get Temperature button", () => {
  it("TemperatureService is called when button is clicked", async () => {
    const temperatureService = new TemperatureService(fetchMock)
    render(
      <DependenciesContext.Provider value={{ temperatureService }}>
        <App />
      </DependenciesContext.Provider>
    )
    userEvent.setup()
    const btn = await screen.findByText("Get Temperature")

    expect(fetchMock).toBeCalledWith(expectedUrl, expectedHeaders)
    expect(fetchMock).toHaveBeenCalledTimes(1)
    expect(screen.findByText("Current temperature is 10 ºC"))

    await userEvent.click(btn)

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2))
  })
})
