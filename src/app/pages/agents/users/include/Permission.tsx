
const Permission = (props: any) => {

   console.log(props?.permission)
   return (
    <>
         <div className='table-responsive'>
            <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                <tbody>
                  <tr>
                     <td>
                        <label className='form-check form-check-custom form-check-solid align-items-start'>
                           <span className='form-check-label d-flex flex-column align-items-start'>
                              <span className='fw-bolder fs-5 mb-0'>Module 1</span>
                           </span>
                        </label>

                     </td>
                     <td>
                        <label className='form-check form-check-custom form-check-solid align-items-start'>
                           <input
                              className='form-check-input'
                              type='checkbox'
                              value='1'
                              data-kt-check='true'
                              data-kt-check-target='.widget-9-check'
                           />
                            <span className='form-check-label d-flex flex-column align-items-start'>
                              <span className='fw-bolder fs-5 mb-0'>Add</span>
                           </span>
                        </label>
                     </td>
                     <td>
                        <label className='form-check form-check-custom form-check-solid align-items-start'>
                           <input
                              className='form-check-input'
                              type='checkbox'
                              value='1'
                              data-kt-check='true'
                              data-kt-check-target='.widget-9-check'
                           />
                             <span className='form-check-label d-flex flex-column align-items-start'>
                              <span className='fw-bolder fs-5 mb-0'>Edit</span>
                           </span>
                        </label>
                     </td>
                     <td>
                        <label className='form-check form-check-custom form-check-solid align-items-start'>
                           <input
                              className='form-check-input'
                              type='checkbox'
                              value='1'
                              data-kt-check='true'
                              data-kt-check-target='.widget-9-check'
                           />
                           <span className='form-check-label d-flex flex-column align-items-start'>
                              <span className='fw-bolder fs-5 mb-0'>Delete</span>
                           </span>
                        </label>
                     </td>
                  </tr>

                  <tr>
                     <td>
                        <label className='form-check form-check-custom form-check-solid align-items-start'>
                           <span className='form-check-label d-flex flex-column align-items-start'>
                              <span className='fw-bolder fs-5 mb-0'>Module 2</span>
                           </span>
                        </label>

                     </td>
                     <td>
                        <label className='form-check form-check-custom form-check-solid align-items-start'>
                           <input
                              className='form-check-input'
                              type='checkbox'
                              value='1'
                              data-kt-check='true'
                              data-kt-check-target='.widget-9-check'
                           />
                            <span className='form-check-label d-flex flex-column align-items-start'>
                              <span className='fw-bolder fs-5 mb-0'>Add</span>
                           </span>
                        </label>
                     </td>
                     <td>
                        <label className='form-check form-check-custom form-check-solid align-items-start'>
                           <input
                              className='form-check-input'
                              type='checkbox'
                              value='1'
                              data-kt-check='true'
                              data-kt-check-target='.widget-9-check'
                           />
                             <span className='form-check-label d-flex flex-column align-items-start'>
                              <span className='fw-bolder fs-5 mb-0'>Edit</span>
                           </span>
                        </label>
                     </td>
                     <td>
                        <label className='form-check form-check-custom form-check-solid align-items-start'>
                           <input
                              className='form-check-input'
                              type='checkbox'
                              value='1'
                              data-kt-check='true'
                              data-kt-check-target='.widget-9-check'
                           />
                           <span className='form-check-label d-flex flex-column align-items-start'>
                              <span className='fw-bolder fs-5 mb-0'>Delete</span>
                           </span>
                        </label>
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
    </>
   )
} 

export default Permission;