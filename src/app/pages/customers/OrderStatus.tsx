import React, { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { useFormik } from "formik";
import clsx from "clsx";
import { getRequest, patchRequest } from "../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import AlertBox from "../../../common/AlertBox";
import logo from "../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
const OrderStatus: FC = () => {
  const [loading, setLoading] = useState(false);
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState(Object);
  const [updateStatus, setUpdateStatus] = useState<string>("");
  const [itemList, setItemList] = useState([]);
  const [statusHistory, setStatusHistory] = useState(Array<any>);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [rowData, setRowData] = useState([]);
  const [customerName, setCustomerName] = useState<string>("");
  const [customerPhone, setCustomerPhone] = useState<string>("");

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const getData = async () => {
    setLoading(true); // Start loading
    try {
      const orderDetails = await getRequest(`/order/${orderId}`, ``);
      const lookupObj = [orderDetails];
      let data1: Array<any> = [];

      return Promise.allSettled(lookupObj)
        .then((result) => {
          result.forEach((req: any) => {
            data1.push(req.value);
          });
          return data1;
        })
        .then((d) => {
          const orderData = {
            itemList:
              d[0]?.data?.status === "ok" ? d[0]?.data?.data?.itemList : [],
            orderDetails: d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
            statusHistories:
              d[0]?.data?.status === "ok"
                ? d[0]?.data?.data?.statusHistory
                : [],
          };

          // Extract customer details
          const customer = d[0]?.data?.data?.customerId;
          const name = `${customer?.firstName} ${customer?.lastName}`;
          const phone = customer?.mobile;

          // Store in state
          setCustomerName(name);
          setCustomerPhone(phone);

          setOrderDetails(orderData?.orderDetails);
          setItemList(orderData?.itemList);
          setStatusHistory(orderData?.statusHistories);

          getDriver(
            d[0]?.data?.data?.companyId?.agentId.logistics
              ? ""
              : d[0]?.data?.data?.companyId?._id
          );
        })
        .finally(() => setLoading(false)); // Stop loading after the data is fetched
    } catch (error) {
      setLoading(false); // Stop loading in case of error
      setIsFailed(true);
      setErrorMsg(`Something went wrong while fetching the order data.`);
    }
  };

  const getDriver = async (id: any) => {
    setLoading(true); // Start loading
    try {
      const driverListData = await getRequest(
        `/driver/list/?companyId=${id}`,
        ``
      );
      if (driverListData?.data?.status === "ok") {
        setRowData(driverListData?.data?.data);
      }
    } catch (error) {
      setIsFailed(true);
      setErrorMsg(`Something went wrong while fetching the driver data.`);
    } finally {
      setLoading(false); // Stop loading after data fetch
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
  }, [orderId]);

  useEffect(() => {
    const fetchData = async () => {
      let condition = false;
      for (const value of statusHistory) {
        if (!value.updated_at && !condition) {
          setUpdateStatus(value.status);
          condition = true;
        }
      }
    };

    fetchData();
  }, [statusHistory]);

  const initialValues = {
    remarks: "",
    orderStatus: "",
    driverId: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const formik = useFormik({
    initialValues: {
      ...formData, // Spread the formData first
      orderStatus: orderDetails?.orderStatus || formData.orderStatus || "", // Set orderStatus only once
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      setLoading(true);

      let reqBody = {
        status: values.orderStatus, // Correct status value from formik
        driverId: values?.driverId,
        remarks: values?.remarks,
      };

      try {
        if (orderId) {
          await patchRequest(`/order/status/${orderId}`, reqBody).then(
            (response) => {
              if (response?.data?.status === "ok") {
                setIsSuccess(true);
                setSuccessMsg(`Order status has been updated successfully`);
                setLoading(false);
              } else {
                setIsFailed(true);
                setLoading(false);
                setErrorMsg(`Something went wrong`);
              }
            }
          );
        }
      } catch (error) {
        setIsFailed(true);
        setLoading(false);
        setErrorMsg(`Something went wrong`);
      }
    },
  });
  return (
    <>
      <PageTitle>Update Status</PageTitle>
      <div className="row g-5 g-xl-8">
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
          <div className={`card `}>
            <div className="card-body py-3">
              <div className="row mt-4">
                <div className="col-lg-2">
                  <div className="d-flex align-items-center">
                    <div className="symbol symbol-45px me-5">
                      <img style={{ width: "auto" }} src={logo} alt="" />
                    </div>
                  </div>
                </div>
                <div className="col-lg-10">
                  <h3>{customerName}</h3>
                  <span>{customerPhone}</span>
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
              <form onSubmit={formik.handleSubmit} className="form">
                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label required fw-bold fs-6">
                    Order status
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-12 fv-row">
                        <select
                          {...formik.getFieldProps("orderStatus")}
                          value={formik.values.orderStatus} // Ensure the form value is used
                          onChange={(e) => {
                            formik.setFieldValue("orderStatus", e.target.value); // Update form value correctly
                          }}
                          disabled
                          className={clsx(
                            "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                            {
                              "is-invalid":
                                formik.touched.orderStatus &&
                                formik.errors.orderStatus,
                            },
                            {
                              "is-valid":
                                formik.touched.orderStatus &&
                                !formik.errors.orderStatus,
                            }
                          )}
                        >
                          <option value="" label="Select status" />
                          <option value="Booked">Booked</option>
                          <option value="Pick Up">Pick Up</option>
                          <option value="Received">Received</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Ready">Ready</option>
                          <option value="Out for Delivery">
                            Out for Delivery
                          </option>
                          <option value="Delivered">Delivered</option>
                          <option value="Completed">Completed</option>
                        </select>

                        {formik.touched.orderStatus &&
                          formik.errors.orderStatus && (
                            <div
                              style={{ color: "red" }}
                              className="fv-plugins-message-container"
                            >
                              <span role="alert">
                                {typeof formik.errors.orderStatus === "string"
                                  ? formik.errors.orderStatus
                                  : ""}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                {updateStatus === "Out for Delivery" ||
                  (updateStatus === "Pick Up" && (
                    <div className="row mb-12">
                      <label className="col-lg-4 col-form-label required fw-bold fs-6">
                        Driver
                      </label>
                      <div className="col-lg-8">
                        <div className="row">
                          <div className="col-lg-12 fv-row">
                            <select
                              required
                              {...formik.getFieldProps("driverId")}
                              className={clsx(
                                "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                                {
                                  "is-invalid":
                                    formik.touched.driverId &&
                                    formik.errors.driverId,
                                },
                                {
                                  "is-valid":
                                    formik.touched.driverId &&
                                    !formik.errors.driverId,
                                }
                              )}
                            >
                              <option value="">user</option>
                              {rowData.map((e: any) => {
                                return (
                                  <option key={e._id} value={e._id}>
                                    {e.iso3} - {e.name}
                                  </option>
                                );
                              })}
                            </select>

                            {formik.touched.driverId &&
                              formik.errors.driverId && (
                                <div
                                  style={{ color: "red" }}
                                  className="fv-plugins-message-container"
                                >
                                  <span role="alert">
                                    {formik.errors.driverId}
                                  </span>
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}

                <div className="row mb-12">
                  <label className="col-lg-4 col-form-label   fw-bold fs-6">
                    Comments
                  </label>
                  <div className="col-lg-8">
                    <div className="row">
                      <div className="col-lg-12 fv-row">
                        <textarea
                          {...formik.getFieldProps("remarks")}
                          className={clsx(
                            "form-control",
                            {
                              "is-invalid":
                                formik.touched.remarks && formik.errors.remarks,
                            },
                            {
                              "is-valid":
                                formik.touched.remarks &&
                                !formik.errors.remarks,
                            }
                          )}
                          placeholder="Enter Remarks"
                        />
                        {formik.touched.remarks && formik.errors.remarks && (
                          <div
                            style={{ color: "red" }}
                            className="fv-plugins-message-container"
                          >
                            <span role="alert">{formik.errors.remarks}</span>
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
                    {!loading ? (
                      "Save Changes"
                    ) : (
                      <>
                        Please wait...{" "}
                        <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
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

export default OrderStatus;
