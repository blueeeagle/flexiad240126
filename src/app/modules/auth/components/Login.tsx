// import {useState} from 'react'
// import * as Yup from 'yup'
// import clsx from 'clsx'
// import {Link} from 'react-router-dom'
// import {useFormik} from 'formik'
// import {getUserByToken, login} from '../core/_requests'
// import {toAbsoluteUrl} from '../../../../_metronic/helpers'
// import {useAuth} from '../core/Auth'

// const loginSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Wrong email format')
//     .min(3, 'Minimum 3 symbols')
//     .max(50, 'Maximum 50 symbols')
//     .required('Email is required'),
//   password: Yup.string()
//     .min(3, 'Minimum 3 symbols')
//     .max(50, 'Maximum 50 symbols')
//     .required('Password is required'),
// })

// const initialValues = {
//   email: '',
//   password: '',
// }

// export function Login() {
//   const [loading, setLoading] = useState(false);
//   const {saveAuth, setCurrentUser} = useAuth();

//   const formik = useFormik({
//     initialValues,
//     validationSchema: loginSchema,
//     onSubmit: async (values, {setStatus, setSubmitting}) => {
//       setLoading(true);
//       try {
//         const {data: auth} = await login(values.email, values.password);
//         console.log(auth)
//         if(auth?.status === 'ok') {
//           localStorage.setItem('token', auth?.data?.token);
//           saveAuth(auth);
//           setCurrentUser(auth?.data?.userDetails);
//         } else {
//           alert(`The login details are incorrect`)
//         }
//       } catch (error) {
//         console.error(error)
//         saveAuth(undefined)
//         alert(`The login details are incorrect`)
//         setStatus('The login details are incorrect')
//         setSubmitting(false)
//         setLoading(false)
//       }
//     },
//   })

//   return (
//     <form
//       className='form w-100'
//       onSubmit={formik.handleSubmit}
//       noValidate
//       id='kt_login_signin_form'
//     >
//       {/* begin::Heading */}
//       <div className='text-center mb-11'>
//         <img
//             alt='Logo'
//             src={toAbsoluteUrl('media/logos/LOGO.png')}
//             className='h-50px mb-10 app-sidebar-logo-default'
//           />
//         <h1 className='text-gray-900 fw-bolder mb-3'>Welcome back</h1>
//         <div className='text-gray-500 fw-semibold fs-6'>Welcome Back! Please enter your details </div>
//       </div>
//       {/* begin::Heading */}

//       {/* begin::Form group */}
//       <div className='fv-row mb-8'>
//         <label className='form-label fs-6 fw-bolder text-gray-900'>Email</label>
//         <input
//           placeholder='Email'
//           {...formik.getFieldProps('email')}
//           className={clsx(
//             'form-control bg-transparent',
//             {'is-invalid': formik.touched.email && formik.errors.email},
//             {
//               'is-valid': formik.touched.email && !formik.errors.email,
//             }
//           )}
//           type='email'
//           name='email'
//           autoComplete='off'
//         />
//         {formik.touched.email && formik.errors.email && (
//           <div className='fv-plugins-message-container'>
//             <span role='alert'>{formik.errors.email}</span>
//           </div>
//         )}
//       </div>
//       {/* end::Form group */}

//       {/* begin::Form group */}
//       <div className='fv-row mb-3'>
//         <label className='form-label fw-bolder text-gray-900 fs-6 mb-0'>Password</label>
//         <input
//           type='password'
//           placeholder='Password'
//           autoComplete='off'
//           {...formik.getFieldProps('password')}
//           className={clsx(
//             'form-control bg-transparent',
//             {
//               'is-invalid': formik.touched.password && formik.errors.password,
//             },
//             {
//               'is-valid': formik.touched.password && !formik.errors.password,
//             }
//           )}
//         />
//         {formik.touched.password && formik.errors.password && (
//           <div className='fv-plugins-message-container'>
//             <div className='fv-help-block'>
//               <span role='alert'>{formik.errors.password}</span>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className='d-grid mb-10'>
//         <button
//           type='submit'
//           id='kt_sign_in_submit'
//           className='btn btn-primary'
//           disabled={formik.isSubmitting || !formik.isValid}
//         >
//           {!loading && <span className='indicator-label'>SIGNIN</span>}
//           {loading && (
//             <span className='indicator-progress' style={{display: 'block'}}>
//               Please wait...
//               <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
//             </span>
//           )}
//         </button>
//       </div>
//       {/* end::Action */}
//     </form>
//   )
// }
import { useState } from "react";
import * as Yup from "yup";
import clsx from "clsx";
import { useFormik } from "formik";
import { login } from "../core/_requests";
import { toAbsoluteUrl } from "../../../../_metronic/helpers";
import { useAuth } from "../core/Auth";
import { Link, useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Wrong email format")
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Email is required"),
  password: Yup.string()
    .min(3, "Minimum 3 symbols")
    .max(50, "Maximum 50 symbols")
    .required("Password is required"),
});

const initialValues = {
  email: "",
  password: "",
};

export function Login() {
  const [loading, setLoading] = useState(false);
  const { saveAuth, setCurrentUser } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, { setStatus, setSubmitting }) => {
      setLoading(true);



      try {
        const { data: auth } = await login(values.email, values.password);
        console.log(auth);

        if (auth?.status === "ok") {
          localStorage.setItem("token", auth?.data?.token); // Store the new token
          saveAuth(auth);
          setCurrentUser(auth?.data?.userDetails);
          navigate("/dashboard"); // Navigate to the dashboard on success
        } else {
          alert("The login details are incorrect");
          setStatus("The login details are incorrect");
        }
      } catch (error) {
        console.error(error);
        saveAuth(undefined);
        alert("The login details are incorrect");
        setStatus("The login details are incorrect");
      } finally {
        setSubmitting(false);
        setLoading(false);
      }
    },
  });

  return (
    <form
      className="form w-100"
      onSubmit={formik.handleSubmit}
      noValidate
      id="kt_login_signin_form"
    >
      <div className="text-center mb-11">
        <img
          alt="Logo"
          src={toAbsoluteUrl("media/logos/LOGO.png")}
          className="h-50px mb-10 app-sidebar-logo-default"
        />
        <h1 className="text-gray-900 fw-bolder mb-3">Welcome back</h1>
        <div className="text-gray-500 fw-semibold fs-6">
          Welcome Back! Please enter your details
        </div>
      </div>

      <div className="fv-row mb-8">
        <label className="form-label fs-6 fw-bolder text-gray-900">Email</label>
        <input
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.email && formik.errors.email },
            { "is-valid": formik.touched.email && !formik.errors.email }
          )}
          type="email"
          name="email"
          autoComplete="off"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="fv-plugins-message-container">
            <span role="alert">{formik.errors.email}</span>
          </div>
        )}
      </div>

      <div className="fv-row mb-3">
        <label className="form-label fw-bolder text-gray-900 fs-6 mb-0">
          Password
        </label>
        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          {...formik.getFieldProps("password")}
          className={clsx(
            "form-control bg-transparent",
            { "is-invalid": formik.touched.password && formik.errors.password },
            { "is-valid": formik.touched.password && !formik.errors.password }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className="fv-plugins-message-container">
            <div className="fv-help-block">
              <span role="alert">{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      <div className="d-grid mb-3">
        <Link to="/auth/forgot-password" className="link-primary fs-6 fw-bolder">
          Forgot Password?
        </Link>
      </div>
      <div className="d-grid mb-10">
        <button
          type="submit"
          id="kt_sign_in_submit"
          className="btn btn-primary"
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className="indicator-label">SIGN IN</span>}
          {loading && (
            <span className="indicator-progress" style={{ display: "block" }}>
              Please wait...
              <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
            </span>
          )}
        </button>
      </div>
    </form>
  );
}
