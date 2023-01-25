import { Formik, Field, Form, ErrorMessage } from 'formik';
import {useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { addEx } from './exercisesSlice';
import * as Yup from 'yup';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledDiv = styled("div")`
  background-color: #bbf3fa;
  width: 30%;
  height: 100px;
  text-align: center;
  margin: 100px auto;
  padding: 100px 0;
  border-radius: 30px;
  font-size: 25px;
`;

const AddExForm = () => {
    const navigate = useNavigate();
    const exercises = useSelector(state => state.exercise.allEx);
    const dispatch = useDispatch(); 
    const [added, setAdd] = useState("");

    return (
    <StyledDiv>
        <Formik
          initialValues={{ exercise: '', weight: ''}}
          validationSchema={Yup.object({
            exercise: Yup.string()
              .min(2, 'Must be 2 charaters at least')
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            weight: Yup.number()
              .typeError('Weight must be a number')
              .positive('Weight must be greater than zero')
              .required('Required'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            const id = exercises.length === 0 ? 1 : exercises.at(-1).id + 1;
            setTimeout(() => {
                axios.post("http://localhost:5000/exercises", {id: id, ...values, date: new Date().toString()})
                    .then(res => {
                      dispatch(addEx({id: id, ...values, date: new Date().toString()}));
                      setAdd(res.data);
                    })
                    .catch(err => setAdd(err.response.data))
                setTimeout(() => navigate('/gym'), 1000)
                setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <label htmlFor="exercise">Exercise </label>
            <Field name="exercise" type="text" />
            <div><ErrorMessage name="exercise" /></div>
    
            <label htmlFor="weight">Weight </label>
            <Field name="weight" type="text" />
            <div><ErrorMessage name="weight" /></div>

            <p></p>
            <Button type="submit">Submit</Button>
            <Button type='reset'>Reset</Button>
          </Form>
        </Formik>
        {added}
    </StyledDiv>
    )
}

export default AddExForm;