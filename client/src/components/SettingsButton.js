import styles from './SettingsButton.module.css'

const SettingsButton = ({ lang, showSettings, setShowSettings }) => {

    const handleClick = () => {
        setShowSettings(true)
    }

    return (
        <button
            className={styles.button}
            onClick={handleClick}
        >
            <span>{lang.settings}</span>
            <img
                className={showSettings ? `${styles.icon} ${styles.active}` : styles.icon}
                alt=""
            />

        </button>
    )
}

export default SettingsButton