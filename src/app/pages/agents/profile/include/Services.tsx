/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {memo} from 'react';

const Services = (props:any)  => {
    return (
        <>
           
           {/* <div className='row mb-12'>
               <label className='col-lg-4 col-form-label required fw-bold fs-6'>Laundry Service</label>

               <div className='col-lg-8'>
                       <div className='col-lg-12 fv-row'>
                            <div className="mb-10">
                                <div className="form-check form-switch form-check-custom form-check-solid">
                                    <input 
                                         className='form-check-input'
                                         type='checkbox'
                                        //  {...props?.formik.getFieldProps('isDisplayOnHome')}
                                        //  //checked= {formik.getFieldProps('isDisplayOnHome')}
                                        //  checked={props?.formik?.values?.isDisplayOnHome}
                                        //  data-kt-check= {props?.formik.getFieldProps('isDisplayOnHome')}
                                         data-kt-check-target='.widget-9-check'
                                        id="flexSwitchDefault"
                                    />
                                </div>
                            </div>
                       </div>

              </div>
           </div> */}


           <div className='row mb-12'>
               <label className='col-lg-4 col-form-label required fw-bold fs-6'>Service Type</label>

               <div className='row col-lg-8'>
                   <div className='col-lg-4'>
                         <div className="mb-10">
                            <div className="form-check form-check-custom form-check-solid">
                                <input
                                    className='form-check-input'
                                    type='checkbox'
                                    {...props?.formik.getFieldProps('pos')}
                                    checked={props?.formik?.values?.pos}
                                    data-kt-check={props?.formik.getFieldProps('pos')}
                                    data-kt-check-target='.widget-9-check'
                                    id="flexSwitchDefault"
                                    disabled={true}
                                />
                                <label className="form-check-label">
                                    POS
                                </label>
                            </div>
                        </div>
                    </div>   
                    <div className='col-lg-4'>
                    <div className="form-check form-check-custom form-check-solid">
                            <input
                                className='form-check-input'
                                type='checkbox'
                                {...props?.formik.getFieldProps('online')}
                                checked={props?.formik?.values?.online}
                                data-kt-check={props?.formik.getFieldProps('online')}
                                data-kt-check-target='.widget-9-check'
                                id="flexSwitchDefault"
                                disabled={true}
                            />
                        <label className="form-check-label" >
                            Online
                        </label>
                    </div>
                    </div>   
               </div>
           </div>

           <div className='row mb-12'>
               <label className='col-lg-4 col-form-label required fw-bold fs-6'>M Logistic Support</label>

               <div className='col-lg-8'>
                       <div className='col-lg-12 fv-row'>
                            <div className="mb-10">
                                <div className="form-check form-switch form-check-custom form-check-solid">
                                    <input 
                                      className='form-check-input'
                                      type='checkbox'
                                      {...props?.formik.getFieldProps('logistics')}
                                      checked={props?.formik?.values?.logistics}
                                      data-kt-check={props?.formik.getFieldProps('logistics')}
                                      data-kt-check-target='.widget-9-check'
                                      disabled={true}
                                    />
                                    <label className="form-check-label">
                                        (M Logistic applicable for online service if enabled)
                                    </label>
                                </div>
                            </div>
                       </div>

              </div>
           </div>
        </>
    )
}

export default memo(Services);