const Item = (props) => {

    const handlerToDo = (event) => {
        props.shareSetToDo(event.target.value)
    }

    return (
        <div>
            Podaj zadania:
            <input type='text' value={props.shareToDo} onChange={handlerToDo}></input>
        </div>
    )
};

export default Item;