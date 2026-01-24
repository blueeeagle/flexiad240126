import React, { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useParams } from "react-router-dom";
import { getRequest } from "../../../modules/auth/core/_requests";
import { stringToDate, stringToDateTime } from "../../../../common/Date";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
interface OrderDetail {
  orderNo?: string;
  orderDate?: string;
  orderMode?: string;
  orderStatus?: string;
  paymentStatus?: string;
  netAmt?: number;
  paymentReceived?: number;
  paymentPending?: number;
}

interface StatusHistory {
  _id?: string;
  paymentDate?: string;
  transactionStatus?: string;
  paymentMode?: string;
  amount?: number;
}

const OrderPaymentStatus: FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetail>({});
  const [loading, setLoading] = useState<boolean>(true); // State to track loading status

  const getData = async () => {
    setLoading(true); // Set loading to true before the API call
    try {
      const orderDetail = await getRequest(`/order/${orderId}`, ``);
      const lookupObj = [orderDetail];
      let data1: Array<any> = [];

      return Promise.allSettled(lookupObj)
        .then((result) => {
          result.forEach((res: any) => {
            data1.push(res.value);
          });
          return data1;
        })
        .then((d) => {
          const orderData = {
            OrderDetail:
              d[0]?.data?.status === "ok" ? d[0]?.data?.data?.paymentList : [],
          };

          const orderDetail = {
            orderDetails: d[0]?.data?.status === "ok" ? d[0]?.data?.data : {},
          };

          setOrderDetails(orderDetail.orderDetails);
          setStatusHistory(orderData.OrderDetail);
        });
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false); // Set loading to false after the API call
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
  }, [orderId]);

  return (
    <>
      <PageTitle>Track Payment Status</PageTitle>

      <div className="container px-4 mb-7">
      {loading ? ( // Show loading indicator while data is being fetched
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
            filter: "hue-rotate(200deg)",
          }}
        />
      </div>
          ) : (
        <div className="bg-light-primary rounded p-5 ">
     
            <div className="row justify-content-between">
              <div className="col p-3">
                <span>Order No</span>
                <br />
                <strong>{orderDetails?.orderNo ?? ""}</strong>
              </div>
              <div className="col p-3">
                <span>Order Date</span>
                <br />
                <strong>{stringToDate(orderDetails?.orderDate)}</strong>
              </div>
              <div className="col p-3">
                <span>Method</span>
                <br />
                <strong>{orderDetails?.orderMode}</strong>
              </div>
              <div className="col p-3">
                <span>Order Status</span>
                <br />
                <strong>{orderDetails?.orderStatus}</strong>
              </div>
              <div className="col p-3">
                <span>Payment Status</span>
                <br />
                <strong>{orderDetails?.paymentStatus}</strong>
              </div>
            </div>
    
          <div className="row mt-2 ">
            <div className="col p-3">
              <span>Net Amount</span>
              <br />
              <strong>{orderDetails?.netAmt} BHD</strong>
            </div>
            <div className="col p-3">
              <span>Payment Received</span>
              <br />
              <strong>{orderDetails?.paymentReceived} BHD</strong>
            </div>
            <div className="col p-3">
              <span>Payment Pending</span>
              <br />
              <strong>{orderDetails?.paymentPending} BHD</strong>
            </div>
          </div>
        </div>
              )}
      </div>
      <div className="container">
        <ul className="list-group ">
          {loading ? ( // Show loading indicator for status history
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
               filter: "hue-rotate(200deg)",
             }}
           />
         </div>
          ) : statusHistory.length > 0 ? (
            statusHistory.map((result: StatusHistory) => (
              <li className="list-group-item" key={result?._id}>
                <div className="row justify-content-between p-4">
                  <div className="col-2">
                    <strong>
                      {result?.paymentDate
                        ? stringToDateTime(result?.paymentDate)
                        : ""}
                    </strong>
                  </div>
                  <div className="col-2">
                    <i
                      className="bi bi-check-circle p-2"
                      style={{
                        fontSize: "19px",
                        color:
                          result?.transactionStatus === "Success" ? "green" : "",
                      }}
                    ></i>
                    <span
                      className={`badge ${
                        result?.transactionStatus === "Success"
                          ? "badge-light-success"
                          : "badge-secondary"
                      } fw-semibold me-1`}
                    >
                      {result?.transactionStatus}
                    </span>
                  </div>
                  <div className="col-2">
                    <strong>{result?.paymentMode}</strong>
                  </div>
                  <div className="col-2">
                    <strong>{result?.amount} BHD</strong>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <p>No record found</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default OrderPaymentStatus;
