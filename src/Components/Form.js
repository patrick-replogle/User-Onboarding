import React, { useState, useEffect } from "react";
import { withFormik, Form, Field, yupToFormErrors } from "formik";
import * as Yup from "yup";
import axios from "axios";

import UserCard from "./UserCard.js";

const LoginForm = ({ values, touched, errors, status }) => {
  console.log(status);
  const [user, setUser] = useState([]);

  useEffect(() => {
    if (status) {
      setUser([...user, status]);
    }
  }, [status]);

  return (
    <>
      <Form className="form">
        <h3>Login:</h3>
        {touched.name && errors.name && <p className="error">{errors.name}</p>}
        <Field className="field" type="text" name="name" placeholder="name" />
        {touched.email && errors.email && (
          <p className="error">{errors.email}</p>
        )}
        <Field
          className="field"
          type="email"
          name="email"
          placeholder="email"
        />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <Field
          className="field"
          type="password"
          name="password"
          placeholder="password"
        />

        {touched.note && errors.note && <p className="error">{errors.note}</p>}
        <Field className="field" type="note" name="note" placeholder="note" />

        {touched.date && errors.date && <p>{errors.date}</p>}
        <Field className="field" type="date" name="date" placeholder="date" />

        {touched.role && errors.role && <p className="error">{errors.role}</p>}
        <Field className="field" component="select" name="role">
          <option defaultValue>Select Group (Just one)</option>
          <option value="coder">Coder</option>
          <option value="plumber">Plumber</option>
          <option value="hitman">Hit Man</option>
          <option value="Mr Universe">Mr Universe</option>
        </Field>

        {touched.education && errors.education && (
          <p className="error">{errors.education}</p>
        )}
        <Field className="field" component="select" name="education">
          <option defaultValue>Education</option>
          <option value="Kindergarten">Kindergarten</option>
          <option value="High School">High School</option>
          <option value="College">College</option>
          <option value="Lambda">Lambda</option>
        </Field>

        {touched.tos && errors.tos && <p className="error">{errors.tos}</p>}
        <label>
          Terms of Service:
          <Field type="checkbox" name="tos" checked={values.tos} />
        </label>
        <button type="submit">Submit</button>

        {user.map((user, index) => {
          return <UserCard user={user} key={index} />;
        })}
      </Form>
    </>
  );
};

const FormikLoginForm = withFormik({
  mapPropsToValues(values) {
    return {
      name: values.name || "",
      email: values.email || "",
      password: values.password || "",
      note: values.note || "",
      date: values.date || "",
      role: values.role || false,
      education: values.education || false,
      tos: values.tos || false
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Not a valid email")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
    note: Yup.string().required("Write a note buddy!"),
    date: Yup.string().required("You must select a date"),
    education: Yup.string().required("Enter your education"),
    role: Yup.string().required("You must select a role"),
    tos: Yup.boolean().oneOf([true], "You must agree to terms of service")
  }),

  handleSubmit(values, { setStatus, resetForm, setErrors, setSubmitting }) {
    if (values.email === "waffle@syrup.com") {
      setErrors({ email: "that email is already taken" });
    } else {
      axios
        .post("https://reqres.in/api/users", values)
        .then(response => {
          setStatus(response.data);
          resetForm();
          setSubmitting(false);
        })
        .catch(error => {
          console.log(error, "error");
          setSubmitting(false);
        });
    }
  }
})(LoginForm);

export default FormikLoginForm;
