import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { deleteSingleEx } from './exercisesSlice';
import { deleteAllNotes } from '../notes/notesSlice';
import axios from "axios";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { useEffect, useState } from "react";

const StyledDiv = styled("div")`
  background-color: #bbf3fa;
  width: 30%;
  height: 100px;
  text-align: center;
  margin: 100px auto;
  padding: 50px 0 100px 0;
  border-radius: 30px;
  font-size: 25px;
`;
const StyledDiv2 = styled("div")`
  text-align: center;
  margin-bottom: 5px;
  width: 50%;
  margin: 0 auto;
`;
const StyledImage = styled("div")`
  position: absolute;
  top: 15%;
  left: 70%;
`;

const Item = () => {
    const navigate = useNavigate();
    const currEx = useSelector(state => state.exercise.currEx);
    const dispatch = useDispatch();
    const [image, setImage] = useState("");

    useEffect(()=> {
        axios.get(`http://localhost:5000/exercises/${currEx.exercise}`)
            .then(res => {
                if (res.data.url) setImage(res.data.url)
            })
            .catch(err => console.log(err))
    });

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
    <StyledDiv>
        <StyledDiv2>
            {`id: ${currEx.id}`}
        </StyledDiv2>
        <StyledDiv2>
            {`exercise: ${currEx.exercise}`}
        </StyledDiv2>
        <StyledDiv2>
            {`weight: ${currEx.weight}`}
        </StyledDiv2>
        <StyledImage>
            <img alt="" src={image} width="400" height="auto"></img>
        </StyledImage>
        <p></p>
        <Link to='/gym'><Button variant="outlined">BackToList</Button></Link>
        <Link to={`/gym/${currEx.id}/update`}>
            <Button variant="outlined" onClick={handleUpdate}>Update</Button>
        </Link>
        <Link to={`/gym/${currEx.id}/delete`}>
            <Button variant="outlined" onClick={handleDelete}>Delete</Button>
        </Link>
        <Link to={`/gym/${currEx.id}/notes`}>
            <Button variant="outlined">Notatki</Button>
        </Link>
        <Outlet/>
    </StyledDiv>
    )
}

export default Item;