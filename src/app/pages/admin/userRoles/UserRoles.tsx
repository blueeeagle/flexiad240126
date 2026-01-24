// import { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link } from "react-router-dom";
// import {
//   deleteRequest,
//   getRequest,
//   postRequest,
// } from "../../../modules/auth/core/_requests";
// import changeStatus from "../../../../common/ChangeStatus";
// import Swal from "sweetalert2";
// import ReactPaginate from "react-paginate";
// import { IconContext } from "react-icons";
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
// import { stringToDate } from "../../../../common/Date";
// import { Switch } from "@mui/material";

// const UserRoles: FC = () => {
//   const [rowData, setRowData] = useState([]);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const [page, setPage] = useState(0);
//   const [total, setTotal] = useState(0);
//   const pageSize = 10;
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
//     const roleData = await getRequest(
//       `/admin/roles`,
//       `?pageIndex=${page}&pageSize=${pageSize}`
//     );
//     if (roleData?.data?.status === "ok") {
//       setRowData(roleData?.data?.data);
//     }
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
//         updateList(); // Update the list if necessary
//       } else {
//         Swal.fire("Error", result.message, "error");
//       }
//     } else {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   return (
//     <>
//       <PageTitle>User Roles</PageTitle>
//       <div className="row g-5 g-xl-8">
//         <div >
//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title align-items-start flex-column">
//               <span className="card-label fw-bold fs-3 mb-1">
//                 User Roles List
//               </span>
//             </h3>
//             <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a Role"
//             >
//               <Link
//                 to={"/userRoles/create"}
//                 className="btn btn-sm btn-light-primary"
//               >
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New Role
//               </Link>
//             </div>
//           </div>
//           <div className="card-body py-3">
//             <div className="table-responsive">
//               <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//                 <thead>
//                   <tr className="fw-bold text-muted">
//                     <th className="min-w-200px">Role</th>
//                     <th className="min-w-200px">Permission</th>
//                     <th className="min-w-200px">Updated On</th>
//                     <th className="min-w-200px">Status</th>
//                     <th className="min-w-100px text-end">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rowData?.length > 0 ? (
//                     rowData.map((result: any) => {
//                       return (
//                         <tr key={result?._id}>
//                           <td>{result?.roleName}</td>
//                           <td>
//                             <Link
//                               to={`/userRoles/${result?._id}`}
//                               className="text-gray-900 fw-bold text-hover-primary d-block fs-6"
//                             >
//                               View
//                             </Link>
//                           </td>
//                           <td>{stringToDate(result?.updated_at)}</td>
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
//                                 to={`/userRoles/${result?._id}`}
//                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
//                               >
//                                 <KTIcon iconName="pencil" className="fs-3" />
//                               </Link>
//                               <a
//                                 href="#"
//                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
//                               >
//                                 <KTIcon iconName="trash" className="fs-3" />
//                               </a>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td>No Data Found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//               {total > pageSize && (
//                 <div className="pagewrapper">
//                   <ReactPaginate
//                     containerClassName={"pagination"}
//                     pageClassName={"page-item"}
//                     activeClassName={"active"}
//                     onPageChange={(event) => setPage(event.selected)}
//                     pageCount={Math.ceil(total / pageSize)}
//                     breakLabel="..."
//                     previousLabel={
//                       <IconContext.Provider
//                         value={{ color: "#B8C1CC", size: "36px" }}
//                       >
//                         <AiFillLeftCircle />
//                       </IconContext.Provider>
//                     }
//                     nextLabel={
//                       <IconContext.Provider
//                         value={{ color: "#B8C1CC", size: "36px" }}
//                       >
//                         <AiFillRightCircle />
//                       </IconContext.Provider>
//                     }
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default UserRoles;
import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import {
  deleteRequest,
  getRequest,
} from "../../../modules/auth/core/_requests";
import changeStatus from "../../../../common/ChangeStatus";
import Swal from "sweetalert2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { stringToDate } from "../../../../common/Date";
import { Switch } from "@mui/material";
import ReactPaginate from "react-paginate";

interface RoleData {
  _id: string;
  roleName: string;
  updated_at: string;
  is_active: boolean;
}

const UserRoles: FC = () => {
  const [rowData, setRowData] = useState<RoleData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const navigate = useNavigate();

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const deleteCity = async (ID: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      await deleteRequest(`/master/city/` + ID).then(async (response) => {
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`City has been deleted successfully`);
          await getData();
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      });
    }
  };

  const getData = async () => {
    setIsLoading(true); // Show loading spinner
    const roleData = await getRequest(
      `/admin/roles`,
      `?pageIndex=${page}&pageSize=${pageSize}`
    );
    if (roleData?.data?.status === "ok") {
      setRowData(roleData?.data?.data);
      setTotal(roleData?.data?.total);
    } else {
      setIsFailed(true);
      setErrorMsg(`Failed to fetch data`);
    }
    setIsLoading(false); // Hide loading spinner
  };

  useEffect(() => {
    getData();
  }, [page]);

  const handleChangeStatus = async (id: string, status: boolean) => {
    const result = await changeStatus({
      id,
      status,
      Url: `/master/city/${id}`,
    });

    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        getData(); // Refresh data
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  const columns: GridColDef[] = [
    { field: "roleName", headerName: "Role", width: 200 },
    {
      field: "permissions",
      headerName: "Permissions",
      width: 250,
      renderCell: (params: any) => (
        <Link
          to={`/userRoles/${params.row._id}`}
          className="text-gray-900 fw-bold text-hover-primary"
        >
          View
        </Link>
      ),
    },
    {
      field: "updated_at",
      headerName: "Updated On",
      width: 200,
      renderCell: (params: any) => stringToDate(params.row.updated_at),
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 200,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.is_active || false}
          onChange={() =>
            handleChangeStatus(params.row._id, !params.row.is_active)
          }
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
                navigate(`/userRoles/${params.row._id}`);
              } else if (selectedValue === "paymentUpdate") {
                deleteCity(params.row._id);
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

  return (
    <>
      <PageTitle>User Roles</PageTitle>
      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center mb-5">
            <div>
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  User Roles List
                </span>
              </h3>
            </div>

            <div
              className="card-toolbar"
              data-bs-toggle="tooltip"
              title="Click to add a Role"
            >
              <Link
                to={"/userRoles/create"}
                className="btn btn-sm btn-light-primary"
              >
                New Role
              </Link>
            </div>
          </div>
          <div className="card-body py-3">
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
                    filter: "hue-rotate(200deg)", // Adjust the degree for a blue effect
                  }}
                />
              </div>
            ) : (
              <div className="table-responsive">
                <DataGrid
                  rows={rowData}
                  columns={columns}
                  hideFooter={true}
                  rowCount={total}
                  autoHeight={true}
                  getRowId={(row) => row._id}
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
            )}
            {total > pageSize && (
              <div className="pagewrapper">
                <ReactPaginate
                  onPageChange={(event) => setPage(event.selected)}
                  pageCount={Math.ceil(total / pageSize)}
                  breakLabel="..."
                  previousLabel="←" // Use arrow or any other label for previous
                  nextLabel="→" // Use arrow or any other label for next
                  containerClassName="pagination" // Apply CSS class for styling
                  pageClassName="page-item"
                  activeClassName="active"
                  previousClassName="previous"
                  nextClassName="next"
                  pageLinkClassName="page-link"
                  previousLinkClassName="previous-link"
                  nextLinkClassName="next-link"
            
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRoles;
