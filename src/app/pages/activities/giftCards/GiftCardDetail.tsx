import { FC, useState, useEffect, useRef } from "react";
import * as Yup from "yup";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useFormik } from "formik";
import { format, set } from "date-fns";
import clsx from "clsx";
import AlertBox from "../../../../common/AlertBox";
import Select from "react-select";
import {
  postRequest,
  patchRequest,
  getRequest,
} from "../../../modules/auth/core/_requests";
import { useLocation, useParams } from "react-router-dom";
import {
  dateFormateYYYYMMDD,
} from "../../../../common/Date";

const GiftCardDetail: FC = () => {
  const giftCardSchema = Yup.object().shape({
    customerId: Yup.array().min(1, "Select at least one customer"),
    currencyId: Yup.string().required("Currency Id is required"),
    giftCardTitle: Yup.string()
      .min(3, "Minimum 3 Character")
      .max(50, "Maximum 50 Character")
      .required("Package Name is required"),
    description: Yup.string()
      .min(3, "Minimum 3 Character")
      .max(50, "Maximum 50 Character")
      .required("Currency Code is required"),
    amount: Yup.number().required("Currency Value is required"),
    // startDate: Yup.date().required("Currency Value is required"),
    // endDate: Yup.date().required("Currency Value is required"),
  });

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const { giftId } = useParams();
  const [periodType, setPeriodType] = useState("Month");
  const [ismonth, setIsMonth] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [selectedYear, setSelectedYear] = useState(2024);

  const fileRef = useRef(null);

  interface GiftCardFormValues {
    customerId: string[];
    currencyId: string;
    giftCardTitle: string;
    description: string;
    amount: string;
    startDate: string;
    endDate: string;
  }

  const initialValues: GiftCardFormValues = {
    customerId: [],
    currencyId: "",
    giftCardTitle: "",
    description: "",
    amount: "",
    startDate: "",
    endDate: "",
  };

  const [formData, setFormData] = useState<GiftCardFormValues>(initialValues);

  const location = useLocation();
  const editData: any = location.state;

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };
  const formatDateToYYYYMMDD = (dateString: any) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    if (location.pathname === "/activities/giftCard/create") {
      setFormData({
        customerId: [],
        currencyId: "",
        giftCardTitle: "",
        description: "",
        startDate: "", // Set current date as "YYYY-MM-DD"
        amount: "",
        endDate: "",   // Set current date as "YYYY-MM-DD"
      });
    } else {
      const giftCardData = JSON.parse(localStorage.getItem("selectedGiftCard") ?? "{}");
      if (giftCardData && Object.keys(giftCardData).length > 0) {
        setFormData({
          customerId: giftCardData.customerId || "",
          currencyId: giftCardData.currencyId || "",
          giftCardTitle: giftCardData.giftCardTitle || "",
          description: giftCardData.description || "",
          amount: giftCardData.amount || "",
          startDate: giftCardData.startDate ? formatDateToYYYYMMDD(giftCardData.startDate) : "",
          endDate: giftCardData.endDate ? formatDateToYYYYMMDD(giftCardData.endDate) : "",
        });
      }
    }
  }, [location.pathname]);



  const calculateDate = (
    month: string,
    year: string,
    periodType: string,
    isStart: boolean
  ) => {
    const currentDate = new Date(Number(year), Number(month) - 1); // month is 0-indexed

    let calculatedDate: Date;

    if (periodType === "Month") {
      // First or last day of the month
      if (isStart) {
        calculatedDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          1
        );
      } else {
        calculatedDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0
        );
      }
    } else {
      calculatedDate = currentDate;
    }

    // Return in "yyyy-MM-dd" format
    return format(calculatedDate, "yyyy-MM-dd");
  };

  useEffect(() => {
    async function getData() {
      if (giftId !== "create") {
        if (editData) {
          const initialValues = {
            customerId: editData.customerId?._id,
            currencyId: editData.currencyId?._id,
            giftCardTitle: editData.giftCardTitle,
            description: editData?.description,
            amount: editData?.amount,
            startDate: dateFormateYYYYMMDD(editData?.startDate),
            endDate: dateFormateYYYYMMDD(editData?.endDate),
          };
          setFormData(initialValues);
        }
      }

      try {
        const customerData = await getRequest(`/customer/list`, ``);
        const currencyData = await postRequest(`/master/currencies`, ``);

        const data = await Promise.all([customerData, currencyData]);

        setCustomerList(data[0]?.data?.status === "ok" ? data[0]?.data?.data : []);
        setCurrencyList(data[1]?.data?.status === "ok" ? data[1]?.data?.data : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    getData();
  }, [giftId, editData]);

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: giftCardSchema,
    onSubmit: async (values) => {
      setLoading(true);



      const reqBody = {
        customerId: values.customerId,
        currencyId: values.currencyId,
        giftCardTitle: values.giftCardTitle,
        description: values.description,
        periodType: periodType,
        amount: values.amount,
        ...(ismonth
          ? {
            month: selectedMonth,
            year: selectedYear,
          }
          : {
            startDate: values.startDate,
            endDate: values.endDate,
          }),
      };

      try {
        let response;
        if (giftId && giftId !== "create") {
          response = await patchRequest(`/activities/giftCard/${giftId}`, reqBody);
        } else {
          response = await postRequest(`/activities/giftCard`, reqBody);
        }

        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Gift Card has been ${giftId === "create" ? "added" : "updated"} successfully`);
        } else {
          setIsFailed(true);
          setErrorMsg("Something Went Wrong");
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg("Something Went Wrong");
      } finally {
        setLoading(false);
      }
    },
  });
  const handlePeriodTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPeriodType(event.target.value);
    if (event.target.value === "Month") {
      setIsMonth(true);
    }
    else {
      setIsMonth(false);
    }
  }

  const customerOptions = customerList.map((e: any) => ({
    value: e._id,
    label: `${e.firstName} - ${e.lastName}`,
  }));
  return (
    <>
      <PageTitle>ADD GIFT CARD</PageTitle>

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
                Gift Card Title
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      {...formik.getFieldProps("giftCardTitle")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.giftCardTitle &&
                            formik.errors.giftCardTitle,
                        },
                        {
                          "is-valid":
                            formik.touched.giftCardTitle &&
                            !formik.errors.giftCardTitle,
                        }
                      )}
                      placeholder="Enter Title"
                    />
                    {formik.touched.giftCardTitle &&
                      formik.errors.giftCardTitle && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">
                            {formik.errors.giftCardTitle}
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
            <div className="row mb-4">
              {/* Label Column */}
              <div className="col-lg-4 d-flex align-items-center">
                <label className="form-label fw-bold mb-0">Select Period Type</label>
              </div>

              {/* Radio Buttons Column */}
              <div className="col-lg-8 d-flex align-items-center gap-4">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="periodType"
                    id="monthRadio"
                    value="Month"
                    checked={periodType === "Month"}
                    onChange={handlePeriodTypeChange}
                  />
                  <label className="form-check-label" htmlFor="monthRadio">
                    Month
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="periodType"
                    id="dateRadio"
                    value="Date"
                    checked={periodType === "Date"}
                    onChange={handlePeriodTypeChange}
                  />
                  <label className="form-check-label" htmlFor="dateRadio">
                    Date
                  </label>
                </div>
              </div>
            </div>

            <div className="row mb-4">
              {/* Label */}
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Registered From & To
              </label>

              {/* Content: Month or Date Range */}
              <div className="col-lg-8">
                {ismonth ? (
                  <div className="d-flex align-items-center gap-3">
                    {/* Select Month */}
                    <div>
                      <label className="form-label fw-bold mb-1">Month</label>
                      <select
                        className="form-select"
                        name="month"
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                      >
                        <option value="">Select Month</option>
                        <option value={1}>January</option>
                        <option value={2}>February</option>
                        <option value={3}>March</option>
                        <option value={4}>April</option>
                        <option value={5}>May</option>
                        <option value={6}>June</option>
                        <option value={7}>July</option>
                        <option value={8}>August</option>
                        <option value={9}>September</option>
                        <option value={10}>October</option>
                        <option value={11}>November</option>
                        <option value={12}>December</option>
                      </select>
                    </div>

                    {/* Select Year */}
                    <div>
                      <label className="form-label fw-bold mb-1">Year</label>
                      <select
                        className="form-select"
                        name="year"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                      >
                        <option value="">Select Year</option>
                        {[2025, 2026, 2027, 2028, 2029, 2030].map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )
                  : (
                    <div className="row g-3">
                      {/* Start Date */}
                      <div className="col-md-6">
                        <input
                          type="date"
                          {...formik.getFieldProps("startDate")}
                          className={clsx(
                            "form-control form-control-lg form-control-solid",
                            {
                              "is-invalid": formik.touched.startDate && formik.errors.startDate,
                            },
                            {
                              "is-valid": formik.touched.startDate && !formik.errors.startDate,
                            }
                          )}
                          placeholder="Start Date"
                        />
                        {formik.touched.startDate && formik.errors.startDate && (
                          <div className="text-danger mt-1">
                            <small>{formik.errors.startDate}</small>
                          </div>
                        )}
                      </div>

                      {/* End Date */}
                      <div className="col-md-6">
                        <input
                          type="date"
                          {...formik.getFieldProps("endDate")}
                          className={clsx(
                            "form-control form-control-lg form-control-solid",
                            {
                              "is-invalid": formik.touched.endDate && formik.errors.endDate,
                            },
                            {
                              "is-valid": formik.touched.endDate && !formik.errors.endDate,
                            }
                          )}
                          placeholder="End Date"
                        />
                        {formik.touched.endDate && formik.errors.endDate && (
                          <div className="text-danger mt-1">
                            <small>{formik.errors.endDate}</small>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Customer
              </label>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <Select
                      isMulti
                      name="customerId"
                      options={customerOptions}
                      value={customerOptions.filter(option =>
                        formik.values.customerId.includes(option.value)
                      )}
                      onChange={(selectedOptions) => {
                        const selectedValues = selectedOptions.map((option) => option.value);
                        formik.setFieldValue("customerId", selectedValues);
                      }}
                      onBlur={() => formik.setFieldTouched("customerId", true)}
                      classNamePrefix="react-select"
                      className={clsx("mb-3", {
                        "is-invalid":
                          formik.touched.customerId && formik.errors.customerId,
                      })}
                    />


                    {formik.touched.customerId && formik.errors.customerId && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.customerId}</span>
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
                      {currencyList.map((e: any) => {
                        return (
                          <option value={e._id}>
                            {e.currencySymbol} - {e.currency}
                          </option>
                        );
                      })}
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
        </div >
      </div >
      {isSuccess && (
        <AlertBox
          redirectUrl={`/activities/giftCards`}
          close={closeAlert}
          type={`success`}
        >
          {successMsg}
        </AlertBox>
      )}
      {
        isFailed && (
          <AlertBox redirectUrl={null} close={closeAlert} type={`error`}>
            {errorMsg}
          </AlertBox>
        )
      }
    </>
  );
};

export default GiftCardDetail;
