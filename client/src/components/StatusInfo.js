const StatusInfo = ({ display, text, icon }) => {
    
    return ( 
    <p id="status-info-paragraph">
        <img
                className="status-info-icon"
                src={display ? icon : null}
                alt={display ? "Status Info Icon" : null}
            />
        {text}
    </p>
    )
}

export default StatusInfo