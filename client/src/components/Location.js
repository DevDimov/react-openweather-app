import { useState, useEffect } from 'react'
import LocationControls from './LocationControls';
import LocationHeader from './LocationHeader'
import HeaderDetails from './HeaderDetails'
import LocationForecast from './LocationForecast'
import LocationForecastCompact from './LocationForecastCompact';

import styles from './Location.module.css'

const Location = ({ location, data, tempUnit, removeLocation }) => {

    const [state, setState] = useState({
        globalTempUnit: tempUnit,
        localTempUnit: 'C',
        view: 'detailed',
    })

    useEffect(() => {
        setState({ ...state, localTempUnit: tempUnit })
    }, [tempUnit])

    const changeTempUnit = () => {
        if (state.localTempUnit === 'C') {
            setState({ ...state, localTempUnit: 'F' })
        }

        if (state.localTempUnit === 'F') {
            setState({ ...state, localTempUnit: 'C' })
        }
    }

    const changeView = () => {
        if (state.view === 'detailed') {
            setState({ ...state, view: 'compact' })
        }

        if (state.view === 'compact') {
            setState({ ...state, view: 'detailed' })
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.location}>
                <LocationControls
                    locationState={state}
                    changeTempUnit={changeTempUnit}
                    changeView={changeView}
                    location={location}
                    removeLocation={removeLocation}
                />
                <LocationHeader
                    changeTempUnit={changeTempUnit}
                    icon={data.headerData.icon}
                    name={data.headerData.name}
                    temp={data.headerData.temp}
                    tempUnit={state.localTempUnit}
                    weather={data.headerData.weather}
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