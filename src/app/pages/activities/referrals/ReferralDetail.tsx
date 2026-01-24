import { FC, useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import clsx from "clsx";
import {
  postRequest,
  patchRequest,
} from "../../../modules/auth/core/_requests";
import { useLocation, useParams } from "react-router-dom";
import { PageTitle } from "../../../../_metronic/layout/core";
import AlertBox from "../../../../common/AlertBox";

// Helper function to format date to "YYYY-MM-DD"
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0]; // Format date as "YYYY-MM-DD"
};

const ReferralDetail: FC = () => {
  const referralSchema = Yup.object().shape({
    countryId: Yup.string().required("Country is required"),
    currencyId: Yup.string().required("Currency Id is required"),
    refferalTitle: Yup.string()
      .min(3, "Minimum 3 Characters")
      .max(50, "Maximum 50 Characters")
      .required("Package Name is required"),
    description: Yup.string()
      .min(3, "Minimum 3 Characters")
      .max(50, "Maximum 50 Characters")
      .required("Description is required"),
    amount: Yup.number().required("Amount is required"),
    startDate: Yup.date().required("Start Date is required"),
    endDate: Yup.date().required("End Date is required"),
    userLimit: Yup.number().required("User Limit is required"),
    imgUrl: Yup.mixed().required("File is required"),
  });

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [countryList, setCountryList] = useState<any[]>([]);
  const [currencyList, setCurrencyList] = useState<any[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { referralId } = useParams();
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileRef = useRef(null);

  const initialValues = {
    countryId: "",
    currencyId: "",
    refferalTitle: "",
    description: "",
    amount: "",
    startDate: "",
    endDate: "",
    userLimit: "",
    imgUrl: "",
  };

  const [formData, setFormData] = useState(initialValues);
  const location = useLocation();
  const editData: any = location.state;

  const closeAlert = () => {
    setIsSuccess(false);
    setIsFailed(false);
  };

  const getData = async () => {
    try {
      if (referralId !== "create" && editData) {
        const initialValues = {
          countryId: editData.countryId?._id || "",
          currencyId: editData.currencyId?._id || "",
          refferalTitle: editData.refferalTitle || "",
          description: editData.description || "",
          amount: editData.amount || "",
          startDate: formatDate(editData.startDate || ""), // Format startDate
          endDate: formatDate(editData.endDate || ""), // Format endDate
          userLimit: editData.userLimit || "",
          imgUrl: editData.imgUrl || null,
        };
        setFormData(initialValues);
      } else {
        setFormData(initialValues);
      }

      const [countryData, currencyData] = await Promise.all([
        postRequest(`/master/countries`, ``),
        postRequest(`/master/currencies`, ``),
      ]);

      if (countryData?.data?.status === "ok") {
        setCountryList(countryData.data.data);
      }
      if (currencyData?.data?.status === "ok") {
        setCurrencyList(currencyData.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMsg("Failed to fetch country or currency data.");
      setIsFailed(true);
    }
  };

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: referralSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const reqBody = {
        countryId: values.countryId,
        currencyId: values.currencyId,
        refferalTitle: values.refferalTitle,
        description: values.description,
        amount: values.amount,
        startDate: values.startDate,
        endDate: values.endDate,
        userLimit: values.userLimit,
      };

      const requestData = new FormData();
      requestData.append("data", JSON.stringify(reqBody));
      requestData.append("imgUrl", values.imgUrl);

      try {
        const response =
          referralId !== "create"
            ? await patchRequest(
                `/activities/refferal/${referralId}`,
                requestData
              )
            : await postRequest(`/activities/refferal`, requestData);

        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(
            referralId !== "create"
              ? "Referral has been updated successfully"
              : "Referral has been added successfully"
          );
        } else {
          setIsFailed(true);
          setErrorMsg("Something went wrong.");
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    const storedCurrencies = localStorage.getItem("currencyList");
    if (storedCurrencies) {
      setCurrencyList(JSON.parse(storedCurrencies));
    }
  }, []);
  useEffect(() => {
    // Check if the current path is '/activities/referral/create'
    const isCreatePath =
      window.location.pathname === "/activities/referral/create";

    // Only retrieve country name from local storage if not on the create path
    if (!isCreatePath) {
      const storedCountry = localStorage.getItem("countryName");
      console.log(storedCountry);

      // Set the country in Formik if available
      if (storedCountry) {
        const country = countryList.find(
          (country) => country.name === storedCountry // Use the correct property for country name
        );

        if (country) {
          formik.setFieldValue("countryId", country._id);
          // Set the currencyId based on the selected country
          if (country.currencyId) {
            formik.setFieldValue("currencyId", country.currencyId._id);
          } else {
            formik.setFieldValue("currencyId", "");
          }
        }
      }
    }
  }, [countryList, formik]);

  useEffect(() => {
    // Check if countryId has changed
    const selectedCountry = countryList.find(
      (country) => country._id === formik.values.countryId
    );

    // If a selected country is found, set the currencyId
    if (selectedCountry && selectedCountry.currencyId) {
      formik.setFieldValue("currencyId", selectedCountry.currencyId._id);
    } else {
      // Reset currencyId if no country is selected
      formik.setFieldValue("currencyId", "");
    }
  }, [formik.values.countryId, countryList]);

  useEffect(() => {
    const isCreatePath = location.pathname === "/activities/referral/create";
    if (!isCreatePath) {
      const imgUrl = localStorage.getItem("imgUrl");
      if (imgUrl) {
        setImageUrl(`http://adminapi.flexiclean.me/${imgUrl}`);
      }
    }
  }, [location]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          // Update both imageUrl and formik's imgUrl field
          setImageUrl(reader.result as string);
          formik.setFieldValue("imgUrl", file); // Set the file itself
          // Save the URL to local storage if needed
          localStorage.setItem("imgUrl", reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <>
      <PageTitle>ADD REFERRAL</PageTitle>

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
                Referral Title
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      {...formik.getFieldProps("refferalTitle")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.refferalTitle &&
                            formik.errors.refferalTitle,
                        },
                        {
                          "is-valid":
                            formik.touched.refferalTitle &&
                            !formik.errors.refferalTitle,
                        }
                      )}
                      placeholder="Enter Title"
                    />
                    {formik.touched.refferalTitle &&
                      formik.errors.refferalTitle && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">
                            {formik.errors.refferalTitle}
                          </span>
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
                Free Credits
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      {...formik.getFieldProps("amount")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.amount && formik.errors.amount,
                        },
                        {
                          "is-valid":
                            formik.touched.amount && !formik.errors.amount,
                        }
                      )}
                      placeholder="Enter Value"
                    />
                    {formik.touched.amount && formik.errors.amount && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.amount}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                User Limits
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      {...formik.getFieldProps("userLimit")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.userLimit && formik.errors.userLimit,
                        },
                        {
                          "is-valid":
                            formik.touched.userLimit &&
                            !formik.errors.userLimit,
                        }
                      )}
                      placeholder="Enter Limits"
                    />
                    {formik.touched.userLimit && formik.errors.userLimit && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.userLimit}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Registered From & To
              </label>

              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="date"
                      {...formik.getFieldProps("startDate")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.startDate && formik.errors.startDate,
                        },
                        {
                          "is-valid":
                            formik.touched.startDate &&
                            !formik.errors.startDate,
                        }
                      )}
                      placeholder="Choose"
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.startDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="date"
                      {...formik.getFieldProps("endDate")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.endDate && formik.errors.endDate,
                        },
                        {
                          "is-valid":
                            formik.touched.endDate && !formik.errors.endDate,
                        }
                      )}
                      placeholder="Choose"
                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.endDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              {imageUrl && (
                <div className="row">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    Preview Image
                  </label>
                  <div className="col-lg-8 mb-3">
                    <img
                      src={imageUrl}
                      alt="Uploaded Preview"
                      style={{ maxWidth: "100%", height: "150px" }}
                    />
                  </div>
                </div>
              )}
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Upload Image
              </label>
              <div className="col-lg-8">
                <input
                  type="file"
                  ref={fileRef}
                  onChange={handleFileChange}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.imgUrl && formik.errors.imgUrl,
                    },
                    {
                      "is-valid":
                        formik.touched.imgUrl && !formik.errors.imgUrl,
                    }
                  )}
                />
                <div
                  style={{ color: "red" }}
                  className="fv-plugins-message-container"
                >
                  <span role="alert">
                    {formik.touched.imgUrl && formik.errors.imgUrl}
                  </span>
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
                          "is-invalid":
                            formik.touched.countryId && formik.errors.countryId,
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
                Currency
              </label>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <select
                      {...formik.getFieldProps("currencyId")}
                      disabled
                      value={formik.values.currencyId}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.currencyId &&
                            formik.errors.currencyId,
                        },
                        {
                          "is-valid":
                            formik.touched.currencyId &&
                            !formik.errors.currencyId,
                        }
                      )}
                    >
                      <option value="">Select a Currency...</option>
                      {currencyList.map((e: any) => (
                        <option key={e._id} value={e._id}>
                          {e.currencySymbol} - {e.currency}
                        </option>
                      ))}
                    </select>
                    {formik.touched.currencyId && formik.errors.currencyId && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
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
          redirectUrl={`/activities/referrals`}
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

export default ReferralDetail;
