import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrNoteShowingUp, addNote } from './notesSlice';
import { useEffect } from "react";
import axios from "axios";

const Notes = () => {
  const navigate = useNavigate();
  const notes = useSelector(state => state.note.allNotes);
  const currEx = useSelector(state => state.exercise.currEx);
  const dispatch = useDispatch(); 
  
  useEffect(()=> {
    if (notes.length === 0) {
      axios.get("http://localhost:5000/notes").then(res => {
        res.data.forEach(el => {
          dispatch(addNote({id: el.id, exId: el.exId, body: el.body, data: el.data}));
        });
      })
      .catch(err => console.log(err))
    }
  });

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
