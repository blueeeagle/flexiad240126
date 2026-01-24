import React, { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { getRequest } from "../../modules/auth/core/_requests";
import { stringToDate, stringToDateTime } from "../../../common/Date";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
interface StatusHistory {
  _id: string;
  status: string;
  updated_by: {
    name: string;
  };
  updated_at: string | null;
}

interface OrderDetails {
  orderNo?: string;
  orderDate?: string;
  orderMode?: string;
  orderStatus?: string;
  paymentStatus?: string;
}

const CustomerOrderStatus: FC = () => {
  const { orderId } = useParams<{ orderId: string }>(); // Ensure orderId is typed
  const [statusHistory, setStatusHistory] = useState<StatusHistory[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetails>({});
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    try {
      const orderDetail = await getRequest(`/order/${orderId}`, ``);
      if (orderDetail.data.status === "ok") {
        setOrderDetails(orderDetail.data.data);
        setStatusHistory(orderDetail.data.data.statusHistory || []);
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [orderId]);

  return (
    <>
      <PageTitle>Track Order Status</PageTitle>

      <div className="container px-4 mb-7">
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
            filter: "hue-rotate(200deg)", 
          }}
        />
      </div>
        ) : (
          <div className="bg-light-primary rounded p-5">
            <div className="row justify-content-between">
              <div className="col p-3">
                <span>Order No</span>
                <br />
                <strong>{orderDetails.orderNo ?? ""}</strong>
              </div>
              <div className="col p-3">
                <span>Order Date</span>
                <br />
                <strong>{stringToDate(orderDetails.orderDate)}</strong>
              </div>
              <div className="col p-3">
                <span>Method</span>
                <br />
                <strong>{orderDetails.orderMode}</strong>
              </div>
              <div className="col p-3">
                <span>Order Status</span>
                <br />
                <strong>{orderDetails.orderStatus}</strong>
              </div>
              <div className="col p-3">
                <span>Payment Status</span>
                <br />
                <strong>{orderDetails.paymentStatus}</strong>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="container">
        <ul className="list-group">
          {statusHistory.length > 0 ? (
            statusHistory.map((result) => (
              <li className="list-group-item" key={result._id}>
                <div className="row justify-content-between p-4">
                  <div className="col-2">
                    <i
                      className="bi bi-check-circle p-2"
                      style={{
                        fontSize: "19px",
                        color: result.updated_at ? "green" : "",
                      }}
                    ></i>
                    <span
                      className={`badge ${
                        result.updated_at ? "badge-light-success" : "badge-secondary"
                      } fw-semibold me-1`}
                    >
                      {result.status}
                    </span>
                  </div>
                  <div className="col-2">
                    <strong>{result.updated_by?.name}</strong>
                  </div>
                  <div className="col-6">
                    <strong>
                      {result.updated_at ? stringToDateTime(result.updated_at) : ""}
                    </strong>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li >No record found</li>
          )}
        </ul>
      </div>
    </>
  );
};

export default CustomerOrderStatus;
