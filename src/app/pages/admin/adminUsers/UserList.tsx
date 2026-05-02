// import { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link, useNavigate } from "react-router-dom";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import { Switch } from "@mui/material";
// import Lottie from "lottie-react";
// import logo from "../../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";


// const AdminUserList: FC = () => {
//   const [rows, setRows] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // Fetch Users
//   useEffect(() => {
//     const fetchUsers = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch(
//           "https://adminapi.flexiclean.me/api/v1/admin/users",
//           {
//             method: "POST",
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({}),
//           }
//         );

//         if (response.ok) {
//           const data = await response.json();

//           const usersData = data.data.map((user: any, index: number) => ({
//             id: user._id || index,
//             profilePicture: user.profileImg
//               ? `https://adminapi.flexiclean.me/${user.profileImg}`
//               : logo,
//             name: user.name || "N/A",
//             email: user.email || "N/A",
//             role: user.role?.roleName || "N/A",
//             mobile: user.mobile || "N/A",
//             lastUpdated: user.updated_at
//               ? new Date(user.updated_at).toLocaleDateString()
//               : "N/A",
//             isActive: user.is_active,
//             // also store full user object for edit (if needed)
//             fullUser: user,
//           }));

//           setRows(usersData);
//         } else {
//           console.error("Failed to fetch users");
//         }
//       } catch (error) {
//         console.error("Error fetching users:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, [token]);

//   // Status Toggle Handler
//   const handleChangeStatus = async (id: string, currentStatus: boolean) => {
//     try {
//       const response = await fetch(
//         `https://adminapi.flexiclean.me/api/v1/admin/users/${id}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             is_active: !currentStatus,
//           }),
//         }
//       );

//       if (response.ok) {
//         setRows((prev) =>
//           prev.map((row) =>
//             row.id === id ? { ...row, isActive: !currentStatus } : row
//           )
//         );
//       } else {
//         console.error("Status update failed");
//       }
//     } catch (error) {
//       console.error("Error updating status:", error);
//     }
//   };

//   // Columns definition
//   const columns: GridColDef[] = [
//     {
//       field: "profilePicture",
//       headerName: "Profile",
//       width: 100,
//       renderCell: (params: any) => (
//         <img
//           src={params.value}
//           alt="Profile"
//           style={{ width: "40px", borderRadius: "50%" }}
//         />
//       ),
//     },
//     { field: "name", headerName: "Name", width: 180 },
//     { field: "email", headerName: "Email", width: 200 },
//     { field: "role", headerName: "Role", width: 150 },
//     { field: "mobile", headerName: "Mobile", width: 150 },
//     { field: "lastUpdated", headerName: "Updated", width: 150 },
//     {
//       field: "status",
//       headerName: "Status",
//       width: 120,
//       renderCell: (params: any) => (
//         <Switch
//           checked={params.row.isActive}
//           onChange={() => handleChangeStatus(params.row.id, params.row.isActive)}
//         />
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 100,
//       renderCell: (params: any) => (
//         <select
//           className="form-select"
//           defaultValue=""
//           onChange={(e) => {
//             if (e.target.value === "edit") {
//               // Pass full user data to edit page
//               navigate(`/adminUsers/edit/${params.row.id}`, {
//                 state: { user: params.row.fullUser },
//               });
//             }
//           }}
//         >
//           <option value="" disabled>...</option>
//           <option value="edit">Edit</option>
//         </select>
//       ),
//     },
//   ];

//   return (
//     <>
//       <PageTitle>Admin Users</PageTitle>
//       <div className="row g-5 g-xl-8">
//         <div className="card">
//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title fw-bold fs-3">User List</h3>
//             <div className="card-toolbar">
//               <Link to="/adminUsers/create" className="btn btn-sm btn-light-primary">
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New User
//               </Link>
//             </div>
//           </div>
//           <div className="card-body py-3">
//             {loading ? (
//               <div
//                 className="text-center"
//                 style={{
//                   display: "flex",
//                   justifyContent: "center",
//                   alignItems: "center",
//                   height: "50vh",
//                 }}
//               >
//                 <Lottie
//                   animationData={loaderAnimation}
//                   loop={true}
//                   style={{
//                     width: 150,
//                     height: 150,
//                     filter: "hue-rotate(200deg)",
//                   }}
//                 />
//               </div>
//             ) : (
//               <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 autoHeight
//                 hideFooter
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
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AdminUserList;
import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Switch } from "@mui/material";
import Lottie from "lottie-react";
import logo from "../../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import { getAdminPermissions } from "../../../utils/getPermissions";

const AdminUserList: FC = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

const permissions = getAdminPermissions();
const currencyPerms = permissions.subMenu["Admin Users"] || [];
  const canView = currencyPerms.includes("view");
  const canEdit = currencyPerms.includes("edit");
  const canDelete = currencyPerms.includes("delete");
  const canCreate = currencyPerms.includes("create");

  console.log("AdminUserList Permissions:", { canView, canEdit, canDelete, canCreate });

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

  // Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://adminapi.flexiclean.me/api/v1/admin/users",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({}),
          }
        );

        if (response.ok) {
          const data = await response.json();

          const usersData = data.data.map((user: any, index: number) => ({
            id: user._id || index,
            profilePicture: user.profileImg
              ? `https://adminapi.flexiclean.me/${user.profileImg}`
              : logo,
            name: user.name || "N/A",
            email: user.email || "N/A",
            role: user.role?.roleName || "N/A",
            mobile: user.mobile || "N/A",
            lastUpdated: user.updated_at
              ? new Date(user.updated_at).toLocaleDateString()
              : "N/A",
            isActive: user.is_active,
            fullUser: user,
          }));

          setRows(usersData);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [token]);

  // Status Toggle Handler
  const handleChangeStatus = async (id: string, currentStatus: boolean) => {
    if (!canEdit) return;
    try {
      const response = await fetch(
        `https://adminapi.flexiclean.me/api/v1/admin/users/${id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            is_active: !currentStatus,
          }),
        }
      );

      if (response.ok) {
        setRows((prev) =>
          prev.map((row) =>
            row.id === id ? { ...row, isActive: !currentStatus } : row
          )
        );
      } else {
        console.error("Status update failed");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Base columns (without actions)
  const baseColumns: GridColDef[] = [
    {
      field: "profilePicture",
      headerName: "Profile",
      width: 100,
      renderCell: (params: any) => (
        <img
          src={params.value}
          alt="Profile"
          style={{ width: "40px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 180 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "mobile", headerName: "Mobile", width: 150 },
    { field: "lastUpdated", headerName: "Updated", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.isActive}
          onChange={() => handleChangeStatus(params.row.id, params.row.isActive)}
          disabled={!canEdit}
        />
      ),
    },
  ];

  // Add Actions column only if user can edit (currently only edit action)
  if (canEdit) {
    baseColumns.push({
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params: any) => (
        <select
          className="form-select"
          defaultValue=""
          onChange={(e) => {
            if (e.target.value === "edit") {
              navigate(`/adminUsers/edit/${params.row.id}`, {
                state: { user: params.row.fullUser },
              });
            }
            e.target.value = "";
          }}
        >
          <option value="" disabled>...</option>
          <option value="edit">Edit</option>
          {/* Delete option can be added here with canDelete check if needed */}
        </select>
      ),
    });
  }

  return (
    <>
      <PageTitle>Admin Users</PageTitle>
      <div className="row g-5 g-xl-8">
        <div className="card">
          <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
            <h3 className="card-title fw-bold fs-3">User List</h3>
            {canCreate && (
              <div className="card-toolbar">
                <Link to="/adminUsers/create" className="btn btn-sm btn-light-primary">
                  <KTIcon iconName="plus" className="fs-3" />
                  New User
                </Link>
              </div>
            )}
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
                rows={rows}
                columns={baseColumns}
                autoHeight
                hideFooter
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
    </>
  );
};

export default AdminUserList;