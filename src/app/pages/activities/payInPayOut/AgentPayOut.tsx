import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useLocation, useParams } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import { postRequest } from "../../../modules/auth/core/_requests";
import { Modal, Button, Form } from "react-bootstrap";
import { Switch } from "@mui/material";

interface Transaction {
  _id: string;
  date: string;
  requestId: string;
  acNo: string;
  amount: number;
  status: string;
  updated_at: string;
  transactionId?: string;
  comments?: string;
}

const AgentPayOut: FC = () => {
  const [rowData, setRowData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [statusCounts, setStatusCounts] = useState({
    approved: 0,
    rejected: 0,
    pending: 0,
  });
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const orderstatus = queryParams.get('status') || '';
  
  
  const [isEditable, setIsEditable] = useState(false);
  {isEditable}
  const { customerId } = useParams<{ customerId: string }>();
  const token = localStorage.getItem("token");
  const getData = async (statusFilter: string | null = null) => {
    setLoading(true);
    try {
      const transactionData = await postRequest(`/activities/payouts`, "");
      if (transactionData?.data?.status === "ok") {
        const data = transactionData?.data?.data || [];
        setRowData(
          statusFilter
            ? data.filter((tx: Transaction) => tx.status === statusFilter)
            : data
        );

        const approvedCount = data.filter(
          (tx: Transaction) => tx.status === "approved"
        ).length;
        const rejectedCount = data.filter(
          (tx: Transaction) => tx.status === "rejected"
        ).length;
        const pendingCount = data.filter(
          (tx: Transaction) => tx.status === "pending"
        ).length;

        setStatusCounts({
          approved: approvedCount,
          rejected: rejectedCount,
          pending: pendingCount,
        });
      } else {
        console.error("Error fetching data: ", transactionData?.data?.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData(filterStatus);
  }, [customerId, filterStatus]);

  useEffect(()=>{
    if(orderstatus) {
    setFilterStatus("pending")
    getData(filterStatus);
  }
  },[filterStatus, orderstatus])
 
  const handleView = (row: Transaction) => {
    setSelectedTransaction(row);
    setIsEditable(row.status !== "pending"); 
    setShowModal(true);
  };

 

  const handleUpdatePayout = async () => {
    if (selectedTransaction) {
      let transactionData;
  
      if (selectedTransaction.status === "approved") {
        transactionData = {
          status: "approved",
          transactionId: selectedTransaction.transactionId || "JD993090489300930", // Default if empty
          amount: selectedTransaction.amount,
          date: selectedTransaction.date,
          comments: selectedTransaction.comments || "", // Ensure comments are included
        };
      } else if (selectedTransaction.status === "rejected") {
        if (!selectedTransaction.comments) {
          alert("Please enter a comment before rejecting the payout.");
          return;
        }
        transactionData = {
          status: "rejected",
          comments: selectedTransaction.comments,
        };
      } else {
        return; // If status is something else, do nothing
      }
  

  
      try {
        const response = await fetch(
          `https://adminapi.flexiclean.me/api/v1/activities/payout/${selectedTransaction._id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(transactionData),
          }
        );
  
        const updateData = await response.json();
  
        if (updateData?.status === "ok") {
          setShowModal(false);
          getData(filterStatus);
          console.log(filterStatus);
          
        } else {
          console.error("Failed to update payout:", updateData?.message || "Unknown error");
        }
      } catch (error) {
        console.error("Error updating payout:", error);
      }
    }
  };
  

  const columns: GridColDef[] = [
    {
      field: "date",
      headerName: "Requested ID Date",
      width: 200,
      renderCell: (params) =>
        new Date(params.row.date).toLocaleDateString("en-GB"),
    },
    { field: "requestId", headerName: "Consultant Info", width: 250 },
    {
      field: "Particulrs",
      headerName: "Particulrs",
      width: 150,
      renderCell: () => `Amount Withdraw`,
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 180,
      // renderCell: (params) => `${Number(params.value).toFixed(3)} ${console.log(params)  }`,
     renderCell: (params) => {
 // Log params for debugging
  const currencySymbol = params?.row?.currencyId?.currencySymbol || '-'; // Get currency symbol
  const decimalPoints = params?.row?.currencyId?.decimalPoints || 0; // Get decimal points from API or default to 3

  return `${Number(params.value).toFixed(decimalPoints)} ${currencySymbol}`; // Return formatted value with currency symbol
}
    },
    {
      field: "comments",
      headerName: "Comments / Remarks",
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.comments || params.row.remarks || "-"}
        </div>
      ),
    }
,    
    {
      field: "is_active",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Switch
          checked={params.row.is_active}
          // onChange={() => {
        
          //   handleChangeStatus(params.row._id, !params.row.is_active); // Pass id, newStatus, and imgUrl
          // }}
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
    {
      field: "status",
      headerName: "PayOut Status",
      width: 150,
      renderCell: (params) => (
        <div className="sticky-cell">
          <span
            className={`badge fs-8 fw-bold ${
              params.value === "approved"
                ? "badge-primary"
                : params.value === "pending"
                ? "badge-warning"
                : "badge-danger"
            }`}
          >
            {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          </span>
        </div>
      ),
    },
    {
      field: "View",
      headerName: "View",
      width: 150,
      renderCell: (params) => (
        <button
          className="btn btn-primary btn-sm"
          onClick={() => handleView(params.row)}
        >
          View
        </button>
      ),
    },
  ];

  const handleDateChange = (date: string) => {
    if (selectedTransaction) {
      setSelectedTransaction({ ...selectedTransaction, date });
    }
  };

  const handleStatusChange = (status: string) => {
    if (selectedTransaction) {
      setSelectedTransaction({ ...selectedTransaction, status });
    }
  };




  return (
    <>
      <PageTitle>Agent & PAY OUT</PageTitle>

      <div className="filter-buttons mb-5">
        <Button
          variant="danger"
          onClick={() => setFilterStatus("rejected")}
          className="me-2"
        >
          Rejected{" "}
          {statusCounts.rejected > 0 ? `(${statusCounts.rejected})` : ""}
        </Button>
        <Button
          variant="success"
          onClick={() => setFilterStatus("approved")}
          className="me-2"
        >
          Approved{" "}
          {statusCounts.approved > 0 ? `(${statusCounts.approved})` : ""}
        </Button>
        <Button variant="warning" onClick={() => setFilterStatus("pending")}>
          Pending {statusCounts.pending > 0 ? `(${statusCounts.pending})` : ""}
        </Button>
      </div>

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
            loop
            style={{ width: 150, height: 150, filter: "hue-rotate(200deg)" }}
          />
        </div>
      ) : (
        <div className="card">
          <DataGrid
            rows={rowData}
            columns={columns}
            getRowId={(row) => row.requestId}
            hideFooter
            autoHeight
          />
        </div>
      )}

      {selectedTransaction && (
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Payout</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formRequestId">
                <Form.Label>Payment Date</Form.Label>
                <Form.Control
                  type="date"
                  value={selectedTransaction.date.slice(0, 10)}
                  onChange={(e) => handleDateChange(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formAmount">
                <Form.Label>Amount</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedTransaction.amount}
                  onChange={(e) =>
                    setSelectedTransaction({
                      ...selectedTransaction,
                      amount: Number(e.target.value),
                    })
                  }
                />
              </Form.Group>

              <Form.Group controlId="formStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedTransaction.status}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  disabled={selectedTransaction.status !== "pending"}
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formTransactionId">
                <Form.Label>Transaction No (TXN NO)</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedTransaction.transactionId || ""}
                  onChange={(e) =>
                    setSelectedTransaction({
                      ...selectedTransaction,
                      transactionId: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group controlId="formComments">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedTransaction.comments || ""}
                  onChange={(e) =>
                    setSelectedTransaction({
                      ...selectedTransaction,
                      comments: e.target.value,
                    })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdatePayout}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default AgentPayOut;
