import { useEffect, useState, useRef } from 'react'
import { SelectMenu } from './SelectMenu'
import styles from './SettingsMenu.module.css'

const SettingsMenu = ({ lang, showSettings, setShowSettings, settings, setSettings }) => {

    const [globalSettings, setGlobalSettings] = useState({})

    const [updateDisabled, setUpdateDisabled] = useState(true)

    useEffect(() => {
        setGlobalSettings({
            lang: settings.global.lang,
            tempUnit: settings.global.tempUnit,
            view: settings.global.view,
            windSpeed: settings.global.windSpeed
        })
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
        setSettings({ ...settings, useGlobal: true, global: newSettings })
        setShowSettings(false)
        // console.log(newSettings)
    }

    return (
        <div className={styles.container}>

            <div className={styles.header}>
                <h3>{lang.settings.settings}</h3>
                <button
                    className={styles.closeButton}
                    onClick={() => showSettings(false)}
                >
                    <img className={styles.removeButton} alt="" />
                </button>
            </div>

            <div className={styles.content}>

                <SelectMenu
                    label={lang.settings.lang}
                    selected={globalSettings.lang}
                    options={[
                        { value: 'bg', text: lang.settings.options.lang.bg },
                        { value: 'de', text: lang.settings.options.lang.de },
                        { value: 'en', text: lang.settings.options.lang.en },
                    ]}
                    optionsText={{
                        'bg': lang.settings.options.lang.bg,
                        'de': lang.settings.options.lang.de,
                        'en': lang.settings.options.lang.en,
                    }}
                    forwardRef={langRef}
                    setUpdateDisabled={setUpdateDisabled}
                />

                <SelectMenu
                    label={lang.settings.temp}
                    selected={globalSettings.tempUnit}
                    options={[
                        { value: 'C', text: lang.settings.options.temp.C },
                        { value: 'F', text: lang.settings.options.temp.F },
                    ]}
                    optionsText={{
                        'C': lang.settings.options.temp.C,
                        'F': lang.settings.options.temp.F,
                        'mixed': lang.settings.options.temp.mixed
                    }}
                    forwardRef={tempUnitRef}
                    setUpdateDisabled={setUpdateDisabled}
                />

                <SelectMenu
                    label={lang.settings.view}
                    selected={globalSettings.view}
                    options={[
                        { value: 'compact', text: lang.settings.options.view.compact },
                        { value: 'detailed', text: lang.settings.options.view.detailed },
                    ]}
                    optionsText={{
                        'compact': lang.settings.options.view.compact,
                        'detailed': lang.settings.options.view.detailed,
                        'mixed': lang.settings.options.view.mixed
                    }}
                    forwardRef={viewRef}
                    setUpdateDisabled={setUpdateDisabled}
                />

                <SelectMenu
                    label={lang.settings.windSpeed}
                    selected={globalSettings.windSpeed}
                    options={[
                        { value: 'kmh', text: lang.settings.options.windSpeed.kmh },
                        { value: 'mph', text: lang.settings.options.windSpeed.mph },
                        { value: 'ms', text: lang.settings.options.windSpeed.ms },
                    ]}
                    optionsText={{
                        'kmh': lang.settings.options.windSpeed.kmh,
                        'mph': lang.settings.options.windSpeed.mph,
                        'ms': lang.settings.options.windSpeed.ms,
                    }}
                    forwardRef={windSpeedRef}
                    setUpdateDisabled={setUpdateDisabled}
                />

                <button
                    disabled={updateDisabled}
                    className={styles.updateButton}
                    onClick={() => handleOnClick()}
                >
                    {lang.settings.update}
                </button>
            </div>
        </div>
    )
}

export default SettingsMenu