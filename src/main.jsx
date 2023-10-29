import React from "react"
import ReactDOM from "react-dom/client"
import { App } from "./App.jsx"
import "./index.css"
import { TemperatureService } from "./services/TemperatureService.js"
import { CountriesService } from "./services/CountriesService.js"
import { DependenciesContext } from "./context/Dependencies.js"

const temperatureService = new TemperatureService()
const countriesService = new CountriesService()

const dependencies = { temperatureService, countriesService }

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <DependenciesContext.Provider value={dependencies}>
      <App />
    </DependenciesContext.Provider>
  </React.StrictMode>
)
