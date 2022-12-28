import React from "react";
import './point-renderer.css'

const PointRenderer = (
    {
        point = {
            pointId: 0,
            status: "EMPTY"
        }
    }
) => {
    if (point.status === "NODE") {
        return (
            <div className={"bg-primary node-box"}>
                Node {point.pointId}
            </div>
        )
    } else if (point.status === "EDGE") {
        return (
            <div className={"bg-secondary node-box"} id={`edge-no-${point.pointId}`}>
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