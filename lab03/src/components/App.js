import { useState } from "react";
import Form from "./Form";

const App = () => {
    const [todos, setTodos] = useState([])

     return (
        <div>
            <div>Zadania:</div>
            <ul>
                {todos.map(item => (<li>{item}</li>))}
            </ul>
            <Form addToDo={setTodos} currentTodos={todos}/>
        </div>
        
    )
}

export default App;