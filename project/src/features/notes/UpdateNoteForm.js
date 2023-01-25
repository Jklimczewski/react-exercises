import { Formik, Field, Form, ErrorMessage } from 'formik';
import {useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { updateSingleNote } from './notesSlice';
import * as Yup from 'yup';
import { useState } from 'react';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledDiv = styled("div")`
  background-color: #d8e8e8;
  width: 80%;
  height: 100px;
  text-align: center;
  margin: 100px auto;
  padding: 10px 0 80px 0;
  font-size: 25px;
`;

const UpdateNoteForm = (props) => {
    const navigate = useNavigate();
    const currEx = useSelector(state => state.exercise.currEx);
    const currNote = useSelector(state => state.note.currNote);
    const dispatch = useDispatch(); 
    const [update, setUpdate] = useState("");

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
        {update}
    </StyledDiv>
    )
}

export default UpdateNoteForm;