import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrExShowingUp, addEx } from './exercisesSlice';
import { useEffect, useState } from "react";
import axios from "axios";
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { styled } from '@mui/material/styles';
const label = { inputProps: { 'aria-label': 'Sort' } };

const StyledDiv = styled("div")`
  background-color: #bbf3fa;
  width: 30%;
  text-align: center;
  margin: 100px auto;
  border-radius: 30px;
  padding: 5px;
  font-size: 25px;
`;
const StyledDiv2 = styled("div")`
  text-align: center;
  margin-bottom: 5px;
  width: 50%;
  margin: 0 auto;
`;
const StyledSpan = styled("span")`
  font-size: 20px;
`;

const Gym = () => {
  const exercises = useSelector(state => state.exercise.allEx);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortShow, setSortShow] = useState(false);
  const [sorted, setSorted] = useState([]);
  const [clicks, setClicks] = useState(0);

  useEffect(()=> {
    if (exercises.length === 0) {
      axios.get("http://localhost:5000/exercises").then(res => {
        res.data.forEach(el => {
          dispatch(addEx({id: el.id, exercise: el.exercise, weight: el.weight, date: el.date}));
        });
      })
      .catch(err => console.log(err))
    }
  });

  const handleShowSort = () => {
    setSortShow(!sortShow)
    setSorted([...exercises]);
  }
  const handleSortAlp = () => {
    if (clicks % 2 === 0) {
      setSorted([...sorted.sort((a,b) => (a.exercise > b.exercise) ? 1 : ((b.exercise > a.exercise) ? -1 : 0 ))])
    }
    else {
      setSorted([...sorted.sort((a,b) => (a.exercise < b.exercise) ? 1 : ((b.exercise < a.exercise) ? -1 : 0 ))])
    }
    setClicks(clicks => clicks += 1)
  }
  const handleSortDates = () => {
    if (clicks % 2 === 0) {
      setSorted([...sorted.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0 ))])
    }
    else {
      setSorted([...sorted.sort((a,b) => (a.date < b.date) ? 1 : ((b.date < a.date) ? -1 : 0 ))])
    }
    setClicks(clicks => clicks += 1)
  }
  const handleSortWeight = () => {
    if (clicks % 2 === 0) {
      setSorted([...sorted.sort((a,b) => (a.weight > b.weight) ? 1 : ((b.weight > a.weight) ? -1 : 0 ))])
    }
    else {
      setSorted([...sorted.sort((a,b) => (a.weight < b.weight) ? 1 : ((b.weight < a.weight) ? -1 : 0 ))])
    }
    setClicks(clicks => clicks += 1)
  }

  const handleClick = (ex) => {
    const index = exercises.findIndex(exs => exs.id === ex.id);
    dispatch(setCurrExShowingUp({...ex, atIndex: index}));
    navigate(`/gym/${ex.id}`);
  }
  
  if (sorted.length !== 0 && sortShow) return (
    <StyledDiv>
      <StyledDiv2>
        <List>
          {sorted.map(ex => (<ListItem key={ex.id} onClick={() => handleClick(ex)}>{ex.exercise}</ListItem>))}
        </List>
      </StyledDiv2>
      <Link to='/gym/add'><Button variant="contained" size="small">Add</Button></Link>
      <Switch onChange={handleShowSort} {...label} />
      <br></br>
      <Button variant="outlined" size="small" onClick={handleSortAlp}>Alphabetical</Button>
      <Button variant="outlined" size="small" onClick={handleSortDates}>Dates</Button>
      <Button variant="outlined" size="small" onClick={handleSortWeight}>Weight</Button>
    </StyledDiv>
  )
  else return (
    <StyledDiv>
      <StyledDiv2>
        <List>
          {exercises.map(ex => (<ListItem key={ex.id} onClick={() => handleClick(ex)}>{ex.exercise}</ListItem>))}
        </List>
      </StyledDiv2>
      <Link to='/gym/add'><Button variant="contained" size="small">Add</Button></Link>
      <Switch onChange={handleShowSort} {...label} />
      <StyledSpan>Press if you want to sort</StyledSpan>
    </StyledDiv>
  )
}

export default Gym;
