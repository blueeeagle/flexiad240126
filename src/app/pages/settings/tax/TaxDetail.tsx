import { FC, useEffect, useRef, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import * as Yup from "yup";
import { useLocation, useParams } from "react-router-dom";
import { useFormik } from "formik";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../modules/auth/core/_requests";
import clsx from "clsx";
import AlertBox from "../../../../common/AlertBox";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
const TaxDetail: FC = () => {
  const taxSchema = Yup.object().shape({
    serviceId: Yup.string().required("Service is required"),
    taxName: Yup.string()
      .min(3, "Minimum 3 Character")
      .max(50, "Maximum 50 Character")
      .required("Tax name is required"),
    value: Yup.number().required("Value is required"),
  });
  const [loading, setLoading] = useState(false);
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [serviceList, setServiceList] = useState([]);
  const { taxId } = useParams();
  const fileRef = useRef(null);
  const initialValues = {
    serviceId: "",
    taxName: "",
    type: "",
    value: "",
  };
  const [formData, setFormData] = useState(initialValues);
  useEffect(() => {
    console.log("TaxDetail component rendered");
  }, []);
  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: taxSchema,
    onSubmit: async (values) => {
      setLoading(true);
      console.log("validation", values, taxId);

      let reqBody = {
        serviceId: values?.serviceId,
        taxName: values?.taxName,
        type: "percentage",
        value: values?.value,
      };

      try {
        if (taxId) {
          await patchRequest(`/master/tax/${taxId}`, reqBody).then(
            (response) => {
              if (response?.data?.status === "ok") {
                setIsSuccess(true);
                setSuccessMsg(`Tax has been updated successfully`);
                setLoading(false);
              } else {
                setIsFailed(true);
                setLoading(false);
                setErrorMsg(`Something Went Wrong`);
              }
            }
          );
        } else {
          await postRequest(`/master/tax`, reqBody).then((response) => {
            console.log("response", response);

            if (response?.data?.status === "ok") {
              setIsSuccess(true);
              setSuccessMsg(`Tax has been added successfully`);
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
    if (taxId) {
      let reqBody = {
        _id: taxId,
      };
      const taxData = await postRequest(`/master/taxes`, reqBody);

      const lookupObj = [taxData];
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
            taxData: d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
          };
          const editData = dataobj.taxData[0];
          if (editData) {
            let initialValues = {
              serviceId: editData.serviceId?._id,
              taxName: editData?.taxName,
              type: "percentage", //editData.type,  // change this later
              value: editData?.value,
            };
            setFormData(initialValues);
          }
          
        })
 
        
    }

    const serviceData = await postRequest(`/master/services`, ``);
    const lookupObj = [serviceData];
    let data1: Array<any> = [];
    return Promise.allSettled(lookupObj)
      .then((result) => {
        result.forEach((res: any) => {
          data1.push(res.value);
        });
        return data1;
      })
      .then((d) => {
        console.log("data d in api>>>", d);
        const dataobj = {
          serviceData: d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
        };
        setServiceList(dataobj?.serviceData);
        console.log("currency   list>>", serviceList);
      });
    } catch (error) {
        console.error("Error fetching data", error);
        setIsFailed(true); 
      } finally {
        setLoadingGetData(false); 
      }
  };
  useEffect(() => {
    async function loadData() {
      await getData();
    }
    loadData();

    // console.log('linkto data>>',packageId)
  }, []);

  return (
    <>
      <PageTitle>ADD/UPDATE TAX</PageTitle>
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
        <div className={`card `}>
          <div className="card-body py-3">
            <form
              className="form w-100"
              onSubmit={formik.handleSubmit}
              noValidate
              id="kt_login_signin_form"
            >
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Service
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <select
                        {...formik.getFieldProps("serviceId")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.serviceId &&
                              formik.errors.serviceId,
                          },
                          {
                            "is-valid":
                              formik.touched.serviceId &&
                              !formik.errors.serviceId,
                          }
                        )}
                      >
                        <option value="">Select a Service...</option>
                        {serviceList.map((e: any) => {
                          return <option value={e._id}>{e.serviceName}</option>;
                        })}
                      </select>

                      {formik.touched.serviceId && formik.errors.serviceId && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.serviceId}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Tax Title
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("taxName")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.taxName && formik.errors.taxName,
                          },
                          {
                            "is-valid":
                              formik.touched.taxName && !formik.errors.taxName,
                          }
                        )}
                        placeholder="Enter Tax Name"
                      />
                      {formik.touched.taxName && formik.errors.taxName && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.taxName}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Tax %
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("value")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.value && formik.errors.value,
                          },
                          {
                            "is-valid":
                              formik.touched.value && !formik.errors.value,
                          }
                        )}
                        placeholder="Enter Tax %"
                      />
                      {formik.touched.value && formik.errors.value && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.value}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

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
        <AlertBox
          redirectUrl={`/settings/taxList`}
          close={closeAlert}
          type={`success`}
        >
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

export default TaxDetail;
