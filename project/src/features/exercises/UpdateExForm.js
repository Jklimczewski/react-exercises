import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { updateSingleEx } from './exercisesSlice';
import * as Yup from 'yup';
import axios from 'axios';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const StyledDiv = styled("div")`
  background-color: #bbf3fa;
  width: 60%;
  height: 100px;
  text-align: center;
  margin: 150px auto;
  padding: 10px 0 80px 0;
  font-size: 25px;
`;

const UpdateExForm = () => {
    const navigate = useNavigate();
    const currEx = useSelector(state => state.exercise.currEx);
    const dispatch = useDispatch(); 
    const [update, setUpdate] = useState("");

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
            setTimeout(() => {
              axios.put(`http://localhost:5000/exercises/${currEx.id}/update`, {id: currEx.id, ...values, atIndex: currEx.atIndex, date: new Date().toString()})
                    .then(res => {
                      dispatch(updateSingleEx({id: currEx.id, ...values, atIndex: currEx.atIndex, date: new Date().toString()}));
                      setUpdate(res.data);
                    })
                    .catch(err => setUpdate(err.response.data))
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
        {update}
    </StyledDiv>
    )
}

export default UpdateExForm;