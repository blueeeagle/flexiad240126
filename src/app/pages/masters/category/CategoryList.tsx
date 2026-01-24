// import { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { toAbsoluteUrl } from "../../../../_metronic/helpers";
// import { Link } from "react-router-dom";
// import { postRequest } from "../../../modules/auth/core/_requests";
// import { stringToDate } from "../../../../common/Date";
// import { deleteRequest } from "../../../modules/auth/core/_requests";
// import AlertBox from "../../../../common/AlertBox";
// import Swal from "sweetalert2";
// import changeStatus from "../../../../common/ChangeStatus";
// import { Switch } from "@mui/material";

// const CategoryList: FC = () => {
//   const [rowData, setRowData] = useState([]);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   const getData = async () => {
//     const stateData = await postRequest(`/master/categories`, ``);
//     if (stateData?.data?.status === "ok") {
//       setRowData(stateData?.data?.data);
//     }
//   };

//   const deleteCategory = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       await deleteRequest(`/master/category/` + ID).then(async (response) => {
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg(`Category has been deleted successfully`);
//           await getData();
//         } else {
//           setIsFailed(true);
//           setErrorMsg(`Something Went Wrong`);
//         }
//       });
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
//       Url: `/master/categoryStatus/${id}`,
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
//       <PageTitle>CATEGORY</PageTitle>

//       <div className="row g-5 g-xl-8">
//         <div className={`card `}>
//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title align-items-start flex-column">
//               <span className="card-label fw-bold fs-3 mb-1">
//                 Category List
//               </span>
//             </h3>
//             <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a category"
//             >
//               <Link
//                 to="/category/create"
//                 className="btn btn-sm btn-light-primary"
//               >
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New Category
//               </Link>
//             </div>
//           </div>
//           <div className="card-body py-3">
//             <div className="table-responsive">
//               <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//                 <thead>
//                   <tr className="fw-bold text-muted">
//                     <th className="min-w-100px">Image</th>
//                     <th className="min-w-100px">Category Name</th>
//                     <th className="min-w-200px">Services</th>
//                     <th className="min-w-200px">Last Updated On</th>
//                     <th className="min-w-100px">Status</th>
//                     <th className="min-w-100px text-end">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rowData?.length > 0 ? (
//                     rowData.map((result: any) => {
//                       return (
//                         <tr key={result?._id}>
//                           <td>
//                             <div className="d-flex align-items-center">
//                               <div className="symbol symbol-45px me-5">
//                                 <img
//                                   src={toAbsoluteUrl(
//                                     "media/avatars/shirt.jpeg"
//                                   )}
//                                   alt=""
//                                 />
//                               </div>
//                             </div>
//                           </td>
//                           <td>{result?.categoryName}</td>
//                           <td>{result?.serviceId?.serviceName}</td>
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
//                                 to={`/category/${result?._id}`}
//                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
//                               >
//                                 <KTIcon iconName="pencil" className="fs-3" />
//                               </Link>
//                               <span
//                                 onClick={(e) => deleteCategory(result?._id)}
//                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
//                               >
//                                 <KTIcon iconName="trash" className="fs-3" />
//                               </span>
//                             </div>
//                           </td>
//                         </tr>
//                       );
//                     })
//                   ) : (
//                     <tr>
//                       <td>No Categories Found</td>
//                     </tr>
//                   )}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//       {isSuccess && (
//         <AlertBox redirectUrl={`/area`} close={closeAlert} type={`success`}>
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
  const [itemsPerPage] = useState(10); // Change this to set the number of items per page
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const closeAlert = () => {
    setIsSuccess(false);
    setIsFailed(false);
  };

  const getData = async () => {
    setIsLoading(true);
    const stateData = await postRequest(`/master/categories`, ``);
    if (stateData?.data?.status === "ok") {
      setRowData(stateData?.data?.data);
    }
    setIsLoading(false);
  };

  const deleteCategory = async (id: string) => {
    setIsLoading(true);
    const confirmDelete = window.confirm("Are you sure to delete this record?");
    if (confirmDelete) {
      try {
        const response = await deleteRequest(`/master/category/` + id);
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

  // Calculate the paginated data
  const paginatedData = rowData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );
  
 
  
  const columns: GridColDef[] = [
    // {
    //   field: "image",
    //   headerName: "Image",
    //   width: 100,
    //   renderCell: (params: GridRenderCellParams) => (
    //     <img
    //     src="/media/avatars/shirt.jpeg"
    //     alt="category"
    //     style={{ width: "45px", height: "45px" }}
    //     />
    //   ),
    // },
    
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
      width: 150,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue === "statusUpdate") {
                navigate(`/category/${params.row._id}`);
              } else if (selectedValue === "paymentUpdate") {
                deleteCategory(params.row._id);
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

  // Handle page change
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
                    Category List
                  </span>
                </h3>
              </div>

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
            </div>
            <div className="card-body py-3">
              <div>
                <DataGrid
                  rows={paginatedData}
                  columns={columns}
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
