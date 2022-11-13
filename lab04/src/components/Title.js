const Title = (props) => {

    const handlerTitle = (event) => {
        props.setTitle(event.target.value);
    }

    return (
        <div>
            Title:
            <input type='text' value={props.title} onChange={handlerTitle}></input>
        </div>
    )
};

export default Title;