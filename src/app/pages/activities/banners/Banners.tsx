import { FC, useCallback, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import { postRequest } from "../../../modules/auth/core/_requests";
import { stringToDate } from "../../../../common/Date";
import { deleteRequest } from "../../../modules/auth/core/_requests";
import AlertBox from "../../../../common/AlertBox";
import changeStatus from "../../../../common/ChangeStatus";
import Swal from "sweetalert2";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Switch } from "@mui/material";
import Lottie from "lottie-react";
import logo from "../../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";

interface Banner {
  id: string;
  title: string;
  section: string;
  createdOn: string;
  sortNo: number;
  isActive: boolean;
}

const Banners: FC = () => {
  const [rowData, setRowData] = useState<Banner[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();
const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
 const pageSize = 10;

  const deleteBanner = async (ID: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      setLoading(true); // Start loading
      const response = await deleteRequest(`/activities/banner/${ID}`);
      setLoading(false); // Stop loading

      if (response?.data?.status === "ok") {
        setIsSuccess(true);
        setSuccessMsg(`Banner has been deleted successfully`);
        await getData(); // Refresh the data
      } else {
        setIsFailed(true);
        setErrorMsg(`Something Went Wrong`);
      }
    }
  };

  const getData =useCallback( async () => {
    setLoading(true); 
    // Fetch data with language parameter
    const bannerData = await postRequest(
      `/activities/banners?pageIndex=${page}&pageSize=${pageSize}&lang=${selectedLanguage}`,
      ``
    );

    if (bannerData && bannerData.data && bannerData.data.data) {
      bannerData.data.data.forEach((item: any, index: any) => {
        console.log(`Image ${index + 1}: ${item.imgUrl}`);
      });
    } else {
      console.log("No image data available.");
    }
    setLoading(false); // Stop loading

    if (bannerData?.data?.status === "ok") {
      setRowData(
        bannerData?.data?.data.map((banner: any) => ({
          id: banner._id,
          title: selectedLanguage === "en" ? banner.titleEn : banner.titleAr,
          section: banner.section,
          createdOn: stringToDate(banner.updated_at),
          sortNo: banner.sortNo,
          language: banner.language || selectedLanguage,
          isActive: banner.is_active,
          imgUrl: banner.imgUrl,
        }))
      );
    }
  },[page, selectedLanguage])

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  useEffect(() => {
    getData();
  }, [getData, selectedLanguage]); 
  const handleChangeStatus = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus; 
    setLoading(true); // Start loading
    try {
      // Call the API with the updated status
      const result = await changeStatus({
        id,
        status: newStatus,  // Send the flipped status
        Url: `/activities/banner/status/${id}`,
      });
      setLoading(false); // Stop loading
  
      if (result) {
        Swal.fire(
          result.success ? "Success" : "Error",
          result.message,
          result.success ? "success" : "error"
        );
        if (result.success) getData(); // Refresh data on successful status change
      } else {
        Swal.fire("Error", "Something went wrong", "error");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire("Error", "Something went wrong", "error");
    }
  };
  
  const columns: GridColDef[] = [
    {
      field: "imgUrl",
      headerName: "Logo",
      width: 100,
      renderCell: (params: any) => {
        console.log(params.row.imgUrl); // Log the imgUrl to the console
        return (
          <img
            style={{
              width: "45px",
              height: "45px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
            src={
              params.row.imgUrl
                ? `http://adminapi.flexiclean.me/${params.row.imgUrl}`
                : logo
            }
            alt="Logo"
            onError={(e) => {
              (e.target as HTMLImageElement).src = logo;
            }}
          />
        );
      },
    },
    // {
    //   field: "id",
    //   headerName: "Promo Title",
    //   minWidth: 250,
    //   renderCell: (params: any) => {
    //     const handleClick = () => {
    //       // Store the image URL and row data in local storage
    //       localStorage.setItem("selectedBanner", JSON.stringify(params.row));
    //       localStorage.setItem(
    //         "selectedImageUrl",
    //         params.row.imgUrl
    //           ? `http://adminapi.flexiclean.me/${params.row.imgUrl}`
    //           : logo
    //       );
    //       navigate(`/activities/banner/${params.id}`, { state: params.row });
    //     };

    //     return (
    //       <span
    //         onClick={handleClick}
    //         style={{
    //           cursor: "pointer",
    //           color: "blue",
    //           textDecoration: "underline",
    //         }}
    //       >
    //         {params.row.id}
    //       </span>
    //     );
    //   },
    // },
    { field: "section", headerName: "Choose Section", minWidth: 200 },
    { field: "createdOn", headerName: "Created On", minWidth: 150 },
    { field: "sortNo", headerName: "Sort No", minWidth: 100 },
    { field: "language", headerName: "Language", minWidth: 100 },
    {
      field: "isActive",
      headerName: "Status",
      minWidth: 150,
      renderCell: (params: any) => (
        <Switch
          checked={params.value}  // This reflects the current status (true or false)
          onChange={() => handleChangeStatus(params.row.id, !params.value)}  // Toggle and pass the opposite value
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    }
    ,
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
                // Store the image URL when editing
                localStorage.setItem(
                  "selectedBanner",
                  JSON.stringify(params.row)
                );
                localStorage.setItem(
                  "selectedImageUrl",
                  params.row.imgUrl
                    ? `http://adminapi.flexiclean.me/${params.row.imgUrl}`
                    : logo
                );
                navigate(`/activities/banner/${params.row.id}`, {
                  state: params.row,
                });
              } else if (selectedOption === "delete") {
                deleteBanner(params.row.id);
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

  const handleLanguageChange = (lang: string) => {
    setSelectedLanguage(lang); // Update selected language
  };

  return (
    <>
      <PageTitle>BANNERS</PageTitle>
      <div className="row g-5 g-xl-8">
        <div>
          <div className="card-header border-0 pt-5 d-flex justify-content-between mb-5">
            <div>
              <div className="gap-2 d-flex">
                <button
                  className={`btn btn-sm ${
                    selectedLanguage === "en" ? "btn-primary" : "btn-light"
                  }`}
                  onClick={() => handleLanguageChange("en")}
                >
                  English
                </button>
                <button
                  className={`btn btn-sm ${
                    selectedLanguage === "ar" ? "btn-primary" : "btn-light"
                  }`}
                  onClick={() => handleLanguageChange("ar")}
                >
                  Arabic
                </button>
              </div>
            </div>

            <div className="card-toolbar">
              <Link
                to={`/activities/banner/create`}
                className="btn btn-sm btn-light-primary"
              >
                <KTIcon iconName="plus" className="fs-3" />
                Add Banner
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
              <div style={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rowData}
                  columns={columns}
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

export default Banners;
