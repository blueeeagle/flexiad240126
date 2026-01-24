import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import {
  postRequest,
  deleteRequest,
} from "../../../modules/auth/core/_requests";
import { stringToDate } from "../../../../common/Date";
import { Switch } from "@mui/material";
import changeStatus from "../../../../common/ChangeStatus";
import Swal from "sweetalert2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
const TaxList: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const deleteTaxItem = async (ID: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      await deleteRequest(`/master/tax/` + ID).then(async (response) => {
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Tax item has been deleted successfully`);
          await getData();
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      });
    }
  };

  const getData = async () => {
    setIsLoading(true);
    const taxListData = await postRequest(`/master/taxes`, ``);
    if (taxListData?.data?.status === "ok") {
      setRowData(taxListData?.data?.data);
    }
    setIsLoading(false);
  };

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const handleChangeStatus = async (id: any, status: any) => {
    const result = await changeStatus({
      id,
      status,
      Url: `/master/changeTaxStatus/${id}`,
    });

    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        getData(); // Update the list if necessary
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  useEffect(() => {
    async function loadData() {
      await getData();
    }

    loadData();
  }, []);
  const columns: GridColDef[] = [
    {
      field: "taxName",
      headerName: "Tax Name",
      flex: 1,
      renderCell: (params: any) => (
        <Link to={`${params.row?._id}`} state={params.row}>
          {params.row?.taxName}
        </Link>
      ),
    },
    {
      field: "serviceName",
      headerName: "Services",
      renderCell: (params: any) => params.row?.serviceId?.serviceName || "",
      flex: 1,
    },
    {
      field: "value",
      headerName: "%",
      width: 100,
    },
 
    {
      field: "updated_at",
      headerName: "Updated On",
      renderCell: (params: any) => stringToDate(params.value),
      flex: 1,
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 150,
      renderCell: (params: any) => (
        <Switch
          checked={params.value || false}
          onChange={() => handleChangeStatus(params.row._id, params.value)}
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
    {
        field: "actions",
        headerName: "Actions",
        width: 150,
        renderCell: (params: any) => {
          const navigate = useNavigate();
      
          const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
            const action = event.target.value;
            const itemId = params.row?._id;
      
            // Handle the selected action
            if (action === "edit") {
              navigate(`/settings/tax/${itemId}`, { state: params.row });
            } else if (action === "delete") {
              deleteTaxItem(itemId);
            }
          };
      
          return (
            <div className="action-dropdown">
          <select
            className="form-select"
                onChange={handleSelectChange}
            
                defaultValue=""
              >
                <option value="" disabled>...</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
              </select>
            </div>
          );
        },
      }
      
  ];
  return (
    <>
      <PageTitle>TAX</PageTitle>
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
      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5 d-flex justify-content-between mb-5 align-items-center">
            <div>
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">Tax List</span>
            </h3>
            </div>
        
            <div
              className="card-toolbar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              title="Click to add a Role"
            >
              <Link to={`create`} className="btn btn-sm btn-light-primary">
                <KTIcon iconName="plus" className="fs-3" />
                New Tax
              </Link>
            </div>
          </div>
          <div className="card-body py-3">
            <div>
              <DataGrid
                rows={rowData}
                columns={columns}
                getRowId={(row: any) => row._id}
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
          
          </div>
        </div>
      </div>
    )}
    </>
  );
};

export default TaxList;
// import { FC, useState, useEffect } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   postRequest,
//   deleteRequest,
// } from "../../../modules/auth/core/_requests";
// import { stringToDate } from "../../../../common/Date";
// import { Switch } from "@mui/material";
// import changeStatus from "../../../../common/ChangeStatus";
// import Swal from "sweetalert2";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
// const TaxList: FC = () => {
//   const [rowData, setRowData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false); // Add loading state
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const navigate = useNavigate();
//   const deleteTaxItem = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       setIsLoading(true); // Start loading
//       await deleteRequest(`/master/tax/` + ID)
//         .then(async (response) => {
//           if (response?.data?.status === "ok") {
//             setIsSuccess(true);
//             setSuccessMsg(`Tax item has been deleted successfully`);
//             await getData();
//           } else {
//             setIsFailed(true);
//             setErrorMsg(`Something Went Wrong`);
//           }
//         })
//         .finally(() => setIsLoading(false));
//     }
//   };

//   const getData = async () => {
//     setIsLoading(true);
//     const taxListData = await postRequest(`/master/taxes`, ``);
//     if (taxListData?.data?.status === "ok") {
//       setRowData(taxListData?.data?.data);
//     }
//     setIsLoading(false);
//   };

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   const handleChangeStatus = async (id: any, status: any) => {
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/master/changeTaxStatus/${id}`,
//     });

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
//     async function loadData() {
//       await getData();
//     }

//     loadData();
//   }, []);

//   const columns: GridColDef[] = [
//     {
//       field: "taxName",
//       headerName: "Tax Name",
//       flex: 1,
//       renderCell: (params: any) => (
//         <Link to={`settings/tax/${params.row._id}`} state={params.row}>
//         {params.row.taxName}
//       </Link>
//       ),
//     },
//     {
//       field: "serviceName",
//       headerName: "Services",
//       renderCell: (params: any) => params.row?.serviceId?.serviceName || "",
//       flex: 1,
//     },
//     {
//       field: "value",
//       headerName: "value",
//       width: 100,
//     },
//     {
//       field: "type",
//       headerName: "Type",
//       width: 150,
//     },
//     {
//       field: "updated_at",
//       headerName: "Updated On",
//       renderCell: (params: any) => stringToDate(params.value),
//       flex: 1,
//     },
//     {
//       field: "is_active",
//       headerName: "Status",
//       width: 150,
//       renderCell: (params: any) => (
//         <Switch
//           checked={params.value || false}
//           onChange={() => handleChangeStatus(params.row._id, params.value)}
//           inputProps={{ "aria-label": "controlled" }}
//         />
//       ),
//     },
//     {
//       field: "actions",
//       headerName: "Actions",
//       width: 150,
//       renderCell: (params: any) => {
//         const handleActionChange = (
//           event: React.ChangeEvent<{ value: unknown }>
//         ) => {
//           const selectedAction = event.target.value;
//           if (selectedAction === "edit") {
//             navigate(`${params.row._id}`, { state: params.row });
//           } else if (selectedAction === "delete") {
//             deleteTaxItem(params.row._id);
//           }
//         };
//         return (
//           <div className="action-dropdown">
//             <select
//               className="form-select border-0"
//               defaultValue=""
//               onChange={handleActionChange}
//             >
//               <option value="" disabled>
//                 ...
//               </option>
//               <option value="edit">Edit</option>
//               <option value="delete">Delete</option>
//             </select>
//           </div>
//         );
//       },
//     },
//   ];

//   return (
//     <>
//       <PageTitle>TAX</PageTitle>
//       <div className="row g-5 g-xl-8">
//         <div>
//           <div className="card-header border-0 pt-5 d-flex justify-content-between mb-5">
//             <div>
//               <h3 className="card-title align-items-start flex-column">
//                 <span className="card-label fw-bold fs-3 mb-1">Tax List</span>
//               </h3>
//             </div>

//             <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a Tax"
//             >
//                    <Link to={`create`} className="btn btn-sm btn-light-primary">
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New Tax
//               </Link>
//             </div>
//           </div>
//           <div className="card-body py-3">
//             {isLoading ? (
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
//               <div>
//                 <DataGrid
//                   rows={rowData}
//                   columns={columns}
//                   getRowId={(row:any) => row._id}
//                   autoHeight={true}
//                   hideFooter={true}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default TaxList;
