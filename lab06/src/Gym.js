import { Link, useNavigate } from "react-router-dom";

const Gym = (props) => {
  const navigate = useNavigate();

  const handleClick = (ex) => {
    props.setCurrEx(ex);
    navigate(`/gym/${ex.id}`);
  }
  return (
    <>
        <ul>
          {props.exercises.map(ex => (<li onClick={() => handleClick(ex)}>{ex.exercise}</li>))}
        </ul>
        <Link to='/gym/add'><button>Add</button></Link>
    </>
  )
}

export default Gym;
