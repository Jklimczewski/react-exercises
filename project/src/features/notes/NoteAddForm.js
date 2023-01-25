import { Formik, Field, Form, ErrorMessage } from 'formik';
import {useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { addNote } from './notesSlice';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledDiv = styled("div")`
  background-color: #d8e8e8;
  width: 50%;
  height: 70px;
  text-align: center;
  margin: 100px auto;
  padding: 50px 0 100px 0;
  border-radius: 30px;
  font-size: 25px;
`;

const NoteAddForm = () => {
    const navigate = useNavigate();
    const notes = useSelector(state => state.note.allNotes);
    const currEx = useSelector(state => state.exercise.currEx)
    const dispatch = useDispatch(); 
    const [added, setAdd] = useState("");

    return (
    <StyledDiv>
        <Formik
          initialValues={{ body: '', data: ''}}
          validationSchema={Yup.object({
            body: Yup.string()
              .min(1, 'Must be 1 charater at least')
              .required('Required'),
            data: Yup.date().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            const id = notes.length === 0 ? 1 : notes.at(-1).id + 1;
            setTimeout(() => {
              axios.post("http://localhost:5000/notes", {id: id, exId: currEx.id, ...values})
                    .then(res => {
                      dispatch(addNote({id: id, exId: currEx.id, ...values}));
                      setAdd(res.data);
                    })
                    .catch(err => setAdd(err.response.data))
                setTimeout(() => navigate(`/gym/${currEx.id}/notes`), 1000)
                setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <label htmlFor="body">Body </label>
            <Field name="body" type="text" />
            <div><ErrorMessage name="body" /></div>
    
            <label htmlFor="data">Data </label>
            <Field name="data" type="date" />
            <div><ErrorMessage name="data" /></div>

            <p></p>
            <Button type="submit">Submit</Button>
            <Button type='reset'>Reset</Button>
          </Form>
        </Formik>
        {added}
    </StyledDiv>
    )
}

export default NoteAddForm;