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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Switch } from "@mui/material";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import { deleteRequest, getRequest } from "../../../modules/auth/core/_requests";
import changeStatus from "../../../../common/ChangeStatus";
import { stringToDate } from "../../../../common/Date";
import { getAdminPermissions } from "../../../utils/getPermissions";

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
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const navigate = useNavigate();

  const permissions = getAdminPermissions();
  const rolePerms = permissions.subMenu["User Roles"] || [];
  const canView = rolePerms.includes("view");
  const canEdit = rolePerms.includes("edit");
  const canDelete = rolePerms.includes("delete");
  const canCreate = rolePerms.includes("create");

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

  // Delete role (correct endpoint)
  const deleteRole = async (id: string) => {
    if (!canDelete) {
      Swal.fire("Access Denied", "You don't have permission to delete", "error");
      return;
    }
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      confirmButtonText: "Delete",
    });
    if (!confirm.isConfirmed) return;

    const response = await deleteRequest(`/admin/roles/${id}`);
    if (response?.data?.status === "ok") {
      setIsSuccess(true);
      setSuccessMsg("Role deleted successfully");
      await getData();
    } else {
      setIsFailed(true);
      setErrorMsg(response?.data?.message || "Something went wrong");
    }
  };

  // Toggle role status (requires edit permission)
  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    if (!canEdit) {
      Swal.fire("Access Denied", "You don't have permission to change status", "error");
      return;
    }
    const result = await changeStatus({
      id,
      status: !currentStatus,
      Url: `/admin/roles/${id}/toggle-status`, // adjust to your actual endpoint
    });
    if (result?.success) {
      Swal.fire("Success", result.message, "success");
      getData();
    } else {
      Swal.fire("Error", result?.message || "Failed to update status", "error");
    }
  };

  const getData = async () => {
    setIsLoading(true);
    const roleData = await getRequest(
      `/admin/roles`,
      `?pageIndex=${page}&pageSize=${pageSize}`
    );
    if (roleData?.data?.status === "ok") {
      setRowData(roleData?.data?.data || []);
      setTotal(roleData?.data?.total || 0);
      localStorage.setItem("permissions", JSON.stringify(roleData?.data?.data || []));
    } else {
      setIsFailed(true);
      setErrorMsg("Failed to fetch data");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [page]);

  // Define columns conditionally based on permissions
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
    // Status column – only show Switch if user can edit
    {
      field: "is_active",
      headerName: "Status",
      width: 200,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.is_active || false}
          onChange={() => handleToggleStatus(params.row._id, params.row.is_active)}
          disabled={!canEdit}
        />
      ),
    },
    ...(canEdit || canDelete
      ? [
        {
          field: "actions",
          headerName: "Actions",
          width: 150,
          renderCell: (params: any) => (
            <div className="action-dropdown">
              <select
                className="form-select"
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "edit" && canEdit) {
                    navigate(`/userRoles/${params.row._id}`);
                  } else if (value === "delete" && canDelete) {
                    deleteRole(params.row._id);
                  }
                  e.target.value = ""; // reset dropdown
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  ...
                </option>
                {canEdit && <option value="edit">Edit</option>}
                {canDelete && <option value="delete">Delete</option>}
              </select>
            </div>
          ),
        },
      ]
      : []),
  ];

  return (
    <>
      <PageTitle>User Roles</PageTitle>
      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center mb-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">User Roles List</span>
            </h3>
            {/* New Role button – shown only if user can create */}
            {canCreate && (
              <div className="card-toolbar" data-bs-toggle="tooltip" title="Add a new role">
                <Link to="/userRoles/create" className="btn btn-sm btn-light-primary">
                  New Role
                </Link>
              </div>
            )}
          </div>

          <div className="card-body py-3">
            {isLoading ? (
              <div className="text-center d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <Lottie animationData={loaderAnimation} loop style={{ width: 150, height: 150 }} />
              </div>
            ) : (
              <div className="table-responsive">
                <DataGrid
                  rows={rowData}
                  columns={columns}
                  hideFooter
                  rowCount={total}
                  autoHeight
                  getRowId={(row) => row._id}
                  sx={{
                    "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus": {
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
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserRoles;
