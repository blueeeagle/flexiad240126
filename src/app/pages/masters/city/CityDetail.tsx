// import { FC, useState, useEffect } from "react";
// import * as Yup from "yup";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { useFormik } from "formik";
// import clsx from "clsx";
// import AlertBox from "../../../../common/AlertBox";
// import {
//   postRequest,
//   patchRequest,
// } from "../../../modules/auth/core/_requests";
// import { useParams } from "react-router-dom";
// import { get } from "http";
// import Lottie from 'lottie-react';
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

// const citySchema = Yup.object().shape({
//   name: Yup.string()
//     .min(3, "Minimum 3 Character")
//     .max(50, "Maximum 50 Character")
//     .required("City Name is required"),
 
//   countryId: Yup.string().required("Country is required"),
// });

// const CityDetail: FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const [states, setStates] = useState([]);
//   const { cityId } = useParams();

//   const initialValues = {
//     name: "",
//     stateId: "",
//     countryId: "",
//   };

//   const [formData, setFormData] = useState(initialValues);
//   const [countryList, setCountryList] = useState([]);
//   const [stateList, setStateList] = useState([]);
//   const [stateId, setStateId] = useState("");
//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   const formik = useFormik({
//     initialValues: formData,
//     enableReinitialize: true,
//     validationSchema: citySchema,
//     onSubmit: async (values) => {
//       setLoading(true);

//       let reqBody = {
//         name: values?.name,
//         stateId: values?.stateId,
//         countryId: values?.countryId,
//       };

//       try {
//         if (cityId !== "create") {
//           await patchRequest(`/master/city/${cityId}`, reqBody).then(
//             (response) => {
//               if (response?.data?.status === "ok") {
//                 setIsSuccess(true);
//                 setSuccessMsg(`City has been updated successfully`);
//                 setLoading(false);
//               } else {
//                 setIsFailed(true);
//                 setLoading(false);
//                 setErrorMsg(`Something Went Wrong`);
//               }
//             }
//           );
//         } else {
//           await postRequest(`/master/city`, reqBody).then((response) => {
//             if (response?.data?.status === "ok") {
//               setIsSuccess(true);
//               setSuccessMsg(`City has been added successfully`);
//               setLoading(false);
//             } else {
//               setIsFailed(true);
//               setLoading(false);
//               setErrorMsg(`Something Went Wrong`);
//             }
//           });
//         }
//       } catch (error) {
//         setIsFailed(true);
//         setLoading(false);
//         setErrorMsg(`Something Went Wrong`);
//       }
//     },
//   });
//   const handleStateGet = (value: any) => {
//     setStateId(value);
//     getState(value);
//   };
//   const getState = async (value: any) => {
//     const stateData = await postRequest(`/master/states`, { countryId: value });
  
//     setStates(stateData?.data?.data)
//     const lookupObj = [stateData];
//     let data1: Array<any> = [];
//     return Promise.allSettled(lookupObj)
//       .then((result) => {
//         result.forEach((res: any) => {
//           data1.push(res.value);
//         });
//         return data1;
//       })
//       .then((d) => {
//         const dataobj = {
//           stateData: d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
//         };
//         setStateList(dataobj?.stateData);

//       });
//   };

//   const getData = async () => {
//     setLoading(true);

//     const countryData = await postRequest(`/master/countries`, ``);
  


//     const cityData =
//       cityId !== "create"
//         ? await postRequest(`/master/cities`, { _id: cityId })
//         : 0;

//     const lookupObj = [countryData, cityData];
//     let data1: Array<any> = [];

//     return Promise.allSettled(lookupObj)
//       .then((result) => {
//         result.forEach((res: any) => {
//           data1.push(res.value);
//         });
//         return data1;
//       })
//       .then((d) => {
//         const dataobj = {
//           countryData: d[0]?.data?.status === "ok" ? d[0]?.data?.data : 0,
//           cityData:
//             d[1] && d[1]?.data?.status === "ok" ? d[1]?.data?.data[0] : [],
//         };
//         setCountryList(dataobj?.countryData);

//         if (dataobj?.cityData) {
//           const initialValues = {
//             name: dataobj?.cityData?.name,
//             countryId: dataobj?.cityData?.countryId?._id,
//             stateId: dataobj?.cityData?.stateId?._id,
//           };
//           setFormData(initialValues);
//         }
//         setLoading(false);

//       });
//   };

//   useEffect(() => {
//     async function loadData() {
//       await getData();
//     }
//     loadData();
//   }, []);

// // console.log(typeof),"len");

//   return (
//     <>
//       <PageTitle>ADD/UPDATE CITY</PageTitle>
//       {loading ? (
//         <div
//           className="text-center"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "50vh",
//           }}
//         >
//           <Lottie
//             animationData={loaderAnimation}
//             loop={true}
//             style={{
//               width: 150,
//               height: 150,
//               filter: "hue-rotate(200deg)", // Adjust the degree for a blue effect
//             }}
//           />
//         </div>
//       ) : (
//         <div className="row g-5 g-xl-8">
//           <div className={`card `}>
//             <div className="card-body py-3">
//               <form onSubmit={formik.handleSubmit} noValidate className="form">
//                 <div className="row mb-12">
//                   <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                     Country
//                   </label>
//                   <div className="col-lg-8">
//                     <div className="row">
//                       <div className="col-lg-12 fv-row">
//                         <select
//                           name="countryId"
//                           value={formik.values.countryId}
//                           onChange={(event) => {
//                             const selectedCountryId = event.target.value;
//                             handleStateGet(selectedCountryId); // Custom handler
//                             formik.handleChange(event); // Formik's handler
//                           }}
//                           onBlur={formik.handleBlur} // Add onBlur to keep Formik's touched state in sync
//                           className={clsx(
//                             "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                             {
//                               "is-invalid":
//                                 formik.touched.countryId &&
//                                 formik.errors.countryId,
//                             },
//                             {
//                               "is-valid":
//                                 formik.touched.countryId &&
//                                 !formik.errors.countryId,
//                             }
//                           )}
//                         >
//                           <option value="">Select a Country...</option>
//                           {countryList.map((e: any) => (
//                             <option key={e._id} value={e._id}>
//                               {e.iso3} - {e.name}
//                             </option>
//                           ))}
//                         </select>

//                         {formik.touched.countryId && formik.errors.countryId && (
//                           <div
//                             style={{ color: "red" }}
//                             className="fv-plugins-message-container"
//                           >
//                             <span role="alert">{formik.errors.countryId}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                { states.length > 0 &&
//                 <div className="row mb-12">
//                   <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                     State / Province
//                   </label>

//                   <div className="col-lg-8">
//                     <div className="row">
//                       <div className="col-lg-12 fv-row">
//                         <select
//                           {...formik.getFieldProps("stateId")}
//                           className={clsx(
//                             "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                             {
//                               "is-invalid":
//                                 formik.touched.stateId && formik.errors.stateId,
//                             },
//                             {
//                               "is-valid":
//                                 formik.touched.stateId && !formik.errors.stateId,
//                             }
//                           )}
//                         >
//                           <option value="">Select a State...</option>
//                           {stateList.map((e: any) => {
//                             return <option value={e._id}>{e.name}</option>;
//                           })}
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
// }
//                 <div className="row mb-12">
//                   <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                     City
//                   </label>

//                   <div className="col-lg-8">
//                     <div className="row">
//                       <div className="col-lg-12 fv-row">
//                         <input
//                           {...formik.getFieldProps("name")}
//                           type="text"
//                           className={clsx(
//                             "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                             {
//                               "is-invalid":
//                                 formik.touched.name && formik.errors.name,
//                             },
//                             {
//                               "is-valid":
//                                 formik.touched.name && !formik.errors.name,
//                             }
//                           )}
//                           placeholder="Enter City"
//                         />
//                         {formik.touched.name && formik.errors.name && (
//                           <div
//                             style={{ color: "red" }}
//                             className="fv-plugins-message-container"
//                           >
//                             <span role="alert">{formik.errors.name}</span>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="card-footer d-flex justify-content-end py-6 px-9">
//                   <button
//                     type="submit"
//                     className="btn btn-primary"
//                     disabled={loading}
//                   >
//                     {!loading && "Save Changes"}
//                     {loading && (
//                       <span
//                         className="indicator-progress"
//                         style={{ display: "block" }}
//                       >
//                         Please wait...{" "}
//                         <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//                       </span>
//                     )}
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//       {isSuccess && (
//         <AlertBox redirectUrl={`/city`} close={closeAlert} type={`success`}>
//           {successMsg}
//         </AlertBox>
//       )}
//       {isFailed && (
//         <AlertBox redirectUrl={null} close={closeAlert} type={`error`}>
//           {errorMsg}
//         </AlertBox>
//       )}
//     </>
//   );
// };

// export default CityDetail;



import { FC, useState, useEffect, useMemo } from "react";
import * as Yup from "yup";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useFormik } from "formik";
import clsx from "clsx";
import AlertBox from "../../../../common/AlertBox";
import {
  postRequest,
  patchRequest,
} from "../../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import Lottie from 'lottie-react';
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

// ✅ Dynamic Schema Function
const citySchema = (states = []) =>
  Yup.object().shape({
    name: Yup.string()
      .min(3, "Minimum 3 characters")
      .max(50, "Maximum 50 characters")
      .required("City Name is required"),
    stateId: Yup.string().when([], {
      is: () => states.length > 0,
      then: (schema) => schema.required("State is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    countryId: Yup.string().required("Country is required"),
  });

const CityDetail: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [states, setStates] = useState([]);
  const { cityId } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    stateId: "",
    countryId: "",
  });
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);

  const closeAlert = () => {
    setIsSuccess(false);
    setIsFailed(false);
  };

  const validationSchema = useMemo(() => citySchema(states), [states]);

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const reqBody: any = {
        name: values?.name,
        countryId: values?.countryId,
      };
    
      if (states.length > 0) {
        reqBody.stateId = values?.stateId;
      }

      try {
        const response =
          cityId !== "create"
            ? await patchRequest(`/master/city/${cityId}`, reqBody)
            : await postRequest(`/master/city`, reqBody);

        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(
            cityId !== "create"
              ? `City has been updated successfully`
              : `City has been added successfully`
          );
        } else {
          throw new Error();
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg(`Something Went Wrong`);
      } finally {
        setLoading(false);
      }
    },
  });

  const handleStateGet = (countryId: string) => {
    getState(countryId);
  };

  const getState = async (countryId: string) => {
    const stateData = await postRequest(`/master/states`, { countryId });
    setStates(stateData?.data?.data);
   
    
    const result = await Promise.allSettled([stateData]);
    const statesResponse = result[0]?.status === "fulfilled" ? result[0].value : null;
    setStateList(statesResponse?.data?.status === "ok" ? statesResponse?.data?.data : []);
  };

  const getData = async () => {
    setLoading(true);
    const countryData = await postRequest(`/master/countries`, ``);
    const cityData =
      cityId !== "create"
        ? await postRequest(`/master/cities`, { _id: cityId })
        : null;

    const result = await Promise.allSettled([countryData, cityData]);
    const countryRes = result[0]?.status === "fulfilled" ? result[0].value : null;
    const cityRes = result[1]?.status === "fulfilled" ? result[1].value : null;

    setCountryList(countryRes?.data?.status === "ok" ? countryRes?.data?.data : []);

    if (cityRes?.data?.status === "ok") {
      const city = cityRes?.data?.data[0];
      const initialValues = {
        name: city?.name,
        countryId: city?.countryId?._id,
        stateId: city?.stateId?._id,
      };
      setFormData(initialValues);
      getState(city?.countryId?._id);
    }

    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageTitle>ADD/UPDATE CITY</PageTitle>
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
            loop
            style={{ width: 150, height: 150, filter: "hue-rotate(200deg)" }}
          />
        </div>
      ) : (
        <div className="row g-5 g-xl-8">
          <div className={`card`}>
            <div className="card-body py-3">
              <form onSubmit={formik.handleSubmit} noValidate className="form">
                {/* Country Dropdown */}
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Country
                  </label>
                  <div className="col-lg-8">
                    <div className="col-lg-12 fv-row">
                      <select
                        name="countryId"
                        value={formik.values.countryId}
                        onChange={(event) => {
                          formik.handleChange(event);
                          handleStateGet(event.target.value);
                        }}
                        onBlur={formik.handleBlur}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
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
                        <option value="">Select a Country...</option>
                        {countryList.map((e: any) => (
                          <option key={e._id} value={e._id}>
                            {e.iso3} - {e.name}
                          </option>
                        ))}
                      </select>
                      {formik.touched.countryId && formik.errors.countryId && (
                        <div style={{ color: "red" }}>
                          <span role="alert">{formik.errors.countryId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* State Dropdown (conditionally shown) */}
                {states.length > 0 && (
                  <div className="row mb-12">
                    <label className="col-lg-4 col-form-label required fw-bold fs-6">
                      State / Province
                    </label>
                    <div className="col-lg-8">
                      <div className="col-lg-12 fv-row">
                        <select
                          {...formik.getFieldProps("stateId")}
                          className={clsx(
                            "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                            {
                              "is-invalid":
                                formik.touched.stateId &&
                                formik.errors.stateId,
                            },
                            {
                              "is-valid":
                                formik.touched.stateId &&
                                !formik.errors.stateId,
                            }
                          )}
                        >
                          <option value="">Select a State...</option>
                          {stateList.map((e: any) => (
                            <option key={e._id} value={e._id}>
                              {e.name}
                            </option>
                          ))}
                        </select>
                        {formik.touched.stateId && formik.errors.stateId && (
                          <div style={{ color: "red" }}>
                            <span role="alert">{formik.errors.stateId}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* City Name Input */}
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    City
                  </label>
                  <div className="col-lg-8">
                    <div className="col-lg-12 fv-row">
                      <input
                        {...formik.getFieldProps("name")}
                        type="text"
                        placeholder="Enter City"
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.name && formik.errors.name,
                          },
                          {
                            "is-valid":
                              formik.touched.name && !formik.errors.name,
                          }
                        )}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div style={{ color: "red" }}>
                          <span role="alert">{formik.errors.name}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {!loading && "Save Changes"}
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

      {/* Alert Boxes */}
      {isSuccess && (
        <AlertBox redirectUrl={`/city`} close={closeAlert} type={`success`}>
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

export default CityDetail;
