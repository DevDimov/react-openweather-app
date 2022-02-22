import styles from './LocationControls.module.css'

const LocationControls = ({ tempUnit, view, changeTempUnit, changeView, locationID, removeLocation }) => {

    return (
        <div className={styles.locationControls}>

            <button
                name="temp-switch"
                className={styles.button}
                onClick={() => changeTempUnit()}
            >
                <img
                    className={tempUnit === 'F' ? styles.tempUnitF : styles.tempUnitC}
                    alt=""
                />
            </button>

            <button
                name="change-view"
                className={styles.button}
                onClick={() => changeView()}
            >
                <img
                    className={view === 'compact' ? styles.compressButton : styles.expandButton}
                    alt="" />
            </button>

            <button
                name="remove-location"
                className={styles.button}
                onClick={() => removeLocation(locationID)}
            >
                <img
                    className={styles.removeButton}
                    alt="" />
            </button>
        </div>
    )
}

export default LocationControls