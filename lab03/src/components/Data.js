const Data = (props) => {
    
    const handlerDate = (event) => {
        props.shareSetDate(event.target.value)
    }
    return (
        <div>
            Podaj datę:
            <input type='date' onChange={handlerDate}></input>
        </div>
    )
};

export default Data;