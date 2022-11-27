import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const CommentForm = (props) => {
    return (
        <Formik
          initialValues={{ name: '', email: '', body: '' }}
          validationSchema={Yup.object({
            name: Yup.string()
              .min(1, 'Must be 1 charater at least')
              .max(15, 'Must be 15 characters or less')
              .required('Required'),
            email: Yup.string().email()
              .required('Required'),
            body: Yup.string(),
          })}
          onSubmit={(values, { resetForm }) => {
            setTimeout(() => {
              const merged = {id: uuidv4(), userId: uuidv4(), ...values}
              const post = () => axios.post("https://jsonplaceholder.typicode.com/comments/", merged).then(res => res).catch(err => console.log(err));
              post().then(res => {
                if (res.status == 201) {
                  props.setAddedComments(commBefore => commBefore.concat([res.data]));
                  resetForm();
                }
                else {
                  console.log(res);
                }
              })
            }, 400);
          }}
        >
          <Form>
            <label htmlFor="name">Name</label>
            <Field name="name" type="text" />
            <div><ErrorMessage name="name" /></div>
    
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <div><ErrorMessage name="email" /></div>
    
            <label htmlFor="body">Body</label>
            <Field name="body" type="textarea" />
            <ErrorMessage name="body" />

            <p></p>
            <button type="submit">Submit</button>
            <button type='reset'>Reset</button>
          </Form>
        </Formik>
      );
};
export default CommentForm;