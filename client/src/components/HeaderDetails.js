import './HeaderDetails.css'
import sunriseIcon from '../images/sunrise-icon.svg'
import sunsetIcon from '../images/sunset-icon.svg'


const HeaderDetails = ({ sunrise, sunset }) => {

    const getTime = (unix) => {
        let date = new Date(unix * 1000)
        return date.toTimeString().slice(0, 5)
    }

    return (
        <div className='HeaderDetails'>
            <div>
                <img
                    className='HeaderDetails-icon'
                    src={sunriseIcon}
                    alt=""
                />
                <span className='font-weight-600'>Sunrise</span>
                <span className='font-weight-300'>{getTime(sunrise)}</span>
            </div>
            <div>
                <img
                    className='HeaderDetails-icon'
                    src={sunsetIcon}
                    alt=""
                />
                <span className='font-weight-600'>Sunset</span>
                <span className='font-weight-300'>{getTime(sunset)}</span>
            </div>
        </div>
    )
}

export default HeaderDetails