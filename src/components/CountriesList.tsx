import React from "react"
import { getTemperatureType } from "../lib/getTemperature"
import { CountryItemProps } from "./CountryItem"

export type CountryData = {
  name: string
  ip: string
}

interface CountriesListProps {
  countryArray: CountryData[]
  temperatureService: any
  getTemperature: getTemperatureType
  CountryItem: React.FC<CountryItemProps>
}

const CountriesList = ({
  countryArray,
  temperatureService,
  getTemperature,
  CountryItem,
}: CountriesListProps) => {
  return (
    <ul>
      {countryArray.length > 0 ? (
        countryArray.map(country => (
          <CountryItem
            key={country.name}
            country={country.name}
            countryIp={country.ip}
            temperatureService={temperatureService}
            getTemperature={getTemperature}
          />
        ))
      ) : (
        <p>No countries information available</p>
      )}
    </ul>
  )
}

export default CountriesList
