// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { FC, useCallback, useEffect, useState } from "react";
// import { PageTitle } from "../../../_metronic/layout/core";
// import { KTIcon } from "../../../_metronic/helpers";
// import { Link } from "react-router-dom";
// import { getRequest } from "../../modules/auth/core/_requests";
// import { stringToDate } from "../../../common/Date";
// import ReactPaginate from "react-paginate";
// import { IconContext } from "react-icons";
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
// import changeStatus from "../../../common/ChangeStatus";
// import Swal from "sweetalert2";
// import { Switch } from "@mui/material";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
// import logo from "../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
// const CustomerList: FC = () => {
//   const [rowData, setRowData] = useState<any[]>([]);
//   const [page, setPage] = useState(0);
//   const [total, setTotal] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [searchValue, setSearchValue] = useState("");
//   const pageSize = 10;

//   const getCustomers =useCallback( async () => {
//     setLoading(true); // Start loading
//     try {
//       const CustomerList = await getRequest(
//         `/customer/list`,
//         `?pageIndex=${page}&pageSize=${pageSize}&searchValue=${searchValue} `
//       );

//       const lookupObj = [CustomerList];
//       let data1: Array<any> = [];
//       return Promise.allSettled(lookupObj)
//         .then((result) => {
//           result.forEach((res: any) => {
//             data1.push(res.value);
//           });
//           return data1;
//         })
//         .then((d) => {
//           const dataobj = {
//             customerData: d[0]?.data?.status === "ok" ? d[0]?.data : [],
//           };
//           setRowData(dataobj?.customerData?.data);
//           setTotal(dataobj?.customerData?.totalCount);
//         });
//     } catch (error) {
//       console.error("Failed to fetch customers", error);
//       Swal.fire("Error", "Failed to fetch customers", "error");
//     } finally {
//       setLoading(false); // End loading
//     }
//   },[page, searchValue])

//   const columns: GridColDef[] = [
//     {
//       field: "companyLogo",
//       headerName: "Logo",
//       width: 100,
//       renderCell: (params: any) => (
//         <img
//           style={{
//             width: "45px",
//             height: "45px",
//             borderRadius: "50%",
//             objectFit: "cover",
//           }}
//           src={logo}

//           alt="Logo"
//           onError={(e) => {
//             (e.target as HTMLImageElement).src = logo;
//           }}
//         />
//       ),
//     },
//     {
//       field: "firstName",
//       headerName: "Name",
//       width: 200,
//       renderCell: (params: any) => (
//         <Link to={`/customer/profile/${params.row._id}`}>
//           {params.row.firstName} {params.row.lastName}
//         </Link>
//       ),
//     },
//     { field: "email", headerName: "Email", width: 250 },
//     { field: "mobile", headerName: "Mobile", width: 150 },
//     { field: "customerType", headerName: "Customer Type", width: 150 },
//     {
//       field: "created_at",
//       headerName: "Created At",
//       width: 150,
//       renderCell: (params: any) => stringToDate(params.row.created_at),
//     },
//     {
//       field: "updated_at",
//       headerName: "Updated At",
//       width: 150,
//       renderCell: (params: any) => stringToDate(params.row.updated_at),
//     },
//     {
//       field: "is_active",
//       headerName: "Status",
//       width: 100,
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
//   ];

//   useEffect(() => {
//     async function fetchData() {
//       await getCustomers();
//     }
//     fetchData();
//   }, [getCustomers, page]);

//   const handleChangeStatus = async (id: any, status: any) => {
//     const result = await changeStatus({ id, status, Url: `/customer/${id}` });

//     if (result) {
//       if (result.success) {
//         Swal.fire("Success", result.message, "success");
//         getCustomers(); // Update the list if necessary
//       } else {
//         Swal.fire("Error", result.message, "error");
//       }
//     } else {
//       Swal.fire("Error", "Something went wrong", "error");
//     }
//   };

//   const handleInputChange = (e:any) => {
//     setSearchValue(e.target.value);
//   };

//   const handleSelectChange = (e:any) => {
//     setSearchValue(e.target.value);
//   };

//   return (
//     <>
//       <PageTitle>CUSTOMERS</PageTitle>

//       <div className="row g-5 g-xl-8">
//         <div className="">
//           <div className="d-flex justify-content-end w-100 align-items-end gap-3">
//             {/* Search Input */}
//             <input
//               type="text"
//               className="form-control"
//               name="searchValue"
//               value={searchValue}
//               onChange={handleInputChange}
//               placeholder="Search..."
//               style={{ width: "200px" }}
//             />

//             {/* Select Dropdown */}
//             <select
//               className="form-select"
//               name="searchValue"
//               value={searchValue}
//               onChange={handleSelectChange}
//               style={{ width: "200px" }}
//             >
//               <option value="">Customer Type</option>
//               <option value="POS">POS</option>
//               <option value="online">online</option>
//               {/* <option value="Pending">Pending</option> */}
//             </select>
//           </div>

//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title align-items-start flex-column">
//               <span className="card-label fw-bold fs-3 mb-1">
//                 Customer List
//               </span>
//             </h3>
//             {/* <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a user"
//             >
//               <Link to={`/`} className="btn btn-sm btn-light-primary">
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New Customer
//               </Link>
//             </div> */}
//           </div>
//           <div className="card-body py-3">
//             {loading ? ( // Step 3: Conditional rendering for loading
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
//                     filter: "hue-rotate(200deg)", // Adjust the degree for a blue effect
//                   }}
//                 />
//               </div>
//             ) : (
//               <div className="table-responsive">
//                 <DataGrid
//                   rows={rowData}
//                   columns={columns}
//                   getRowId={(row: any) => row._id}
//                   hideFooter={true}
//                   sx={{
//                     "& .MuiDataGrid-columnHeader:focus, & .MuiDataGrid-cell:focus":
//                     {
//                       outline: "none",
//                       border: "none",
//                       backgroundColor: "transparent",
//                     },
//                     "& .MuiDataGrid-columnHeader:focus-visible, & .MuiDataGrid-cell:focus-visible":
//                     {
//                       outline: "none",
//                       border: "none",
//                       backgroundColor: "transparent",
//                     },
//                     "& .MuiDataGrid-cell:active": {
//                       outline: "none",
//                       border: "none",
//                     },
//                   }}
//                 />
//                 {total > pageSize && (
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "flex-end",
//                       alignItems: "center",
//                       marginTop: "20px",
//                       padding: "10px",
//                       backgroundColor: "#f8f9fa",
//                       borderRadius: "8px",
//                       flexWrap: "wrap",
//                     }}
//                   >
//                     <ReactPaginate
//                       containerClassName={"pagination"}
//                       pageClassName={"page-item"}
//                       activeClassName={"active"}
//                       onPageChange={(event) => {
//                         setPage(event.selected); // Update the page state with the clicked page index
//                       }}
//                       pageCount={Math.ceil(total / pageSize)}
//                       forcePage={page} // This ensures that the active page is synchronized with the current state
//                       previousLabel="←"
//                       nextLabel="→"
//                       previousClassName="previous"
//                       nextClassName="next"
//                       pageLinkClassName="page-link"
//                       previousLinkClassName="previous-link"
//                       nextLinkClassName="next-link"
//                     />
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default CustomerList;
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useCallback, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { KTIcon } from "../../../_metronic/helpers";
import { Link } from "react-router-dom";
import { getRequest } from "../../modules/auth/core/_requests";
import { stringToDate } from "../../../common/Date";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import changeStatus from "../../../common/ChangeStatus";
import Swal from "sweetalert2";
import { Switch } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import logo from "../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
import { getActivitiesPermissions } from "../../utils/getPermissions";

const CustomerList: FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const pageSize = 10;

  // Permissions
  const permissions = getActivitiesPermissions();
  const canView = permissions.includes("view");
  const canEdit = permissions.includes("edit");
  const canDelete = permissions.includes("delete");
  const canCreate = permissions.includes("create");

  console.log("CustomerList Permissions:", { canView, canEdit, canDelete, canCreate });

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

  const getCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const CustomerList = await getRequest(
        `/customer/list`,
        `?pageIndex=${page}&pageSize=${pageSize}&searchValue=${searchValue}`
      );
      const lookupObj = [CustomerList];
      let data1: Array<any> = [];
      await Promise.allSettled(lookupObj)
        .then((result) => {
          result.forEach((res: any) => {
            data1.push(res.value);
          });
          return data1;
        })
        .then((d) => {
          const dataobj = {
            customerData: d[0]?.data?.status === "ok" ? d[0]?.data : [],
          };
          setRowData(dataobj?.customerData?.data);
          setTotal(dataobj?.customerData?.totalCount);
        });
    } catch (error) {
      console.error("Failed to fetch customers", error);
      Swal.fire("Error", "Failed to fetch customers", "error");
    } finally {
      setLoading(false);
    }
  }, [page, searchValue]);

  const handleChangeStatus = async (id: any, status: any) => {
    if (!canEdit) return;
    const result = await changeStatus({ id, status, Url: `/customer/${id}` });
    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        getCustomers();
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Define columns dynamically
  const baseColumns: GridColDef[] = [
    {
      field: "companyLogo",
      headerName: "Logo",
      width: 100,
      renderCell: (params: any) => (
        <img
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={logo}
          alt="Logo"
          onError={(e) => {
            (e.target as HTMLImageElement).src = logo;
          }}
        />
      ),
    },
    {
      field: "firstName",
      headerName: "Name",
      width: 200,
      renderCell: (params: any) => {
        const fullName = `${params.row.firstName} ${params.row.lastName}`;
        if (canEdit) {
          return <Link to={`/customer/profile/${params.row._id}`}>{fullName}</Link>;
        }
        return <span>{fullName}</span>;
      },
    },
    { field: "email", headerName: "Email", width: 250 },
    { field: "mobile", headerName: "Mobile", width: 150 },
    { field: "customerType", headerName: "Customer Type", width: 150 },
    {
      field: "created_at",
      headerName: "Created At",
      width: 150,
      renderCell: (params: any) => stringToDate(params.row.created_at),
    },
    {
      field: "updated_at",
      headerName: "Updated At",
      width: 150,
      renderCell: (params: any) => stringToDate(params.row.updated_at),
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 100,
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

  useEffect(() => {
    getCustomers();
  }, [getCustomers, page]);

  const handleInputChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  const handleSelectChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <PageTitle>CUSTOMERS</PageTitle>

      <div className="row g-5 g-xl-8">
        <div className="">
          <div className="d-flex justify-content-end w-100 align-items-end gap-3">
            <input
              type="text"
              className="form-control"
              name="searchValue"
              value={searchValue}
              onChange={handleInputChange}
              placeholder="Search..."
              style={{ width: "200px" }}
            />
            <select
              className="form-select"
              name="searchValue"
              value={searchValue}
              onChange={handleSelectChange}
              style={{ width: "200px" }}
            >
              <option value="">Customer Type</option>
              <option value="POS">POS</option>
              <option value="online">online</option>
            </select>
          </div>

          <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
            <h3 className="card-title align-items-start flex-column">
              <span className="card-label fw-bold fs-3 mb-1">Customer List</span>
            </h3>
            {canCreate && (
              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Click to add a customer"
              >
                <Link to="/customer/create" className="btn btn-sm btn-light-primary">
                  <KTIcon iconName="plus" className="fs-3" />
                  New Customer
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
              <div className="table-responsive">
                <DataGrid
                  rows={rowData}
                  columns={baseColumns}
                  getRowId={(row: any) => row._id}
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
                {total > pageSize && (
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
                      containerClassName="pagination"
                      pageClassName="page-item"
                      activeClassName="active"
                      onPageChange={(event) => setPage(event.selected)}
                      pageCount={Math.ceil(total / pageSize)}
                      forcePage={page}
                      previousLabel="←"
                      nextLabel="→"
                      previousClassName="previous"
                      nextClassName="next"
                      pageLinkClassName="page-link"
                      previousLinkClassName="previous-link"
                      nextLinkClassName="next-link"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerList;