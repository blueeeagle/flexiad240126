// import { FC, useState, useEffect } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link, useNavigate } from "react-router-dom";
// import { postRequest, deleteRequest } from "../../../modules/auth/core/_requests";
// import { stringToDate } from "../../../../common/Date";
// import AlertBox from "../../../../common/AlertBox";
// import { Switch } from "@mui/material";
// import changeStatus from "../../../../common/ChangeStatus";
// import Swal from "sweetalert2";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
// import ReactPaginate from "react-paginate";

// const CountryList: FC = () => {
//   const [rowData, setRowData] = useState([]);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // Pagination States
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalRecords, setTotalRecords] = useState(1); // Total records from API
//   const rowsPerPage = 10; // Rows per page
//   const [itemsPerPage] = useState(10);
//   const navigate = useNavigate();

//   // Fetch paginated data
//   const getData = async (page: number = 0) => {
//     setLoading(true);
//     const countryData = await postRequest(
//       `/master/countries?page=${page + 1}&limit=${rowsPerPage}`,
//       ``
//     );

//     if (countryData?.data?.status === "ok") {
//       const { data, total } = countryData.data;
//       setRowData(data);
//       setTotalRecords(total); // Store total records from API
//     } else {
//       setRowData([]);
//       setTotalRecords(0);
//     }
//     setLoading(false);
//   };

//   const deleteCountry = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       await deleteRequest(`/master/country/` + ID).then(async (response) => {
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg(`Country has been deleted successfully`);
//           await getData(currentPage); // Refresh data on the current page
//         } else {
//           setIsFailed(true);
//           setErrorMsg(`Something Went Wrong`);
//         }
//       });
//     }
//   };

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   useEffect(() => {
//     getData(currentPage);
//   }, [currentPage]);

//   const handlePageClick = (data: { selected: number }) => {
//     setCurrentPage(data.selected);
//   };

//   const handleChangeStatus = async (id: any, status: any) => {
//     setLoading(true);
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/master/country/${id}`,
//     });
//     setLoading(false);

//     if (result) {
//       if (result.success) {
//         Swal.fire("Success", result.message, "success");
//         await getData(currentPage); // Update the list on the current page
//       } else {
//         Swal.fire("Error", result.message, "error");
//       }
//     } else {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   // Define columns for DataGrid
//   const columns: GridColDef[] = [
//     { field: "name", headerName: "Country Name", width: 200 },
//     { field: "dialCode", headerName: "Tele Code", width: 100 },
//     { field: "iso3", headerName: "Currency", width: 100 },
//     {
//       field: "hasState",
//       headerName: "Country Has State",
//       width: 150,
//       renderCell: (params: any) => (params.value ? "YES" : "NO"),
//     },
//     {
//       field: "updated_at",
//       headerName: "Updated On",
//       width: 200,
//       renderCell: (params: any) => stringToDate(params.row.updated_at),
//     },

//     {
//       field: "online",
//       headerName: "Online",
//       width: 200,
//       renderCell: (params: any) => {
//         const value = params.row.charges?.[0]?.value;
//         const type = params.row.charges?.[0]?.type; 
       
//         if (value === null || value === undefined) {
//           return "-";
//         }
        
//         if (type === 'percentage') {
//           return `${value}%`; 
//         }
    
//         return value; 
//       },
//     },
//     {
//       field: "logistics",
//       headerName: "Flexi Clean Logistics",
//       width: 200,
//       renderCell: (params: any) => {
//         const value = params.row.charges?.[1]?.value;
//         const type = params.row.charges?.[1]?.type;
//         console.log(type);
//         if (value === null || value === undefined) {
//           return "-";
//         }
    
//         if (type === 'percentage') {
//           return `${value}%`;
//         }
    
//         return value;
//       },
//     },
//     {
//       field: "pos",
//       headerName: "POS Subscription",
//       width: 200,
//       renderCell: (params: any) => {
//         const value = params.row.charges?.[2]?.value;
//         const type = params.row.charges?.[2]?.type;
//     console.log(type);
    
//         if (value === null || value === undefined) {
//           return "-";
//         }
    
//         if (type === 'percentage') {
//           return `${value}%`;
//         }
    
//         return value;
//       },
//     },
    

//     {
//       field: "is_active",
//       headerName: "Status",
//       width: 100,
//       renderCell: (params: any) => (
//         <Switch
//           checked={params.value || false}
//           onChange={() => handleChangeStatus(params.row._id, params.value)}
//           inputProps={{ "aria-label": "controlled" }}
//         />
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 100,
//       headerClassName: "sticky-header",
//       renderCell: (params: any) => (
//         <div className="action-dropdown">
//           <select
//             className="form-select"
//             onChange={(e) => {
//               const selectedValue = e.target.value;
//               if (selectedValue === "statusUpdate") {
//                 navigate(`/country/${params.row._id}`);
//               } else if (selectedValue === "paymentUpdate") {
//                 deleteCountry(params.row._id);
//               }
//               e.target.value = "";
//             }}
//             defaultValue=""
//           >
//             <option value="" disabled>
//               ...
//             </option>
//             <option value="statusUpdate">Edit</option>
//             <option value="paymentUpdate">Delete</option>
//           </select>
//         </div>
//       ),
//     },
//   ];
// console.log(rowData);

//   return (
//     <>
//       <PageTitle>COUNTRY</PageTitle>
//       {loading ? (
//         <div
//           className="text-center"
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             height: "50vh",
//           }}
//         >
//           <Lottie
//             animationData={loaderAnimation}
//             loop={true}
//             style={{
//               width: 150,
//               height: 150,
//               filter: "hue-rotate(200deg)",
//             }}
//           />
//         </div>
//       ) : (
//         <div className="row g-5 g-xl-8">
//           <div>
//             <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
//               <div>
//                 <h3 className="card-title align-items-start flex-column">
//                   <span className="card-label fw-bold fs-3 mb-1">
//                     Country List
//                   </span>
//                 </h3>
//               </div>

//               <div className="card-toolbar">
//                 <Link
//                   to="/country/create"
//                   className="btn btn-sm btn-light-primary"
//                 >
//                   <KTIcon iconName="plus" className="fs-3" />
//                   New Country
//                 </Link>
//               </div>
//             </div>
//             <div className="card-body py-3">
//               <div>
//                 <DataGrid
//                   rows={rowData}
//                   columns={columns}
//                   getRowId={(row: any) => row._id}
//                   autoHeight={true}
//                   hideFooter={true}
//                   loading={loading}
//                   sx={{
//                     "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus":
//                       {
//                         outline: "none",
//                         border: "none",
//                         backgroundColor: "transparent",
//                       },
//                     "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible":
//                       {
//                         outline: "none",
//                         border: "none",
//                         backgroundColor: "transparent",
//                       },
//                     "& .MuiDataGrid-cell:active": {
//                       outline: "none",
//                       border: "none",
//                     },
//                   }}
//                 />
//               </div>
//             </div>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 alignItems: "center",
//                 marginTop: "20px",
//                 padding: "10px",
//                 backgroundColor: "#f8f9fa",
//                 borderRadius: "8px",
//                 flexWrap: "wrap",
//               }}
//             >
//               <ReactPaginate
//                 pageCount={Math.ceil(rowsPerPage / itemsPerPage)} // Calculate total pages
//                 onPageChange={handlePageClick}
//                 breakLabel="..."
//                 previousLabel="←" // Use arrow or any other label for previous
//                 nextLabel="→" // Use arrow or any other label for next
//                 containerClassName="pagination" // Apply CSS class for styling
//                 pageClassName="page-item"
//                 activeClassName="active"
//                 previousClassName="previous"
//                 nextClassName="next"
//                 pageLinkClassName="page-link"
//                 previousLinkClassName="previous-link"
//                 nextLinkClassName="next-link"
//               />
//             </div>
//           </div>
//         </div>
//       )}
//      {isSuccess && (
//               <AlertBox redirectUrl={null} close={closeAlert} type={`success`}>
//                 {successMsg}
//               </AlertBox>
//             )}
//             {isFailed && (
//               <AlertBox redirectUrl={null} close={closeAlert} type={`error`}>
//                 {errorMsg}
//               </AlertBox>
//             )}
//     </>
//   );
// };

// export default CountryList;

import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import { postRequest, deleteRequest } from "../../../modules/auth/core/_requests";
import { stringToDate } from "../../../../common/Date";
import AlertBox from "../../../../common/AlertBox";
import { Switch } from "@mui/material";
import changeStatus from "../../../../common/ChangeStatus";
import Swal from "sweetalert2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import ReactPaginate from "react-paginate";
import { getMastersPermissions } from "../../../utils/getPermissions";

const CountryList: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const rowsPerPage = 10;
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  // Permissions
  const permissions = getMastersPermissions();
    const currencyPerms = permissions.subMenu["Country"] || [];
  const canView = currencyPerms.includes("view");
  const canEdit = currencyPerms.includes("edit");
  const canDelete = currencyPerms.includes("delete");
  const canCreate = currencyPerms.includes("create");

  console.log("CountryList Permissions:", { canView, canEdit, canDelete, canCreate });

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

  // Fetch paginated data
  const getData = async (page: number = 0) => {
    setLoading(true);
    try {
      const countryData = await postRequest(
        `/master/countries?page=${page + 1}&limit=${rowsPerPage}`,
        ``
      );
      if (countryData?.data?.status === "ok") {
        const { data, total } = countryData.data;
        setRowData(data);
        setTotalRecords(total);
      } else {
        setRowData([]);
        setTotalRecords(0);
      }
    } catch (error) {
      console.error("Error fetching countries:", error);
      setIsFailed(true);
      setErrorMsg("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const deleteCountry = async (ID: string) => {
    if (!canDelete) return;
    if (window.confirm("Are you sure to delete this record?")) {
      setLoading(true);
      try {
        const response = await deleteRequest(`/master/country/${ID}`);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg("Country has been deleted successfully");
          await getData(currentPage);
        } else {
          setIsFailed(true);
          setErrorMsg("Something Went Wrong");
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg("Error deleting country");
      } finally {
        setLoading(false);
      }
    }
  };

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleChangeStatus = async (id: any, status: any) => {
    if (!canEdit) return;
    setLoading(true);
    const result = await changeStatus({
      id,
      status,
      Url: `/master/country/${id}`,
    });
    setLoading(false);
    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        await getData(currentPage);
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Base columns (without actions)
  const baseColumns: GridColDef[] = [
    { field: "name", headerName: "Country Name", width: 200 },
    { field: "dialCode", headerName: "Tele Code", width: 100 },
    { field: "iso3", headerName: "Currency", width: 100 },
    {
      field: "hasState",
      headerName: "Country Has State",
      width: 150,
      renderCell: (params: any) => (params.value ? "YES" : "NO"),
    },
    {
      field: "updated_at",
      headerName: "Updated On",
      width: 200,
      renderCell: (params: any) => stringToDate(params.row.updated_at),
    },
    {
      field: "online",
      headerName: "Online",
      width: 200,
      renderCell: (params: any) => {
        const value = params.row.charges?.[0]?.value;
        const type = params.row.charges?.[0]?.type;
        if (value === null || value === undefined) return "-";
        if (type === 'percentage') return `${value}%`;
        return value;
      },
    },
    {
      field: "logistics",
      headerName: "Flexi Clean Logistics",
      width: 200,
      renderCell: (params: any) => {
        const value = params.row.charges?.[1]?.value;
        const type = params.row.charges?.[1]?.type;
        if (value === null || value === undefined) return "-";
        if (type === 'percentage') return `${value}%`;
        return value;
      },
    },
    {
      field: "pos",
      headerName: "POS Subscription",
      width: 200,
      renderCell: (params: any) => {
        const value = params.row.charges?.[2]?.value;
        const type = params.row.charges?.[2]?.type;
        if (value === null || value === undefined) return "-";
        if (type === 'percentage') return `${value}%`;
        return value;
      },
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 100,
      renderCell: (params: any) => (
        <Switch
          checked={params.value || false}
          onChange={() => handleChangeStatus(params.row._id, params.value)}
          disabled={!canEdit}
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
  ];

  // Add Actions column only if user can edit or delete
  if (canEdit || canDelete) {
    baseColumns.push({
      field: "actions",
      headerName: "Actions",
      width: 100,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue === "edit" && canEdit) {
                navigate(`/country/${params.row._id}`);
              } else if (selectedValue === "delete" && canDelete) {
                deleteCountry(params.row._id);
              }
              e.target.value = "";
            }}
            defaultValue=""
          >
            <option value="" disabled>...</option>
            {canEdit && <option value="edit">Edit</option>}
            {canDelete && <option value="delete">Delete</option>}
          </select>
        </div>
      ),
    });
  }

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  return (
    <>
      <PageTitle>COUNTRY</PageTitle>
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
        <div className="row g-5 g-xl-8">
          <div>
            <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
              <div>
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">
                    Country List
                  </span>
                </h3>
              </div>
              {canCreate && (
                <div className="card-toolbar">
                  <Link
                    to="/country/create"
                    className="btn btn-sm btn-light-primary"
                  >
                    <KTIcon iconName="plus" className="fs-3" />
                    New Country
                  </Link>
                </div>
              )}
            </div>
            <div className="card-body py-3">
              <div>
                <DataGrid
                  rows={rowData}
                  columns={baseColumns}
                  getRowId={(row: any) => row._id}
                  autoHeight={true}
                  hideFooter={true}
                  loading={loading}
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
                pageCount={totalPages}
                onPageChange={handlePageClick}
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
          </div>
        </div>
      )}
      {isSuccess && (
        <AlertBox redirectUrl={null} close={closeAlert} type="success">
          {successMsg}
        </AlertBox>
      )}
      {isFailed && (
        <AlertBox redirectUrl={null} close={closeAlert} type="error">
          {errorMsg}
        </AlertBox>
      )}
    </>
  );
};

export default CountryList;