function BubbleSort(recvArray) {
    let n = recvArray.length
    const resArray = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        resArray[i] = recvArray[i]
    }
    let i = 0
    while (i < n-1 && resArray[i] > resArray[i + 1]) {
        let c = resArray[i]
        resArray[i] = resArray[i + 1]
        resArray[i + 1] = c
        i += 1
    }
    return resArray
}
export default BubbleSort;