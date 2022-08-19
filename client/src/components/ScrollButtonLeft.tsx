import { MutableRefObject } from "react"
import './ScrollButtons.css'
import chevron from "../images/chevron-right-solid.svg"

type ScrollLeftButtonProps = {
    scrollRef: MutableRefObject<HTMLDivElement>
}

const ScrollButtonLeft = ({ scrollRef }: ScrollLeftButtonProps) => {

    const handleClick = (shift: number) => {
        scrollRef.current.scrollLeft += shift
    }

    return (
        <button className="scroll-button-left" onClick={() => handleClick(-100)}>
            <img className="chevron-left" src={chevron} alt="chevron" />
        </button>
    )
}

export default ScrollButtonLeft
