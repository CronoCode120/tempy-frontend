import { describe, it, expect, vi, beforeEach } from "vitest"
import { getCountries } from "./getCountries.ts"

const mockSetCountries = vi.fn()
const mockService = { getCountries: vi.fn() }

describe("getTemperature", () => {
    beforeEach(() => vi.resetAllMocks() as any)

    it("calls service and updates state accordingly", async () => {
        vi.mocked(mockService.getCountries).mockResolvedValueOnce('::countryList::')
        await getCountries({
            setCountries: mockSetCountries,
            countriesService: mockService,
        })

        expect(mockService.getCountries).toHaveBeenCalled()
        expect(mockSetCountries).toBeCalled()
    })
})
