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
import Select from 'react-select'
import CountryDropdown from "./CountryDropdown";
interface AgentOption {
  companyName: any;
  _id: any;
  value: string;
  label: string

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
    // flatorpercentage: Yup.string()
    //   .oneOf(["flat", "percentage"], "Invalid discount type")
    //   .required("Flat or Percentage is required"),
    flatorpercentage: Yup.string().required("Flat or Percentage is required"),


    amount: Yup.number()
      .required("Amount is required")
      .positive("Amount must be positive"),
    validityFrom: Yup.date().required("Validity From is required"),
    validityTo: Yup.date().required("Validity To is required"),

    sortNo: Yup.number()
      .required("Sort No is required")
      .positive("Sort No must be positive"),
    imgUrl: Yup.mixed().required("Image is required"),
  });

  const [loading, setLoading] = useState(false);
 {loading}
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);

  const [isFailed, setIsFailed] = useState(false);
  const [countryList, setCountryList] = useState([]);
 {countryList}
  const [agents, setAgents] = useState([]);
  const { discountId } = useParams();
  const [selectedCountry, setSelectedCountry] = useState<string>("6566946881f360c33361e259");

  const fileRef = useRef(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [selectedDiscountData, setSelectedDiscountData] =
    useState<DiscountData | null>(null);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    console.log("Current location:", location.pathname); // Check the current path
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
    imgUrl: "",
    applicableFor: "",
  };

  const [formData, setFormData] = useState(initialValues);
{formData}
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
        postFrom: "",
        currencyId: "",
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
        sortNo: "",
        imgUrl: "",
        applicableFor: "",
      }
      : {
        postFrom:
          selectedDiscountData?.postFrom === "Admin"
            ? "Admin"
            : "Agent",
        // agentId: Array.isArray(selectedDiscountData?.companyId)
        //   ? selectedDiscountData.companyId[0] || ""
        //   : selectedDiscountData?.companyId || "",
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
          values.flatorpercentage === "Flat" ? "Flat" : "Percentage",
        discountAmt: values.flatorpercentage === "Flat" ? values.amount : values.amount,
        discountPercentage:
          values.flatorpercentage === "Percentage" ? values.amount : 0,
        startDate: values.validityFrom || "",
        endDate: values.validityTo || "",
        serviceId:
          Array.isArray(values.service) && values.service.length > 0
            ? values.service
            : [],
        applicableFor: values.applicableFor === "online" ? "Online" : "POS",
        sortNo: values.sortNo,
        imgUrl: values.imgUrl,
      };

      const requestData = new FormData();
      requestData.append("data", JSON.stringify(reqBody));
      if (values.imgUrl && typeof values.imgUrl === "object") {
        requestData.append("imgUrl", values.imgUrl);
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
            navigate('/activities/discounts')
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
  useEffect(() => {
    // Retrieve stored image URL from local storage
    const storedData = localStorage.getItem("selectedDiscountData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setImageUrl(parsedData.imgUrl);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          // Set the image URL in state (for preview)
          setImageUrl(reader.result);

          // Update Formik field value for imgUrl (if needed for submission)
          formik.setFieldValue("imgUrl", file);
        }
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCountrySelect = (countryId: string) => {
    setSelectedCountry(countryId)
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
        (item: { addressDetails: { countryId: string; }; }) => item?.addressDetails?.countryId === selectedCountry);

      if (result.status === "ok") {
        setAgents(filteredData);
      }
    } catch (error) {
      console.error("Error fetching agents:", error);
    }
  }, [selectedCountry, token])

  useEffect(() => {
    fetchAgents()
  }, [fetchAgents])


  const agentIds = formik.values.agentId ?? [];
  const companyId = Array.isArray(agentIds) && agentIds.length > 0 ? agentIds[agentIds.length - 1] : "";
  const formikRef = useRef<FormikProps<any> | null>(null);
  formikRef.current = formik;

  const getService = useCallback(async () => {
    try {
      if (companyId) {

        const response = await fetch(`${import.meta.env.VITE_APP_API_URL}/agent/service/${companyId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();



        // Ensure the 'service' field is an array, and append the new service ID
        const currentServices = formik.values.service ?? []; // Ensure it defaults to an array
        const updatedServices = [...currentServices, data.data._id]; // Add new service ID to array

        formikRef.current?.setFieldValue("service", updatedServices); // Update the field
        formikRef.current?.setFieldValue("currencyId", data?.data?.companyId?.currencyId?._id); // Update the field
      }
    } catch (e) {
      console.error("Failed to fetch service data", e);
    }
  }, [companyId, token]);

  useEffect(() => {
    getService();
  }, [getService]);



  const agentOptions = [

    ...agents.map((agent: AgentOption) => ({
      value: agent._id,
      label: agent.companyName,
    })),
  ];

  // Set default value in Formik
  useEffect(() => {
    if (!formik.values.agentId.length) {
      formik.setFieldValue("agentId", ["all"]);
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
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Choose Agent (If required)
              </label>
              <div className="col-lg-8">
                {/* <select
                  {...formik.getFieldProps("agentId")}
                  value={
                    typeof formik.values.agentId === "object" &&
                    formik.values.agentId !== null
                      ? formik.values.agentId._id
                      : formik.values.agentId || ""
                  } // Check if it's an object, then access _id
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.agentId && formik.errors.agentId,
                    },
                    {
                      "is-valid":
                        formik.touched.agentId && !formik.errors.agentId,
                    }
                  )}
                  multiple
                >
                  <option value="">Choose Agent...</option>
                  {agents && agents.length > 0 ? (
                    agents.map((agent: any) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.companyName}
                      </option>
                    ))
                  ) : (
                    <option disabled>Loading agents...</option> // Optional loading message
                  )}
                </select> */}




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
                    const isAllSelected = selectedOptions.some(option => option.value === "all");

                    if (isAllSelected) {
                      formik.setFieldValue("agentId", ["all"]);
                    } else {
                      formik.setFieldValue(
                        "agentId",
                        selectedOptions.map(option => option.value)
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
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Order Value
              </label>
              <div className="col-lg-8">
                <input
                  type="number" min={1}
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
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                No Of Coupons
              </label>
              <div className="col-lg-8">
                <input
                  type="number" min={1}
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
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Usage Frequency
              </label>
              <div className="col-lg-8">
                <input
                  type="number" min={1}
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
            <div className="row mb-12">
              {/* <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Service
              </label> */}
              <div className="col-lg-8">
                {/* <input
                  type="text"
                  {...formik.getFieldProps("service")}
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid":
                        formik.touched.service && formik.errors.service,
                    },
                    {
                      "is-valid":
                        formik.touched.service && !formik.errors.service,
                    }
                  )}
                  placeholder="Enter Service"
                /> */}
                {formik.touched.service && formik.errors.service && (
                  <div
                    style={{ color: "red" }}
                    className="fv-plugins-message-container"
                  >
                    <span role="alert">
                      {Array.isArray(formik.errors.service)
                        ? formik.errors.service.join(", ") // Join array items if it's an array
                        : formik.errors.service}{" "}
                      {/* Directly display the error message if it's a string */}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Sort No
              </label>
              <div className="col-lg-8">
                <input
                  type="number" min={1}
                  {...formik.getFieldProps("sortNo")}
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
                  placeholder="Enter Sort Number"
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
            <div className="row mb-12">
              {!isCreatePage && imageUrl && (
                <div className="row">
                  <label className="col-lg-4 col-form-label fw-bold fs-6">
                    Preview Image
                  </label>
                  <div className="col-lg-8 mb-3">
                    <img
                      src={`http://adminapi.flexiclean.me/${imageUrl}`}
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
                  onChange={handleFileChange} // handle file selection
                  className={clsx(
                    "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                    {
                      "is-invalid": formik.touched.imgUrl && formik.errors.imgUrl,
                    },
                    {
                      "is-valid": formik.touched.imgUrl && !formik.errors.imgUrl,
                    }
                  )}
                />

                <div style={{ color: "red" }} className="fv-plugins-message-container">
                  <span role="alert">
                    {formik.touched.imgUrl && formik.errors.imgUrl}
                  </span>
                </div>
              </div>
            </div>



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
