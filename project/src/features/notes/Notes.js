import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrNoteShowingUp, addNote } from './notesSlice';
import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
const label = { inputProps: { 'aria-label': 'Sort' } };

const StyledDiv = styled("div")`
  background-color: #d8e8e8;
  width: 30%;
  text-align: center;
  margin: 100px auto;
  border-radius: 30px;
  padding: 5px 80px;
  font-size: 25px;
`;
const StyledSpan = styled("span")`
  font-size: 17px;
`;
const StyledImage = styled("div")`
  position: absolute;
  top: 50%;
  left: 10%;
`;

const Notes = () => {
  const navigate = useNavigate();
  const notes = useSelector(state => state.note.allNotes);
  const currEx = useSelector(state => state.exercise.currEx);
  const dispatch = useDispatch(); 
  const [sortShow, setSortShow] = useState(false);
  const [sorted, setSorted] = useState([]);
  const [clicks, setClicks] = useState(0);
  const [image, setImage] = useState("");

  useEffect(()=> {
    if (notes.length === 0) {
      axios.get("http://localhost:5000/notes").then(res => {
        res.data.forEach(el => {
          dispatch(addNote({id: el.id, exId: el.exId, body: el.body, data: el.data}));
        });
      })
      .catch(err => console.log(err))
    }
    axios.get(`http://localhost:5000/exercises/notes`)
            .then(res => {
                if (res.data.url) setImage(res.data.url)
            })
            .catch(err => console.log(err))
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
    <StyledDiv>
        <StyledImage>
            <img src={image} alt="" width="400" height="auto"></img>
        </StyledImage>
        <ul>
          {sorted.map(note => note.exId === currEx.id ? (<li key={note.id} onClick={() => handleClick(note)}>{note.data}</li>) : null )}
        </ul>
        <Link to={`/gym/${currEx.id}/notes/add`}><Button variant="contained" size="small">AddNote</Button></Link>
        <Switch onChange={handleShowSort} {...label} />
        <br></br>
        <Button variant="outlined" size="small" onClick={handleSortAlp}>Alphabetical</Button>
        <Button variant="outlined" size="small" onClick={handleSortDates}>Dates</Button>
        <Button variant="outlined" size="small" onClick={handleSortId}>ID</Button>
    </StyledDiv>
  )
  else return (
    <StyledDiv>
        <StyledImage>
            <img src={image} alt="" width="400" height="auto"></img>
        </StyledImage>
        <ul>
          {notes.map(note => note.exId === currEx.id ? (<li key={note.id} onClick={() => handleClick(note)}>{note.data}</li>) : null )}
        </ul>
        <Link to={`/gym/${currEx.id}/notes/add`}><Button variant="contained" size="small">AddNote</Button></Link>
        <Switch onChange={handleShowSort} {...label} />
        <StyledSpan>Press if you want to sort</StyledSpan>
    </StyledDiv>
  )
}

export default Notes;
