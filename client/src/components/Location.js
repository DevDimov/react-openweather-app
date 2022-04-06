import { useState, useEffect } from 'react'
import LocationControls from './LocationControls';
import LocationHeader from './LocationHeader'
import HeaderDetails from './HeaderDetails'
import LocationForecast from './LocationForecast'
import LocationForecastCompact from './LocationForecastCompact';

import styles from './Location.module.css'

const Location = ({ lang, data, settings, setSettings, id, removeLocation }) => {

    const [state, setState] = useState({})

    useEffect(() => {
        let newState = {}
        for (const property in settings.global) {
            const propertyValue = settings.global[property]
            if (propertyValue !== 'mixed') {
                newState[property] = propertyValue
            }
            else {
                if (settings.local[id]) {
                    newState[property] = settings.local[id][property]
                }
                else {
                    newState[property] = settings.default[property]
                }
            }
        }
        setState(newState)
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
            // useGlobal: false,
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
            // useGlobal: false,
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
                    lang={lang}
                    icon={data.headerData.icon}
                    name={data.headerData.name}
                    country={data.headerData.country}
                    temp={data.headerData.temp}
                    weather={data.headerData.weather.description}
                    tempUnit={state.tempUnit}
                    changeTempUnit={changeTempUnit}
                />
                {state.view === 'detailed' &&
                    <HeaderDetails
                        lang={lang}
                        sunrise={data.headerData.sunrise}
                        sunset={data.headerData.sunset}
                        UTCshift={data.headerData.timezone}
                    />}
                {state.view === 'detailed' &&
                    <LocationForecast
                        lang={lang}
                        hourData={data.hourData}
                        dayData={data.dayData}
                        locationName={data.headerData.name}
                        tempUnit={state.tempUnit}
                        windSpeedUnit={state.windSpeed}
                    />}
                {state.view === 'compact' &&
                    <LocationForecastCompact
                        hourData={data.hourData}
                        tempUnit={state.tempUnit}
                    />}
            </div>
        </div>
    )
}

export default Location