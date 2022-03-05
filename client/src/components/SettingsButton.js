import styles from './SettingsButton.module.css'

const SettingsButton = ({lang, showSettings}) => {
    
    return (
        <button 
            className={styles.button} 
            onClick={() => showSettings(true)}
            >
            <span>{lang.settings}</span>
            <img
                className={styles.icon}
                alt=""
            />
            
        </button>
    )
}

export default SettingsButton