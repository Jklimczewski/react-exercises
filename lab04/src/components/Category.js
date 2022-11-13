const Category = (props) => {

    const handlerCat = (event) => {
        props.setCategory(event.target.value);
    }

    return (
        <div>
            Category:
            <input type='text' value={props.category} onChange={handlerCat}></input>
        </div>
    )
};

export default Category;