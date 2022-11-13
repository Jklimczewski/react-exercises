const Messages = (props) => {

    return (
        <div>
            {props.errors.map(err => (<p>{err}</p>))}
        </div>
    )
};

export default Messages;