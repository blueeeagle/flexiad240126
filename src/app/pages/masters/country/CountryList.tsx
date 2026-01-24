// import { FC, useState, useEffect } from "react";
// import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTIcon } from "../../../../_metronic/helpers";
// import { Link } from "react-router-dom";
// import { postRequest } from "../../../modules/auth/core/_requests";
// import { stringToDate } from "../../../../common/Date";
// import { deleteRequest } from "../../../modules/auth/core/_requests";
// import AlertBox from "../../../../common/AlertBox";
// import { Switch } from "@mui/material";
// import changeStatus from "../../../../common/ChangeStatus";
// import Swal from "sweetalert2";

// const CountryList: FC = () => {
//   const [rowData, setRowData] = useState([]);
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [successMsg, setSuccessMsg] = useState(``);
//   const [errorMsg, setErrorMsg] = useState(``);
//   const [isFailed, setIsFailed] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const getData = async () => {
//     const countryData = await postRequest(`/master/countries`, ``);

//     const lookupObj = [countryData];
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
//           countryData: d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
//         };
//         setRowData(dataobj?.countryData);
//       });
//   };

//   const deleteCountry = async (ID: string) => {
//     if (window.confirm("Are you sure to delete this record?")) {
//       await deleteRequest(`/master/country/` + ID).then(async (response) => {
//         if (response?.data?.status === "ok") {
//           setIsSuccess(true);
//           setSuccessMsg(`Country has been deleted successfully`);
//           await getData();
//         } else {
//           setIsFailed(true);
//           setErrorMsg(`Something Went Wrong`);
//         }
//       });
//     }
//   };

//   const closeAlert = () => {
//     if (isSuccess) setIsSuccess(false);
//     if (isFailed) setIsFailed(false);
//   };

//   useEffect(() => {
//     async function fetchData() {
//       await getData();
//     }
//     fetchData();
//   }, []);

//   const updateList = () => {
//     getData();
//   };

//   const handleChangeStatus = async (id: any, status: any) => {
//     setLoading(true);
//     const result = await changeStatus({
//       id,
//       status,
//       Url: `/master/country/${id}`,
//     });
//     setLoading(false);

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
//       <PageTitle>COUNTRY</PageTitle>
//       <div className="row g-5 g-xl-8">
//         <div className={`card `}>
//           <div className="card-header border-0 pt-5">
//             <h3 className="card-title align-items-start flex-column">
//               <span className="card-label fw-bold fs-3 mb-1">Country List</span>
//             </h3>
//             <div
//               className="card-toolbar"
//               data-bs-toggle="tooltip"
//               data-bs-placement="top"
//               data-bs-trigger="hover"
//               title="Click to add a Role"
//             >
//               <Link
//                 to="/country/create"
//                 className="btn btn-sm btn-light-primary"
//               >
//                 <KTIcon iconName="plus" className="fs-3" />
//                 New Country
//               </Link>
//             </div>
//           </div>
//           <div className="card-body py-3">
//             <div className="table-responsive">
//               <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//                 <thead>
//                   <tr className="fw-bold text-muted">
//                     <th className="min-w-200px">Country Name</th>
//                     <th className="min-w-100px">Tele Code</th>
//                     <th className="min-w-100px">Currency</th>
//                     <th className="min-w-100px">Country Has State</th>
//                     <th className="min-w-200px">Updated On</th>
//                     <th className="min-w-100px">Status</th>
//                     <th className="min-w-100px text-end">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {rowData?.length > 0 ? (
//                     rowData.map((result: any) => {
//                       return (
//                         <tr key={result?._id}>
//                           <td>{result?.name}</td>
//                           <td>{result?.dialCode}</td>
//                           <td>{result?.iso3}</td>
//                           <td>{result?.hasState ? `YES` : `NO`}</td>
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
//                           </td>{" "}
//                           <td>
//                             <div className="d-flex justify-content-end flex-shrink-0">
//                               <Link
//                                 to={`/country/${result?._id}`}
//                                 className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
//                               >
//                                 <KTIcon iconName="pencil" className="fs-3" />
//                               </Link>
//                               <span
//                                 onClick={(e) => deleteCountry(result?._id)}
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
//                       <td>No Country Found</td>
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

// export default CountryList;
import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import { postRequest, deleteRequest } from "../../../modules/auth/core/_requests";
import { stringToDate } from "../../../../common/Date";
import AlertBox from "../../../../common/AlertBox";
import { Switch } from "@mui/material";
import changeStatus from "../../../../common/ChangeStatus";
import Swal from "sweetalert2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import ReactPaginate from "react-paginate";

const CountryList: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1); // Total records from API
  const rowsPerPage = 10; // Rows per page
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  // Fetch paginated data
  const getData = async (page: number = 0) => {
    setLoading(true);
    const countryData = await postRequest(
      `/master/countries?page=${page + 1}&limit=${rowsPerPage}`,
      ``
    );

    if (countryData?.data?.status === "ok") {
      const { data, total } = countryData.data;
      setRowData(data);
      setTotalRecords(total); // Store total records from API
    } else {
      setRowData([]);
      setTotalRecords(0);
    }
    setLoading(false);
  };

  const deleteCountry = async (ID: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      await deleteRequest(`/master/country/` + ID).then(async (response) => {
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Country has been deleted successfully`);
          await getData(currentPage); // Refresh data on the current page
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      });
    }
  };

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  useEffect(() => {
    getData(currentPage);
  }, [currentPage]);

  const handlePageClick = (data: { selected: number }) => {
    setCurrentPage(data.selected);
  };

  const handleChangeStatus = async (id: any, status: any) => {
    setLoading(true);
    const result = await changeStatus({
      id,
      status,
      Url: `/master/country/${id}`,
    });
    setLoading(false);

    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        await getData(currentPage); // Update the list on the current page
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // Define columns for DataGrid
  const columns: GridColDef[] = [
    { field: "name", headerName: "Country Name", width: 200 },
    { field: "dialCode", headerName: "Tele Code", width: 100 },
    { field: "iso3", headerName: "Currency", width: 100 },
    {
      field: "hasState",
      headerName: "Country Has State",
      width: 150,
      renderCell: (params: any) => (params.value ? "YES" : "NO"),
    },
    {
      field: "updated_at",
      headerName: "Updated On",
      width: 200,
      renderCell: (params: any) => stringToDate(params.row.updated_at),
    },

    {
      field: "online",
      headerName: "Online",
      width: 200,
      renderCell: (params: any) => {
        const value = params.row.charges?.[0]?.value;
        const type = params.row.charges?.[0]?.type; 
       
        if (value === null || value === undefined) {
          return "-";
        }
        
        if (type === 'percentage') {
          return `${value}%`; 
        }
    
        return value; 
      },
    },
    {
      field: "logistics",
      headerName: "Flexi Clean Logistics",
      width: 200,
      renderCell: (params: any) => {
        const value = params.row.charges?.[1]?.value;
        const type = params.row.charges?.[1]?.type;
        console.log(type);
        if (value === null || value === undefined) {
          return "-";
        }
    
        if (type === 'percentage') {
          return `${value}%`;
        }
    
        return value;
      },
    },
    {
      field: "pos",
      headerName: "POS Subscription",
      width: 200,
      renderCell: (params: any) => {
        const value = params.row.charges?.[2]?.value;
        const type = params.row.charges?.[2]?.type;
    console.log(type);
    
        if (value === null || value === undefined) {
          return "-";
        }
    
        if (type === 'percentage') {
          return `${value}%`;
        }
    
        return value;
      },
    },
    

    {
      field: "is_active",
      headerName: "Status",
      width: 100,
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
      width: 100,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue === "statusUpdate") {
                navigate(`/country/${params.row._id}`);
              } else if (selectedValue === "paymentUpdate") {
                deleteCountry(params.row._id);
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
console.log(rowData);

  return (
    <>
      <PageTitle>COUNTRY</PageTitle>
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
        <div className="row g-5 g-xl-8">
          <div>
            <div className="card-header border-0 pt-5 d-flex justify-content-between align-items-center">
              <div>
                <h3 className="card-title align-items-start flex-column">
                  <span className="card-label fw-bold fs-3 mb-1">
                    Country List
                  </span>
                </h3>
              </div>

              <div className="card-toolbar">
                <Link
                  to="/country/create"
                  className="btn btn-sm btn-light-primary"
                >
                  <KTIcon iconName="plus" className="fs-3" />
                  New Country
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
                  loading={loading}
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
                pageCount={Math.ceil(rowsPerPage / itemsPerPage)} // Calculate total pages
                onPageChange={handlePageClick}
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
      )}
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

export default CountryList;

