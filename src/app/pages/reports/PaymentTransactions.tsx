// import React, { useState, useCallback, useEffect } from "react";
// import { Row, Col, Nav, Tab, Container } from "react-bootstrap";
// import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
// import { FaCheckCircle } from "react-icons/fa";
// import "../../../../src/_metronic/assets/sass/components/Payment.scss";
// import PaymentTable from "./Payment/PaymentTable";
// import Chart from "./Payment/Chart";
// import DateRangePicker from "./Payment/DateRangePicker";
// import ReportList from "./Payment/ReportList";
// import axios from "axios";
// import CountryDropdown from "./CountryDropdown";
// import CreditTable from "./Payment/CreditTable";


// const PaymentTransactions: React.FC = () => {
//   const [startDate, setStartDate] = useState<Date | null>(null);
//   const [endDate, setEndDate] = useState<Date | null>(null);
//   const [selectedLine, setSelectedLine] = useState<string | null>(null);
//   const [chartData, setChartData] = useState<any[]>([]);
//   const [reportData, setReportData] = useState<any[]>([]);
//   const [activeKey, setActiveKey] = useState<string>("subscription");
//   const [paymentRows, setPayentRows] = useState<any[]>([]);
//   const [countryId, setCountryId] = useState("6566946881f360c33361e259");

//   const handleCountrySelect = (countryId: string) => {
//     setCountryId(countryId);
//   };

//   const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
//     page: 0,
//     pageSize: 10,
//   });
//   const [rowCount, setRowCount] = useState(0);

//   const handleTransaction = useCallback(
//     async (key: string) => {
//       const token = localStorage.getItem("token");
//       const headers = {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       };
//       const { page, pageSize } = paginationModel;

//       let url = "";
//       let body: any = {};

//       if (key === "subscription") {
//         url = `https://adminapi.flexiclean.me/api/v1/reports/agent/payTrans?pageIndex=${page}&pageSize=${pageSize}`;
//         body = { paymentType: "subscription" };
//       } else if (key === "credits") {
//         url = `https://adminapi.flexiclean.me/api/v1/reports/customer/payTrans?pageIndex=${page}&pageSize=${pageSize}`;
//         body = { paymentType: "package" };
//       }

//       try {
//         const response = await axios.post(url, body, { headers });
//         setPayentRows(response.data?.data || []);
//         setRowCount(response.data?.totalCount || 0);
//       } catch (error) {
//         console.error("Error fetching transaction data:", error);
//       }
//     },
//     [paginationModel]
//   );

//   const fetchTransactionData = useCallback(async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         `https://adminapi.flexiclean.me/api/v1/reports/payment/transactions`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ startDate, endDate, countryId }),
//         }
//       );

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//       const result = await response.json();
     
     
//       setReportData(result.data);

//       if (Array.isArray(result?.data)) {
//         const mergedChartData: { [key: string]: any } = {};

//         result.data.forEach((group: any) => {
//           group.data?.forEach((entry: any) => {
//             const { year, month, totalAmount } = entry;
//             const monthKey = `${new Date(year, month - 1).toLocaleString("default", {
//               month: "short",
//             })} ${year}`;

//             if (!mergedChartData[monthKey]) {
//               mergedChartData[monthKey] = { name: monthKey };
//             }

//             mergedChartData[monthKey][group._id] = totalAmount;
//           });
//         });

//         const finalChartData = Object.values(mergedChartData);
//         setChartData(finalChartData);
//       }
//     } catch (error) {
//       console.error("Error fetching transaction chart data:", error);
//     }
//   }, [startDate, endDate, countryId]);

//   useEffect(() => {
//     handleTransaction(activeKey);
//   }, [paginationModel, activeKey, handleTransaction]);

//   useEffect(() => {
//     fetchTransactionData();
//   }, [fetchTransactionData]);

//   const handleDateChange = (dates: [Date | null, Date | null]) => {
//     const [start, end] = dates;
//     setStartDate(start);
//     setEndDate(end);
//   };

//   const handleLegendClick = (e: any) => {
//     const { dataKey } = e;
//     setSelectedLine((prev) => (prev === dataKey ? null : dataKey));
//   };

//   const paymentColumns: GridColDef[] = [
//     { field: "transactionDate", headerName: "Date", width: 150 },
//     { field: "transactionId", headerName: "Transaction ID", width: 150 },
//     // { field: "customerName", headerName: "Subscribed By", width: 200 },
//     { field: "Agent", headerName: "Agent", width: 200 },
//     { field: "Email_id", headerName: "Email ID", width: 200 },
//     {
//       field: "amount",
//       headerName: "Amount",
//       width: 150,
//       renderCell: (params) => `${params.row.amount}`,
//     },
//     { field: "paymentMethod", headerName: "Payment Method", width: 200 },
//     {
//       field: "paymentStatus",
//       headerName: "Payment Status",
//       width: 150,
//       renderCell: (params) => (
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <FaCheckCircle
//             style={{
//               color:
//           params.value === "AUTHORIZED"
//             ? "green"
//             : params.value === "INITIATED"
//             ? "gold"
//             : "red",
//               marginRight: "8px",
//             }}
//           />
//           {params.value}
//         </div>
//       ),
//     },
   
//   ];

//   const CreditColumns: GridColDef[] = [
//     { field: "transactionDate", headerName: "Date", width: 150 },
//     { field: "transactionId", headerName: "Transaction ID", width: 150 },
//     { field: "packagetitle", headerName: "Package Title", width: 200 },
//     { field: "customerName", headerName: "Customer Name", width: 200 },
//     { field: "emailid", headerName: "Email Id", width: 200 },
    
//     {
//       field: "amount",
//       headerName: "Amount",
//       width: 150,
//       renderCell: (params) => `${params.row.amount}`,
//     },
//     { field: "paymentMethod", headerName: "Payment Method", width: 200 },
//     {
//       field: "paymentStatus",
//       headerName: "Payment Status",
//       width: 150,
//       renderCell: (params) => (
//         <div style={{ display: "flex", alignItems: "center" }}>
//           <FaCheckCircle
//             style={{
//               color:
//           params.value === "AUTHORIZED"
//             ? "green"
//             : params.value === "INITIATED"
//             ? "gold"
//             : "red",
//               marginRight: "8px",
//             }}
//           />
//           {params.value}
//         </div>
//       ),
//     },
   
//   ];
// console.log("Payment Rows:", paymentRows);
// console.log("Payment Columns:", paymentColumns);

//   return (
//     <Container fluid>
//       <Row className="mb-3 d-flex justify-content-between align-items-center">
//         <Col md={4}>
//           <DateRangePicker
//             startDate={startDate}
//             endDate={endDate}
//             handleDateChange={handleDateChange}
//           />
//         </Col>
//         <Col md={4}>
//           <CountryDropdown onCountrySelect={handleCountrySelect} />
//         </Col>
//       </Row>

//       <Row className="p-3">
//         <Col md={7} className="chart-container border shadow-sm rounded px-5">
//           <Chart
//             chartData={chartData}
//             selectedLine={selectedLine}
//             handleLegendClick={handleLegendClick}
//           />
//         </Col>
//         <Col md={5}>
//           <ReportList chartData={reportData} />
//         </Col>
//       </Row>

//       <Row>
//         <Col>
//           <Tab.Container id="left-tabs-example" defaultActiveKey="subscription">
//             <Nav
//               variant="tabs"
//               className="border-0"
//               onSelect={(k) => k && setActiveKey(k)}
//             >
//               <Nav.Item>
//                 <Nav.Link eventKey="subscription" className="border-0">
//                   Subscription
//                 </Nav.Link>
//               </Nav.Item>
//               <Nav.Item>
//                 <Nav.Link eventKey="credits" className="border-0">
//                   Credits
//                 </Nav.Link>
//               </Nav.Item>
//             </Nav>
//             <Tab.Content>
//               <Tab.Pane eventKey="subscription">
//                 <PaymentTable
//                   paymentRows={paymentRows}
//                   paymentColumns={paymentColumns}
//                   paginationModel={paginationModel}
//                   setPaginationModel={setPaginationModel}
//                   rowCount={rowCount}
//                 />
//               </Tab.Pane>
//               <Tab.Pane eventKey="credits">
//                 <CreditTable
//                   paymentRows={paymentRows}
//                   paymentColumns={CreditColumns}
//                   paginationModel={paginationModel}
//                   setPaginationModel={setPaginationModel}
//                   rowCount={rowCount}
//                 />
//               </Tab.Pane>
//             </Tab.Content>
//           </Tab.Container>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default PaymentTransactions;
import React, { useState, useCallback, useEffect } from "react";
import { Row, Col, Nav, Tab, Container } from "react-bootstrap";
import { GridColDef, GridPaginationModel } from "@mui/x-data-grid";
import { FaCheckCircle } from "react-icons/fa";
import "../../../../src/_metronic/assets/sass/components/Payment.scss";
import PaymentTable from "./Payment/PaymentTable";
import Chart from "./Payment/Chart";
import DateRangePicker from "./Payment/DateRangePicker";
import ReportList from "./Payment/ReportList";
import axios from "axios";
import CountryDropdown from "./CountryDropdown";
import CreditTable from "./Payment/CreditTable";
import { PageTitle } from "../../../_metronic/layout/core";
import { getReportsPermissions } from "../../utils/getPermissions";

const PaymentTransactions: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [selectedLine, setSelectedLine] = useState<string | null>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [reportData, setReportData] = useState<any[]>([]);
  const [activeKey, setActiveKey] = useState<string>("subscription");
  const [paymentRows, setPayentRows] = useState<any[]>([]);
  const [countryId, setCountryId] = useState("6566946881f360c33361e259");

  // Permissions
  const permissions = getReportsPermissions();
  const canView = permissions.includes("view");
  const canEdit = permissions.includes("edit");
  const canDelete = permissions.includes("delete");
  const canCreate = permissions.includes("create");

  console.log("PaymentTransactions Permissions:", { canView, canEdit, canDelete, canCreate });

  // Block page if user cannot view
  if (!canView) {
    return (
      <>
        <PageTitle>Access Denied</PageTitle>
        <div className="alert alert-warning">
          You don't have permission to view this page.
        </div>
      </>
    );
  }

  const handleCountrySelect = (countryId: string) => {
    setCountryId(countryId);
  };

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10,
  });
  const [rowCount, setRowCount] = useState(0);

  const handleTransaction = useCallback(
    async (key: string) => {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
      const { page, pageSize } = paginationModel;

      let url = "";
      let body: any = {};

      if (key === "subscription") {
        url = `https://adminapi.flexiclean.me/api/v1/reports/agent/payTrans?pageIndex=${page}&pageSize=${pageSize}`;
        body = { paymentType: "subscription" };
      } else if (key === "credits") {
        url = `https://adminapi.flexiclean.me/api/v1/reports/customer/payTrans?pageIndex=${page}&pageSize=${pageSize}`;
        body = { paymentType: "package" };
      }

      try {
        const response = await axios.post(url, body, { headers });
        setPayentRows(response.data?.data || []);
        setRowCount(response.data?.totalCount || 0);
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    },
    [paginationModel]
  );

  const fetchTransactionData = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://adminapi.flexiclean.me/api/v1/reports/payment/transactions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ startDate, endDate, countryId }),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();

      setReportData(result.data);

      if (Array.isArray(result?.data)) {
        const mergedChartData: { [key: string]: any } = {};

        result.data.forEach((group: any) => {
          group.data?.forEach((entry: any) => {
            const { year, month, totalAmount } = entry;
            const monthKey = `${new Date(year, month - 1).toLocaleString("default", {
              month: "short",
            })} ${year}`;

            if (!mergedChartData[monthKey]) {
              mergedChartData[monthKey] = { name: monthKey };
            }

            mergedChartData[monthKey][group._id] = totalAmount;
          });
        });

        const finalChartData = Object.values(mergedChartData);
        setChartData(finalChartData);
      }
    } catch (error) {
      console.error("Error fetching transaction chart data:", error);
    }
  }, [startDate, endDate, countryId]);

  useEffect(() => {
    handleTransaction(activeKey);
  }, [paginationModel, activeKey, handleTransaction]);

  useEffect(() => {
    fetchTransactionData();
  }, [fetchTransactionData]);

  const handleDateChange = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleLegendClick = (e: any) => {
    const { dataKey } = e;
    setSelectedLine((prev) => (prev === dataKey ? null : dataKey));
  };

  const paymentColumns: GridColDef[] = [
    { field: "transactionDate", headerName: "Date", width: 150 },
    { field: "transactionId", headerName: "Transaction ID", width: 150 },
    { field: "Agent", headerName: "Agent", width: 200 },
    { field: "Email_id", headerName: "Email ID", width: 200 },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => `${params.row.amount}`,
    },
    { field: "paymentMethod", headerName: "Payment Method", width: 200 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaCheckCircle
            style={{
              color:
                params.value === "AUTHORIZED"
                  ? "green"
                  : params.value === "INITIATED"
                  ? "gold"
                  : "red",
              marginRight: "8px",
            }}
          />
          {params.value}
        </div>
      ),
    },
  ];

  const CreditColumns: GridColDef[] = [
    { field: "transactionDate", headerName: "Date", width: 150 },
    { field: "transactionId", headerName: "Transaction ID", width: 150 },
    { field: "packagetitle", headerName: "Package Title", width: 200 },
    { field: "customerName", headerName: "Customer Name", width: 200 },
    { field: "emailid", headerName: "Email Id", width: 200 },
    {
      field: "amount",
      headerName: "Amount",
      width: 150,
      renderCell: (params) => `${params.row.amount}`,
    },
    { field: "paymentMethod", headerName: "Payment Method", width: 200 },
    {
      field: "paymentStatus",
      headerName: "Payment Status",
      width: 150,
      renderCell: (params) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaCheckCircle
            style={{
              color:
                params.value === "AUTHORIZED"
                  ? "green"
                  : params.value === "INITIATED"
                  ? "gold"
                  : "red",
              marginRight: "8px",
            }}
          />
          {params.value}
        </div>
      ),
    },
  ];

  return (
    <Container fluid>
      <Row className="mb-3 d-flex justify-content-between align-items-center">
        <Col md={4}>
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            handleDateChange={handleDateChange}
          />
        </Col>
        <Col md={4}>
          <CountryDropdown onCountrySelect={handleCountrySelect} />
        </Col>
      </Row>

      <Row className="p-3">
        <Col md={7} className="chart-container border shadow-sm rounded px-5">
          <Chart
            chartData={chartData}
            selectedLine={selectedLine}
            handleLegendClick={handleLegendClick}
          />
        </Col>
        <Col md={5}>
          <ReportList chartData={reportData} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Tab.Container id="left-tabs-example" defaultActiveKey="subscription">
            <Nav
              variant="tabs"
              className="border-0"
              onSelect={(k) => k && setActiveKey(k)}
            >
              <Nav.Item>
                <Nav.Link eventKey="subscription" className="border-0">
                  Subscription
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="credits" className="border-0">
                  Credits
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="subscription">
                <PaymentTable
                  paymentRows={paymentRows}
                  paymentColumns={paymentColumns}
                  paginationModel={paginationModel}
                  setPaginationModel={setPaginationModel}
                  rowCount={rowCount}
                />
              </Tab.Pane>
              <Tab.Pane eventKey="credits">
                <CreditTable
                  paymentRows={paymentRows}
                  paymentColumns={CreditColumns}
                  paginationModel={paginationModel}
                  setPaginationModel={setPaginationModel}
                  rowCount={rowCount}
                />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentTransactions;