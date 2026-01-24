// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../_metronic/layout/core";
// import { postRequest } from "../../modules/auth/core/_requests";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import { stringToDate } from "../../../common/Date";
// import ReactPaginate from "react-paginate";
// import { IconContext } from "react-icons";
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
// import { KTIcon } from "../../../_metronic/helpers/components/KTIcon";
// import { DataGrid } from "@mui/x-data-grid";
// interface OrderRow {
//   id: string;
//   orderDate: Date; // Adjust to the correct type
//   orderNo: string;
//   customerInfo: string;
//   companyName: string;
//   noOfItems: number;
//   orderMode: string;
//   isHomePickup: string;
//   isHomeDelivery: string;
//   paymentStatus: string;
//   orderStatus: string;
// }
// const CustomerOrders: FC = () => {
//   const [rowData, setRowData] = useState<OrderRow[]>([]);
//   const [page, setPage] = useState(0);
//   const [total, setTotal] = useState(0);
//   const pageSize = 10;
//   const { customerId } = useParams();
//   const navigate = useNavigate();
//   const getData = async () => {
//     const orderData = await postRequest(
//       `/customer/orders/${customerId}?pageIndex=${page}&pageSize=${pageSize}`,
//       ``
//     );

//     const lookupObj = [orderData];
//     let data1: Array<any> = [];
//     return Promise.allSettled(lookupObj)
//       .then((result) => {
//         result.forEach((res: any) => {
//           data1.push(res.value);
//         });
//         return data1;
//       })
//       .then((d) => {
//         const dataobj = {
//           orderData: d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
//         };
//         setRowData(dataobj?.orderData);
//         setTotal(dataobj?.orderData?.totalCount);
//       });
//   };

//   useEffect(() => {
//     async function fetchData() {
//       await getData();
//     }
//     fetchData();
//   }, [page]); // Fetch data when page changes
//   const columns = [
//     { field: "orderDate", headerName: "Order Date", width: 150 },
//     { field: "orderNo", headerName: "Order No", width: 250 },
//     { field: "customerInfo", headerName: "Customer Info", width: 200 },
//     { field: "companyName", headerName: "Agent Company", width: 200 },
//     { field: "noOfItems", headerName: "No Of Items", width: 150 },
//     { field: "orderMode", headerName: "Booked Via", width: 150 },
//     { field: "isHomePickup", headerName: "PickUp Request", width: 150 },
//     { field: "isHomeDelivery", headerName: "Delivery Request", width: 150 },
//     { field: "paymentStatus", headerName: "Payment Status", width: 150 },
//     {
//       field: "orderStatus",
//       headerName: "Order Status",
//       width: 150,
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       renderCell: (params: any) => (
//         <Link to={`/customer/orderStatus/${params.row.id}`}>
//           <span className="badge badge-primary fs-8 fw-bold">
//             {params.value}
//           </span>
//         </Link>
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 130,
//       headerClassName: "sticky-header",
//       renderCell: (params: any) => (
//         <div className="action-dropdown">
//           <select
//             className="form-select"
//             onChange={(e) => {
//               const selectedValue = e.target.value;
//               if (selectedValue === "statusUpdate") {
//                 navigate(`/customer/orderStatusUpdate/${params.row.id}`);
//               } else if (selectedValue === "paymentUpdate") {
//                 navigate(
//                   `/updatePayment/${params.row.id}/${params.row.companyId?._id}`
//                 );
//               }
//               e.target.value = "";
//             }}
//             defaultValue=""
//           >
//             <option value="" disabled>
//               ...
//             </option>
//             <option value="statusUpdate">Status Update</option>
//             <option value="paymentUpdate">Payment Update</option>
//           </select>
//         </div>
//       ),
//     },
//   ];
//   return (
//     <>
//       <PageTitle>ORDERS</PageTitle>

//       <div className="row g-5 g-xl-8">
//         <div className={`card `}>
//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title align-items-start flex-column">
//               <span className="card-label fw-bold fs-3 mb-1">Orders List</span>
//             </h3>
//           </div>
//           <div className="card-body py-3">
//             <DataGrid
//               rows={rowData}
//               columns={columns}
//               pagination
//               hideFooter={true}
//               rowCount={total}
//               getRowId={(row: any) => row.id}
//               sx={{
//                 "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus":
//                   {
//                     outline: "none",
//                     border: "none", // Removes any border
//                     backgroundColor: "transparent", // Ensure no background color change on focus
//                   },
//                 "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible":
//                   {
//                     outline: "none",
//                     border: "none", // Removes any border
//                     backgroundColor: "transparent", // Ensure no background color change on focus
//                   },

//                 "& .MuiDataGrid-cell:active": {
//                   outline: "none", // Remove outline on active state
//                   border: "none", // Remove border on active state
//                 },
//               }}
//             />
//             <div className="table-responsive">
//               <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//                 <thead>
//                   <tr className="fw-bold text-muted">
//                     <th className="min-w-100px">Order Date</th>
//                     <th className="min-w-200px">Order No</th>
//                     <th className="min-w-150px">Customer Info</th>
//                     <th className="min-w-200px">Agent Company</th>
//                     <th className="min-w-150px">No Of Items</th>
//                     <th className="min-w-150px">Booked Via</th>
//                     <th className="min-w-150px">PickUp Request</th>
//                     <th className="min-w-150px">Delivery Request</th>
//                     <th className="min-w-150px">Payment Status</th>
//                     <th className="min-w-100px">Order Status</th>
//                     <th className="min-w-100px">Order Details</th>
//                     <th className="min-w-100px">Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rowData?.length > 0 ? (
//                     rowData.map((result: any) => (
//                       <tr key={result?._id}>
//                         <td>{stringToDate(result?.orderDate)}</td>
//                         <td>{result?.orderNo}</td>
//                         <td>
//                           {result?.customerId?.firstName}{" "}
//                           {result?.customerId?.lastName}
//                         </td>
//                         <td>{result?.companyId?.companyName}</td>
//                         <td>{result?.itemList?.length}</td>
//                         <td>{result?.orderMode}</td>
//                         <td>{result?.isHomePickup ? "YES" : "NO"}</td>
//                         <td>{result?.isHomeDelivery ? "YES" : "NO"}</td>
//                         <td>{result?.paymentStatus}</td>
//                         <td>
//                           <Link to={`/customer/orderStatus/${result?._id}`}>
//                             <span className="badge badge-primary fs-8 fw-bold">
//                               {result?.orderStatus}
//                             </span>
//                           </Link>
//                         </td>
//                         <td>
//                           {" "}
//                           <Link to={`/customer/order/${result?._id}`}>
//                             View
//                           </Link>
//                         </td>
//                         <td>
//                           <div className="dropdown">
//                             <button className="dropbtn btn btn-icon btn-bg-light btn-active-color-primary btn-sm">
//                               {" "}
//                               <KTIcon iconName={"menu"} className="fs-1" />
//                             </button>
//                             <div className="dropdown-content">
//                               <div>
//                                 <Link
//                                   to={`/customer/orderStatusUpdate/${result?._id}`}
//                                 >
//                                   Status Update
//                                 </Link>
//                               </div>
//                               <div>
//                                 <Link
//                                   to={`/updatePayment/${result?._id}/${result?.companyId?._id}`}
//                                 >
//                                   Payment Update
//                                 </Link>
//                               </div>
//                             </div>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={11}>No Orders Found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//               {total > pageSize && (
//                 <div className="pagewrapper">
//                   <ReactPaginate
//                     containerClassName={"pagination"}
//                     pageClassName={"page-item"}
//                     activeClassName={"active"}
//                     onPageChange={(event) => setPage(event.selected)}
//                     pageCount={Math.ceil(total / pageSize)}
//                     breakLabel="..."
//                     previousLabel={
//                       <IconContext.Provider
//                         value={{ color: "#B8C1CC", size: "36px" }}
//                       >
//                         <AiFillLeftCircle />
//                       </IconContext.Provider>
//                     }
//                     nextLabel={
//                       <IconContext.Provider
//                         value={{ color: "#B8C1CC", size: "36px" }}
//                       >
//                         <AiFillRightCircle />
//                       </IconContext.Provider>
//                     }
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomerOrders;
import React, { FC, useCallback, useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
// import { KTIcon } from "../../../_metronic/helpers";
import { PageTitle } from "../../../_metronic/layout/core";
import { postRequest } from "../../modules/auth/core/_requests";
import { stringToDate } from "../../../common/Date";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import { DataGrid } from "@mui/x-data-grid";
import "../../../../src/_metronic/assets/sass/components/AgentList.scss";
import ReactPaginate from "react-paginate";
import {
  Offcanvas,
  Form,
  Dropdown,
  // Container,

  // DropdownButton,
} from "react-bootstrap"
import { Agent } from "http";
interface Payload {
  startDate?: string;
  endDate?: string;
  companyId?: string | string[];
  customerId?: string | string[];
  orderNo?: string;
  bookedOn?: string;
  paymentMethod?: string;
  agentId?: string | string[];
  // orderId?: string;
  orderMode?: string | string[];
  orderStatus?: string | string[];
  paymentStatus?: string | string[];
  orderType?: string | string[];
  type?: string[];
  logistics?: boolean; // boolean for true (ML) or false (OWN)
}
interface Order {
  _id: string;
  orderDate: string;
  orderNo: string;
  customerId: {
    firstName: string;
    lastName: string;
  };
  companyId: {
    companyName: string;
  };
  itemList: any[]; // Adjust the type according to your item structure
  orderMode: string;
  isHomePickup: boolean;
  isHomeDelivery: boolean;
  paymentStatus: string;
  orderStatus: string;
}

interface OrderRow {
  id: string;
  orderDate: Date; // Adjust to the correct type
  orderNo: string;
  customerInfo: string;
  companyName: string;
  noOfItems: number;
  orderMode: string;
  isHomePickup: string;
  isHomeDelivery: string;
  paymentStatus: string;
  orderStatus: string;
}

const CustomerOrders: FC = () => {
  const [rowData, setRowData] = useState<OrderRow[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const pageSize = 10;
  const { customerId } = useParams();
  const navigate = useNavigate();
  // const [isSelectAllCustomers, setIsSelectAllCustomers] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
  // const [customerData, setCustomerData] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedPaymentStatuses, setSelectedPaymentStatuses] = useState<
    string[]
  >([]);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [orderNo, setOrderNo] = useState("");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    companyId: "",
    customerId: "",
    orderNo: "",
    orderMode: "",
    agentId: "",
    orderStatus: "",
    bookedOn: "",
    type: "",
    bookingStatus: "",
    paymentStatus: "",
    paymentMethod: "",
    logistics: "",
    agentName: "",
  });

  const orderModeOptions = ["POS", "Online"];
  const [isSelectAllOrderType, setIsSelectAllOrderType] = useState(false);
  const [isSelectAllPayment, setIsSelectAllPayment] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);
  const token = localStorage.getItem("token");
  const [agentNames, setAgentNames] = useState<Agent[]>([]);
  const [selectedOrderTypes, setSelectedOrderTypes] = useState<string[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const [selectAllCustomers, setSelectAllCustomers] = useState(false);
  const orderStatusOptions = [
    "Booked",
    "Pick Up",
    "Received",
    "In Progress",
    "Ready",
    "Out for Delivery",
    "Delivered",
    "Completed",
  ];
  const paymentStatusOptions = ["Pending", "Partially Received", "Received"];
  const orderTypeOptions = ["normal", "urgent"];

  const getData = useCallback(async () => {
    setLoading(true);
    const payload: Payload = {};

    if (orderNo) payload.orderNo = orderNo;

    const filterCustomerId = filters?.customerId;
    if (filterCustomerId) {
      payload.customerId = Array.isArray(filterCustomerId)
        ? filterCustomerId
        : [filterCustomerId];
    } else if (selectedCustomers.length > 0) {
      payload.customerId = selectedCustomers;
    }

    if (selectedAgents.length > 0) {
      payload.companyId = selectedAgents;
    }

    if (selectedModes.length > 0) {
      payload.orderMode = selectedModes;
    }

    if (selectedStatuses.length > 0) {
      payload.orderStatus = selectedStatuses;
    }

    if (selectedPaymentStatuses.length > 0) {
      payload.paymentStatus = selectedPaymentStatuses;
    }



    try {
      const orderData = await postRequest(
        `/customer/orders/${customerId}?pageIndex=${page}&pageSize=${pageSize}`,
        payload
      );

      if (orderData?.data?.status === "ok") {
        const orderRows = orderData.data.data.map((order: Order) => ({
          id: order._id,
          orderDate: stringToDate(order.orderDate),
          orderNo: order.orderNo,
          customerInfo: `${order.customerId.firstName} ${order.customerId.lastName}`,
          companyName: order.companyId.companyName,
          noOfItems: order.itemList.length,
          orderMode: order.orderMode,
          isHomePickup: order.isHomePickup ? "YES" : "NO",
          isHomeDelivery: order.isHomeDelivery ? "YES" : "NO",
          paymentStatus: order.paymentStatus,
          orderStatus: order.orderStatus,
        }));
        setRowData(orderRows);
        setTotal(orderData.data.totalCount);
        setTotalPages(Math.ceil(orderData.data.totalCount / pageSize));
      } else {
        setRowData([]);
        setTotal(0);
        setTotalPages(1);
      }
    } catch (e) {
      console.error("Error fetching orders:", e);
      setRowData([]);
      setTotal(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  }, [orderNo, filters?.customerId, selectedCustomers, selectedAgents, selectedModes, selectedStatuses, selectedPaymentStatuses, customerId, page]);

  useEffect(() => {
    getData();
  }, [getData, page]);

  const handlePageClick = (event: { selected: number }) => {
    setPage(event.selected);
  };
  const columns = [
    { field: "orderDate", headerName: "Order Date", width: 150 },
    { field: "orderNo", headerName: "Order No", width: 250 },
    { field: "customerInfo", headerName: "Customer Info", width: 200 },
    { field: "companyName", headerName: "Agent Company", width: 200 },
    { field: "noOfItems", headerName: "No Of Items", width: 150 },
    { field: "orderMode", headerName: "Booked Via", width: 150 },
    { field: "isHomePickup", headerName: "PickUp Request", width: 150 },
    { field: "isHomeDelivery", headerName: "Delivery Request", width: 150 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params: any) => (
        <Link to={`/customer/orderPaymentStatus/${params.row.id}`}>
          <span className="badge badge-primary fs-8 fw-bold">
            {params.row.paymentStatus}
          </span>
        </Link>
      ),
    },
    {
      field: "orderStatus",
      headerName: "Order Status",
      width: 150,
      renderCell: (params: any) => (
        <Link to={`/customer/orderStatus/${params.row.id}`}>
          <span className="badge badge-primary fs-8 fw-bold">
            {params.value}
          </span>
        </Link>
      ),
    },
    {
      field: "OrderDetails",
      headerName: "Order Details",
      width: 150,
      renderCell: (params: any) => (
        <Link to={`/customer/order/${params.row.id}`}>View</Link>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue === "statusUpdate") {
                navigate(`/customer/orderStatusUpdate/${params.row.id}`);
              } else if (selectedValue === "paymentUpdate") {
                navigate(
                  `/updatePayment/${params.row.id}/${params.row.companyId?._id}`
                );
              }
              e.target.value = "";
            }}
            defaultValue=""
          >
            <option value="" disabled>
              ...
            </option>
            <option value="statusUpdate">Status Update</option>
            <option value="paymentUpdate">Payment Update</option>
          </select>
        </div>
      ),
    },
  ];

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedStatuses([]);
    } else {
      setSelectedStatuses([...orderStatusOptions]);
    }
    setIsSelectAll(!isSelectAll);
   
  };

  const handleStatusChange = (status: any) => {
    if (selectedStatuses.includes(status)) {
      setSelectedStatuses(selectedStatuses.filter((item) => item !== status));
      setIsSelectAll(false);
    } else {
      const newSelection = [...selectedStatuses, status];
      setSelectedStatuses(newSelection);

      // Check if all options are selected
      if (newSelection.length === orderStatusOptions.length) {
        setIsSelectAll(true);
      }
    }
  };
  const handlePaymentStatusChange = (status: string) => {
    if (selectedPaymentStatuses.includes(status)) {
      const updatedStatuses = selectedPaymentStatuses.filter(
        (item) => item !== status
      );
      setSelectedPaymentStatuses(updatedStatuses);
      setIsSelectAllPayment(
        updatedStatuses.length === paymentStatusOptions.length
      );
    } else {
      const newSelection = [...selectedPaymentStatuses, status];
      setSelectedPaymentStatuses(newSelection);
      setIsSelectAllPayment(
        newSelection.length === paymentStatusOptions.length
      );
    }
  };
  const handleSelectAllPayment = () => {
    if (isSelectAllPayment) {
      setSelectedPaymentStatuses([]);
    } else {
      setSelectedPaymentStatuses([...paymentStatusOptions]);
    }
    setIsSelectAllPayment(!isSelectAllPayment);
  };
  const handleSelectAllOrderType = () => {
    if (isSelectAllOrderType) {
      setSelectedOrderTypes([]); // Deselect all
    } else {
      setSelectedOrderTypes([...orderTypeOptions]); // Select all
    }
    setIsSelectAllOrderType(!isSelectAllOrderType);
  };
  const handleAgentSelect = (agentId: string) => {
    console.log("Agent ID selected/deselected:", agentId);
    console.log("Selected agents before:", selectedAgents);

    if (selectedAgents.includes(agentId)) {
      // Deselect agent
      const updatedAgents = selectedAgents.filter((id) => id !== agentId);
      setSelectedAgents(updatedAgents);
      console.log("Agent deselected. Updated selected agents:", updatedAgents);
    } else {
      // Select agent
      const updatedAgents = [...selectedAgents, agentId];
      setSelectedAgents(updatedAgents);
      console.log("Agent selected. Updated selected agents:", updatedAgents);
    }
  };
  const toggleOffcanvas = (open: boolean) => () => {
    setIsOffcanvasOpen(open);
  };
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "https://adminapi.flexiclean.me/api/v1/customer/dropdown",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        if (data.status === "ok") {
          setCustomers(data.data);
        } else {
          console.error("Failed to fetch data");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCustomers();
  }, [token]);

  const handleSave = () => {
    getData();
    toggleOffcanvas(false)();
  };
  
  const handleModeChange = (mode: string) => {
    if (selectedModes.includes(mode)) {
      setSelectedModes(selectedModes.filter((item) => item !== mode));
    } else {
      setSelectedModes([...selectedModes, mode]);
    }
  };
  const handleSelectAllOrder = () => {
    if (isSelectAll) {
      setSelectedModes([]);
    } else {
      setSelectedModes(orderModeOptions);
    }
    setIsSelectAll(!isSelectAll);
  };
  const handleCheckboxChange = (id: any) => {
    setSelectedCustomers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((customerId) => customerId !== id)
        : [...prevSelected, id]
    );
  };

  const handleSelectAllCustomers = () => {
    setSelectAllCustomers((prevSelectAll) => {
      if (!prevSelectAll) {
        // Select all customer IDs
        setSelectedCustomers(customers.map((customer) => customer._id));
      } else {
        // Deselect all
        setSelectedCustomers([]);
      }
      return !prevSelectAll;
    });
  };
  const handleOrderTypeChange = (type: string) => {
    if (selectedOrderTypes.includes(type)) {
      const updatedTypes = selectedOrderTypes.filter((item) => item !== type);
      setSelectedOrderTypes(updatedTypes);
      setIsSelectAllOrderType(updatedTypes.length === orderTypeOptions.length);
    } else {
      const newSelection = [...selectedOrderTypes, type];
      setSelectedOrderTypes(newSelection);
      setIsSelectAllOrderType(newSelection.length === orderTypeOptions.length);
    }
  };
  return (
    <>
      <PageTitle>ORDERS</PageTitle>
      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column mb-5">
              <span className="card-label fw-bold fs-3 mb-1">Orders</span>
            </h3>
            <div className="d-flex justify-content-end m-2">
              <button
                className="custom-btn-verify-pending"
                style={{ background: "#1e4894" }}
                onClick={toggleOffcanvas(true)}
              >
                Filter
              </button>
            </div>
          </div>
          <div>
            <Offcanvas
              show={isOffcanvasOpen}
              onHide={toggleOffcanvas(false)}
              placement="end"
              className="custom-offcanvas"
              style={{ width: "500px" }}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Filter</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Form>
                  <div className="d-flex justify-content-between">
                    {/* Start Date */}
                    {/* <Form.Group className="mb-4">
                                <Form.Label className="custom-label">
                                  Booked start Date
                                </Form.Label>
                                <Form.Control
                                  type="date"
                                  value={filters.startDate}
                                  onChange={(e) =>
                                    setFilters({ ...filters, startDate: e.target.value })
                                  }
                                />
                              </Form.Group>
           */}
                    {/* End Date */}
                    {/* <Form.Group className="mb-4">
                                <Form.Label className="custom-label">
                                  Booked End Date
                                </Form.Label>
                                <Form.Control
                                  type="date"
                                  value={filters.endDate}
                                  onChange={(e) =>
                                    setFilters({ ...filters, endDate: e.target.value })
                                  }
                                />
                              </Form.Group> */}
                  </div>


                  <Form.Group controlId="formName">
                    <Form.Label>Order ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Order Id"
                      value={orderNo}
                      onChange={(e) => setOrderNo(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label
                      className="custom-label"
                      style={{ fontWeight: "bold", color: "#333" }}
                    >
                      Order Mode
                    </Form.Label>
                    <Dropdown
                      className="w-100"
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <Dropdown.Toggle
                        variant="secondary"
                        className="w-100"
                        style={{
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ced4da",
                          color: "#495057",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "auto" }}>
                          {selectedModes.length > 0
                            ? "Select All"
                            : "Select Order Mode"}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="w-100"
                        style={{
                          maxHeight: "200px",
                          overflowY: "auto",
                          borderRadius: "0.25rem",
                          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Form.Group className="px-3">
                          {/* Select All Checkbox */}
                          <Form.Check
                            type="checkbox"
                            label="Select All"
                            checked={isSelectAll}
                            onChange={handleSelectAllOrder}
                            style={{ marginBottom: "0.5rem" }}
                          />
                        </Form.Group>

                        <Dropdown.Divider style={{ margin: "0.5rem 0" }} />

                        {/* Order Mode Checkboxes */}
                        {orderModeOptions.map((mode) => (
                          <Form.Group
                            key={mode}
                            className="px-3"
                            style={{ marginBottom: "0.5rem" }}
                          >
                            <Form.Check
                              type="checkbox"
                              label={mode}
                              checked={selectedModes.includes(mode)}
                              onChange={() => handleModeChange(mode)}
                            />
                          </Form.Group>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label
                      className="custom-label"
                      style={{ fontWeight: "bold", color: "#333" }}
                    >
                      Order Status
                    </Form.Label>
                    <Dropdown
                      className="w-100"
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <Dropdown.Toggle
                        variant="secondary"
                        className="w-100"
                        style={{
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ced4da",
                          color: "#495057",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "auto" }}>
                          {selectedStatuses.length > 0
                            ? "Select All"
                            : "Select Order Status"}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="w-100"
                        style={{
                          maxHeight: "200px",
                          overflowY: "auto",
                          borderRadius: "0.25rem",
                          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Form.Group className="px-3">
                          {/* Select All Checkbox */}
                          <Form.Check
                            type="checkbox"
                            label="Select All"
                            checked={isSelectAll}
                            onChange={handleSelectAll}
                            style={{ marginBottom: "0.5rem" }}
                          />
                        </Form.Group>

                        <Dropdown.Divider style={{ margin: "0.5rem 0" }} />

                        {/* Order Status Checkboxes */}
                        {orderStatusOptions.map((status) => (
                          <Form.Group
                            key={status}
                            className="px-3"
                            style={{ marginBottom: "0.5rem" }}
                          >
                            <Form.Check
                              type="checkbox"
                              label={status}
                              checked={selectedStatuses.includes(status)}
                              onChange={() => handleStatusChange(status)}
                            />
                          </Form.Group>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  <Form.Group className="mb-4">
                    <Form.Label className="custom-label">Customer</Form.Label>
                    <Dropdown
                      className="w-100"
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <Dropdown.Toggle
                        variant="secondary"
                        className="w-100"
                        style={{
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ced4da",
                          color: "#495057",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "auto" }}>
                          {selectedCustomers.length > 0
                            ? "Select All"
                            : "Select Customer"}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="w-100"
                        style={{
                          maxHeight: "200px",
                          overflowY: "auto",
                          borderRadius: "0.25rem",
                          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Form.Group className="px-3">
                          <Form.Check
                            type="checkbox"
                            label="Select All"
                            checked={selectAllCustomers}
                            onChange={handleSelectAllCustomers}
                            style={{ marginBottom: "0.5rem" }}
                          />
                        </Form.Group>

                        <Dropdown.Divider style={{ margin: "0.5rem 0" }} />

                        {customers.map((customer) => (
                          <Form.Group
                            key={customer._id}
                            className="px-3"
                            style={{ marginBottom: "0.5rem" }}
                          >
                            <Form.Check
                              type="checkbox"
                              label={`${customer.firstName} ${customer.lastName} (${customer.customerType})`}
                              checked={selectedCustomers.includes(customer._id)}
                              onChange={() =>
                                handleCheckboxChange(customer._id)
                              }
                            />
                          </Form.Group>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label
                      className="custom-label"
                      style={{ fontWeight: "bold", color: "#333" }}
                    >
                      Payment Status
                    </Form.Label>
                    <Dropdown
                      className="w-100"
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <Dropdown.Toggle
                        variant="secondary"
                        className="w-100"
                        style={{
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ced4da",
                          color: "#495057",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "auto" }}>
                          {selectedPaymentStatuses.length > 0
                            ? "Select All"
                            : "Select Payment Status"}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="w-100"
                        style={{
                          maxHeight: "200px",
                          overflowY: "auto",
                          borderRadius: "0.25rem",
                          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Form.Group className="px-3">
                          <Form.Check
                            type="checkbox"
                            label="Select All"
                            checked={isSelectAllPayment}
                            onChange={handleSelectAllPayment}
                            style={{ marginBottom: "0.5rem" }}
                          />
                        </Form.Group>

                        <Dropdown.Divider style={{ margin: "0.5rem 0" }} />

                        {paymentStatusOptions.map((status) => (
                          <Form.Group
                            key={status}
                            className="px-3"
                            style={{ marginBottom: "0.5rem" }}
                          >
                            <Form.Check
                              type="checkbox"
                              label={status}
                              checked={selectedPaymentStatuses.includes(status)}
                              onChange={() => handlePaymentStatusChange(status)}
                            />
                          </Form.Group>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>
                  {/* Order Type Dropdown */}
                  <Form.Group className="mb-4">
                    <Form.Label
                      className="custom-label"
                      style={{ fontWeight: "bold", color: "#333" }}
                    >
                      Order Type
                    </Form.Label>
                    <Dropdown
                      className="w-100"
                      style={{
                        border: "1px solid #ced4da",
                        borderRadius: "0.25rem",
                      }}
                    >
                      <Dropdown.Toggle
                        variant="secondary"
                        className="w-100"
                        style={{
                          backgroundColor: "#f8f9fa",
                          border: "1px solid #ced4da",
                          color: "#495057",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <span style={{ marginRight: "auto" }}>
                          {selectedOrderTypes.length > 0
                            ? "Select All"
                            : "Select Order Type"}
                        </span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu
                        className="w-100"
                        style={{
                          maxHeight: "200px",
                          overflowY: "auto",
                          borderRadius: "0.25rem",
                          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                        }}
                      >
                        <Form.Group className="px-3">
                          <Form.Check
                            type="checkbox"
                            label="Select All"
                            checked={isSelectAllOrderType}
                            onChange={handleSelectAllOrderType}
                            style={{ marginBottom: "0.5rem" }}
                          />
                        </Form.Group>

                        <Dropdown.Divider style={{ margin: "0.5rem 0" }} />

                        {orderTypeOptions.map((type) => (
                          <Form.Group
                            key={type}
                            className="px-3"
                            style={{ marginBottom: "0.5rem" }}
                          >
                            <Form.Check
                              type="checkbox"
                              label={type}
                              checked={selectedOrderTypes.includes(type)}
                              onChange={() => handleOrderTypeChange(type)}
                            />
                          </Form.Group>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>



                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={handleSave}
                    >
                      Apply
                    </button>
                  </div>
                </Form>
              </Offcanvas.Body>
            </Offcanvas>
          </div>

          <div className="card-body">
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
              <div>
                <DataGrid
                  rows={rowData}
                  columns={columns}
                  pagination
                  hideFooter={true}
                  rowCount={total}
                  getRowId={(row) => row.id}
                  autoHeight={true}
                  sx={{
                    "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus":
                    {
                      outline: "none",
                      border: "none",
                      backgroundColor: "transparent",
                    },
                    "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible":
                    {
                      outline: "none",
                      border: "none",
                      backgroundColor: "transparent",
                    },

                    "& .MuiDataGrid-cell:active": {
                      outline: "none",
                      border: "none",
                    },
                  }}
                />
              </div>
            )}
            <div className=" w-full d-flex justify-content-end my-6">
              <ReactPaginate
                previousLabel={"←"}
                nextLabel={"→"}
                breakLabel={"..."}
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerOrders;
