import { NoAvailableDataError } from "../errors/NoAvailableDataError"

interface ICountriesService {
    fetch: () => {}
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
            console.log('local')
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
