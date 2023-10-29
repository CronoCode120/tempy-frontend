import { useEffect, useState } from "react"
import "./App.css"
import { TemperatureUnit, toSymbol } from "./models/TemperatureUnit.js"
import { SelectUnit } from "./components/SelectUnit.jsx"
import { TemperatureInput } from "./components/TemperatureInput.jsx"
import { convert } from "./models/Temperature.js"
import { CurrentTemperature } from "./components/CurrentTemperature.jsx"
import CountriesList from "./components/CountriesList.tsx"
import { useDependencies } from "./hooks/useDependencies.js"
import { getTemperature } from "./lib/getTemperature.ts"
import { getCountries } from "./lib/getCountries.ts"
import CountryItem from "./components/CountryItem.tsx"

export const App = () => {
  const [currentTemperature, setCurrentTemperature] = useState()
  const [temperature, setTemperature] = useState("")
  const [fromUnit, setFromUnit] = useState(TemperatureUnit.CELSIUS)
  const [toUnit, setToUnit] = useState(TemperatureUnit.CELSIUS)

  const [countries, setCountries] = useState([])
  const { temperatureService, countriesService } = useDependencies()

  const result = convert(parseFloat(temperature), fromUnit, toUnit)

  const callGetTemperature = async () =>
    await getTemperature({
      setTemperature,
      setCurrentTemperature,
      temperatureService,
    })

  const callGetCountries = async () =>
    await getCountries({
      setCountries,
      countriesService,
    })

  useEffect(() => {
    callGetTemperature()
    callGetCountries()
  }, [])

  return (
    <main>
      <CurrentTemperature temperature={currentTemperature} />
      <form className="temperature-form">
        <SelectUnit
          id="temperature-from"
          label="From"
          value={fromUnit}
          onChange={setFromUnit}
        />
        <SelectUnit
          id="temperature-to"
          label="To"
          value={toUnit}
          onChange={setToUnit}
        />
        <TemperatureInput
          value={temperature}
          onChange={temperature => setTemperature(temperature)}
          unit={fromUnit}
        />
        <button type="button" onClick={callGetTemperature}>
          Get Temperature
        </button>
        <p className="result">
          <span>Conversion result: </span>
          <span>
            {isNaN(result) ? "-" : Math.round(result * 10) / 10}{" "}
            {toSymbol(toUnit)}
          </span>
        </p>
      </form>
      <CountriesList
        CountryItem={CountryItem}
        countryArray={countries}
        getTemperature={getTemperature}
        temperatureService={temperatureService}
      />
    </main>
  )
}
