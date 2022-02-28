import { useState } from "react"
import SettingsButton from "./SettingsButton"
import SettingsMenu from "./SettingsMenu"

const Settings = ({ lang, settings, setSettings }) => {

    const [showSettings, setShowSettings] = useState(false)

    return (
        showSettings ?
            <SettingsMenu
                lang={lang}
                showSettings={setShowSettings}
                setShowSettings={setShowSettings}
                settings={settings}
                setSettings={setSettings}
            /> :
            <SettingsButton
                lang={lang}
                showSettings={setShowSettings}
            />
    )
}

export default Settings