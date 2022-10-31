import Item from "./Item";
import Data from "./Data";
import Messeges from "./Messeges";
import { useState } from "react";

const Form = (props) => {
    const [toDo, setToDo] = useState("")
    const [toDoDate, setDate] = useState("")
    const [msg1, setMsg1] = useState("")
    const [msg2, setMsg2] = useState("")

    const handleAddTodo = () => {
        let tmp = true
        setMsg1("")
        setMsg2("")

        if (toDoDate === "") {
            tmp = false
            setMsg1("Data jest pusta!")
        } else if (new Date(toDoDate).getTime() <= new Date().getTime()) {
            tmp = false
            setMsg1("Podaj poprawną datę!")
        }
        if (toDo === "") {
            tmp = false
            setMsg2("Tekst jest pusty!")
        }
        if (tmp === true) {
            const adding = props.currentTodos.concat([`${toDoDate}: ${toDo}`]);
            props.addToDo(adding);
            setDate("")
            setToDo("")
        }
    }
    return (
        <div>
            <Item shareSetToDo={setToDo} shareToDo={toDo}/>
            <Data shareSetDate={setDate} shareDate={toDoDate}/>
            <button onClick={handleAddTodo}>Send</button>
            <Messeges shareMsg1={msg1} shareMsg2={msg2}/>
        </div>
    )
};

export default Form;