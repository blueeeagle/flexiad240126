import { FC, useState, useEffect } from "react";
import * as Yup from "yup";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useFormik } from "formik";
import clsx from "clsx";
import AlertBox from "../../../../common/AlertBox";
import { postRequest, patchRequest } from "../../../modules/auth/core/_requests";
import { useLocation, useParams } from "react-router-dom";

const mPackageSchema = Yup.object().shape({
  packageTitle: Yup.string()
    .min(3, "Minimum 3 Character")
    .max(50, "Maximum 50 Character")
    .required("Package Name is required"),
  description: Yup.string()
    .min(3, "Minimum 3 Character")
    .max(50, "Maximum 50 Character")
    .required("Description is required"),
  sortNo: Yup.number().required("Sort Number is required"),
  purchaseAmt: Yup.number().required("Purchase Amount is required"),
  packageAmt: Yup.number().required("Package Amount is required"),
  countryId: Yup.string().required("Country is required"),
  currencyId: Yup.string().required("Currency Id is required"),
});

interface Currency {
  _id: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
}

interface Country {
  _id: string;
  name: string;
  iso2: string;
  iso3: string;
  dialCode: string;
  currencyId: Currency;
}

const MCreditDetail: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [currencyList, setCurrencyList] = useState<Currency[]>([]);
  const { packageId } = useParams();
  const initialValues = {
    packageTitle: "",
    description: "",
    purchaseAmt: "",
    packageAmt: "",
    sortNo: "",
    countryId: "",
    currencyId: "",
  };

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: mPackageSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const reqBody = {
        countryId: values.countryId,
        currencyId: values.currencyId,
        packageTitle: values.packageTitle,
        description: values.description,
        purchaseAmt: values.purchaseAmt,
        packageAmt: values.packageAmt,
        sortNo: values.sortNo,
      };

      try {
        const response = packageId !== "create"
          ? await patchRequest(`/activities/package/${packageId}`, reqBody)
          : await postRequest(`/activities/package`, reqBody);

        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Package has been ${packageId !== "create" ? 'updated' : 'added'} successfully`);
        } else {
          throw new Error("Something Went Wrong");
        }
      } catch (error:any) {
        setIsFailed(true);
        setErrorMsg(error.message || "Something Went Wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  const location = useLocation();
  const editData: any = location.state;

  const getData = async () => {
    if (packageId !== "create" && editData) {
      formik.setValues({
        countryId: editData.countryId?._id || "",
        currencyId: editData.currencyId?._id || "",
        packageTitle: editData.packageTitle,
        description: editData.description,
        purchaseAmt: editData.purchaseAmt,
        packageAmt: editData.packageAmt,
        sortNo: editData.sortNo,
        
      });
    }

    const countryData = await postRequest(`/master/countries`, ``);
    const currencyData = await postRequest(`/master/currencies`, ``);

    const countryListResponse = countryData.data?.status === "ok" ? countryData.data.data : [];
    const currencyListResponse = currencyData.data?.status === "ok" ? currencyData.data.data : [];

    setCountryList(countryListResponse);
    setCurrencyList(currencyListResponse);
  };

  useEffect(() => {
    getData();
  }, [packageId]); // Only run this effect when packageId changes

  useEffect(() => {
    const selectedCountry = countryList.find((country) => country._id === formik.values.countryId);
    if (selectedCountry) {
      formik.setFieldValue("currencyId", selectedCountry.currencyId?._id || "");
    } else {
      formik.setFieldValue("currencyId", "");
    }
  }, [formik.values.countryId, countryList]);

  useEffect(() => {
    const { packageAmt, countryId } = formik.values;
    
    if (packageAmt) {
      const currencyInfo = currencyList.find((currency) => packageAmt.includes(currency.currencyCode));
      if (currencyInfo) {
        const countryInfo = countryList.find((country) => country.currencyId?._id === currencyInfo._id);
        if (countryInfo) {
          formik.setFieldValue("countryId", countryInfo._id);
          formik.setFieldValue("currencyId", currencyInfo._id);
        }
      }
    }
  }, [formik.values.packageAmt, countryList, currencyList]);

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };
  return (
    <>
      <PageTitle>ADD PACKAGE</PageTitle>

      <div className="card">
        <div className="card-body">
          <form
            className="form w-100"
            onSubmit={formik.handleSubmit}
            noValidate
            id="kt_login_signin_form"
          >
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Package Title
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      // className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
                      {...formik.getFieldProps("packageTitle")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.packageTitle &&
                            formik.errors.packageTitle,
                        },
                        {
                          "is-valid":
                            formik.touched.packageTitle &&
                            !formik.errors.packageTitle,
                        }
                      )}
                      name="packageTitle"
                      placeholder="Enter Title"
                    />
                    {formik.touched.packageTitle &&
                      formik.errors.packageTitle && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.packageTitle}</span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Description
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      {...formik.getFieldProps("description")}
                      name="description"
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.description &&
                            formik.errors.description,
                        },
                        {
                          "is-valid":
                            formik.touched.description &&
                            !formik.errors.description,
                        }
                      )}
                      placeholder="Enter Description"
                    />
                    {formik.touched.description &&
                      formik.errors.description && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.description}</span>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
  <label className="col-lg-4 col-form-label required fw-bold fs-6">
    Total Free M Credits
  </label>

  <div className="col-lg-8">
    <div className="row">
      <div className="col-lg-12 fv-row">
        <input
          type="text" // Keep type as text
          {...formik.getFieldProps("purchaseAmt")}
          name="purchaseAmt"
          className={clsx(
            "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
            {
              "is-invalid":
                formik.touched.purchaseAmt && formik.errors.purchaseAmt,
            },
            {
              "is-valid":
                formik.touched.purchaseAmt && !formik.errors.purchaseAmt,
            }
          )}
          placeholder="Enter Amount"
          onChange={(e) => {
            // Remove all non-numeric characters from the input
            const value = e.target.value.replace(/[^0-9]/g, ''); // Keep only numbers
            formik.setFieldValue("purchaseAmt", value); // Update Formik value
          }}
        />
        {formik.touched.purchaseAmt && formik.errors.purchaseAmt && (
          <div
            style={{ color: "red" }}
            className="fv-plugins-message-container"
          >
            <span role="alert">{formik.errors.purchaseAmt}</span>
          </div>
        )}
      </div>
    </div>
  </div>
</div>

<div className="row mb-12">
  <label className="col-lg-4 col-form-label required fw-bold fs-6">
    Amount to Pay
  </label>

  <div className="col-lg-8">
    <div className="row">
      <div className="col-lg-12 fv-row">
        <input
          type="text" // Keep type as text
          {...formik.getFieldProps("packageAmt")}
          name="packageAmt"
          className={clsx(
            "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
            {
              "is-invalid":
                formik.touched.packageAmt && formik.errors.packageAmt,
            },
            {
              "is-valid":
                formik.touched.packageAmt && !formik.errors.packageAmt,
            }
          )}
          placeholder="Enter Amount"
          onChange={(e) => {
            // Remove all non-numeric characters from the input
            const value = e.target.value.replace(/[^0-9]/g, ''); // Keep only numbers
            formik.setFieldValue("packageAmt", value); // Update Formik value
          }}
        />
        {formik.touched.packageAmt && formik.errors.packageAmt && (
          <div
            style={{ color: "red" }}
            className="fv-plugins-message-container"
          >
            <span role="alert">{formik.errors.packageAmt}</span>
          </div>
        )}
      </div>
    </div>
  </div>
</div>


            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Sort No
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      {...formik.getFieldProps("sortNo")}
                      name="sortNo"
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.sortNo && formik.errors.sortNo,
                        },
                        {
                          "is-valid":
                            formik.touched.sortNo && !formik.errors.sortNo,
                        }
                      )}
                      placeholder="Enter No"
                    />
                    {formik.touched.sortNo && formik.errors.sortNo && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.sortNo}</span>
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
                className={clsx(
                  "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                  {
                    "is-invalid": formik.touched.countryId && formik.errors.countryId,
                  },
                  {
                    "is-valid": formik.touched.countryId && !formik.errors.countryId,
                  }
                )}
              >
                <option value="">Select a Country...</option>
                {countryList.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.iso3} - {e.name}
                  </option>
                ))}
              </select>
              {formik.touched.countryId && formik.errors.countryId && (
                <div style={{ color: "red" }} className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.countryId}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Currency Dropdown */}
      <div className="row mb-12">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">
          Currency
        </label>
        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-12 fv-row">
              <select
                {...formik.getFieldProps("currencyId")}
                disabled
                className={clsx(
                  "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                  {
                    "is-invalid": formik.touched.currencyId && formik.errors.currencyId,
                  },
                  {
                    "is-valid": formik.touched.currencyId && !formik.errors.currencyId,
                  }
                )}
              >
                <option value="">Select a Currency...</option>
                {currencyList.map((e) => (
                  <option key={e._id} value={e._id}>
                    {e.currencySymbol} - {e.currency}
                  </option>
                ))}
              </select>
              {formik.touched.currencyId && formik.errors.currencyId && (
                <div style={{ color: "red" }} className="fv-plugins-message-container">
                  <span role="alert">{formik.errors.currencyId}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

            <div className="d-flex flex-stack pt-15">
              <div className="mr-2">
                <button
                  type="button"
                  className="btn btn-lg btn-light-primary me-3"
                >
                  Cancel
                </button>
              </div>

              <div>
                <button type="submit" className="btn btn-lg btn-primary me-3">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {isSuccess && (
        <AlertBox
          redirectUrl={`/activities/mcreditlist`}
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

export default MCreditDetail;
