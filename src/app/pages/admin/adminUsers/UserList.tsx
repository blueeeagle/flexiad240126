// import { FC } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { toAbsoluteUrl } from "../../../../_metronic/helpers";
// import { Link } from "react-router-dom";

// const AdminUserList: FC = () => {
//   return (
//     <>
//       <PageTitle>Admin Users</PageTitle>
//       <div className="row g-5 g-xl-8">
//         <div className={`card `}>
//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title align-items-start flex-column">
//               <span className="card-label fw-bold fs-3 mb-1">User List</span>
//             </h3>
//             <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a user"
//             >
//               <Link
//                 to={`/adminUsers/create`}
//                 className="btn btn-sm btn-light-primary"
//               >
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New User
//               </Link>
//             </div>
//           </div>
//           <div className="card-body py-3">
//             <div className="table-responsive">
//               <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//                 <thead>
//                   <tr className="fw-bold text-muted">
//                     <th className="min-w-100px">Profile Picture</th>
//                     <th className="min-w-100px">First & Last Name</th>
//                     <th className="min-w-200px">Email ID</th>
//                     <th className="min-w-100px">Username</th>
//                     <th className="min-w-100px">Role</th>
//                     <th className="min-w-100px">Mobile Number</th>
//                     <th className="min-w-200px">Last Updated On</th>
//                     <th className="min-w-100px">Status</th>
//                     <th className="min-w-100px text-end">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <div className="symbol symbol-45px me-5">
//                           <img
//                             src={toAbsoluteUrl(
//                               "media/avatars/header-logo.jpeg"
//                             )}
//                             alt=""
//                           />
//                         </div>
//                       </div>
//                     </td>
//                     <td>Imran Malik</td>
//                     <td>imaran@gmail.com</td>
//                     <td>Imaran</td>
//                     <td>Accountant</td>
//                     <td>Mobile</td>
//                     <td>12/01/23</td>
//                     <td>Active</td>
//                     <td>
//                       <div className="d-flex justify-content-end flex-shrink-0">
//                         <Link
//                           to={"/adminUsers/1234"}
//                           className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
//                         >
//                           <KTIcon iconName="pencil" className="fs-3" />
//                         </Link>
//                         <Link
//                           to={"/"}
//                           className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
//                         >
//                           <KTIcon iconName="trash" className="fs-3" />
//                         </Link>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
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
import { Link } from "react-router-dom";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";
import logo from "../../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
import { getRequest, patchRequest } from "../../../modules/auth/core/_requests";

const AdminUserList: FC = () => {
  const [rows, setRows] = useState([]);
  const token = localStorage.getItem("token");


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("https://adminapi.flexiclean.me/api/v1/admin/users", {
          method: "POST", // Changed from PATCH to POST
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // Include any body if necessary for the POST request
          body: JSON.stringify({
            // Add necessary data in the request body here if needed.
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          // Map the API response to match the DataGrid structure
          const usersData = data.map((user: any, index: number) => ({
            id: user._id || index,
            profilePicture: user.profilePicture || logo,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            username: user.username,
            role: user.role,
            mobile: user.mobile || "N/A",
            lastUpdated: new Date(user.updatedAt).toLocaleDateString(),
            status: user.status,
          }));
          setRows(usersData);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
  
    fetchUsers();
  }, [token]);
  

  // Define columns for the DataGrid
  const columns: GridColDef[] = [
    {
      field: "profilePicture",
      headerName: "Profile Picture",
      width: 120,
      renderCell: (params: any) => (
        <img
          src={params.value}
          alt="Profile"
          style={{ width: "45px", borderRadius: "50%" }}
        />
      ),
    },
    { field: "name", headerName: "First & Last Name", width: 180 },
    { field: "email", headerName: "Email ID", width: 200 },
    { field: "username", headerName: "Username", width: 250 },
    { field: "role", headerName: "Role", width: 150 },
    { field: "mobile", headerName: "Mobile Number", width: 150 },
    { field: "lastUpdated", headerName: "Last Updated On", width: 160 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select className="form-select" defaultValue="">
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
      <PageTitle>Admin Users</PageTitle>
      <div className="row g-5 g-xl-8">
        <div className={`card `}>
          <div className="card-header border-0 pt-5">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">User List</span>
            </h3>
            <div
              className="card-toolbar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              title="Click to add a user"
            >
              <Link
                to={`/adminUsers/create`}
                className="btn btn-sm btn-light-primary"
              >
                <KTIcon iconName="plus" className="fs-3" />
                New User
              </Link>
            </div>
          </div>
          <div className="card-body py-3">
            <DataGrid
              rows={rows}
              columns={columns}
              hideFooter={true}
              autoHeight={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserList;
