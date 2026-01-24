// import React, { useState } from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { FaCheck, FaCircle } from "react-icons/fa";
// import { Button, Col, Container, Row, Modal } from "react-bootstrap";

// // Interfaces
// interface CustomerInfo {
//   name: string;
//   email: string;
//   mobile: string;
// }

// interface AgentCompany {
//   name: string;
//   email: string;
//   mobile: string;
// }

// interface StatusHistory {
//   status: string;
//   updated_at: string;
// }

// interface RowData {
//   id: number;
//   orderDate: string;
//   orderNo: string;
//   customerInfo: CustomerInfo;
//   agentCompany: AgentCompany;
//   numberOfItems: number;
//   bookedVia: string;
//   pickUpRequest: boolean;
//   deliveryRequest: boolean;
//   paymentStatus: string;
//   orderStatus: string;
//   orderDetails: string;
//   orderHistory: StatusHistory[];
// }

// interface IncomingData {
//   orderMode: string;
//   orderDate: string;
//   orderNo: string;
//   customerId: {
//     firstName: string;
//     email: string;
//     mobile: string;
//   };
//   companyId: {
//     companyName: string;
//     email: string;
//     mobile: string;
//   };
//   itemList: any[];
//   bookedVia: string;
//   pickUpRequest: boolean;
//   deliveryRequest: boolean;
//   paymentStatus: string;
//   orderStatus: string;
//   orderDetails: string;
//   statusHistory: StatusHistory[];
// }

// interface LogisticsTableProps {
//   data: IncomingData[];
// }

// const LogisticsTable: React.FC<LogisticsTableProps> = ({ data }) => {

//   function getDriverStatus(orderStatus: string) {
//     switch (orderStatus) {
//       case 'Booked':
//       case 'Ready':
//         return 'Driver not assigned';
  
//       case 'PickUp':
//       case 'OutforDelivery':
//         return 'Driver assigned';
  
//       case 'Received':
//       case 'Delivered':
//         return 'Driver PickUp/Delivered';
  
//       default:
//         return 'Unknown status';
//     }
//   }




//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 5,
//   });

//   const [selectedOrder, setSelectedOrder] = useState<StatusHistory[] | null>(null);
//   const [openPopup, setOpenPopup] = useState(false);

//   const rows: RowData[] =
//     data?.map((item, index) => ({
//       id: index + 1,
//       orderDate: item.orderDate || "2023-12-31",
//       orderNo: item.orderNo || "ORD001",
//       customerInfo: {
//         name: item.customerId?.firstName || "John Doe",
//         email: item.customerId?.email || "johndoe@example.com",
//         mobile: item.customerId?.mobile || "1234567890",
//       },
//       agentCompany: {
//         name: item.companyId?.companyName || "Acme Corp",
//         email: item.companyId?.email || "acme@example.com",
//         mobile: item.companyId?.mobile || "9876543210",
//       },
//       numberOfItems: item.itemList?.length || 3,
//       bookedVia: item.orderMode || "POS",
//       pickUpRequest:getDriverStatus(item.orderStatus),
//       deliveryRequest:getDriverStatus(item.orderStatus),
//       paymentStatus: item.paymentStatus || "Success",
//       orderStatus: item.orderStatus || "Booked",
//       orderDetails: item.orderDetails || "Additional notes about the order",
//       orderHistory: item.statusHistory || [],
//     })) || [];

//   const columns: GridColDef[] = [
//     { field: "orderDate", headerName: "Order Date", width: 150 },
//     { field: "orderNo", headerName: "Order No", width: 150 },
//     {
//       field: "customerName",
//       headerName: "Customer Name",
//       width: 200,
//       renderCell: (params) => params.row.customerInfo.name,
//     },
//     {
//       field: "customerEmail",
//       headerName: "Customer Email",
//       width: 250,
//       renderCell: (params) => params.row.customerInfo.email,
//     },
//     {
//       field: "customerMobile",
//       headerName: "Customer Mobile",
//       width: 150,
//       renderCell: (params) => params.row.customerInfo.mobile,
//     },
//     {
//       field: "agentName",
//       headerName: "Agent Company",
//       width: 200,
//       renderCell: (params) => params.row.agentCompany.name,
//     },
//     {
//       field: "agentEmail",
//       headerName: "Agent Email",
//       width: 250,
//       renderCell: (params) => params.row.agentCompany.email,
//     },
//     {
//       field: "agentMobile",
//       headerName: "Agent Mobile",
//       width: 150,
//       renderCell: (params) => params.row.agentCompany.mobile,
//     },
//     { field: "numberOfItems", headerName: "Number of Items", width: 150 },
//     { field: "bookedVia", headerName: "Booked Via", width: 150 },
//     {
//       field: "pickUpRequest",
//       headerName: "Pick Up Request",
//       width: 150,
//       renderCell: (params) =>
//         params.value ? (
//           <>
//             <Button variant="link" className="van-icon d-flex align-items-center">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
//                 alt="Pick Up"
//                 style={{
//                   width: "40px",
//                   filter:
//                     "invert(27%) sepia(64%) saturate(5000%) hue-rotate(185deg) brightness(95%) contrast(90%)",
//                 }}
//               />
//             </Button>{" "}
//             Yes
//           </>
//         ) : (
//           "No"
//         ),
//     },
//     {
//       field: "deliveryRequest",
//       headerName: "Delivery Request",
//       width: 150,
//       renderCell: (params) =>
//         params.value ? (
//           <>
//             <Button variant="link" className="van-icon d-flex align-items-center">
//               <img
//                 src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
//                 alt="Delivery"
//                 style={{
//                   width: "40px",
//                   filter:
//                     "invert(39%) sepia(92%) saturate(7500%) hue-rotate(63deg) brightness(95%) contrast(101%)",
//                 }}
//               />
//             </Button>{" "}
//             Yes
//           </>
//         ) : (
//           "No"
//         ),
//     },
//     {
//       field: "paymentStatus",
//       headerName: "Payment Status",
//       width: 200,
//       renderCell: (params) => {
//         let icon;
//         let text;

//         switch (params.value) {
//           case "Success":
//             icon = <FaCheck style={{ color: "green", width: "20px", marginRight: 8 }} />;
//             text = "Success";
//             break;
//           case "Pending":
//             icon = <FaCheck style={{ color: "orange", width: "20px", marginRight: 8 }} />;
//             text = "Pending";
//             break;
//           case "Refunded":
//             icon = <FaCheck style={{ color: "red", width: "20px", marginRight: 8 }} />;
//             text = "Refunded";
//             break;
//           default:
//             icon = <FaCircle style={{ color: "gray", marginRight: 8 }} />;
//             text = params.value;
//         }

//         return (
//           <div style={{ display: "flex", alignItems: "center" }}>
//             {icon}
//             <span>{text}</span>
//           </div>
//         );
//       },
//     },
//     { field: "orderStatus", headerName: "Order Status", width: 150 },
//     {
//       field: "orderDetails",
//       headerName: "Order Details",
//       width: 150,
//       renderCell: (params) => (
//         <button
//           className="custom-button"
//           onClick={() => {
//             setSelectedOrder(params.row.orderHistory);
//             setOpenPopup(true);
//           }}
//         >
//           View
//         </button>
//       ),
//     },
//   ];

//   return (
//     <Container fluid>
//       <Row>
//         <Col>
//           <div className="transactions-container">
//             <div style={{ height: "100%", width: "100%" }}>
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 paginationModel={paginationModel}
//                 onPaginationModelChange={setPaginationModel}
//                 pageSizeOptions={[5, 10, 20]}
//                 checkboxSelection
//               />
//             </div>
//           </div>
//         </Col>
//       </Row>

//       {/* Modal for Order Details */}
//       <Modal show={openPopup} onHide={() => setOpenPopup(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Order History</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedOrder && selectedOrder.length > 0 ? (
//             <div>
//               {selectedOrder.map((ord, idx) => (
//                 <div key={idx} style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}>
//                   <strong>Status:</strong> {ord.status} <br />
//                   <strong>Updated At:</strong> {ord.updated_at? new Date(ord.updated_at).toLocaleString():"-"}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No history available.</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setOpenPopup(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default LogisticsTable;



// import React, { useState } from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { FaCheck, FaCircle } from "react-icons/fa";
// import { Button, Col, Container, Row, Modal } from "react-bootstrap";

// // Interfaces
// interface CustomerInfo {
//   name: string;
//   email: string;
//   mobile: string;
// }

// interface AgentCompany {
//   name: string;
//   email: string;
//   mobile: string;
// }

// interface StatusHistory {
//   status: string;
//   updated_at: string;
// }

// interface RowData {
//   id: number;
//   orderDate: string;
//   orderNo: string;
//   customerInfo: CustomerInfo;
//   agentCompany: AgentCompany;
//   numberOfItems: number;
//   bookedVia: string;
//   pickUpRequest: string;
//   deliveryRequest: string;
//   paymentStatus: string;
//   orderStatus: string;
//   orderDetails: string;
//   orderHistory: StatusHistory[];
// }

// interface IncomingData {
//   orderMode: string;
//   orderDate: string;
//   orderNo: string;
//   customerId: {
//     firstName: string;
//     email: string;
//     mobile: string;
//   };
//   companyId: {
//     companyName: string;
//     email: string;
//     mobile: string;
//   };
//   itemList: any[];
//   bookedVia: string;
//   pickUpRequest: boolean;
//   deliveryRequest: boolean;
//   paymentStatus: string;
//   orderStatus: string;
//   orderDetails: string;
//   statusHistory: StatusHistory[];
// }

// interface LogisticsTableProps {
//   data: IncomingData[];
// }

// // Icon filter utility
// function getDriverStatusDetails(orderStatus: string) {
//   switch (orderStatus) {
//     case "Booked":
//     case "Ready":
//       return {
//         label: "Driver Not Assigned",
//         filter:
//           "invert(18%) sepia(85%) saturate(6000%) hue-rotate(-10deg) brightness(80%) contrast(90%)",
//       };
//     case "Pick Up":
//     case "OutforDelivery":
//       return {
//         label: "Driver Assigned",
//         filter:
//           "invert(27%) sepia(64%) saturate(5000%) hue-rotate(185deg) brightness(95%) contrast(90%)",
//       };
//     case "Received":
//     case "Delivered":
//       return {
//         label: "Driver Pick Up/Delivered",
//         filter:
//           "invert(39%) sepia(92%) saturate(7500%) hue-rotate(63deg) brightness(95%) contrast(101%)",
//       };
//     default:
//       return {
//         label: "Unknown",
//         filter: "grayscale(1)",
//       };
//   }
// }

// const LogisticsTable: React.FC<LogisticsTableProps> = ({ data }) => {
//   const [paginationModel, setPaginationModel] = useState({
//     page: 0,
//     pageSize: 5,
//   });

//   const [selectedOrder, setSelectedOrder] = useState<StatusHistory[] | null>(
//     null
//   );
//   const [openPopup, setOpenPopup] = useState(false);


//   const rows: RowData[] =
//     data?.[0]?.data?.map((item, index) => ({
//       id: index + 1,
//       orderDate: item.orderDate || "2023-12-31",
//       orderNo: item.orderNo || "ORD001",
//       customerInfo: {
//         name: item.customerId?.firstName || "John Doe",
//         email: item.customerId?.email || "johndoe@example.com",
//         mobile: item.customerId?.mobile || "1234567890",
//       },
//       agentCompany: {
//         name: item.companyId?.companyName || "Acme Corp",
//         email: item.companyId?.email || "acme@example.com",
//         mobile: item.companyId?.mobile || "9876543210",
//       },
//       numberOfItems: item.itemList?.length || 3,
//       bookedVia: item.orderMode || "POS",
//       pickUpRequest: item.orderStatus,
//       deliveryRequest: item.orderStatus,
//       paymentStatus: item.paymentStatus || "Success",
//       orderStatus: item.orderStatus || "Booked",
//       orderDetails: item.orderDetails || "Additional notes about the order",
//       orderHistory: item.statusHistory || [],
//     })) || [];

//   const columns: GridColDef[] = [
//     { field: "orderDate", headerName: "Order Date", width: 150 },
//     { field: "orderNo", headerName: "Order No", width: 150 },
//     {
//       field: "customerName",
//       headerName: "Customer Name",
//       width: 200,
//       renderCell: (params) => params.row.customerInfo.name,
//     },
//     {
//       field: "customerEmail",
//       headerName: "Customer Email",
//       width: 250,
//       renderCell: (params) => params.row.customerInfo.email,
//     },
//     {
//       field: "customerMobile",
//       headerName: "Customer Mobile",
//       width: 150,
//       renderCell: (params) => params.row.customerInfo.mobile,
//     },
//     {
//       field: "agentName",
//       headerName: "Agent Company",
//       width: 200,
//       renderCell: (params) => params.row.agentCompany.name,
//     },
//     {
//       field: "agentEmail",
//       headerName: "Agent Email",
//       width: 250,
//       renderCell: (params) => params.row.agentCompany.email,
//     },
//     {
//       field: "agentMobile",
//       headerName: "Agent Mobile",
//       width: 150,
//       renderCell: (params) => params.row.agentCompany.mobile,
//     },
//     { field: "numberOfItems", headerName: "Number of Items", width: 150 },
//     { field: "bookedVia", headerName: "Booked Via", width: 150 },
//     {
//       field: "pickUpRequest",
//       headerName: "Pick Up Status",
//       width: 180,
//       renderCell: (params) => {
//         const status = getDriverStatusDetails(params.value);
//         return (
//           <div className="d-flex align-items-center gap-2">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
//               alt={status.label}
//               style={{
//                 width: "30px",
//                 filter: status.filter,
//               }}
//             />
//             <span>{status.label}</span>
//           </div>
//         );
//       },
//     },
//     {
//       field: "deliveryRequest",
//       headerName: "Delivery Status",
//       width: 180,
//       renderCell: (params) => {
//         const status = getDriverStatusDetails(params.value);
//         return (
//           <div className="d-flex align-items-center gap-2">
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
//               alt={status.label}
//               style={{
//                 width: "30px",
//                 filter: status.filter,
//               }}
//             />
//             <span>{status.label}</span>
//           </div>
//         );
//       },
//     },
//     {
//       field: "paymentStatus",
//       headerName: "Payment Status",
//       width: 200,
//       renderCell: (params) => {
//         let icon;
//         let text;

//         switch (params.value) {
//           case "Success":
//             icon = (
//               <FaCheck
//                 style={{ color: "green", width: "20px", marginRight: 8 }}
//               />
//             );
//             text = "Success";
//             break;
//           case "Pending":
//             icon = (
//               <FaCheck
//                 style={{ color: "orange", width: "20px", marginRight: 8 }}
//               />
//             );
//             text = "Pending";
//             break;
//           case "Refunded":
//             icon = (
//               <FaCheck
//                 style={{ color: "red", width: "20px", marginRight: 8 }}
//               />
//             );
//             text = "Refunded";
//             break;
//           default:
//             icon = <FaCircle style={{ color: "gray", marginRight: 8 }} />;
//             text = params.value;
//         }

//         return (
//           <div style={{ display: "flex", alignItems: "center" }}>
//             {icon}
//             <span>{text}</span>
//           </div>
//         );
//       },
//     },
//     { field: "orderStatus", headerName: "Order Status", width: 150 },
//     {
//       field: "orderDetails",
//       headerName: "Order Details",
//       width: 150,
//       renderCell: (params) => (
//         <button
//           className="custom-button"
//           onClick={() => {
//             setSelectedOrder(params.row.orderHistory);
//             setOpenPopup(true);
//           }}
//         >
//           View
//         </button>
//       ),
//     },
//   ];

//   return (
//     <Container fluid>
//       <Row>
//         <Col>
//           <div className="transactions-container">
//             <div style={{ height: "100%", width: "100%" }}>
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 paginationModel={paginationModel}
//                 onPaginationModelChange={setPaginationModel}
//                 pageSizeOptions={[5, 10, 20]}
//                 checkboxSelection
//               />
//             </div>
//           </div>
//         </Col>
//       </Row>

//       {/* Modal for Order Details */}
//       <Modal show={openPopup} onHide={() => setOpenPopup(false)}>
//         <Modal.Header closeButton>
//           <Modal.Title>Order History</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedOrder && selectedOrder.length > 0 ? (
//             <div>
//               {selectedOrder.map((ord, idx) => (
//                 <div
//                   key={idx}
//                   style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}
//                 >
//                   <strong>Status:</strong> {ord.status} <br />
//                   <strong>Updated At:</strong>{" "}
//                   {ord.updated_at
//                     ? new Date(ord.updated_at).toLocaleString()
//                     : "-"}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p>No history available.</p>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={() => setOpenPopup(false)}>
//             Close
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </Container>
//   );
// };

// export default LogisticsTable;


import React, { useState } from "react";
import { DataGrid, GridColDef, GridRenderCellParams, GridCellParams } from "@mui/x-data-grid";
import { FaCheck, FaCircle } from "react-icons/fa";
import { Button, Col, Container, Row, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Interfaces
interface CustomerInfo {
  name: string;
  email: string;
  mobile: string;
}

interface AgentCompany {
  name: string;
  email: string;
  mobile: string;
}

interface StatusHistory {
  status: string;
  updated_at: string;
}

interface RowData {
  id: number;
  _id: any;
  orderDate: string;
  orderNo: string;
  customerInfo: CustomerInfo;
  agentCompany: AgentCompany;
  numberOfItems: number;
  bookedVia: string;
  pickUpRequest: string;
  deliveryRequest: string;
  paymentStatus: string;
  orderStatus: string;
  orderDetails: string;
  orderHistory: StatusHistory[];
}

interface IncomingData {
  _id?: string;
  orderMode: string;
  orderDate: string;
  orderNo: string;
  customerId: {
    firstName: string;
    email: string;
    mobile: string;
  };
  companyId: {
    companyName: string;
    email: string;
    mobile: string;
  };
  itemList: any[];
  bookedVia: string;
  pickUpRequest: boolean;
  deliveryRequest: boolean;
  paymentStatus: string;
  orderStatus: string;
  orderDetails: string;
  statusHistory: StatusHistory[];
}

interface LogisticsTableProps {
  data: IncomingData[];
}

// Utility
 function getDriverStatusDetails(orderStatus: string) {
  if (orderStatus === "Booked" ) {
    return {
      label: orderStatus,
      filter:
        "invert(18%) sepia(85%) saturate(6000%) hue-rotate(-10deg) brightness(80%) contrast(90%)",
    };
  }

  if ( orderStatus === "Pickup assigned") {
    return {
      label: orderStatus,
      filter:
        "invert(27%) sepia(64%) saturate(5000%) hue-rotate(185deg) brightness(95%) contrast(90%)",
    };
  }

  if (orderStatus === "Received" || orderStatus === "Delivered"||orderStatus=="Pick Up"||orderStatus=="Out for Delivery"||orderStatus=="Ready"||orderStatus=="Delivery assigned"||orderStatus=="In Progress"||orderStatus=="Completed"||orderStatus=="") {
    return {
      label: orderStatus,
      filter:
        "invert(39%) sepia(92%) saturate(7500%) hue-rotate(63deg) brightness(95%) contrast(101%)",
    };
  }

  return {
    label: "Unknown",
    filter: "grayscale(1)",
  };
}

function getStatusDetails(orderStatus: string) {
  if (orderStatus === "Booked"||orderStatus=="Pick Up"||orderStatus=="Pickup assigned"||orderStatus=="Received"||orderStatus=="In Progress"||orderStatus=="Ready") {
    return {
      label: orderStatus,
      filter:
        "invert(18%) sepia(85%) saturate(6000%) hue-rotate(-10deg) brightness(80%) contrast(90%)",
    };
  }

  if ( orderStatus === "Delivery assigned") {
    return {
      label: orderStatus,
      filter:
        "invert(27%) sepia(64%) saturate(5000%) hue-rotate(185deg) brightness(95%) contrast(90%)",
    };
  }

  if (orderStatus === "Completed" || orderStatus === "Delivered"||orderStatus=="Out for Delivery") {
    return {
      label: orderStatus,
      filter:
        "invert(39%) sepia(92%) saturate(7500%) hue-rotate(63deg) brightness(95%) contrast(101%)",
    };
  }

  return {
    label: "Unknown",
    filter: "grayscale(1)",
  };
}

const LogisticsTable: React.FC<LogisticsTableProps> = ({ data }) => {
   const [selectedOrder, setSelectedOrder] = useState<StatusHistory[] | null>(
    null
  );
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  
const handleOrderClick = (orderNo: string) => {
  navigate(`/customer/order/${orderNo}`);
}  
  const rows: RowData[] =
  data?.map((item, index) => ({
      id: index + 1,
      _id: item._id || "1",
      orderDate: item.orderDate || "2023-12-31",
      orderNo: item.orderNo || "ORD001",
      customerInfo: {
        name: item.customerId?.firstName || "John Doe",
        email: item.customerId?.email || "johndoe@example.com",
        mobile: item.customerId?.mobile || "1234567890",
      },
      agentCompany: {
        name: item.companyId?.companyName || "Acme Corp",
        email: item.companyId?.email || "acme@example.com",
        mobile: item.companyId?.mobile || "9876543210",
      },
      numberOfItems: item.itemList?.length || 0,
      bookedVia: item.orderMode || "POS",
      pickUpRequest: item.orderStatus || "Unknown",
      deliveryRequest: item.orderStatus || "Unknown",
      paymentStatus: item.paymentStatus || "Pending",
      orderStatus: item.orderStatus || "Booked",
      orderDetails: item.orderDetails || "No details",
      orderHistory: item.statusHistory || [],
    })) || [];

  const columns: GridColDef[] = [
  {
  field: "orderDate",
  headerName: "Order Date",
  width: 150,
  renderCell: (params: GridRenderCellParams<any, string>) => {
    if (!params.value) return "";
    const date = new Date(params.value); // value is string (ISO format) or timestamp
    if (isNaN(date.getTime())) return ""; // Handle invalid date
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  },
}

,
   {
    field: "orderNo",
    headerName: "Order No",
    width: 250,
    renderCell: (params: GridCellParams) => {
      // Optionally log the value for debugging
      // console.log(params,"paaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      return (
        <span
          style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
          onClick={() => handleOrderClick(String(params.row._id))}
        >
          {String(params.value)}
        </span>
      );
    },
  },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 200,
      renderCell: (params) => <>{params.row.customerInfo.name}</>,
    },
    {
      field: "customerEmail",
      headerName: "Customer Email",
      width: 250,
      renderCell: (params) => <>{params.row.customerInfo.email}</>,
    },
    {
      field: "customerMobile",
      headerName: "Customer Mobile",
      width: 150,
      renderCell: (params) => <>{params.row.customerInfo.mobile}</>,
    },
    {
      field: "agentName",
      headerName: "Agent Company",
      width: 200,
      renderCell: (params) => <>{params.row.agentCompany.name}</>,
    },
    {
      field: "agentEmail",
      headerName: "Agent Email",
      width: 250,
      renderCell: (params) => <>{params.row.agentCompany.email}</>,
    },
    {
      field: "agentMobile",
      headerName: "Agent Mobile",
      width: 150,
      renderCell: (params) => <>{params.row.agentCompany.mobile}</>,
    },
    { field: "numberOfItems", headerName: "Number of Items", width: 150 },
    { field: "bookedVia", headerName: "Booked Via", width: 150 },
    {
      field: "pickUpRequest",
      headerName: "Pick Up Status",
      width: 180,
      renderCell: (params) => {
        const status = getDriverStatusDetails(params.value);
        return (
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
              alt={status.label}
              style={{
                width: "30px",
                filter: status.filter,
              }}
            />
            <span>{status.label}</span>
          </div>
        );
      },
    },
    {
      field: "deliveryRequest",
      headerName: "Delivery Status",
      width: 180,
      renderCell: (params) => {
        const status = getStatusDetails(params.value);
        return (
          <div className="d-flex align-items-center gap-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
              alt={status.label}
              style={{
                width: "30px",
                filter: status.filter,
              }}
            />
            <span>{status.label}</span>
          </div>
        );
      },
    },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 200,
      renderCell: (params) => {
        let icon;
        let text;

        switch (params.value) {
          case "Success":
            icon = <FaCheck style={{ color: "green", marginRight: 8 }} />;
            text = "Success";
            break;
          case "Pending":
            icon = <FaCheck style={{ color: "orange", marginRight: 8 }} />;
            text = "Pending";
            break;
          case "Refunded":
            icon = <FaCheck style={{ color: "red", marginRight: 8 }} />;
            text = "Refunded";
            break;
          default:
            icon = <FaCircle style={{ color: "gray", marginRight: 8 }} />;
            text = params.value;
        }

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            {icon}
            <span>{text}</span>
          </div>
        );
      },
    },
    { field: "orderStatus", headerName: "Order Status", width: 150 },
    {
      field: "orderDetails",
      headerName: "Order Details",
      width: 150,
      renderCell: (params) => (
        <button
          className="custom-button"
          onClick={() => {
            setSelectedOrder(params.row.orderHistory);
            setOpenPopup(true);
          }}
        >
          View
        </button>
      ),
    },
  ];

  return (
    <Container fluid>
      <Row>
        <Col>
          <div className="transactions-container">
            <div style={{ height: "100%", width: "100%" }}>
<DataGrid
      rows={rows}
      columns={columns} 
    />
                </div>
          </div>
        </Col>
      </Row>

      {/* Modal for Order Details */}
      <Modal show={openPopup} onHide={() => setOpenPopup(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Order History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedOrder && selectedOrder.length > 0 ? (
            <div>
              {selectedOrder.map((ord, idx) => (
                <div
                  key={idx}
                  style={{ borderBottom: "1px solid #ddd", padding: "10px 0" }}
                >
                  <strong>Status:</strong> {ord.status} <br />
                  <strong>Updated At:</strong>{" "}
                  {ord.updated_at
                    ? new Date(ord.updated_at).toLocaleString()
                    : "-"}
                </div>
              ))}
            </div>
          ) : (
            <p>No history available.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setOpenPopup(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LogisticsTable;
