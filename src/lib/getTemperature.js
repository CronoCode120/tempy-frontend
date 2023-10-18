export function getTemperature({
  setTemperature,
  setCurrentTemperature,
  temperatureService,
  ip = "1.178.255.255",
}) {
  return temperatureService.getTemperature(ip).then(temperature => {
    setCurrentTemperature(temperature)
    setTemperature(temperature.toString())
  })
}
