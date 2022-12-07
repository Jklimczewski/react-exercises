import { Formik, Field, Form, ErrorMessage } from 'formik';
import {useNavigate } from 'react-router';
import * as Yup from 'yup';

const UpdateNoteForm = (props) => {
    const navigate = useNavigate();
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
                props.setNotes(oldNote => [{id: props.currNote.id, exId: props.currEx.id, ...values}].concat(oldNote));
                navigate(`/gym/${props.currEx.id}/notes`);
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
    </>
    )
}

export default UpdateNoteForm;