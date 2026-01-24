// import { FC, useCallback, useEffect, useState } from "react";
// import { PageTitle } from "../../../_metronic/layout/core";
// import { DataGrid } from "@mui/x-data-grid";
// import { postRequest } from "../../modules/auth/core/_requests";
// import { Link, useNavigate } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import { IconContext } from "react-icons";
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

// interface Currency {
//     _id: string;
//     currency: string;
//     currencyCode: string;
//     currencySymbol: string;
//     decimalPoints: number;
// }

// interface Customer {
//     _id: string;
//     firstName: string;
//     lastName: string;
// }

// interface BannerData {
//     _id: string;
//     giftCardTitle: string;
//     amount: number;
//     noOfCustomers: number;
//     value: number;
//     startDate: string;
//     endDate: string; // Add endDate field as string for date
//     sortNo: number;
//     is_active: boolean;
//     currencyId: Currency; // Updated Currency type
//     customerId?: Customer[]; // Updated to array for customer objects
//     description?: string; // Optional description field
//     updated_at: string; // Updated to string to store date as formatted
//     month?: number; // Optional month field
//     periodType?: string; // Optional periodType field
//     year?: number; // Optional year field
// }




// const CustomerGiftCards: FC = () => {
//     const [rowData, setRowData] = useState<BannerData[]>([]);

//     const [errorMsg, setErrorMsg] = useState(``);
//     const [isFailed, setIsFailed] = useState(false);
//     const token = localStorage.getItem("token");
//     const [loading, setLoading] = useState(true);
//     const navigate = useNavigate();
//     const pageSize = 10;
//     const [total, setTotal] = useState<number>(0);
//     const [page, setPage] = useState<number>(0);
//     const [apiResponse, setApiResponse] = useState(null);


//     const getData = useCallback(async () => {
//         setLoading(true);
//         const bannerData = await postRequest(
//             `/activities/giftCards?pageIndex=${page}&pageSize=${pageSize}`,
//             ""
//         );
//         console.log(bannerData.data?.totalCount);
//         setTotal(bannerData?.data?.totalCount)
//         if (bannerData?.data?.status === "ok") {
//             const formattedData = bannerData.data.data.map((item: BannerData) => {
//                 const customerId =
//                     item.customerId && Array.isArray(item.customerId)
//                         ? item.customerId[0]?._id
//                         : null;

//                 const currencyId =
//                     item.currencyId && item.currencyId._id ? item.currencyId._id : null;

//                 // Format dates to "DD/MM/YYYY"
//                 const formattedStartDate = formatDate(item.startDate);
//                 const formattedEndDate = formatDate(item.endDate);
//                 const formattedUpdatedAt = formatDate(item.updated_at);

//                 return {
//                     id: item._id,
//                     giftCardTitle: item.giftCardTitle,
//                     amount: item.amount || 0,
//                     noOfCustomers: item.noOfCustomers || 0,
//                     value: item.value || 0,
//                     startDate: formattedStartDate,  // Store formatted startDate here
//                     endDate: formattedEndDate,  // Store formatted endDate here
//                     sortNo: item.sortNo || 0,
//                     isActive: item.is_active,
//                     currency: item.currencyId?.currencySymbol || "",
//                     decimalPoints: item.currencyId?.decimalPoints || 0,
//                     customerId: customerId,
//                     currencyId: currencyId,
//                     description: item.description || "",
//                     updated_at: formattedUpdatedAt,  // Add formatted updated_at here
//                     month: item.month || null,
//                     periodType: item.periodType || null,
//                     year: item.year || null,
//                 };
//             });

//             setApiResponse(bannerData.data);
//             setRowData(formattedData);
//         } else {
//             setIsFailed(true);
//             setErrorMsg("Failed to fetch gift cards.");
//         }
//         setLoading(false);
//     }, [page]);

//     useEffect(() => {
//         getData()
//     }, [getData])

//     const columns = [
//         {
//             field: "giftCardTitle",
//             headerName: "Gift Card Title",
//             width: 200,
//             renderCell: (params: any) => (
//                 <Link
//                     to={`/activities/giftCard/${params.row.id}`}
//                     state={params.row}
//                     onClick={() => {
//                         localStorage.setItem(
//                             "selectedGiftCard",
//                             JSON.stringify(params.row)
//                         );
//                     }}
//                 >
//                     {params.value}
//                 </Link>
//             ),
//         },
//         {
//             field: "amount",
//             headerName: "Free Credits (BHD)",
//             width: 200,
//             renderCell: (params: any) =>
//                 `${params.row.amount.toFixed(params.row.decimalPoints)} ${params.row.currency
//                 }`,
//         },
//         {
//             field: "noOfCustomers",
//             headerName: "No Of Customers",
//             width: 150,
//             renderCell: (params: any) => "10 TC",
//         },
//         {
//             field: "updated_at",
//             headerName: "Created On",
//             width: 150,
//             renderCell: (params: any) => {
//                 return params.row.updated_at || ""; // Display the formatted date
//             },
//         },

//         {
//             field: "sortNo",
//             headerName: "Sort No",
//             width: 150,
//             renderCell: (params: any) => "1 TC",
//         }


//     ];
//     return (
//         <>
//             <PageTitle>GIFT CARDS</PageTitle>

//             <div className='card mb-8'>

//                 <div className='card-body bg-light-warning'>
//                     <div className='d-flex align-items-center'>
//                         <div className='col-md-12'>
//                             <div className='flex-grow-1'>
//                                 <span className='text-muted fw-bold d-block'>15BHD</span>
//                                 <span className='text-muted fw-semibold d-block'>CREDIT RECEIVED</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             <h3 className='card-title align-items-start flex-column mb-4'>
//                 <span className='card-label fw-bold fs-3 mb-1'>TRANSACTIONS</span>
//             </h3>

//             <div className='card mb-8'>
//                 <DataGrid
//                     rows={rowData}
//                     columns={columns}
//                     hideFooter={true}
//                     autoHeight={true}
//                 />

//                 <div className="pagewrapper">
//                     <ReactPaginate
//                         containerClassName="pagination"
//                         pageClassName="page-item"
//                         activeClassName="active"
//                         onPageChange={(event) => setPage(event.selected)}
//                         pageCount={Math.ceil(total / pageSize)}
//                         breakLabel="..."
//                         previousLabel={
//                             <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
//                                 <AiFillLeftCircle />
//                             </IconContext.Provider>
//                         }
//                         nextLabel={
//                             <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
//                                 <AiFillRightCircle />
//                             </IconContext.Provider>
//                         }
//                     />
//                 </div>

//             </div>


//         </>
//     )
// }

// export default CustomerGiftCards;



// import { FC, useCallback, useEffect, useState } from "react";
// import { PageTitle } from "../../../_metronic/layout/core";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { postRequest } from "../../modules/auth/core/_requests";
// import { Link } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import { IconContext } from "react-icons";
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
// import CountryDropdown from "./CountryDropdown";
// import { Col } from "react-bootstrap";
// import axios from "axios";

// interface Currency {
//   _id: string;
//   currency: string;
//   currencyCode: string;
//   currencySymbol: string;
//   decimalPoints: number;
// }

// interface Customer {
//   _id: string;
//   firstName: string;
//   lastName: string;
// }

// interface BannerData {
//   _id: string;
//   giftCardTitle: string;
//   amount: number;
//   noOfCustomers: number;
//   value: number;
//   startDate: string;
//   endDate: string;
//   sortNo: number;
//   is_active: boolean;
//   currencyId: Currency;
//   customerId?: Customer[];
//   description?: string;
//   updated_at: string;
//   month?: number;
//   periodType?: string;
//   year?: number;
// }

// const formatDate = (dateStr: string): string => {
//   if (!dateStr) return "";
//   const date = new Date(dateStr);
//   return `${date.getDate().toString().padStart(2, "0")}/${
//     (date.getMonth() + 1).toString().padStart(2, "0")
//   }/${date.getFullYear()}`;
// };

// const CustomerGiftCards: FC = () => {
//   const [rowData, setRowData] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [total, setTotal] = useState<number>(0);
//   const [page, setPage] = useState<number>(0);
//   const [countryId, setCountryId] = useState("6566946881f360c33361e259");
//   const pageSize = 10;
//  const handleCountrySelect = (countryId: string) => {
//     setCountryId(countryId);
//   };


//   const getData = useCallback(async () => {
//     setLoading(true);
//     try {
//       const bannerData = await postRequest(
//         `/activities/giftCards?pageIndex=${page}&pageSize=${pageSize}`,
//         ""
//       );

//       if (bannerData?.data?.status === "ok") {
//         const formattedData = bannerData.data.data.map((item: BannerData) => {
//           return {
//             id: item._id,
//             giftCardTitle: item.giftCardTitle,
//             amount: item.amount || 0,
//             noOfCustomers: item.noOfCustomers || 0,
//             value: item.value || 0,
//             startDate: formatDate(item.startDate),
//             endDate: formatDate(item.endDate),
//             sortNo: item.sortNo || 0,
//             isActive: item.is_active,
//             currency: item.currencyId?.currencySymbol || "",
//             decimalPoints: item.currencyId?.decimalPoints || 2,
//             customerId: item.customerId?.[0]?._id || "",
//             currencyId: item.currencyId?._id || "",
//             description: item.description || "",
//             updated_at: formatDate(item.updated_at),
//             month: item.month || null,
//             periodType: item.periodType || null,
//             year: item.year || null,
//           };
//         });

//         setRowData(formattedData);
//         setTotal(bannerData.data?.totalCount || 0);
//       } else {
//         console.error("Failed to fetch gift cards.");
//       }
//     } catch (err) {
//       console.error("Error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }, [page]);
// const customerId='6830292ee7055380921ec75f'
// ///payment/gifts/:customerId/:countryId?pageIndex=0&pageSize=10
//  const getCreditDetails = useCallback(async () => {
//   setLoading(true);
//   try {
//     const bannerData = await axios.get(
//       `${process.env.REACT_APP_API_URL}/payment/gifts/${customerId}/${countryId}`,
//       {
//         params: {
//           pageIndex: page,
//           pageSize: pageSize,
//         },
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
//     console.log(bannerData.data);
//   } catch (err) {
//     console.error("Error:", err);
//   } finally {
//     setLoading(false);
//   }
// }, [page, customerId, countryId, pageSize]);


// useEffect(()=>{
//     getData();
//     getCreditDetails();
// },[getCreditDetails, getData])

//   const columns: GridColDef[] = [
//     {
//       field: "giftCardTitle",
//       headerName: "Gift Card Title",
//       width: 200,
//       renderCell: (params) => (
//         <Link
//           to={`/activities/giftCard/${params.row.id}`}
//           state={params.row}
//           onClick={() =>
//             localStorage.setItem("selectedGiftCard", JSON.stringify(params.row))
//           }
//         >
//           {params.value}
//         </Link>
//       ),
//     },
//     {
//       field: "amount",
//       headerName: "Free Credits",
//       width: 200,
//       renderCell: (params) =>
//         `${params.row.amount.toFixed(params.row.decimalPoints)} ${params.row.currency}`,
//     },
//     {
//       field: "noOfCustomers",
//       headerName: "No Of Customers",
//       width: 150,
//       renderCell: () => "10 TC", // Replace with dynamic if needed
//     },
//     {
//       field: "updated_at",
//       headerName: "Created On",
//       width: 150,
//     },
//     {
//       field: "sortNo",
//       headerName: "Sort No",
//       width: 150,
//       renderCell: () => "1 TC", // Replace with dynamic if needed
//     },
//   ];

//   return (
//     <>
//       <PageTitle>GIFT CARDS</PageTitle>

//       <div className="card mb-8">
//         <div className="card-body bg-light-warning">
//           <div className="d-flex align-items-center">
//             <div className="col-md-12">
//               <div className="flex-grow-1">
//                 <span className="text-muted fw-bold d-block">15 BHD</span>
//                 <span className="text-muted fw-semibold d-block">CREDIT RECEIVED</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <h3 className="card-title align-items-start flex-column mb-4">
//         <span className="card-label fw-bold fs-3 mb-1">TRANSACTIONS</span>
//       </h3>
//  <Col md={4}>
//           <CountryDropdown onCountrySelect={handleCountrySelect} />
//         </Col>

//       <div className="card mb-8">
//         <DataGrid
//           rows={rowData}
//           columns={columns}
//           hideFooter={true}
//           autoHeight
//           loading={loading}
//         />

//         <div className="pagewrapper">
//           <ReactPaginate
//             containerClassName="pagination"
//             pageClassName="page-item"
//             activeClassName="active"
//             onPageChange={(event) => setPage(event.selected)}
//             pageCount={Math.ceil(total / pageSize)}
//             breakLabel="..."
//             previousLabel={
//               <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
//                 <AiFillLeftCircle />
//               </IconContext.Provider>
//             }
//             nextLabel={
//               <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
//                 <AiFillRightCircle />
//               </IconContext.Provider>
//             }
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomerGiftCards;


import { FC, useCallback, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { postRequest } from "../../modules/auth/core/_requests";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import CountryDropdown from "./CountryDropdown";
import { Col } from "react-bootstrap";
import axios from "axios";

interface Currency {
  _id: string;
  currency: string;
  currencyCode: string;
  currencySymbol: string;
  decimalPoints: number;
}

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
}

interface BannerData {
  _id: string;
  giftCardTitle: string;
  amount: number;
  noOfCustomers: number;
  value: number;
  startDate: string;
  endDate: string;
  sortNo: number;
  is_active: boolean;
  currencyId: Currency;
  customerId?: Customer[];
  description?: string;
  updated_at: string;
  month?: number;
  periodType?: string;
  year?: number;
}

const formatDate = (dateStr: string): string => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}/${date.getFullYear()}`;
};

const CustomerGiftCards: FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const [rowData, setRowData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [total, setTotal] = useState<number>(0);
  const [credits, setCredits] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [countryId, setCountryId] = useState("");
  const [currencyId, setCurrencyId] = useState("");

  const pageSize = 10;

  const handleCountrySelect = (selection: { countryId: string; currencyId: string }) => {
    setCountryId(selection.countryId);
    setCurrencyId(selection.currencyId);
  };

  const getData = useCallback(async () => {
    if (!customerId || !currencyId) return;

    setLoading(true);
    try {
      const response = await postRequest(
        `/activities/giftCards?pageIndex=${page}&pageSize=${pageSize}&customerId=${customerId}&currencyId=${currencyId}`,
        ""
      );

      if (response?.data?.status === "ok") {
        const formattedData = response.data.data.map((item: BannerData) => ({
          id: item._id,
          giftCardTitle: item.giftCardTitle,
          amount: item.amount || 0,
          noOfCustomers: item.noOfCustomers || 0,
          value: item.value || 0,
          startDate: formatDate(item.startDate),
          endDate: formatDate(item.endDate),
          sortNo: item.sortNo || 0,
          isActive: item.is_active,
          currency: item.currencyId?.currencySymbol || "",
          decimalPoints: item.currencyId?.decimalPoints || 2,
          customerId: item.customerId?.[0]?._id || "",
          currencyId: item.currencyId?._id || "",
          description: item.description || "",
          updated_at: formatDate(item.updated_at),
          month: item.month || null,
          periodType: item.periodType || null,
          year: item.year || null,
        }));

        setRowData(formattedData);
        setTotal(response.data?.totalCount || 0);
      } else {
        console.error("❌ Failed to fetch gift cards.");
      }
    } catch (err) {
      console.error("❌ Error:", err);
    } finally {
      setLoading(false);
    }
  }, [currencyId, customerId, page]);

  const getCreditDetails = useCallback(async () => {
    if (!customerId || !countryId) return;

    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const response = await axios.get(
        `https://adminapi.flexiclean.me/api/v1/payment/gifts/${customerId}/${countryId}`,
        {
          params: {
            pageIndex: page,
            pageSize: pageSize,
          },
          headers,
        }
      );

      setCredits(response.data?.data?.totalAmount || 0);
    } catch (err: any) {
      console.error("❌ Credit Fetch Error:", err?.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }, [page, customerId, countryId, pageSize]);

  // Fetch gift card list when currencyId is set
  useEffect(() => {
    if (currencyId && customerId) {
      getData();
    }
  }, [getData]);

  // Fetch credit summary when countryId changes
  useEffect(() => {
    if (countryId && customerId) {
      getCreditDetails();
    }
  }, [countryId, customerId, getCreditDetails]);

  const columns: GridColDef[] = [
    {
      field: "giftCardTitle",
      headerName: "Gift Card Title",
      width: 200,
      renderCell: (params) => (
        <Link
          to={`/activities/giftCard/${params.row.id}`}
          state={params.row}
          onClick={() =>
            localStorage.setItem("selectedGiftCard", JSON.stringify(params.row))
          }
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "amount",
      headerName: "Free Credits",
      width: 200,
      renderCell: (params) =>
        `${params.row.amount.toFixed(params.row.decimalPoints)} ${params.row.currency}`,
    },
    {
      field: "noOfCustomers",
      headerName: "No Of Customers",
      width: 150,
      renderCell: () => "10 TC", // Static or update dynamically
    },
    {
      field: "updated_at",
      headerName: "Created On",
      width: 150,
    },
    {
      field: "sortNo",
      headerName: "Sort No",
      width: 150,
      renderCell: () => "1 TC", // Static or update dynamically
    },
  ];

  return (
    <>
      <PageTitle>GIFT CARDS</PageTitle>

      <Col md={4}>
        <CountryDropdown onCountrySelect={handleCountrySelect} />
      </Col>

      <div className="card mb-8">
        <div className="card-body bg-light-warning">
          <div className="d-flex align-items-center">
            <div className="col-md-12">
              <div className="flex-grow-1">
                <span className="text-muted fw-bold d-block">{credits} BHD</span>
                <span className="text-muted fw-semibold d-block">CREDIT RECEIVED</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h3 className="card-title align-items-start flex-column mb-4">
        <span className="card-label fw-bold fs-3 mb-1">TRANSACTIONS</span>
      </h3>

      <div className="card mb-8">
        <DataGrid
          rows={rowData}
          columns={columns}
          hideFooter={true}
          autoHeight
          loading={loading}
        />

        <div className="pagewrapper">
          <ReactPaginate
            containerClassName="pagination"
            pageClassName="page-item"
            activeClassName="active"
            onPageChange={(event) => setPage(event.selected)}
            pageCount={Math.ceil(total / pageSize)}
            breakLabel="..."
            previousLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillLeftCircle />
              </IconContext.Provider>
            }
            nextLabel={
              <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
                <AiFillRightCircle />
              </IconContext.Provider>
            }
          />
        </div>
      </div>
    </>
  );
};

export default CustomerGiftCards;
