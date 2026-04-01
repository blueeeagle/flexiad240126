import { FC, useCallback, useEffect, useRef, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import {
  patchRequest,
  postRequest,
} from "../../../modules/auth/core/_requests";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import AlertBox from "../../../../common/AlertBox";
import Select from 'react-select';
import CountryDropdown from "./CountryDropdown";

interface AgentOption {
  companyName: any;
  _id: any;
  value: string;
  label: string;
}

interface DiscountData {
  postFrom?: string;
  companyId?: { _id: string }[];
  promoTitle?: string;
  promoCode?: string;
  offerType?: string;
  orderValue?: string;
  noOfCoupons?: number;
  customerUsageLimit?: number;
  discountType?: string;
  discountAmt?: number;
  discountPercentage?: number;
  startDate?: string;
  endDate?: string;
  serviceId?: any[]; // Adjust according to the actual type
  sortNo?: number;
  imgUrl?: string;
  applicableFor: string;
}
console.log(import.meta.env.VITE_DEFAULT_IMAGE_URL);
const DEFAULT_IMAGE_URL = import.meta.env.VITE_DEFAULT_IMAGE_URL
const DiscountDetail: FC = () => {
  const referralSchema = Yup.object().shape({
    postFrom: Yup.string().required("Post from is required"),
    agentId: Yup.array().when("postFrom", {
      is: (val: any) => val === "Agent",
      then: (schema) => schema.required("Agent is required"),
      otherwise: (schema) => schema.notRequired(),
    }),
    promotitle: Yup.string().required("Promo Title is required"),
    promocode: Yup.string().required("Promo Code is required"),
    offertype: Yup.string()
      .oneOf(["first_order", "all_orders"], "Invalid offer type")
      .required("Offer Type is required"),
    ordervalue: Yup.number()
      .required("Order Value is required")
      .positive("Order Value must be positive"),
    noOfCoupons: Yup.number()
      .required("No Of Coupons is required")
      .positive("No Of Coupons must be positive"),
    usagefrequency: Yup.number()
      .required("Usage Frequency is required")
      .positive("Usage Frequency must be positive"),
    flatorpercentage: Yup.string().required("Flat or Percentage is required"),
    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    validityFrom: Yup.date().required("Validity From is required"),
    validityTo: Yup.date().required("Validity To is required"),
    sortNo: Yup.number()
      .required("Sort No is required")
      .positive("Sort No must be positive"),
    // imgUrl: Yup.mixed().required("Image is required"),
  });

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [agents, setAgents] = useState([]);
  const { discountId } = useParams();
  const [selectedCountry, setSelectedCountry] = useState<string>("6566946881f360c33361e259");
  const [selectedDiscountData, setSelectedDiscountData] = useState<DiscountData | null>(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    console.log("Current location:", location.pathname);
    console.log("Referral ID from URL:", discountId);
  }, [discountId, location.pathname]);

  const initialValues = {
    postFrom: "",
    agentId: "",
    promotitle: "",
    promocode: "",
    offertype: "",
    ordervalue: "",
    noOfCoupons: "",
    usagefrequency: "",
    flatorpercentage: "",
    amount: "",
    validityFrom: "",
    validityTo: "",
    service: "",
    sortNo: "",
    imgUrl: import.meta.env.VITE_DEFAULT_IMAGE_URL,
    applicableFor: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const formatDateString = (dateString: string) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    const storedData = JSON.parse(
      localStorage.getItem("selectedDiscountData") || "{}"
    );
    if (storedData) {
      setSelectedDiscountData(storedData);
    }
  }, []);

  const isCreatePage = location.pathname === "/activities/discount/create";
  const isUpdatePage =
  location.pathname.startsWith("/activities/discount") && !isCreatePage;

  const formik = useFormik({
    initialValues: isCreatePage
      ? {
          postFrom: "Admin",
          currencyId: null,
          agentId: "",
          promotitle: "",
          promocode: "",
          offertype: "",
          ordervalue: "",
          noOfCoupons: "",
          usagefrequency: "",
          flatorpercentage: "",
          amount: "",
          validityFrom: "",
          validityTo: "",
          service: [],
          sortNo: 1,
          imgUrl: "", // non‑empty value to satisfy required validation
          applicableFor: "",
        }
      : {
          postFrom:
            selectedDiscountData?.postFrom === "Admin"
              ? "Admin"
              : "Agent",
          agentId: Array.isArray(selectedDiscountData?.companyId)
            ? selectedDiscountData.companyId.join(",") || ""
            : selectedDiscountData?.companyId || "",
          promotitle: selectedDiscountData?.promoTitle || "",
          promocode: selectedDiscountData?.promoCode || "",
          offertype:
            selectedDiscountData?.offerType === "First Time"
              ? "first_order"
              : selectedDiscountData?.offerType === "All Orders"
              ? "all_orders"
              : "",
          ordervalue: parseFloat(selectedDiscountData?.orderValue || "") || "",
          noOfCoupons: selectedDiscountData?.noOfCoupons || "",
          usagefrequency: selectedDiscountData?.customerUsageLimit || "",
          flatorpercentage:
            selectedDiscountData?.discountType === "Percentage"
              ? "percentage"
              : "flat",
          amount:
            selectedDiscountData?.discountAmt?.toString() ||
            selectedDiscountData?.discountPercentage?.toString() ||
            "",
          validityFrom: selectedDiscountData?.startDate
            ? formatDateString(selectedDiscountData?.startDate)
            : "",
          validityTo: selectedDiscountData?.endDate
            ? formatDateString(selectedDiscountData?.endDate)
            : "",
          service: selectedDiscountData?.serviceId || [],
          sortNo: selectedDiscountData?.sortNo || "",
          imgUrl: selectedDiscountData?.imgUrl || "",
          applicableFor:
            selectedDiscountData?.applicableFor === "Online"
              ? "online"
              : selectedDiscountData?.applicableFor === "POS"
              ? "pos"
              : "",
        },
    enableReinitialize: true,
    validationSchema: referralSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const reqBody = {
        postFrom: values.postFrom,
        currencyId: values.currencyId,
        companyId: values.agentId.includes("") ? [] : values.agentId,
        promoTitle: values.promotitle,
        promoCode: values.promocode,
        offerType: values.offertype === "first_order" ? "First Time" : "All",
        orderValue: values.ordervalue,
        noOfCoupons: values.noOfCoupons,
        customerUsageLimit: values.usagefrequency || "",
        discountType:
          values.flatorpercentage === "flat" ? "Flat" : "Percentage",
        discountAmt: values.flatorpercentage === "flat" ? values.amount : 0,
        discountPercentage:
          values.flatorpercentage === "percentage" ? values.amount : 0,
        startDate: values.validityFrom || "",
        endDate: values.validityTo || "",
        serviceId:
          Array.isArray(values.service) && values.service.length > 0
            ? values.service
            : [],
        applicableFor: values.applicableFor === "online" ? "Online" : "POS",
        sortNo: 1,
        imgUrl: values.imgUrl,
      };

      const requestData = new FormData();
      requestData.append("data", JSON.stringify(reqBody));

      // For create page: fetch default image and append it as a file
      if (isCreatePage) {
        try {
          const defaultImageFile = await fetchDefaultImageAsFile(DEFAULT_IMAGE_URL);
          requestData.append("imgUrl", defaultImageFile);
        } catch (error) {
          console.error("Failed to fetch default image:", error);
          setIsFailed(true);
          setErrorMsg("Failed to load default image");
          setLoading(false);
          return;
        }
      } else if (isUpdatePage && values.imgUrl && typeof values.imgUrl === "object") {
        // Only append if a new image file was provided (user selected a file)
        // Since we removed the file input, this branch will never be taken.
        // For updates we keep the existing image, so we do nothing here.
      }

      try {
        if (isUpdatePage) {
          console.log("Calling PATCH (update) API");
          const response = await patchRequest(
            `/activities/discount/${discountId}`,
            requestData
          );
          if (response?.data?.status === "ok") {
            setIsSuccess(true);
            setSuccessMsg("Discount has been updated successfully");
            navigate('/activities/discounts');
          } else {
            setIsFailed(true);
            setErrorMsg("Something Went Wrong");
          }
        } else if (isCreatePage) {
          console.log("Calling POST (create) API");
          const response = await postRequest(
            "/activities/discount",
            requestData
          );
          if (response?.data?.status === "ok") {
            setIsSuccess(true);
            setSuccessMsg("Discount has been added successfully");
          } else {
            setIsFailed(true);
            setErrorMsg("Something Went Wrong");
          }
        }
      } catch (error) {
        console.error("Error during API call:", error);
        setIsFailed(true);
        setErrorMsg("Something Went Wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  // Helper: fetch an image from a URL and return it as a File object
  const fetchDefaultImageAsFile = async (url: string): Promise<File> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();
    // Extract file name from URL or use a default name
    const fileName = url.split('/').pop() || 'default_image.png';
    return new File([blob], fileName, { type: blob.type });
  };

  const editData: any = location.state;

  const getData = async () => {
    if (discountId !== "create") {
      if (editData) {
        let initialValues = {
          postFrom: editData.postFrom,
          agentId: editData.agent,
          promotitle: editData.promotitle || "",
          promocode: editData.promocode || "",
          offertype: editData.offertype || "",
          ordervalue: editData.ordervalue || "",
          noOfCoupons: editData.noOfCoupons || "",
          usagefrequency: editData.usagefrequency || "",
          flatorpercentage: editData.flatorpercentage || "",
          amount: editData.amount || "",
          validityFrom: editData.validityFrom || "",
          validityTo: editData.validityTo || "",
          service: editData.service || "",
          sortNo: editData.sortNo || "",
          imgUrl: editData.imgUrl || null,
          applicableFor: editData.applicableFor || "",
        };
        setFormData(initialValues);
      }
    }
    const countryData = await postRequest(`/master/countries`, ``);
    const currencyData = await postRequest(`/master/currencies`, ``);
    const lookupObj = [countryData, currencyData];
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
          countryData: d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
          currencyData: d[1]?.data?.status === "ok" ? d[1]?.data?.data : [],
        };
        setCountryList(dataobj.countryData);
      });
  };

  useEffect(() => {
    async function loadData() {
      await getData();
    }
    loadData();
  }, []);

  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId);
  };

  const fetchAgents = useCallback(async () => {
    try {
      const response = await fetch(
        "https://adminapi.flexiclean.me/api/v1/agent/list",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();
      const filteredData = result?.data?.filter(
        (item: { addressDetails: { countryId: string } }) =>
          item?.addressDetails?.countryId === selectedCountry
      );

      if (result.status === "ok") {
        setAgents(filteredData);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }, [selectedCountry, token]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const agentIds = formik.values.agentId ?? [];
  const companyId =
    Array.isArray(agentIds) && agentIds.length > 0
      ? agentIds[agentIds.length - 1]
      : "";
  const formikRef = useRef<FormikProps<any> | null>(null);
  formikRef.current = formik;

  const getService = useCallback(async () => {
    try {
      if (companyId) {
        const response = await fetch(
          `${import.meta.env.VITE_APP_API_URL}/agent/service/${companyId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        const currentServices = formik.values.service ?? [];
        const updatedServices = [...currentServices, data.data._id];
        formikRef.current?.setFieldValue("service", updatedServices);
        formikRef.current?.setFieldValue(
          "currencyId",
          data?.data?.companyId?.currencyId?._id
        );
      }
    } catch (e) {
      console.error("Failed to fetch service data", e);
    }
  }, [companyId, token]);

  useEffect(() => {
    getService();
  }, [getService]);

  const agentOptions = agents.map((agent: AgentOption) => ({
    value: agent._id,
    label: agent.companyName,
  }));

  useEffect(() => {
    if (!formik.values.agentId.length) {
      formik.setFieldValue("agentId", []);
    }
  }, []);

  return (
    <>
      <PageTitle>ADD DISCOUNT</PageTitle>
      <div className="w-100 d-flex justify-content-end align-items-end mb-5">
        <CountryDropdown onCountrySelect={handleCountrySelect} />
      </div>
      <div className="card">
        <div className="card-body">
          <form
            className="form w-100"
            onSubmit={formik.handleSubmit}
            noValidate
            id="kt_login_signin_form"
          >
            {/* Post from */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Post from
              </label>
              <div className="col-lg-8">
                <select
                  {...formik.getFieldProps("postFrom")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.postFrom && formik.errors.postFrom,
                    },
                    {
                      "is-valid":
                        formik.touched.postFrom && !formik.errors.postFrom,
                    }
                  )}
                >
                  <option value="Admin">Admin</option>
                  <option value="Agent">Agent</option>
                </select>
                {formik.touched.postFrom && formik.errors.postFrom && (
                  <div
                    style={{ color: "red" }}
                    className="fv-plugins-message-container"
                  >
                    <span role="alert">{formik.errors.postFrom}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Agent selection */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Choose Agent (If required)
              </label>
              <div className="col-lg-8">
                <Select
                  isMulti
                  name="agentId"
                  options={agentOptions}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  value={agentOptions.filter((option) =>
                    Array.isArray(formik.values.agentId)
                      ? formik.values.agentId.includes(option.value)
                      : formik.values.agentId === option.value
                  )}
                  onChange={(selectedOptions) => {
                    const isAllSelected = selectedOptions.some(
                      (option) => option.value === "all"
                    );
                    if (isAllSelected) {
                      formik.setFieldValue("agentId", ["all"]);
                    } else {
                      formik.setFieldValue(
                        "agentId",
                        selectedOptions.map((option) => option.value)
                      );
                    }
                  }}
                  onBlur={() => formik.setFieldTouched("agentId", true)}
                />
                {formik.touched.agentId && formik.errors.agentId && (
                  <div
                    style={{ color: "red" }}
                    className="fv-plugins-message-container"
                  >
                    <span role="alert">{formik.errors.agentId}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Promo Title */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Promo Title
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  {...formik.getFieldProps("promotitle")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.promotitle && formik.errors.promotitle,
                    },
                    {
                      "is-valid":
                        formik.touched.promotitle && !formik.errors.promotitle,
                    }
                  )}
                  placeholder="Enter Promo Title"
                />
                {formik.touched.promotitle && formik.errors.promotitle && (
                  <div
                    style={{ color: "red" }}
                    className="fv-plugins-message-container"
                  >
                    <span role="alert">{formik.errors.promotitle}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Promo Code */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Promo Code
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  {...formik.getFieldProps("promocode")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.promocode && formik.errors.promocode,
                    },
                    {
                      "is-valid":
                        formik.touched.promocode && !formik.errors.promocode,
                    }
                  )}
                  placeholder="Enter Promo Code"
                />
                {formik.touched.promocode && formik.errors.promocode && (
                  <div
                    style={{ color: "red" }}
                    className="fv-plugins-message-container"
                  >
                    <span role="alert">{formik.errors.promocode}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Offer Type */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Offer Type
              </label>
              <div className="col-lg-8">
                <select
                  {...formik.getFieldProps("offertype")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.offertype && formik.errors.offertype,
                    },
                    {
                      "is-valid":
                        formik.touched.offertype && !formik.errors.offertype,
                    }
                  )}
                >
                  <option value="" label="Select Offer Type" />
                  <option value="first_order">First Time</option>
                  <option value="all_orders">All Orders</option>
                </select>
                {formik.touched.offertype && formik.errors.offertype && (
                  <div
                    style={{ color: "red" }}
                    className="fv-plugins-message-container"
                  >
                    <span role="alert">{formik.errors.offertype}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Value */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Order Value
              </label>
              <div className="col-lg-8">
                <input
                  type="number"
                  min={1}
                  {...formik.getFieldProps("ordervalue")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.ordervalue && formik.errors.ordervalue,
                    },
                    {
                      "is-valid":
                        formik.touched.ordervalue && !formik.errors.ordervalue,
                    }
                  )}
                  placeholder="Enter Order Value"
                />
                {formik.touched.ordervalue && formik.errors.ordervalue && (
                  <div
                    style={{ color: "red" }}
                    className="fv-plugins-message-container"
                  >
                    <span role="alert">{formik.errors.ordervalue}</span>
                  </div>
                )}
              </div>
            </div>

            {/* No Of Coupons */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                No Of Coupons
              </label>
              <div className="col-lg-8">
                <input
                  type="number"
                  min={1}
                  {...formik.getFieldProps("noOfCoupons")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.noOfCoupons && formik.errors.noOfCoupons,
                    },
                    {
                      "is-valid":
                        formik.touched.noOfCoupons &&
                        !formik.errors.noOfCoupons,
                    }
                  )}
                  placeholder="Enter Number Of Coupons"
                />
                {formik.touched.noOfCoupons && formik.errors.noOfCoupons && (
                  <div
                    style={{ color: "red" }}
                    className="fv-plugins-message-container"
                  >
                    <span role="alert">{formik.errors.noOfCoupons}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Usage Frequency */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Usage Frequency
              </label>
              <div className="col-lg-8">
                <input
                  type="number"
                  min={1}
                  {...formik.getFieldProps("usagefrequency")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.usagefrequency &&
                        formik.errors.usagefrequency,
                    },
                    {
                      "is-valid":
                        formik.touched.usagefrequency &&
                        !formik.errors.usagefrequency,
                    }
                  )}
                  placeholder="Enter Usage Frequency"
                />
                {formik.touched.usagefrequency &&
                  formik.errors.usagefrequency && (
                    <div
                      style={{ color: "red" }}
                      className="fv-plugins-message-container"
                    >
                      <span role="alert">{formik.errors.usagefrequency}</span>
                    </div>
                  )}
              </div>
            </div>

            {/* Flat or Percentage */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Flat or Percentage
              </label>
              <div className="col-lg-8">
                <select
                  {...formik.getFieldProps("flatorpercentage")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.flatorpercentage &&
                        formik.errors.flatorpercentage,
                    },
                    {
                      "is-valid":
                        formik.touched.flatorpercentage &&
                        !formik.errors.flatorpercentage,
                    }
                  )}
                >
                  <option value="">Select Option</option>
                  <option value="flat">Flat</option>
                  <option value="percentage">Percentage</option>
                </select>
                {formik.touched.flatorpercentage &&
                  formik.errors.flatorpercentage && (
                    <div
                      style={{ color: "red" }}
                      className="fv-plugins-message-container"
                    >
                      <span role="alert">{formik.errors.flatorpercentage}</span>
                    </div>
                  )}
              </div>
            </div>

            {/* Amount / Percentage */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                {formik.values.flatorpercentage === 'percentage' ? "Percentage" : "Amount"}
              </label>
              <div className="col-lg-8">
                <input
                  type="number"
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
                  placeholder={`Enter ${formik.values.flatorpercentage === 'percentage' ? "Percentage" : "Amount"}`}
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

            {/* Validity From */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Validity From
              </label>
              <div className="col-lg-8">
                <input
                  type="date"
                  {...formik.getFieldProps("validityFrom")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.validityFrom &&
                        formik.errors.validityFrom,
                    },
                    {
                      "is-valid":
                        formik.touched.validityFrom &&
                        !formik.errors.validityFrom,
                    }
                  )}
                  placeholder="Select Start Date"
                />
                {formik.touched.validityFrom && formik.errors.validityFrom && (
                  <div
                    style={{ color: "red" }}
                    className="fv-plugins-message-container"
                  >
                    <span role="alert">{formik.errors.validityFrom}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Validity To */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Validity To
              </label>
              <div className="col-lg-8">
                <input
                  type="date"
                  {...formik.getFieldProps("validityTo")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.validityTo && formik.errors.validityTo,
                    },
                    {
                      "is-valid":
                        formik.touched.validityTo && !formik.errors.validityTo,
                    }
                  )}
                  placeholder="Select End Date"
                />
                {formik.touched.validityTo && formik.errors.validityTo && (
                  <div
                    style={{ color: "red" }}
                    className="fv-plugins-message-container"
                  >
                    <span role="alert">{formik.errors.validityTo}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Applicable For */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Applicable For
              </label>
              <div className="col-lg-8">
                <select
                  {...formik.getFieldProps("applicableFor")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.applicableFor &&
                        formik.errors.applicableFor,
                    },
                    {
                      "is-valid":
                        formik.touched.applicableFor &&
                        !formik.errors.applicableFor,
                    }
                  )}
                >
                  <option value="">Select Option</option>
                  <option value="POS">POS</option>
                  <option value="ONLINE">ONLINE</option>
                </select>
                {formik.touched.applicableFor &&
                  formik.errors.applicableFor && (
                    <div
                      style={{ color: "red" }}
                      className="fv-plugins-message-container"
                    >
                      <span role="alert">{formik.errors.applicableFor}</span>
                    </div>
                  )}
              </div>
            </div>

            {/* Service field (hidden but error messages shown) */}
            <div className="row mb-12">
              <div className="col-lg-8">
                {formik.touched.service && formik.errors.service && (
                  <div
                    style={{ color: "red" }}
                    className="fv-plugins-message-container"
                  >
                    <span role="alert">
                      {Array.isArray(formik.errors.service)
                        ? formik.errors.service.join(", ")
                        : formik.errors.service}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Submit button */}
            <div className="row mb-12">
              <div className="col-lg-12 d-flex align-items-center justify-content-end">
                <button type="submit" className="btn btn-primary me-2">
                  {isCreatePage ? "Create" : isUpdatePage ? "Update" : "Submit"}
                </button>
              </div>
            </div>
          </form>
        </div>
        {isSuccess && (
          <AlertBox
            redirectUrl={`/activities/discounts`}
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
      </div>
    </>
  );
};

export default DiscountDetail;