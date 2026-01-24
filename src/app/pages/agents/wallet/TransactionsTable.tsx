import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import useLocation
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CircularProgress, Box, Typography } from "@mui/material";
import { fetchOrders } from "../../../modules/auth/core/_requests";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons";

interface Order {
  _id: string;
  companyName: string;
  companyLogo: string;
  customerName: string;
  customerEmail: string;
  customerGender: string;
  customerMobile: string;
  mobile: number;
  orderDate: string;
  orderMode: string;
  grossAmt: number;
  netAmt: number;
  payoutAmt: number;
  discAmt: number;
  addressStreet: string;
  addressBlock: string | null;
  addressBuilding: string | null;
  addressCity: string;
  addressArea: string;
  addressCountry: string;
  addressState: string;
  addressZipcode: string;
  agentName: string;
  commissionAmount: number; // Added commission amount
}

const TransactionsTable: React.FC = () => {
  const location = useLocation(); // Get location
  const searchParams = new URLSearchParams(location.search);
  const [companyId, setCompanyId] = useState<string>("");
  const [rows, setRows] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const url = window.location.href; // Get the current URL
    const urlObject = new URL(url); // Create a URL object

    // Extract the pathname and split it to get the ID
    const pathname = urlObject.pathname;
    const extractedId = pathname.split("/")[2];

    // Update the state with the extracted ID
    setCompanyId(extractedId);
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const orders = await fetchOrders(companyId);
      
        setRows(orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load orders.");
      } finally {
        setLoading(false);
      }
    };

    if (companyId) {
      getData();
    }
  }, [token, companyId]);

  const columns: GridColDef[] = [
    {
      field: "orderDate",
      headerName: "Date",
      width: 150,
      sortable: true,
      renderCell: (params) => {
        const date = new Date(params.value);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return formattedDate;
      },
    },
    { field: "orderNo", headerName: "Order No", width: 220, sortable: true },
    {
      field: "customerName",
      headerName: "Customer Name",
      width: 200,
      sortable: true,
    },
    { field: "customerEmail", headerName: "Email", width: 200, sortable: true },
    {
      field: "customerMobile",
      headerName: "Mobile No",
      width: 150,
      sortable: true,
    },
    { field: "orderMode", headerName: "Type", width: 150, sortable: true },
    {
  field: "grossAmt",
  headerName: "Gross Amount",
  width: 150,
  renderCell: (params) => {
    return params.row.orderMode === "POS"
      ? "N/A"
      : params.value !== undefined && params.value !== null
      ? `${params.row.currencySymbol.currencySymbol} ${params.value.toFixed((params.row.currencySymbol.decimalPoints))}`
      : "N/A";
  },
},

    {
      field: "netAmt",
      headerName: "Net Amount",
      width: 150,
      renderCell: (params) => {
        return params.row.orderMode === "POS"
          ? "N/A"
          : params.value !== undefined && params.value !== null
          ? `${params.row.currencySymbol.currencySymbol} ${params.value.toFixed((params.row.currencySymbol.decimalPoints))}`
          : "N/A";
      },
    },
    {
      field: "discAmt",
      headerName: "Discount Amount",
      width: 150,
      renderCell: (params) =>
        params.value !== undefined && params.value !== null
          ? `${params.row.currencySymbol.currencySymbol} ${params.value.toFixed((params.row.currencySymbol.decimalPoints))}`
          : "N/A",
    },
    {
      field: "commissionAmount",
      headerName: "Commission Amount",
      width: 180,
      renderCell: (params) => {
        return params.row.orderMode === "POS"
          ? "N/A"
          : params.value !== undefined && params.value !== null
          ? `${params.row.currencySymbol.currencySymbol} ${params.value.toFixed(params.row.currencySymbol.decimalPoints)}`
          : "N/A";
      },
    },
    {
      field: "payoutAmt",
      headerName: "Wallet",
      width: 150,
      renderCell: (params) => {
        const payoutValue =
          params.value !== undefined && params.value !== null
            ? `${params.row.currencySymbol.currencySymbol} ${params.value.toFixed((params.row.currencySymbol.decimalPoints))}`
            : "";

        return (
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>{payoutValue}</span>
            {params.row.orderMode === "Online" && (
              <FontAwesomeIcon
                icon={faArrowDown}
                style={{ color: "green", marginLeft: "5px", fontSize: "20px" }}
              />
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>

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
        <div>
          <DataGrid
            rows={rows}
            columns={columns}
            checkboxSelection={true}
            getRowId={(row) => row._id}
            autoHeight={true}
            hideFooter={true}
            sx={{
              "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
                outline: "none",
                outlineOffset: "0px",
              },
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TransactionsTable;
