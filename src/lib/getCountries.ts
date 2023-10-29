import React, { SetStateAction } from "react"
import { CountryData } from "../components/CountriesList"

interface getCountriesProps {
    setCountries: React.Dispatch<SetStateAction<CountryData[]>>
    countriesService: any
}

export async function getCountries({
    setCountries,
    countriesService
}: getCountriesProps) {
    try {
        const countryList = await countriesService.getCountries()
        setCountries(countryList)
    } catch (error) {
        setCountries([])
        console.error(error);
    }
}