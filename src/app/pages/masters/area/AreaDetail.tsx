// import { FC, useState, useEffect } from 'react';
// import * as Yup from 'yup';
// import { PageTitle } from '../../../../_metronic/layout/core';
// import { useFormik } from 'formik';
// import clsx from 'clsx';
// import AlertBox from '../../../../common/AlertBox';
// import { postRequest, patchRequest } from '../../../modules/auth/core/_requests';
// import { useParams } from 'react-router-dom';
// import Lottie from 'lottie-react';
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

// const areaSchema = Yup.object().shape({
//     name: Yup.string()
//         .min(3, 'Minimum 3 Character')
//         .max(50, 'Maximum 50 Character')
//         .required('Area Name is required'),
//     stateId: Yup.string()
//         .required('State is required'),
//     cityId: Yup.string()
//         .required('City is required'),
//     zipcode: Yup.number()
//         .required('Zipcode is required'),
//     countryId: Yup.string()
//         .required('Country is required'),
// })


// const AreaDetail: FC = () => {
//     const [loading, setLoading] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);
//     const [successMsg, setSuccessMsg] = useState(``);
//     const [errorMsg, setErrorMsg] = useState(``);
//     const [isFailed, setIsFailed] = useState(false);
//     const { areaId } = useParams();

//     const initialValues = {
//         name: '',
//         stateId: '',
//         countryId: '',
//         cityId: '',
//         zipcode: ''
//     }

//     const [formData, setFormData] = useState(initialValues);
//     const [countryList, setCountryList] = useState([]);
//     const [stateList, setStateList] = useState([]);
//     const [cityList, setCityList] = useState([]);
//     const [states, setStates] = useState([]);
//     const closeAlert = () => {
//         if (isSuccess) setIsSuccess(false);
//         if (isFailed) setIsFailed(false);
//     }

//     const formik = useFormik({
//         initialValues: formData,
//         enableReinitialize: true,
//         validationSchema: areaSchema,
//         onSubmit: async (values) => {
//             setLoading(true);

//             let reqBody = {
//                 name: values?.name,
//                 stateId: values?.stateId,
//                 countryId: values?.countryId,
//                 cityId: values?.cityId,
//                 zipcode: values?.zipcode,
//             }

//             try {

//                 if (areaId !== 'create') {
//                     await patchRequest(`/master/area/${areaId}`, reqBody)
//                         .then((response) => {
//                             if (response?.data?.status === 'ok') {
//                                 setIsSuccess(true);
//                                 setSuccessMsg(`Area has been updated successfully`);
//                                 setLoading(false);
//                             } else {
//                                 setIsFailed(true);
//                                 setLoading(false);
//                                 setErrorMsg(`Something Went Wrong`);
//                             }
//                         });
//                 } else {
//                     await postRequest(`/master/area`, reqBody)
//                         .then((response) => {
//                             if (response?.data?.status === 'ok') {
//                                 setIsSuccess(true);
//                                 setSuccessMsg(`Area has been added successfully`);
//                                 setLoading(false);
//                             } else {
//                                 setIsFailed(true);
//                                 setLoading(false);
//                                 setErrorMsg(`Something Went Wrong`);
//                             }
//                         });
//                 }
//             } catch (error) {
//                 setIsFailed(true);
//                 setLoading(false);
//                 setErrorMsg(`Something Went Wrong`);
//             }

//         },
//     })

//     const getData = async () => {
//         setLoading(true);
//         const countryData = await postRequest(`/master/countries`, ``);
//         // const stateData = await postRequest(`/master/states`, ``);
//         const areaData = areaId !== 'create' ? await postRequest(`/master/areas`, { "_id": areaId }) : 0;
//         // const cityData = await postRequest(`/master/cities`, ``);

//         const lookupObj = [countryData, areaData];
//         let data1: Array<any> = [];
//         return Promise.allSettled(lookupObj)
//             .then((result) => {

//                 result.forEach((res: any) => {
//                     data1.push(res.value);
//                 })
//                 return data1;
//             })
//             .then((d) => {

//                 const dataobj = {
//                     countryData: d[0]?.data?.status === 'ok' ? d[0]?.data?.data : 0, 
//                     areaData: d[1] && d[1]?.data?.status === 'ok' ? d[1]?.data?.data[0] : [],
                   
//                 }
//                 setCountryList(dataobj?.countryData); 
                
//                 if (dataobj?.areaData) {
//                     const initialValues = {
//                         name: dataobj?.areaData?.name,
//                         countryId: dataobj?.areaData?.countryId?._id,
//                         stateId: dataobj?.areaData?.stateId?._id,
//                         cityId: dataobj?.areaData?.cityId?._id,
//                         zipcode: dataobj?.areaData?.zipcode,
//                     }
//                     setFormData(initialValues);
//                 }

//                 setLoading(false);
//             })

//     }


//     const handleStateGet = (value: any) => { 
//         getState(value);
//     }
//     const getState = async (value: any) => {
//         const stateData = await postRequest(`/master/states`, { 'countryId': value });
//       console.log(stateData?.data?.data);
//       setStates(stateData?.data?.data)
//         const lookupObj = [stateData];
//         let data1: Array<any> = [];
//         return Promise.allSettled(lookupObj)
//             .then((result) => {

//                 result.forEach((res: any) => {
//                     data1.push(res.value);
//                 })
//                 return data1;
//             })
//             .then((d) => {

//                 const dataobj = {
//                     stateData: d[0]?.data?.status === 'ok' ? d[0]?.data?.data : [],
//                 }
//                 setStateList(dataobj?.stateData);
                     
                
//             });
//     }


//     // const handleCityGet =async (value: any) => { 
    
       
          
    
//     //     let filter = {};

//     //     if (states.length > 0) {
//     //         console.log(states);
            
//     //       filter = { countryId: value };
//     //     } else {
//     //       filter = { stateId: value };
//     //     }
       
        
//     //     const cityData = await postRequest(`/master/cities`,filter);
//     //     const lookupObj = [cityData];
//     //     let data1: Array<any> = [];
//     //     return Promise.allSettled(lookupObj)
//     //         .then((result) => {

//     //             result.forEach((res: any) => {
//     //                 data1.push(res.value);
//     //             })
//     //             return data1;
//     //         })
//     //         .then((d) => {

//     //             const dataobj = {
//     //                 cityData: d[0] && d[0]?.data?.status === 'ok' ? d[0]?.data?.data : [],
//     //             }
//     //             setCityList(dataobj?.cityData)

//     //         });
//     // }

//     const handleCityGet = async (value: any) => {
//         const filter = states.length === 0 ? { countryId: value } : { stateId: value };
       
//         try {
//           const cityData = await postRequest(`/master/cities`, filter);
      
//           const cityList =
//             cityData?.data?.status === "ok" ? cityData?.data?.data : [];
      
//           setCityList(cityList);
//         } catch (error) {
//           console.error("Failed to fetch city data:", error);
//           setCityList([]);
//         }
//       };
      
//     useEffect(() => {

//         async function loadData() {
//             await getData();
//         }
//         loadData();
//     }, [])




//     return (
//         <>
//             <PageTitle>ADD/UPDATE AREA</PageTitle>
//             {loading ? (
//               <div
//                 className="text-center"
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "50vh",
//                 }}
//               >
//                 <Lottie
//                   animationData={loaderAnimation}
//                   loop={true}
//                   style={{
//                     width: 150,
//                     height: 150,
//                     filter: "hue-rotate(200deg)", // Adjust the degree for a blue effect
//                   }}
//                 />
//               </div>
//             ) : (
//             <div className='row g-5 g-xl-8'>
//                 <div className={`card `}>

//                     <div className='card-body py-3'>
//                         <form onSubmit={formik.handleSubmit} noValidate className='form'>
//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Country</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <select

//                                                 name="countryId"
//                                                 value={formik.values.countryId}
//                                                 onChange={(event) => {
//                                                     const selectedCountryId = event.target.value;
//                                                     handleStateGet(selectedCountryId);   // Custom handler
//                                                                  handleCityGet(selectedCountryId);
//                                                     formik.handleChange(event);          // Formik's handler
                                   


//                                                 }}
//                                                 onBlur={formik.handleBlur}
//                                                 className={clsx(
//                                                     'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
//                                                     { 'is-invalid': formik.touched.countryId && formik.errors.countryId },
//                                                     {
//                                                         'is-valid': formik.touched.countryId && !formik.errors.countryId,
//                                                     }
//                                                 )}
//                                             >
//                                                 <option value=''>Select a Country...</option>
//                                                 {
//                                                     countryList.map((e: any) => {
//                                                         return <option value={e._id}>{e.iso3} - {e.name}</option>
//                                                     })}
//                                             </select>

//                                             {formik.touched.countryId && formik.errors.countryId && (
//                                                 <div style={{ color: 'red' }} className='fv-plugins-message-container'>
//                                                     <span role='alert'>{formik.errors.countryId
//                                                     }</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>State / Province</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <select
                                            
//                                             name="stateId"
//                                             value={formik.values.stateId}
//                                             onChange={(event) => {
//                                                 // const selectedStateId = event.target.value;
//                                                 // handleCityGet(selectedStateId);   // Custom handler
//                                                 formik.handleChange(event);          // Formik's handler
//                                             }}
//                                             onBlur={formik.handleBlur} 
//                                                 className={clsx(
//                                                     'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
//                                                     { 'is-invalid': formik.touched.stateId && formik.errors.stateId },
//                                                     {
//                                                         'is-valid': formik.touched.stateId && !formik.errors.stateId,
//                                                     }
//                                                 )}
//                                             >
//                                                 <option value=''>Select a State...</option>
//                                                 {
//                                                     stateList.map((e: any) => {
//                                                         return <option value={e._id}>{e.name}</option>
//                                                     })}
//                                             </select>

//                                             {formik.touched.stateId && formik.errors.stateId && (
//                                                 <div style={{ color: 'red' }} className='fv-plugins-message-container'>
//                                                     <span role='alert'>{formik.errors.stateId
//                                                     }</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>City</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <select
//                                                 {...formik.getFieldProps('cityId')}
//                                                 className={clsx(
//                                                     'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
//                                                     { 'is-invalid': formik.touched.cityId && formik.errors.cityId },
//                                                     {
//                                                         'is-valid': formik.touched.cityId && !formik.errors.cityId,
//                                                     }
//                                                 )}
//                                             >
//                                                 <option value=''>Select a City...</option>
//                                                 {
//                                                     cityList.map((e: any) => {
//                                                         return <option value={e._id}>{e.name}</option>
//                                                     })}
//                                             </select>
//                                             {formik.touched.cityId && formik.errors.cityId && (
//                                                 <div style={{ color: 'red' }} className='fv-plugins-message-container'>
//                                                     <span role='alert'>{formik.errors.cityId
//                                                     }</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Area</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <input
//                                                 {...formik.getFieldProps('name')}
//                                                 type='text'
//                                                 className={clsx(
//                                                     'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
//                                                     { 'is-invalid': formik.touched.name && formik.errors.name },
//                                                     {
//                                                         'is-valid': formik.touched.name && !formik.errors.name,
//                                                     }
//                                                 )}
//                                                 placeholder='Enter Area'
//                                             />
//                                             {formik.touched.name && formik.errors.name && (
//                                                 <div style={{ color: 'red' }} className='fv-plugins-message-container'>
//                                                     <span role='alert'>{formik.errors.name}</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Zipcode</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <input
//                                                 {...formik.getFieldProps('zipcode')}
//                                                 type='text'
//                                                 className={clsx(
//                                                     'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
//                                                     { 'is-invalid': formik.touched.zipcode && formik.errors.zipcode },
//                                                     {
//                                                         'is-valid': formik.touched.zipcode && !formik.errors.zipcode,
//                                                     }
//                                                 )}
//                                                 placeholder='Enter Zipcode'
//                                             />
//                                             {formik.touched.zipcode && formik.errors.zipcode && (
//                                                 <div style={{ color: 'red' }} className='fv-plugins-message-container'>
//                                                     <span role='alert'>{formik.errors.zipcode}</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>


//                             <div className='card-footer d-flex justify-content-end py-6 px-9'>
//                                 <button type='submit' className='btn btn-primary' disabled={loading}>
//                                     {!loading && 'Save Changes'}
//                                     {loading && (
//                                         <span className='indicator-progress' style={{ display: 'block' }}>
//                                             Please wait...{' '}
//                                             <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
//                                         </span>
//                                     )}
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//             )}
//             {isSuccess && <AlertBox redirectUrl={`/area`} close={closeAlert} type={`success`}>{successMsg}</AlertBox>}
//             {isFailed && <AlertBox redirectUrl={null} close={closeAlert} type={`error`}>{errorMsg}</AlertBox>}

//         </>
//     )
// }

// export default AreaDetail;


// imports

// import { FC, useState, useEffect } from 'react';
// import * as Yup from 'yup';
// import { PageTitle } from '../../../../_metronic/layout/core';
// import { useFormik } from 'formik';
// import clsx from 'clsx';
// import AlertBox from '../../../../common/AlertBox';
// import { postRequest, patchRequest } from '../../../modules/auth/core/_requests';
// import { useParams } from 'react-router-dom';
// import Lottie from 'lottie-react';
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

// const areaSchema = Yup.object().shape({
//   name: Yup.string().min(3, 'Minimum 3 Character').max(50, 'Maximum 50 Character').required('Area Name is required'),
// //   stateId: Yup.string().required('State is required'),
//   cityId: Yup.string().required('City is required'),
//   zipcode: Yup.number().required('Zipcode is required'),
//   countryId: Yup.string().required('Country is required'),
// });

// const AreaDetail: FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState('');
//   const [errorMsg, setErrorMsg] = useState('');
//   const [isFailed, setIsFailed] = useState(false);
//   const { areaId } = useParams();

//   const initialValues = {
//     name: '',
//     stateId: '',
//     countryId: '',
//     cityId: '',
//     zipcode: ''
//   };

//   const [formData, setFormData] = useState(initialValues);
//   const [countryList, setCountryList] = useState([]);
//   const [stateList, setStateList] = useState([]);
//   const [cityList, setCityList] = useState([]);
//   const [states, setStates] = useState([]);

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   const formik = useFormik({
//     initialValues: formData,
//     enableReinitialize: true,
//     validationSchema: areaSchema,
//     onSubmit: async (values) => {
//       setLoading(true);
//       const reqBody: any = {
//         name: values.name,
//         // stateId: values.stateId,
//         countryId: values.countryId,
//         cityId: values.cityId,
//         zipcode: values.zipcode,
//       };
    
//       if (states.length > 0) {
//         reqBody.stateId = values?.stateId;
//       }

//     //   const reqBody = {
//     //     name: values.name,
//     //     stateId: values.stateId,
//     //     countryId: values.countryId,
//     //     cityId: values.cityId,
//     //     zipcode: values.zipcode,
//     //   };

//       try {
//         if (areaId !== 'create') {
//           const response = await patchRequest(`/master/area/${areaId}`, reqBody);
//           if (response?.data?.status === 'ok') {
//             setIsSuccess(true);
//             setSuccessMsg('Area has been updated successfully');
//           } else {
//             setIsFailed(true);
//             setErrorMsg('Something Went Wrong');
//           }
//         } else {
//           const response = await postRequest(`/master/area`, reqBody);
//           if (response?.data?.status === 'ok') {
//             setIsSuccess(true);
//             setSuccessMsg('Area has been added successfully');
//           } else {
//             setIsFailed(true);
//             setErrorMsg('Something Went Wrong');
//           }
//         }
//       } catch (error) {
//         setIsFailed(true);
//         setErrorMsg('Something Went Wrong');
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const getData = async () => {
//     setLoading(true);
//     try {
//       const [countryRes, areaRes] = await Promise.all([
//         postRequest(`/master/countries`, ``),
//         areaId !== 'create' ? postRequest(`/master/areas`, { "_id": areaId }) : Promise.resolve({ data: { data: [] } })
//       ]);

//       setCountryList(countryRes?.data?.status === 'ok' ? countryRes.data.data : []);

//       if (areaRes?.data?.status === 'ok' && areaRes.data.data.length) {
//         const area = areaRes.data.data[0];
//         setFormData({
//           name: area.name,
//           countryId: area.countryId?._id,
//           stateId: area.stateId?._id,
//           cityId: area.cityId?._id,
//           zipcode: area.zipcode,
//         });

//         await getState(area.countryId?._id);
//         await handleCityGet(area.stateId?._id);
//       }
//     } catch (err) {
//       console.error("Data fetch error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getState = async (countryId: string) => {
//     try {
//       const stateData = await postRequest(`/master/states`, { countryId });
//       const states = stateData?.data?.status === 'ok' ? stateData.data.data : [];
//       setStateList(states);
//       setStates(states);
//     } catch (err) {
//       setStateList([]);
//       setStates([]);
//     }
//   };

//   const handleCityGet = async (value: any) => {
//     let filter;

//     if (states.length === 0) {
//       filter = { countryId: value };
//     } else {
//       filter = { stateId: value };
//     }

//     try {
//       const cityData = await postRequest(`/master/cities`, filter);
//       const cities = cityData?.data?.status === 'ok' ? cityData.data.data : [];
//       setCityList(cities);
//       formik.setFieldError("cityId", "");
//       formik.setFieldValue("cityId", ""); // Clear city if list refreshed
//     } catch (err) {
//       setCityList([]);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <>
//       <PageTitle>ADD/UPDATE AREA</PageTitle>
//       {loading ? (
//         <div className="text-center d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
//           <Lottie animationData={loaderAnimation} loop={true} style={{ width: 150, height: 150, filter: "hue-rotate(200deg)" }} />
//         </div>
//       ) : (
//         <div className='row g-5 g-xl-8'>
//           <div className='card'>
//             <div className='card-body py-3'>
//               <form onSubmit={formik.handleSubmit} noValidate className='form'>

//                 {/* Country */}
//                 <div className='row mb-12'>
//                   <label className='col-lg-4 col-form-label required fw-bold fs-6'>Country</label>
//                   <div className='col-lg-8'>
//                     <select
//                       name="countryId"
//                       value={formik.values.countryId}
//                       onChange={async (event) => {
//                         const selectedCountryId = event.target.value;
//                         formik.handleChange(event);
//                         formik.setFieldValue('stateId', '');
//                         formik.setFieldValue('cityId', '');
//                         await getState(selectedCountryId);
//                         await handleCityGet(selectedCountryId);
//                       }}
//                       onBlur={formik.handleBlur}
//                       className={clsx('form-control form-control-lg form-control-solid mb-3 mb-lg-0', {
//                         'is-invalid': formik.touched.countryId && formik.errors.countryId,
//                         'is-valid': formik.touched.countryId && !formik.errors.countryId,
//                       })}
//                     >
//                       <option value=''>Select a Country...</option>
//                       {countryList.map((e: any) => (
//                         <option key={e._id} value={e._id}>{e.iso3} - {e.name}</option>
//                       ))}
//                     </select>
//                     {formik.touched.countryId && formik.errors.countryId && (
//                       <div className='fv-plugins-message-container' style={{ color: 'red' }}>
//                         <span role='alert'>{formik.errors.countryId}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* State */}
//                 <div className='row mb-12'>
//                   <label className='col-lg-4 col-form-label required fw-bold fs-6'>State / Province</label>
//                   <div className='col-lg-8'>
//                     <select
//                       name="stateId"
//                       value={formik.values.stateId}
//                       onChange={async (event) => {
//                         const selectedStateId = event.target.value;
//                         formik.handleChange(event);
//                         await handleCityGet(selectedStateId);
//                       }}
//                       onBlur={formik.handleBlur}
//                       className={clsx('form-control form-control-lg form-control-solid mb-3 mb-lg-0', {
//                         'is-invalid': formik.touched.stateId && formik.errors.stateId,
//                         'is-valid': formik.touched.stateId && !formik.errors.stateId,
//                       })}
//                     >
//                       <option value=''>Select a State...</option>
//                       {stateList.map((e: any) => (
//                         <option key={e._id} value={e._id}>{e.name}</option>
//                       ))}
//                     </select>
//                     {formik.touched.stateId && formik.errors.stateId && (
//                       <div className='fv-plugins-message-container' style={{ color: 'red' }}>
//                         <span role='alert'>{formik.errors.stateId}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* City */}
//                 <div className='row mb-12'>
//                   <label className='col-lg-4 col-form-label required fw-bold fs-6'>City</label>
//                   <div className='col-lg-8'>
//                     <select
//                       {...formik.getFieldProps('cityId')}
//                       className={clsx('form-control form-control-lg form-control-solid mb-3 mb-lg-0', {
//                         'is-invalid': formik.touched.cityId && formik.errors.cityId,
//                         'is-valid': formik.touched.cityId && !formik.errors.cityId,
//                       })}
//                     >
//                       <option value=''>Select a City...</option>
//                       {cityList.map((e: any) => (
//                         <option key={e._id} value={e._id}>{e.name}</option>
//                       ))}
//                     </select>
//                     {formik.touched.cityId && formik.errors.cityId && (
//                       <div className='fv-plugins-message-container' style={{ color: 'red' }}>
//                         <span role='alert'>{formik.errors.cityId}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Area Name */}
//                 <div className='row mb-12'>
//                   <label className='col-lg-4 col-form-label required fw-bold fs-6'>Area</label>
//                   <div className='col-lg-8'>
//                     <input
//                       {...formik.getFieldProps('name')}
//                       type='text'
//                       placeholder='Enter Area'
//                       className={clsx('form-control form-control-lg form-control-solid mb-3 mb-lg-0', {
//                         'is-invalid': formik.touched.name && formik.errors.name,
//                         'is-valid': formik.touched.name && !formik.errors.name,
//                       })}
//                     />
//                     {formik.touched.name && formik.errors.name && (
//                       <div className='fv-plugins-message-container' style={{ color: 'red' }}>
//                         <span role='alert'>{formik.errors.name}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Zipcode */}
//                 <div className='row mb-12'>
//                   <label className='col-lg-4 col-form-label required fw-bold fs-6'>Zipcode</label>
//                   <div className='col-lg-8'>
//                     <input
//                       {...formik.getFieldProps('zipcode')}
//                       type='text'
//                       placeholder='Enter Zipcode'
//                       className={clsx('form-control form-control-lg form-control-solid mb-3 mb-lg-0', {
//                         'is-invalid': formik.touched.zipcode && formik.errors.zipcode,
//                         'is-valid': formik.touched.zipcode && !formik.errors.zipcode,
//                       })}
//                     />
//                     {formik.touched.zipcode && formik.errors.zipcode && (
//                       <div className='fv-plugins-message-container' style={{ color: 'red' }}>
//                         <span role='alert'>{formik.errors.zipcode}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 <div className='card-footer d-flex justify-content-end py-6 px-9'>
//                   <button type='submit' className='btn btn-primary' disabled={loading}>
//                     {!loading ? 'Save Changes' : (
//                       <span className='indicator-progress' style={{ display: 'block' }}>
//                         Please wait... <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
//                       </span>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//       {isSuccess && <AlertBox redirectUrl={`/area`} close={closeAlert} type="success">{successMsg}</AlertBox>}
//       {isFailed && <AlertBox redirectUrl={null} close={closeAlert} type="error">{errorMsg}</AlertBox>}
//     </>
//   );
// };

// export default AreaDetail;


import { FC, useState, useEffect, useCallback, useMemo } from 'react';
import * as Yup from 'yup';
import { PageTitle } from '../../../../_metronic/layout/core';
import { useFormik } from 'formik';
import clsx from 'clsx';
import AlertBox from '../../../../common/AlertBox';
import { postRequest, patchRequest } from '../../../modules/auth/core/_requests';
import { useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

const areaSchema = (states = []) => Yup.object().shape({
  name: Yup.string().min(3, 'Minimum 3 Character').max(50, 'Maximum 50 Character').required('Area Name is required'),
  cityId: Yup.string().required('City is required'),
  zipcode: Yup.number().typeError('Zipcode must be a number').required('Zipcode is required'),
  stateId: Yup.string().when([], {
    is: () => states.length > 0,
    then: (schema) => schema.required("State is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  countryId: Yup.string().required('Country is required'),
});

const AreaDetail: FC = () => {
  const { areaId } = useParams();
  const [formData, setFormData] = useState({
    name: '',
    stateId: '',
    countryId: '',
    cityId: '',
    zipcode: ''
  });

  const [locationData, setLocationData] = useState({
    countries: [],
    states: [],
    cities: []
  });

  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: ''
  });

  const closeAlert = () => {
    setStatus({ loading: false, success: false, error: false, message: '' });
  };

  const validationSchema = useMemo(() => areaSchema(locationData.states), [locationData.states]);

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      setStatus(prev => ({ ...prev, loading: true }));
      const { name, stateId, countryId, cityId, zipcode } = values;

      const reqBody: any = { name, countryId, cityId, zipcode };
      if (locationData.states.length > 0) reqBody.stateId = stateId;

      try {
        const response = areaId !== 'create'
          ? await patchRequest(`/master/area/${areaId}`, reqBody)
          : await postRequest(`/master/area`, reqBody);

        if (response?.data?.status === 'ok') {
          setStatus({
            loading: false,
            success: true,
            error: false,
            message: areaId !== 'create' ? 'Area has been updated successfully' : 'Area has been added successfully'
          });
        } else {
          throw new Error();
        }
      } catch {
        setStatus({
          loading: false,
          success: false,
          error: true,
          message: 'Something Went Wrong'
        });
      }
    }
  });

  const getState = useCallback(async (countryId: string) => {
    try {
      const stateData = await postRequest(`/master/states`, { countryId });
      const states = stateData?.data?.status === 'ok' ? stateData.data.data : [];
      setLocationData(prev => ({ ...prev, states }));
    } catch {
      setLocationData(prev => ({ ...prev, states: [] }));
    }
  }, []);

  const handleCityGet = useCallback(async (value: string) => {
    const filter = locationData.states.length === 0
      ? { countryId: value }
      : { stateId: value };

    try {
      const cityData = await postRequest(`/master/cities`, filter);
      const cities = cityData?.data?.status === 'ok' ? cityData.data.data : [];
      setLocationData(prev => ({ ...prev, cities }));
      formik.setFieldValue("cityId", "");
      formik.setFieldError("cityId", "");
    } catch {
      setLocationData(prev => ({ ...prev, cities: [] }));
    }
  }, [locationData.states]);

  const getData = useCallback(async () => {
    setStatus(prev => ({ ...prev, loading: true }));
    try {
      const [countryRes, areaRes] = await Promise.all([
        postRequest(`/master/countries`, ``),
        areaId !== 'create' ? postRequest(`/master/areas`, { "_id": areaId }) : Promise.resolve({ data: { data: [] } })
      ]);

      const countries = countryRes?.data?.status === 'ok' ? countryRes.data.data : [];
      setLocationData(prev => ({ ...prev, countries }));

      if (areaRes?.data?.status === 'ok' && areaRes.data.data.length) {
        const area = areaRes.data.data[0];
        setFormData({
          name: area.name,
          countryId: area.countryId?._id,
          stateId: area.stateId?._id || '',
          cityId: area.cityId?._id,
          zipcode: area.zipcode,
        });

        await getState(area.countryId?._id);
        await handleCityGet(area.stateId?._id);
      }
    } catch (err) {
      console.error("Data fetch error:", err);
    } finally {
      setStatus(prev => ({ ...prev, loading: false }));
    }
  }, [areaId, getState, handleCityGet]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <PageTitle>ADD/UPDATE AREA</PageTitle>
      {status.loading ? (
        <div className="text-center d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
          <Lottie animationData={loaderAnimation} loop={true} style={{ width: 150, height: 150, filter: "hue-rotate(200deg)" }} />
        </div>
      ) : (
        <div className='row g-5 g-xl-8'>
          <div className='card'>
            <div className='card-body py-3'>
              <form onSubmit={formik.handleSubmit} noValidate className='form'>

                {/* Country */}
                <div className='row mb-12'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Country</label>
                  <div className='col-lg-8'>
                    <select
                      name="countryId"
                      value={formik.values.countryId}
                      onChange={async (event) => {
                        const selectedCountryId = event.target.value;
                        formik.setFieldValue('countryId', selectedCountryId);
                        formik.setFieldValue('stateId', '');
                        formik.setFieldValue('cityId', '');
                        formik.setFieldError('stateId', '');
                        formik.setFieldError('cityId', '');
                        await getState(selectedCountryId);
                        await handleCityGet(selectedCountryId);
                      }}
                      onBlur={formik.handleBlur}
                      className={clsx('form-control form-control-lg form-control-solid mb-3 mb-lg-0', {
                        'is-invalid': formik.touched.countryId && formik.errors.countryId,
                        'is-valid': formik.touched.countryId && !formik.errors.countryId,
                      })}
                    >
                      <option value=''>Select a Country...</option>
                      {locationData.countries.map((e: any) => (
                        <option key={e._id} value={e._id}>{e.iso3} - {e.name}</option>
                      ))}
                    </select>
                    {formik.touched.countryId && formik.errors.countryId && (
                      <div className='fv-plugins-message-container' style={{ color: 'red' }}>
                        <span role='alert'>{formik.errors.countryId}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* State (conditionally rendered) */}
                {locationData.states.length > 0 && (
                  <div className='row mb-12'>
                    <label className='col-lg-4 col-form-label fw-bold fs-6'>State / Province</label>
                    <div className='col-lg-8'>
                      <select
                        name="stateId"
                        value={formik.values.stateId}
                        onChange={async (event) => {
                          const selectedStateId = event.target.value;
                          formik.setFieldValue('stateId', selectedStateId);
                          formik.setFieldValue('cityId', '');
                          formik.setFieldError('cityId', '');
                          await handleCityGet(selectedStateId);
                        }}
                        onBlur={formik.handleBlur}
                        className={clsx('form-control form-control-lg form-control-solid mb-3 mb-lg-0', {
                          'is-invalid': formik.touched.stateId && formik.errors.stateId,
                          'is-valid': formik.touched.stateId && !formik.errors.stateId,
                        })}
                      >
                        <option value=''>Select a State...</option>
                        {locationData.states.map((e: any) => (
                          <option key={e._id} value={e._id}>{e.name}</option>
                        ))}
                      </select>
                      {formik.touched.stateId && formik.errors.stateId && (
                        <div className='fv-plugins-message-container' style={{ color: 'red' }}>
                          <span role='alert'>{formik.errors.stateId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* City */}
                <div className='row mb-12'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>City</label>
                  <div className='col-lg-8'>
                    <select
                      {...formik.getFieldProps('cityId')}
                      className={clsx('form-control form-control-lg form-control-solid mb-3 mb-lg-0', {
                        'is-invalid': formik.touched.cityId && formik.errors.cityId,
                        'is-valid': formik.touched.cityId && !formik.errors.cityId,
                      })}
                    >
                      <option value=''>Select a City...</option>
                      {locationData.cities.map((e: any) => (
                        <option key={e._id} value={e._id}>{e.name}</option>
                      ))}
                    </select>
                    {formik.touched.cityId && formik.errors.cityId && (
                      <div className='fv-plugins-message-container' style={{ color: 'red' }}>
                        <span role='alert'>{formik.errors.cityId}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Area Name */}
                <div className='row mb-12'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Area</label>
                  <div className='col-lg-8'>
                    <input
                      {...formik.getFieldProps('name')}
                      type='text'
                      placeholder='Enter Area'
                      className={clsx('form-control form-control-lg form-control-solid mb-3 mb-lg-0', {
                        'is-invalid': formik.touched.name && formik.errors.name,
                        'is-valid': formik.touched.name && !formik.errors.name,
                      })}
                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className='fv-plugins-message-container' style={{ color: 'red' }}>
                        <span role='alert'>{formik.errors.name}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Zipcode */}
                <div className='row mb-12'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Zipcode</label>
                  <div className='col-lg-8'>
                    <input
                      {...formik.getFieldProps('zipcode')}
                      type='text'
                      placeholder='Enter Zipcode'
                      className={clsx('form-control form-control-lg form-control-solid mb-3 mb-lg-0', {
                        'is-invalid': formik.touched.zipcode && formik.errors.zipcode,
                        'is-valid': formik.touched.zipcode && !formik.errors.zipcode,
                      })}
                    />
                    {formik.touched.zipcode && formik.errors.zipcode && (
                      <div className='fv-plugins-message-container' style={{ color: 'red' }}>
                        <span role='alert'>{formik.errors.zipcode}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className='card-footer d-flex justify-content-end py-6 px-9'>
                  <button type='submit' className='btn btn-primary' disabled={status.loading}>
                    {!status.loading ? 'Save Changes' : (
                      <span className='indicator-progress' style={{ display: 'block' }}>
                        Please wait... <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      {status.success && <AlertBox redirectUrl={`/area`} close={closeAlert} type="success">{status.message}</AlertBox>}
      {status.error && <AlertBox redirectUrl={null} close={closeAlert} type="error">{status.message}</AlertBox>}
    </>
  );
};

export default AreaDetail;
