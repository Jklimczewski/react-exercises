import axios from "axios";
import { useState } from "react";
import Category from "./Category";
import Description from "./Description";
import Image from "./Image";
import Price from "./Price";
import Title from "./Title";
import Messages from "./Messages";

const AddItem = (props) => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState([]);

    
    const handleSend = () => {
        const status = () => axios.post("https://fakestoreapi.com/products/", {
            title:  title,
            price: price,
            description: description,
            image: image,
            category: category,
        }).then(res => res).catch(err => err.message);

        status().then(res => {
            let tmp = true;
            setErrors([]);
            if (res.status == 200) {
                if (title == "") {
                    tmp = false;
                    setErrors(errorsOld => [...errorsOld, "Fill title!"]);
                }
                if (price < 0) {
                    tmp = false;
                    setErrors(errorsOld => [...errorsOld, "Make a non-negative price!"]);
                }
                if (description == "") {
                    tmp = false;
                    setErrors(errorsOld => [...errorsOld, "Fill description!"]);
                }
                if (image == "") {
                    tmp = false;
                    setErrors(errorsOld => [...errorsOld, "Fill image!"]);
                }
                if (category == "") {
                    tmp = false;
                    setErrors(errorsOld => [...errorsOld, "Fill category!"]);
                }

                if (tmp == true) {
                    res.data.id += props.addedProducts.length;
                    props.setAddedProducts(productsBefore => productsBefore.concat([res.data]));
                    setTitle("");
                    setPrice(0);
                    setDescription("");
                    setImage("");
                    setCategory("");
                }
                
            }
            else console.log(res);
        })
    }
    return (
        <div>
            <Title setTitle={setTitle} title={title}/>
            <Price setPrice={setPrice} price={price}/>
            <Description setDescription={setDescription} description={description}/>
            <Image setImage={setImage} image={image}/>
            <Category setCategory={setCategory} category={category}/>
            <button onClick={handleSend}>Send</button>
            <Messages errors={errors} />
        </div>
    )
}

export default AddItem;
