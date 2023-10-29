import { useContext } from "react"
import { DependenciesContext } from "../context/Dependencies.js"

/**
 * @returns {{temperatureService: TemperatureService, countriesService: CountriesService}}
 */

export function useDependencies() {
  const dependencies = useContext(DependenciesContext)

  if (!dependencies) {
    throw new Error(
      "DependenciesContext is not provided. Make sure you have a DependenciesProvider at the top of your component tree."
    )
  }

  return dependencies
}
