import styles from './SettingsButton.module.css'

const SettingsButton = ({ lang, showSettings, setShowSettings }) => {

    return (
        <button
            className={styles.button}
            onClick={() => setShowSettings(true)}
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