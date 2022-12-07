import { Link, Outlet, useNavigate } from "react-router-dom";

const NoteItem = (props) => {
    const navigate = useNavigate();
    const handleDelete = () => {
        setTimeout(() => {
            props.setNotes(note => note.filter(n => n !== props.currNote));
            navigate(`/gym/${props.currEx.id}/notes`)
        }, 1000)
    }
    const handleUpdate = () => {
        props.setNotes(note => note.filter(n => n !== props.currNote));
    }
    return (
    <>
        <p></p>
        {`id: ${props.currNote.id} body: ${props.currNote.body} data: ${props.currNote.data}`}
        <p></p>
        <Link to={`/gym/${props.currEx.id}/notes`}><button>BackToList</button></Link>
        <Link to={`/gym/${props.currEx.id}/notes/${props.currNote.id}/update`}>
            <button onClick={handleUpdate}>Update</button>
        </Link>
        <Link to={`/gym/${props.currEx.id}/notes/${props.currNote.id}/delete`}>
            <button onClick={handleDelete}>Delete</button>
        </Link>
        <Outlet/>
    </>
    )
}

export default NoteItem;