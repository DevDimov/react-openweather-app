import styles from './SettingsButton.module.css'

const SettingsButton = ({showSettings}) => {
    
    return (
        <button 
            className={styles.button} 
            onClick={() => showSettings(true)}
            >
            <span>Settings</span>
            <img
                className={styles.icon}
                alt=""
            />
            
        </button>
    )
}

export default SettingsButton