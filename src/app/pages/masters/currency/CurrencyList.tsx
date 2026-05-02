// import { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link, useNavigate } from "react-router-dom";
// import { postRequest } from "../../../modules/auth/core/_requests";
// import { stringToDate } from "../../../../common/Date";
// import { deleteRequest } from "../../../modules/auth/core/_requests";
// import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
// import AlertBox from "../../../../common/AlertBox";
// import { Switch } from "@mui/material";
// import Swal from "sweetalert2";
// import changeStatus from "../../../../common/ChangeStatus";
// import Lottie from "lottie-react";
// import ReactPaginate from "react-paginate";

// const CurrencyList: FC = () => {
//   const [rowData, setRowData] = useState([]); // Full data
//   const [currentPage, setCurrentPage] = useState(0); // Current page
//   const [itemsPerPage] = useState(10); // Items per page
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const getData = async () => {
//     setLoading(true);
//     const currencyData = await postRequest(`/master/currencies`, ``);
//     if (currencyData?.data?.status === "ok") {
//       setRowData(currencyData?.data?.data);
//     }
//     setLoading(false);
//   };

//   const deleteCurrency = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       await deleteRequest(`/master/currency/` + ID).then(async (response) => {
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg(`Currency has been deleted successfully`);
//           await getData();
//         } else {
//           setIsFailed(true);
//           setErrorMsg(`Something Went Wrong`);
//         }
//       });
//     }
//   };

//   const handleChangeStatus = async (id: string, status: boolean) => {
//     setLoading(true);
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/master/currency/${id}`,
//     });
//     setLoading(false);

//     if (result) {
//       if (result.success) {
//         Swal.fire("Success", result.message, "success");
//         getData();
//       } else {
//         Swal.fire("Error", result.message, "error");
//       }
//     } else {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   // Handle page change in pagination
//   const handlePageChange = ({ selected }: { selected: number }) => {
//     setCurrentPage(selected);
//   };

//   // Pagination logic
//   const paginatedData = rowData.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage
//   );

//   // Define columns for MUI DataGrid
//   const columns: GridColDef[] = [
//     { field: "currency", headerName: "Currency Title", minWidth: 200 },
//     { field: "currencyCode", headerName: "Currency Code", minWidth: 200 },
//     { field: "currencySymbol", headerName: "Currency Symbol", minWidth: 200 },
//     {
//       field: "updated_at",
//       headerName: "Updated On",
//       minWidth: 150,
//       renderCell: (params: any) => stringToDate(params.row.updated_at),
//     },
//     {
//       field: "is_active",
//       headerName: "Status",
//       minWidth: 100,
//       renderCell: (params: GridRenderCellParams) => (
//         <Switch
//           checked={params.value}
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
//                 navigate(`/currency/${params.row._id}`);
//               } else if (selectedValue === "paymentUpdate") {
//                 deleteCurrency(params.row._id);
//               }
//               e.target.value = ""; // Reset the value to the placeholder
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

//   return (
//     <>
//       <PageTitle>CURRENCIES</PageTitle>
//       <div className="row g-5 g-xl-8">
//         <div>
//           <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center mb-5">
//             <div>
//               <h3 className="card-title align-items-start flex-column">
//                 <span className="card-label fw-bold fs-3 mb-1">
//                   Currency List
//                 </span>
//               </h3>
//             </div>

//             <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a Currency"
//             >
//               <Link
//                 to="/currency/create"
//                 className="btn btn-sm btn-light-primary"
//               >
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New Currency
//               </Link>
//             </div>
//           </div>
//           <div className="card-body py-3">
//             <div>
//               {loading ? (
//                 <div
//                   className="text-center"
//                   style={{
//                     display: "flex",
//                     justifyContent: "center",
//                     alignItems: "center",
//                     height: "50vh",
//                   }}
//                 >
//                   <Lottie
//                     animationData={loaderAnimation}
//                     loop={true}
//                     style={{
//                       width: 150,
//                       height: 150,
//                       filter: "hue-rotate(200deg)",
//                     }}
//                   />
//                 </div>
//               ) : (
//                 <>
//                   <DataGrid
//                     rows={paginatedData} // Pass only the current page data
//                     columns={columns}
//                     getRowId={(row) => row._id}
//                     autoHeight={true}
//                     hideFooter={true}
//                     checkboxSelection={false}
//                     sx={{
//                       "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus":
//                         {
//                           outline: "none",
//                           border: "none",
//                           backgroundColor: "transparent",
//                         },
//                       "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible":
//                         {
//                           outline: "none",
//                           border: "none",
//                           backgroundColor: "transparent",
//                         },
//                       "& .MuiDataGrid-cell:active": {
//                         outline: "none",
//                         border: "none",
//                       },
//                     }}
//                   />
//                   {/* 
//                   <ReactPaginate
//                     pageCount={Math.ceil(rowData.length / itemsPerPage)}
//                     onPageChange={handlePageChange}
//                     containerClassName={"pagination"}
//                     previousLabel={"Previous"}
//                     nextLabel={"Next"}
//                     activeClassName={"active"}
//                     pageRangeDisplayed={3}
//                     marginPagesDisplayed={2}
//                     breakLabel={"..."}
//                   /> */}
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "flex-end",
//                       alignItems: "center",
//                       marginTop: "20px",
//                       padding: "10px",
//                       backgroundColor: "#f8f9fa",
//                       borderRadius: "8px",
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     <ReactPaginate
//                       pageCount={Math.ceil(rowData.length / itemsPerPage)}
//                       onPageChange={handlePageChange}
//                       breakLabel="..."
//                       previousLabel="←" // Use arrow or any other label for previous
//                       nextLabel="→" // Use arrow or any other label for next
//                       containerClassName="pagination" // Apply CSS class for styling
//                       pageClassName="page-item"
//                       activeClassName="active"
//                       previousClassName="previous"
//                       nextClassName="next"
//                       pageLinkClassName="page-link"
//                       previousLinkClassName="previous-link"
//                       nextLinkClassName="next-link"
//                     />
//                   </div>
//                 </>
//               )}
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

// export default CurrencyList;
import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import { postRequest } from "../../../modules/auth/core/_requests";
import { stringToDate } from "../../../../common/Date";
import { deleteRequest } from "../../../modules/auth/core/_requests";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import AlertBox from "../../../../common/AlertBox";
import { Switch } from "@mui/material";
import Swal from "sweetalert2";
import changeStatus from "../../../../common/ChangeStatus";
import Lottie from "lottie-react";
import ReactPaginate from "react-paginate";
import { getMastersPermissions } from "../../../utils/getPermissions";

const CurrencyList: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Permissions
  const permissions = getMastersPermissions();
  const currencyPerms = permissions.subMenu["Currencies"] || [];
  const canView = currencyPerms.includes("view");
  const canEdit = currencyPerms.includes("edit");
  const canDelete = currencyPerms.includes("delete");
  const canCreate = currencyPerms.includes("create");

  console.log("CurrencyList Permissions:", { canView, canEdit, canDelete, canCreate });

 

  const getData = async () => {
    setLoading(true);
    try {
      const currencyData = await postRequest(`/master/currencies`, ``);
      if (currencyData?.data?.status === "ok") {
        setRowData(currencyData?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching currencies:", error);
      setIsFailed(true);
      setErrorMsg("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const deleteCurrency = async (ID: string) => {
    if (!canDelete) return;
    if (window.confirm("Are you sure to delete this record?")) {
      setLoading(true);
      try {
        const response = await deleteRequest(`/master/currency/${ID}`);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg("Currency has been deleted successfully");
          await getData();
        } else {
          setIsFailed(true);
          setErrorMsg("Something Went Wrong");
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg("Error deleting currency");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChangeStatus = async (id: string, status: boolean) => {
    if (!canEdit) return;
    setLoading(true);
    const result = await changeStatus({
      id,
      status,
      Url: `/master/currency/${id}`,
    });
    setLoading(false);
    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        getData();
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  const paginatedData = rowData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Base columns (without actions)
  const baseColumns: GridColDef[] = [
    { field: "currency", headerName: "Currency Title", minWidth: 200 },
    { field: "currencyCode", headerName: "Currency Code", minWidth: 200 },
    { field: "currencySymbol", headerName: "Currency Symbol", minWidth: 200 },
    {
      field: "updated_at",
      headerName: "Updated On",
      minWidth: 150,
      renderCell: (params: any) => stringToDate(params.row.updated_at),
    },
    {
      field: "is_active",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          checked={params.value}
          onChange={() => handleChangeStatus(params.row._id, params.value)}
          disabled={!canEdit}
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
  ];

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
                navigate(`/currency/${params.row._id}`);
              } else if (selectedValue === "delete" && canDelete) {
                deleteCurrency(params.row._id);
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
  return (
    <>
      <PageTitle>CURRENCIES</PageTitle>
      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center mb-5">
            <div>
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Currency List
                </span>
              </h3>
            </div>
            {canCreate && (
              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Click to add a Currency"
              >
                <Link
                  to="/currency/create"
                  className="btn btn-sm btn-light-primary"
                >
                  <KTIcon iconName="plus" className="fs-3" />
                  New Currency
                </Link>
              </div>
            )}
          </div>
          <div className="card-body py-3">
            <div>
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
                <>
                  <DataGrid
                    rows={paginatedData}
                    columns={baseColumns}
                    getRowId={(row) => row._id}
                    autoHeight={true}
                    hideFooter={true}
                    checkboxSelection={false}
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
                      pageCount={Math.ceil(rowData.length / itemsPerPage)}
                      onPageChange={handlePageChange}
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
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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

export default CurrencyList;