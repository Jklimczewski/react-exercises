import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteSingleEx } from './exercisesSlice';
import { deleteAllNotes } from '../notes/notesSlice';
import axios from "axios";

const Item = () => {
    const navigate = useNavigate();
    const currEx = useSelector(state => state.exercise.currEx);
    const dispatch = useDispatch();

    const handleDelete = () => {
        axios.delete(`http://localhost:5000/exercises/${currEx.id}/notes`)
            .then(res => dispatch(deleteAllNotes(currEx)))
            .catch(err => console.log(err))
        axios.delete(`http://localhost:5000/exercises/${currEx.id}/delete`)
            .then(res => dispatch(deleteSingleEx(currEx)))
            .catch(err => console.log(err))
        setTimeout(() => {
            navigate('/gym');
        }, 1000)
    }
    const handleUpdate = () => {
        dispatch(deleteSingleEx(currEx));
    }
    return (
    <>
        {`id: ${currEx.id} exercise: ${currEx.exercise} weight: ${currEx.weight}`}
        <p></p>
        <Link to='/gym'><button>BackToList</button></Link>
        <Link to={`/gym/${currEx.id}/update`}>
            <button onClick={handleUpdate}>Update</button>
        </Link>
        <Link to={`/gym/${currEx.id}/delete`}>
            <button onClick={handleDelete}>Delete</button>
        </Link>
        <Link to={`/gym/${currEx.id}/notes`}>
            <button>Notatki</button>
        </Link>
        <Outlet/>
    </>
    )
}

export default Item;