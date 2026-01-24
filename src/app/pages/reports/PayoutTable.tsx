// import React, { useCallback, useEffect, useState } from "react";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { CircularProgress, Box, Switch } from "@mui/material";
// import { Modal, Form, Button } from "react-bootstrap";
// import axios from "axios";

// interface Payout {
//   _id: string;
//   requestId: string;
//   acNo: string;
//   amount: number;
//   date: string;
//   status: string;
//   companyId: string;
//   created_by: string;
//   currencyId: { currencyCode: string };
//   is_active: boolean;
//   updated_at: string;
// }

// const PayoutTable: React.FC = () => {
//   const [rows, setRows] = useState<Payout[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [companyId, setCompanyId] = useState<string>("");
//   const [showModal, setShowModal] = useState(false);
//   const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
//   const [error, setError] = useState<string | null>(null); // ✅ Added error state
// // console.log(rows, "Rows data");

//   useEffect(() => {
//     const url = window.location.href;
//     const urlObject = new URL(url);
//     const pathname = urlObject.pathname;
//     const extractedId = pathname.split("/")[2];
//     setCompanyId(extractedId);
//   }, []);

//   const getData = useCallback(async () => {
//     const token = localStorage.getItem("token");
//     // console.log("Token:", token);

//     if (!token) {
//       setError("Missing token. Please log in.");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         // "https://adminapi.flexiclean.me/api/v1/activities/orders",
//         "https://adminapi.flexiclean.me/api/v1//activities/payouts?pageIndex=0&pageSize=10",
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             Accept: "application/json",
//           },
//         }
//       );
// // console.log(  "Response data:", response.data?.data);

//       const payouts = response.data?.data || [];
//       // console.log(payouts);
      
//       setRows(payouts);
//     } catch (error: any) {
//       console.error("Error fetching payouts:", error?.response?.data || error);
//       setError("Failed to load payout transactions.");
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     getData();
//   }, [getData]);

//   const handleModalClose = () => {
//     setShowModal(false);
//     setSelectedPayout(null);
//   };

//   const handleSaveChanges = () => {
//     // console.log("Saving changes for:", selectedPayout);
//     handleModalClose();
//   };

//   const handleEdit = (payout: Payout) => {
//     setSelectedPayout(payout);
//     setShowModal(true);
//   };

//   const columns: GridColDef[] = [
//     {
//       field: "date",
//       headerName: "Requested Date",
//       width: 180,
//       renderCell: (params) => {
//         const date = new Date(params.value);
//         return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//       },
//     },
//     { field: "requestId", headerName: "Request ID", width: 250 },
//     {
//       field: "amount",
//       headerName: "Amount",
//       width: 150,
//       renderCell: (params) => {
//         return `${params.value?.toFixed(3)} ${params.row.currencyId?.currencyCode}`;
//       },
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 150,
//       renderCell: (params) => (
//         <div>
//           {params.value === "approved" ? (
//             <span className="text-white bg-success fs-6 fw-bold p-1 rounded ">
//               {params.value}
//             </span>
//           ) : params.value === "pending" ? (
//             <span className="badge badge-warning fs-8 fw-bold">
//               {params.value}
//             </span>
//           ) : (
//             <span className="badge badge-danger fs-8 fw-bold">
//               {params.value || "In Progress"}
//             </span>
//           )}
//         </div>
//       ),
//     },
//     // {
//     //   field: "acNo",
//     //   headerName: "Account No",
//     //   width: 180,
//     //   renderCell: (params) => {
//     //     const acNo = params.value.toString();
//     //     const maskedAcNo = acNo.slice(0, 5) + "*".repeat(acNo.length - 5);
//     //     return maskedAcNo;
//     //   },
//     // },
//     {
//   field: "acNo",
//   headerName: "Account No",
//   width: 180,
//   renderCell: (params) => {
//     const acNo = (params.value ?? "").toString();
//     const maskedAcNo =
//       acNo.length > 5 ? acNo.slice(0, 5) + "*".repeat(acNo.length - 5) : acNo;
//     return maskedAcNo;
//   },
// }
// ,
//     {
//       field: "updated_at",
//       headerName: "Updated On",
//       width: 180,
//       renderCell: (params) => {
//         const date = new Date(params.value);
//         return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//       },
//     },
//     {
//       field: "actions",
//       headerName: "Option",
//       width: 130,
//       renderCell: (params) => (
//         <div className="action-dropdown">
//           <select
//             className="form-select"
//             defaultValue=""
//             onChange={(e) => {
//               if (e.target.value === "edit") {
//                 handleEdit(params.row);
//               }
//             }}
//           >
//             <option value="" disabled>
//               ...
//             </option>
//             <option value="edit">Edit</option>
//             <option value="delete">Delete</option>
//           </select>
//         </div>
//       ),
//     },
//   ];

//   return (
//     <div>
//       <Box sx={{ width: "100%" }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Box mt={2} color="error.main" textAlign="center">
//             {error}
//           </Box>
//         ) : (
//           <DataGrid
//             rows={rows}
//             columns={columns}
//             getRowId={(row) => row._id}
//             checkboxSelection
//             hideFooter
//             autoHeight
//             sx={{
//               "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
//                 outline: "none",
//               },
//               "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible": {
//                 outline: "none",
//               },
//               "& .MuiDataGrid-cell:active": {
//                 outline: "none",
//               },
//             }}
//           />
//         )}
//       </Box>

//       <Modal show={showModal} onHide={handleModalClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Payout</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           {selectedPayout && (
//             <Form>
//               <Form.Group controlId="formAmount" className="mb-3">
//                 <Form.Label>Enter The Amount</Form.Label>
//                 <Form.Control
//                   type="number"
//                   value={selectedPayout.amount}
//                   onChange={(e) =>
//                     setSelectedPayout({
//                       ...selectedPayout,
//                       amount: parseFloat(e.target.value),
//                     })
//                   }
//                 />
//               </Form.Group>
//               <Form.Group controlId="formStatus">
//                 <Form.Label>Status</Form.Label>
//                 <div className="d-flex justify-content-start gap-5 mb-3">
//                   {["approved", "pending", "rejected"].map((status) => (
//                     <Form.Check
//                       key={status}
//                       type="radio"
//                       label={status.charAt(0).toUpperCase() + status.slice(1)}
//                       name="status"
//                       value={status}
//                       checked={selectedPayout.status.toLowerCase() === status}
//                       onChange={(e) =>
//                         setSelectedPayout({
//                           ...selectedPayout,
//                           status: e.target.value,
//                         })
//                       }
//                     />
//                   ))}
//                 </div>
//               </Form.Group>
//               <div className="d-flex justify-content-between align-items-center mb-3">
//                 <Form.Group controlId="formDate">
//                   <Form.Label>Transaction Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={selectedPayout.date?.split("T")[0] || ""}
//                     onChange={(e) =>
//                       setSelectedPayout({
//                         ...selectedPayout,
//                         date: e.target.value,
//                       })
//                     }
//                   />
//                 </Form.Group>
//                 <Form.Group controlId="formRequestId">
//                   <Form.Label>Transaction ID</Form.Label>
//                   <Form.Control type="text" value={selectedPayout.requestId} readOnly />
//                 </Form.Group>
//               </div>
//               <Form.Group controlId="formComments">
//                 <Form.Label>Reason / Comments</Form.Label>
//                 <Form.Control type="text" />
//               </Form.Group>
//             </Form>
//           )}
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleModalClose}>
//             Discard
//           </Button>
//           <Button variant="primary" onClick={handleSaveChanges}>
//             Save
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// };

// export default PayoutTable;


import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {  Box, Typography } from "@mui/material";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

interface Payout {
  _id: string;
  requestId: string;
  acNo: string;
  amount: number;
  date: string;
  status: string;
  companyId: string;
  created_by: string;
  currencyId: { currencyCode: string };
  is_active: boolean;
  updated_at: string;
}

const PayoutTable: React.FC = () => {
  const [rows, setRows] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [companyId, setCompanyId] = useState<string>("");

  // Pagination states
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [rowCount, setRowCount] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);

  useEffect(() => {
    const url = window.location.href;
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const extractedId = pathname.split("/")[2];
    setCompanyId(extractedId);
  }, []);

  const getData = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Missing token. Please log in.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `https://adminapi.flexiclean.me/api/v1/activities/payouts?pageIndex=${page}&pageSize=${pageSize}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const payouts = response.data?.data || [];
      const total = response.data?.totalCount|| 0;

      setRows(payouts);
      setRowCount(total);
      setError(null);
    } catch (error: any) {
      console.error("Error fetching payouts:", error?.response?.data || error);
      setError("Failed to load payout transactions.");
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPayout(null);
  };

  const handleSaveChanges = () => {
    // Implement save functionality here
    handleModalClose();
  };

  const handleEdit = (payout: Payout) => {
    setSelectedPayout(payout);
    setShowModal(true);
  };

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Requested Date",
      width: 180,
      renderCell: (params) => {
        const date = new Date(params.value);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      },
    },
    { field: "requestId", headerName: "Request ID", width: 250 },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => {
        return `${params.value?.toFixed(3)} ${params.row.currencyId?.currencyCode}`;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => (
        <div>
          {params.value === "approved" ? (
            <span className="text-white bg-success fs-6 fw-bold p-1 rounded ">
              {params.value}
            </span>
          ) : params.value === "pending" ? (
            <span className="badge badge-warning fs-8 fw-bold">{params.value}</span>
          ) : (
            <span className="badge badge-danger fs-8 fw-bold">{params.value || "In Progress"}</span>
          )}
        </div>
      ),
    },
    {
      field: "acNo",
      headerName: "Account No",
      width: 180,
      renderCell: (params) => {
        const acNo = (params.value ?? "").toString();
        const maskedAcNo = acNo.length > 5 ? acNo.slice(0, 5) + "*".repeat(acNo.length - 5) : acNo;
        return maskedAcNo;
      },
    },
    {
      field: "updated_at",
      headerName: "Updated On",
      width: 180,
      renderCell: (params) => {
        const date = new Date(params.value);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      },
    },
    {
      field: "actions",
      headerName: "Option",
      width: 130,
      renderCell: (params) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value === "edit") {
                handleEdit(params.row);
              }
            }}
          >
            <option value="" disabled>
              ...
            </option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </div>
      ),
    },
  ];

  return (
    <div>
      <Box sx={{ width: "100%" }}>
        {loading ? (
        <div
          className="text-center"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            backgroundColor: "white",
          }}
        >
          <Lottie
            animationData={loaderAnimation}
            loop={true}
            style={{ width: 150, height: 150 }}
          />
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
            checkboxSelection
            pagination
            paginationMode="server"
            rowCount={rowCount}
            paginationModel={{ page, pageSize }}
            onPaginationModelChange={({ page: newPage, pageSize: newPageSize }) => {
              setPage(newPage);
              setPageSize(newPageSize);
            }}
            autoHeight
            sx={{
              "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible": {
                outline: "none",
              },
              "& .MuiDataGrid-cell:active": {
                outline: "none",
              },
            }}
          />
        )}
      </Box>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Payout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedPayout && (
            <Form>
              <Form.Group controlId="formAmount" className="mb-3">
                <Form.Label>Enter The Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedPayout.amount}
                  onChange={(e) =>
                    setSelectedPayout({
                      ...selectedPayout,
                      amount: parseFloat(e.target.value),
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <div className="d-flex justify-content-start gap-5 mb-3">
                  {["approved", "pending", "rejected"].map((status) => (
                    <Form.Check
                      key={status}
                      type="radio"
                      label={status.charAt(0).toUpperCase() + status.slice(1)}
                      name="status"
                      value={status}
                      checked={selectedPayout.status.toLowerCase() === status}
                      onChange={(e) =>
                        setSelectedPayout({
                          ...selectedPayout,
                          status: e.target.value,
                        })
                      }
                    />
                  ))}
                </div>
              </Form.Group>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <Form.Group controlId="formDate">
                  <Form.Label>Transaction Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={selectedPayout.date?.split("T")[0] || ""}
                    onChange={(e) =>
                      setSelectedPayout({
                        ...selectedPayout,
                        date: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group controlId="formRequestId">
                  <Form.Label>Transaction ID</Form.Label>
                  <Form.Control type="text" value={selectedPayout.requestId} readOnly />
                </Form.Group>
              </div>
              <Form.Group controlId="formComments">
                <Form.Label>Reason / Comments</Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Discard
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PayoutTable;
