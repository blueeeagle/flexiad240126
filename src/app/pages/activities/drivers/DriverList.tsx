// import { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { toAbsoluteUrl } from "../../../../_metronic/helpers";
// import { Link } from "react-router-dom";
// import {
//   deleteRequest,
//   getRequest,
//   postRequest,
// } from "../../../modules/auth/core/_requests";
// import AlertBox from "../../../../common/AlertBox";
// import { stringToDate } from "../../../../common/Date";
// import { Switch } from "@mui/material";
// import changeStatus from "../../../../common/ChangeStatus";
// import Swal from "sweetalert2";

// const ActivitiesDriverList: FC = () => {
//   const [rowData, setRowData] = useState([]);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const deleteDriver = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       await deleteRequest(`/user/delete/` + ID).then(async (response) => {
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg(`Driver has been deleted successfully`);
//           await getData();
//         } else {
//           setIsFailed(true);
//           setErrorMsg(`Something Went Wrong`);
//         }
//       });
//     }
//   };

//   const getData = async () => {
//     const driverListData = await getRequest(
//       `/driver/list?pageIndex=0&pageSize=10&searchValue`,
//       ``
//     );
//     if (driverListData?.data?.status === "ok") {
//       setRowData(driverListData?.data?.data);
//     }
//   };

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   useEffect(() => {
//     async function loadData() {
//       await getData();
//     }

//     loadData();
//   }, []);

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
//         getData(); // Update the list if necessary
//       } else {
//         Swal.fire("Error", result.message, "error");
//       }
//     } else {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   return (
//     <>
//       <PageTitle>Driver List</PageTitle>
//       <div className="row g-5 g-xl-8">
//         <div className={`card `}>
//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title align-items-start flex-column">
//               <span className="card-label fw-bold fs-3 mb-1">Driver List</span>
//             </h3>
//             <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a driver"
//             >
//               <Link
//                 to={`/activities/driver/create`}
//                 className="btn btn-sm btn-light-primary"
//               >
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New Driver
//               </Link>
//             </div>
//           </div>
//           <div className="card-body py-3">
//             <div className="table-responsive">
//               <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//                 <thead>
//                   <tr className="fw-bold text-muted">
//                     <th className="min-w-100px">Profile Picture</th>
//                     <th className="min-w-100px">Name</th>
//                     <th className="min-w-200px">Email ID</th>
//                     <th className="min-w-100px">Username</th>
//                     <th className="min-w-100px">Mobile Number</th>
//                     <th className="min-w-100px">Created At</th>
//                     <th className="min-w-100px">Status</th>
//                     <th className="min-w-100px text-end">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rowData?.length > 0 ? (
//                     rowData.map((result: any) => {
//                       return (
//                         <tr key={result._id}>
//                           <td>
//                             <div className="d-flex align-items-center">
//                               <div className="symbol symbol-45px me-5">
//                                 <img
//                                   src={toAbsoluteUrl(
//                                     "media/avatars/header-logo.jpeg"
//                                   )}
//                                   alt=""
//                                 />
//                               </div>
//                             </div>
//                           </td>
//                           <td>{result?.name}</td>
//                           <td>{result?.email}</td>
//                           <td>{result?.userName}</td>
//                           <td>
//                             {result?.dialCode} {result?.mobile}
//                           </td>
//                           <td>{stringToDate(result?.created_at)}</td>
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
//                                 to={`/activities/driver/${result?._id}`}
//                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
//                               >
//                                 <KTIcon iconName="pencil" className="fs-3" />
//                               </Link>

//                               <button
//                                 onClick={() => deleteDriver(result?._id)}
//                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
//                               >
//                                 <KTIcon iconName="trash" className="fs-3" />
//                               </button>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td>No Drivers Found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
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

// export default ActivitiesDriverList;
import { FC, useCallback, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  deleteRequest,
  getRequest,
  getRequestPost,
} from "../../../modules/auth/core/_requests";
import AlertBox from "../../../../common/AlertBox";
import { stringToDate } from "../../../../common/Date";
import { Switch, CircularProgress } from "@mui/material";
import changeStatus from "../../../../common/ChangeStatus";
import Swal from "sweetalert2";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import logo from "../../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
interface User {
  _id: string;
  name: string;
  email: string;
  dialCode: string;
  mobile: string;
  userType: string;
  is_active: boolean;
  is_deleted: boolean;
  created_by: {
    _id: string;
    name: string;
  };
  created_at: string;
  updated_at: string;
  updated_by: {
    _id: string;
    name: string;
  };
}

interface HandleChangeStatusProps {
  id: string;
  newStatus: boolean;
}
const ActivitiesDriverList: FC = () => {
  const [rowData, setRowData] = useState<User[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const pageSize = 10;

  const deleteDriver = async (ID: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      setLoading(true);
      await deleteRequest(`/user/delete/` + ID).then(async (response) => {
        setLoading(false);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Driver has been deleted successfully`);
          await getData();
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      });
    }
  };

  const getData = useCallback(async () => {
    setLoading(true);
    const driverListData = await getRequestPost(`/activities/drivers?pageIndex=${page}&pageSize=${pageSize}`, ``);
    setLoading(false);


    setTotal(driverListData?.data?.totalCount)
    if (driverListData?.data?.status === "ok") {
      setRowData(driverListData?.data?.data);
    }
  }, [page])

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  useEffect(() => {
    async function loadData() {
      await getData();
    }

    loadData();
  }, [getData]);
  const handleChangeStatus = async (
    id: string,
    newStatus: boolean
  ): Promise<void> => {
    const token = localStorage.getItem("token"); // Get token from localStorage
    if (!token) {
      console.error("Token is missing");
      alert("Authentication failed. Please log in again.");
      return;
    }

    const url = `https://adminapi.flexiclean.me/api/v1/activities/driver/672129d2f8759d6d24574ff1`;
    const payload = {
      data: {
        name: "flexi",
        email: "flexiclean@gmail.com",
        dialCode: "+91",
        mobile: "858659786",
        userType: "adminDriver",
        is_active: false,
      },
    };
    const payloadText = JSON.stringify(payload);

    console.log("Request URL:", url);
    console.log("Request Payload in text format:", payloadText);

    setLoading(true); // Start loading

    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: payloadText, // Send the stringified payload
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (response.ok && result?.status === "ok") {
        console.log("Driver status updated successfully.");
        alert("Driver status updated successfully!");

        // Update the row data in your state
        setRowData((prevData) =>
          prevData.map((item) =>
            item._id === id ? { ...item, is_active: newStatus } : item
          )
        );
      } else {
        console.error("Error:", result.message || "Unknown error");
        alert(
          `Error: ${result.message || "Something went wrong. Please try again."
          }`
        );
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred. Please check your connection and try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const columns: GridColDef[] = [
    // {
    //   field: "profilePicture",
    //   headerName: "Profile Picture",
    //   width: 150,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <img
    //       style={{
    //         width: "45px",
    //         height: "45px",
    //         borderRadius: "50%",
    //         objectFit: "cover",
    //       }}
    //       src={
    //         params.row.companyLogo
    //           ? `http://agentapi.flexiclean.me/${params.row.companyLogo}`
    //           : logo
    //       }
    //       alt="Logo"
    //       onError={(e) => {
    //         (e.target as HTMLImageElement).src = logo;
    //       }}
    //     />
    //   ),
    // },
    { field: "name", headerName: "Name", width: 150 },
    { field: "email", headerName: "Email ID", width: 250 },
    {
      field: "mobile",
      headerName: "Mobile Number",
      width: 150,
      renderCell: (params) => `${params.row.dialCode} ${params.row.mobile}`,
    },

    {
      field: "updated_at",
      headerName: "Created At",
      width: 150,
      renderCell: (params) =>
        format(new Date(params.row.updated_at), "dd/MM/yyyy"),
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 100,
      renderCell: (params) => (
        <Switch
          checked={params.row.is_active}
          onChange={() => {
            const imgUrl = params.row.imgUrl || ""; // Use imgUrl if available, else default to ""
            // Call the handleChangeStatus function with the user ID, toggled status, and imgUrl
            handleChangeStatus(params.row._id, !params.row.is_active);
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
    {
      field: "options",
      headerName: "Options",
      width: 150,
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={(e) => {
              const selectedOption = e.target.value;

              if (selectedOption === "edit") {
                // Store the row data in localStorage before navigating
                localStorage.setItem(
                  "editDriverData",
                  JSON.stringify(params.row)
                );

                // Navigate to the edit page using the driver's _id in the URL
                navigate(`/activities/driver/${params.row._id}`, {
                  state: params.row, // Optional: can also pass state to the navigate call
                });
              } else if (selectedOption === "delete") {
                deleteDriver(params.row._id); // Ensure you're passing the correct id
              }
            }}
          >
            <option value="">...</option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
          </select>
        </div>
      ),
    },
  ];

  return (
    <>
      <PageTitle>Driver  List</PageTitle>
      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5 d-flex justify-content-between mb-5">
            <div>
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Driver List
                </span>
              </h3>
            </div>

            <div
              className="card-toolbar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              title="Click to add a driver"
            >
              <Link
                to={`/activities/driver/create`}
                className="btn btn-sm btn-light-primary"
              >
                <KTIcon iconName="plus" className="fs-3" />
                New Driver
              </Link>
            </div>
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
              <div style={{ height: 600, width: "100%" }}>
                <DataGrid
                  rows={rowData}
                  columns={columns}
                  autoHeight={true}
                  hideFooter={true}
                  getRowId={(row) => row._id}
                />
                <div className="pagewrapper">
                  <ReactPaginate
                    containerClassName="pagination"
                    pageClassName="page-item"
                    activeClassName="active"
                    onPageChange={(event) => setPage(event.selected)}
                    pageCount={Math.ceil(total / pageSize)}
                    breakLabel="..."
                    previousLabel={
                      <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
                        <AiFillLeftCircle />
                      </IconContext.Provider>
                    }
                    nextLabel={
                      <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
                        <AiFillRightCircle />
                      </IconContext.Provider>
                    }
                  />
                </div>
              </div>
            )}

          </div>

        </div>


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
    </>
  );
};

export default ActivitiesDriverList;
