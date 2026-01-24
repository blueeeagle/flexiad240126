import React, { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { useFormik } from "formik";
import clsx from "clsx";
import { toApiUrl } from "../../../_metronic/helpers";
import { useParams } from "react-router-dom";
import { getRequest, postRequest } from "../../modules/auth/core/_requests";
import * as Yup from "yup";
import AlertBox from "../../../common/AlertBox";
import logo from "../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

type Currency = {
  currencyCode: string;
  decimalPoints: number; // Add this line
};

type OrderDetails = {
  paymentPending?: number;
  companyId?: { _id: string };
  customerId?: { _id: string; firstName: string; lastName: string; mobile: string };
  orderNo?: string;
  orderStatus?: string;
  currencyId?: Currency; // Update this line to use the new Currency type
};


const UpdatePayment: FC = () => {
  const [loading, setLoading] = useState(false);
  const { orderId, companyId } = useParams();
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({});
  const [userList, setUserList] = useState<Array<any>>([]);

  const handleOptionChange = (option: any) => {
    formik.setFieldValue("paymentMode", option);
    setSelectedOption(option);
  };

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const initialValues = {
    companyId: "",
    customerId: "",
    orderId: "",
    paymentMode: "",
    paymentDate: "",
    amount: "",
    collected_by: "",
    transactionStatus: "",
    comments: "",
  };

  const maxAmount = orderDetails?.paymentPending || 0;
  const paymentSchema = Yup.object().shape({
    paymentMode: Yup.string().required("paymentMode is required"),
    amount: Yup.number()
      .min(0, "Amount must be at least 0")
      .max(maxAmount, `Amount cannot exceed ${maxAmount}`)
      .required("Amount is required"),
    paymentDate: Yup.date().required("Payment date is required"),
    collected_by: Yup.string().required("Collected by is required"),
  });

  const getData = async () => {
    try {
      const orderDetailsResponse = await getRequest(`/order/${orderId}`, ``);
      if (orderDetailsResponse?.data?.status === "ok") {
        setOrderDetails(orderDetailsResponse.data.data);
      } else {
        console.error("Failed to fetch order details");
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  const getUsers = async () => {
    try {
      const userListsResponse = await getRequest(`/agent/users/list/${orderId}`, ``);
      const list = userListsResponse?.data?.data?.map((user: any) => ({
        value: user._id,
        name: user.name,
      })) || [];
      setUserList(list);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([getData(), getUsers()]);
      setLoading(false);
    };
    fetchData();
  }, [orderId]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,
    validationSchema: paymentSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const reqBody = {
        companyId: orderDetails?.companyId?._id,
        customerId: orderDetails?.customerId?._id,
        orderId: orderId,
        paymentMode: selectedOption,
        paymentDate: values?.paymentDate,
        amount: values?.amount,
        collected_by: values?.collected_by,
      };

      try {
        const response = await postRequest(`/order/payment`, reqBody);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Order payment has been updated successfully`);
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg(`Something Went Wrong`);
      } finally {
        setLoading(false);
      }
    },
  });
  return (
    <>
      <PageTitle>Update Payment</PageTitle>
      <div className="row g-5 g-xl-8">
        <div className={`card `}>
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
          <div className="card-body py-3">
            <div className="row mt-4">
              <div className="col-lg-2">
                <div className="d-flex align-items-center">
                  <div className="symbol symbol-45px me-5">
                    <img style={{ width: "auto" }} src={logo} alt="" />{" "}
                  </div>
                </div>
              </div>
              <div className="col-lg-10">
                <h3>
                  {orderDetails?.customerId?.firstName}{" "}
                  {orderDetails?.customerId?.lastName}
                </h3>
                <span>{orderDetails?.customerId?.mobile}</span>
              </div>
            </div>
            <hr></hr>
            <div className="row mt-2">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                Order No
              </label>

              <div className="col-lg-8">
                <strong>{orderDetails?.orderNo}</strong>
              </div>
            </div>
            <div className="row mt-2">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                Order Status
              </label>

              <div className="col-lg-8">
                <span className="badge badge-primary fs-8 fw-bold">
                  {orderDetails?.orderStatus}
                </span>
              </div>
            </div>
            <div className="row mt-t2">
  <label className="col-lg-4 col-form-label fw-bold fs-6">
    Payment Remaining
  </label>

  <div className="col-lg-8">
  <strong className="pt-4">
  {orderDetails?.paymentPending?.toFixed(orderDetails?.currencyId?.decimalPoints || 2)}{" "}
  {orderDetails?.currencyId?.currencyCode}
</strong>

  </div>
</div>


            <hr></hr>
            <form onSubmit={formik.handleSubmit} noValidate className="form">
              <div className="row p-8">
                <div className="col-lg-3">
                  <label className="box">
                    <input
                      name="paymentMode"
                      type="radio"
                      id="option1"
                      value="Benefit"
                      checked={selectedOption === "Benefit"}
                      onChange={() => handleOptionChange("Benefit")}
                    />
                    <span>Benefit</span>
                    <img
                      src="/media/avatars/credit-card.png"
                      alt="Option 1"
                      style={{ width: "45px" }}
                    />
                  </label>
                </div>
                <div className=" col-lg-3">
                  <label className="box">
                    <input
                      name="paymentMode"
                      type="radio"
                      id="option2"
                      value="Credit Card"
                      checked={selectedOption === "Credit Card"}
                      onChange={() => handleOptionChange("Credit Card")}
                    />
                    <span>Credit Card</span>
                    <img
                      src="/media/avatars/credit-card.png"
                      alt="Option 2"
                      style={{ width: "45px" }}
                    />
                  </label>
                </div>
                <div className=" col-lg-3">
                  <label className="box">
                    <input
                      name="paymentMode"
                      type="radio"
                      id="option3"
                      value="Cash"
                      checked={selectedOption === "Cash"}
                      onChange={() => handleOptionChange("Cash")}
                    />
                    <span>Cash</span>
                  </label>
                </div>
                <div className="col-lg-3">
                  <label className="box">
                    <input
                      name="paymentMode"
                      type="radio"
                      id="option4"
                      value="UPI/Others"
                      checked={selectedOption === "UPI/Others"}
                      onChange={() => handleOptionChange("UPI/Others")}
                    />
                    <span>UPI/Others</span>
                  </label>
                </div>
              </div>
              {/* Display error message if paymentMode has an error */}
              {formik.touched.paymentMode && formik.errors.paymentMode && (
                <div
                  style={{ color: "red" }}
                  className="fv-plugins-message-container"
                >
                  <span role="alert">{formik.errors.paymentMode}</span>
                </div>
              )}

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label  fw-bold fs-6">
                  Amount
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        {...formik.getFieldProps("amount")}
                        type="number"
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
                        placeholder="Amount"
                        min={0}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label  fw-bold fs-6">
                  Payment Date
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        {...formik.getFieldProps("paymentDate")}
                        type="date"
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.paymentDate &&
                              formik.errors.paymentDate,
                          },
                          {
                            "is-valid":
                              formik.touched.paymentDate &&
                              !formik.errors.paymentDate,
                          }
                        )}
                        placeholder="Choose Date"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label   fw-bold fs-6">
                  Comments
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      {/* <input
                                            {...formik.getFieldProps('name')}
                                            type='text'
                                            className={clsx(
                                                'form-control form-control-lg form-control-solid mb-3 mb-lg-0',
                                                {'is-invalid': formik.touched.name && formik.errors.name},
                                                {
                                                  'is-valid': formik.touched.name && !formik.errors.name,
                                                }
                                              )}
                                            placeholder='Enter State / Province'
                                            /> */}
                      <textarea
                        {...formik.getFieldProps("comments")}
                        className="form-control "
                        placeholder="Enter Remarks"
                      ></textarea>
                      {formik.touched.comments && formik.errors.comments && (
                        <div
                          style={{ color: "red" }}
                          className="fv-plugins-message-container"
                        >
                          <span role="alert">{formik.errors.comments}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label  fw-bold fs-6">
                  Collected User
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <select
                        {...formik.getFieldProps("collected_by")}
                        className={clsx(
                          "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                          {
                            "is-invalid":
                              formik.touched.collected_by &&
                              formik.errors.collected_by,
                          },
                          {
                            "is-valid":
                              formik.touched.collected_by &&
                              !formik.errors.collected_by,
                          }
                        )}
                      >
                        <option value="">user</option>
                        {userList.map((e: any) => {
                          return (
                            <option key={e._id} value={e.value}>
                              {e.name}
                            </option>
                          );
                        })}
                      </select>

                      {formik.touched.collected_by &&
                        formik.errors.collected_by && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">
                              {formik.errors.collected_by}
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {!loading && "Save Changes"}
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
  )}
        </div>
      </div>
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

export default UpdatePayment;
