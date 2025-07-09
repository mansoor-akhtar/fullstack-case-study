import { useState, useEffect } from "react";
import { ErrorMessage, Formik } from "formik";
import type { FormikHelpers } from "formik";
import * as Yup from "yup";
import { connect, useDispatch } from "react-redux";
import { isEmpty, gotProperty, withRouter } from "../../util";
import { loginUser } from "../../store/action";
import { getErrors } from "../../store/reducers/errorReducer";
import { useNavigate } from "react-router-dom";

interface FormValues {
  email: string;
  password: string;
};

const Login = (props: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [formHelper, setFormHelper] = useState<FormikHelpers<FormValues> | null>(null);

  const Schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    if (!isEmpty(props.errors) && formHelper) {
      setLoading(false);
      if (gotProperty(props.errors, "email"))
        formHelper.setFieldError("email", props.errors.email);
      if (gotProperty(props.errors, "password"))
        formHelper.setFieldError("password", props.errors.password);
      dispatch(
        getErrors({})
      );
    }
  }, [props.errors]);

  useEffect(() => {
    if (props.auth.isAuthenticated) {
      setLoading(false);
      navigate("/");
    }
  }, [props.auth.isAuthenticated]);

  const formikProps = {
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Schema,
    onSubmit: (values: FormValues, formHelper: FormikHelpers<FormValues>) => {
      setFormHelper(formHelper);
      const data = {
        email: values.email,
        password: values.password,
      };
      setLoading(true);
      props.loginUser(data);
    },
  };

  return (
    <Formik {...formikProps}>
      {(formik) => {
        const { values, handleChange, handleSubmit, handleBlur } = formik;
        return (
          <div className="col-md-12">
            <div className="card card-container auth-form">
              <form onSubmit={handleSubmit} method="POST">
                <div className="form-group mt-4">
                  <label htmlFor="email" className="float-start mb-2">Email</label>
                  <input
                    type="email"
                    className="form-control same-input"
                    name="email"
                    id="email"
                    placeholder="Enter your Email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="email"
                    render={(error: string) => <span className="error">{error}</span>}
                  />
                </div>

                <div className="form-group mt-4">
                  <label htmlFor="password" className="float-start mb-2">Password</label>
                  <input
                    type="password"
                    className="form-control same-input"
                    name="password"
                    id="password"
                    placeholder="Enter your Password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="password"
                    render={(error: string) => <span className="error">{error}</span>}
                  />
                </div>

                <div className="form-group mt-4">
                  <button className="btn btn-primary btn-block" disabled={loading}>
                    {loading && <span className="spinner-border spinner-border-sm"></span>}
                    <span>Login</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

const mapStateToProps = (state: any) => ({
  auth: state.auth,
  errors: state.errors,
});


export default connect(mapStateToProps, { loginUser })(withRouter(Login));
