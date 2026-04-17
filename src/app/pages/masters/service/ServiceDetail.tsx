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

// const serviceSchema = Yup.object().shape({
//   serviceName: Yup.string()
//     .min(3, "Minimum 3 Character")
//     .max(50, "Maximum 50 Character")
//     .required("Service Name is required"),
//   description: Yup.string().required("Description is required"),
//   orderNo: Yup.number().required("Order Number is required"),
//   icon: Yup.mixed().required("Icon is required"),
// });

// const ServiceDetail: FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const { serviceId } = useParams();

//   const initialValues = {
//     serviceName: "",
//     description: "",
//     icon: "",
//     orderNo: "",
//   };

//   const [formData, setFormData] = useState(initialValues);

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   const formik = useFormik({
//     initialValues: formData,
//     enableReinitialize: true,
//     validationSchema: serviceSchema,
//     onSubmit: async (values) => {
//       setLoading(true);

//       let dataObj = {
//         serviceName: values?.serviceName,
//         orderNo: values?.orderNo,
//         description: values?.description,
//       };
//       const formData = new FormData();
//       formData.append("icon", values?.icon);
//       formData.append("data", JSON.stringify(dataObj));

//       try {
//         if (serviceId !== "create") {
//           await patchRequest(`/master/service/${serviceId}`, formData).then(
//             (response) => {
//               if (response?.data?.status === "ok") {
//                 setIsSuccess(true);
//                 setSuccessMsg(`Service has been updated successfully`);
//                 setLoading(false);
//               } else {
//                 setIsFailed(true);
//                 setLoading(false);
//                 setErrorMsg(`Something Went Wrong`);
//               }
//             }
//           );
//         } else {
//           await postRequest(`/master/service`, formData).then((response) => {
//             if (response?.data?.status === "ok") {
//               setIsSuccess(true);
//               setSuccessMsg(`Service has been added successfully`);
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

//   const getData = async () => {
//     setLoading(true);
//     const serviceData =
//       serviceId !== "create"
//         ? await postRequest(`/master/services`, { _id: serviceId })
//         : 0;

//     const lookupObj = [serviceData];
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
//           serviceData:
//             d[0] && d[0]?.data?.status === "ok" ? d[0]?.data?.data[0] : [],
//         };

//         if (dataobj?.serviceData) {
//           const initialValues = {
//             serviceName: dataobj?.serviceData?.serviceName,
//             description: dataobj?.serviceData?.description,
//             icon: dataobj?.serviceData?.icon,
//             orderNo: dataobj?.serviceData?.orderNo,
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

//   return (
//     <>
//       <PageTitle>ADD/UPDATE SERVICE</PageTitle>
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
//       <div className="row g-5 g-xl-8">
//         <div className={`card `}>
//           <div className="card-body py-3">
//             <form onSubmit={formik.handleSubmit} noValidate className="form">
//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Service Name
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="text"
//                         {...formik.getFieldProps("serviceName")}
//                         className={clsx(
//                           "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                           {
//                             "is-invalid":
//                               formik.touched.serviceName &&
//                               formik.errors.serviceName,
//                           },
//                           {
//                             "is-valid":
//                               formik.touched.serviceName &&
//                               !formik.errors.serviceName,
//                           }
//                         )}
//                         placeholder="Enter Service Name"
//                       />
//                       {formik.touched.serviceName &&
//                         formik.errors.serviceName && (
//                           <div
//                             style={{ color: "red" }}
//                             className="fv-plugins-message-container"
//                           >
//                             <span role="alert">
//                               {formik.errors.serviceName}
//                             </span>
//                           </div>
//                         )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Description
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="text"
//                         {...formik.getFieldProps("description")}
//                         className={clsx(
//                           "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                           {
//                             "is-invalid":
//                               formik.touched.description &&
//                               formik.errors.description,
//                           },
//                           {
//                             "is-valid":
//                               formik.touched.description &&
//                               !formik.errors.description,
//                           }
//                         )}
//                         placeholder="Enter Description"
//                       />
//                       {formik.touched.description &&
//                         formik.errors.description && (
//                           <div
//                             style={{ color: "red" }}
//                             className="fv-plugins-message-container"
//                           >
//                             <span role="alert">
//                               {formik.errors.description}
//                             </span>
//                           </div>
//                         )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Order No
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="text"
//                         {...formik.getFieldProps("orderNo")}
//                         className={clsx(
//                           "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                           {
//                             "is-invalid":
//                               formik.touched.orderNo && formik.errors.orderNo,
//                           },
//                           {
//                             "is-valid":
//                               formik.touched.orderNo && !formik.errors.orderNo,
//                           }
//                         )}
//                         placeholder="Enter Order No"
//                       />
//                       {formik.touched.orderNo && formik.errors.orderNo && (
//                         <div
//                           style={{ color: "red" }}
//                           className="fv-plugins-message-container"
//                         >
//                           <span role="alert">{formik.errors.orderNo}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Icon Image
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="file"
//                         accept="image/*"
//                         {...formik.getFieldProps("icon")}
//                         className={clsx(
//                           "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                           {
//                             "is-invalid":
//                               formik.touched.icon && formik.errors.icon,
//                           },
//                           {
//                             "is-valid":
//                               formik.touched.icon && !formik.errors.icon,
//                           }
//                         )}
//                         placeholder="Icon / Image"
//                         value={""}
//                       />
//                       {formik.touched.icon && formik.errors.icon && (
//                         <div
//                           style={{ color: "red" }}
//                           className="fv-plugins-message-container"
//                         >
//                           <span role="alert">{formik.errors.icon}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="card-footer d-flex justify-content-end py-6 px-9">
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={loading}
//                 >
//                   {!loading && "Save Changes"}
//                   {loading && (
//                     <span
//                       className="indicator-progress"
//                       style={{ display: "block" }}
//                     >
//                       Please wait...{" "}
//                       <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//                     </span>
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//       )}
//       {isSuccess && (
//         <AlertBox redirectUrl={`/service`} close={closeAlert} type={`success`}>
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

// export default ServiceDetail;


import { FC, useState, useEffect, useCallback } from "react";
import * as Yup from "yup";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useFormik } from "formik";
import clsx from "clsx";
import AlertBox from "../../../../common/AlertBox";
import { postRequest, patchRequest } from "../../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

const serviceSchema = Yup.object().shape({
  serviceName: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Service Name is required"),
  description: Yup.string().required("Description is required"),
  orderNo: Yup.number().required("Order Number is required"),
  icon: Yup.mixed().required("Icon is required"),
});

const ServiceDetail: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const { serviceId } = useParams();

  const initialValues = {
    serviceName: "",
    description: "",
    icon: null,
    orderNo: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const closeAlert = () => {
    setIsSuccess(false);
    setIsFailed(false);
  };

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: serviceSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const dataObj = {
        serviceName: values.serviceName,
        orderNo: values.orderNo,
        description: values.description,
      };

      const formData = new FormData();
      if (values.icon) {
        formData.append("icon", values.icon);
      }
      formData.append("data", JSON.stringify(dataObj));

      try {
        let response;
        if (serviceId !== "create") {
          response = await patchRequest(`/master/service/${serviceId}`, formData);
        } else {
          response = await postRequest(`/master/service`, formData);
        }

        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(
            serviceId !== "create"
              ? "Service has been updated successfully"
              : "Service has been added successfully"
          );
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  const getData = useCallback(async () => {
    if (serviceId === "create") return;

    setLoading(true);
    try {
      const response = await postRequest(`/master/services`, { _id: serviceId });

      if (response?.data?.status === "ok" && response?.data?.data?.length > 0) {
        const serviceData = response.data.data?.filter((service: any) => service._id === serviceId);
        setFormData({
          serviceName: serviceData?.[0]?.serviceName || "",
          description: serviceData?.[0]?.description || "",
          icon: serviceData?.[0]?.icon || null,
          orderNo: serviceData?.[0]?.orderNo || "",
        });

      }
    } catch (error) {
      setErrorMsg("Failed to fetch service data");
      setIsFailed(true);
    } finally {
      setLoading(false);
    }
  }, [serviceId]);

  useEffect(() => {
    getData();
  }, [getData]);
  

  return (
    <>
      <PageTitle>ADD/UPDATE SERVICE</PageTitle>

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
          <Lottie animationData={loaderAnimation} loop style={{ width: 150, height: 150 }} />
        </div>
      ) : (
        <div className="row g-5 g-xl-8">
          <div className="card">
            <div className="card-body py-3">
              <form onSubmit={formik.handleSubmit} noValidate className="form">
                {/* Service Name */}
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Service Name</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      {...formik.getFieldProps("serviceName")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        { "is-invalid": formik.touched.serviceName && formik.errors.serviceName }
                      )}
                      placeholder="Enter Service Name"
                    />
                    {formik.touched.serviceName && formik.errors.serviceName && (
                      <div className="text-danger">{formik.errors.serviceName}</div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Description</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      {...formik.getFieldProps("description")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        { "is-invalid": formik.touched.description && formik.errors.description }
                      )}
                      placeholder="Enter Description"
                    />
                    {formik.touched.description && formik.errors.description && (
                      <div className="text-danger">{formik.errors.description}</div>
                    )}
                  </div>
                </div>

                {/* Order Number */}
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Order No</label>
                  <div className="col-lg-8">
                    <input
                      type="number"
                         onWheel={(e) => (e.target as HTMLInputElement).blur()}
                      {...formik.getFieldProps("orderNo")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid",
                        { "is-invalid": formik.touched.orderNo && formik.errors.orderNo }
                      )}
                      placeholder="Enter Order No"
                    />
                    {formik.touched.orderNo && formik.errors.orderNo && (
                      <div className="text-danger">{formik.errors.orderNo}</div>
                    )}
                  </div>
                </div>

                {/* Icon Upload */}
                {/* <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Icon Image</label>
                  <img
                    src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${formik.values.icon}`}
                    alt="icon"
                    className=""
                    width={5}
                    height={5}
                  />
                  <div className="col-lg-8">
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control form-control-lg form-control-solid"
                      onChange={(event) => {
                        if (event.currentTarget.files && event.currentTarget.files[0]) {
                          formik.setFieldValue("icon", event.currentTarget.files[0]);
                        }
                      }}
                    />
                    {formik.touched.icon && formik.errors.icon && (
                      <div className="text-danger">{formik.errors.icon}</div>
                    )}
                  </div>
                </div> */}
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Icon Image</label>
                  <div className="col-lg-8 d-flex gap-3 ">
                    <img
                      src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${formik.values.icon}`}
                      alt="icon"
                      className="img-thumbnail"
                      width={60}  // Adjust this value as needed for the size of the square
                      height={60} // Adjust this value to maintain the square shape
                      style={{ objectFit: 'cover' }}  // Ensures the image fits within the square
                    />
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control form-control-lg form-control-solid mt-2"  // Added margin-top for space between image and input
                      onChange={(event) => {
                        if (event.currentTarget.files && event.currentTarget.files[0]) {
                          formik.setFieldValue("icon", event.currentTarget.files[0]);
                        }
                      }}
                    />
                    {formik.touched.icon && formik.errors.icon && (
                      <div className="text-danger">{formik.errors.icon}</div>
                    )}
                  </div>
                </div>

                {/* Submit Button */}
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Processing..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {isSuccess && <AlertBox redirectUrl={`/service`} close={closeAlert} type="success">{successMsg}</AlertBox>}
      {isFailed && <AlertBox close={closeAlert} type="error">{errorMsg}</AlertBox>}
    </>
  );
};

export default ServiceDetail;
