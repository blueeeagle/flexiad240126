// import { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link, useNavigate } from "react-router-dom";
// import { postRequest } from "../../../modules/auth/core/_requests";
// import { stringToDate } from "../../../../common/Date";
// import { deleteRequest } from "../../../modules/auth/core/_requests";
// import AlertBox from "../../../../common/AlertBox";
// import Swal from "sweetalert2";
// import changeStatus from "../../../../common/ChangeStatus";
// import { Switch, Box } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
// import ReactPaginate from "react-paginate"; // Import React Paginate

// const CityList: FC = () => {
//   const [rowData, setRowData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const [currentPage, setCurrentPage] = useState(0); // Current page state
//   const [itemsPerPage] = useState(10); // Number of items per page
//   const navigate = useNavigate();

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   const deleteCity = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       await deleteRequest(`/master/city/` + ID).then(async (response) => {
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg(`City has been deleted successfully`);
//           await getData();
//         } else {
//           setIsFailed(true);
//           setErrorMsg(`Something Went Wrong`);
//         }
//       });
//     }
//   };

//   const getData = async () => {
//     setIsLoading(true);
//     const stateData = await postRequest(`/master/cities`, ``);
//     if (stateData?.data?.status === "ok") {
//       setRowData(stateData?.data?.data);
//     }
//     setIsLoading(false);
//   };

//   useEffect(() => {
//     async function loadData() {
//       await getData();
//     }

//     loadData();
//   }, []);

//   const updateList = () => {
//     getData();
//   };

//   const handleChangeStatus = async (id: any, status: any) => {
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/master/city/${id}`,
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

//   // DataGrid column definitions
//   const columns: GridColDef[] = [
//     {
//       field: "countryName",
//       headerName: "Country Name",
//       minWidth: 200,
//       renderCell: (params: any) => params.row.countryId?.name || "",
//     },
//     { field: "name", headerName: "City", minWidth: 200 },
//     {
//       field: "updated_at",
//       headerName: "Updated On",
//       minWidth: 200,
//       renderCell: (params: any) => stringToDate(params.row.updated_at),
//     },
//     {
//       field: "is_active",
//       headerName: "Status",
//       minWidth: 200,
//       renderCell: (params: any) => (
//         <Switch
//           checked={params.row.is_active || false}
//           onChange={() =>
//             handleChangeStatus(params.row._id, params.row.is_active)
//           }
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
//                 navigate(`/city/${params.row._id}`);
//               } else if (selectedValue === "paymentUpdate") {
//                 deleteCity(params.row._id);
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

//   // Pagination logic
//   const handlePageChange = (data: { selected: number }) => {
//     setCurrentPage(data.selected);
//   };

//   // Slice the data based on current page and items per page
//   const currentData = rowData.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage
//   );

//   return (
//     <>
//       <PageTitle>CITY</PageTitle>
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
//               filter: "hue-rotate(200deg)",
//             }}
//           />
//         </div>
//       ) : (
//         <div className="row g-5 g-xl-8">
//           <div>
//             <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center mb-5">
//               <div>
//                 <h3 className="card-title align-items-start flex-column">
//                   <span className="card-label fw-bold fs-3 mb-1">City List</span>
//                 </h3>
//               </div>
//               <div
//                 className="card-toolbar"
//                 data-bs-toggle="tooltip"
//                 data-bs-placement="top"
//                 data-bs-trigger="hover"
//                 title="Click to add a City"
//               >
//                 <Link to="/city/create" className="btn btn-sm btn-light-primary">
//                   <KTIcon iconName="plus" className="fs-3" />
//                   New City
//                 </Link>
//               </div>
//             </div>
//             <div className="card-body py-3">
//               <DataGrid
//                 rows={currentData} // Use sliced data for pagination
//                 columns={columns}
//                 getRowId={(row) => row._id}
//                 checkboxSelection={false}
//                 autoHeight={true}
//                 hideFooter={true}
//                 sx={{
//                   "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
//                     outline: "none",
//                     border: "none",
//                     backgroundColor: "transparent",
//                   },
//                   "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible": {
//                     outline: "none",
//                     border: "none",
//                     backgroundColor: "transparent",
//                   },
//                   "& .MuiDataGrid-cell:active": {
//                     outline: "none",
//                     border: "none",
//                   },
//                 }}
//               />
//               <div
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
//   <ReactPaginate
//                  pageCount={Math.ceil(rowData.length / itemsPerPage)} // Total pages
//                  marginPagesDisplayed={2}
//                  pageRangeDisplayed={5}
//                  onPageChange={handlePageChange} // Handle page change
//                  breakLabel="..."
//                  previousLabel="←" // Use arrow or any other label for previous
//                  nextLabel="→" // Use arrow or any other label for next
//                  containerClassName="pagination" // Apply CSS class for styling
//                  pageClassName="page-item"
//                  activeClassName="active"
//                  previousClassName="previous"
//                  nextClassName="next"
//                  pageLinkClassName="page-link"
//                  previousLinkClassName="previous-link"
//                  nextLinkClassName="next-link"
//               />
//               </div>
            
//             </div>
//           </div>
//         </div>
//       )}
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

// export default CityList

import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import { postRequest } from "../../../modules/auth/core/_requests";
import { stringToDate } from "../../../../common/Date";
import { deleteRequest } from "../../../modules/auth/core/_requests";
import AlertBox from "../../../../common/AlertBox";
import Swal from "sweetalert2";
import changeStatus from "../../../../common/ChangeStatus";
import { Switch, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import ReactPaginate from "react-paginate";
import { getMastersPermissions } from "../../../utils/getPermissions";

const CityList: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  const permissions = getMastersPermissions();
  
  const currencyPerms = permissions.subMenu["City"] || [];
  const canView = currencyPerms.includes("view");
  const canEdit = currencyPerms.includes("edit");
  const canDelete = currencyPerms.includes("delete");
  const canCreate = currencyPerms.includes("create");

  console.log("CityList Permissions:", { canView, canEdit, canDelete, canCreate });

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

  const deleteCity = async (ID: string) => {
    if (!canDelete) return;
    if (window.confirm("Are you sure to delete this record?")) {
      setIsLoading(true);
      try {
        const response = await deleteRequest(`/master/city/${ID}`);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg("City has been deleted successfully");
          await getData();
        } else {
          setIsFailed(true);
          setErrorMsg("Something Went Wrong");
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg("Error deleting city");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const stateData = await postRequest(`/master/cities`, ``);
      if (stateData?.data?.status === "ok") {
        setRowData(stateData?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching cities:", error);
      setIsFailed(true);
      setErrorMsg("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const updateList = () => {
    getData();
  };

  const handleChangeStatus = async (id: any, status: any) => {
    if (!canEdit) return;
    const result = await changeStatus({
      id,
      status,
      Url: `/master/city/${id}`,
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
    {
      field: "countryName",
      headerName: "Country Name",
      minWidth: 200,
      renderCell: (params: any) => params.row.countryId?.name || "",
    },
    { field: "name", headerName: "City", minWidth: 200 },
    {
      field: "updated_at",
      headerName: "Updated On",
      minWidth: 200,
      renderCell: (params: any) => stringToDate(params.row.updated_at),
    },
    {
      field: "is_active",
      headerName: "Status",
      minWidth: 200,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.is_active || false}
          onChange={() => handleChangeStatus(params.row._id, params.row.is_active)}
          disabled={!canEdit}
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
                navigate(`/city/${params.row._id}`);
              } else if (selectedValue === "delete" && canDelete) {
                deleteCity(params.row._id);
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

  const handlePageChange = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const currentData = rowData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <PageTitle>CITY</PageTitle>
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
                  <span className="card-label fw-bold fs-3 mb-1">City List</span>
                </h3>
              </div>
              {canCreate && (
                <div
                  className="card-toolbar"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-trigger="hover"
                  title="Click to add a City"
                >
                  <Link to="/city/create" className="btn btn-sm btn-light-primary">
                    <KTIcon iconName="plus" className="fs-3" />
                    New City
                  </Link>
                </div>
              )}
            </div>
            <div className="card-body py-3">
              <DataGrid
                rows={currentData}
                columns={baseColumns}
                getRowId={(row) => row._id}
                checkboxSelection={false}
                autoHeight={true}
                hideFooter={true}
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
                  marginPagesDisplayed={2}
                  pageRangeDisplayed={5}
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

export default CityList;