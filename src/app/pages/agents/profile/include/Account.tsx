import React, { memo } from 'react';
import clsx from 'clsx';

const Account = (props: any) => {

    return (
        <>
            <div className='row mb-12'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Mobile Number</label>

                <div className='col-lg-8'>
                    <div className='row'>
                        <div className='col-lg-12 fv-row'>
                            <input
                                type='text'
                                className={clsx(
                                    'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                    { 'is-invalid': props?.formik.touched.mobile && props?.formik.errors.mobile },
                                    {
                                        'is-valid': props?.formik.touched.mobile && !props?.formik.errors.mobile,
                                    }
                                )}
                                placeholder='Enter Mobile Number'
                                {...props?.formik.getFieldProps('mobile')}
                                disabled={true}
                            />
                            {props?.formik.touched.mobile && props?.formik.errors.mobile && (
                                <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                    <span role='alert'>{props?.formik.errors.mobile
                                    }</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mb-12'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Email</label>

                <div className='col-lg-8'>
                    <div className='row'>
                        <div className='col-lg-12 fv-row'>
                            <input
                                type='email'
                                className={clsx(
                                    'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                    { 'is-invalid': props?.formik.touched.email && props?.formik.errors.email },
                                    {
                                        'is-valid': props?.formik.touched.email && !props?.formik.errors.email,
                                    }
                                )}
                                placeholder='Enter Email'
                                {...props?.formik.getFieldProps('email')}
                                disabled={true}
                            />
                            {props?.formik.touched.email && props?.formik.errors.email && (
                                <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                    <span role='alert'>{props?.formik.errors.email
                                    }</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <h1>Change Password</h1>

            <div className='row mb-12'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>New password</label>

                <div className='col-lg-8'>
                    <div className='row'>
                        <div className='col-lg-12 fv-row'>
                            <input
                                type='password'
                                className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                                placeholder='Enter password'
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='row mb-12'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Confirm password</label>

                <div className='col-lg-8'>
                    <div className='row'>
                        <div className='col-lg-12 fv-row'>
                            <input
                                type='password'
                                className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                                placeholder='Enter password'
                            />
                        </div>
                        <div className='pt-15'>
                            <div className='mr-2'>
                                <button
                                    type='button'
                                    className='btn btn-lg btn-light-success me-3'
                                >
                                    Change Password
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default memo(Account);