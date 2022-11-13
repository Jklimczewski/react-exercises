const Image = (props) => {

    const handlerImage = (event) => {
        props.setImage(event.target.value);
    }

    return (
        <div>
            Image:
            <input type='text' value={props.image} onChange={handlerImage}></input>
        </div>
    )
};

export default Image;