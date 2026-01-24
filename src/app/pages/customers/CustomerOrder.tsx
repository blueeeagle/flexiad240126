// import React, { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../_metronic/layout/core";
// import { useParams } from "react-router-dom";
// import { getRequest } from "../../modules/auth/core/_requests";
// import { formatDate } from "../../../common/Date";
// import logo from "../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
// import { toAgentApiUrl, toApiUrl } from "../../../_metronic/helpers";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
// const CustomerOrder: FC = () => {
//   const { orderId } = useParams();
//   const [orderDetails, setOrderDetails] = useState<any>({});
//   const [itemList, setItemList] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true); // Add loading state

//   const getData = async () => {
//     try {
//       setLoading(true); // Start loading
//       const orderDetails = await getRequest(`/order/${orderId}`, ``);

//       const lookupObj = [orderDetails];
//       let data1: Array<any> = [];
//       const result = await Promise.allSettled(lookupObj);
//       result.forEach((req: any) => {
//         data1.push(req.value);
//       });

//       const orderData = {
//         itemList: data1[0]?.data?.status === "ok" ? data1[0]?.data?.data?.itemList : [],
//         orderDetails: data1[0]?.data?.status === "ok" ? data1[0]?.data?.data : [],
//       };

//       setOrderDetails(orderData?.orderDetails);
//       setItemList(orderData?.itemList);
//     } catch (error) {
//       console.error("Error fetching order data:", error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, [orderId]);

//   return (
//     <>
//       <PageTitle>Order Details</PageTitle>

//       <div className="container">
//         {loading ? (
//           <div
//           className="text-center"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "50vh",
//           }}
//         >
//           <Lottie
//             animationData={loaderAnimation}
//             loop={true}
//             style={{
//               width: 150,
//               height: 150,
//               filter: "hue-rotate(200deg)", // Adjust the degree for a blue effect
//             }}
//           />
//         </div>
//         ) : (
//           <div className="row">
//             <div className="col-md-8 p-4">
//               <div className="card">
//                 <div className="card-body">
//                   <div className="container">
//                     <h6>AGENT DETAILS</h6>
//                     <div className="row p-2">
//                       <div className="col-lg-2">
//                         <div style={{ padding: "10px" }}>
//                           <img
//                             src={
//                               orderDetails?.companyId?.companyLogo
//                                 ? toAgentApiUrl(orderDetails.companyId.companyLogo)
//                                 : logo
//                             }
//                             alt="Agent"
//                             width="50px"
//                             height="50px"
//                             onError={(e) => {
//                               (e.target as HTMLImageElement).src = logo;
//                             }}
//                           />
//                         </div>
//                       </div>
//                       <div className="col">
//                         <h6>{orderDetails?.companyId?.companyName}</h6>
//                         <span>
//                           {orderDetails?.companyId?.addressDetails?.street},{" "}
//                           {orderDetails?.companyId?.addressDetails?.cityId?.name},{" "}
//                           {orderDetails?.companyId?.addressDetails?.countryId?.name} -{" "}
//                           {orderDetails?.companyId?.addressDetails?.zipcode}
//                         </span>
//                         <br />
//                         <br />
//                         <span>
//                           <i className="bi bi-telephone"></i>&nbsp;
//                           {orderDetails?.companyId?.agentId?.mobile}
//                         </span>
//                         &nbsp;
//                         <span>
//                           <i className="bi bi-envelope"></i>&nbsp;
//                           {orderDetails?.companyId?.agentId?.email}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="container pt-4">
//                     <h6>CUSTOMER DETAILS</h6>
//                     <div className="row p-2">
//                       <div className="col-lg-2">
//                         <div style={{ padding: "10px" }}>
//                           <img
//                             src="http://agent.flexiclean.me/assets/images/male-user-profile.png"
//                             alt="Customer"
//                             width="50px"
//                             height="50px"
//                           />
//                         </div>
//                       </div>
//                       <div className="col">
//                         <h6>
//                           {orderDetails?.customerId?.firstName} {orderDetails?.customerId?.lastName}
//                         </h6>
//                         <span>
//                           {orderDetails?.addressDetails?.street},<br />
//                           {orderDetails?.addressDetails?.block}{" "}
//                           {orderDetails?.addressDetails?.building}
//                         </span>
//                         <br />
//                         <span>
//                           <i className="bi bi-telephone"></i>&nbsp;
//                           {orderDetails?.customerId?.mobile}
//                         </span>
//                         <span>
//                           <i className="bi bi-envelope"></i>&nbsp;
//                           {orderDetails?.customerId?.email}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="container p-4">
//                     <h6>ITEM SUMMARY</h6>
//                     {itemList?.length > 0 ? (
//                       itemList.map((result: any) => (
//                         <div className="row" key={result?.productId?.productId?._id}>
//                           <div className="col-lg-2">
//                             <div className="d-flex align-items-center">
//                               <div className="symbol symbol-45px me-5">
//                                 <img
//                                   style={{ width: "auto" }}
//                                   src={toApiUrl(result?.productId?.productId?.productImageURL)}
//                                   alt=""
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                           <div className="col-lg-3 m-2">
//                             <h6>{result?.productId?.productId?.productName}</h6>
//                             <span>{result?.chargeId?.chargeName}</span>
//                             <br />
//                             <span>
//                               <i className="bi bi-cart"></i>&nbsp;
//                               <strong>
//                                 {result?.qty} * {result?.amount}{" "}
//                                 {orderDetails?.currencyId?.currencyCode}
//                               </strong>
//                             </span>
//                           </div>
//                           <div className="col-lg-2">
//                             <strong className="pt-4">
//                               {result?.netAmt} {orderDetails?.currencyId?.currencyCode}
//                             </strong>
//                           </div>
//                         </div>
//                       ))
//                     ) : (
//                       <p>No Items Found</p>
//                     )}
//                   </div>

//                   <div className="container">
//                     <div className="p-4">
//                       <span>PICKUP ON</span>&nbsp; &nbsp;
//                       <strong>{formatDate(orderDetails?.pickupDate)}</strong>
//                     </div>

//                     <div className="p-4">
//                       <span>DELIVERY ON</span>&nbsp; &nbsp;
//                       <strong>{formatDate(orderDetails?.expDeliveryDate)}</strong>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="col-md-4 p-4">
//               <div className="row card">
//                 <div className="col">
//                   <div className="card-body">
//                     <h5>Order Summary</h5>
//                     <ul className="list-group">
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0">
//                         Price ({orderDetails?.qty} items){" "}
//                         <strong>
//                           {orderDetails?.grossAmt} {orderDetails?.currencyId?.currencyCode}
//                         </strong>
//                       </li>
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0">
//                         Discount{" "}
//                         <strong>
//                           {orderDetails?.discAmt} {orderDetails?.currencyId?.currencyCode}
//                         </strong>
//                       </li>
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0">
//                         Delivery Charge{" "}
//                         <strong>
//                           {orderDetails?.deliveryCharges} {orderDetails?.currencyId?.currencyCode}
//                         </strong>
//                       </li>
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0">
//                         Net Amount{" "}
//                         <strong>
//                           {orderDetails?.netAmt} {orderDetails?.currencyId?.currencyCode}
//                         </strong>
//                       </li>
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0">
//                         Payment Received{" "}
//                         <strong>
//                           {orderDetails?.paymentReceived} {orderDetails?.currencyId?.currencyCode}
//                         </strong>
//                       </li>
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0">
//                         Payment Pending{" "}
//                         <strong>
//                           {orderDetails?.paymentPending} {orderDetails?.currencyId?.currencyCode}
//                         </strong>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//               <div className="row card mt-4">
//                 <div className="col">
//                   <div className="card-body">
//                     <h5>Payment Summary</h5>
//                     <ul className="list-group">
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0">
//                         Payment Method{" "}
//                         <strong>{orderDetails?.paymentMode?.paymentMode}</strong>
//                       </li>
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0">
//                         Payment Status{" "}
//                         <strong>{orderDetails?.paymentStatus?.paymentStatus}</strong>
//                       </li>
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0">
//                         Payment Received{" "}
//                         <strong>
//                           {orderDetails?.paymentReceived} {orderDetails?.currencyId?.currencyCode}
//                         </strong>
//                       </li>
//                       <li className="list-group-item d-flex justify-content-between align-items-center border-0">
//                         Payment Pending{" "}
//                         <strong>
//                           {orderDetails?.paymentPending} {orderDetails?.currencyId?.currencyCode}
//                         </strong>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default CustomerOrder ;
import React, { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { useParams } from "react-router-dom";
import { getRequest } from "../../modules/auth/core/_requests";
import { formatDate } from "../../../common/Date";
import logo from "../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
import { toAgentApiUrl, toApiUrl } from "../../../_metronic/helpers";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

const CustomerOrder: FC = () => {
  const { orderId } = useParams();
  const [orderDetails, setOrderDetails] = useState<any>({});
  const [itemList, setItemList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state

  const getData = async () => {
    try {
      setLoading(true); // Start loading
      const orderDetails = await getRequest(`/order/${orderId}`, ``);

      const lookupObj = [orderDetails];
      let data1: Array<any> = [];
      const result = await Promise.allSettled(lookupObj);
      result.forEach((req: any) => {
        data1.push(req.value);
      });

      const orderData = {
        itemList: data1[0]?.data?.status === "ok" ? data1[0]?.data?.data?.itemList : [],
        orderDetails: data1[0]?.data?.status === "ok" ? data1[0]?.data?.data : [],
      };

      setOrderDetails(orderData?.orderDetails);
      setItemList(orderData?.itemList);
    } catch (error) {
      console.error("Error fetching order data:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    getData();
  }, [orderId]);

  // Function to format amount
  const formatAmount = (amount: number | undefined) => {
    return amount !== undefined ? amount.toFixed(2) : "0.00";
  };


  return (
    <>
      <PageTitle>Order Details</PageTitle>

      <div className="container">
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
          <div className="row">
            <div className="col-md-8 p-4">
              <div className="card">
                <div className="card-body">
                  <div className="container">
                    <h6>AGENT DETAILS</h6>
                    <div className="row p-2">
                      <div className="col-lg-2">
                        <div style={{ padding: "10px" }}>
                          <img
                            src={
                              orderDetails?.companyId?.companyLogo
                                ? toAgentApiUrl(orderDetails.companyId.companyLogo)
                                : logo
                            }
                            alt="Agent"
                            width="50px"
                            height="50px"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = logo;
                            }}
                          />
                        </div>
                      </div>
                      <div className="col">
                        <h6>{orderDetails?.companyId?.companyName}</h6>
                        <span>
                          {orderDetails?.companyId?.addressDetails?.street},{" "}
                          {orderDetails?.companyId?.addressDetails?.cityId?.name},{" "}
                          {orderDetails?.companyId?.addressDetails?.countryId?.name} -{" "}
                          {orderDetails?.companyId?.addressDetails?.zipcode}
                        </span>
                        <br />
                        <br />
                        <span>
                          <i className="bi bi-telephone"></i>&nbsp;
                          {orderDetails?.companyId?.agentId?.mobile}
                        </span>
                        &nbsp;
                        <span>
                          <i className="bi bi-envelope"></i>&nbsp;
                          {orderDetails?.companyId?.agentId?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="container pt-4">
                    <h6>CUSTOMER DETAILS</h6>
                    <div className="row p-2">
                      <div className="col-lg-2">
                        <div style={{ padding: "10px" }}>
                          <img
                            src="http://agent.flexiclean.me/assets/images/male-user-profile.png"
                            alt="Customer"
                            width="50px"
                            height="50px"
                          />
                        </div>
                      </div>
                      <div className="col">
                        <h6>
                          {orderDetails?.customerId?.firstName} {orderDetails?.customerId?.lastName}
                        </h6>
                        <span>
                          {orderDetails?.addressDetails?.street},<br />
                          {orderDetails?.addressDetails?.block}{" "}
                          {orderDetails?.addressDetails?.building}
                        </span>
                        <br />
                        <span>
                          <i className="bi bi-telephone"></i>&nbsp;
                          {orderDetails?.customerId?.mobile}
                        </span>
                        <span>
                          <i className="bi bi-envelope"></i>&nbsp;
                          {orderDetails?.customerId?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="container p-4">
                    <h6>ITEM SUMMARY</h6>
                    {itemList?.length > 0 ? (
                      itemList.map((result: any) => (
                        <div className="row" key={result?.productId?.productId?._id}>
                          <div className="col-lg-2">
                            <div className="d-flex align-items-center">
                              <div className="symbol symbol-45px me-5">
                                <img
                                  style={{ width: "auto" }}
                                  src={`${import.meta.env.VITE_IMAGE_BASE_URL}/${result?.productId?.productId?.productImageURL}`}
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-3 m-2">
                            <h6>{result?.productId?.productId?.productName}</h6>
                            <span>{result?.chargeId?.chargeName}</span>
                            <br />
                            <span>
                              <i className="bi bi-cart"></i>&nbsp;
                              <strong>
                                {result?.qty} * {formatAmount(result?.amount)}{" "}
                                {orderDetails?.currencyId?.currencyCode}
                              </strong>
                            </span>
                          </div>
                          <div className="col-lg-2">
                            <strong className="pt-4">
                              {formatAmount(result?.netAmt)} {orderDetails?.currencyId?.currencyCode}
                            </strong>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No Items Found</p>
                    )}
                  </div>

                  <div className="container">
                    <div className="p-4">
                      <span>PICKUP ON</span>&nbsp; &nbsp;
                      <strong>{orderDetails?.pickupDate ? formatDate(orderDetails.pickupDate) : "-"}</strong>
                    </div>

                    <div className="p-4">
                      <span>DELIVERY ON</span>&nbsp; &nbsp;
                      <strong>{orderDetails?.expDeliveryDate? formatDate(orderDetails?.expDeliveryDate):"-"}</strong>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 p-4">
              <div className="row card">
                <div className="col">
                  <div className="card-body">
                    <h5>Order Summary</h5>
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                        Price ({orderDetails?.qty} items){" "}
                        <strong>
                          {formatAmount(orderDetails?.grossAmt)} {orderDetails?.currencyId?.currencyCode}
                        </strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                        Discount{" "}
                        <strong>
                          {formatAmount(orderDetails?.discAmt)} {orderDetails?.currencyId?.currencyCode}
                        </strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                        Delivery Charge{" "}
                        <strong>
                          {formatAmount(orderDetails?.deliveryCharges)} {orderDetails?.currencyId?.currencyCode}
                        </strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                        GST{" "}
                        <strong>
                          {formatAmount(orderDetails?.gst)} {orderDetails?.currencyId?.currencyCode}
                        </strong>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center border-0">
                        Total Amount{" "}
                        <strong>
                          {formatAmount(orderDetails?.netAmt)} {orderDetails?.currencyId?.currencyCode}
                        </strong>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CustomerOrder
