import { useEffect, useState } from 'react'
import { SelectMenu } from './SelectMenu'
import styles from './SettingsMenu.module.css'

const SettingsMenu = ({ showSettings, settings }) => {

    const [globalSettings, setGlobalSettings] = useState({
        tempUnit: settings.tempUnit || 'mixed',
        view: settings.view || 'mixed',
        windSpeed: settings.windSpeed || 'mixed'
    })
    const [updateDisabled, setUpdateDisabled] = useState(true)

    // useEffect(()=>{
    //     let newSettings = {}
    //     if (!settings.global) {
    //         newSettings = {

    //         }
    //     }
    // }, [settings])

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
                />

                <SelectMenu
                    label='Wind speed'
                    selected={globalSettings.windSpeed}
                    options={[
                        { value: 'kmh', text: 'Kilometers / hour' },
                        { value: 'mph', text: 'Miles / hour' },
                    ]}
                    optionsText={{
                        'kmh': 'Kilometers / hour',
                        'mph': 'Miles / hour',
                        'mixed': 'Mixed'
                    }}
                />

                <button
                    disabled={updateDisabled}
                    className={styles.updateButton}
                // onClick={() => onClick}
                >
                    Update
                </button>
            </div>
        </div>
    )
}

export default SettingsMenu