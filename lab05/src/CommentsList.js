import { useEffect, useState } from "react";
import axios from "axios";
const CommentsList = (props) => {
    const [comments, setComments] = useState([]);
    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/comments").then(res => setComments((res.data).concat(props.addedComments)));
    }, [props.addedComments]);
    return (
        <ul>
            {comments.map(comm => (<li>{`${comm.email} ${comm.name}`}</li>))};
        </ul>
    )
};

export default CommentsList;