const Description = (props) => {

    const handlerDesc = (event) => {
        props.setDescription(event.target.value);
    }

    return (
        <div>
            Description:
            <input type='text' value={props.description} onChange={handlerDesc}></input>
        </div>
    )
};

export default Description;