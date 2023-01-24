import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrNoteShowingUp, addNote } from './notesSlice';
import { useEffect, useState } from "react";
import axios from "axios";

const Notes = () => {
  const navigate = useNavigate();
  const notes = useSelector(state => state.note.allNotes);
  const currEx = useSelector(state => state.exercise.currEx);
  const dispatch = useDispatch(); 
  const [sortShow, setSortShow] = useState(false);
  const [sorted, setSorted] = useState([]);
  const [clicks, setClicks] = useState(0);

  
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

  const handleShowSort = () => {
    setSortShow(!sortShow)
    setSorted([...notes]);
  }
  const handleSortAlp = () => {
    if (clicks % 2 === 0) {
      setSorted([...sorted.sort((a,b) => (a.body > b.body) ? 1 : ((b.body > a.body) ? -1 : 0 ))])
    }
    else {
      setSorted([...sorted.sort((a,b) => (a.body < b.body) ? 1 : ((b.body < a.body) ? -1 : 0 ))])
    }
    setClicks(clicks => clicks += 1)
  }
  const handleSortDates = () => {
    if (clicks % 2 === 0) {
      setSorted([...sorted.sort((a,b) => (a.data > b.data) ? 1 : ((b.data > a.data) ? -1 : 0 ))])
    }
    else {
      setSorted([...sorted.sort((a,b) => (a.data < b.data) ? 1 : ((b.data < a.data) ? -1 : 0 ))])
    }
    setClicks(clicks => clicks += 1)
  }
  const handleSortId= () => {
    if (clicks % 2 === 0) {
      setSorted([...sorted.sort((a,b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0 ))])
    }
    else {
      setSorted([...sorted.sort((a,b) => (a.id < b.id) ? 1 : ((b.id < a.id) ? -1 : 0 ))])
    }
    setClicks(clicks => clicks += 1)
  }

  const handleClick = (note) => {
    const index = notes.findIndex(el => el.id === note.id);
    dispatch(setCurrNoteShowingUp({...note, atIndex: index}));
    navigate(`/gym/${currEx.id}/notes/${note.id}`);
  }

  if (sorted.length !== 0 && sortShow) return (
    <>
        <ul>
          {sorted.map(note => note.exId === currEx.id ? (<li key={note.id} onClick={() => handleClick(note)}>{note.data}</li>) : null )}
        </ul>
        <Link to={`/gym/${currEx.id}/notes/add`}><button>AddNote</button></Link>
        <button onClick={handleShowSort}>Sort</button>
        <br></br>
        <button onClick={handleSortAlp}>Alphabetical</button>
        <button onClick={handleSortDates}>Dates</button>
        <button onClick={handleSortId}>ID</button>
    </>
  )
  else if (sortShow) return (
    <>
        <ul>
          {notes.map(note => note.exId === currEx.id ? (<li key={note.id} onClick={() => handleClick(note)}>{note.data}</li>) : null )}
        </ul>
        <Link to={`/gym/${currEx.id}/notes/add`}><button>AddNote</button></Link>
        <button onClick={handleShowSort}>Sort</button>
        <br></br>
        <button onClick={handleSortAlp}>Alphabetical</button>
        <button onClick={handleSortDates}>Dates</button>
        <button onClick={handleSortId}>ID</button>
    </>
  )
  else return (
    <>
        <ul>
          {notes.map(note => note.exId === currEx.id ? (<li key={note.id} onClick={() => handleClick(note)}>{note.data}</li>) : null )}
        </ul>
        <Link to={`/gym/${currEx.id}/notes/add`}><button>AddNote</button></Link>
        <button onClick={handleShowSort}>Sort</button>
    </>
  )
}

export default Notes;
