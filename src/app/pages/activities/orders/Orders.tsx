import React, { FC, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, } from "react-router-dom";
import ReactPaginate from "react-paginate";
// import { IconContext } from "react-icons";
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
// import { KTIcon } from "../../../../_metronic/helpers";
import { PageTitle } from "../../../../_metronic/layout/core";
import { postRequest } from "../../../modules/auth/core/_requests";
import { stringToDate } from "../../../../common/Date";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import {
  Offcanvas,
  Form,
  Dropdown,
  // Container,
  Row,
  Col,
  Button,
  // DropdownButton,
} from "react-bootstrap";
interface Payload {
  startDate?: string;
  endDate?: string;
  companyId?: string | string[];
  customerId?: string | string[];
  orderNo?: string;
  bookedOn?: string;
  paymentMethod?: string;
  agentId?: string | string[];
  orderId?: string;
  orderMode?: string | string[];
  orderStatus?: string | string[];
  paymentStatus?: string | string[];
  orderType?: string | string[];
  type?: string[];
  logistics?: boolean; // boolean for true (ML) or false (OWN)
}

interface Agent {
  _id: string;
  companyName: string;
}
// interface AgentDropdownProps {
//   token: string;
// }

const Orders: FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
  const [customerData, setCustomerData] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [orderId, setOrderId] = useState("");
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  // const [orderMode, setOrderMode] = useState("");
  // const [orderStatus, setOrderStatus] = useState<string[]>([]);
  // const [paymentStatus, setPaymentStatus] = useState("");
  // const [orderType, setOrderType] = useState("");
  // const [pageIndex, setPageIndex] = useState(0);
  const [selectAllCustomers, setSelectAllCustomers] = useState(false);
  const [typeCheckboxes, setTypeCheckboxes] = useState({
    Both: false,
    POS: false,
    ONLINE: false,
  });
  const token = localStorage.getItem("token");
  const [logisticsCheckboxes, setLogisticsCheckboxes] = useState({
    Both: false,
    ML: false,
    OWN: false,
  });
  const [selectedPaymentStatuses, setSelectedPaymentStatuses] = useState<
    string[]
  >([]);
  const [selectedOrderTypes, setSelectedOrderTypes] = useState<string[]>([]);
  const [isSelectAllOrderType, setIsSelectAllOrderType] = useState(false);
  const pageSize = 10;

  const [agentNames, setAgentNames] = useState<Agent[]>([]);
  const [selectedAgents, setSelectedAgents] = useState<string[]>([]);
  const navigate = useNavigate();
  const [isSelectAll, setIsSelectAll] = useState(false);
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
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [isSelectAllPayment, setIsSelectAllPayment] = useState(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [isSelectAllCustomers, setIsSelectAllCustomers] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderstatus = queryParams.get('orderstatus') || '';
  const orderstatusArray = orderstatus ? [orderstatus] : [];
 

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

  const getData = async (pageIndex = 0) => {
    setLoading(true);
    console.log("Fetching data...");

    try {
      const payload: Payload = {};

        // Destructure filters for basic filtering criteria
      const {
        startDate,
        endDate,
        companyId,
        customerId,
        orderNo,
        bookedOn,
        paymentMethod,
      } = filters;

      // Add orderNo from the form input to the payload
      if (orderId) payload.orderNo = orderId;

      // Other filtering conditions for the payload
      if (companyId)
        payload.companyId = Array.isArray(companyId) ? companyId : [companyId];
      if (customerId)
        payload.customerId = Array.isArray(customerId) ? customerId : [customerId];
      if (bookedOn) payload.bookedOn = bookedOn;
      if (paymentMethod) payload.paymentMethod = paymentMethod;

      if (selectedOrderTypes.length > 0) {
        payload.orderType = selectedOrderTypes;
      }
      if (selectedAgents.length > 0) {
        payload.companyId = selectedAgents;
      }
      if (selectedCustomers.length > 0) {
        payload.customerId = selectedCustomers;
      }
      if (selectedModes.length > 0) {
        payload.orderMode = selectedModes;
      }
      // if (selectedStatuses.length > 0) {
      //   payload.orderStatus = selectedStatuses;
      // }
      if (selectedStatuses.length > 0) {
        payload.orderStatus = selectedStatuses;
      } else if (orderstatusArray.length > 0) {
        payload.orderStatus = orderstatusArray;
      }


      if (selectedPaymentStatuses.length > 0) {
        payload.paymentStatus = selectedPaymentStatuses;
      }

      if (logisticsCheckboxes.ML && !logisticsCheckboxes.OWN) {
        payload.logistics = true;
      } else if (!logisticsCheckboxes.ML && logisticsCheckboxes.OWN) {
        payload.logistics = false;
      } else {
        delete payload.logistics;
      }

      const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => {
          return (
            value !== undefined &&
            value !== null &&
            !(Array.isArray(value) && value.length === 0) &&
            !(typeof value === "string" && value.trim() === "")
          );
        })
      );

      const apiUrl = `/order/list?pageIndex=${pageIndex}&pageSize=${pageSize || 10}${startDate ? `&startDate=${startDate}` : ""
        }${endDate ? `&endDate=${endDate}` : ""}`;

      const orderData = await postRequest(apiUrl, cleanedPayload);
      const dataobj = {
        orderData: orderData?.data?.status === "ok" ? orderData.data.data : [],
        orderCount:
          orderData?.data?.status === "ok" ? orderData.data.totalCount : 0,
      };

      setRowData(dataobj.orderData);
      setTotal(dataobj.orderCount);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    getData();
  }, [page]);


  const columns: GridColDef[] = [
    {
      field: "orderDate",
      headerName: "Order Date",
      width: 150,
      renderCell: (params: any) =>
        params.row.orderDate ? stringToDate(params.row.orderDate) : "",
    },
    { field: "orderNo", headerName: "Order No", width: 250 },
    {
      field: "customerInfo",
      headerName: "Customer Info",
      width: 200,
      renderCell: (params: any) =>
        `${params.row.customerId?.firstName || ""} ${params.row.customerId?.lastName || ""
        }`,
    },
    {
      field: "companyName",
      headerName: "Agent Company",
      width: 200,
      renderCell: (params: any) => params.row.companyId?.companyName,
    },
    {
      field: "noOfItems",
      headerName: "No Of Items",
      width: 150,
      renderCell: (params: any) => params.row.itemList?.length,
    },
    { field: "orderMode", headerName: "Booked Via", width: 150 },
    {
      field: "logistics",
      headerName: "M-logistics",
      width: 150,
      renderCell: (params: any) =>
        params.row.companyId?.agentId?.logistics ? "YES" : "NO",
    },
    {
      field: "homePickup",
      headerName: "PickUp Request",
      width: 150,
      renderCell: (params: any) => {
        const { orderMode, isHomePickup } = params.row; // Destructure values from params.row

        if (isHomePickup) {
          // If home pickup is requested
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
                alt="Pickup Yes"
                style={{
                  width: "40px",
                  filter:
                    orderMode === "POS"
                      ? "invert(27%) sepia(64%) saturate(5000%) hue-rotate(185deg) brightness(95%) contrast(90%)"
                      : "invert(39%) sepia(92%) saturate(7500%) hue-rotate(63deg) brightness(95%) contrast(101%)",
                }}
              />
              {orderMode === "Online" && (
                <span
                  style={{
                    backgroundColor: "yellow",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginLeft: "5px",
                  }}
                >
                  F
                </span>
              )}
            </div>
          );
        }

        return "NO"; // Default case for no home pickup
      },
    },

    {
      field: "homeDelivery",
      headerName: "Delivery Request",
      width: 150,
      renderCell: (params: any) => {
        const { orderMode, isHomeDelivery } = params.row;

        if (isHomeDelivery) {
          return (
            <div style={{ display: "flex", alignItems: "center" }}>
              <img
                src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
                alt="Delivery Yes"
                style={{
                  width: "40px",
                  filter:
                    orderMode === "POS"
                      ? "invert(27%) sepia(64%) saturate(5000%) hue-rotate(185deg) brightness(95%) contrast(90%)"
                      : "invert(39%) sepia(92%) saturate(7500%) hue-rotate(63deg) brightness(95%) contrast(101%)",
                }}
              />
              {orderMode === "Online" && (
                <span
                  style={{
                    backgroundColor: "yellow",
                    borderRadius: "50%",
                    width: "30px",
                    height: "30px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontWeight: "bold",
                    fontSize: "18px",
                    marginLeft: "5px",
                  }}
                >
                  F
                </span>
              )}
            </div>
          );
        }

        return "NO"; // Default case for no home delivery
      },
    },

    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params: any) => (
        <Link to={`/customer/orderPaymentStatus/${params.row._id}`}>
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
        <Link to={`/customer/orderStatus/${params.row._id}`}>
          <span className="badge badge-primary fs-8 fw-bold">
            {params.row.orderStatus}
          </span>
        </Link>
      ),
    },
    {
      field: "OrderDetails",
      headerName: "Order Details",
      width: 150,
      renderCell: (params: any) => (
        <Link to={`/customer/order/${params.row._id}`}>View</Link>
      ),
    },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={(e) => {
              const value = e.target.value;
              if (value === "statusUpdate") {
                navigate(`/customer/orderStatusUpdate/${params.row._id}`);
              } else if (value === "paymentUpdate") {
                navigate(
                  `/updatePayment/${params.row._id}/${params.row.companyId?._id}`
                );
              }
            }}
          >
            <option value="">...</option>
            <option value="statusUpdate">Status Update</option>
            <option value="paymentUpdate">Payment Update</option>
          </select>
        </div>
      ),
    },
  ];

  const toggleOffcanvas = (open: boolean) => () => {
    setIsOffcanvasOpen(open);
  };

  const handleSave = () => {
    getData();
    toggleOffcanvas(false)();
  };
  useEffect(() => {
    if (orderstatusArray) {

      console.log(orderstatusArray, "useeffect");

    }
  }, []);
  const handleTypeCheckboxChange = (event: any) => {
    const { name } = event.target;
    setTypeCheckboxes({
      Both: name === "Both",
      POS: name === "POS",
      ONLINE: name === "ONLINE",
    });
  };

  const handleModeChange = (mode: string) => {
    if (selectedModes.includes(mode)) {
      setSelectedModes(selectedModes.filter((item) => item !== mode));
    } else {
      setSelectedModes([...selectedModes, mode]);
    }
  };
  const handleLogisticsCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, checked } = event.target;

    setLogisticsCheckboxes((prevState) => ({
      ...prevState,
      [name]: checked, // Set the state based on the checkbox name and checked status
    }));
  };

  const handlePageChange = (selected: any) => {
    const newPageIndex = selected.selected; // get the selected page index
    getData(newPageIndex); // Call getData with the new page index
  };
  const handleSelectAllChange = () => {
    if (isSelectAll) {
      setIsSelectAll(false);
      setSelectedStatuses([]);
    } else {
      setIsSelectAll(true);
      setSelectedStatuses(orderStatusOptions);
    }
  };

  const handleSelectAll = () => {
    if (isSelectAll) {
      setSelectedStatuses([]);
    } else {
      setSelectedStatuses([...orderStatusOptions]);
    }
    setIsSelectAll(!isSelectAll);
    if (selectedAgents.length === agentNames.length) {
      setSelectedAgents([]); // Deselect all if already all selected
    } else {
      setSelectedAgents(agentNames.map((agent) => agent._id)); // Select all
    }
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

  const handleCustomerChange = (customerId: string) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
    setIsSelectAllCustomers(
      selectedCustomers.length === customerData.length - 1
    );
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

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await fetch(
          "https://adminapi.flexiclean.me/api/v1/agent/dropdown",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        if (data.status === "ok") {
          setAgentNames(data.data); // Assuming data.data is an array of agents
        }
      } catch (error) {
        console.error("Error fetching agents:", error);
      }
    };

    fetchAgents();
  }, [token]);
  const handleSelectAllAgents = () => {
    console.log("Selected agents before:", selectedAgents);
    console.log("Agent names:", agentNames);

    if (selectedAgents.length === agentNames.length) {
      // Deselect all if already selected
      setSelectedAgents([]);
      console.log("Deselected all agents, selectedAgents:", []);
    } else {
      // Select all agents
      const allAgentIds = agentNames.map((agent) => agent._id);
      setSelectedAgents(allAgentIds);
      console.log("Selected all agents, selectedAgents:", allAgentIds);
    }
  };

  return (
    <>
      <PageTitle>ORDERS</PageTitle>
      
      <div className="row g-5 g-xl-8">
        <div>
          <div className="d-flex justify-content-between">
            <div>
              <h3 className="card-title align-items-start flex-column mb-4">
                <span className="card-label fw-bold fs-3 mb-1">
                  Orders List
                </span>
              </h3>
            </div>
            <div>
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
                    <Form.Group className="mb-4">
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

                    {/* End Date */}
                    <Form.Group className="mb-4">
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
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-4">
                    <Form.Label className="custom-label">Agent Name</Form.Label>
                    <Dropdown className="w-100">
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
                          {selectedAgents.length > 0
                            ? "Agents Selected"
                            : "Select Agents"}
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
                        {/* Select All Checkbox */}
                        <Form.Group className="px-3">
                          <Form.Check
                            type="checkbox"
                            label="Select All"
                            checked={
                              selectedAgents.length === agentNames.length
                            }
                            onChange={handleSelectAllAgents}
                            style={{ marginBottom: "0.5rem" }}
                          />
                        </Form.Group>
                        <Dropdown.Divider style={{ margin: "0.5rem 0" }} />

                        {/* Agent Checkboxes */}
                        {agentNames.map((agent) => (
                          <Form.Group
                            key={agent._id}
                            className="px-3"
                            style={{ marginBottom: "0.5rem" }}
                          >
                            <Form.Check
                              type="checkbox"
                              label={agent.companyName}
                              checked={selectedAgents.includes(agent._id)}
                              onChange={() => handleAgentSelect(agent._id)}
                            />
                          </Form.Group>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </Form.Group>

                  <Form.Group controlId="formName">
                    <Form.Label>Order ID</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Order Id"
                      value={orderId}
                      onChange={(e) => setOrderId(e.target.value)}
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

                  <Form.Group
                    controlId="formLogisticsCheckboxes"
                    className="d-flex mb-5 mt-3 gap-4"
                  >
                    <Form.Label>Logistics</Form.Label>
                    <Form.Check
                      type="checkbox"
                      label="Both"
                      name="Both"
                      checked={logisticsCheckboxes.Both}
                      onChange={handleLogisticsCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="ML"
                      name="ML"
                      checked={logisticsCheckboxes.ML}
                      onChange={handleLogisticsCheckboxChange}
                    />
                    <Form.Check
                      type="checkbox"
                      label="OWN"
                      name="OWN"
                      checked={logisticsCheckboxes.OWN}
                      onChange={handleLogisticsCheckboxChange}
                    />
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

          <Row className="mt-5 px-4 gap-5">
            <Col className="d-flex align-items-center mb-3 gap-3 border-custom p-2">
              <Button
                variant="link"
                className="van-icon d-flex align-items-center"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
                  style={{
                    width: "30px",
                    filter:
                      "invert(18%) sepia(85%) saturate(6000%) hue-rotate(-10deg) brightness(80%) contrast(90%)",
                  }}
                  alt="Driver Not Assigned"
                />
              </Button>
              <h5 className="ml-2 extra-large-text">Driver Not Assigned</h5>
            </Col>
            <Col className="d-flex align-items-center mb-3 gap-3 border-custom pr-2">
              <Button
                variant="link"
                className="van-icon d-flex align-items-center"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
                  style={{
                    width: "30px",
                    filter:
                      "invert(27%) sepia(64%) saturate(5000%) hue-rotate(185deg) brightness(95%) contrast(90%)",
                  }}
                  alt="Driver Assigned"
                />
              </Button>
              <h5 className="ml-2 extra-large-text">Driver Assigned</h5>
            </Col>
            <Col className="d-flex align-items-center mb-3 gap-3 border-custom p-2">
              <Button
                variant="link"
                className="van-icon d-flex align-items-center"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/66/66841.png"
                  style={{
                    width: "30px",
                    filter:
                      "invert(39%) sepia(92%) saturate(7500%) hue-rotate(63deg) brightness(95%) contrast(101%)",
                  }}
                  alt="Driver Pick Up/Delivered"
                />
              </Button>
              <h5 className="ml-2 extra-large-text">
                Driver Pick Up/Delivered
              </h5>
            </Col>
            <Col className="d-flex align-items-center mb-3 gap-3 border-custom p-2">
              <h5 className="rounded border M-logistics">F</h5>
              <h5 className="ml-2 extra-large-text">M Logistics</h5>
            </Col>
          </Row>

          <div className="table-responsive">
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
              <div className="mt-5">
                <div>
                  <DataGrid
                    rows={rowData}
                    columns={columns}
                    autoHeight
                    getRowId={(row) => row._id}
                    hideFooter
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
              </div>
            )}

            {/* Pagination component */}
            {total > pageSize && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: "20px",
                  padding: "10px",
                  backgroundColor: "#f8f9fa",
                  borderRadius: "8px",
                  flexWrap: "wrap",
                }}
              >
                <ReactPaginate
                  onPageChange={handlePageChange}
                  pageCount={Math.ceil(total / pageSize)} // Total pages based on total count
                  breakLabel="..."
                  previousLabel="←"
                  nextLabel="→"
                  containerClassName="pagination"
                  pageClassName="page-item"
                  activeClassName="active"
                  previousClassName="previous"
                  nextClassName="next"
                  pageLinkClassName="page-link"
                  previousLinkClassName="previous-link"
                  nextLinkClassName="next-link"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Orders;
