import { Formik, Field, Form, ErrorMessage } from 'formik';
import {useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { updateSingleNote } from './notesSlice';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';

const UpdateNoteForm = (props) => {
    const navigate = useNavigate();
    const currEx = useSelector(state => state.exercise.currEx);
    const currNote = useSelector(state => state.note.currNote);
    const dispatch = useDispatch(); 
    const [update, setUpdate] = useState("");

    return (
    <>
        <Formik
          initialValues={{ body: '', data: ''}}
          validationSchema={Yup.object({
            body: Yup.string()
              .min(1, 'Must be 1 charater at least')
              .required('Required'),
            data: Yup.date().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              axios.put(`http://localhost:5000/notes/${currNote.id}/update`, {id: currNote.id, exId: currEx.id, ...values, atIndex: currNote.atIndex})
                    .then(res => {
                      dispatch(updateSingleNote({id: currNote.id, exId: currEx.id, ...values, atIndex: currNote.atIndex}));
                      setUpdate(res.data);
                    })
                    .catch(err => setUpdate(err.response.data))
                setTimeout(() => navigate(`/gym/${currEx.id}/notes`), 1000)
                setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <label htmlFor="body">Body</label>
            <Field name="body" type="text" />
            <div><ErrorMessage name="body" /></div>
    
            <label htmlFor="data">Data</label>
            <Field name="data" type="date" />
            <div><ErrorMessage name="data" /></div>

            <p></p>
            <button type="submit">Submit</button>
            <button type='reset'>Reset</button>
          </Form>
        </Formik>
        {update}
    </>
    )
}

export default UpdateNoteForm;