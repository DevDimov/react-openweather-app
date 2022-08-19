import styles from './LocationControls.module.css'

const LocationControls = ({ tempUnit, view, changeTempUnit, changeView, locationID, removeLocation }) => {

    const handleTempUnitChange = () => {
        changeTempUnit()
    }

    const handleViewChange = () => {
        changeView()
    }

    const handleRemoveLocation = () => {
        removeLocation(locationID)
    }

    return (
        <div className={styles.locationControls}>

            <button
                name="temp-switch"
                className={styles.button}
                onClick={handleTempUnitChange}
            >
                <img
                    className={tempUnit === 'F' ? styles.tempUnitF : styles.tempUnitC}
                    alt=""
                />
            </button>

            <button
                name="change-view"
                className={styles.button}
                onClick={handleViewChange}
            >
                <img
                    className={view === 'compact' ? styles.compressButton : styles.expandButton}
                    alt="" />
            </button>

            <button
                name="remove-location"
                className={styles.button}
                onClick={handleRemoveLocation}
            >
                <img
                    className={styles.removeButton}
                    alt="" />
            </button>
        </div>
    )
}

export default LocationControls