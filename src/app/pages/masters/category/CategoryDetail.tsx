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
// import Lottie from 'lottie-react';
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

// const categorySchema = Yup.object().shape({
//   categoryName: Yup.string()
//     .min(3, "Minimum 3 Character")
//     .max(50, "Maximum 50 Character")
//     .required("Category Name is required"),
//   homeScreenOrderNo: Yup.number().required("Home Screen Order No is required"),
//   serviceId: Yup.string().required("Service is required"),
//   orderNo: Yup.number().required("Order Number is required"),
//   icon: Yup.mixed().required("Icon is required"),
// });

// const CategoryDetail: FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const { categoryId } = useParams();

//   const initialValues = {
//     categoryName: "",
//     homeScreenOrderNo: "",
//     isDisplayOnHome: false,
//     icon: "",
//     serviceId: "",
//     orderNo: "",
//   };

//   const [formData, setFormData] = useState(initialValues);
//   const [serviceList, setServiceList] = useState([]);

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   const formik = useFormik({
//     initialValues: formData,
//     enableReinitialize: true,
//     validationSchema: categorySchema,
//     onSubmit: async (values) => {
//       setLoading(true);

//       const dataObj = {
//         categoryName: values?.categoryName,
//         orderNo: values?.orderNo,
//         isDisplayOnHome: values?.isDisplayOnHome,
//         serviceId: values?.serviceId,
//         homeOrderNo: values?.homeScreenOrderNo,
//       };
//       const formData = new FormData();
//       formData.append("icon", values?.icon);
//       formData.append("data", JSON.stringify(dataObj));

//       try {
//         if (categoryId !== "create") {
//           await patchRequest(`/master/category/${categoryId}`, formData).then(
//             (response) => {
//               if (response?.data?.status === "ok") {
//                 setIsSuccess(true);
//                 setSuccessMsg(`Category has been updated successfully`);
//                 setLoading(false);
//               } else {
//                 setIsFailed(true);
//                 setLoading(false);
//                 setErrorMsg(`Something Went Wrong`);
//               }
//             }
//           );
//         } else {
//           await postRequest(`/master/category`, formData).then((response) => {
//             if (response?.data?.status === "ok") {
//               setIsSuccess(true);
//               setSuccessMsg(`Category has been added successfully`);
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
//     const categoryData =
//       categoryId !== "create"
//         ? await postRequest(`/master/categories`, { _id: categoryId })
//         : 0;
//     const serviceData = await postRequest(`/master/services`, ``);

//     const lookupObj = [categoryData, serviceData];
//     const data1: Array<any> = [];
//     return Promise.allSettled(lookupObj)
//       .then((result) => {
//         result.forEach((res: any) => {
//           data1.push(res.value);
//         });
//         return data1;
//       })
//       .then((d) => {
//         const dataobj = {
//           categoryDataData:
//             d[0] && d[0]?.data?.status === "ok" ? d[0]?.data?.data[0] : [],
//           serviceData:
//             d[1] && d[1]?.data?.status === "ok" ? d[1]?.data?.data : [],
//         };
//         setServiceList(dataobj?.serviceData);

//         if (dataobj?.categoryDataData) {
//           const initialValues = {
//             categoryName: dataobj?.categoryDataData?.categoryName,
//             isDisplayOnHome: dataobj?.categoryDataData?.isDisplayOnHome,
//             serviceId: dataobj?.categoryDataData?.serviceId?._id,
//             homeScreenOrderNo: dataobj?.categoryDataData?.homeOrderNo,
//             icon: dataobj?.categoryDataData?.icon,
//             orderNo: dataobj?.categoryDataData?.orderNo,
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
//       <PageTitle>ADD/UPDATE CATEGORY</PageTitle>
//       {loading ? (
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
//       <div className="row g-5 g-xl-8">
//         <div className={`card `}>
//           <div className="card-body py-3">
//             <form onSubmit={formik.handleSubmit} noValidate className="form">
//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Service
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-9 fv-row">
//                       <select
//                         {...formik.getFieldProps("serviceId")}
//                         className={clsx(
//                           "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                           {
//                             "is-invalid":
//                               formik.touched.serviceId &&
//                               formik.errors.serviceId,
//                           },
//                           {
//                             "is-valid":
//                               formik.touched.serviceId &&
//                               !formik.errors.serviceId,
//                           }
//                         )}
//                       >
//                         <option value="">Select a Service...</option>
//                         {serviceList.map((e: any) => {
//                           return <option value={e._id}>{e.serviceName}</option>;
//                         })}
//                       </select>
//                       {formik.touched.serviceId && formik.errors.serviceId && (
//                         <div
//                           style={{ color: "red" }}
//                           className="fv-plugins-message-container"
//                         >
//                           <span role="alert">{formik.errors.serviceId}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                   Category Name
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         {...formik.getFieldProps("categoryName")}
//                         type="text"
//                         className={clsx(
//                           "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                           {
//                             "is-invalid":
//                               formik.touched.categoryName &&
//                               formik.errors.categoryName,
//                           },
//                           {
//                             "is-valid":
//                               formik.touched.categoryName &&
//                               !formik.errors.categoryName,
//                           }
//                         )}
//                         placeholder="Enter Category"
//                       />
//                       {formik.touched.categoryName &&
//                         formik.errors.categoryName && (
//                           <div
//                             style={{ color: "red" }}
//                             className="fv-plugins-message-container"
//                           >
//                             <span role="alert">
//                               {formik.errors.categoryName}
//                             </span>
//                           </div>
//                         )}
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
//                   Home Screen Order No
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <input
//                         type="text"
//                         {...formik.getFieldProps("homeScreenOrderNo")}
//                         className={clsx(
//                           "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                           {
//                             "is-invalid":
//                               formik.touched.homeScreenOrderNo &&
//                               formik.errors.homeScreenOrderNo,
//                           },
//                           {
//                             "is-valid":
//                               formik.touched.homeScreenOrderNo &&
//                               !formik.errors.homeScreenOrderNo,
//                           }
//                         )}
//                         placeholder="Enter Order No"
//                       />
//                       {formik.touched.homeScreenOrderNo &&
//                         formik.errors.homeScreenOrderNo && (
//                           <div
//                             style={{ color: "red" }}
//                             className="fv-plugins-message-container"
//                           >
//                             <span role="alert">
//                               {formik.errors.homeScreenOrderNo}
//                             </span>
//                           </div>
//                         )}
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="row mb-12">
//                 <label className="col-lg-4 col-form-label fw-bold fs-6">
//                   Display In Home
//                 </label>

//                 <div className="col-lg-8">
//                   <div className="row">
//                     <div className="col-lg-12 fv-row">
//                       <div className="form-check form-check-sm form-check-custom form-check-solid">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           {...formik.getFieldProps("isDisplayOnHome")}
//                           //checked= {formik.getFieldProps('isDisplayOnHome')}
//                           checked={formik?.values?.isDisplayOnHome}
//                           data-kt-check={formik.getFieldProps(
//                             "isDisplayOnHome"
//                           )}
//                           data-kt-check-target=".widget-9-check"
//                         />
//                         {formik.touched.isDisplayOnHome &&
//                           formik.errors.isDisplayOnHome && (
//                             <div
//                               style={{ color: "red" }}
//                               className="fv-plugins-message-container"
//                             >
//                               <span role="alert">
//                                 {formik.errors.isDisplayOnHome}
//                               </span>
//                             </div>
//                           )}
//                       </div>
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
//             )}
//       {isSuccess && (
//         <AlertBox redirectUrl={`/category`} close={closeAlert} type={`success`}>
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

// export default CategoryDetail;



// import { FC, useState, useEffect } from "react";
// import * as Yup from "yup";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { FormikProps, useFormik } from "formik";
// import clsx from "clsx";
// import AlertBox from "../../../../common/AlertBox";
// import { postRequest, patchRequest } from "../../../modules/auth/core/_requests";
// import { useParams } from "react-router-dom";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";


// interface FormValues {
//   icon: File | string;
// }

// interface Props {
//   formik: FormikProps<FormValues>;
// }
// const categorySchema = Yup.object().shape({
//   categoryName: Yup.string()
//     .min(3, "Minimum 3 characters")
//     .max(50, "Maximum 50 characters")
//     .required("Category Name is required"),
//   homeScreenOrderNo: Yup.number()
//     .typeError("Must be a number")
//     .required("Home Screen Order No is required"),
//   serviceId: Yup.string().required("Service is required"),
//   orderNo: Yup.number()
//     .typeError("Must be a number")
//     .required("Order Number is required"),
//   icon: Yup.mixed().required("Icon is required"),
// });

// const CategoryDetail: FC = () => {
//   const { categoryId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [isFailed, setIsFailed] = useState(false);
//   const [serviceList, setServiceList] = useState([]);

//   const closeAlert = () => {
//     setIsSuccess(false);
//     setIsFailed(false);
//   };

//   const initialValues = {
//     categoryName: "",
//     homeScreenOrderNo: "",
//     isDisplayOnHome: false,
//     icon: "",
//     serviceId: "",
//     orderNo: "",
//   };

//   const formik = useFormik({
//     initialValues,
//     enableReinitialize: true,
//     validationSchema: categorySchema,
//     onSubmit: async (values) => {
//       setLoading(true);

//       const dataObj = {
//         categoryName: values.categoryName,
//         orderNo: values.orderNo,
//         isDisplayOnHome: values.isDisplayOnHome,
//         serviceId: values.serviceId,
//         homeOrderNo: values.homeScreenOrderNo,
//       };

//       const formData = new FormData();
//       formData.append("icon", values.icon);
//       formData.append("data", JSON.stringify(dataObj));

//       try {
//         let response;
//         if (categoryId !== "create") {
//           response = await patchRequest(`/master/category/${categoryId}`, formData);
//         } else {
//           response = await postRequest(`/master/category`, formData);
//         }

//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg(
//             categoryId !== "create"
//               ? "Category has been updated successfully"
//               : "Category has been added successfully"
//           );
//         } else {
//           setIsFailed(true);
//           setErrorMsg("Something went wrong");
//         }
//       } catch (error) {
//         setIsFailed(true);
//         setErrorMsg("Something went wrong");
//       } finally {
//         setLoading(false);
//       }
//     },
//   });

//   const getData = async () => {
//     setLoading(true);
//     try {
//       const categoryData =
//         categoryId !== "create"
//           ? await postRequest(`/master/categories`, { _id: categoryId })
//           : null;
//       const serviceData = await postRequest(`/master/services`, ``);

//       if (serviceData?.data?.status === "ok") {
//         setServiceList(serviceData.data.data || []);


//       }

//       if (categoryData?.data?.status === "ok") {
//         const categoryInfo = categoryData.data.data[0] || {};


//         formik.setValues({
//           categoryName: categoryInfo.categoryName || "",
//           isDisplayOnHome: categoryInfo.isDisplayOnHome || false,
//           serviceId: categoryInfo.serviceId?._id || "",
//           homeScreenOrderNo: categoryInfo.homeOrderNo || "",
//           icon: categoryInfo.icon || "",
//           orderNo: categoryInfo.orderNo || "",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching data", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [categoryId]);


//   console.log(formik.errors);
//   const [iconPreview, setIconPreview] = useState<string | null>(null);

//   useEffect(() => {
//     if (formik.values.icon instanceof File) {
//       const fileUrl = URL.createObjectURL(formik.values.icon);
//       setIconPreview(fileUrl);

//       return () => URL.revokeObjectURL(fileUrl); // Cleanup
//     } else if (typeof formik.values.icon === "string") {
//       setIconPreview(`${import.meta.env.VITE_IMAGE_BASE_URL}/${formik.values.icon}`);
//     }
//   }, [formik.values.icon]);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.currentTarget.files?.[0];
//     if (file) {
//       formik.setFieldValue("icon", file);
//     }
//   };
//   console.log(serviceList);

//   const handleServiceChange = (serviceId: string) => {
//    const service = serviceList.filter(item => item._id === serviceId);
//     console.log();
//     formik.setFieldValue("orderNo",service?.[0]?.orderNo );

// };

//   return (
//     <>
//       <PageTitle>ADD/UPDATE CATEGORY</PageTitle>
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
//           <Lottie animationData={loaderAnimation} loop={true} style={{ width: 150, height: 150 }} />
//         </div>
//       ) : (
//         <div className="row g-5 g-xl-8">
//           <div className="card">
//             <div className="card-body py-3">
//               <form onSubmit={formik.handleSubmit} noValidate className="form">
//                 <div className="mb-3">
//                   <label className="form-label required">Service</label>
//                <select
//   name="serviceId"
//   value={formik.values.serviceId}
//   onChange={(e) => {
//     const selectedServiceId = e.target.value;
//     formik.setFieldValue("serviceId", selectedServiceId);
//     formik.setFieldValue("orderId", "");
//     handleServiceChange(selectedServiceId);
//   }}
//   onBlur={formik.handleBlur}
//   className={clsx("form-control", {
//     "is-invalid": formik.touched.serviceId && formik.errors.serviceId,
//   })}
// >
//   <option value="">Select a Service...</option>
//   {serviceList.map((e: any) => (
//     <option key={e._id} value={e._id}>
//       {e.serviceName}
//     </option>
//   ))}
// </select>

//                   {formik.touched.serviceId && formik.errors.serviceId && (
//                     <div className="text-danger">{formik.errors.serviceId}</div>
//                   )}
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label required">Category Name</label>
//                   <input
//                     type="text"
//                     {...formik.getFieldProps("categoryName")}
//                     className={clsx("form-control", {
//                       "is-invalid": formik.touched.categoryName && formik.errors.categoryName,
//                     })}
//                     placeholder="Enter Category"
//                   />
//                   {formik.touched.categoryName && formik.errors.categoryName && (
//                     <div className="text-danger">{formik.errors.categoryName}</div>
//                   )}
//                 </div>


//                 <div className="mb-3">
//                   <label className="form-label required">Icon Image</label>
//                   <div className="d-flex gap-3">
//                     <div>
//                       {iconPreview && (
//                         <img
//                           src={iconPreview}
//                           alt="icon"
//                           className="img-thumbnail"
//                           width={60}
//                           height={60}
//                           style={{ objectFit: "cover" }}
//                         />
//                       )}
//                     </div>
//                     <input
//                       type="file"
//                       accept="image/*"
//                       className={clsx("form-control", {
//                         "is-invalid": formik.touched.icon && Boolean(formik.errors.icon),
//                       })}
//                       onChange={handleFileChange}
//                     />
//                     {formik.touched.icon && formik.errors.icon && (
//                       <div className="text-danger">{formik.errors.icon}</div>
//                     )}
//                   </div>
//                 </div>
//                 <div className="mb-3">
//                   <label className="form-label">Display In Home</label>
//                   <input
//                     type="checkbox"
//                     {...formik.getFieldProps("isDisplayOnHome")}
//                     checked={formik.values.isDisplayOnHome}
//                   />
//                 </div>

//                 <button type="submit" className="btn btn-primary" disabled={loading}>
//                   {loading ? "Please wait..." : "Save Changes"}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       )}
//       {isSuccess && <AlertBox redirectUrl={`/category`} close={closeAlert} type="success">{successMsg}</AlertBox>}
//       {isFailed && <AlertBox redirectUrl={null} close={closeAlert} type="error">{errorMsg}</AlertBox>}
//     </>
//   );
// };

// export default CategoryDetail;



import { FC, useState, useEffect } from "react";
import * as Yup from "yup";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useFormik } from "formik";
import clsx from "clsx";
import AlertBox from "../../../../common/AlertBox";
import { postRequest, patchRequest } from "../../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import logo from "../../../../../src/_metronic/assets/sass/components/logoimage/logo.png"

interface Service {
  _id: string;
  serviceName: string;
  orderNo: number;
}

interface FormValues {
  categoryName: string;
  homeScreenOrderNo: boolean;
  isDisplayOnHome: boolean;
  icon: File | string;
  serviceId: string;
  orderNo: string | number;
}

const categorySchema = Yup.object().shape({
  categoryName: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Category Name is required"),
  homeScreenOrderNo: Yup.boolean()
    // .typeError("Must be a number")
    .required("Home Screen Order No is required"),
  serviceId: Yup.string().required("Service is required"),
  orderNo: Yup.number()
    .typeError("Must be a number")
    .required("Order Number is required"),
  icon: Yup.mixed().required("Icon is required"),
});

const CategoryDetail: FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [serviceList, setServiceList] = useState<Service[]>([]);
  const [iconPreview, setIconPreview] = useState<string | null>(null);

  const closeAlert = () => {
    setIsSuccess(false);
    setIsFailed(false);
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      categoryName: "",
      homeScreenOrderNo: false,
      isDisplayOnHome: false,
      icon: "",
      serviceId: "",
      orderNo: "",
    },
    enableReinitialize: true,
    validationSchema: categorySchema,
    onSubmit: async (values) => {
      setLoading(true);

      const dataObj = {
        categoryName: values.categoryName,
        orderNo: values.orderNo,
        isDisplayOnHome: values.isDisplayOnHome,
        serviceId: values.serviceId,
        homeOrderNo: values.homeScreenOrderNo,
      };

      const formData = new FormData();
      formData.append("icon", values.icon);
      formData.append("data", JSON.stringify(dataObj));

      try {
        const response =
          categoryId !== "create"
            ? await patchRequest(`/master/category/${categoryId}`, formData)
            : await postRequest(`/master/category`, formData);

        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(
            categoryId !== "create"
              ? "Category has been updated successfully"
              : "Category has been added successfully"
          );
        } else {
          throw new Error("Unexpected response");
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  const getData = async () => {
    setLoading(true);
    try {
      const categoryData =
        categoryId !== "create"
          ? await postRequest(`/master/categories`, { _id: categoryId })
          : null;

      const serviceData = await postRequest(`/master/services`, ``);

      if (serviceData?.data?.status === "ok") {
        setServiceList(serviceData.data.data || []);
      }

      if (categoryData?.data?.status === "ok") {
        const categoryInfo = categoryData.data.data[0] || {};
        formik.setValues({
          categoryName: categoryInfo.categoryName || "",
          isDisplayOnHome: categoryInfo.isDisplayOnHome || false,
          serviceId: categoryInfo.serviceId?._id || "",
          homeScreenOrderNo: categoryInfo.homeOrderNo || "",
          icon: categoryInfo.icon || "",
          orderNo: categoryInfo.orderNo || "",
        });
      }
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [categoryId]);

  useEffect(() => {
    if (formik.values.icon instanceof File) {
      const fileUrl = URL.createObjectURL(formik.values.icon);
      setIconPreview(fileUrl);
      return () => URL.revokeObjectURL(fileUrl); // Cleanup
    } else if (typeof formik.values.icon === "string") {
      setIconPreview(`${import.meta.env.VITE_IMAGE_BASE_URL}/${formik.values.icon}`);
    }
  }, [formik.values.icon]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    if (file) {
      formik.setFieldValue("icon", file);
    }
  };

  const handleServiceChange = (serviceId: string) => {
    const service = serviceList.find((item) => item._id === serviceId);
    if (service) {
      formik.setFieldValue("orderNo", service.orderNo);
    }
  };



  return (
    <>
      <PageTitle>ADD/UPDATE CATEGORY</PageTitle>
      {loading ? (
        <div className="text-center d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Lottie animationData={loaderAnimation} loop={true} style={{ width: 150, height: 150 }} />
        </div>
      ) : (
        <div className="row g-5 g-xl-8">
          <div className="card">
            <div className="card-body py-3">
              <form onSubmit={formik.handleSubmit} noValidate className="form">
                <div className="mb-3">
                  <label className="form-label required">Service</label>
                  <select
                    name="serviceId"
                    value={formik.values.serviceId}
                    onChange={(e) => {
                      const selectedServiceId = e.target.value;
                      formik.setFieldValue("serviceId", selectedServiceId);
                      handleServiceChange(selectedServiceId);
                    }}
                    onBlur={formik.handleBlur}
                    className={clsx("form-control", {
                      "is-invalid": formik.touched.serviceId && formik.errors.serviceId,
                    })}
                  >
                    <option value="">Select a Service...</option>
                    {serviceList.map((e) => (
                      <option key={e._id} value={e._id}>
                        {e.serviceName}
                      </option>
                    ))}
                  </select>
                  {formik.touched.serviceId && formik.errors.serviceId && (
                    <div className="text-danger">{formik.errors.serviceId}</div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label required">Category Name</label>
                  <input
                    type="text"
                    {...formik.getFieldProps("categoryName")}
                    className={clsx("form-control", {
                      "is-invalid": formik.touched.categoryName && formik.errors.categoryName,
                    })}
                    placeholder="Enter Category"
                  />
                  {formik.touched.categoryName && formik.errors.categoryName && (
                    <div className="text-danger">{formik.errors.categoryName}</div>
                  )}
                </div>

             <div className="mb-3">
  <label className="form-label required">Icon Image</label>
  <div className="d-flex gap-3 align-items-center">
    <img
  src={iconPreview || logo} // <-- iconPreview is base64 or fallback to default logo
  alt="Icon Preview"
  className="img-thumbnail"
  width={60}
  height={60}
  style={{ objectFit: "cover" }}
  onError={(e) => {
    e.currentTarget.src = logo; // fallback to default logo if error
  }}
/>

    <input
      type="file"
      accept="image/*"
      className={clsx("form-control", {
        "is-invalid": formik.touched.icon && Boolean(formik.errors.icon),
      })}
      onChange={handleFileChange}
    />
  </div>

  {formik.touched.icon && formik.errors.icon && (
    <div className="text-danger">{formik.errors.icon}</div>
  )}
</div>

                <div className="mb-3 ">
                  <label className="form-label" htmlFor="homeScreenOrderNo">
                    Enable display on home screen</label>
                  <input
                    type="checkbox"
                    id="showOnHomeScreen"
                    {...formik.getFieldProps("showOnHomeScreen")}

                  />
                </div>
                {formik.touched.homeScreenOrderNo && formik.errors.homeScreenOrderNo && (
                  <div className="text-danger">{formik.errors.homeScreenOrderNo}</div>
                )}



                <div className="mb-3">
                  <label className="form-label">Display In Home</label>
                  <input
                    type="checkbox"
                    {...formik.getFieldProps("isDisplayOnHome")}
                    checked={formik.values.isDisplayOnHome}
                  />
                </div>

                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? "Please wait..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {isSuccess && <AlertBox redirectUrl={`/category`} close={closeAlert} type="success">{successMsg}</AlertBox>}
      {isFailed && <AlertBox redirectUrl={null} close={closeAlert} type="error">{errorMsg}</AlertBox>}
    </>
  );
};

export default CategoryDetail;
