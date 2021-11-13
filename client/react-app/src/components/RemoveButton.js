import removeButton from "../images/remove-button.svg"

const RemoveButton = ({ removeLocation }) => {
    return (
        <button className="remove-button" onClick={removeLocation}>
            <img
                className="remove-icon"
                src={removeButton}
                alt="remove icon"
            />
        </button>
    )
}

export default RemoveButton