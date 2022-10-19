import Item from "./Item";
import Data from "./Data";
import { useState } from "react";

const Form = () => {
    const [toDo, setToDo] = useState("")
    const [date, setDate] = useState("")
    return (
        <div>
            <Item/>
            <Data/>
            <button>OK</button>
        </div>
    )
};

export default Form;