import type { HeaderData } from "./ApiTypes"

export type CityDetailProps = {
    title: string,
    value: string
}

export type CityDetailsProps = {
    display: boolean, 
    setShowDetails: (a: boolean) => void,
    headerData: HeaderData
}

export type CityDetailsData = {
    country: string,
    timezone: number,
    sunrise: string,
    sunset: string,
}