import { NoAvailableDataError } from "../errors/NoAvailableDataError.ts"

interface ICountriesService {
    fetch: () => {}
    getCountries: () => Promise<any>
}

export class CountriesService implements ICountriesService {
    baseUrl = "http://localhost:3000"
    environment = process.env.APP_ENV

    // @ts-ignore
    constructor(public fetch = (...args: any[]) => globalThis.fetch(...args)) {
        this.fetch = fetch
    }

    async getCountries() {
        let response

        if (this.environment === "local") {
            response = await this.fetch(`${this.baseUrl}/countries`)
        }

        if (this.environment !== "local") {
            response = await this.fetch("/countries")
        }

        if (!response?.ok) {
            throw new NoAvailableDataError('list of countries')
        }

        const data = await response.json()

        return data.countryList
    }
}
