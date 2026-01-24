// // import { FC, useEffect, useState } from "react";
// // import { PageTitle } from "../../../../_metronic/layout/core";
// // import { KTIcon } from "../../../../_metronic/helpers";
// // import { Link } from "react-router-dom";
// // import { postRequest } from "../../../modules/auth/core/_requests";
// // import { stringToDate } from "../../../../common/Date";
// // import { deleteRequest } from "../../../modules/auth/core/_requests";
// // import AlertBox from "../../../../common/AlertBox";
// // import { Switch } from "@mui/material";
// // import Swal from "sweetalert2";
// // import changeStatus from "../../../../common/ChangeStatus";

// // const StateList: FC = () => {
// //   const [rowData, setRowData] = useState([]);
// //   const [isSuccess, setIsSuccess] = useState(false);
// //   const [successMsg, setSuccessMsg] = useState(``);
// //   const [errorMsg, setErrorMsg] = useState(``);
// //   const [isFailed, setIsFailed] = useState(false);
// //   const [loading, setLoading] = useState(false);

// //   const closeAlert = () => {
// //     if (isSuccess) setIsSuccess(false);
// //     if (isFailed) setIsFailed(false);
// //   };

// //   const getData = async () => {
// //     const stateData = await postRequest(`/master/states`, ``);
// //     if (stateData?.data?.status === "ok") {
// //       setRowData(stateData?.data?.data);
// //     }
// //   };

// //   const deleteState = async (ID: string) => {
// //     if (window.confirm("Are you sure to delete this record?")) {
// //       await deleteRequest(`/master/state/` + ID).then(async (response) => {
// //         if (response?.data?.status === "ok") {
// //           setIsSuccess(true);
// //           setSuccessMsg(`State has been deleted successfully`);
// //           await getData();
// //         } else {
// //           setIsFailed(true);
// //           setErrorMsg(`Something Went Wrong`);
// //         }
// //       });
// //     }
// //   };

// //   useEffect(() => {
// //     async function loadData() {
// //       await getData();
// //     }

// //     loadData();
// //   }, []);

// //   const updateList = () => {
// //     getData();
// //   };

// //   const handleChangeStatus = async (id: any, status: any) => {
// //     setLoading(true);
// //     const result = await changeStatus({
// //       id,
// //       status,
// //       Url: `/master/state/${id}`,
// //     });
// //     setLoading(false);

// //     if (result) {
// //       if (result.success) {
// //         Swal.fire("Success", result.message, "success");
// //         updateList(); // Update the list if necessary
// //       } else {
// //         Swal.fire("Error", result.message, "error");
// //       }
// //     } else {
// //       Swal.fire("Error", "Something went wrong", "error");
// //     }
// //   };

// //   return (
// //     <>
// //       <PageTitle>STATE / PROVINCES</PageTitle>

// //       <div className="row g-5 g-xl-8">
// //         <div className={`card `}>
// //           <div className="card-header border-0 pt-5">
// //             <h3 className="card-title align-items-start flex-column">
// //               <span className="card-label fw-bold fs-3 mb-1">State List</span>
// //             </h3>
// //             <div
// //               className="card-toolbar"
// //               data-bs-toggle="tooltip"
// //               data-bs-placement="top"
// //               data-bs-trigger="hover"
// //               title="Click to add a State"
// //             >
// //               <Link to="/state/create" className="btn btn-sm btn-light-primary">
// //                 <KTIcon iconName="plus" className="fs-3" />
// //                 New State
// //               </Link>
// //             </div>
// //           </div>
// //           <div className="card-body py-3">
// //             <div className="table-responsive">
// //               <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
// //                 <thead>
// //                   <tr className="fw-bold text-muted">
// //                     <th className="min-w-200px">Country Name</th>
// //                     <th className="min-w-100px">State & Province</th>
// //                     <th className="min-w-100px">Country Has State</th>
// //                     <th className="min-w-200px">Updated On</th>
// //                     <th className="min-w-100px">Status</th>
// //                     <th className="min-w-100px text-end">Actions</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody>
// //                   {rowData?.length > 0 ? (
// //                     rowData.map((result: any) => {
// //                       return (
// //                         <tr key={result?._id}>
// //                           <td>{result?.countryId?.name}</td>
// //                           <td>{result?.name}</td>
// //                           <td>{result?.hasState ? `YES` : `NO`}</td>
// //                           <td>{stringToDate(result?.updated_at)}</td>
// //                           <td>
// //                             <Switch
// //                               checked={result?.is_active || false}
// //                               onChange={() =>
// //                                 handleChangeStatus(
// //                                   result?._id,
// //                                   result?.is_active
// //                                 )
// //                               }
// //                               inputProps={{ "aria-label": "controlled" }}
// //                             />
// //                           </td>{" "}
// //                           <td>
// //                             <div className="d-flex justify-content-end flex-shrink-0">
// //                               <Link
// //                                 to={`/state/${result?._id}`}
// //                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
// //                               >
// //                                 <KTIcon iconName="pencil" className="fs-3" />
// //                               </Link>
// //                               <span
// //                                 onClick={(e) => deleteState(result?._id)}
// //                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
// //                               >
// //                                 <KTIcon iconName="trash" className="fs-3" />
// //                               </span>
// //                             </div>
// //                           </td>
// //                         </tr>
// //                       );
// //                     })
// //                   ) : (
// //                     <tr>
// //                       <td>No States Found</td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //       {isSuccess && (
// //         <AlertBox redirectUrl={null} close={closeAlert} type={`success`}>
// //           {successMsg}
// //         </AlertBox>
// //       )}
// //       {isFailed && (
// //         <AlertBox redirectUrl={null} close={closeAlert} type={`error`}>
// //           {errorMsg}
// //         </AlertBox>
// //       )}
// //     </>
// //   );
// // };

// // export default StateList;
// import { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link } from "react-router-dom";
// import { postRequest, deleteRequest } from "../../../modules/auth/core/_requests";
// import { stringToDate } from "../../../../common/Date";
// import AlertBox from "../../../../common/AlertBox";
// import { Switch } from "@mui/material";
// import Swal from "sweetalert2";
// import changeStatus from "../../../../common/ChangeStatus";

// const StateList: FC = () => {
//   const [rowData, setRowData] = useState<any[]>([]);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [isFailed, setIsFailed] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const closeAlert = () => {
//     setIsSuccess(false);
//     setIsFailed(false);
//   };

//   const getData = async () => {
//     try {
//       const stateData = await postRequest(`/master/states`, ``);
//       if (stateData?.data?.status === "ok") {
//         setRowData(stateData?.data?.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch state data", error);
//     }
//   };

//   const deleteState = async (ID: string) => {
//     const confirmed = window.confirm("Are you sure to delete this record?");
//     if (!confirmed) return;

//     try {
//       const response = await deleteRequest(`/master/state/` + ID);
//       if (response?.data?.status === "ok") {
//         setIsSuccess(true);
//         setSuccessMsg("State has been deleted successfully");
//         await getData();
//       } else {
//         setIsFailed(true);
//         setErrorMsg("Something Went Wrong");
//       }
//     } catch (error) {
//       console.error("Failed to delete state", error);
//       setIsFailed(true);
//       setErrorMsg("Failed to delete state");
//     }
//   };

//   const handleChangeStatus = async (id: string, status: boolean) => {
//     setLoading(true);
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/master/state/${id}`,
//     });
//     setLoading(false);

//     if (result) {
//       const messageType = result.success ? "success" : "error";
//       Swal.fire(messageType === "success" ? "Success" : "Error", result.message, messageType);
//       updateList();
//     } else {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   const updateList = () => {
//     getData();
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   return (
//     <>
//       <PageTitle>STATE / PROVINCES</PageTitle>

//       <div className="row g-5 g-xl-8">
//         <div className="card">
//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title align-items-start flex-column">
//               <span className="card-label fw-bold fs-3 mb-1">State List</span>
//             </h3>
//             <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a State"
//             >
//               <Link to="/state/create" className="btn btn-sm btn-light-primary">
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New State
//               </Link>
//             </div>
//           </div>

//           <div className="card-body py-3">
//             <div className="table-responsive">
//               <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//                 <thead>
//                   <tr className="fw-bold text-muted">
//                     <th className="min-w-200px">Country Name</th>
//                     <th className="min-w-100px">State & Province</th>
//                     <th className="min-w-100px">Country Has State</th>
//                     <th className="min-w-200px">Updated On</th>
//                     <th className="min-w-100px">Status</th>
//                     <th className="min-w-100px text-end">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rowData.length > 0 ? (
//                     rowData.map((result: any) => (
//                       <tr key={result?._id}>
//                         <td>{result?.countryId?.name}</td>
//                         <td>{result?.name}</td>
//                         <td>{result?.hasState ? "YES" : "NO"}</td>
//                         <td>{stringToDate(result?.updated_at)}</td>
//                         <td>
//                           <Switch
//                             checked={result?.is_active || false}
//                             onChange={() => handleChangeStatus(result?._id, result?.is_active)}
//                             inputProps={{ "aria-label": "controlled" }}
//                           />
//                         </td>
//                         <td>
//                           <div className="d-flex justify-content-end flex-shrink-0">
//                             <Link
//                               to={`/state/${result?._id}`}
//                               className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
//                             >
//                               <KTIcon iconName="pencil" className="fs-3" />
//                             </Link>
//                             <span
//                               onClick={() => deleteState(result?._id)}
//                               className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
//                             >
//                               <KTIcon iconName="trash" className="fs-3" />
//                             </span>
//                           </div>
//                         </td>
//                       </tr>
//                     ))
//                   ) : (
//                     <tr>
//                       <td colSpan={6} className="text-center">No States Found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>

//       {isSuccess && (
//         <AlertBox redirectUrl={null} close={closeAlert} type="success">
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

// export default StateList;
import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import {
  postRequest,
  deleteRequest,
} from "../../../modules/auth/core/_requests";
import { stringToDate } from "../../../../common/Date";
import AlertBox from "../../../../common/AlertBox";
import { Switch } from "@mui/material";
import Swal from "sweetalert2";
import changeStatus from "../../../../common/ChangeStatus";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import Lottie from "lottie-react";
import ReactPaginate from "react-paginate"; // Import React Paginate

const StateList: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const [itemsPerPage] = useState(10); // Items per page
  const navigate = useNavigate();

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const getData = async () => {
    setLoading(true);
    const stateData = await postRequest(`/master/states`, ``);
    if (stateData?.data?.status === "ok") {
      setRowData(stateData?.data?.data);
    }
    setLoading(false);
  };

  const deleteState = async (ID: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      await deleteRequest(`/master/state/` + ID).then(async (response) => {
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`State has been deleted successfully`);
          await getData();
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      });
    }
  };

  useEffect(() => {
    async function loadData() {
      await getData();
    }
    loadData();
  }, []);

  const updateList = () => {
    getData();
  };

  const handleChangeStatus = async (id: any, status: any) => {
    setLoading(true);
    const result = await changeStatus({
      id,
      status,
      Url: `/master/state/${id}`,
    });
    setLoading(false);

    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        updateList(); // Update the list if necessary
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Define the columns for the DataGrid
  const columns: GridColDef[] = [
    {
      field: "countryName",
      headerName: "Country Name",
      width: 200,
      renderCell: (params: any) => params.row.countryId?.name || "",
    },
    { field: "name", headerName: "State & Province", width: 250 },
    {
      field: "hasState",
      headerName: "Country Has State",
      width: 150,
      renderCell: (params: any) => (params.row.hasState ? "YES" : "NO"),
    },
    {
      field: "updatedAt",
      headerName: "Updated On",
      width: 200,
      renderCell: (params: any) => stringToDate(params.row.updated_at),
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 150,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.is_active || false}
          onChange={() =>
            handleChangeStatus(params.row._id, params.row.is_active)
          }
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
    {
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
              if (selectedValue === "statusUpdate") {
                navigate(`/state/${params.row._id}`);
              } else if (selectedValue === "paymentUpdate") {
                deleteState(params.row._id);
              }
              e.target.value = "";
            }}
            defaultValue=""
          >
            <option value="" disabled>
              ...
            </option>
            <option value="statusUpdate">Edit</option>
            <option value="paymentUpdate">Delete</option>
          </select>
        </div>
      ),
    },
  ];

  // Calculate the number of pages
  const pageCount = Math.ceil(rowData.length / itemsPerPage);

  // Get the data for the current page
  const currentData = rowData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <>
      <PageTitle>STATE / PROVINCES</PageTitle>
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
              filter: "hue-rotate(200deg)", // Adjust the degree for a blue effect
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
                    State List
                  </span>
                </h3>
              </div>

              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Click to add a State"
              >
                <Link
                  to="/state/create"
                  className="btn btn-sm btn-light-primary"
                >
                  <KTIcon iconName="plus" className="fs-3" />
                  New State
                </Link>
              </div>
            </div>
            <div className="card-body py-3">
              <div>
                <DataGrid
                  rows={currentData}
                  columns={columns}
                  getRowId={(row) => row._id}
                  loading={loading}
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
                onPageChange={(selected) => setCurrentPage(selected.selected)}
                pageCount={pageCount}
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
          </div>
        </div>
      )}
    </>
  );
};

export default StateList;
