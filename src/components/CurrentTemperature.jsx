import { toEmoji, toLabel } from "../models/Temperature.js"
import PropTypes from "prop-types"

export const CurrentTemperature = ({ temperature }) => {
  const label = `Current weather is ${toLabel(temperature)}`

  return (
    <div className="current-temperature">
      <h1 aria-label={label}>{toEmoji(temperature)}</h1>
      <p>Current temperature is {temperature ?? "-"} ºC</p>
    </div>
  )
}

CurrentTemperature.propTypes = {
  temperature: PropTypes.number,
}
