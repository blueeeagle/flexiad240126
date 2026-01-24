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
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

// const stateSchema = Yup.object().shape({
//   name: Yup.string()
//     .min(3, "Minimum 3 Character")
//     .max(50, "Maximum 50 Character")
//     .required("State Name is required"),
//   countryId: Yup.string().required("Country Id is required"),
// });

// const StateDetail: FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const [FilteredCountry,setFilteredCountry]=useState([])
//   const { stateId } = useParams();

//   const initialValues = {
//     name: "",
//     countryId: "",
//   };

//   const [formData, setFormData] = useState(initialValues);
//   const [countryList, setCountryList] = useState([]);

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   const formik = useFormik({
//     initialValues: formData,
//     enableReinitialize: true,
//     validationSchema: stateSchema,
//     onSubmit: async (values) => {
//       setLoading(true);

//       let reqBody = {
//         name: values?.name,
//         countryId: values?.countryId,
//       };

//       try {
//         if (stateId !== "create") {
//           await patchRequest(`/master/state/${stateId}`, reqBody).then(
//             (response) => {
//               if (response?.data?.status === "ok") {
//                 setIsSuccess(true);
//                 setSuccessMsg(`State has been updated successfully`);
//                 setLoading(false);
//               } else {
//                 setIsFailed(true);
//                 setLoading(false);
//                 setErrorMsg(`Something Went Wrong`);
//               }
//             }
//           );
//         } else {
//           await postRequest(`/master/state`, reqBody).then((response) => {
//             if (response?.data?.status === "ok") {
//               setIsSuccess(true);
//               setSuccessMsg(`State has been added successfully`);
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

//   // const getData = async () => {
//   //   setLoading(true);
//   //   const countryData = await postRequest(`/master/countries`, ``);
 
    
//   //   const stateData =
//   //     stateId !== "create"
//   //       ? await postRequest(`/master/states`, { _id: stateId })
//   //       : 0;

//   //   const lookupObj = [countryData, stateData];
//   //   let data1: Array<any> = [];
//   //   return Promise.allSettled(lookupObj)
//   //     .then((result) => {
//   //       result.forEach((res: any) => {
//   //         data1.push(res.value);
//   //       });
//   //       return data1;
//   //     })
//   //     .then((d) => {
//   //       const dataobj = {
//   //         countryData: d[0]?.data?.status === "ok" ? d[0]?.data?.data : 0,
//   //         stateData:
//   //           d[1] && d[1]?.data?.status === "ok" ? d[1]?.data?.data[0] : [],
//   //       };
//   //       setCountryList(dataobj?.countryData);

//   //       if (dataobj?.stateData) {
//   //         const initialValues = {
//   //           name: dataobj?.stateData?.name,
//   //           countryId: dataobj?.stateData?.countryId?._id,
//   //         };
//   //         setFormData(initialValues);
//   //       }
//   //       setLoading(false);
//   //     });
//   // };

  
  
//   const getData = async () => {
//     setLoading(true);
//     const countryData = await postRequest(`/master/countries`, ``);
  
//     const stateData =
//       stateId !== "create"
//         ? await postRequest(`/master/states`, { _id: stateId })
//         : 0;
  
//     const lookupObj = [countryData, stateData];
//     let data1: Array<any> = [];
  
//     return Promise.allSettled(lookupObj)
//       .then((result) => {
//         result.forEach((res: any) => {
//           data1.push(res.value);
//         });
//         return data1;
//       })
//       .then((d) => {
//         const countryList = d[0]?.data?.status === "ok" ? d[0]?.data?.data : [];
//         const selectedCountry = countryList.find(
//           (item: any) => item._id === formik.values.countryId
//         );
  
//         const stateData =
//           d[1] && d[1]?.data?.status === "ok" ? d[1]?.data?.data[0] : null;
  
//         // Set country list and optionally the state form data
//         setCountryList(countryList);
//         setFilteredCountry(selectedCountry); // optional: store only selected country
//   console.log(selectedCountry);
  
//         if (stateData) {
//           const initialValues = {
//             name: stateData.name,
//             countryId: stateData.countryId?._id,
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

// console.log(FilteredCountry);

//   return (
//     <>
//       <PageTitle>ADD/UPDATE STATE</PageTitle>
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
//                           {...formik.getFieldProps("countryId")}
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
//                           {countryList.map((e: any) => {
//                             return (
//                               <option value={e._id}>
//                                 {e.iso3} - {e.name}
//                               </option>
//                             );
//                           })}
//                         </select>

//                         {formik.touched.countryId &&
//                           formik.errors.countryId && (
//                             <div
//                               style={{ color: "red" }}
//                               className="fv-plugins-message-container"
//                             >
//                               <span role="alert">
//                                 {formik.errors.countryId}
//                               </span>
//                             </div>
//                           )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row mb-12">
//                   <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                     State / Province
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
//                           placeholder="Enter State / Province"
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
//         <AlertBox redirectUrl={`/state`} close={closeAlert} type={`success`}>
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

// export default StateDetail;


import { FC, useState, useEffect } from "react";
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
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

const stateSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Minimum 3 Character")
    .max(50, "Maximum 50 Character")
    .required("State Name is required"),
  countryId: Yup.string().required("Country Id is required"),
});

const StateDetail: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [FilteredCountry, setFilteredCountry] = useState<any>(null);
  const { stateId } = useParams();

  const initialValues = {
    name: "",
    countryId: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const [countryList, setCountryList] = useState([]);

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: stateSchema,
    onSubmit: async (values) => {
      setLoading(true);

      let reqBody = {
        name: values?.name,
        countryId: values?.countryId,
      };

      try {
        if (stateId !== "create") {
          await patchRequest(`/master/state/${stateId}`, reqBody).then(
            (response) => {
              if (response?.data?.status === "ok") {
                setIsSuccess(true);
                setSuccessMsg(`State has been updated successfully`);
              } else {
                setIsFailed(true);
                setErrorMsg(`Something Went Wrong`);
              }
              setLoading(false);
            }
          );
        } else {
          await postRequest(`/master/state`, reqBody).then((response) => {
            if (response?.data?.status === "ok") {
              setIsSuccess(true);
              setSuccessMsg(`State has been added successfully`);
            } else {
              setIsFailed(true);
              setErrorMsg(`Something Went Wrong`);
            }
            setLoading(false);
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
    setLoading(true);

    const countryData = await postRequest(`/master/countries`, ``);
    const stateData =
      stateId !== "create"
        ? await postRequest(`/master/states`, { _id: stateId })
        : 0;

    const lookupObj = [countryData, stateData];
    let data1: Array<any> = [];

    return Promise.allSettled(lookupObj)
      .then((result) => {
        result.forEach((res: any) => {
          data1.push(res.value);
        });
        return data1;
      })
      .then((d) => {
        const countries = d[0]?.data?.status === "ok" ? d[0]?.data?.data : [];
        const state = d[1]?.data?.status === "ok" ? d[1]?.data?.data[0] : null;

        setCountryList(countries);

        if (state) {
          setFormData({
            name: state.name,
            countryId: state.countryId?._id,
          });
        }

        setLoading(false);
      });
  };

  // Load data on mount
  useEffect(() => {
    async function loadData() {
      await getData();
    }
    loadData();
  }, []);

  // Derive selected country once Formik is ready and country list is loaded
  useEffect(() => {
    if (formik.values.countryId && countryList.length > 0) {
      const selected = countryList.find(
        (c: any) => c._id === formik.values.countryId
      );
      setFilteredCountry(selected || null);
    }
  }, [formik.values.countryId, countryList]);
console.log(FilteredCountry?.hasState);

  return (
    <>
      <PageTitle>ADD/UPDATE STATE</PageTitle>
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
              filter: "hue-rotate(200deg)",
            }}
          />
        </div>
      ) : (
        <div className="row g-5 g-xl-8">
          <div className={`card `}>
            <div className="card-body py-3">
              <form onSubmit={formik.handleSubmit} noValidate className="form">
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Country
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-12 fv-row">
                        <select
                          {...formik.getFieldProps("countryId")}
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

                        {formik.touched.countryId &&
                          formik.errors.countryId && (
                            <div
                              style={{ color: "red" }}
                              className="fv-plugins-message-container"
                            >
                              <span role="alert">
                                {formik.errors.countryId}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>              
                  </div>
                </div>
                {FilteredCountry?.hasState && (
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    State / Province
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-12 fv-row">
                        <input
                          {...formik.getFieldProps("name")}
                          type="text"
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
                          placeholder="Enter State / Province"
                        />
                        {formik.touched.name && formik.errors.name && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">{formik.errors.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                )}
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
      {isSuccess && (
        <AlertBox redirectUrl={`/state`} close={closeAlert} type={`success`}>
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

export default StateDetail;
