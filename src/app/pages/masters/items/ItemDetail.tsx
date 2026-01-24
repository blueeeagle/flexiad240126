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
// import ItemList from "./ItemList";
// import ImageEdit from "../../../../common/ImageEdit";
// import { useAuth } from "../../../modules/auth";
// // import ImageEdit from '../../common/ImageEdit';
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

// const itemSchema = Yup.object().shape({
//   productName: Yup.string()
//     .min(3, "Minimum 3 Character")
//     .max(50, "Maximum 50 Character")
//     .required("Item Name is required"),
//   // homeScreenOrderNo : Yup.number()
//   //   .required('Home Screen Order No is required'),
//   serviceId: Yup.string().required("Service is required"),
//   categoryId: Yup.string().required("Category is required"),

// });

// const ItemDetail: FC = () => {
//   const [loading, setLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const [image, setImage] = useState();
//   const { itemId } = useParams();
//   const { auth: loginData } = useAuth();
//   // const [updatedImg]

//   const initialValues = {
//     productName: "",
//     shortDesc: "",
//     // productImageURL: "",
//     serviceId: "",
//     categoryId: "",
//   };

//   const [formData, setFormData] = useState(initialValues);
//   const [serviceList, setServiceList] = useState([]);
//   const [categoryList, setCategoryList] = useState([]);

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   const formik = useFormik({
//     initialValues: formData,
//     enableReinitialize: true,
//     validationSchema: itemSchema,
//     onSubmit: async (values) => {
//       console.log("submit clicked");
//       setLoading(true);

//       let dataObj = {
//         productName: values?.productName,
//         shortDesc: values?.shortDesc,
//         serviceId: values?.serviceId,
//         categoryId: values?.categoryId,
//       };
//       const formData = new FormData();
//       if (image) {
//         formData.append("productImageURL", image);
//       }
//       formData.append("data", JSON.stringify(dataObj));

//       try {
//         if (itemId) {
//           await patchRequest(`/master/product/${itemId}`, formData).then(
//             (response) => {
//               if (response?.data?.status === "ok") {
//                 setIsSuccess(true);
//                 setSuccessMsg(`Item has been updated successfully`);
//                 setLoading(false);
//               } else {
//                 setIsFailed(true);
//                 setLoading(false);
//                 setErrorMsg(`Something Went Wrong`);
//               }
//             }
//           );
//         } else {
//           await postRequest(`/master/product`, formData).then((response) => {
//             if (response?.data?.status === "ok") {
//               setIsSuccess(true);
//               setSuccessMsg(`Item has been added successfully`);
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

//   const getData = async (serviceId: string | undefined) => {
//     setLoading(true);
//     console.log(serviceId);
    
//     const itemData =
//       itemId !== "create"
//         ? await postRequest(`/master/products`, { _id: itemId })
//         : 0;
//     const serviceData = await postRequest(`/master/services`, ``);
//     const categoryData = await postRequest(`/master/categories`, ``);

//     const allCategories = categoryRes?.data?.data || [];

//   const filteredCategories = allCategories.filter(
//     (cat: any) => cat.serviceId === serviceId
//   );

//   console.log("Filtered Categories:", filteredCategories);


//     const lookupObj = [itemData, serviceData, categoryData];
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
//           itemData:
//             d[0] && d[0]?.data?.status === "ok" ? d[0]?.data?.data[0] : [],
//           serviceData:
//             d[1] && d[1]?.data?.status === "ok" ? d[1]?.data?.data : [],
//           categoryData:
//             d[1] && d[2]?.data?.status === "ok" ? d[2]?.data?.data : [],
//         };
//         setServiceList(dataobj?.serviceData);
//         setCategoryList(dataobj?.categoryData);

//         if (dataobj?.itemData) {
//           const initialValues = {
//             productName: dataobj?.itemData?.productName,
//             categoryId: dataobj?.itemData?.categoryId?._id,
//             serviceId: dataobj?.itemData?.serviceId?._id,
//             shortDesc: dataobj?.itemData?.shortDesc,
//             productImageURL: dataobj?.itemData?.productImageURL,
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
// console.log(formik.errors);
// console.log(formik.values);

//   return (
//     <>
//       <PageTitle>ADD/UPDATE ITEM</PageTitle>
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
//                     Service
//                   </label>

//                   <div className="col-lg-8">
//                     <div className="row">
//                       <div className="col-lg-9 fv-row">
//                         <select
//                           {...formik.getFieldProps("serviceId")}
//                           className={clsx(
//                             "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                             {
//                               "is-invalid":
//                                 formik.touched.serviceId &&
//                                 formik.errors.serviceId,
//                             },
//                             {
//                               "is-valid":
//                                 formik.touched.serviceId &&
//                                 !formik.errors.serviceId,
//                             }
//                           )}
//                                               onChange={(e) => {
//                       const selectedServiceId = e.target.value;
//                       formik.setFieldValue("serviceId", selectedServiceId);
//                       getData(selectedServiceId);
//                     }}

//                         >
//                           <option value="">Select a Service...</option>
//                           {serviceList.map((e: any) => {
//                             return (
//                               <option value={e._id}>{e.serviceName}</option>
//                             );
//                           })}
//                         </select>
//                         {formik.touched.serviceId &&
//                           formik.errors.serviceId && (
//                             <div
//                               style={{ color: "red" }}
//                               className="fv-plugins-message-container"
//                             >
//                               <span role="alert">
//                                 {formik.errors.serviceId}
//                               </span>
//                             </div>
//                           )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row mb-12">
//                   <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                     Category
//                   </label>

//                   <div className="col-lg-8">
//                     <div className="row">
//                       <div className="col-lg-9 fv-row">
//                         <select
//                           {...formik.getFieldProps("categoryId")}
//                           className={clsx(
//                             "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                             {
//                               "is-invalid":
//                                 formik.touched.categoryId &&
//                                 formik.errors.categoryId,
//                             },
//                             {
//                               "is-valid":
//                                 formik.touched.categoryId &&
//                                 !formik.errors.categoryId,
//                             }
//                           )}
//                         >
//                           <option value="">Select a Category...</option>
//                           {categoryList.map((e: any) => {
//                             return (
//                               <option value={e._id}>{e.categoryName}</option>
//                             );
//                           })}
//                         </select>
//                         {formik.touched.categoryId &&
//                           formik.errors.categoryId && (
//                             <div
//                               style={{ color: "red" }}
//                               className="fv-plugins-message-container"
//                             >
//                               <span role="alert">
//                                 {formik.errors.categoryId}
//                               </span>
//                             </div>
//                           )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="row mb-12">
//                   <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                     Item Name
//                   </label>

//                   <div className="col-lg-8">
//                     <div className="row">
//                       <div className="col-lg-12 fv-row">
//                         <input
//                           type="text"
//                           {...formik.getFieldProps("productName")}
//                           className={clsx(
//                             "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
//                             {
//                               "is-invalid":
//                                 formik.touched.productName &&
//                                 formik.errors.productName,
//                             },
//                             {
//                               "is-valid":
//                                 formik.touched.productName &&
//                                 !formik.errors.productName,
//                             }
//                           )}
//                           placeholder="Enter Item Name"
//                         />
//                         {formik.touched.productName &&
//                           formik.errors.productName && (
//                             <div
//                               style={{ color: "red" }}
//                               className="fv-plugins-message-container"
//                             >
//                               <span role="alert">
//                                 {formik.errors.productName}
//                               </span>
//                             </div>
//                           )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>



//                 <div className="row mb-12">
//                   <label className="col-lg-4 col-form-label fw-bold fs-6">
//                     Short Description
//                   </label>

//                   <div className="col-lg-8">
//                     <div className="row">
//                       <div className="col-lg-12 fv-row">
//                         <input
//                           type="textbox"
//                           {...formik.getFieldProps("shortDesc")}
//                           className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
//                           placeholder="Enter Short Description"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
                
//                 <ImageEdit
//                   currentImageUrl={formData.productImageURL}
//                   image={image}
//                   setImage={setImage}
//                 />

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
//         <AlertBox redirectUrl={`/item`} close={closeAlert} type={`success`}>
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

// export default ItemDetail;



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
import ImageEdit from "../../../../common/ImageEdit";
import { useAuth } from "../../../modules/auth";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

const itemSchema = Yup.object().shape({
  productName: Yup.string()
    .min(3, "Minimum 3 characters")
    .max(50, "Maximum 50 characters")
    .required("Item Name is required"),
  serviceId: Yup.string().required("Service is required"),
  categoryId: Yup.string().required("Category is required"),
});

const ItemDetail: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [image, setImage] = useState<File | undefined>();
  const { itemId } = useParams();
  const { auth: loginData } = useAuth();

  const initialValues = {
    productName: "",
    shortDesc: "",
    serviceId: "",
    categoryId: "",
    productImageURL:"",

  };

  const [formData, setFormData] = useState(initialValues);
  const [serviceList, setServiceList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const closeAlert = () => {
    setIsSuccess(false);
    setIsFailed(false);
  };

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: itemSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const dataObj = {
        productName: values.productName,
        shortDesc: values.shortDesc,
        serviceId: values.serviceId,
        categoryId: values.categoryId,
      };

      const formDataToSend = new FormData();
      if (image) {
        formDataToSend.append("productImageURL", image);
      }
      formDataToSend.append("data", JSON.stringify(dataObj));


      try {
        const endpoint = itemId ? `/master/product` : `/master/product`;
        const requestFn = itemId ?  postRequest:patchRequest ;

        const response = await requestFn(endpoint, formDataToSend);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Item has been ${itemId ? "updated" : "added"} successfully`);
        } else {
          throw new Error();
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg(`Something went wrong`);
      } finally {
        setLoading(false);
      }
    },
  });

  const getData = async (selectedServiceId?: string) => {
    try {
      setLoading(true);

      const itemDataPromise =
        itemId !== "create" ? postRequest(`/master/products`, { _id: itemId }) : null;

      const [itemRes, serviceRes, categoryRes] = await Promise.all([
        itemDataPromise,
        postRequest(`/master/services`, ``),
        postRequest(`/master/categories`, ``),
      ]);

      const itemData = itemRes?.data?.data?.[0] || null;
      const allServices = serviceRes?.data?.data || [];
      const allCategories = categoryRes?.data?.data || [];

      setServiceList(allServices);

      const effectiveServiceId = selectedServiceId || itemData?.serviceId?._id || "";


      const filteredCategories = allCategories.filter(
        (cat: any) => cat.serviceId?._id === effectiveServiceId
      );
      setCategoryList(filteredCategories);


      if (itemData) {
        setFormData({
          productName: itemData.productName,
          shortDesc: itemData.shortDesc,
          serviceId: itemData.serviceId?._id,
          categoryId: itemData.categoryId?._id,
           productImageURL:itemData.productImageURL

        });
      }
    } catch (err) {
      console.error("Error fetching data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <PageTitle>ADD/UPDATE ITEM</PageTitle>
      {loading ? (
        <div className="text-center d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
          <Lottie animationData={loaderAnimation} loop style={{ width: 150, height: 150, filter: "hue-rotate(200deg)" }} />
        </div>
      ) : (
        <div className="row g-5 g-xl-8">
          <div className="card">
            <div className="card-body py-3">
              <form onSubmit={formik.handleSubmit} noValidate className="form">
                {/* Service */}
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Service</label>
                  <div className="col-lg-8">
                    <select
                      {...formik.getFieldProps("serviceId")}
                      className={clsx("form-control form-control-lg form-control-solid", {
                        "is-invalid": formik.touched.serviceId && formik.errors.serviceId,
                        "is-valid": formik.touched.serviceId && !formik.errors.serviceId,
                      })}
                      onChange={(e) => {
                        const selectedServiceId = e.target.value;
                        formik.setFieldValue("serviceId", selectedServiceId);
                        getData(selectedServiceId);
                      }}
                    >
                      <option value="">Select a Service...</option>
                      {serviceList.map((service: any) => (
                        <option key={service._id} value={service._id}>
                          {service.serviceName}
                        </option>
                      ))}
                    </select>
                    {formik.touched.serviceId && formik.errors.serviceId && (
                      <div className="text-danger">{formik.errors.serviceId}</div>
                    )}
                  </div>
                </div>

                {/* Category */}
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Category</label>
                  <div className="col-lg-8">
                    <select
                      {...formik.getFieldProps("categoryId")}
                      className={clsx("form-control form-control-lg form-control-solid", {
                        "is-invalid": formik.touched.categoryId && formik.errors.categoryId,
                        "is-valid": formik.touched.categoryId && !formik.errors.categoryId,
                      })}
                    >
                      <option value="">Select a Category...</option>
                      {categoryList.map((category: any) => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                    {formik.touched.categoryId && formik.errors.categoryId && (
                      <div className="text-danger">{formik.errors.categoryId}</div>
                    )}
                  </div>
                </div>

                {/* Product Name */}
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">Item Name</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      {...formik.getFieldProps("productName")}
                      className={clsx("form-control form-control-lg form-control-solid", {
                        "is-invalid": formik.touched.productName && formik.errors.productName,
                        "is-valid": formik.touched.productName && !formik.errors.productName,
                      })}
                      placeholder="Enter Item Name"
                    />
                    {formik.touched.productName && formik.errors.productName && (
                      <div className="text-danger">{formik.errors.productName}</div>
                    )}
                  </div>
                </div>

                {/* Short Desc */}
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">Short Description</label>
                  <div className="col-lg-8">
                    <input
                      type="text"
                      {...formik.getFieldProps("shortDesc")}
                      className="form-control form-control-lg form-control-solid"
                      placeholder="Enter Short Description"
                    />
                  </div>
                </div>

                {/* Image Edit */}
                <ImageEdit
                  currentImageUrl={formData.productImageURL}
                  image={image}
                  setImage={setImage}
                />

                {/* Submit Button */}
                <div className="card-footer d-flex justify-content-end py-6 px-9">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {!loading ? "Save Changes" : (
                      <span className="indicator-progress" style={{ display: "block" }}>
                        Please wait...
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
      {/* Alerts */}
      {isSuccess && (
        <AlertBox redirectUrl={`/item`} close={closeAlert} type="success">
          {successMsg}
        </AlertBox>
      )}
      {isFailed && (
        <AlertBox redirectUrl={null} close={closeAlert} type="error">
          {errorMsg}
        </AlertBox>
      )}
    </>
  );
};

export default ItemDetail;
