import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setCurrExShowingUp } from './exercisesSlice';

const Gym = () => {
  const exercises = useSelector(state => state.exercise.allEx);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (ex) => {
    const index = exercises.findIndex(exs => exs.id === ex.id);
    dispatch(setCurrExShowingUp({...ex, atIndex: index}));
    navigate(`/gym/${ex.id}`);
  }
  return (
    <>
        <ul>
          {exercises.map(ex => (<li key={ex.id} onClick={() => handleClick(ex)}>{ex.exercise}</li>))}
        </ul>
        <Link to='/gym/add'><button>Add</button></Link>
    </>
  )
}

export default Gym;
