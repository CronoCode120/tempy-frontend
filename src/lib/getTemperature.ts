import React, { SetStateAction } from "react"

export interface getTemperatureProps {
  temperatureService: any,
  setCurrentTemperature: React.Dispatch<SetStateAction<number | undefined>>,
  setTemperature?: React.Dispatch<SetStateAction<string>>,
  ip?: string
}

export type getTemperatureType = ({
  setTemperature,
  setCurrentTemperature,
  temperatureService,
  ip,
}: getTemperatureProps) => Promise<() => void>

export function getTemperature({
  setTemperature,
  setCurrentTemperature,
  temperatureService,
  ip
}: getTemperatureProps): Promise<() => void> {
  return temperatureService.getTemperature(ip).then((temperature: number) => {
    setCurrentTemperature(temperature)
    if (setTemperature) {
      setTemperature(temperature.toString())
    }
  })
    .catch((err: Error) => {
      console.error(err)
      setCurrentTemperature(undefined)
      if (setTemperature) setTemperature('')
    })
}
