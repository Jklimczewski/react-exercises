import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteSingleNote } from './notesSlice';
import axios from "axios";
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const StyledDiv = styled("div")`
  background-color: #d8e8e8;
  width: 60%;
  height: 200px;
  text-align: center;
  margin: 100px auto;
  border-radius: 30px;
  padding: 5px 30px;
  font-size: 25px;
`;
const StyledDiv2 = styled("div")`
  text-align: center;
  margin-bottom: 5px;
  width: 100%;
  margin: 0 auto;
`;

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
    <StyledDiv>
        <StyledDiv2>
            {`id: ${currNote.id}`}
        </StyledDiv2>
        <StyledDiv2>
            {`body: ${currNote.body}`}
        </StyledDiv2>
        <StyledDiv2>
            {`data: ${currNote.data}`}
        </StyledDiv2>
        <p></p>
        <Link to={`/gym/${currEx.id}/notes`}><Button variant="outlined">BackToList</Button></Link>
        <Link to={`/gym/${currEx.id}/notes/${currNote.id}/update`}>
            <Button variant="outlined" onClick={handleUpdate}>Update</Button>
        </Link>
        <Link to={`/gym/${currEx.id}/notes/${currNote.id}/delete`}>
            <Button variant="outlined" onClick={handleDelete}>Delete</Button>
        </Link>
        <Outlet/>
    </StyledDiv>
    )
}

export default NoteItem;