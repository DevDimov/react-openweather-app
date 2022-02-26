import { useState, useEffect } from "react"
import CityDetail from "./CityDetail"
import chevron from "../images/chevron-right-solid.svg"
import IconButton from "../IconButton"
import type { HeaderData } from "../../typescript/ApiTypes"

type CityDetailsProps = {
    display: boolean, 
    setShowDetails: (a: boolean) => void,
    headerData: HeaderData
}

type CityDetailsData = {
    country: string,
    timezone: number,
    sunrise: string,
    sunset: string,
}

const CityDetails = ({ display, setShowDetails, headerData }: CityDetailsProps) => {

    const getTime = (unix: number) => {
        let date = new Date(unix * 1000)
        return date.toTimeString().slice(0, 5)
    }

    const [data] = useState<CityDetailsData>(
        {
            country: headerData.country,
            timezone: headerData.timezone,
            sunrise: getTime(headerData.sunrise),
            sunset: getTime(headerData.sunset),
        }
    )
    const [localTime, setLocalTime] = useState<string>('')

    useEffect(() => {
        if (display) {
            setLocalTime(getLocalTime(data.timezone))
        }
    }, [display])

    const getLocalTime = (timezone: number) => {
        let date = new Date()
        date.setHours(date.getHours() + timezone)
        return date.toTimeString().slice(0, 5)
    }

    return (
        <div className={display ? "header-details-container" : "header-details-container scaled-down"}>
            <div className="header-details">
                <CityDetail title="Country" value={data.country} />
                <CityDetail title="Local time" value={localTime} />
                <CityDetail title="Sunrise" value={data.sunrise} />
                <CityDetail title="Sunset" value={data.sunset} />
            </div>
            <IconButton
                buttonClass="chevron-down-button"
                onClick={() => setShowDetails(false)}
                iconClass="chevron-down"
                iconPath={chevron}
                altText="chevron"
            />
        </div>
    )
}

export default CityDetails