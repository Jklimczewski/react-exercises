import { Formik, Field, Form, ErrorMessage } from 'formik';
import {useNavigate } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { addEx } from './exercisesSlice';
import * as Yup from 'yup';

const AddExForm = () => {
    const navigate = useNavigate();
    const exercises = useSelector(state => state.exercise.allEx);
    const dispatch = useDispatch(); 
    return (
    <>
        <Formik
          initialValues={{ exercise: '', weight: ''}}
          validationSchema={Yup.object({
            exercise: Yup.string()
              .min(1, 'Must be 1 charater at least')
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            weight: Yup.number().positive().required('Required')
          })}
          onSubmit={(values, { setSubmitting }) => {
            const id = exercises.length === 0 ? 1 : exercises.at(-1).id + 1;
            setTimeout(() => {
                dispatch(addEx({id: id, ...values}));
                navigate('/gym');
                setSubmitting(false);
            }, 400);
          }}
        >
          <Form>
            <label htmlFor="exercise">Exercise</label>
            <Field name="exercise" type="text" />
            <div><ErrorMessage name="exercise" /></div>
    
            <label htmlFor="weight">Weight</label>
            <Field name="weight" type="text" />
            <div><ErrorMessage name="weight" /></div>

            <p></p>
            <button type="submit">Submit</button>
            <button type='reset'>Reset</button>
          </Form>
        </Formik>
    </>
    )
}

export default AddExForm;