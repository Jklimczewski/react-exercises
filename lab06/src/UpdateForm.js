import { Formik, Field, Form, ErrorMessage } from 'formik';
import {useNavigate } from 'react-router';
import * as Yup from 'yup';

const UpdateForm = (props) => {
    const navigate = useNavigate();
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
            setTimeout(() => {
                props.setExercise(oldEx => [{id: props.currEx.id, ...values}].concat(oldEx));
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

export default UpdateForm;