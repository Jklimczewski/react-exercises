import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrNoteShowingUp } from './notesSlice';

const Notes = () => {
  const navigate = useNavigate();
  const notes = useSelector(state => state.note.allNotes);
  const currEx = useSelector(state => state.exercise.currEx);
  const dispatch = useDispatch(); 

  const handleClick = (note) => {
    const index = notes.findIndex(el => el.id === note.id);
    dispatch(setCurrNoteShowingUp({...note, atIndex: index}));
    navigate(`/gym/${currEx.id}/notes/${note.id}`);
  }
  return (
    <>
        <ul>
          {notes.map(note => note.exId === currEx.id ? (<li key={note.id} onClick={() => handleClick(note)}>{note.data}</li>) : null )}
        </ul>
        <Link to={`/gym/${currEx.id}/notes/add`}><button>AddNote</button></Link>
    </>
  )
}

export default Notes;
