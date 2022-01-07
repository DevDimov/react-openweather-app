import { useState, useEffect } from "react"
import CityDetail from "./CityDetail"
import chevron from "../images/chevron-right-solid.svg"
import IconButton from "./IconButton"

const CityDetails = ({ display, setShowDetails, headerData }) => {

    const [data, setData] = useState({})
    const [localTime, setLocalTime] = useState('')

    useEffect(() => {
        setData(
            {
                country: headerData.country,
                timezone: headerData.timezone,
                sunrise: getTime(headerData.sunrise),
                sunset: getTime(headerData.sunset),
            }
        )
    }, [headerData])

    useEffect(() => {
        if (display) {
            setLocalTime(getLocalTime(data.timezone))
        }
    }, [display])

    const getLocalTime = (timezone) => {
        let date = new Date()
        date.setHours(date.getHours() + timezone)
        return date.toTimeString().slice(0, 5)
    }

    const getTime = (unix) => {
        let date = new Date(unix * 1000)
        return date.toTimeString().slice(0, 5)
    }

    return (
        <div className={display ? "header-details" : "header-details scaled-down"}>
            <CityDetail title="Country" value={data.country} />
            <CityDetail title="Local time" value={localTime} />
            <CityDetail title="Sunrise" value={data.sunrise} />
            <CityDetail title="Sunset" value={data.sunset} />
            <div className="chevron-down-container">
                <IconButton
                    buttonClass="chevron-down-button"
                    onClick={() => setShowDetails(false)}
                    iconClass="chevron-down"
                    iconPath={chevron}
                    altText="chevron"
                />
            </div>
        </div>
    )
}

export default CityDetails