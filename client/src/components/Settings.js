import { useState } from "react"
import SettingsButton from "./SettingsButton"
import SettingsMenu from "./SettingsMenu"

const Settings = ({settings}) => {

    const [showSettings, setShowSettings] = useState(false)

    return (
        <div>
            <SettingsButton
                showSettings={setShowSettings}
            />
            {showSettings &&
                <SettingsMenu
                    showSettings={setShowSettings}
                    settings={settings}
                />}
        </div>
    )
}

export default Settings