import { MutableRefObject } from "react"
import './ScrollButtons.css'
import chevron from "../images/chevron-right-solid.svg"

type ScrollLeftButtonProps = {
    scrollRef: MutableRefObject<HTMLDivElement>
}

const ScrollButtonLeft = ({ scrollRef }: ScrollLeftButtonProps) => {

    const scroll = (shift: number) => {
        scrollRef.current.scrollLeft += shift
    }

    return (
        <button className="scroll-button-left" onClick={() => scroll(-100)}>
            <img className="chevron-left" src={chevron} alt="chevron" />
        </button>
    )
}

export default ScrollButtonLeft
