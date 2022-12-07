import { Link, useNavigate } from "react-router-dom";

const Notes = (props) => {
  const navigate = useNavigate();

  const handleClick = (ex) => {
    props.setCurrNote(ex);
    navigate(`/gym/${props.currEx.id}/notes/${ex.id}`);
  }
  return (
    <>
        <ul>
          {props.notes.map(note => note.exId === props.currEx.id ? (<li onClick={() => handleClick(note)}>{note.data}</li>) : null )}
        </ul>
        <Link to={`/gym/${props.currEx.id}/notes/add`}><button>AddNote</button></Link>
    </>
  )
}

export default Notes;
