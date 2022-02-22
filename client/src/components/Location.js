import { useState, useEffect } from 'react'
import LocationControls from './LocationControls';
import LocationHeader from './LocationHeader'
import HeaderDetails from './HeaderDetails'
import LocationForecast from './LocationForecast'
import LocationForecastCompact from './LocationForecastCompact';

import styles from './Location.module.css'

const Location = ({ data, settings, setSettings, id, removeLocation }) => {

    const [state, setState] = useState({
        localTempUnit: '',
        localView: '',
    })

    useEffect(() => {
        if (settings.useGlobal) {
            setState({
                localTempUnit: settings.global.tempUnit,
                localView: settings.global.view,
            })
        }
        else if (settings.local[id]) {
            setState({
                localTempUnit: settings.local[id].tempUnit,
                localView: settings.local[id].view,
            })
        }
        else {
            setState({
                localTempUnit: settings.default.tempUnit,
                localView: settings.default.view,
            })
        }

    }, [settings])

    const changeTempUnit = () => {
        let newUnit = ''
        if (state.localTempUnit === 'C') {
            newUnit = 'F'
        }
        if (state.localTempUnit === 'F') {
            newUnit = 'C'
        }
        let obj = { tempUnit: newUnit, view: state.localView }
        let newSettings = {
            useGlobal: false,
            local: { ...settings.local, [id]: obj }
        }
        setSettings(newSettings)
    }

    const changeView = () => {
        let newView = ''
        if (state.localView === 'detailed') {
            newView = 'compact'
        }

        if (state.localView === 'compact') {
            newView = 'detailed'
        }
        let obj = { tempUnit: state.localTempUnit, view: newView }
        let newSettings = {
            useGlobal: false,
            local: { ...settings.local, [id]: obj }
        }
        setSettings(newSettings)
    }

    return (
        <div className={styles.container}>
            <div className={styles.location}>
                <LocationControls
                    tempUnit={state.localTempUnit}
                    view={state.localView}
                    changeTempUnit={changeTempUnit}
                    changeView={changeView}
                    locationID={id}
                    removeLocation={removeLocation}
                />
                <LocationHeader
                    changeTempUnit={changeTempUnit}
                    headerData={data.headerData}
                    icon={data.headerData.icon}
                    name={data.headerData.name}
                    temp={data.headerData.temp}
                    tempUnit={state.localTempUnit}
                    weather={data.headerData.weather}
                />
                {state.localView === 'detailed' &&
                    <HeaderDetails
                        sunrise={data.headerData.sunrise}
                        sunset={data.headerData.sunset}
                    />}
                {state.localView === 'detailed' && <LocationForecast
                    hourData={data.hourData}
                    dayData={data.dayData}
                    locationName={data.headerData.name}
                    tempUnit={state.localTempUnit}
                />}
                {state.localView === 'compact' && <LocationForecastCompact
                    hourData={data.hourData}
                    tempUnit={state.localTempUnit}
                />}
            </div>
        </div>
    )
}

export default Location