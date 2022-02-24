import { useState } from "react"
import SettingsButton from "./SettingsButton"
import SettingsMenu from "./SettingsMenu"

const Settings = ({ settings, setSettings }) => {

    const [showSettings, setShowSettings] = useState(false)

    return (
        showSettings ?
            <SettingsMenu
                showSettings={setShowSettings}
                setShowSettings={setShowSettings}
                settings={settings}
                setSettings={setSettings}
            /> :
            <SettingsButton
                showSettings={setShowSettings}
            />
    )
}

export default Settings