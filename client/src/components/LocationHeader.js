import { useState, useEffect } from 'react'
import CityDetails from "./CityDetails"
import TempUnitSwitch from "./TempUnitSwitch"

const LocationHeader = ({ headerData, tempUnit, setTempUnit }) => {

    const [showDetails, setShowDetails] = useState(false)

    useEffect(()=>{
        setShowDetails(false)
    }, [headerData])

    return (
        <div className="d-flex fd-column p-relative location-header">
            <div className="d-flex f-wrap location-info">
                <button id="city-data" onClick={() => setShowDetails(true)}>
                    <h3>{headerData.name}</h3>
                </button>
                <div className="d-flex">
                    <div className="d-flex f-wrap icon-info">
                        <img className="icon" src={headerData.icon} alt="icon" />
                        <h3 id="header-current-temp">{headerData.temp}°</h3>
                    </div>
                    <TempUnitSwitch
                        tempUnit={tempUnit}
                        setTempUnit={setTempUnit}
                    />
                </div>
            </div>
            <p>{headerData.weather}</p>
            <CityDetails 
                display={showDetails} 
                setShowDetails={setShowDetails} 
                headerData={headerData}
            />
        </div>
    )
}

export default LocationHeader