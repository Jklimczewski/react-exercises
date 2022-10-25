import { useState } from "react";
import Form from "./Form";

const App = () => {
    const [todos, setTodos] = useState([])

     return (
        <div>
            <div>Zadania:</div>
            <div>
                {/* {todos.map(item => (<div>{item}</div>))} */}
                {todos}
            </div>
            <Form addToDo={setTodos}/>
        </div>
        
    )
}

export default App;