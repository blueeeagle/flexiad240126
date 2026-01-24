/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import {
  deleteRequest,
  getRequest,
} from "../../../modules/auth/core/_requests";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import "../../../assets/sass/pagnition.scss";
import { useParams, Link } from "react-router-dom";
import { Switch } from "@mui/material";
import changeStatus from "../../../../common/ChangeStatus";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import logo from "../../../../_metronic/assets/sass/components/logoimage/logo.png";
import { toAgentApiUrl } from "../../../../_metronic/helpers";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

// Define the User type
interface User {
  _id: string;
  profileImg?: string; // Made optional
  name: string;
  email: string;
  userName: string;
  role?: {
    roleName: string;
  };
  dialCode: string;
  mobile: string;
  is_active: boolean;
}

const AgentUsers: FC = () => {
  const [rowData, setRowData] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const { agentId } = useParams();
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const getData = async () => {
    setLoading(true);
    try {
      const userData = await getRequest(
        `/agent/users/list/${agentId}`,
        `?pageIndex=${page}&pageSize=${pageSize}`
      );
      const data =
        userData?.data?.status === "ok"
          ? userData?.data
          : { data: [], totalCount: 0 };

      const formattedData = data.data.map((user: any, index: any) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        fullMobile: `${user.dialCode} ${user.mobile}`, 
        roleName: user.role?.roleName,
        isActive: user.is_active,
        createdBy: user.created_by?.name,
        updatedBy: user.updated_by?.name,
      }));
      

      setRowData(formattedData);
      setTotal(data.totalCount);
    } catch (error) {
      setErrorMsg("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [page, pageSize]);

  const deleteUser = async (ID: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      setLoading(true);
      try {
        const response = await deleteRequest(`/user/delete/${ID}`);
        if (response?.data?.status === "ok") {
          setSuccessMsg("Driver has been deleted successfully");
          await getData();
        } else {
          setErrorMsg("Something went wrong");
        }
      } catch (error) {
        setErrorMsg("Error deleting user");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChangeStatus = async (id: any, status: any) => {
    setLoading(true);
    const result = await changeStatus({
      id,
      status,
      Url: `/user/changeStatus/${id}`,
    });
    setLoading(false);

    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        getData();
      } else {
        Swal.fire(
          "Error",
          result.message || "An unknown error occurred",
          "error"
        );
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  useEffect(() => {
    getData();
  }, [page]);
  const columns = [
    {
      field: "companyLogo",
      headerName: "Profile Picture",
      width: 150,
      renderCell: (params: any) => (
        <img
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={
            params.row.companyLogo
              ? `http://agentapi.flexiclean.me/${params.row.profileImg}`
              : logo
          }
          alt="Logo"
          onError={(e) => {
            (e.target as HTMLImageElement).src = logo;
          }}
        />
      ),
    },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "fullMobile", headerName: "Mobile", width: 150 },
    { field: "roleName", headerName: "Role", width: 130 },
    { field: "createdBy", headerName: "Created By", width: 150 },
    { field: "updatedBy", headerName: "Updated By", width: 150 },
    {
      field: "isActive",
      headerName: "Status",
      width: 130,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.isActive}
          onChange={() =>
            handleChangeStatus(params.row.id, !params.row.isActive)
          }
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
  ];
  return (
    <>
      <PageTitle>USERS</PageTitle>
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
            style={{ width: 150, height: 150 }}
          />
        </div>
      ) : (
        <div className="row g-5 g-xl-8">
          <div>
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">User List</span>
              </h3>
            </div>
            <div className="card-body py-3">
              <div>
                <DataGrid
                  rows={rowData}
                  columns={columns}
                  hideFooter={true}
                  autoHeight={true}
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
              <div className="table-responsive">
             
                {total > pageSize && (
                  <div className="pagewrapper">
                    <ReactPaginate
                      containerClassName={"pagination"}
                      pageClassName={"page-item"}
                      activeClassName={"active"}
                      onPageChange={(event) => setPage(event.selected)}
                      pageCount={Math.ceil(total / pageSize)}
                      breakLabel="..."
                      previousLabel={
                        <IconContext.Provider
                          value={{ color: "#B8C1CC", size: "36px" }}
                        >
                          <AiFillLeftCircle />
                        </IconContext.Provider>
                      }
                      nextLabel={
                        <IconContext.Provider
                          value={{ color: "#B8C1CC", size: "36px" }}
                        >
                          <AiFillRightCircle />
                        </IconContext.Provider>
                      }
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AgentUsers;

// import { FC, useState, useEffect } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { deleteRequest, getRequest } from "../../../modules/auth/core/_requests";
// import ReactPaginate from "react-paginate";
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
// import { IconContext } from "react-icons";
// import "../../../assets/sass/pagnition.scss";
// import { useParams, Link } from "react-router-dom";
// import { Switch } from "@mui/material";
// import changeStatus from "../../../../common/ChangeStatus";
// import Swal from "sweetalert2";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";

// // Define the User type
// interface User {
//   _id: string;
//   profileImg: string;
//   name: string;
//   email: string;
//   userName: string;
//   role?: {
//     roleName: string;
//   };
//   dialCode: string;
//   mobile: string;
//   is_active: boolean;
// }

// const AgentUsers: FC = () => {
//   const [rowData, setRowData] = useState<User[]>([]);
//   const [page, setPage] = useState(0);
//   const [total, setTotal] = useState(0);
//   const pageSize = 10;
//   const { agentId } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);

//   const getData = async () => {
//     setLoading(true);
//     const userData = await getRequest(
//       `/agent/users/list/${agentId}`,
//       `?pageIndex=${page}&pageSize=${pageSize}`
//     );

//     const lookupObj = [userData];
//     let data1: Array<any> = [];
//     return Promise.allSettled(lookupObj)
//       .then((result) => {
//         result.forEach((res: any) => {
//           data1.push(res.value);
//         });
//         return data1;
//       })
//       .then((d) => {
//         const dataobj = {
//           userData: d[0]?.data?.status === "ok" ? d[0]?.data : [],
//         };
//         setRowData(dataobj?.userData?.data);
//         setTotal(dataobj?.userData?.totalCount);
//         setLoading(false);
//       })
//       .catch(() => {
//         setLoading(false);
//       });
//   };

//   const deleteUser = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       setLoading(true);
//       await deleteRequest(`/user/delete/` + ID).then(async (response) => {
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg(`Driver has been deleted successfully`);
//           await getData();
//         } else {
//           setIsFailed(true);
//           setErrorMsg(`Something Went Wrong`);
//         }
//         setLoading(false);
//       });
//     }
//   };

//   const handleChangeStatus = async (id: any, status: any) => {
//     setLoading(true);
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/user/changeStatus/${id}`,
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
//     async function fetchData() {
//       await getData();
//     }
//     fetchData();
//   }, [page]);

//   const columns: GridColDef[] = [
//     {
//       field: 'profileImg',
//       headerName: 'Profile Picture',
//       renderCell: (params:any) => (
//         <img
//           src={`http://agentapi.flexiclean.me/${params.value}`}
//           alt="Profile"
//           style={{ borderRadius: '50%', width: '45px', height: '45px' }}
//         />
//       ),
//       width: 150,
//     },
//     {
//       field: 'name',
//       headerName: 'First & Last Name',
//       renderCell: (params:any) => (
//         <Link to={`/agent/user/${agentId}/${params.row._id}`}>
//           {params.value}
//         </Link>
//       ),
//       width: 200,
//     },
//     { field: 'email', headerName: 'Email ID', width: 250 },
//     { field: 'userName', headerName: 'Username', width: 150 },
//     {
//       field: 'roleName',
//       headerName: 'Role',
//       valueGetter: (params: { row: User }) => params.row.role?.roleName,
//       width: 100,
//     },
//     {
//       field: 'mobile',
//       headerName: 'Mobile Number',
//       width: 150,
//       valueGetter: (params: { row: User }) => `${params.row.dialCode} - ${params.row.mobile}`,
//     },
//     {
//       field: 'is_active',
//       headerName: 'Status',
//       renderCell: (params:any) => (
//         <Switch
//           checked={params.value || false}
//           onChange={() => handleChangeStatus(params.row._id, params.value)}
//           inputProps={{ "aria-label": "controlled" }}
//         />
//       ),
//       width: 100,
//     },
//   ];

//   return (
//     <>
//       <PageTitle>USERS</PageTitle>

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
//             style={{ width: 150, height: 150 }}
//           />
//         </div>
//       ) : (
//         <div className="row g-5 g-xl-8">
//           <div>
//             <div className="card-header border-0 pt-5">
//               <h3 className="card-title align-items-start flex-column">
//                 <span className="card-label fw-bold fs-3 mb-1">User List</span>
//               </h3>
//             </div>
//             <div className="card-body py-3">
//               <div>
//                 <DataGrid
//                   rows={rowData || []}
//                   columns={columns}
//                   hideFooter={true}
//                   autoHeight={true}
//                   pagination
//                   paginationMode="server"
//                   rowCount={total}
//                   loading={loading}
//                   getRowId={(row) => row._id}
//                 />
//               </div>

//               {/* Pagination */}
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
//       )}
//     </>
//   );
// };

// export default AgentUsers;
