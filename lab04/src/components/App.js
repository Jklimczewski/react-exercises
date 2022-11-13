import { useEffect, useState } from "react";
import axios from "axios";
import AddItem from "./AddItem";

const App = () => {
    const [products, setProducts] = useState([]);
    const [addedProducts, setAddedProducts] = useState([]);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products").then(res => setProducts((res.data).concat(addedProducts)));
    }, [addedProducts]);
    return (
        <div>
            <ul>
                {products.map(prod => (<li>{`${prod.id}, ${prod.title}, ${prod.price}, ${prod.category}`}</li>))};
            </ul>
            <AddItem setProducts={setProducts} setAddedProducts={setAddedProducts} addedProducts={addedProducts}/>
        </div>
    )
}
export default App;