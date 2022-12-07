import { useState } from "react";
import Item from "./Item";
import { Route, Routes } from "react-router";
import Gym from "./Gym";
import AddForm from "./AddForm";
import UpdateForm from "./UpdateForm";
import Delete from "./Delete";
import Notes from "./Notes"
import NoteAddForm from "./NoteAddForm";
import NoteItem from "./NoteItem";
import UpdateNoteForm from "./UpdateNoteForm";

const App = () => {
  const [exercises, setExercise] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currEx, setCurrEx] = useState({});
  const [currNote, setCurrNote] = useState({});
  return (
    <>
      <Routes>
        <Route path="/gym" element={<Gym exercises={exercises} setCurrEx={setCurrEx}/>} />
        <Route path="/gym/add" element={<AddForm setExercise={setExercise} exercise={exercises}/>} />
        <Route path="/gym/:id" element={<Item currEx={currEx} setExercises={setExercise}/>} >
          <Route path="/gym/:id/delete" element={<Delete/>}/>
          <Route path="/gym/:id/update" element={<UpdateForm setExercise={setExercise} currEx={currEx}/>}/>
          <Route path="/gym/:id/notes" element={<Notes notes={notes} currEx={currEx} setCurrNote={setCurrNote}/>}/>
          <Route path="/gym/:id/notes/add" element={<NoteAddForm notes={notes} currEx={currEx} setNotes={setNotes}/>}/>
          <Route path="/gym/:id/notes/:noteid" element={<NoteItem currNote={currNote} currEx={currEx} setNotes={setNotes}/>}>
            <Route path="/gym/:id/notes/:noteid/delete" element={<Delete/>}/>
            <Route path="/gym/:id/notes/:noteid/update" element={<UpdateNoteForm currNote={currNote} currEx={currEx} setNotes={setNotes}/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App;
