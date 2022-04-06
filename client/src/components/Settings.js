import { useState } from "react"
import SettingsButton from "./SettingsButton"
import SettingsMenu from "./SettingsMenu"

const Settings = ({ lang, settings, setSettings }) => {

    const [showSettings, setShowSettings] = useState(false)

    return (
        <>
            <SettingsButton
                lang={lang}
                showSettings={showSettings}
                setShowSettings={setShowSettings}
            />
            {showSettings &&
                <SettingsMenu
                    lang={lang}
                    setShowSettings={setShowSettings}
                    settings={settings}
                    setSettings={setSettings}
                />
            }
        </>
    )
}

export default Settings