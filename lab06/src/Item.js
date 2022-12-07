import { Link, Outlet, useNavigate } from "react-router-dom";

const Item = (props) => {
    const navigate = useNavigate();
    const handleDelete = () => {
        setTimeout(() => {
            props.setExercises(exs => exs.filter(ex => ex !== props.currEx));
            navigate('/gym')
        }, 1000)
    }
    const handleUpdate = () => {
        props.setExercises(exs => exs.filter(ex => ex !== props.currEx));
    }
    return (
    <>
        {`id: ${props.currEx.id} exercise: ${props.currEx.exercise} weight: ${props.currEx.weight}`}
        <p></p>
        <Link to='/gym'><button>BackToList</button></Link>
        <Link to={`/gym/${props.currEx.id}/update`}>
            <button onClick={handleUpdate}>Update</button>
        </Link>
        <Link to={`/gym/${props.currEx.id}/delete`}>
            <button onClick={handleDelete}>Delete</button>
        </Link>
        <Link to={`/gym/${props.currEx.id}/notes`}>
            <button>Notatki</button>
        </Link>
        <Outlet/>
    </>
    )
}

export default Item;