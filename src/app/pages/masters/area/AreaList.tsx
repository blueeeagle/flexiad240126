// import { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   postRequest,
//   deleteRequest,
// } from "../../../modules/auth/core/_requests";
// import AlertBox from "../../../../common/AlertBox";
// import { GridColDef, DataGrid } from "@mui/x-data-grid";
// import { Switch } from "@mui/material";
// import Swal from "sweetalert2";
// import changeStatus from "../../../../common/ChangeStatus";
// import { stringToDate } from "../../../../common/Date";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
// import ReactPaginate from "react-paginate"; // Import React Paginate

// const AreaList: FC = () => {
//   const [rowData, setRowData] = useState([]);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [isLoading, setIsLoading] = useState(true);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [isFailed, setIsFailed] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0); // Current page
//   const [itemsPerPage] = useState(10); // Items per page
//   const navigate = useNavigate();

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   const getData = async (page: number) => {
//     setIsLoading(true);
//     const stateData = await postRequest(
//       `/master/areas?page=${page}&limit=${itemsPerPage}`,
//       ""
//     );
//     if (stateData?.data?.status === "ok") {
//       setRowData(stateData?.data?.data);
//     }
//     setIsLoading(false);
//   };

//   const deleteArea = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       await deleteRequest(`/master/area/` + ID).then(async (response) => {
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg("Area has been deleted successfully");
//           await getData(currentPage); // Fetch data again after deletion
//         } else {
//           setIsFailed(true);
//           setErrorMsg("Something Went Wrong");
//         }
//       });
//     }
//   };

//   useEffect(() => {
//     async function loadData() {
//       await getData(currentPage); // Fetch data for the current page
//     }
//     loadData();
//   }, [currentPage]); // Dependency array includes currentPage

//   const updateList = () => {
//     getData(currentPage);
//   };

//   const handleChangeStatus = async (id: any, status: any) => {
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/master/area/${id}`,
//     });
//     if (result) {
//       if (result.success) {
//         Swal.fire("Success", result.message, "success");
//         updateList();
//       } else {
//         Swal.fire("Error", result.message, "error");
//       }
//     } else {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   // Define the columns for the DataGrid
//   const columns: GridColDef[] = [
//     { field: "name", headerName: "Area Name", minWidth: 200, flex: 1 },
//     {
//       field: "city",
//       headerName: "City",
//       minWidth: 150,
//       renderCell: (params: any) => params.row.cityId?.name || "N/A",
//       flex: 1,
//     },
//     {
//       field: "state",
//       headerName: "State",
//       minWidth: 150,
//       renderCell: (params: any) => params.row.stateId?.name || "N/A",
//       flex: 1,
//     },
//     {
//       field: "country",
//       headerName: "Country (Code)",
//       minWidth: 150,
//       renderCell: (params: any) => params.row.countryId?.name || "N/A",
//       flex: 1,
//     },
//     {
//       field: "updated_on",
//       headerName: "Updated On",
//       minWidth: 200,
//       renderCell: (params: any) => stringToDate(params.row.updated_at),
//       flex: 1,
//     },
//     {
//       field: "status",
//       headerName: "Status",
//       minWidth: 100,
//       renderCell: (params: any) => (
//         <Switch
//           checked={params.row.is_active || false}
//           onChange={() =>
//             handleChangeStatus(params.row._id, params.row.is_active)
//           }
//           inputProps={{ "aria-label": "controlled" }}
//         />
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 150,
//       headerClassName: "sticky-header",
//       renderCell: (params: any) => (
//         <div className="action-dropdown">
//           <select
//             className="form-select"
//             onChange={(e) => {
//               const selectedValue = e.target.value;
//               if (selectedValue === "statusUpdate") {
//                 navigate(`/area/${params.row._id}`);
//               } else if (selectedValue === "paymentUpdate") {
//                 deleteArea(params.row._id);
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

//   // Handle page click
//   const handlePageClick = (data: { selected: number }) => {
//     const selectedPage = data.selected;
//     setCurrentPage(selectedPage);
//   };

//   return (
//     <>
//       <PageTitle>AREA</PageTitle>
//       {isLoading ? (
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
//               filter: "hue-rotate(200deg)", // Adjust the degree for a blue effect
//             }}
//           />
//         </div>
//       ) : (
//         <div className="row g-5 g-xl-8">
//           <div>
//             <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center mb-5">
//               <div>
//                 <h3 className="card-title align-items-start flex-column">
//                   <span className="card-label fw-bold fs-3 mb-1">
//                     Area List
//                   </span>
//                 </h3>
//               </div>
//               <div
//                 className="card-toolbar"
//                 data-bs-toggle="tooltip"
//                 data-bs-placement="top"
//                 title="Click to add an Area"
//               >
//                 <Link
//                   to="/area/create"
//                   className="btn btn-sm btn-light-primary"
//                 >
//                   <KTIcon iconName="plus" className="fs-3" />
//                   New Area
//                 </Link>
//               </div>
//             </div>
//             <div className="card-body py-3">
//               <div>
//                 <DataGrid
//                   rows={rowData}
//                   columns={columns}
//                   getRowId={(row) => row._id}
//                   autoHeight={true}
//                   hideFooter={true}
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
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   alignItems: "center",
//                   marginTop: "20px",
//                   padding: "10px",
//                   backgroundColor: "#f8f9fa",
//                   borderRadius: "8px",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <ReactPaginate
//                   pageCount={Math.ceil(rowData.length / itemsPerPage)} // Total pages
                 
//                   onPageChange={handlePageClick} // Handle page click
//                   breakLabel="..."
//                   previousLabel="←"
//                   nextLabel="→"
//                   containerClassName="pagination"
//                   pageClassName="page-item"
//                   activeClassName="active"
//                   previousClassName="previous"
//                   nextClassName="next"
//                   pageLinkClassName="page-link"
//                   previousLinkClassName="previous-link"
//                   nextLinkClassName="next-link"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {isSuccess && (
//         <AlertBox redirectUrl={`/area`} close={closeAlert} type="success">
//           {successMsg}
//         </AlertBox>
//       )}
//       {isFailed && (
//         <AlertBox redirectUrl={null} close={closeAlert} type="error">
//           {errorMsg}
//         </AlertBox>
//       )}
//     </>
//   );
// };

// export default AreaList;
import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import {
  postRequest,
  deleteRequest,
} from "../../../modules/auth/core/_requests";
import AlertBox from "../../../../common/AlertBox";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { Switch } from "@mui/material";
import Swal from "sweetalert2";
import changeStatus from "../../../../common/ChangeStatus";
import { stringToDate } from "../../../../common/Date";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import ReactPaginate from "react-paginate";
import { getMastersPermissions } from "../../../utils/getPermissions";

const AreaList: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();
  const permissions = getMastersPermissions();
  const currencyPerms = permissions.subMenu["Area"] || [];
  const canView = currencyPerms.includes("view");
  const canEdit = currencyPerms.includes("edit");
  const canDelete = currencyPerms.includes("delete");
  const canCreate = currencyPerms.includes("create");

  console.log("AreaList Permissions:", { canView, canEdit, canDelete, canCreate });

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

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const getData = async (page: number) => {
    setIsLoading(true);
    try {
      const stateData = await postRequest(
        `/master/areas?page=${page}&limit=${itemsPerPage}`,
        ""
      );
      if (stateData?.data?.status === "ok") {
        setRowData(stateData?.data?.data);
      } else {
        setRowData([]);
      }
    } catch (error) {
      console.error("Error fetching areas:", error);
      setIsFailed(true);
      setErrorMsg("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteArea = async (ID: string) => {
    if (!canDelete) return;
    if (window.confirm("Are you sure to delete this record?")) {
      setIsLoading(true);
      try {
        const response = await deleteRequest(`/master/area/${ID}`);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg("Area has been deleted successfully");
          await getData(currentPage);
        } else {
          setIsFailed(true);
          setErrorMsg("Something Went Wrong");
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg("Error deleting area");
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const updateList = () => {
    getData(currentPage);
  };

  const handleChangeStatus = async (id: any, status: any) => {
    if (!canEdit) return;
    const result = await changeStatus({
      id,
      status,
      Url: `/master/area/${id}`,
    });
    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        updateList();
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Base columns (without actions)
  const baseColumns: GridColDef[] = [
    { field: "name", headerName: "Area Name", minWidth: 200, flex: 1 },
    {
      field: "city",
      headerName: "City",
      minWidth: 150,
      renderCell: (params: any) => params.row.cityId?.name || "N/A",
      flex: 1,
    },
    {
      field: "state",
      headerName: "State",
      minWidth: 150,
      renderCell: (params: any) => params.row.stateId?.name || "N/A",
      flex: 1,
    },
    {
      field: "country",
      headerName: "Country (Code)",
      minWidth: 150,
      renderCell: (params: any) => params.row.countryId?.name || "N/A",
      flex: 1,
    },
    {
      field: "updated_on",
      headerName: "Updated On",
      minWidth: 200,
      renderCell: (params: any) => stringToDate(params.row.updated_at),
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.is_active || false}
          onChange={() => handleChangeStatus(params.row._id, params.row.is_active)}
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
      width: 150,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue === "edit" && canEdit) {
                navigate(`/area/${params.row._id}`);
              } else if (selectedValue === "delete" && canDelete) {
                deleteArea(params.row._id);
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

  const handlePageClick = (data: { selected: number }) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  // Note: The pagination uses API-side pagination, but rowData holds only current page.
  // The pageCount calculation uses a fixed value (we assume total pages known from API's totalCount).
  // Since the API response does not return totalCount in the provided code, we keep the original logic
  // which may not work correctly. This is a pre-existing issue and not changed by permission update.
  // For a correct implementation, the API should return total count; here we keep the original behavior.
  const totalPageCount = Math.ceil(rowData.length / itemsPerPage); // This is likely incorrect but preserved.

  return (
    <>
      <PageTitle>AREA</PageTitle>
      {isLoading ? (
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
            <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center mb-5">
              <div>
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">
                    Area List
                  </span>
                </h3>
              </div>
              {canCreate && (
                <div
                  className="card-toolbar"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  title="Click to add an Area"
                >
                  <Link
                    to="/area/create"
                    className="btn btn-sm btn-light-primary"
                  >
                    <KTIcon iconName="plus" className="fs-3" />
                    New Area
                  </Link>
                </div>
              )}
            </div>
            <div className="card-body py-3">
              <div>
                <DataGrid
                  rows={rowData}
                  columns={baseColumns}
                  getRowId={(row) => row._id}
                  autoHeight={true}
                  hideFooter={true}
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
                  pageCount={totalPageCount}
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
        </div>
      )}
      {isSuccess && (
        <AlertBox redirectUrl="/area" close={closeAlert} type="success">
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

export default AreaList;