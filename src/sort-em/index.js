import {useState} from "react";
import BubbleSort from "./sortingAlgo";

const SortEm = () => {
    const arraySize = 10
    const [values, setValues] = useState(new Array(arraySize).fill(0))



    return (
        <div className={"p-4"}>
            {values.map((val) => <div className={"text-primary bg-black"} style={{width: `${val}%`}}>{val}
                </div>
            )}
            <div type="button" className="btn btn-success" onClick={(e) => {
                let newVals = new Array(arraySize).fill(0)
                for (let i = 0; i < arraySize; i++) {
                    newVals[i] = Math.floor(Math.random() * 100)
                }
                setValues(newVals)
            }}>Give me values!
            </div>
            <div type="button" className="btn btn-success" onClick={(e) => {
                let newVals = BubbleSort(values)
                setValues(newVals)
            }}>Sort Me!
            </div>
        </div>
    )
};

export default SortEm;