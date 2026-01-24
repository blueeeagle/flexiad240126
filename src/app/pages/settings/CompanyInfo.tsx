// import { FC, useEffect, useRef, useState } from 'react';
// import { PageTitle } from '../../../_metronic/layout/core';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import clsx from 'clsx';
// import { useLocation, useParams } from 'react-router-dom';
// import { getRequest, patchRequest, postRequest } from '../../modules/auth/core/_requests';

// const CompanyInfo: FC = () => {

//     const referralSchema = Yup.object().shape({
//         postFrom: Yup.string().required('Post from is required'),
//         agentId: Yup.string().when('postFrom', {
//             is: (val: any) => val === 'Agent',
//             then: (schema) => schema.required('Agent is required'),
//             otherwise: (schema) => schema.notRequired(),
//         }),
//         companyName: Yup.string().required('Company Name is required'),
//         promocode: Yup.string().required('Promo Code is required'),
//         offertype: Yup.string().required('Offer Type is required'),
//         ordervalue: Yup.number().required('Order Value is required').positive('Must be positive'),
//         noOfCoupons: Yup.number().required('No Of Coupons is required').positive('Must be positive'),
//         usagefrequency: Yup.number().required('Usage Frequency is required').positive('Must be positive'),
//         flatorpercentage: Yup.string().required('Flat or Percentage is required'),
//         amount: Yup.number().required('Amount is required').positive('Must be positive'),
//         validityFrom: Yup.date().required('Validity From is required'),
//         validityTo: Yup.date().required('Validity To is required'),
//         service: Yup.string().required('Service is required'),
//         sortNo: Yup.number().required('Sort No is required').positive('Must be positive'),
//         imgUrl: Yup.mixed().required('Image is required'),
//     });

//     const [loading, setLoading] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);
//     const [successMsg, setSuccessMsg] = useState(``);
//     const [errorMsg, setErrorMsg] = useState(``);
//     const [isFailed, setIsFailed] = useState(false);
//     const [countryList, setCountryList] = useState([]);
//     const [currencyList, setCurrencyList] = useState([]);
//     const { referralId } = useParams();
//     const fileRef = useRef(null);

//     const initialValues = {
//         companyName: '',
//         legalName: "",
//         haveTax: false,
//         taxationNumber: "",
//         companyRegisterdDate: "",
//         street: "",
//         building: "",
//         block: "",
//         others: "",
//         countryId: "",
//         stateId: null,
//         cityId: "",
//         areaId: "",
//         zipcode: "",
//         email: "",
//         dialCode: "",
//         mobile: ""

//     };

//     const [formData, setFormData] = useState(initialValues);

//     const closeAlert = () => {
//         if (isSuccess) setIsSuccess(false);
//         if (isFailed) setIsFailed(false);
//     };

//     const formik = useFormik({
//         initialValues: formData,
//         enableReinitialize: true,
//         validationSchema: referralSchema,
//         onSubmit: async (values) => {
//             setLoading(true);

//             let reqBody = {
//                 companyName: values.companyName,
//                 legalName: values.legalName,
//                 haveTax: values.haveTax,
//                 taxationNumber: values.taxationNumber || "",      // Add missed field
//                 companyRegisterdDate: values.companyRegisterdDate || "", // Corrected the spelling and added the field
//                 addressDetails: {
//                     street: values.street || "",                    // Add missed field
//                     building: values.building || "",                // Add missed field
//                     block: values.block || "",                      // Add missed field
//                     others: values.others || "",                    // Add missed field
//                     countryId: values.countryId || "",              // Add missed field
//                     stateId: values.stateId || null,                // Add missed field
//                     cityId: values.cityId || "",                    // Add missed field
//                     areaId: values.areaId || "",                    // Add missed field
//                     zipcode: values.zipcode || "",                  // Add missed field
//                 },
//                 email: values.email || "",                      // Add missed field
//                 dialCode: values.dialCode || "",                // Add missed field
//                 mobile: values.mobile || ""                     // Add missed field
//             };

//             const requestData = new FormData();
//             requestData.append('data', JSON.stringify(reqBody));
//             // requestData.append('imgUrl', values?.imgUrl);

//             try {
//                 if (referralId !== 'create') {
//                     await patchRequest(`/activities/refferal/${referralId}`, requestData).then((response) => {
//                         if (response?.data?.status === 'ok') {
//                             setIsSuccess(true);
//                             setSuccessMsg(`Referral has been updated successfully`);
//                             setLoading(false);
//                         } else {
//                             setIsFailed(true);
//                             setLoading(false);
//                             setErrorMsg(`Something Went Wrong`);
//                         }
//                     });
//                 } else {
//                     await postRequest(`/activities/refferal`, requestData).then((response) => {
//                         if (response?.data?.status === 'ok') {
//                             setIsSuccess(true);
//                             setSuccessMsg(`Referral has been added successfully`);
//                             setLoading(false);
//                         } else {
//                             setIsFailed(true);
//                             setLoading(false);
//                             setErrorMsg(`Something Went Wrong`);
//                         }
//                     });
//                 }
//             } catch (error) {
//                 setIsFailed(true);
//                 setLoading(false);
//                 setErrorMsg(`Something Went Wrong`);
//             }
//         },
//     });

//     const getData = async () => {

//         const companyData = await getRequest(`/admin/company`,``);

//         const countryData = await postRequest(`/master/countries`, ``);
//         const currencyData = await postRequest(`/master/currencies`, ``);
//         const lookupObj = [countryData, currencyData,companyData];
//         let data1: Array<any> = [];
//         return Promise.allSettled(lookupObj)
//             .then((result) => {
//                 result.forEach((res: any) => {
//                     data1.push(res.value);
//                 });
//                 return data1;
//             })
//             .then((d) => {
//                 const dataobj = {
//                     countryData: d[0]?.data?.status === 'ok' ? d[0]?.data?.data : [],
//                     currencyData: d[1]?.data?.status === 'ok' ? d[1]?.data?.data : [],
//                     companyData: d[2]?.data?.status === 'ok' ? d[2]?.data?.data : [],
//                 };
//                 setCurrencyList(dataobj.currencyData);
//                 setCountryList(dataobj.countryData);
// console.log('dataobj.companyData.data[0];',dataobj.companyData[0]);

//                 const editData = dataobj.companyData[0];
//                 let initialValues = {
//                     companyName: editData.companyName || "",            // Filled from editData
//                     legalName: editData.legalName || "",                // Filled from editData
//                     haveTax: editData.haveTax || false,                 // Filled from editData
//                     taxationNumber: editData.taxationNumber || "",      // Filled from editData
//                     companyRegisterdDate: editData.companyRegisterdDate || "", // Corrected the spelling and filled from editData
//                     street: editData.addressDetails.street || "",                      // Filled from editData
//                     building: editData.addressDetails.building || "",                  // Filled from editData
//                     block: editData.addressDetails.block || "",                        // Filled from editData
//                     others: editData.addressDetails.others || "",                      // Filled from editData
//                     countryId: editData.addressDetails.countryId._id || "",                // Filled from editData
//                     stateId: editData.addressDetails?.stateId?._id || null,                  // Filled from editData
//                     cityId: editData.addressDetails.cityId._id || "",                      // Filled from editData
//                     areaId: editData.addressDetails.areaId._id || "",                      // Filled from editData
//                     zipcode: editData.addressDetails.zipcode || "",                    // Filled from editData
//                     email: editData.email || "",                        // Filled from editData
//                     dialCode: editData.dialCode || "",                  // Filled from editData
//                     mobile: editData.mobile || ""                       // Filled from editData
//                 };

//                 setFormData(initialValues);
//             });
//     };

//     useEffect(() => {
//         async function loadData() {
//             await getData();
//         }
//         loadData();
//     }, []);

//     return (
//         <>
//             <PageTitle>COMPANY INFO</PageTitle>
//             <div className='row g-5 g-xl-8'>
//                 <div className='card'>
//                     <div className='card-body py-3'>
//                         <form
//                             className='form w-100'
//                             onSubmit={formik.handleSubmit}
//                             noValidate
//                             id='kt_login_signin_form'
//                         >
//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Company Name</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <input
//                                                 type='text'
//                                                 {...formik.getFieldProps('companyName')}
//                                                 className={clsx(
//                                                     'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
//                                                     { 'is-invalid': formik.touched.companyName && formik.errors.companyName },
//                                                     { 'is-valid': formik.touched.companyName && !formik.errors.companyName }
//                                                 )}
//                                                 placeholder='Enter Company Name'
//                                             />
//                                             {formik.touched.companyName && formik.errors.companyName && (
//                                                 <div style={{ color: 'red' }} className='fv-plugins-message-container'>
//                                                     <span role='alert'>{formik.errors.companyName}</span>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Legal Name</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <input
//                                                 type='text'
//                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
//                                                 placeholder='Enter Legal Name'
//                                                 value='FlexClean'
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Do you have tax?</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-9 fv-row'>
//                                             <select value={'YES'}
//                                                 className='form-select form-select-solid form-select-lg fw-bold'
//                                             >
//                                                 <option value=''>Choose Yes or no...</option>
//                                                 <option value='YES'>YES</option>
//                                                 <option value='NO'>NO</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Taxation Number</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <input
//                                                 type='text'
//                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
//                                                 placeholder='Enter Taxation Number'
//                                                 value="12345"
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Company Registered On</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <input
//                                                 type='text'
//                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
//                                                 placeholder='Choose Date'
//                                                 value='12-12-2021'
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label fw-bold fs-6'>About Us</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <textarea
//                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
//                                                 placeholder='About Us'
//                                                 value='Lorum Ipsum'
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>No & Street/Road</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <input
//                                                 type='text'
//                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
//                                                 placeholder='Enter No & Street/Road'
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Apartment, Building, Flat</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-12 fv-row'>
//                                             <input
//                                                 type='text'
//                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
//                                                 placeholder='Enter Apartment, Building, Flat'
//                                                 value='12'
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Country</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-9 fv-row'>
//                                             <select value='Bahrain'
//                                                 className='form-select form-select-solid form-select-lg fw-bold'
//                                             >
//                                                 <option value=''>Select Country...</option>
//                                                 <option value='Bahrain'>Bahrain</option>
//                                                 <option value='Country'>Country</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>State</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-9 fv-row'>
//                                             <select value=''
//                                                 className='form-select form-select-solid form-select-lg fw-bold'
//                                             >
//                                                 <option value=''>Select State...</option>
//                                                 <option value='Dubai'>Dubai</option>
//                                                 <option value='Country'>State</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>City</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-9 fv-row'>
//                                             <select value='Manama'
//                                                 className='form-select form-select-solid form-select-lg fw-bold'
//                                             >
//                                                 <option value=''>Select City...</option>
//                                                 <option value='Abu Dhabi'>Manama</option>
//                                                 <option value='Country'>City</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Area</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-9 fv-row'>
//                                             <select value={`Diplomatic Area`}
//                                                 className='form-select form-select-solid form-select-lg fw-bold'
//                                             >
//                                                 <option value=''>Select Area...</option>
//                                                 <option value='Diplomatic Area'>Diplomatic Area</option>
//                                                 <option value='Area'>Area</option>
//                                             </select>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Contact Email 1</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-9 fv-row'>
//                                             <input
//                                                 type='email'
//                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
//                                                 placeholder='Enter Apartment, Building, Flat'
//                                                 value='info@flexiclean@me'
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='row mb-12'>
//                                 <label className='col-lg-4 col-form-label required fw-bold fs-6'>Contact Phone No 1</label>

//                                 <div className='col-lg-8'>
//                                     <div className='row'>
//                                         <div className='col-lg-9 fv-row'>
//                                             <input
//                                                 type='text'
//                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
//                                                 placeholder='Enter Apartment, Building, Flat'
//                                                 value='+973-34567890'
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                             <div className='card-footer d-flex justify-content-end py-6 px-9'>
//                                 <button className='btn btn-secondary'>
//                                     Cancel
//                                 </button>

//                                 <button type='submit' className='btn btn-primary' disabled={loading}>
//                                     {!loading && 'Submit'}
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
//         </>
//     )
// }

// export default CompanyInfo;

import { FC, useEffect, useRef, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import { useLocation, useParams } from "react-router-dom";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../modules/auth/core/_requests";
import moment from "moment";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import AlertBox from "../../../common/AlertBox";
const CompanyInfo: FC = () => {
  const referralSchema = Yup.object().shape({
    companyName: Yup.string().required("Company Name is required"),
    legalName: Yup.string().required("Legal Name is required"),
    haveTax: Yup.boolean().required("Have Tax is required"),
    taxationNumber: Yup.string().when("haveTax", {
      is: true,
      then: (schema) => schema.required("Taxation Number is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    companyRegisterdDate: Yup.date().required(
      "Company Registered Date is required"
    ),
    street: Yup.string().required("Street is required"),
    building: Yup.string().required("Building is required"),
    block: Yup.string().required("Block is required"),
    others: Yup.string().required("Others is required"),
    countryId: Yup.string().required("Country is required"),
    stateId: Yup.string().required("State is required"),
    cityId: Yup.string().required("City is required"),
    areaId: Yup.string().required("Area is required"),
    zipcode: Yup.string().required("Zipcode is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    dialCode: Yup.string().required("Dial Code is required"),
    mobile: Yup.string().required("Mobile number is required"),
  });

  const [loading, setLoading] = useState(false);
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const { referralId } = useParams();
  const fileRef = useRef(null);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [areaList, setAreaList] = useState([]);

  const initialValues = {
    companyName: "",
    legalName: "",
    haveTax: false,
    taxationNumber: "",
    companyRegisterdDate: "",
    street: "",
    building: "",
    block: "",
    others: "",
    countryId: "",
    stateId: "",
    cityId: "",
    areaId: "",
    zipcode: "",
    email: "",
    dialCode: "",
    mobile: "",
    company_id: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: referralSchema,
    onSubmit: async (values) => {
      setLoading(true);

      let reqBody = {
        companyName: values.companyName,
        legalName: values.legalName,
        haveTax: values.haveTax,
        taxationNumber: values.taxationNumber || "",
        companyRegisterdDate: values.companyRegisterdDate || "",
        addressDetails: {
          street: values.street || "",
          building: values.building || "",
          block: values.block || "",
          others: values.others || "",
          countryId: values.countryId || "",
          stateId: values.stateId || "",
          cityId: values.cityId || "",
          areaId: values.areaId || "",
          zipcode: values.zipcode || "",
        },
        email: values.email || "",
        dialCode: values.dialCode || "",
        mobile: values.mobile || "",
      };


      try {
        if (referralId !== "create") {
          await patchRequest(
            `/settings/company/${formData.company_id}`,
            reqBody
          ).then((response) => {
            if (response?.data?.status === "ok") {
              setIsSuccess(true);
              setSuccessMsg(`Company has been updated successfully`);
              setLoading(false);
            } else {
              setIsFailed(true);
              setLoading(false);
              setErrorMsg(`Something Went Wrong`);
            }
          });
        } else {
          await postRequest(
            `/settings/company/${formData.company_id}`,
            reqBody
          ).then((response) => {
            if (response?.data?.status === "ok") {
              setIsSuccess(true);
              setSuccessMsg(`Company has been added successfully`);
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
  });

  const getData = async () => {
    setLoadingGetData(true);
    try {
    const companyData = await getRequest(`/admin/company`, ``);
    const countryData = await postRequest(`/master/countries`, ``);
    const currencyData = await postRequest(`/master/currencies`, ``);
    const stateData = await postRequest(`/master/states`, ``);
    const cityData = await postRequest(`/master/cities`, ``);
    const areaData = await postRequest(`/master/areas`, ``);
    const lookupObj = [
      countryData,
      currencyData,
      companyData,
      stateData,
      cityData,
      areaData,
    ];
    let data1: Array<any> = [];
    return Promise.allSettled(lookupObj)
      .then((result) => {
        result.forEach((res: any) => {
          data1.push(res.value);
        });
        return data1;
      })
      .then((d) => {
        const dataobj = {
          countryData: d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
          currencyData: d[1]?.data?.status === "ok" ? d[1]?.data?.data : [],
          companyData: d[2]?.data?.status === "ok" ? d[2]?.data?.data : [],
          stateData: d[3]?.data?.status === "ok" ? d[3]?.data?.data : [],
          cityData: d[4]?.data?.status === "ok" ? d[4]?.data?.data : [],
          areaData: d[5]?.data?.status === "ok" ? d[5]?.data?.data : [],
        };
        setCurrencyList(dataobj.currencyData);
        setCountryList(dataobj.countryData);
        setStateList(dataobj.stateData);
        setCityList(dataobj.cityData);
        setAreaList(dataobj.areaData);

        const editData = dataobj.companyData[0];
console.log(editData._id);
localStorage.setItem("companyId", editData._id);
        let initialValues = {
          companyName: editData.companyName || "",
          legalName: editData.legalName || "",
          haveTax: editData.haveTax || false,
          taxationNumber: editData.taxationNumber || "",
          companyRegisterdDate:
            moment(editData.companyRegisterdDate).format("YYYY-MM-DD") || "",
          street: editData.addressDetails.street || "",
          building: editData.addressDetails.building || "",
          block: editData.addressDetails.block || "",
          others: editData.addressDetails.others || "",
          countryId: editData.addressDetails.countryId._id || "",
          stateId: editData.addressDetails?.stateId?._id || null,
          cityId: editData.addressDetails.cityId._id || "",
          areaId: editData.addressDetails.areaId._id || "",
          zipcode: editData.addressDetails.zipcode || "",
          email: editData.email || "",
          dialCode: editData.dialCode || "",
          mobile: editData.mobile || "",
          company_id: referralId === "create" ? "" : editData._id,
        };

        setFormData(initialValues);
      });
    } catch (error) {
        console.error("Error fetching data", error);
        setIsFailed(true); // Show error message if needed
      } finally {
        setLoadingGetData(false); // Hide loading indicator
      }
  };

  const handleStateGet = (value: any) => {
    getState(value);
  };
  const getState = async (value: any) => {
    const stateData = await postRequest(`/master/states`, { countryId: value });
    const lookupObj = [stateData];
    let data1: Array<any> = [];
    return Promise.allSettled(lookupObj)
      .then((result) => {
        result.forEach((res: any) => {
          data1.push(res.value);
        });
        return data1;
      })
      .then((d) => {
        const dataobj = {
          stateData: d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
        };
        setStateList(dataobj?.stateData);
        setCityList([]);
        setAreaList([]);
        formik.setFieldValue("stateId", "");
        formik.setFieldValue("cityId", "");
        formik.setFieldValue("areaId", "");
      });
  };

  const handleCityGet = (value: any) => {
    getCity(value);
  };
  const getCity = async (value: any) => {
    const cityData = await postRequest(`/master/cities`, { stateId: value });
    const lookupObj = [cityData];
    let data1: Array<any> = [];
    return Promise.allSettled(lookupObj)
      .then((result) => {
        result.forEach((res: any) => {
          data1.push(res.value);
        });
        return data1;
      })
      .then((d) => {
        const dataobj = {
          cityData: d[0] && d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
        };
        setCityList(dataobj?.cityData);
        setAreaList([]);
        formik.setFieldValue("cityId", "");
        formik.setFieldValue("areaId", "");
      });
  };
  const handleAreaGet = (value: any) => {
    getArea(value);
  };
  const getArea = async (value: any) => {
    const cityData = await postRequest(`/master/areas`, { cityId: value });
    const lookupObj = [cityData];
    let data1: Array<any> = [];
    return Promise.allSettled(lookupObj)
      .then((result) => {
        result.forEach((res: any) => {
          data1.push(res.value);
        });
        return data1;
      })
      .then((d) => {
        const dataobj = {
          areaData: d[0] && d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
        };
        setAreaList(dataobj?.areaData);
        formik.setFieldValue("areaId", "");
      });
  };

  useEffect(() => {
    async function loadData() {
      await getData();
    }
    loadData();
  }, []);

  return (
    <>
      <PageTitle>COMPANY INFO</PageTitle>
      {loadingGetData ? (
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

      <div className="row g-5 g-xl-8">
        <div className="card">
          <div className="card-body py-3">
            <form
              className="form w-100"
              onSubmit={formik.handleSubmit}
              noValidate
              id="kt_login_signin_form"
            >
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Company Name
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("companyName")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.companyName &&
                              formik.errors.companyName,
                          },
                          {
                            "is-valid":
                              formik.touched.companyName &&
                              !formik.errors.companyName,
                          }
                        )}
                        placeholder="Enter Company Name"
                      />
                      {formik.touched.companyName &&
                        formik.errors.companyName && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.companyName}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Legal Name
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("legalName")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.legalName &&
                              formik.errors.legalName,
                          },
                          {
                            "is-valid":
                              formik.touched.legalName &&
                              !formik.errors.legalName,
                          }
                        )}
                        placeholder="Enter Legal Name"
                      />
                      {formik.touched.legalName && formik.errors.legalName && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.legalName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Have Tax
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="checkbox"
                        {...formik.getFieldProps("haveTax")}
                        className="form-check-input"
                        checked={formik.values.haveTax}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {formik.values.haveTax && (
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    Taxation Number
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-12 fv-row">
                        <input
                          type="text"
                          {...formik.getFieldProps("taxationNumber")}
                          className={clsx(
                            "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                            {
                              "is-invalid":
                                formik.touched.taxationNumber &&
                                formik.errors.taxationNumber,
                            },
                            {
                              "is-valid":
                                formik.touched.taxationNumber &&
                                !formik.errors.taxationNumber,
                            }
                          )}
                          placeholder="Enter Taxation Number"
                        />
                        {formik.touched.taxationNumber &&
                          formik.errors.taxationNumber && (
                            <div
                              style={{ color: "red" }}
                              className="fv-plugins-message-container"
                            >
                              <span role="alert">
                                {formik.errors.taxationNumber}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Company Registered Date
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="date"
                        {...formik.getFieldProps("companyRegisterdDate")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.companyRegisterdDate &&
                              formik.errors.companyRegisterdDate,
                          },
                          {
                            "is-valid":
                              formik.touched.companyRegisterdDate &&
                              !formik.errors.companyRegisterdDate,
                          }
                        )}
                      />
                      {formik.touched.companyRegisterdDate &&
                        formik.errors.companyRegisterdDate && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.companyRegisterdDate}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Street
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("street")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.street && formik.errors.street,
                          },
                          {
                            "is-valid":
                              formik.touched.street && !formik.errors.street,
                          }
                        )}
                        placeholder="Enter Street"
                      />
                      {formik.touched.street && formik.errors.street && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.street}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Building
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("building")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.building && formik.errors.building,
                          },
                          {
                            "is-valid":
                              formik.touched.building &&
                              !formik.errors.building,
                          }
                        )}
                        placeholder="Enter Building"
                      />
                      {formik.touched.building && formik.errors.building && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.building}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Block
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("block")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.block && formik.errors.block,
                          },
                          {
                            "is-valid":
                              formik.touched.block && !formik.errors.block,
                          }
                        )}
                        placeholder="Enter Block"
                      />
                      {formik.touched.block && formik.errors.block && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.block}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Others
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("others")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.others && formik.errors.others,
                          },
                          {
                            "is-valid":
                              formik.touched.others && !formik.errors.others,
                          }
                        )}
                        placeholder="Enter Others"
                      />
                      {formik.touched.others && formik.errors.others && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.others}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Country
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <select
                        {...formik.getFieldProps("countryId")}
                        onChange={(event) => {
                          const selectedCountryId = event.target.value;
                          handleStateGet(selectedCountryId);
                          formik.handleChange(event);
                        }}
                        onBlur={formik.handleBlur}
                        className={clsx(
                          "form-select form-select-lg form-select-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.countryId &&
                              formik.errors.countryId,
                          },
                          {
                            "is-valid":
                              formik.touched.countryId &&
                              !formik.errors.countryId,
                          }
                        )}
                      >
                        <option value="">Select Country</option>
                        {countryList.map((country: any) => (
                          <option key={country._id} value={country._id}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.countryId && formik.errors.countryId && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.countryId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  State
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <select
                        {...formik.getFieldProps("stateId")}
                        onChange={(event) => {
                          const selectedStateId = event.target.value;
                          handleCityGet(selectedStateId); // Custom handler
                          formik.handleChange(event); // Formik's handler
                        }}
                        onBlur={formik.handleBlur}
                        className={clsx(
                          "form-select form-select-lg form-select-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.stateId && formik.errors.stateId,
                          },
                          {
                            "is-valid":
                              formik.touched.stateId && !formik.errors.stateId,
                          }
                        )}
                      >
                        <option value="">Select State</option>
                        {stateList.map((state: any) => (
                          <option key={state._id} value={state._id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.stateId && formik.errors.stateId && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.stateId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  City
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <select
                        {...formik.getFieldProps("cityId")}
                        onChange={(event) => {
                          const selectedCityId = event.target.value;
                          handleAreaGet(selectedCityId); // Custom handler
                          formik.handleChange(event); // Formik's handler
                        }}
                        onBlur={formik.handleBlur}
                        className={clsx(
                          "form-select form-select-lg form-select-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.cityId && formik.errors.cityId,
                          },
                          {
                            "is-valid":
                              formik.touched.cityId && !formik.errors.cityId,
                          }
                        )}
                      >
                        <option value="">Select City</option>
                        {cityList.map((city: any) => (
                          <option key={city._id} value={city._id}>
                            {city.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.cityId && formik.errors.cityId && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.cityId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Area
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <select
                        {...formik.getFieldProps("areaId")}
                        className={clsx(
                          "form-select form-select-lg form-select-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.areaId && formik.errors.areaId,
                          },
                          {
                            "is-valid":
                              formik.touched.areaId && !formik.errors.areaId,
                          }
                        )}
                      >
                        <option value="">Select Area</option>
                        {areaList.map((area: any) => (
                          <option key={area._id} value={area._id}>
                            {area.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.areaId && formik.errors.areaId && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.areaId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Zipcode
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("zipcode")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.zipcode && formik.errors.zipcode,
                          },
                          {
                            "is-valid":
                              formik.touched.zipcode && !formik.errors.zipcode,
                          }
                        )}
                        placeholder="Enter Zipcode"
                      />
                      {formik.touched.zipcode && formik.errors.zipcode && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.zipcode}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Email
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="email"
                        {...formik.getFieldProps("email")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.email && formik.errors.email,
                          },
                          {
                            "is-valid":
                              formik.touched.email && !formik.errors.email,
                          }
                        )}
                        placeholder="Enter Email"
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Dial Code
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("dialCode")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.dialCode && formik.errors.dialCode,
                          },
                          {
                            "is-valid":
                              formik.touched.dialCode &&
                              !formik.errors.dialCode,
                          }
                        )}
                        placeholder="Enter Dial Code"
                      />
                      {formik.touched.dialCode && formik.errors.dialCode && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.dialCode}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Mobile
                </label>
                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("mobile")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.mobile && formik.errors.mobile,
                          },
                          {
                            "is-valid":
                              formik.touched.mobile && !formik.errors.mobile,
                          }
                        )}
                        placeholder="Enter Mobile"
                      />
                      {formik.touched.mobile && formik.errors.mobile && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.mobile}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className='row'>
                                <div className='col-lg-8 offset-lg-4'>
                                    <button
                                        type='submit'
                                        className='btn btn-lg btn-primary w-100 mb-5'
                                        disabled={formik.isSubmitting || !formik.isValid}
                                    >
                                        {loading ? (
                                            <span className='indicator-label'>Please wait...</span>
                                        ) : (
                                            <span className='indicator-label'>Submit</span>
                                        )}
                                    </button>
                                    {isSuccess && (
                                        <div style={{ color: 'green' }}>
                                            <span role='alert'>{successMsg}</span>
                                        </div>
                                    )}
                                    {isFailed && (
                                        <div style={{ color: 'red' }}>
                                            <span role='alert'>{errorMsg}</span>
                                        </div>
                                    )}
                                </div>
                            </div> */}
              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <button className="btn btn-secondary m-2">Cancel</button>

                <button
                  type="submit"
                  className="btn btn-primary m-2"
                  disabled={loading}
                >
                  {!loading && "Submit"}
                  {loading && (
                    <span
                      className="indicator-progress"
                      style={{ display: "block" }}
                    >
                      Please wait...{" "}
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
       )}
       
      {isSuccess && (
        <AlertBox redirectUrl={null} close={closeAlert} type={`success`}>
          {successMsg}
        </AlertBox>
      )}
      {isFailed && (
        <AlertBox redirectUrl={null} close={closeAlert} type={`error`}>
          {errorMsg}
        </AlertBox>
      )}
    </>
  );
};

export default CompanyInfo;
