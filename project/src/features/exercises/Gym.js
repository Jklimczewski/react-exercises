import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrExShowingUp, addEx } from './exercisesSlice';
import { useEffect, useState } from "react";
import axios from "axios";

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
    <>
        <ul>
          {sorted.map(ex => (<li key={ex.id} onClick={() => handleClick(ex)}>{ex.exercise}</li>))}
        </ul>
        <Link to='/gym/add'><button>Add</button></Link>
        <button onClick={handleShowSort}>Sort</button>
        <br></br>
        <button onClick={handleSortAlp}>Alphabetical</button>
        <button onClick={handleSortDates}>Dates</button>
        <button onClick={handleSortWeight}>Weight</button>
    </>
  )
  else if (sortShow) return (
    <>
        <ul>
          {exercises.map(ex => (<li key={ex.id} onClick={() => handleClick(ex)}>{ex.exercise}</li>))}
        </ul>
        <Link to='/gym/add'><button>Add</button></Link>
        <button onClick={handleShowSort}>Sort</button>
        <br></br>
        <button onClick={handleSortAlp}>Alphabetical</button>
        <button onClick={handleSortDates}>Dates</button>
        <button onClick={handleSortWeight}>Weight</button>
    </>
  )
  else return (
    <>
        <ul>
          {exercises.map(ex => (<li key={ex.id} onClick={() => handleClick(ex)}>{ex.exercise}</li>))}
        </ul>
        <Link to='/gym/add'><button>Add</button></Link>
        <button onClick={handleShowSort}>Sort</button>
    </>
  )
}

export default Gym;
