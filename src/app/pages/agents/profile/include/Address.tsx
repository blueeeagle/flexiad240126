import React, {memo} from 'react';
import clsx from 'clsx';

const Address = (props:any)  => {
   return (
      <>
           <div className='row mb-12'>
               <label className='col-lg-4 col-form-label required fw-bold fs-6'>No & Street/Road</label>

               <div className='col-lg-8'>
                   <div className='row'>
                       <div className='col-lg-12 fv-row'>
                           <input
                               type='text'
                               className={clsx(
                                   'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                   { 'is-invalid': props?.formik.touched.street && props?.formik.errors.street },
                                   {
                                       'is-valid': props?.formik.touched.street && !props?.formik.errors.street,
                                   }
                               )}
                               placeholder='Enter No & Street/Road'
                               {...props?.formik.getFieldProps('street')}
                               disabled={true}
                           />
                           {props?.formik.touched.street && props?.formik.errors.street && (
                               <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                   <span role='alert'>{props?.formik.errors.street
                                   }</span>
                               </div>
                           )}
                       </div>
                   </div>
               </div>
           </div>

           <div className='row mb-12'>
               <label className='col-lg-4 col-form-label required fw-bold fs-6'>Apartment, Building, Flat</label>

               <div className='col-lg-8'>
                   <div className='row'>
                       <div className='col-lg-12 fv-row'>
                           <input
                               type='text'
                               className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                               placeholder='Enter Apartment, Building, Flat'
                               {...props?.formik.getFieldProps('building')}
                               disabled={true}
                           />
                       </div>
                   </div>
               </div>
           </div>
           <div className='row mb-12'>
               <label className='col-lg-4 col-form-label required fw-bold fs-6'>Block</label>

               <div className='col-lg-8'>
                   <div className='row'>
                       <div className='col-lg-12 fv-row'>
                           <input
                               type='text'
                               className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                               placeholder='block'
                               {...props?.formik.getFieldProps('block')}
                               disabled={true}
                           />
                       </div>
                   </div>
               </div>
           </div>
           <div className='row mb-12'>
               <label className='col-lg-4 col-form-label required fw-bold fs-6'>Area</label>

               <div className='col-lg-8'>
                   <div className='row'>
                       <div className='col-lg-9 fv-row'>
                           <select 
                                 className={clsx(
                                    'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                    {'is-invalid': props?.formik.touched.areaId && props?.formik.errors.areaId},
                                    {
                                      'is-valid': props?.formik.touched.areaId && !props?.formik.errors.areaId,
                                    }
                                  )}
                                  {...props?.formik.getFieldProps('areaId')}
                                  disabled={true}
                           >
                               
                               <option value=''>Select Area...</option>
                               {
                                   props?.areaList.map((e: any) => {
                                       return <option value={e._id}>{e.name}</option>
                                   })}
                           </select>

                           {props?.formik.touched.areaId && props?.formik.errors.areaId && (
                               <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                   <span role='alert'>{props?.formik.errors.areaId
                                   }</span>
                               </div>
                           )}
                       </div>
                   </div>
               </div>
           </div>


           <div className='row mb-12'>
               <label className='col-lg-4 col-form-label required fw-bold fs-6'>Country</label>

               <div className='col-lg-8'>
                   <div className='row'>
                       <div className='col-lg-9 fv-row'>
                           <select 
                               {...props?.formik.getFieldProps('countryId')}
                               className={clsx(
                                'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                {'is-invalid': props?.formik.touched.countryId && props?.formik.errors.countryId},
                                {
                                  'is-valid': props?.formik.touched.countryId && !props?.formik.errors.countryId,
                                }
                              )}
                              disabled={true}
                           >
                               <option value=''>Select Country...</option>
                               {
                                   props?.countryList.map((e: any) => {
                                       return <option value={e._id}>{e.name}</option>
                                   })}
                           </select>
                           {props?.formik.touched.countryId && props?.formik.errors.countryId && (
                               <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                   <span role='alert'>{props?.formik.errors.countryId
                                   }</span>
                               </div>
                           )}
                       </div>
                   </div>
               </div>
           </div>

           <div className='row mb-12'>
               <label className='col-lg-4 col-form-label required fw-bold fs-6'>State</label>

               <div className='col-lg-8'>
                   <div className='row'>
                       <div className='col-lg-9 fv-row'>
                           <select 
                               {...props?.formik.getFieldProps('stateId')}
                               className={clsx(
                                'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                {'is-invalid': props?.formik.touched.stateId && props?.formik.errors.stateId},
                                {
                                  'is-valid': props?.formik.touched.stateId && !props?.formik.errors.stateId,
                                }
                              )}
                              disabled={true}
                           >
                               <option value=''>Select State...</option>
                               {
                                   props?.stateList.map((e: any) => {
                                       return <option value={e._id}>{e.name}</option>
                                   })}
                           </select>
                           {props?.formik.touched.stateId && props?.formik.errors.stateId && (
                               <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                   <span role='alert'>{props?.formik.errors.stateId
                                   }</span>
                               </div>
                           )}
                       </div>
                   </div>
               </div>
           </div>

           <div className='row mb-12'>
               <label className='col-lg-4 col-form-label required fw-bold fs-6'>City</label>

               <div className='col-lg-8'>
                   <div className='row'>
                       <div className='col-lg-9 fv-row'>
                           <select  {...props?.formik.getFieldProps('cityId')}
                                className={clsx(
                                    'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                    {'is-invalid': props?.formik.touched.cityId && props?.formik.errors.cityId},
                                    {
                                      'is-valid': props?.formik.touched.cityId && !props?.formik.errors.cityId,
                                    }
                                  )}
                                   disabled={true}
                           >
                               <option value=''>Select City...</option>
                               {
                                   props?.cityList.map((e: any) => {
                                       return <option value={e._id}>{e.name}</option>
                                   })}
                           </select>
                           {props?.formik.touched.cityId && props?.formik.errors.cityId && (
                               <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                   <span role='alert'>{props?.formik.errors.cityId
                                   }</span>
                               </div>
                           )}
                       </div>
                   </div>
               </div>
           </div>

           <div className='row mb-12'>
               <label className='col-lg-4 col-form-label required fw-bold fs-6'>Zip Code</label>

               <div className='col-lg-8'>
                   <div className='row'>
                       <div className='col-lg-12 fv-row'>
                           <input
                               type='text'
                               className={clsx(
                                   'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                   { 'is-invalid': props?.formik.touched.zipcode && props?.formik.errors.zipcode },
                                   {
                                       'is-valid': props?.formik.touched.zipcode && !props?.formik.errors.zipcode,
                                   }
                               )}
                               placeholder='Zip Code'
                               {...props?.formik.getFieldProps('zipcode')}
                               disabled={true}
                           />
                           {props?.formik.touched.zipcode && props?.formik.errors.zipcode && (
                               <div style={{ color: 'red' }} className='fv-plugins-message-container'>
                                   <span role='alert'>{props?.formik.errors.zipcode
                                   }</span>
                               </div>
                           )}
                       </div>
                   </div>
               </div>
           </div>

   
    </>
    ) 
}

export default memo(Address);
