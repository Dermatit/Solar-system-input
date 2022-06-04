import { useState } from "react";
import './index.css';

export const CircleInput = ({width, height}) => {
    const [currentDeg, setCurrentDeg] = useState(0);

    const startDrag = e => {
        const knob = e.target.getBoundingClientRect();
        const center = {
            x: knob.left + knob.width / 2,
            y: knob.top + knob.height / 2
        };
        const moveHandler = e => {
            setCurrentDeg(getDeg(e.clientX, e.clientY, center));
        };
        document.addEventListener("mousemove", moveHandler);
        document.addEventListener("mouseup", () => document.removeEventListener("mousemove", moveHandler));
    };

    const getDeg = (cX, cY, center) => {
        const x = cX - center.x;
        const y = cY - center.y;
        let deg = Math.atan(y / x) * 180 / Math.PI;
        (x < 0 && y >= 0) || (x < 0 && y < 0) ? deg += 90 : deg += 270;
        return deg;
    };

    return (
        <div className="knob">
            <div className="outer" onMouseDown={startDrag}>
                <div className="inner" style={{width: width, height: height, transform:`rotate(${currentDeg}deg)`}}>
                    <div className="grip" />
                </div>
            </div>
        </div>
    );
};