export function getTemperature({
  setTemperature,
  setCurrentTemperature,
  temperatureService,
  url,
}) {
  if (!url) return
  return temperatureService.getTemperature(url).then(temperature => {
    setCurrentTemperature(temperature)
    setTemperature(temperature.toString())
  })
}
