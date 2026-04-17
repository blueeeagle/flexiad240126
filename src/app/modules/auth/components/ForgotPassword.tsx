import { useState } from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import { Link, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import { requestPassword, verificationCode } from '../core/_requests'

export function ForgotPassword() {
  const [loading, setLoading] = useState(false)
  const [hasErrors, setHasErrors] = useState<boolean | undefined>(undefined)
  const [showOtp, setShowOtp] = useState(false)
  const [otpSuccess, setOtpSuccess] = useState(false)
  const [emailSuccess, setEmailSuccess] = useState(false)

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
    },
    validationSchema: showOtp
      ? Yup.object({
          otp: Yup.string().required('OTP is required'),
        })
      : Yup.object({
          email: Yup.string()
            .email('Wrong email format')
            .required('Email is required'),
        }),

    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setLoading(true)

      // 🔥 Reset states before new action
      setHasErrors(undefined)
      setEmailSuccess(false)
      setOtpSuccess(false)

      try {
        if (!showOtp) {
          // ✅ STEP 1: Send Email
          await requestPassword(values.email)

          setEmailSuccess(true)
          setShowOtp(true)
          setHasErrors(false)
        } else {
          // ✅ STEP 2: Verify OTP
          await verificationCode(values.otp)

          setOtpSuccess(true)
          setHasErrors(false)

          // ✅ Navigate after showing success
          setTimeout(() => {
            navigate('/auth/change-password')
          }, 2000)
        }
      } catch (err) {
        setHasErrors(true)
        setStatus('Something went wrong')
      }

      setLoading(false)
      setSubmitting(false)
    },
  })

  return (
    <form onSubmit={formik.handleSubmit} className='form w-100'>
      <div className='text-center mb-10'>
        <h1 className='fw-bolder mb-3'>Forgot Password ?</h1>
        <div className='text-gray-500'>
          {!showOtp
            ? 'Enter your email to reset your password.'
            : 'Enter the OTP sent to your email.'}
        </div>
      </div>

      {/* ❌ ERROR MESSAGE */}
      {hasErrors && (
        <div className='alert alert-danger'>
          Something went wrong. Please try again.
        </div>
      )}

      {/* ✅ EMAIL SUCCESS */}
      {emailSuccess && !otpSuccess && (
        <div className='alert alert-success'>
          Email sent successfully ✅
        </div>
      )}

      {/* ✅ OTP SUCCESS */}
      {otpSuccess && (
        <div className='alert alert-success'>
          OTP verified successfully ✅ Redirecting...
        </div>
      )}

      {/* 📧 EMAIL FIELD */}
      {!showOtp && (
        <div className='mb-8'>
          <label>Email</label>
          <input
            type='email'
            {...formik.getFieldProps('email')}
            className={clsx('form-control', {
              'is-invalid': formik.touched.email && formik.errors.email,
              'is-valid': formik.touched.email && !formik.errors.email,
            })}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='text-danger'>{formik.errors.email}</div>
          )}
        </div>
      )}

      {/* 🔐 OTP FIELD */}
      {showOtp && !otpSuccess && (
        <div className='mb-8'>
          <label>Enter OTP</label>
          <input
            type='text'
            {...formik.getFieldProps('otp')}
            className={clsx('form-control', {
              'is-invalid': formik.touched.otp && formik.errors.otp,
              'is-valid': formik.touched.otp && !formik.errors.otp,
            })}
          />
          {formik.touched.otp && formik.errors.otp && (
            <div className='text-danger'>{formik.errors.otp}</div>
          )}
        </div>
      )}

      {/* 🔘 BUTTONS */}
      {!otpSuccess && (
        <div className='text-center'>
          <button type='submit' className='btn btn-primary me-4'>
            {loading
              ? 'Please wait...'
              : showOtp
              ? 'Verify OTP'
              : 'Send OTP'}
          </button>

          <Link to='/auth/login'>
            <button type='button' className='btn btn-light'>
              Cancel
            </button>
          </Link>
        </div>
      )}
    </form>
  )
}