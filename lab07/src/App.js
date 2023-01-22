import { Route, Routes } from "react-router";
import Item from "./features/exercises/Item";
import Gym from "./features/exercises/Gym";
import AddExForm from "./features/exercises/AddExForm";
import UpdateExForm from "./features/exercises/UpdateExForm";
import Delete from "./features/exercises/Delete";
import Notes from "./features/notes/Notes"
import NoteAddForm from "./features/notes/NoteAddForm";
import NoteItem from "./features/notes/NoteItem";
import UpdateNoteForm from "./features/notes/UpdateNoteForm";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/gym" element={<Gym/>} />
        <Route path="/gym/add" element={<AddExForm/>} />
        <Route path="/gym/:id" element={<Item/>} >
          <Route path="/gym/:id/delete" element={<Delete/>}/>
          <Route path="/gym/:id/update" element={<UpdateExForm/>}/>
          <Route path="/gym/:id/notes" element={<Notes/>}/>
          <Route path="/gym/:id/notes/add" element={<NoteAddForm/>}/>
          <Route path="/gym/:id/notes/:noteid" element={<NoteItem/>}>
            <Route path="/gym/:id/notes/:noteid/delete" element={<Delete/>}/>
            <Route path="/gym/:id/notes/:noteid/update" element={<UpdateNoteForm/>}/>
          </Route>
        </Route>
      </Routes>
    </>
  )
}

export default App;