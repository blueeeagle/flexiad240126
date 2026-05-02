// import { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   postRequest,
//   deleteRequest,
// } from "../../../modules/auth/core/_requests";
// import { stringToDate } from "../../../../common/Date";
// import AlertBox from "../../../../common/AlertBox";
// import Swal from "sweetalert2";
// import changeStatus from "../../../../common/ChangeStatus";
// import { Switch } from "@mui/material";
// import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
// import ReactPaginate from "react-paginate";

// interface Category {
//   _id: string;
//   categoryName: string;
//   serviceId?: {
//     serviceName: string;
//   };
//   updated_at: string;
//   is_active: boolean;
// }

// const CategoryList: FC = () => {
//   const [rowData, setRowData] = useState<Category[]>([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [itemsPerPage] = useState(10); // Change this to set the number of items per page
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState("");
//   const [errorMsg, setErrorMsg] = useState("");
//   const [isFailed, setIsFailed] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const navigate = useNavigate();
//   const closeAlert = () => {
//     setIsSuccess(false);
//     setIsFailed(false);
//   };

//   const getData = async () => {
//     setIsLoading(true);
//     const stateData = await postRequest(`/master/categories`, ``);
//     if (stateData?.data?.status === "ok") {
//       setRowData(stateData?.data?.data);
//     }
//     setIsLoading(false);
//   };

//   const deleteCategory = async (id: string) => {
//     setIsLoading(true);
//     const confirmDelete = window.confirm("Are you sure to delete this record?");
//     if (confirmDelete) {
//       try {
//         const response = await deleteRequest(`/master/category/` + id);
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg("Category has been deleted successfully");
//           await getData();
//         } else {
//           setIsFailed(true);
//           setErrorMsg("Something went wrong");
//         }
//       } catch (error) {
//         setIsFailed(true);
//         setErrorMsg("Error while deleting category");
//       }
//     }
//     setIsLoading(false);
//   };

//   const handleChangeStatus = async (id: string, status: boolean) => {
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/master/categoryStatus/${id}`,
//     });
//     if (result?.success) {
//       Swal.fire("Success", result.message, "success");
//       getData();
//     } else {
//       Swal.fire("Error", result?.message || "Something went wrong", "error");
//     }
//   };

//   useEffect(() => {
//     getData();
//   }, []);

//   // Calculate the paginated data
//   const paginatedData = rowData.slice(
//     currentPage * itemsPerPage,
//     (currentPage + 1) * itemsPerPage
//   );
  
 
  
//   const columns: GridColDef[] = [
//     // {
//     //   field: "image",
//     //   headerName: "Image",
//     //   width: 100,
//     //   renderCell: (params: GridRenderCellParams) => (
//     //     <img
//     //     src="/media/avatars/shirt.jpeg"
//     //     alt="category"
//     //     style={{ width: "45px", height: "45px" }}
//     //     />
//     //   ),
//     // },
    
//     {
//       field: "image",
//       headerName: "Image",
//       minWidth: 100,
//       renderCell: (params: any) => {
//         const imageUrl = params.row?.icon
//           ? `${import.meta.env.VITE_IMAGE_BASE_URL}/${params.row.icon}`
//           : "media/avatars/shirt.jpeg";
        
          
//         return (
//           <div className="d-flex align-items-center">
//             <div className="symbol symbol-45px me-5">
//               <img src={imageUrl} alt="icon" style={{ width: "100%", borderRadius: "50%" }} />
//             </div>
//           </div>
//         );
//       },
//     },
//     {
//       field: "categoryName",
//       headerName: "Category Name",
//       width: 200,
//     },
//     {
//       field: "serviceId",
//       headerName: "Services",
//       width: 200,
//       renderCell: (params: any) => params.row?.serviceId?.serviceName || "N/A",
//     },
//     {
//       field: "updated_at",
//       headerName: "Last Updated On",
//       width: 200,
//       renderCell: (params: any) => stringToDate(params.row?.updated_at),
//     },
//     {
//       field: "is_active",
//       headerName: "Status",
//       width: 150,
//       renderCell: (params: GridRenderCellParams) => (
//         <Switch
//           checked={params.row.is_active}
//           onChange={() =>
//             handleChangeStatus(params.row._id, params.row.is_active)
//           }
//           inputProps={{ "aria-label": "controlled" }}
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
//                 navigate(`/category/${params.row._id}`);
//               } else if (selectedValue === "paymentUpdate") {
//                 deleteCategory(params.row._id);
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

//   // Handle page change
//   const handlePageChange = (event: { selected: number }) => {
//     setCurrentPage(event.selected);
//   };

//   return (
//     <>
//       <PageTitle>CATEGORY</PageTitle>
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
//               filter: "hue-rotate(200deg)", // Adjust the degree for a blue effect
//             }}
//           />
//         </div>
//       ) : (
//         <div className="row g-5 g-xl-8">
//           <div>
//             <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center mb-5">
//               <div>
//                 <h3 className="card-title align-items-start flex-column">
//                   <span className="card-label fw-bold fs-3 mb-1">
//                     Category List
//                   </span>
//                 </h3>
//               </div>

//               <div
//                 className="card-toolbar"
//                 data-bs-toggle="tooltip"
//                 data-bs-placement="top"
//                 data-bs-trigger="hover"
//                 title="Click to add a category"
//               >
//                 <Link
//                   to="/category/create"
//                   className="btn btn-sm btn-light-primary"
//                 >
//                   <KTIcon iconName="plus" className="fs-3" />
//                   New Category
//                 </Link>
//               </div>
//             </div>
//             <div className="card-body py-3">
//               <div>
//                 <DataGrid
//                   rows={paginatedData}
//                   columns={columns}
//                   getRowId={(row) => row._id}
//                   autoHeight={true}
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
//               </div>
//               <div
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   alignItems: "center",
//                   marginTop: "20px",
//                   padding: "10px",
//                   backgroundColor: "#f8f9fa",
//                   borderRadius: "8px",
//                   flexWrap: "wrap",
//                 }}
//               >
//                 <ReactPaginate
//                   pageCount={Math.ceil(rowData.length / itemsPerPage)}
//                   marginPagesDisplayed={2}
//                   pageRangeDisplayed={5}
//                   onPageChange={handlePageChange}
//                   breakLabel="..."
//                   previousLabel="←" // Use arrow or any other label for previous
//                   nextLabel="→" // Use arrow or any other label for next
//                   containerClassName="pagination" // Apply CSS class for styling
//                   pageClassName="page-item"
//                   activeClassName="active"
//                   previousClassName="previous"
//                   nextClassName="next"
//                   pageLinkClassName="page-link"
//                   previousLinkClassName="previous-link"
//                   nextLinkClassName="next-link"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//       {isSuccess && (
//         <AlertBox redirectUrl="/category" close={closeAlert} type="success">
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

// export default CategoryList;
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
import Swal from "sweetalert2";
import changeStatus from "../../../../common/ChangeStatus";
import { Switch } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import ReactPaginate from "react-paginate";
import { getMastersPermissions } from "../../../utils/getPermissions";

interface Category {
  _id: string;
  categoryName: string;
  serviceId?: {
    serviceName: string;
  };
  updated_at: string;
  is_active: boolean;
}

const CategoryList: FC = () => {
  const [rowData, setRowData] = useState<Category[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage] = useState(10);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const permissions = getMastersPermissions();
  
  const currencyPerms = permissions.subMenu["Category"] || [];
  const canView = currencyPerms.includes("view");
  const canEdit = currencyPerms.includes("edit");
  const canDelete = currencyPerms.includes("delete");
  const canCreate = currencyPerms.includes("create");

  console.log("CategoryList Permissions:", { canView, canEdit, canDelete, canCreate });

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
    setIsSuccess(false);
    setIsFailed(false);
  };

  const getData = async () => {
    setIsLoading(true);
    try {
      const stateData = await postRequest(`/master/categories`, ``);
      if (stateData?.data?.status === "ok") {
        setRowData(stateData?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setIsFailed(true);
      setErrorMsg("Error fetching data");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!canDelete) return;
    setIsLoading(true);
    const confirmDelete = window.confirm("Are you sure to delete this record?");
    if (confirmDelete) {
      try {
        const response = await deleteRequest(`/master/category/${id}`);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg("Category has been deleted successfully");
          await getData();
        } else {
          setIsFailed(true);
          setErrorMsg("Something went wrong");
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg("Error while deleting category");
      }
    }
    setIsLoading(false);
  };

  const handleChangeStatus = async (id: string, status: boolean) => {
    if (!canEdit) return;
    const result = await changeStatus({
      id,
      status,
      Url: `/master/categoryStatus/${id}`,
    });
    if (result?.success) {
      Swal.fire("Success", result.message, "success");
      getData();
    } else {
      Swal.fire("Error", result?.message || "Something went wrong", "error");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // Paginated data
  const paginatedData = rowData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  // Base columns (without actions)
  const baseColumns: GridColDef[] = [
    {
      field: "image",
      headerName: "Image",
      minWidth: 100,
      renderCell: (params: any) => {
        const imageUrl = params.row?.icon
          ? `${import.meta.env.VITE_IMAGE_BASE_URL}/${params.row.icon}`
          : "media/avatars/shirt.jpeg";
        return (
          <div className="d-flex align-items-center">
            <div className="symbol symbol-45px me-5">
              <img src={imageUrl} alt="icon" style={{ width: "100%", borderRadius: "50%" }} />
            </div>
          </div>
        );
      },
    },
    {
      field: "categoryName",
      headerName: "Category Name",
      width: 200,
    },
    {
      field: "serviceId",
      headerName: "Services",
      width: 200,
      renderCell: (params: any) => params.row?.serviceId?.serviceName || "N/A",
    },
    {
      field: "updated_at",
      headerName: "Last Updated On",
      width: 200,
      renderCell: (params: any) => stringToDate(params.row?.updated_at),
    },
    {
      field: "is_active",
      headerName: "Status",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Switch
          checked={params.row.is_active}
          onChange={() => handleChangeStatus(params.row._id, params.row.is_active)}
          disabled={!canEdit}
          inputProps={{ "aria-label": "controlled" }}
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
                navigate(`/category/${params.row._id}`);
              } else if (selectedValue === "delete" && canDelete) {
                deleteCategory(params.row._id);
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

  const handlePageChange = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };

  return (
    <>
      <PageTitle>CATEGORY</PageTitle>
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
                  <span className="card-label fw-bold fs-3 mb-1">
                    Category List
                  </span>
                </h3>
              </div>
              {canCreate && (
                <div
                  className="card-toolbar"
                  data-bs-toggle="tooltip"
                  data-bs-placement="top"
                  data-bs-trigger="hover"
                  title="Click to add a category"
                >
                  <Link
                    to="/category/create"
                    className="btn btn-sm btn-light-primary"
                  >
                    <KTIcon iconName="plus" className="fs-3" />
                    New Category
                  </Link>
                </div>
              )}
            </div>
            <div className="card-body py-3">
              <div>
                <DataGrid
                  rows={paginatedData}
                  columns={baseColumns}
                  getRowId={(row) => row._id}
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
        <AlertBox redirectUrl="/category" close={closeAlert} type="success">
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

export default CategoryList;