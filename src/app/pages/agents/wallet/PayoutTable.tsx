import React, { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Box, Switch } from "@mui/material";
import { fetchPayouts } from "../../../modules/auth/core/_requests";
import { Modal, Form, Button } from "react-bootstrap";

interface Payout {
  _id: string;
  requestId: string;
  acNo: string;
  amount: number;
  date: string;
  status: string;
  companyId: string;
  created_by: string;
  currencyId: string;
  is_active: boolean;
  updated_at: string;
}

const PayoutTable: React.FC = () => {
  const [rows, setRows] = useState<Payout[]>([]);
  const [loading, setLoading] = useState(true);
  const [companyId, setCompanyId] = useState<string>("");
  const [showModal, setShowModal] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);

  useEffect(() => {
    const url = window.location.href;
    const urlObject = new URL(url);
    const pathname = urlObject.pathname;
    const extractedId = pathname.split("/")[2];
    setCompanyId(extractedId);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchPayouts(companyId);
        console.log("Fetched data:", response); // Log the fetched data

        setRows(response);
      } catch (error) {
        console.error("Failed to fetch payouts", error);
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      fetchData();
    }
  }, [companyId]);
  const handleEdit = (payout: Payout) => {
    setSelectedPayout(payout);
    setShowModal(true); // Open the modal
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedPayout(null); // Clear the selection
  };
  const handleSaveChanges = () => {
    // Save the edited data here (update API call)
    console.log("Saving changes for:", selectedPayout);
    handleModalClose();
  };
  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Requested Date",
      width: 180,
      renderCell: (params: any) => {
        const date = new Date(params.value);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      },
    },
    { field: "requestId", headerName: "Request ID", width: 250 },
    {
  field: "amount",
  headerName: "Amount",
  width: 150,
  renderCell: (params: any) => {
    return ` ${params.value?.toFixed(3)} ${params.row.currencyId?.currencyCode}`;
  },
}
,
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
      
      <div className="sticky-cell">
          {params.value === "approved" ? (
            <span className="text-white bg-success fs-6 fw-bold p-1 rounded ">
              {params.value}
            </span>
          ) : params.value === "Pending" ? (
            <span className="badge badge-warning fs-8 fw-bold">
              {params.value}
            </span>
          ) : (
            <span className="badge badge-danger fs-8 fw-bold">
              {params.value || "In Progress"}
            </span>
          )}
        </div>
      ),
    },
    {
      field: "acNo",
      headerName: "Account No",
      width: 180,
      renderCell: (params: any) => {
        const acNo = params.value.toString();
        const maskedAcNo = acNo.slice(0, 5) + "*".repeat(acNo.length - 5);
        return maskedAcNo;
      },
    },
    {
      field: "updated_at",
      headerName: "Updated On",
      width: 180,
      renderCell: (params: any) => {
        const date = new Date(params.value);
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      },
    },
    {
      field: "actions",
      headerName: "Option",
      width: 130,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            defaultValue=""
            onChange={(e) => {
              if (e.target.value === "edit") {
                handleEdit(params.row); // Trigger the edit function
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
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100%"
          >
            <CircularProgress />
          </Box>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row._id}
            checkboxSelection={true}
            hideFooter={true}
            autoHeight={true}
            sx={{
              "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
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
        )}
      </Box>
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
                     onWheel={(e) => (e.target as HTMLInputElement).blur()}
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
                  <Form.Check
                    type="radio"
                    label="Approved"
                    name="status"
                    value="approved"
                    checked={selectedPayout.status.toLowerCase() === "approved"}
                    onChange={(e) =>
                      setSelectedPayout({
                        ...selectedPayout,
                        status: e.target.value,
                      })
                    }
                  />
                  <Form.Check
                    type="radio"
                    label="Pending"
                    name="status"
                    value="pending"
                    checked={selectedPayout.status.toLowerCase() === "pending"}
                    onChange={(e) =>
                      setSelectedPayout({
                        ...selectedPayout,
                        status: e.target.value,
                      })
                    }
                  />
                  <Form.Check
                    type="radio"
                    label="Rejected"
                    name="status"
                    value="rejected"
                    checked={selectedPayout.status.toLowerCase() === "rejected"}
                    onChange={(e) =>
                      setSelectedPayout({
                        ...selectedPayout,
                        status: e.target.value,
                      })
                    }
                  />
                </div>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center mb-3">
                <div>
                  <Form.Group controlId="formDate">
                    <Form.Label>Transaction Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={
                        selectedPayout.date
                          ? selectedPayout.date.split("T")[0]
                          : ""
                      } // Format the date to YYYY-MM-DD
                      onChange={(e) =>
                        setSelectedPayout({
                          ...selectedPayout,
                          date: e.target.value, // Store the selected date as a string (YYYY-MM-DD)
                        })
                      }
                    />
                  </Form.Group>
                </div>
                <div>
                  <Form.Group controlId="formRequestId">
                    <Form.Label>Transaction ID</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedPayout.requestId}
                      readOnly
                    />
                  </Form.Group>
                </div>
              </div>
              <Form.Group controlId="formRequestId">
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
