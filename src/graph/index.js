import React from "react";
import PointRenderer from "./point-renderer";
import PrimsAlgorithm from "./prims-algorithm";

export default class Graph extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            graph: []
        }
    }

    componentDidMount() {
        this.resetGraph()
    }

    resetGraph() {
        const GRID_SIZE = 5
        let graph = Array(GRID_SIZE)
        let count = 0
        for (let i = 0; i < GRID_SIZE; i++) {
            graph[i] = Array(GRID_SIZE)
            for (let j = 0; j < GRID_SIZE; j++) {
                let rowEven = i % 2 === 0
                let colEven = j % 2 === 0
                let neighbors = [-1, -1]
                let weight = Math.floor(Math.random() * 5) + 1
                let status = "EMPTY"
                if (rowEven && colEven) {
                    status = "NODE"
                } else if (rowEven || colEven) {
                    status = "EDGE"
                    neighbors = rowEven ? [count - 1, count + 1] : [count - GRID_SIZE, count + GRID_SIZE]
                }
                graph[i][j] = {
                    pointId: count,
                    status: status,
                    neighbors: neighbors,
                    weight : weight
                }
                count++
            }
        }
        this.setState({graph : graph})
    }

    executePrims() {
        let edges = []
        this.state.graph.forEach((row) => {
            row.filter((point) =>
                point.status === "EDGE"
            ).forEach((point) => {
                edges.push(point)
            })
        })
        let [mst, considered] = PrimsAlgorithm(edges)
        mst.forEach((edge) => {
            let edgeBox = document.getElementById(`edge-no-${edge.pointId}`)
            edgeBox.style.backgroundColor = 'turquoise'
        })
        console.log(considered)
    }


    render() {
        return (
            <div className={"col p-5"}>
                {this.state.graph.map((row, idx) => {
                    return (
                        <div className={"d-flex flex-row justify-content-center"} key={idx}>
                            {this.state.graph[idx].map((point, jdx) => {
                                return <PointRenderer point={point} key={jdx}/>
                            })}
                        </div>
                    )
                })}
                <br/>
                <button type="button" className="btn btn-primary" onClick={() => this.executePrims()}>Prim's</button>
                <button type="button" className="btn btn-danger" onClick={() => this.resetGraph()}>Reset</button>
            </div>
        )

    }
}