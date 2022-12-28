import React, {useEffect, useRef} from "react";
import './point-renderer.css'

const PointRenderer = (
    {
        point = {
            pointId: 0,
            status: "EMPTY"
        }
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
                Node {point.pointId}
            </div>
        )
    } else if (point.status === "EDGE") {
        return (
            <div ref={edgeRef} className={"node-box"} id={`edge-no-${point.pointId}`} style={{backgroundColor : "grey"}}>
                {point.neighbors[0]}{" to "}{point.neighbors[1]}
                {" with weight of "}{point.weight}
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