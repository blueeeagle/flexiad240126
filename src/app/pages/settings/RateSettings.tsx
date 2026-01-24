import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { useAuth } from "../../modules/auth";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { getRequest, patchRequest } from "../../modules/auth/core/_requests";
import AlertBox from "../../../common/AlertBox";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
const rateSchema = Yup.object().shape({
  logisticsCommisionType: Yup.string().required("value is required"),
  logisticsCommisionValue: Yup.number().required("value is required"),
  platformCommisionType: Yup.string().required("value is required"),
  platFormCommisionValue: Yup.number().required("value is required"),
  subscriptionFee: Yup.number(),
  minPayoutAmount: Yup.number(),
});
const RateSettings: FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [companyId, setCompanyId] = useState();
  const { auth: loginData } = useAuth();
  const initialValues = {
    logisticsCommisionType: "",
    logisticsCommisionValue: 0,
    platformCommisionType: "",
    platFormCommisionValue: 0,
    subscriptionFee: 0,
    minPayoutAmount: 0,
  };
  const [formData, setFormData] = useState(initialValues);
  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };
  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: rateSchema,
    onSubmit: async (values) => {
      setLoading(true);

      let reqObj = {
        commissions: {
          platformCommission: {
            type: values?.platformCommisionType,
            value: values?.platFormCommisionValue,
          },
          logisticsCommission: {
            type: values?.logisticsCommisionType,
            value: values?.logisticsCommisionValue,
          },
        },
        subscriptionFee: values.subscriptionFee,
        minPayoutAmt: values.minPayoutAmount,
      };

      try {
        if (companyId) {
          await patchRequest(`/settings/rate/${companyId}`, reqObj).then(
            (response) => {
              if (response?.data?.status === "ok") {
                setIsSuccess(true);
                setSuccessMsg(`Rate has been updated successfully`);
                setLoading(false);
              } else {
                setIsFailed(true);
                setLoading(false);
                setErrorMsg(`Something Went Wrong`);
              }
            }
          );
        }
      } catch (error) {
        setIsFailed(true);
        setLoading(false);
        setErrorMsg(`Something Went Wrong`);
      }
    },
  });

  const getCompanyData = async () => {
    setLoadingGetData(true);
    try {
      const companyData = await getRequest(`/admin/company`, "");
  
      setCompanyId(companyData.data.data[0]._id);
      formik.setFieldValue("subscriptionFee",companyData.data.data[0].subscriptionFee);
      formik.setFieldValue("minPayoutAmount",companyData.data.data[0].minPayoutAmt);
      formik.setFieldValue("logisticsCommisionValue",companyData.data.data[0].commissions.logisticsCommission.value);
      formik.setFieldValue("logisticsCommisionType",companyData.data.data[0].commissions.logisticsCommission.type);
      formik.setFieldValue("platformCommisionType",companyData.data.data[0].commissions.platformCommission.type);
      formik.setFieldValue("platFormCommisionValue",companyData.data.data[0].commissions.platformCommission.value);
    } catch (error) {
      console.error("Error fetching data", error);
      setIsFailed(true); 
    } finally {
      setLoadingGetData(false); 
    }
  };

  const setFormToInitial = () => {
    formik.resetForm();
  };

 

  useEffect(() => {
    async function loadData() {
      await getCompanyData();
    }
    loadData();
  }, []);


  return (
    <>
      <PageTitle>RATE SETTINGS</PageTitle>
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
            <form onSubmit={formik.handleSubmit} noValidate className="form">
              <h3>Commission Settings</h3>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Platform Commission
                </label>

                <div className="col-lg-4">
                  <label className="col-form-label fw-bold">
                    For Online Services
                  </label>
                  <div className="row">
                    <div className="col-lg-6 fv-row">
                      <select
                        {...formik.getFieldProps("platformCommisionType")}
                        className={clsx(
                          "form-select form-select-solid form-select-lg fw-bold",
                          {
                            "is-invalid":
                              formik.touched.platformCommisionType &&
                              formik.errors.platformCommisionType,
                          },
                          {
                            "is-valid":
                              formik.touched.platformCommisionType &&
                              !formik.errors.platformCommisionType,
                          }
                        )}
                      >
                        <option value="Flat">Flat</option>
                        <option value="Percent">Percent</option>
                      </select>
                      {formik.touched.platformCommisionType &&
                        formik.errors.platformCommisionType && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.platformCommisionType}
                            </span>
                          </div>
                        )}
                    </div>

                    <div className="col-lg-6 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("platFormCommisionValue")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.platFormCommisionValue &&
                              formik.errors.platFormCommisionValue,
                          },
                          {
                            "is-valid":
                              formik.touched.platFormCommisionValue &&
                              !formik.errors.platFormCommisionValue,
                          }
                        )}
                        placeholder="Enter Value"
                      />
                      {formik.touched.platFormCommisionValue &&
                        formik.errors.platFormCommisionValue && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.platFormCommisionValue}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-4">
                  <label className="col-form-label fw-bold">
                    For Logistic Services
                  </label>
                  <div className="row">
                    <div className="col-lg-6 fv-row">
                      <select
                        {...formik.getFieldProps("logisticsCommisionType")}
                        className={clsx(
                          "form-select form-select-solid form-select-lg fw-bold",
                          {
                            "is-invalid":
                              formik.touched.logisticsCommisionType &&
                              formik.errors.logisticsCommisionType,
                          },
                          {
                            "is-valid":
                              formik.touched.logisticsCommisionType &&
                              !formik.errors.logisticsCommisionType,
                          }
                        )}
                      >
                        <option value="Flat">Flat</option>
                        <option value="Percent">Percent</option>
                      </select>
                      {formik.touched.logisticsCommisionType &&
                        formik.errors.logisticsCommisionType && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.logisticsCommisionType}
                            </span>
                          </div>
                        )}
                    </div>

                    <div className="col-lg-6 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("logisticsCommisionValue")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.logisticsCommisionValue &&
                              formik.errors.logisticsCommisionValue,
                          },
                          {
                            "is-valid":
                              formik.touched.logisticsCommisionValue &&
                              !formik.errors.logisticsCommisionValue,
                          }
                        )}
                        placeholder="Enter Value"
                      />
                      {formik.touched.logisticsCommisionValue &&
                        formik.errors.logisticsCommisionValue && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.logisticsCommisionValue}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6">
                  App Subscription Fee
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("subscriptionFee")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.subscriptionFee &&
                              formik.errors.subscriptionFee,
                          },
                          {
                            "is-valid":
                              formik.touched.subscriptionFee &&
                              !formik.errors.subscriptionFee,
                          }
                        )}
                        placeholder="Enter Value"
                      />
                      {formik.touched.subscriptionFee &&
                        formik.errors.subscriptionFee && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.subscriptionFee}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <h3>Payout Settings</h3>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6">
                  Minimum Payout Amount
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        {...formik.getFieldProps("minPayoutAmount")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.minPayoutAmount &&
                              formik.errors.minPayoutAmount,
                          },
                          {
                            "is-valid":
                              formik.touched.minPayoutAmount &&
                              !formik.errors.minPayoutAmount,
                          }
                        )}
                        placeholder="Enter Value"
                      />
                      {formik.touched.minPayoutAmount &&
                        formik.errors.minPayoutAmount && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.minPayoutAmount}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer d-flex justify-content-end py-6 px-9 gap-5">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={setFormToInitial}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
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

export default RateSettings;
