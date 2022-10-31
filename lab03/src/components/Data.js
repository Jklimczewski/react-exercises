const Data = (props) => {
    
    const handlerDate = (event) => {
        props.shareSetDate(event.target.value)
    }
    return (
        <div>
            Podaj datę:
            <input type='date' value={props.shareDate} onChange={handlerDate}></input>
        </div>
    )
};

export default Data;