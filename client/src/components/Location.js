import { useState, useEffect } from 'react'
import LocationControls from './LocationControls';
import LocationHeader from './LocationHeader'
import HeaderDetails from './HeaderDetails'
import LocationForecast from './LocationForecast'
import LocationForecastCompact from './LocationForecastCompact';
import { getHeaderData, getHourData, getDayData, getAllData } from '../js/utils'

import styles from './Location.module.css'

const Location = ({ data, globalSettings, location, removeLocation }) => {

    const [state, setState] = useState(getAllData(data))

    useEffect(() => {
        if (globalSettings) {
            setState({
                ...state,
                localTempUnit: globalSettings.tempUnit,
                localView: globalSettings.view,
            })
        } else {
            setState({
                ...state,
                localTempUnit: 'C',
                localView: 'detailed',
            })
        }
    }, [globalSettings])

    const changeTempUnit = () => {
        let newUnit = ''
        if (state.localTempUnit === 'C') {
            newUnit = 'F'
        }
        if (state.localTempUnit === 'F') {
            newUnit = 'C'
        }
        setState({ ...state, localTempUnit: newUnit })
    }

    const changeView = () => {
        let newView = ''
        if (state.localView === 'detailed') {
            newView = 'compact'
        }

        if (state.localView === 'compact') {
            newView = 'detailed'
        }
        setState({ ...state, localView: newView })
    }

    return (
        <div className={styles.container}>
            <div className={styles.location}>
                <LocationControls
                    localTempUnit={state.localTempUnit}
                    localView={state.localView}
                    changeTempUnit={changeTempUnit}
                    changeView={changeView}
                    location={location}
                    removeLocation={removeLocation}
                />
                <LocationHeader
                    changeTempUnit={changeTempUnit}
                    headerData={state.headerData}
                    icon={state.headerData.icon}
                    name={state.headerData.name}
                    temp={state.headerData.temp}
                    tempUnit={state.localTempUnit}
                    weather={state.headerData.weather}
                />
                {state.localView === 'detailed' &&
                    <HeaderDetails
                        sunrise={state.headerData.sunrise}
                        sunset={state.headerData.sunset}
                    />}
                {state.localView === 'detailed' && <LocationForecast
                    hourData={state.hourData}
                    dayData={state.dayData}
                    locationName={location}
                    tempUnit={state.localTempUnit}
                />}
                {state.localView === 'compact' && <LocationForecastCompact
                    hourData={state.hourData}
                    tempUnit={state.localTempUnit}
                />}
            </div>
        </div>
    )
}

export default Location