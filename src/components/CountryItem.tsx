import React, { useEffect, useState } from "react"
import { getTemperatureProps } from "../lib/getTemperature.ts"

interface CountryItemProps {
  getTemperature: ({
    setTemperature,
    setCurrentTemperature,
    temperatureService,
    ip,
  }: getTemperatureProps) => any
  temperatureService: any
  countryIp: string
  country: string
}

const CountryItem = ({
  getTemperature,
  temperatureService,
  countryIp,
  country,
}: CountryItemProps) => {
  const [currentTemperature, setCurrentTemperature] = useState<number>()

  console.log(setCurrentTemperature)
  const callGetTemperature = async () =>
    await getTemperature({
      setCurrentTemperature,
      temperatureService,
      ip: countryIp,
    })

  useEffect(() => {
    callGetTemperature()
  }, [])

  return (
    <li>
      {country} --{">"} {currentTemperature ?? "-"} ºC
    </li>
  )
}

export default CountryItem
