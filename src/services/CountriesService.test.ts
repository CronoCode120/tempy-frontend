import { describe, it, expect, vi, beforeEach, beforeAll } from "vitest"
import { CountriesService } from "./CountriesService.ts"
import { setProdEnv } from '../setEnv/setProdEnv.js'

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

describe("CountriesService", () => {
    describe('production env', () => {
        beforeAll(() => setProdEnv())
        it("fetches the list of countries", async () => {
            const fetchMock2 = vi.fn(async () => ({
                json: async () => ({ countryList }),
                ok: true,
            }))
            console.log('test', process.env.APP_ENV)

            const countriesService = new CountriesService(fetchMock2 as any)

            const countries = await countriesService.getCountries()

            expect(countries).toEqual(countryList)
            expect(fetchMock2).toHaveBeenCalledWith(
                "/countries"
            )
        })
    })
})
