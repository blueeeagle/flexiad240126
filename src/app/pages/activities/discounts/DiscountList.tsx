// import { FC, useEffect, useState } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link } from "react-router-dom";
// import { Switch } from "@mui/material";
// import { stringToDate } from "../../../../common/Date";
// import Swal from "sweetalert2";
// import changeStatus from "../../../../common/ChangeStatus";
// import {
//   deleteRequest,
//   postRequest,
// } from "../../../modules/auth/core/_requests";
// import AlertBox from "../../../../common/AlertBox";

// const Discountlist: FC = () => {
//   const [rowData, setRowData] = useState([]);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);

//   const deleteBanner = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       await deleteRequest(`/activities/banner/` + ID).then(async (response) => {
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg(`Gift Card has been deleted successfully`);
//           await getData();
//         } else {
//           setIsFailed(true);
//           setErrorMsg(`Something Went Wrong`);
//         }
//       });
//     }
//   };

//   const getData = async () => {
//     const bannerData = await postRequest(
//       `/activities/banners?pageIndex=0&pageSize=10`,
//       ``
//     );
//     if (bannerData?.data?.status === "ok") {
//       setRowData(bannerData?.data?.data);
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
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/activities/banner/status/${id}`,
//     });

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
//       <PageTitle>DISCOUNTS</PageTitle>

//       <div className="row g-5 g-xl-8">
//         <div className={`card `}>
//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title align-items-start flex-column">
//               <span className="card-label fw-bold fs-3 mb-1">
//                 Discount List
//               </span>
//             </h3>
//             <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a user"
//             >
//               <Link
//                 to={`/activities/discount/create`}
//                 className="btn btn-sm btn-light-primary"
//               >
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New Discount
//               </Link>
//             </div>
//           </div>
//           <div className="card-body py-3">
//             <div className="table-responsive">
//               <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//                 <thead>
//                   <tr className="fw-bold text-muted">
//                     <th className="min-w-100px">Promo Title</th>
//                     <th className="min-w-200px">Promo Code</th>
//                     <th className="min-w-100px">Offer Type</th>
//                     <th className="min-w-100px">Value (BHD)</th>
//                     <th className="min-w-100px">Created On</th>
//                     <th className="min-w-150px">Sort No</th>
//                     <th className="min-w-100px">Status</th>
//                     <th className="min-w-100px text-end">Options</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rowData?.length > 0 ? (
//                     rowData.map((result: any) => {
//                       return (
//                         <tr key={result?._id}>
//                           <td>
//                             <Link
//                               to={`/activities/banner/${result?._id}`}
//                               state={result}
//                             >
//                               {result?._id}
//                             </Link>
//                           </td>
//                           <td>OFF100</td>
//                           <td>First Order</td>
//                           <td>100 BHD</td>
//                           <td>{stringToDate(result?.updated_at)}</td>
//                           <td>{result?.sortNo}</td>
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
//                                 to={`/activities/banner/${result?._id}`}
//                                 state={result}
//                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
//                               >
//                                 <KTIcon iconName="pencil" className="fs-3" />
//                               </Link>
//                               <span
//                                 onClick={(e) => deleteBanner(result?._id)}
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
//                       <td>No Package Found</td>
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

// export default Discountlist;
import { FC, useCallback, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import { Switch } from "@mui/material";
import Swal from "sweetalert2";
import changeStatus from "../../../../common/ChangeStatus";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import {
  deleteRequest,
  postRequest,
} from "../../../modules/auth/core/_requests";
import AlertBox from "../../../../common/AlertBox";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { getActivitiesPermissions } from "../../../utils/getPermissions";

interface BannerData {
  _id: string;
  promoTitle: string;
  promoCode: string;
  offerType: string;
  orderValue: number;
  updated_at: string;
  sortNo: number;
  is_active: boolean;
}

const Discountlist: FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  const pageSize = 10;

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

  const deleteBanner = async (ID: string) => {
    if (!canDelete) return;
    if (window.confirm("Are you sure to delete this record?")) {
      setLoading(true);
      try {
        const response = await deleteRequest(`/activities/discount/${ID}`);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Discount has been deleted successfully`);
          await getData();
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg(`Error deleting discount`);
      } finally {
        setLoading(false);
      }
    }
  };

  const getData = useCallback(async () => {
    setLoading(true);
    try {
      const bannerData = await postRequest(
        `/activities/discounts?pageIndex=${page}&pageSize=${pageSize}`,
        ``
      );

      setTotal(bannerData?.data?.totalCount);
      if (bannerData?.data?.status === "ok") {
        const formattedData = bannerData.data.data.map((item: any) => ({
          id: item._id,
          postFrom: item.postFrom,
          companyName: item.companyId?.[0]?.companyName,
          companyId: item.companyId?.[0]?._id,
          promoTitle: item.promoTitle,
          promoCode: item.promoCode,
          offerType: item.offerType,
          orderValue: `${item.orderValue >= 100 ? item.orderValue.toFixed(3) : item.orderValue.toFixed(2)} ${item?.currencyId?.currencySymbol || ""}`,
          noOfCoupons: item.noOfCoupons,
          customerUsageLimit: item.customerUsageLimit,
          discountType: item.discountType,
          discountAmt: item.discountAmt,
          discountPercentage: item.discountPercentage,
          startDate: formatDate(item.startDate),
          endDate: formatDate(item.endDate),
          applicableFor: item.applicableFor,
          imgUrl: item.imgUrl,
          sortNo: item.sortNo,
          isActive: item.is_active,
          isDeleted: item.is_deleted,
          createdBy: item.created_by,
          updatedAt: formatDate(item.updated_at),
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleChangeStatus = async (id: any, status: any) => {
    if (!canEdit) return;
    const result = await changeStatus({
      id,
      status,
      Url: `/activities/discount/67212e7ce6eb7ab651715f1d`, // keep original URL; consider updating if needed
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

  // Base columns (without options)
  const baseColumns: GridColDef[] = [
    {
      field: "promoTitle",
      headerName: "Promo Title",
      minWidth: 150,
      renderCell: (params: any) => {
        if (canEdit) {
          return (
            <Link
              to={`/activities/discount/${params.row.id}`}
              state={params.row}
            >
              {params.row.promoTitle}
            </Link>
          );
        }
        return <span>{params.row.promoTitle}</span>;
      },
    },
    {
      field: "promoCode",
      headerName: "Promo Code",
      minWidth: 150,
    },
    {
      field: "offerType",
      headerName: "Offer Type",
      minWidth: 100,
    },
    {
      field: "orderValue",
      headerName: "Value ",
      minWidth: 150,
    },
    {
      field: "updatedAt",
      headerName: "Created On",
      minWidth: 150,
    },
    { field: "sortNo", headerName: "Sort No", minWidth: 150 },
    {
      field: "status",
      headerName: "Status",
      minWidth: 100,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.isActive || false}
          onChange={() => handleChangeStatus(params.row.id, params.row.isActive)}
          disabled={!canEdit}
          inputProps={{ "aria-label": "controlled" }}
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
                const fullRowData = params.row;
                localStorage.setItem(
                  "selectedDiscountData",
                  JSON.stringify(fullRowData)
                );
                navigate(`/activities/discount/${params.row.id}`, {
                  state: fullRowData,
                });
              } else if (selectedOption === "delete" && canDelete) {
                deleteBanner(params.row.id);
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

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <>
      <PageTitle>DISCOUNTS</PageTitle>

      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5 d-flex justify-content-between mb-5">
            <div>
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">
                  Discount List
                </span>
              </h3>
            </div>

            {/* New Discount button - only if user can create */}
            {canCreate && (
              <div
                className="card-toolbar"
                data-bs-toggle="tooltip"
                data-bs-placement="top"
                data-bs-trigger="hover"
                title="Click to add a discount"
              >
                <Link
                  to="/activities/discount/create"
                  className="btn btn-sm btn-light-primary"
                >
                  <KTIcon iconName="plus" className="fs-3" />
                  New Discount
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
                rows={rowData}
                columns={baseColumns}
                hideFooter={true}
                autoHeight={true}
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

export default Discountlist;
