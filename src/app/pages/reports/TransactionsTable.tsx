// import React, { useCallback, useEffect, useState } from "react";
// import axios from "axios";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { Typography, Box } from "@mui/material";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
// import { Form, Offcanvas } from "react-bootstrap";
// import Select from "react-select";

// interface Order {
//   _id: string;
//   customerName: string;
//   Orderno: string;
//   customerEmail: string;
//   customerMobile: string;
//   orderDate: string;
//   orderMode: string;
//   grossAmt: number;
//   companyId: {
//     _id: string;
//     companyName: string;
//     companyLogo: string;
//     agentId?: { name: string };
//   };
//   customerId?: {
//     _id: string;
//     firstName: string;
//     lastName: string;
//     email: string;
//     mobile: string;
//   };
//   netAmt: number;
//   payoutAmt: number;
//   discAmt: number;
//   commissionAmount: number;
//   currency: {
//     currencySymbol: string;
//     decimalPoints: number;
//   };
// }

// const TransactionsTable: React.FC = () => {
//   const [rows, setRows] = useState<Order[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [page, setPage] = useState(0);
//   const [pageSize, setPageSize] = useState(10);
//   const [rowCount, setRowCount] = useState(0);
//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);

//   const [companies, setCompanies] = useState<any[]>([]);
//   const [customers, setCustomers] = useState<any[]>([]);
//   const orderModeOptions = ["POS", "Online"];

//   const [filters, setFilters] = useState({
//     companyIds: [] as string[],
//     customerIds: [] as string[],
//     orderModes: "",
//     startDate: "",
//     endDate: "",
//   });

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const res = await fetch(`https://adminapi.flexiclean.me/api/v1/customer/dropdown`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await res.json();
//         if (result.status === 'ok') {
//           setCustomers(result.data);
//         }
//       } catch (err) {
//         console.error('Customer fetch error:', err);
//       }
//     };
//     fetchCustomers();
//   }, [token]);

//   useEffect(() => {
//     const fetchCompany = async () => {
//       try {
//         const res = await fetch(`https://adminapi.flexiclean.me/api/v1/agent/dropdown`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await res.json();
//         if (result.status === 'ok') {
//           setCompanies(result.data);
//         }
//       } catch (err) {
//         console.error('Company fetch error:', err);
//       }
//     };
//     fetchCompany();
//   }, [token]);

//   const getData = useCallback(async () => {
//     if (!token) {
//       setError("Missing token. Please log in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       setLoading(true);
//       const payload: any = {};
//       if (filters.companyIds.length > 0) payload.companyId = filters.companyIds;
//       if (filters.customerIds.length > 0) payload.customerIds = filters.customerIds;
//       if (filters.orderModes.length > 0) payload.orderModes = filters.orderModes;
//       const fromDate = filters.startDate;
//       const toDate = filters.endDate;

//       // Build query params
//       const queryParams = new URLSearchParams({
//         pageIndex: String(page),
//         pageSize: String(pageSize),
//         ...(fromDate && { fromDate }),
//         ...(toDate && { toDate }),
//       }).toString();

//       const response = await axios.post(
//         `https://adminapi.flexiclean.me/api/v1/activities/orders?${queryParams}`,
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );

//       const data = response.data?.data;
//       setRows(data?.data || []);
//       setRowCount(data?.totalCount || 0);
//     } catch (error: any) {
//       console.error("Error fetching orders:", error?.response?.data || error);
//       setError("Failed to load transactions.");
//     } finally {
//       setLoading(false);
//     }
//   }, [page, pageSize, filters]);

//   useEffect(() => {
//     getData();
//   }, [getData]);

//   const columns: GridColDef[] = [
//     {
//       field: "orderDate",
//       headerName: "Date",
//       width: 150,
//       renderCell: (params) => {
//         const date = new Date(params.value);
//         return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
//       },
//     },
//     {
//       field: "orderNo",
//       headerName: "Order No",
//       width: 200,

//     },
//     {
//       field: "companyId",
//       headerName: "Agent Name",
//       width: 200,
//       renderCell: (params) => {
//         return params.row.companyId?.agentId?.name || "N/A";
//       },
//     },
//     {
//       field: "customerId",
//       headerName: "Customer Name",
//       width: 200,
//       renderCell: (params) => {
//         const customer = params.row.customerId;
//         return customer ? `${customer.firstName} ${customer.lastName}` : "N/A";
//       },
//     },
//     {
//       field: "customerEmail",
//       headerName: "Email",
//       width: 200,
//       renderCell: (params) => {
//         return params.row.customerId?.email || "N/A";
//       },
//     },
//     {
//       field: "customerMobile",
//       headerName: "Mobile",
//       width: 150,
//       renderCell: (params) => {
//         return params.row.customerId?.mobile || "N/A";
//       },
//     },
//     { field: "orderMode", headerName: "Type", width: 150 },
//     {
//       field: "grossAmt",
//       headerName: "Gross Amount",
//       width: 150,
//       renderCell: (params) =>
//         params.value !== undefined && params.row.currency
//           ? `${params.row.currency.currencySymbol} ${params.value.toFixed(params.row.currency.decimalPoints)}`
//           : "N/A",
//     },
//     {
//       field: "netAmt",
//       headerName: "Net Amount",
//       width: 150,
//       renderCell: (params) =>
//         params.value !== undefined && params.row.currency
//           ? `${params.row.currency.currencySymbol} ${params.value.toFixed(params.row.currency.decimalPoints)}`
//           : "N/A",
//     },
//     {
//       field: "payoutAmt",
//       headerName: "Wallet",
//       width: 150,
//       renderCell: (params) =>
//         params.value !== undefined && params.row.currency
//           ? `${params.row.currency.currencySymbol} ${params.value.toFixed(params.row.currency.decimalPoints)}`
//           : "N/A",
//     },
//     {
//       field: "discAmt",
//       headerName: "Discount Amount",
//       width: 150,
//       renderCell: (params) =>
//         params.value !== undefined && params.value !== null
//           ? `${params.row.currency.currencySymbol} ${params.value.toFixed(params.row.currency.decimalPoints)}`
//           : "N/A",
//     },
//     {
//       field: "commissionAmount",
//       headerName: "Commission",
//       width: 150,
//       renderCell: (params) =>
//         params.value !== undefined && params.row.currency
//           ? `${params.row.currency.currencySymbol} ${params.value.toFixed(params.row.currency.decimalPoints)}`
//           : "N/A",
//     },
//   ];

//   const toggleOffcanvas = (open: boolean) => () => {
//     setIsOffcanvasOpen(open);
//   };
//   const toggleOrderMode = (mode: string) => {
//     setFilters((prev) => ({
//       ...prev,
//       orderMode: prev.orderModes === mode ? null : mode,
//     }));
//   };

//   const handleApply = () => {
//     getData();
//     setIsOffcanvasOpen(false);
//   };

//   return (
//     <div>
//       <div className="w-100 d-flex justify-content-end mb-3">
//         <button
//           className="custom-btn-verify-pending"
//           style={{ background: "#1e4894" }}
//           onClick={() => setIsOffcanvasOpen(true)}
//         >
//           Filter
//         </button>
//       </div>

//       <Offcanvas show={isOffcanvasOpen} onHide={toggleOffcanvas(false)} placement="end" style={{ width: "400px" }}>
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Filter</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <Form>
//             <Form.Group className="mb-3">
//               <Form.Label>Company</Form.Label>
//               <Select
//                 options={companies.map((c) => ({ value: c._id, label: c.companyName }))}
//                 isMulti
//                 value={companies
//                   .filter((c) => filters.companyIds.includes(c._id))
//                   .map((c) => ({ value: c._id, label: c.companyName }))}
//                 onChange={(selected) =>
//                   setFilters((prev) => ({ ...prev, companyIds: selected.map((s) => s.value) }))
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Customer</Form.Label>
//               <Select
//                 options={customers.map((c) => ({ value: c._id, label: `${c.firstName} ${c.lastName}` }))}
//                 isMulti
//                 value={customers
//                   .filter((c) => filters.customerIds.includes(c._id))
//                   .map((c) => ({ value: c._id, label: `${c.firstName} ${c.lastName}` }))}
//                 onChange={(selected) =>
//                   setFilters((prev) => ({ ...prev, customerIds: selected.map((s) => s.value) }))
//                 }
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>Order Mode</Form.Label>
//               {orderModeOptions.map((mode) => (
//                 <Form.Check
//                   key={mode}
//                   type="radio"
//                   name="orderModes"
//                   label={mode}
//                   checked={filters.orderModes === mode}
//                   onChange={() => toggleOrderMode(mode)}
//                   className=" pb-2"
//                   style={{ accentColor: '#4caf50' }}
//                 />
//               ))}
//             </Form.Group>


//             <Form.Group className="mb-3">
//               <Form.Label>Start Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={filters.startDate}
//                 onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
//               />
//             </Form.Group>

//             <Form.Group className="mb-3">
//               <Form.Label>End Date</Form.Label>
//               <Form.Control
//                 type="date"
//                 value={filters.endDate}
//                 onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
//               />
//             </Form.Group>

//             <div className="d-flex justify-content-end">
//               <button className="btn btn-primary" type="button" onClick={handleApply}>
//                 Apply
//               </button>
//             </div>
//           </Form>
//         </Offcanvas.Body>
//       </Offcanvas>

//       {
//         loading ? (
//           <div className="text-center" style={{ height: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
//             <Lottie animationData={loaderAnimation} loop style={{ width: 150, height: 150 }} />
//           </div>
//         ) : error ? (
//           <Box textAlign="center" mt={4}>
//             <Typography variant="h6" color="error">
//               {error}
//             </Typography>
//           </Box>
//         ) : (
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             getRowId={(row) => row._id}
//             rowCount={rowCount}
//             pagination
//             paginationMode="server"
//             paginationModel={{ page, pageSize }}
//             onPaginationModelChange={({ page, pageSize }) => {
//               setPage(page);
//               setPageSize(pageSize);
//             }}
//             checkboxSelection
//           />
//         )
//       }
//     </div >
//   );
// };

// export default TransactionsTable;
import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import { Form, Offcanvas } from "react-bootstrap";
import Select from "react-select";
import { getReportsPermissions } from "../../utils/getPermissions";

interface Order {
  _id: string;
  customerName: string;
  Orderno: string;
  customerEmail: string;
  customerMobile: string;
  orderDate: string;
  orderMode: string;
  grossAmt: number;
  companyId: {
    _id: string;
    companyName: string;
    companyLogo: string;
    agentId?: { name: string };
  };
  customerId?: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
  };
  netAmt: number;
  payoutAmt: number;
  discAmt: number;
  commissionAmount: number;
  currency: {
    currencySymbol: string;
    decimalPoints: number;
  };
}

const TransactionsTable: React.FC = () => {
  const [rows, setRows] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);

  const [companies, setCompanies] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const orderModeOptions = ["POS", "Online"];

  const [filters, setFilters] = useState({
    companyIds: [] as string[],
    customerIds: [] as string[],
    orderModes: "",
    startDate: "",
    endDate: "",
  });

  const token = localStorage.getItem("token");

  // Permissions
  const permissions = getReportsPermissions();
  const canView = permissions.includes("view");
  const canEdit = permissions.includes("edit");
  const canDelete = permissions.includes("delete");
  const canCreate = permissions.includes("create");

  console.log("TransactionsTable Permissions:", { canView, canEdit, canDelete, canCreate });

  // Block page if user cannot view
  if (!canView) {
    return (
      <div className="alert alert-warning">
        You don't have permission to view this page.
      </div>
    );
  }

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`https://adminapi.flexiclean.me/api/v1/customer/dropdown`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        if (result.status === 'ok') {
          setCustomers(result.data);
        }
      } catch (err) {
        console.error('Customer fetch error:', err);
      }
    };
    fetchCustomers();
  }, [token]);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await fetch(`https://adminapi.flexiclean.me/api/v1/agent/dropdown`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        if (result.status === 'ok') {
          setCompanies(result.data);
        }
      } catch (err) {
        console.error('Company fetch error:', err);
      }
    };
    fetchCompany();
  }, [token]);

  const getData = useCallback(async () => {
    if (!token) {
      setError("Missing token. Please log in.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const payload: any = {};
      if (filters.companyIds.length > 0) payload.companyId = filters.companyIds;
      if (filters.customerIds.length > 0) payload.customerIds = filters.customerIds;
      if (filters.orderModes.length > 0) payload.orderModes = filters.orderModes;
      const fromDate = filters.startDate;
      const toDate = filters.endDate;

      const queryParams = new URLSearchParams({
        pageIndex: String(page),
        pageSize: String(pageSize),
        ...(fromDate && { fromDate }),
        ...(toDate && { toDate }),
      }).toString();

      const response = await axios.post(
        `https://adminapi.flexiclean.me/api/v1/activities/orders?${queryParams}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = response.data?.data;
      setRows(data?.data || []);
      setRowCount(data?.totalCount || 0);
    } catch (error: any) {
      console.error("Error fetching orders:", error?.response?.data || error);
      setError("Failed to load transactions.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, filters, token]);

  useEffect(() => {
    getData();
  }, [getData]);

  const columns: GridColDef[] = [
    {
      field: "orderDate",
      headerName: "Date",
      width: 150,
      renderCell: (params) => {
        const date = new Date(params.value);
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      },
    },
    {
      field: "orderNo",
      headerName: "Order No",
      width: 200,
    },
    {
      field: "companyId",
      headerName: "Agent Name",
      width: 200,
      renderCell: (params) => {
        return params.row.companyId?.agentId?.name || "N/A";
      },
    },
    {
      field: "customerId",
      headerName: "Customer Name",
      width: 200,
      renderCell: (params) => {
        const customer = params.row.customerId;
        return customer ? `${customer.firstName} ${customer.lastName}` : "N/A";
      },
    },
    {
      field: "customerEmail",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return params.row.customerId?.email || "N/A";
      },
    },
    {
      field: "customerMobile",
      headerName: "Mobile",
      width: 150,
      renderCell: (params) => {
        return params.row.customerId?.mobile || "N/A";
      },
    },
    { field: "orderMode", headerName: "Type", width: 150 },
    {
      field: "grossAmt",
      headerName: "Gross Amount",
      width: 150,
      renderCell: (params) =>
        params.value !== undefined && params.row.currency
          ? `${params.row.currency.currencySymbol} ${params.value.toFixed(params.row.currency.decimalPoints)}`
          : "N/A",
    },
    {
      field: "netAmt",
      headerName: "Net Amount",
      width: 150,
      renderCell: (params) =>
        params.value !== undefined && params.row.currency
          ? `${params.row.currency.currencySymbol} ${params.value.toFixed(params.row.currency.decimalPoints)}`
          : "N/A",
    },
    {
      field: "payoutAmt",
      headerName: "Wallet",
      width: 150,
      renderCell: (params) =>
        params.value !== undefined && params.row.currency
          ? `${params.row.currency.currencySymbol} ${params.value.toFixed(params.row.currency.decimalPoints)}`
          : "N/A",
    },
    {
      field: "discAmt",
      headerName: "Discount Amount",
      width: 150,
      renderCell: (params) =>
        params.value !== undefined && params.value !== null
          ? `${params.row.currency.currencySymbol} ${params.value.toFixed(params.row.currency.decimalPoints)}`
          : "N/A",
    },
    {
      field: "commissionAmount",
      headerName: "Commission",
      width: 150,
      renderCell: (params) =>
        params.value !== undefined && params.row.currency
          ? `${params.row.currency.currencySymbol} ${params.value.toFixed(params.row.currency.decimalPoints)}`
          : "N/A",
    },
  ];

  const toggleOffcanvas = (open: boolean) => () => {
    setIsOffcanvasOpen(open);
  };
  const toggleOrderMode = (mode: string) => {
    setFilters((prev) => ({
      ...prev,
      orderMode: prev.orderModes === mode ? null : mode,
    }));
  };

  const handleApply = () => {
    getData();
    setIsOffcanvasOpen(false);
  };

  return (
    <div>
      <div className="w-100 d-flex justify-content-end mb-3">
        <button
          className="custom-btn-verify-pending"
          style={{ background: "#1e4894" }}
          onClick={() => setIsOffcanvasOpen(true)}
        >
          Filter
        </button>
      </div>

      <Offcanvas show={isOffcanvasOpen} onHide={toggleOffcanvas(false)} placement="end" style={{ width: "400px" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Company</Form.Label>
              <Select
                options={companies.map((c) => ({ value: c._id, label: c.companyName }))}
                isMulti
                value={companies
                  .filter((c) => filters.companyIds.includes(c._id))
                  .map((c) => ({ value: c._id, label: c.companyName }))}
                onChange={(selected) =>
                  setFilters((prev) => ({ ...prev, companyIds: selected.map((s) => s.value) }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Customer</Form.Label>
              <Select
                options={customers.map((c) => ({ value: c._id, label: `${c.firstName} ${c.lastName}` }))}
                isMulti
                value={customers
                  .filter((c) => filters.customerIds.includes(c._id))
                  .map((c) => ({ value: c._id, label: `${c.firstName} ${c.lastName}` }))}
                onChange={(selected) =>
                  setFilters((prev) => ({ ...prev, customerIds: selected.map((s) => s.value) }))
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Order Mode</Form.Label>
              {orderModeOptions.map((mode) => (
                <Form.Check
                  key={mode}
                  type="radio"
                  name="orderModes"
                  label={mode}
                  checked={filters.orderModes === mode}
                  onChange={() => toggleOrderMode(mode)}
                  className=" pb-2"
                  style={{ accentColor: '#4caf50' }}
                />
              ))}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" type="button" onClick={handleApply}>
                Apply
              </button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      {loading ? (
        <div className="text-center" style={{ height: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Lottie animationData={loaderAnimation} loop style={{ width: 150, height: 150 }} />
        </div>
      ) : error ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6" color="error">
            {error}
          </Typography>
        </Box>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          getRowId={(row) => row._id}
          rowCount={rowCount}
          pagination
          paginationMode="server"
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={({ page, pageSize }) => {
            setPage(page);
            setPageSize(pageSize);
          }}
          checkboxSelection
        />
      )}
    </div>
  );
};

export default TransactionsTable;