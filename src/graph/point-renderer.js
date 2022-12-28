import React, {useEffect, useRef} from "react";
import './point-renderer.css'

const PointRenderer = (
    {
        point = {
            pointId: 0,
            status: "EMPTY"
        },
        onClickBehavior = () => {}
    }
) => {
    const edgeRef = useRef(null);
    useEffect(() => {
        if (edgeRef.current) {
            edgeRef.current.style.backgroundColor = 'grey'
        }
    }, [point])


    if (point.status === "NODE") {
        return (
            <div className={"bg-primary node-box"}>
                <span className={"text-white"}>Node {point.pointId}</span>

            </div>
        )
    } else if (point.status === "EDGE") {
        let orientationStyle = (point.horizontalStatus === true) ? (
            {width: "100%", height: "50%"}
        ) : (
            {width: "50%", height: "100%"}
        )
        return (
            <div className={"node-box"}>
                <div id={`edge-no-${point.pointId}`} className={"mx-auto my-auto"} onClick={onClickBehavior}
                     style={{backgroundColor: "grey", ...orientationStyle}} ref={edgeRef}>
                    <span>{"Weight of "}{point.weight}</span>
                </div>
            </div>
        )
    }
    return (
        <div className={"node-box"}>
            {" "}
        </div>
    )
}
export default PointRenderer;