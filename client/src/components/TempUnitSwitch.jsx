import './TempUnitSwitch.css'

const TempUnitSwitch = ({ tempUnit, changeTempUnit }) => {

    return (
        <div
            id="temp-units-switch"
            className="display-flex fd-column overflow-y-hidden"
            onClick={changeTempUnit}
        >
            <div
                className={tempUnit === 'F' ? "display-flex fd-column temp-units slideup" : "display-flex fd-column temp-units"}
            >
                <span>C</span>
                <span>F</span>
            </div>
        </div>
    )

}

export default TempUnitSwitch