/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

interface Subscription {
  _id: string;
  companyName: string;
  ownerName: string;
  subscriptionDetail: {
    payment_agreement_id: string;
    totalPaymentsCount: number;
    contractDet: any;
    lastSubscriptionDate: string; // Assume it's in ISO format (YYYY-MM-DD)
    amount: number;
  };
  is_active: boolean;
}

const AgentSubscriptions: FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");
  const [companyId, setCompanyId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [targetId, setTargetId] = useState<string | null>(null);

  useEffect(() => {
    const url = window.location.href;
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const extractedId = pathname.split("/")[2];
    setCompanyId(extractedId);
    setTargetId(extractedId); // Set targetId based on the extracted ID
  }, []);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!token) {
        setError("No token found.");
        setLoading(false);
        return;
      }

      if (!targetId) {
        setError("No target ID found.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          "https://adminapi.flexiclean.me/api/v1/agent/subscriptions",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const filteredData = data.data.filter(
          (item: Subscription) => item._id === targetId
        );

        if (filteredData.length === 0) {
          setError("No subscriptions found for this ID.");
        } else {
          setSubscriptions(filteredData);
          setError(null); // Reset error if data is found
        }
      } catch (err: any) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [token, targetId]);

  const calculateDaysToExpire = (lastSubscriptionDate: string): string => {
    const lastDate = new Date(lastSubscriptionDate);
    const expiryDate = new Date(lastDate);
    expiryDate.setMonth(lastDate.getMonth() + 1);
    const today = new Date();
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysLeft > 0 ? `${daysLeft} days to Expire` : "Expired";
  };

  const calculateDaysToSubscribe = (lastSubscriptionDate: string): string => {
    const lastDate = new Date(lastSubscriptionDate);
    const expiryDate = new Date(lastDate);
    expiryDate.setMonth(lastDate.getMonth() + 1);
    const today = new Date();
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return daysLeft > 0 ? `Subscribed` : "Subscribe";
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
    const formattedDate = `${date.getDate().toString().padStart(2, '0')} ${date.toLocaleString('default', options)}`;
    return formattedDate;
  };
  

  return (
    <>
      <PageTitle>MY SUBSCRIPTIONS</PageTitle>
      <div>
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
        ) : error ? (
          <p>{error}</p>
        ) : subscriptions.length > 0 ? (
          subscriptions.map((subscription) => (
            <div className="card mb-8" key={subscription._id}>
              <div className="card-body bg-light-success">
                <div className="d-flex align-items-center">
                  <div className="col-md-8">
                    <div className="flex-grow-1">
                      <span className="text-muted fw-bold d-block">
                        {subscription.subscriptionDetail.amount.toFixed(3)} BHD
                      </span>
                      <span className="text-muted fw-semibold d-block">
                        {calculateDaysToSubscribe(
                          subscription.subscriptionDetail.lastSubscriptionDate
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <div className="flex-grow-1">
                      <span className="text-muted fw-bold d-block">
                        {calculateDaysToExpire(
                          subscription.subscriptionDetail.lastSubscriptionDate
                        )}
                      </span>
                      <span className="text-muted fw-semibold d-block">
                        Auto Renewal
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="card-title align-items-start flex-column mb-4 mt-5">
                <span className="card-label fw-bold fs-3 mb-1">
                  TRANSACTIONS / INVOICING
                </span>
              </h3>

              <div className="card">
                <div className="card-body bg-light">
                  <div className="d-flex align-items-center ">
                    <div className="col-md-3">
                      <div className="flex-grow-1">
                        <span className="text-muted fw-bold d-block">
                          Transactions Id
                        </span>
                        <span className="text-muted fw-semibold d-block">
                          {formatDate(subscription.subscriptionDetail.lastSubscriptionDate)}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <div className="flex-grow-1">
                        <span className="text-muted fw-bold d-block">
                          Plan Name
                        </span>
                        <span className="text-muted fw-semibold d-block">
                          Amount
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-3">
                      <div className="flex-grow-1">
                        <span className="text-muted fw-bold d-block">
                          {subscription.subscriptionDetail.amount.toFixed(3)}{" "}
                          BHD
                        </span>
                        <span className="text-muted fw-semibold d-block">
                          Auto Renewal
                        </span>
                      </div>
                    </div>
                    <div className="col-md-2">
                      <span className="badge badge-warning fs-8 fw-bold">
                        Download Invoice
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No subscriptions found.</p>
        )}
      </div>
    </>
  );
};

export default AgentSubscriptions;
