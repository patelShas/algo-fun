export default function PrimsAlgorithm(edges) {
    edges.sort((a, b) => (a.weight > b.weight) ? 1 : (a.weight === b.weight) ? ((a.weight > b.weight) ? 1 : -1) : -1)

    let connectedNodes = new Set()
    connectedNodes.add(0)
    let mst = []
    function extendsMST(point) {
        return (
            (connectedNodes.has(point.neighbors[0]) && !connectedNodes.has(point.neighbors[1])) ||
            (connectedNodes.has(point.neighbors[1]) && !connectedNodes.has(point.neighbors[1]))
        )
    }

    let nextEdges = edges.filter(extendsMST)

    while (nextEdges.length > 0) {
        let picked = nextEdges.shift()
        mst.push(picked)
        connectedNodes.add(picked.neighbors[0])
        connectedNodes.add(picked.neighbors[1])
        nextEdges = edges.filter(extendsMST)
    }

    return mst

}