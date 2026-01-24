import {FC , useState, useEffect} from 'react';
import * as Yup from 'yup';
import { PageTitle } from '../../../../_metronic/layout/core';
import {useFormik} from 'formik';
import clsx from 'clsx';
import AlertBox from '../../../../common/AlertBox';
import { postRequest , patchRequest } from '../../../modules/auth/core/_requests';  
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

const currencySchema = Yup.object().shape({
    currencyName: Yup.string()
      .min(3, 'Minimum 3 Character')
      .max(50, 'Maximum 50 Character')
      .required('Currency Name is required'),
    currencyCode: Yup.string()
      .min(3, 'Minimum 3 Character')
      .max(50, 'Maximum 50 Character')
      .required('Currency Code is required'),
    currencySymbol : Yup.string()
      .min(1, 'Minimum 1 Character')
      .max(50, 'Maximum 50 Character')
      .required('Currency Symbol is required'),  
    currencyCents : Yup.string()
      .min(1, 'Minimum 1 Character')
      .max(50, 'Maximum 50 Character')
      .required('Currency Cents is required'),   
    centValue : Yup.number()
       .required('Currency Value is required'),   
    decimalPoints : Yup.number()
       .required('Currency Value is required'),   

})

const CurrencyDetail : FC = () => {
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState(``);
    const [errorMsg, setErrorMsg] = useState(``);
    const [isFailed, setIsFailed] = useState(false);
    const {currencyId} = useParams();
    const initialValues = {
        currencyName: '',
        currencyCode: '',
        currencySymbol: '',
        currencyCents: '',
        centValue: '',
        decimalPoints: ''
    }

    const [formData, setFormData] = useState(initialValues);
   
    const closeAlert = () => {
        if(isSuccess) setIsSuccess(false);
        if(isFailed) setIsFailed(false);
    }

    const formik = useFormik({
        initialValues : formData ,
        enableReinitialize:true,
        validationSchema: currencySchema,
        onSubmit: async (values) => {
          setLoading(true);

          let reqBody = {
            currency : values?.currencyName,
            currencySymbol : values?.currencySymbol,
            currencyCode : values?.currencyCode,
            currencyCents : values?.currencyCents,
            centValue : values?.centValue,
            decimalPoints : values?.decimalPoints,
        }

          try {
            
            if(currencyId !== 'create') {
                await patchRequest(`/master/currency/${currencyId}`, reqBody)
                .then((response) => {
                    if(response?.data?.status === 'ok') {
                        setIsSuccess(true);
                        setSuccessMsg(`Currency has been updated successfully`);
                        setLoading(false);
                    } else {
                        setIsFailed(true);
                        setLoading(false);
                        setErrorMsg(`Something Went Wrong`);
                    }
                });
            } else {
                await postRequest(`/master/currency`, reqBody)
                .then((response) => {
                    if(response?.data?.status === 'ok') {
                        setIsSuccess(true);
                        setSuccessMsg(`Currency has been added successfully`);
                        setLoading(false);
                    } else {
                        setIsFailed(true);
                        setLoading(false);
                        setErrorMsg(`Something Went Wrong`);
                    }
                });
            }
          } catch (error) {
            setIsFailed(true);
            setLoading(false);
            setErrorMsg(`Something Went Wrong`);
          }
      
        },
    })

    const getData = async () => {
        setLoading(true);
        if(currencyId !== 'create') {
            let reqBody =  {
                "_id": currencyId

           }   

          await postRequest(`/master/currencies`,reqBody)
          .then((response) => {
            if(response?.data?.status === 'ok') {
                let dataObj = response?.data?.data[0];
                let initialValues = {
                    currencyName: dataObj?.currency,
                    currencyCode: dataObj?.currencyCode,
                    currencySymbol: dataObj?.currencySymbol,
                    currencyCents: dataObj?.currencyCents,
                    centValue: dataObj?.centValue,
                    decimalPoints: dataObj?.decimalPoints
                }
                setFormData(initialValues);
            }
          });

        
        }    
        setLoading(false);
    }    

    useEffect(() => {

        async function loadData () {
              await getData();   
        }
        loadData ();
    },[]) 

    return (
        <>
          <PageTitle>ADD/UPDATE CURRENCY</PageTitle>
          {loading ? (
              <div
                className="text-center"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "50vh",
                }}
              >
                <Lottie
                  animationData={loaderAnimation}
                  loop={true}
                  style={{
                    width: 150,
                    height: 150,
                    filter: "hue-rotate(200deg)", // Adjust the degree for a blue effect
                  }}
                />
              </div>
            ) : (
          <div className='row g-5 g-xl-8'>
                <div className={`card `}>

                    <div className='card-body py-3'>
                        <form
                            className='form w-100'
                            onSubmit={formik.handleSubmit}
                            noValidate
                            id='kt_login_signin_form'
                        >
                            <div className='row mb-12'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Currency Title</label>

                                <div className='col-lg-8'>
                                    <div className='row'>
                                        <div className='col-lg-12 fv-row'>
                                            <input
                                            type='text'
                                            {...formik.getFieldProps('currencyName')}
                                            className={clsx(
                                                'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                {'is-invalid': formik.touched.currencyName && formik.errors.currencyName},
                                                {
                                                  'is-valid': formik.touched.currencyName && !formik.errors.currencyName,
                                                }
                                              )}
                                            name='currencyName'
                                           //className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                                            placeholder='Enter Currency Name'
                                            />
                                            {formik.touched.currencyName && formik.errors.currencyName && (
                                                <div style={{color: 'red'}} className='fv-plugins-message-container'>
                                                    <span role='alert'>{formik.errors.currencyName}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>   

                            <div className='row mb-12'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Currency Code</label>

                                <div className='col-lg-8'>
                                    <div className='row'>
                                        <div className='col-lg-12 fv-row'>
                                            <input
                                            type='text'
                                            {...formik.getFieldProps('currencyCode')}
                                            name='currencyCode'
                                            
                                            className={clsx(
                                                'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                {'is-invalid': formik.touched.currencyCode && formik.errors.currencyCode},
                                                {
                                                  'is-valid': formik.touched.currencyCode && !formik.errors.currencyCode,
                                                }
                                              )}
                                            placeholder='Enter Currency Code'
                                            />
                                             {formik.touched.currencyCode && formik.errors.currencyCode && (
                                                <div style={{color: 'red'}} className='fv-plugins-message-container'>
                                                    <span role='alert'>{formik.errors.currencyCode}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>   

                            <div className='row mb-12'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Currecy Symbol</label>

                                <div className='col-lg-8'>
                                    <div className='row'>
                                        <div className='col-lg-12 fv-row'>
                                            <input
                                            type='text'
                                            {...formik.getFieldProps('currencySymbol')}
                                            name='currencySymbol'
                                            className={clsx(
                                                'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                {'is-invalid': formik.touched.currencySymbol && formik.errors.currencySymbol},
                                                {
                                                  'is-valid': formik.touched.currencySymbol && !formik.errors.currencySymbol,
                                                }
                                              )}
                                            placeholder='$'
                                            />
                                             {formik.touched.currencySymbol && formik.errors.currencySymbol && (
                                                <div style={{color: 'red'}} className='fv-plugins-message-container'>
                                                    <span role='alert'>{formik.errors.currencySymbol}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div> 

                            <div className='row mb-12'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Currency Cents</label>

                                <div className='col-lg-8'>
                                    <div className='row'>
                                        <div className='col-lg-12 fv-row'>
                                            <input
                                            type='text'
                                            {...formik.getFieldProps('currencyCents')}
                                            className={clsx(
                                                'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                {'is-invalid': formik.touched.currencyCents && formik.errors.currencyCents},
                                                {
                                                  'is-valid': formik.touched.currencyCents && !formik.errors.currencyCents,
                                                }
                                              )}
                                            name='currencyCents'
                                           //className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                                            placeholder='Enter Currency Cents'
                                            />
                                            {formik.touched.currencyCents && formik.errors.currencyCents && (
                                                <div style={{color: 'red'}} className='fv-plugins-message-container'>
                                                    <span role='alert'>{formik.errors.currencyCents}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>   

                            <div className='row mb-12'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Cent Value</label>

                                <div className='col-lg-8'>
                                    <div className='row'>
                                        <div className='col-lg-12 fv-row'>
                                            <input
                                            type='text'
                                            {...formik.getFieldProps('centValue')}
                                            className={clsx(
                                                'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                {'is-invalid': formik.touched.centValue && formik.errors.centValue},
                                                {
                                                  'is-valid': formik.touched.centValue && !formik.errors.centValue,
                                                }
                                              )}
                                            name='centValue'
                                           //className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                                            placeholder='Enter Cent Value'
                                            />
                                            {formik.touched.centValue && formik.errors.centValue && (
                                                <div style={{color: 'red'}} className='fv-plugins-message-container'>
                                                    <span role='alert'>{formik.errors.centValue}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='row mb-12'>
                                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Decimal Points</label>

                                <div className='col-lg-8'>
                                    <div className='row'>
                                        <div className='col-lg-12 fv-row'>
                                            <input
                                            type='text'
                                            {...formik.getFieldProps('decimalPoints')}
                                            className={clsx(
                                                'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                {'is-invalid': formik.touched.decimalPoints && formik.errors.decimalPoints},
                                                {
                                                  'is-valid': formik.touched.decimalPoints && !formik.errors.decimalPoints,
                                                }
                                              )}
                                            name='decimalPoints'
                                           //className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                                            placeholder='Enter Decimal Points'
                                            />
                                            {formik.touched.decimalPoints && formik.errors.decimalPoints && (
                                                <div style={{color: 'red'}} className='fv-plugins-message-container'>
                                                    <span role='alert'>{formik.errors.decimalPoints}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='card-footer d-flex justify-content-end py-6 px-9'>
                                <button type='submit' className='btn btn-primary' disabled={loading}>
                                    {!loading && 'Save Changes'}
                                    {loading && (
                                        <span className='indicator-progress' style={{display: 'block'}}>
                                        Please wait...{' '}
                                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                                        </span>
                                    )}
                                </button>
                             </div>
                        </form>    
                    </div>
                </div>    
          </div>  
            )}
          { isSuccess && <AlertBox redirectUrl={`/currency`} close={closeAlert} type={`success`}>{successMsg}</AlertBox> }
          { isFailed && <AlertBox   redirectUrl={null} close={closeAlert} type={`error`}>{errorMsg}</AlertBox> }
        </>
    )
}

export default CurrencyDetail;