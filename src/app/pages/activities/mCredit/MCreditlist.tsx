// import { FC, useCallback, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   postRequest,
//   deleteRequest,
// } from "../../../modules/auth/core/_requests";
// import AlertBox from "../../../../common/AlertBox";
// import { Switch } from "@mui/material";
// import changeStatus from "../../../../common/ChangeStatus";
// import Swal from "sweetalert2";
// import { DataGrid, GridColDef } from "@mui/x-data-grid";
// import Lottie from "lottie-react";
// import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
// import ReactPaginate from "react-paginate";
// import { IconContext } from "react-icons";
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
// import { getActivitiesPermissions } from "../../../utils/getPermissions";
// interface PackageData {
//   _id: string;
//   packageTitle: string;
//   description: string;
//   is_active: boolean;
//   created_by: string;
//   updated_at: string;
//   purchaseAmt: number;
//   packageAmt: number;
//   sortNo: number;
//   countryId: {
//     _id: string;
//     name: string;
//   };
//   currencyId: {
//     currency: string;
//     currencySymbol: string;
//     currencyCode: string;
//     decimalPoints: number;
//   };

// }

// const MCreditlist: FC = () => {
//   const [rowData, setRowData] = useState<PackageData[]>([]);
//   const [isSuccess, setIsSuccess] = useState<boolean>(false);
//   const [successMsg, setSuccessMsg] = useState<string>("");
//   const [errorMsg, setErrorMsg] = useState<string>("");
//   const [isFailed, setIsFailed] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [page, setPage] = useState<number>(0);
//   const [total, setTotal] = useState<number>(0);
//   const pageSize = 10;
//   const navigate = useNavigate();
//   const permissions = getActivitiesPermissions();
//   const canView = permissions.includes("view");
//   const canEdit = permissions.includes("edit");
//   const canDelete = permissions.includes("delete");
//   const canCreate = permissions.includes("create");
//   console.log("Permissions:", { canView, canEdit, canDelete, canCreate });
//   const getData = useCallback(async () => {
//     setLoading(true); // Start loading
//     try {
//       const mPackageData = await postRequest(
//         `/activities/packages?pageIndex=${page}&pageSize=${pageSize}`,
//         ``
//       );


//       setTotal(mPackageData?.data?.totalCount)
//       if (mPackageData?.data?.status === "ok") {
//         const formattedData = mPackageData.data.data.map(
//           (item: PackageData) => ({
//             id: item._id,
//             packageTitle: item.packageTitle,
//             description: item.description,
//             isActive: item.is_active,
//             createdBy: item.created_by,
//             updatedAt: formatDate(item.updated_at),
//             purchaseAmt: formatCurrency(item.purchaseAmt, item.currencyId),
//             packageAmt: formatCurrency(item.packageAmt, item.currencyId),
//             sortNo: item.sortNo,
//             countryName: item.countryId.name, // Get the country name
//             currencyCode: item.currencyId.currencyCode, // Get the currency code
//           })
//         );

//         setRowData(formattedData); // Set the formatted data
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setIsFailed(true);
//       setErrorMsg("Error fetching data");
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   }, [page])

//   const deletePackage = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       setLoading(true); // Start loading
//       try {
//         const response = await deleteRequest(`/activities/package/${ID}`);
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg(`Package has been deleted successfully`);
//           await getData();
//         } else {
//           setIsFailed(true);
//           setErrorMsg(`Something Went Wrong`);
//         }
//       } catch (error) {
//         setIsFailed(true);
//         setErrorMsg(`Error deleting package`);
//       } finally {
//         setLoading(false); // Stop loading
//       }
//     }
//   };

//   const formatDate = (dateString: string) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, "0");
//     const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const formatCurrency = (amount: number, currency: { decimalPoints: number; currencyCode: string }) => {
//     if (amount === null || amount === undefined) return '';
//     return `${amount.toFixed(currency.decimalPoints)} ${currency.currencyCode}`;
//   };

//   const columns: GridColDef[] = [
//     {
//       field: "packageTitle",
//       headerName: "Package Title",
//       width: 200,
//       renderCell: (params: any) => (
//         <Link to={`/activities/mcredit/${params.row.id}`} state={params.row}>
//           {params.row.packageTitle}
//         </Link>
//       ),
//     },
//     {
//       field: "description",
//       headerName: "Description",
//       width: 300,
//     },
//     {
//       field: "purchaseAmt",
//       headerName: "Total M Credits",
//       width: 150,
//     },
//     {
//       field: "packageAmt",
//       headerName: "Amount to Pay",
//       width: 150,
//     },
//     // {
//     //   field: "countryName",
//     //   headerName: "Country",
//     //   width: 150,
//     // },
//     // {
//     //   field: "currencyCode",
//     //   headerName: "Currency Code",
//     //   width: 150,
//     // },
//     {
//       field: "updatedAt",
//       headerName: "Updated At",
//       width: 150,
//     },
//     {
//       field: "sortNo",
//       headerName: "Sort No",
//       width: 150,
//     },
//     {
//       field: "isActive",
//       headerName: "Status",
//       width: 100,
//       renderCell: (params: any) => (
//         <Switch
//           checked={params.row.isActive}
//           onChange={() =>
//             handleChangeStatus(params.row.id, params.row.isActive)
//           }
//           inputProps={{ "aria-label": "controlled" }}
//         />
//       ),
//     },
//     {
//       field: "options",
//       headerName: "Options",
//       width: 150,
//       renderCell: (params: any) => (
//         <div className="action-dropdown">
//           <select
//             className="form-select"
//             onChange={(e) => {
//               const selectedOption = e.target.value;
//               if (selectedOption === "edit") {
//                 navigate(`/activities/mcredit/${params.row.id}`, {
//                   state: params.row,
//                 });
//               } else if (selectedOption === "delete") {
//                 deletePackage(params.row.id);
//               }
//             }}
//           >
//             <option value="">...</option>
//             <option value="edit">Edit</option>
//             <option value="delete">Delete</option>
//           </select>
//         </div>
//       ),
//     },
//   ];

//   const handleChangeStatus = async (id: string, status: boolean) => {
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/activities/package/status/${id}`,
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

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   useEffect(() => {
//     getData();
//   }, [getData]);

//   return (
//     <>
//       <PageTitle>M CREDITS PACKAGE</PageTitle>

//       <div className="row g-5 g-xl-8">
//         <div>
//           <div className="card-header border-0 pt-5 d-flex justify-content-between mb-5">
//             <h3 className="card-title align-items-start">
//               <span className="card-label fw-bold fs-3 mb-1">Package List</span>
//             </h3>

//             <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a user"
//             >
//               <Link
//                 to={`/activities/mcredit/create`}
//                 className="btn btn-sm btn-light-primary"
//               >
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New Package
//               </Link>
//             </div>
//           </div>

//           <div>
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
//               <div className="table-responsive">
//                 <DataGrid
//                   rows={rowData}
//                   columns={columns}
//                   hideFooter
//                   autoHeight

//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <div className="pagewrapper">
//         <ReactPaginate
//           containerClassName="pagination"
//           pageClassName="page-item"
//           activeClassName="active"
//           onPageChange={(event) => setPage(event.selected)}
//           pageCount={Math.ceil(total / pageSize)}
//           breakLabel="..."
//           previousLabel={
//             <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
//               <AiFillLeftCircle />
//             </IconContext.Provider>
//           }
//           nextLabel={
//             <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
//               <AiFillRightCircle />
//             </IconContext.Provider>
//           }
//         />
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

// export default MCreditlist;
import { FC, useCallback, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import {
  postRequest,
  deleteRequest,
} from "../../../modules/auth/core/_requests";
import AlertBox from "../../../../common/AlertBox";
import { Switch } from "@mui/material";
import changeStatus from "../../../../common/ChangeStatus";
import Swal from "sweetalert2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { getActivitiesPermissions } from "../../../utils/getPermissions";

interface PackageData {
  _id: string;
  packageTitle: string;
  description: string;
  is_active: boolean;
  created_by: string;
  updated_at: string;
  purchaseAmt: number;
  packageAmt: number;
  sortNo: number;
  countryId: {
    _id: string;
    name: string;
  };
  currencyId: {
    currency: string;
    currencySymbol: string;
    currencyCode: string;
    decimalPoints: number;
  };
}

const MCreditlist: FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const pageSize = 10;
  const navigate = useNavigate();

  // Permissions
  const permissions = getActivitiesPermissions();
  const canView = permissions.includes("view");
  const canEdit = permissions.includes("edit");
  const canDelete = permissions.includes("delete");
  const canCreate = permissions.includes("create");

  console.log("Permissions:", { canView, canEdit, canDelete, canCreate });

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

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const mPackageData = await postRequest(
        `/activities/packages?pageIndex=${page}&pageSize=${pageSize}`,
        ``
      );

      setTotal(mPackageData?.data?.totalCount);
      if (mPackageData?.data?.status === "ok") {
        const formattedData = mPackageData.data.data.map((item: PackageData) => ({
          id: item._id,
          packageTitle: item.packageTitle,
          description: item.description,
          isActive: item.is_active,
          createdBy: item.created_by,
          updatedAt: formatDate(item.updated_at),
          purchaseAmt: formatCurrency(item.purchaseAmt, item.currencyId),
          packageAmt: formatCurrency(item.packageAmt, item.currencyId),
          sortNo: item.sortNo,
          countryName: item.countryId.name,
          currencyCode: item.currencyId.currencyCode,
        }));
        setRowData(formattedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsFailed(true);
      setErrorMsg("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [page]);

  const deletePackage = async (ID: string) => {
    if (!canDelete) return;
    if (window.confirm("Are you sure to delete this record?")) {
      setLoading(true);
      try {
        const response = await deleteRequest(`/activities/package/${ID}`);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Package has been deleted successfully`);
          await getData();
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg(`Error deleting package`);
      } finally {
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatCurrency = (
    amount: number,
    currency: { decimalPoints: number; currencyCode: string }
  ) => {
    if (amount === null || amount === undefined) return "";
    return `${amount.toFixed(currency.decimalPoints)} ${currency.currencyCode}`;
  };

  const handleChangeStatus = async (id: string, status: boolean) => {
    if (!canEdit) return;
    const result = await changeStatus({
      id,
      status,
      Url: `/activities/package/status/${id}`,
    });
    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        getData();
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Define columns dynamically based on permissions
  const baseColumns: GridColDef[] = [
    {
      field: "packageTitle",
      headerName: "Package Title",
      width: 200,
      renderCell: (params: any) => {
        // Only make it a link if user has edit permission
        if (canEdit) {
          return (
            <Link to={`/activities/mcredit/${params.row.id}`} state={params.row}>
              {params.row.packageTitle}
            </Link>
          );
        }
        return <span>{params.row.packageTitle}</span>;
      },
    },
    {
      field: "description",
      headerName: "Description",
      width: 300,
    },
    {
      field: "purchaseAmt",
      headerName: "Total M Credits",
      width: 150,
    },
    {
      field: "packageAmt",
      headerName: "Amount to Pay",
      width: 150,
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      width: 150,
    },
    {
      field: "sortNo",
      headerName: "Sort No",
      width: 150,
    },
    {
      field: "isActive",
      headerName: "Status",
      width: 100,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.isActive}
          onChange={() => handleChangeStatus(params.row.id, params.row.isActive)}
          disabled={!canEdit}
        />
      ),
    },
  ];

  // Add Options column only if user can edit or delete
  if (canEdit || canDelete) {
    baseColumns.push({
      field: "options",
      headerName: "Options",
      width: 150,
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={(e) => {
              const selectedOption = e.target.value;
              if (selectedOption === "edit" && canEdit) {
                navigate(`/activities/mcredit/${params.row.id}`, {
                  state: params.row,
                });
              } else if (selectedOption === "delete" && canDelete) {
                deletePackage(params.row.id);
              }
              // Reset select value to default placeholder
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

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <PageTitle>M CREDITS PACKAGE</PageTitle>

      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5 d-flex justify-content-between mb-5">
            <h3 className="card-title align-items-start">
              <span className="card-label fw-bold fs-3 mb-1">Package List</span>
            </h3>

            {/* New Package button - only if user can create */}
            {canCreate && (
              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Click to add a package"
              >
                <Link
                  to="/activities/mcredit/create"
                  className="btn btn-sm btn-light-primary"
                >
                  <KTIcon iconName="plus" className="fs-3" />
                  New Package
                </Link>
              </div>
            )}
          </div>

          <div>
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
                  hideFooter
                  autoHeight
                />
              </div>
            )}
          </div>
        </div>
      </div>

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

      {isSuccess && (
        <AlertBox redirectUrl={null} close={closeAlert} type="success">
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

export default MCreditlist;