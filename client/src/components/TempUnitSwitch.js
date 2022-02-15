const TempUnitSwitch = ({ tempUnit, changeTempUnit }) => {

    return (
        <div
            id="temp-units-switch"
            className="d-flex fd-column overflow-y-hidden"
            onClick={changeTempUnit}
        >
            <div
                className={tempUnit === 'F' ? "d-flex fd-column temp-units slideup" : "d-flex fd-column temp-units"}
            >
                <span>C</span>
                <span>F</span>
            </div>
        </div>
    )

}

export default TempUnitSwitch