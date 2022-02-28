import { useState, useEffect } from 'react'
import LocationControls from './LocationControls';
import LocationHeader from './LocationHeader'
import HeaderDetails from './HeaderDetails'
import LocationForecast from './LocationForecast'
import LocationForecastCompact from './LocationForecastCompact';

import styles from './Location.module.css'

const Location = ({ data, settings, setSettings, id, removeLocation }) => {

    const [state, setState] = useState({})

    useEffect(() => {
        if (settings.useGlobal) {
            setState(settings.global)
        }
        if (!settings.useGlobal) {
            let newLocalSettings = {}
            for (const property in settings.global) {
                const propertyValue = settings.global[property]
                if (propertyValue !== 'mixed') {
                    newLocalSettings[property] = propertyValue
                }
                else {
                    if (settings.local[id]) {
                        newLocalSettings[property] = settings.local[id][property]
                    }
                    else {
                        newLocalSettings[property] = settings.default[property]
                    }
                }
            }
            setState(
                newLocalSettings
            )
        }

    }, [settings, id])

    const changeTempUnit = () => {
        let newUnit = ''
        if (state.tempUnit === 'C') {
            newUnit = 'F'
        }
        if (state.tempUnit === 'F') {
            newUnit = 'C'
        }
        let obj = { ...state, tempUnit: newUnit }
        let newSettings = {
            ...settings,
            useGlobal: false,
            global: { ...settings.global, tempUnit: 'mixed' },
            local: { ...settings.local, [id]: obj }
        }
        setSettings(newSettings)
    }

    const changeView = () => {
        let newView = ''
        if (state.view === 'detailed') {
            newView = 'compact'
        }

        if (state.view === 'compact') {
            newView = 'detailed'
        }
        let obj = { ...state, view: newView }
        let newSettings = {
            ...settings,
            useGlobal: false,
            global: { ...settings.global, view: 'mixed' },
            local: { ...settings.local, [id]: obj }
        }
        setSettings(newSettings)
    }

    return (
        <div className={styles.container}>
            <div className={styles.location}>
                <LocationControls
                    tempUnit={state.tempUnit}
                    view={state.view}
                    changeTempUnit={changeTempUnit}
                    changeView={changeView}
                    locationID={id}
                    removeLocation={removeLocation}
                />
                <LocationHeader
                    headerData={data.headerData}
                    icon={data.headerData.icon}
                    name={data.headerData.name}
                    country={data.headerData.country}
                    temp={data.headerData.temp}
                    weather={data.headerData.weather}
                    tempUnit={state.tempUnit}
                    changeTempUnit={changeTempUnit}
                />
                {state.view === 'detailed' &&
                    <HeaderDetails
                        sunrise={data.headerData.sunrise}
                        sunset={data.headerData.sunset}
                    />}
                {state.view === 'detailed' && <LocationForecast
                    hourData={data.hourData}
                    dayData={data.dayData}
                    locationName={data.headerData.name}
                    tempUnit={state.tempUnit}
                    windSpeedUnit={state.windSpeed}
                />}
                {state.view === 'compact' && <LocationForecastCompact
                    hourData={data.hourData}
                    tempUnit={state.tempUnit}
                />}
            </div>
        </div>
    )
}

export default Location