import { useEffect, useState, useRef } from 'react'
import { SelectMenu } from './SelectMenu'
import styles from './SettingsMenu.module.css'

const SettingsMenu = ({ lang, setShowSettings, settings, setSettings }) => {

    const [updateDisabled, setUpdateDisabled] = useState(true)

    useEffect(() => {
        setUpdateDisabled(true)
    }, [settings])

    const langRef = useRef()
    const tempUnitRef = useRef()
    const viewRef = useRef()
    const windSpeedRef = useRef()

    const handleOnClick = () => {
        let newSettings = {
            lang: langRef.current.value,
            tempUnit: tempUnitRef.current.value,
            view: viewRef.current.value,
            windSpeed: windSpeedRef.current.value
        }
        setSettings({
            ...settings,
            // useGlobal: true, 
            global: newSettings
        })
        setShowSettings(false)
        // console.log(newSettings)
    }

    return (
        <div className={styles.cover}>
            <div className={styles.container}>

                <div className={styles.header}>
                    <h3>{lang.settings}</h3>
                    <button
                        className={styles.closeButton}
                        onClick={() => setShowSettings(false)}
                    >
                        <img className={styles.removeButton} alt="" />
                    </button>
                </div>

                <div className={styles.content}>

                    <SelectMenu
                        label={lang.language}
                        selected={settings.global.lang}
                        options={[
                            { value: 'bg', text: lang.lang.bg },
                            { value: 'de', text: lang.lang.de },
                            { value: 'en', text: lang.lang.en },
                        ]}
                        forwardRef={langRef}
                        setUpdateDisabled={setUpdateDisabled}
                    />

                    <SelectMenu
                        label={lang.temperature}
                        selected={settings.global.tempUnit}
                        options={[
                            { value: 'C', text: lang.celsius },
                            { value: 'F', text: lang.fahrenheit },
                            { value: 'mixed', text: lang.mixed }
                        ]}
                        forwardRef={tempUnitRef}
                        setUpdateDisabled={setUpdateDisabled}
                    />

                    <SelectMenu
                        label={lang.view}
                        selected={settings.global.view}
                        options={[
                            { value: 'compact', text: lang.compact },
                            { value: 'detailed', text: lang.detailed },
                            { value: 'mixed', text: lang.mixed }
                        ]}
                        forwardRef={viewRef}
                        setUpdateDisabled={setUpdateDisabled}
                    />

                    <SelectMenu
                        label={lang.windSpeed}
                        selected={settings.global.windSpeed}
                        options={[
                            { value: 'kmh', text: lang.kmh },
                            { value: 'mph', text: lang.mph },
                            { value: 'ms', text: lang.ms },
                        ]}
                        forwardRef={windSpeedRef}
                        setUpdateDisabled={setUpdateDisabled}
                    />

                    <button
                        disabled={updateDisabled}
                        className={styles.updateButton}
                        onClick={() => handleOnClick()}
                    >
                        {lang.update}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SettingsMenu