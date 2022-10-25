import Item from "./Item";
import Data from "./Data";
import Messeges from "./Messeges";
import { useState } from "react";

const Form = (props) => {
    const [toDo, setToDo] = useState("")
    const [toDoDate, setDate] = useState("")
    const [msg, setMsg] = useState("")

    const handleAddTodo = () => {
        props.addToDo(toDo)
        console.log(msg)
    }
    return (
        <div>
            <Item shareSetToDo={setToDo}/>
            <Data shareSetDate={setDate}/>
            <button onClick={handleAddTodo}>Send</button>
            <Messeges shareSetMsg={setMsg}/>
        </div>
    )
};

export default Form;