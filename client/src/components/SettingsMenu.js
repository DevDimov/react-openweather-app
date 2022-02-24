import { useEffect, useState, useRef } from 'react'
import { SelectMenu } from './SelectMenu'
import styles from './SettingsMenu.module.css'

const SettingsMenu = ({ showSettings, setShowSettings, settings, setSettings }) => {

    const [globalSettings, setGlobalSettings] = useState({
        // tempUnit: settings.global.tempUnit || 'mixed',
        // view: settings.global.view || 'mixed',
        // windSpeed: settings.global.windSpeed || 'mixed'
    })

    const [updateDisabled, setUpdateDisabled] = useState(true)

    useEffect(() => {
        setGlobalSettings({
            tempUnit: settings.global.tempUnit,
            view: settings.global.view,
            windSpeed: settings.global.windSpeed
        })
        setUpdateDisabled(true)
    }, [settings])

    const tempUnitRef = useRef()
    const viewRef = useRef()
    const windSpeedRef = useRef()

    const handleOnClick = () => {
        let newSettings = {
            tempUnit: tempUnitRef.current.value,
            view: viewRef.current.value,
            windSpeed: windSpeedRef.current.value
        }
        setSettings({ ...settings, useGlobal: true, global: newSettings })
        setShowSettings(false)
        console.log(newSettings)
    }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <h3>Settings</h3>
                <button
                    className={styles.closeButton}
                    onClick={() => showSettings(false)}
                >
                    <img className={styles.removeButton} alt="" />
                </button>
            </div>

            <div className={styles.content}>

                <SelectMenu
                    label='Temperature'
                    selected={globalSettings.tempUnit}
                    options={[
                        { value: 'C', text: 'Celcius' },
                        { value: 'F', text: 'Fahrenheit' },
                    ]}
                    optionsText={{
                        'C': 'Celcius',
                        'F': 'Fahrenheit',
                        'mixed': 'Mixed'
                    }}
                    forwardRef={tempUnitRef}
                    setUpdateDisabled={setUpdateDisabled}
                />

                <SelectMenu
                    label='View'
                    selected={globalSettings.view}
                    options={[
                        { value: 'compact', text: 'Compact' },
                        { value: 'detailed', text: 'Detailed' },
                    ]}
                    optionsText={{
                        'compact': 'Compact',
                        'detailed': 'Detailed',
                        'mixed': 'Mixed'
                    }}
                    forwardRef={viewRef}
                    setUpdateDisabled={setUpdateDisabled}
                />

                <SelectMenu
                    label='Wind speed'
                    selected={globalSettings.windSpeed}
                    options={[
                        { value: 'kmh', text: 'Kilometers / hour' },
                        { value: 'mph', text: 'Miles / hour' },
                        { value: 'ms', text: 'Meters / second' },
                    ]}
                    optionsText={{
                        'kmh': 'Kilometers / hour',
                        'mph': 'Miles / hour',
                        'ms': 'Meters / second',
                        'mixed': 'Mixed'
                    }}
                    forwardRef={windSpeedRef}
                    setUpdateDisabled={setUpdateDisabled}
                />

                <button
                    disabled={updateDisabled}
                    className={styles.updateButton}
                    onClick={() => handleOnClick()}
                >
                    Update
                </button>
            </div>
        </div>
    )
}

export default SettingsMenu