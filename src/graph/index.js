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
        const GRID_SIZE = 3
        let graph = Array(GRID_SIZE)
        let count = 0
        for (let i = 0; i < GRID_SIZE; i++) {
            graph[i] = Array(GRID_SIZE)
            for (let j = 0; j < GRID_SIZE; j++) {
                let rowEven = i % 2 === 0
                let colEven = j % 2 === 0
                let extraDetails = {}
                let status = "EMPTY"
                if (rowEven && colEven) {
                    status = "NODE"
                } else if (rowEven || colEven) {
                    status = "EDGE"
                    extraDetails = {
                        neighbors : rowEven ? [count - 1, count + 1] : [count - GRID_SIZE, count + GRID_SIZE],
                        weight : Math.floor(Math.random() * 5) + 1,
                        horizontalStatus : rowEven
                    }
                }
                graph[i][j] = {
                    pointId: count,
                    status: status,
                    ...extraDetails
                }
                count++
            }
        }
        this.setState({graph : graph})
    }

    async executePrims() {
        let edges = []
        this.state.graph.forEach((row) => {
            row.filter((point) =>
                point.status === "EDGE"
            ).forEach((point) => {
                edges.push(point)
            })
        })
        let considered = PrimsAlgorithm(edges)[1]
        for (const consideredEdges of considered) {
            let styles = consideredEdges.map((edge) => document.getElementById(`edge-no-${edge.pointId}`).style)
            styles.forEach((style) => {
                style.backgroundColor = 'yellow'
            })
            await this.timeout(500)
            styles.forEach((style, idx) => {
                if (idx === 0) {
                    style.backgroundColor = 'turquoise'
                } else {
                    style.backgroundColor = 'grey'
                }
            })
            await this.timeout(500)
            console.log(consideredEdges)
        }
        await this.timeout(1000)
        console.log(considered)
    }

    timeout(delay) {
        return new Promise( res => setTimeout(res, delay));
    }

    incrementWeight(point) {
        if (point.status === "EDGE") {
            point.weight += 1
            this.setState(this.state)
        }
    }

    render() {
        return (
            <div className={"col p-5"}>
                {this.state.graph.map((row, idx) => {
                    return (
                        <div className={"d-flex flex-row justify-content-center"} key={idx}>
                            {this.state.graph[idx].map((point, jdx) => {
                                return <PointRenderer point={point} key={jdx} onClickBehavior={() => this.incrementWeight(point)}/>
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