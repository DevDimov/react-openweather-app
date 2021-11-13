const LocationHeader = ({ headerData, tempUnit, setTempUnit }) => {

    const switchUnits = () => {
        const unitSwitch = document.getElementsByClassName('temp-units')
        for (let item of unitSwitch) {
            item.classList.toggle('slideup')
        }   
        setTimeout(() => {
            if (tempUnit === 'C') {
                setTempUnit('F')
            }
            else {
                setTempUnit('C')
            }
        }, 1000)
    }

    return (
        <div className="d-flex fd-column p-relative location-header">
            <div className="d-flex f-wrap location-info">
                <h3>{headerData.name}</h3>
                <div className="d-flex">
                    <div className="d-flex f-wrap icon-info">
                        <img className="icon" src={headerData.icon} alt="icon" />
                        <h3 id="header-current-temp">{headerData.temp}°</h3>
                    </div>
                    <div id="temp-units-switch" className="d-flex fd-column overflow-y-hidden" onClick={switchUnits}>
                        <div className={tempUnit === 'F' ? "d-flex fd-column temp-units slideup" : "d-flex fd-column temp-units"}>
                            <span>C</span>
                            <span>F</span>
                        </div>
                    </div>
                </div>
            </div>
            <p>{headerData.weather}</p>
        </div>
    )
}

export default LocationHeader