// import { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link } from "react-router-dom";
// import { Switch } from "@mui/material";
// import { stringToDate } from "../../../../common/Date";
// import Swal from "sweetalert2";
// import changeStatus from "../../../../common/ChangeStatus";
// import {
//   deleteRequest,
//   postRequest,
// } from "../../../modules/auth/core/_requests";
// import AlertBox from "../../../../common/AlertBox";

// const Discountlist: FC = () => {
//   const [rowData, setRowData] = useState([]);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);

//   const deleteBanner = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       await deleteRequest(`/activities/banner/` + ID).then(async (response) => {
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg(`Gift Card has been deleted successfully`);
//           await getData();
//         } else {
//           setIsFailed(true);
//           setErrorMsg(`Something Went Wrong`);
//         }
//       });
//     }
//   };

//   const getData = async () => {
//     const bannerData = await postRequest(
//       `/activities/banners?pageIndex=0&pageSize=10`,
//       ``
//     );
//     if (bannerData?.data?.status === "ok") {
//       setRowData(bannerData?.data?.data);
//     }
//   };

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   useEffect(() => {
//     async function loadData() {
//       await getData();
//     }

//     loadData();
//   }, []);

//   const handleChangeStatus = async (id: any, status: any) => {
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/activities/banner/status/${id}`,
//     });

//     if (result) {
//       if (result.success) {
//         Swal.fire("Success", result.message, "success");
//         getData(); // Update the list if necessary
//       } else {
//         Swal.fire("Error", result.message, "error");
//       }
//     } else {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };
//   return (
//     <>
//       <PageTitle>DISCOUNTS</PageTitle>

//       <div className="row g-5 g-xl-8">
//         <div className={`card `}>
//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title align-items-start flex-column">
//               <span className="card-label fw-bold fs-3 mb-1">
//                 Discount List
//               </span>
//             </h3>
//             <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a user"
//             >
//               <Link
//                 to={`/activities/discount/create`}
//                 className="btn btn-sm btn-light-primary"
//               >
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New Discount
//               </Link>
//             </div>
//           </div>
//           <div className="card-body py-3">
//             <div className="table-responsive">
//               <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//                 <thead>
//                   <tr className="fw-bold text-muted">
//                     <th className="min-w-100px">Promo Title</th>
//                     <th className="min-w-200px">Promo Code</th>
//                     <th className="min-w-100px">Offer Type</th>
//                     <th className="min-w-100px">Value (BHD)</th>
//                     <th className="min-w-100px">Created On</th>
//                     <th className="min-w-150px">Sort No</th>
//                     <th className="min-w-100px">Status</th>
//                     <th className="min-w-100px text-end">Options</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rowData?.length > 0 ? (
//                     rowData.map((result: any) => {
//                       return (
//                         <tr key={result?._id}>
//                           <td>
//                             <Link
//                               to={`/activities/banner/${result?._id}`}
//                               state={result}
//                             >
//                               {result?._id}
//                             </Link>
//                           </td>
//                           <td>OFF100</td>
//                           <td>First Order</td>
//                           <td>100 BHD</td>
//                           <td>{stringToDate(result?.updated_at)}</td>
//                           <td>{result?.sortNo}</td>
//                           <td>
//                             <Switch
//                               checked={result?.is_active || false}
//                               onChange={() =>
//                                 handleChangeStatus(
//                                   result?._id,
//                                   result?.is_active
//                                 )
//                               }
//                               inputProps={{ "aria-label": "controlled" }}
//                             />
//                           </td>
//                           <td>
//                             <div className="d-flex justify-content-end flex-shrink-0">
//                               <Link
//                                 to={`/activities/banner/${result?._id}`}
//                                 state={result}
//                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
//                               >
//                                 <KTIcon iconName="pencil" className="fs-3" />
//                               </Link>
//                               <span
//                                 onClick={(e) => deleteBanner(result?._id)}
//                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
//                               >
//                                 <KTIcon iconName="trash" className="fs-3" />
//                               </span>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td>No Package Found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isSuccess && (
//         <AlertBox redirectUrl={null} close={closeAlert} type={`success`}>
//           {successMsg}
//         </AlertBox>
//       )}
//       {isFailed && (
//         <AlertBox redirectUrl={null} close={closeAlert} type={`error`}>
//           {errorMsg}
//         </AlertBox>
//       )}
//     </>
//   );
// };

// export default Discountlist;
import { FC, useCallback, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import { stringToDate } from "../../../../common/Date";
import Swal from "sweetalert2";
import changeStatus from "../../../../common/ChangeStatus";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import {
  deleteRequest,
  postRequest,
} from "../../../modules/auth/core/_requests";
import AlertBox from "../../../../common/AlertBox";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";


interface BannerData {
  _id: string;
  promoTitle: string;
  promoCode: string;
  offerType: string;
  orderValue: number;
  updated_at: string;
  sortNo: number;
  is_active: boolean;
}

const Discountlist: FC = () => {
  const [rowData, setRowData] = useState<BannerData[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

 const pageSize = 10;
  const deleteBanner = async (ID: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      await deleteRequest(`/activities/discount/` + ID).then(async (response) => {
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Gift Card has been deleted successfully`);
          await getData();
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      });
    }
  };

  const getData =useCallback( async () => {
    setLoading(true); // Set loading to true before fetching data
    try {
      const bannerData = await postRequest(
        `/activities/discounts?pageIndex=${page}&pageSize=${pageSize}`,
        ``
      );
       
       setTotal(bannerData?.data?.totalCount)
       console.log(bannerData.data.data);
       
      if (bannerData?.data?.status === "ok") {
        
        const formattedData = bannerData.data.data.map((item: any) => ({
        
          
          id: item._id,
          postFrom: item.postFrom,
          companyName: item.companyId?.[0]?.companyName, // Company name
          companyId: item.companyId?.[0]?._id, // Company ID
          promoTitle: item.promoTitle,
          promoCode: item.promoCode,
          offerType: item.offerType,
          orderValue: `${item.orderValue >= 100 ? item.orderValue.toFixed(3) : item.orderValue.toFixed(2)} ${item?.currencyId?.currencySymbol||""} `, // Format the order value
          noOfCoupons: item.noOfCoupons,
          customerUsageLimit: item.customerUsageLimit,
          discountType: item.discountType,
          discountAmt: item.discountAmt,
          discountPercentage: item.discountPercentage,
          startDate: formatDate(item.startDate), // Format start date
          endDate: formatDate(item.endDate), // Format end date
          applicableFor: item.applicableFor,
          imgUrl: item.imgUrl,
          sortNo: item.sortNo,
          isActive: item.is_active,
          isDeleted: item.is_deleted,
          createdBy: item.created_by,
          updatedAt: formatDate(item.updated_at), // Format updated_at date
        }));
   console.log(formattedData);
   
        setRowData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsFailed(true);
      setErrorMsg("Error fetching data");
    } finally {
      setLoading(false); // Set loading to false after data is fetched
    }
  },[page])
  
  

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns: GridColDef[] = [
    {
      field: "promoTitle",
      headerName: "Promo Title",
      minWidth: 150,
      renderCell: (params: any) => (
        <Link 
          to={`/activities/discount/${params.row.id}`}  // Correct URL path
          state={params.row}  // Pass the full row data if needed in the target page
        >
          {params.row.promoTitle} {/* Display the promo title or any other value you want */}
        </Link>
      ),
    },    
    
    {
      field: "promoCode",
      headerName: "Promo Code",
      minWidth: 150,
     
    },
    // {
    //   field: "companyName", // New column for company name
    //   headerName: "Company Name",
    //   minWidth: 150,
    //   renderCell: (params: any) => (
    //     <div style={{ visibility: "hidden" }}>
    //       {params.row.companyId?.[0]?.companyName}
    //     </div>
    //   ),
    // },
    {
      field: "offerType",
      headerName: "Offer Type",
      minWidth: 100,
    
    },
    {
      field: "orderValue",
      headerName: "Value ",
      minWidth: 150,
    },
    {
      field: "updatedAt",
      headerName: "Created On",
      minWidth: 150,
    },
    { field: "sortNo", headerName: "Sort No", minWidth: 150 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.isActive || false}
          onChange={() =>
            handleChangeStatus(params.row.id, params.row.isActive)
          }
          inputProps={{ "aria-label": "controlled" }}
        />
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
              const selectedOption = e.target.value;
              
              if (selectedOption === "edit") {
                // Store full row data, including companyId, in localStorage
                const fullRowData = params.row;
                localStorage.setItem("selectedDiscountData", JSON.stringify(fullRowData));
    
                // Navigate to the edit page with state
                navigate(`/activities/discount/${params.row.id}`, {
                  state: fullRowData, // Pass full row data to the target page
                });
              } else if (selectedOption === "delete") {
                deleteBanner(params.row.id);
              }
    
              // Reset the select dropdown to default after selection
              e.target.value = "";
            }}
          >
            <option value="">...</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </div>
      ),
    }
    
    
  ];

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  useEffect(() => {
    async function loadData() {
      await getData();
    }

    loadData();
  }, [getData]);

  const handleChangeStatus = async (id: any, status: any) => {
    const result = await changeStatus({
      id,
      status,
      Url: `/activities/discount/67212e7ce6eb7ab651715f1d`,
    });

    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        getData(); // Update the list if necessary
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <>
      <PageTitle>DISCOUNTS</PageTitle>

      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5 d-flex justify-content-between mb-5">
            <div>
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Discount List
                </span>
              </h3>
            </div>

            <div
              className="card-toolbar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              title="Click to add a user"
            >
              <Link
                to={`/activities/discount/create`}
                className="btn btn-sm btn-light-primary"
              >
                <KTIcon iconName="plus" className="fs-3" />
                New Discount
              </Link>
            </div>
          </div>
          <div className="card-body py-3">
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
              <DataGrid
                rows={rowData}
                columns={columns}
                hideFooter={true}
                autoHeight={true}
                sx={{
                    "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
                      outline: "none",
                      border: "none",
                      backgroundColor: "transparent",
                    },
                    "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible": {
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
          </div>
        </div>
      </div>
   <div className="pagewrapper">
        <ReactPaginate
          containerClassName="pagination"
          pageClassName="page-item"
          activeClassName="active"
          onPageChange={(event) => setPage(event.selected)}
          pageCount={Math.ceil(total / pageSize)}
          breakLabel="..."
          previousLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
      </div>

      {isSuccess && (
        <AlertBox redirectUrl={null} close={closeAlert} type={`success`}>
          {successMsg}
        </AlertBox>
      )}
      {isFailed && (
        <AlertBox redirectUrl={null} close={closeAlert} type={`error`}>
          {errorMsg}
        </AlertBox>
      )}
    </>
  );
};

export default Discountlist;
