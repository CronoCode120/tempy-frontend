import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest"
import { CountriesService } from "./CountriesService.ts"
import { setLocalEnv } from '../setEnv/setLocalEnv.js'

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

describe('CountriesService - local env', () => {
    beforeAll(() => setLocalEnv())
    it("fetches the list of countries", async () => {
        const fetchMock = vi.fn(async () => ({
            json: async () => ({ countryList }),
            ok: true,
        }))

        const countriesService = new CountriesService(fetchMock as any)

        const countries = await countriesService.getCountries()

        expect(countries).toEqual(countryList)
        expect(fetchMock).toHaveBeenCalledWith(
            "http://localhost:3000/countries"
        )
    })
})
