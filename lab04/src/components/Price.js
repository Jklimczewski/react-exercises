const Price = (props) => {

    const handlerPrice = (event) => {
        props.setPrice(event.target.value);
    }

    return (
        <div>
            Price:
            <input type="number" step="any" value={props.price} onChange={handlerPrice}></input>
        </div>
    )
};

export default Price;