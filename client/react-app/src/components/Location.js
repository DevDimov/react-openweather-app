import LocationHeader from './LocationHeader'
import LocationForecast from './LocationForecast'
import RemoveButton from "./RemoveButton";

const Location = ({ location, data, tempUnit, removeLocation, setTempUnit }) => {

    return (
        <div className="d-flex-center fd-column p-relative width-100pct">
            <RemoveButton
                removeLocation={() => removeLocation(location)}
            />
            <div className="location">
                <LocationHeader
                    headerData={data.headerData}
                    tempUnit={tempUnit}
                    setTempUnit={setTempUnit}
                />
                <LocationForecast
                    hourData={data.hourData}
                    dayData={data.dayData}
                    locationName={location}
                    tempUnit={tempUnit}
                />
            </div>
        </div>
    )
}

export default Location