import IconButton from "./IconButton"
import removeButton from "../images/remove-button.svg"

type RemoveButtonProps = {
    removeLocation: (name: string) => void
}

const RemoveButton = ({ removeLocation }: RemoveButtonProps) => {
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