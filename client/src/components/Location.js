import { useState, useEffect } from 'react'
import LocationControls from './LocationControls';
import LocationHeader from './LocationHeader'
import HeaderDetails from './HeaderDetails'
import LocationForecast from './LocationForecast'
import LocationForecastCompact from './LocationForecastCompact';

import styles from './Location.module.css'

const Location = ({ location, data, tempUnit, removeLocation, setTempUnit }) => {

    const [state, setState] = useState({
        globalTempUnit: tempUnit,
        localTempUnit: 'C',
        view: 'detailed',
    })

    useEffect(() => {
        setState({...state, localTempUnit: tempUnit})
    }, [tempUnit])

    return (
        <div className="d-flex-center fd-column p-relative width-100pct">
            <div className={styles.location}>
                <LocationControls
                    locationState={state}
                    setLocationState={setState}
                    location={location}
                    removeLocation={removeLocation}
                />
                <LocationHeader
                    headerData={data.headerData}
                    tempUnit={tempUnit}
                    setTempUnit={setTempUnit}
                />
                {state.view === 'detailed' &&
                    <HeaderDetails
                        sunrise={data.headerData.sunrise}
                        sunset={data.headerData.sunset}
                    />}
                {state.view === 'detailed' && <LocationForecast
                    hourData={data.hourData}
                    dayData={data.dayData}
                    locationName={location}
                    tempUnit={state.localTempUnit}
                />}
                {state.view === 'compact' && <LocationForecastCompact
                    hourData={data.hourData}
                    tempUnit={state.localTempUnit}
                />}
            </div>
        </div>
    )
}

export default Location