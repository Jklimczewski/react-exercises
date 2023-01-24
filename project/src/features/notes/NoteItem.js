import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteSingleNote } from './notesSlice';
import axios from "axios";

const NoteItem = () => {
    const navigate = useNavigate();
    const currEx = useSelector(state => state.exercise.currEx);
    const currNote = useSelector(state => state.note.currNote);
    const dispatch = useDispatch();
    
    const handleDelete = () => {
        axios.delete(`http://localhost:5000/notes/${currNote.id}/delete`)
            .then(res => dispatch(deleteSingleNote(currNote)))
            .catch(err => console.log(err))
        setTimeout(() => {
            navigate(`/gym/${currEx.id}/notes`);;
        }, 1000)
    }
    const handleUpdate = () => {
        dispatch(deleteSingleNote(currNote));
    }
    return (
    <>
        <p></p>
        {`id: ${currNote.id} body: ${currNote.body} data: ${currNote.data}`}
        <p></p>
        <Link to={`/gym/${currEx.id}/notes`}><button>BackToList</button></Link>
        <Link to={`/gym/${currEx.id}/notes/${currNote.id}/update`}>
            <button onClick={handleUpdate}>Update</button>
        </Link>
        <Link to={`/gym/${currEx.id}/notes/${currNote.id}/delete`}>
            <button onClick={handleDelete}>Delete</button>
        </Link>
        <Outlet/>
    </>
    )
}

export default NoteItem;