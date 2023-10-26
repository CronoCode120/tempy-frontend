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
    const countryList = await countriesService.getCountries()
    setCountries(countryList)
}