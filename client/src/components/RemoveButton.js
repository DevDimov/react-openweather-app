import IconButton from "./IconButton"
import removeButton from "../images/remove-button.svg"

const RemoveButton = ({ removeLocation }) => {
    return (
        <IconButton
            buttonClass="remove-button"
            onClick={removeLocation}
            iconClass="remove-icon"
            iconPath={removeButton}
            altText="remove icon"
        />
    )
}

export default RemoveButton