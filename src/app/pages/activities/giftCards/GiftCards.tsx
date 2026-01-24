import { FC, useCallback, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTIcon } from "../../../../_metronic/helpers";
import { Link, useNavigate } from "react-router-dom";
import {
  postRequest,
  deleteRequest,
} from "../../../modules/auth/core/_requests";
import { stringToDate } from "../../../../common/Date";
import AlertBox from "../../../../common/AlertBox";
import changeStatus from "../../../../common/ChangeStatus";
import Swal from "sweetalert2";
import { Switch } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

interface Currency {
  _id: string;  
  currency: string;
  currencyCode: string;
  currencySymbol: string;
  decimalPoints: number;
}

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
}
interface BannerData {
  _id: string;
  giftCardTitle: string;
  amount: number;
  noOfCustomers: number;
  value: number;
  startDate: string;
  endDate: string; // Add endDate field as string for date
  sortNo: number;
  is_active: boolean;
  currencyId: Currency; // Updated Currency type
  customerId?: Customer[]; // Updated to array for customer objects
  description?: string; // Optional description field
  updated_at: string; // Updated to string to store date as formatted
  month?: number; // Optional month field
  periodType?: string; // Optional periodType field
  year?: number; // Optional year field
}

const GiftCards: FC = () => {
  const [rowData, setRowData] = useState<BannerData[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
   const pageSize = 10;
    const [total, setTotal] = useState<number>(0);
   const [page, setPage] = useState<number>(0);
  const [apiResponse, setApiResponse] = useState(null);

  const deleteGiftCard = async (ID: string) => {
    if (window.confirm("Are you sure to delete this record?")) {
      console.log(ID); // Log the ID to the console
      setLoading(true);
      try {
        const response = await deleteRequest(`/activities/giftCard/` + ID);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Gift Card has been deleted successfully`);
          await getData(); // Refresh data after deletion
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg(`Failed to delete gift card`);
      }
      setLoading(false);
    }
  };
  const formatDate = (dateString: string | null): string => {
    return dateString
      ? new Date(dateString).toLocaleDateString("en-GB")
      : "";
  };
  

  const getData =useCallback( async () => {
    setLoading(true);
    const bannerData = await postRequest(
      `/activities/giftCards?pageIndex=${page}&pageSize=${pageSize}`,
      ""
    );
    console.log(bannerData.data?.totalCount);
    setTotal(bannerData?.data?.totalCount)
    if (bannerData?.data?.status === "ok") {
      const formattedData = bannerData.data.data.map((item: BannerData) => {
        const customerId =
          item.customerId && Array.isArray(item.customerId)
            ? item.customerId[0]?._id
            : null;
  
        const currencyId =
          item.currencyId && item.currencyId._id ? item.currencyId._id : null;
  
        // Format dates to "DD/MM/YYYY"
        const formattedStartDate = formatDate(item.startDate);
        const formattedEndDate = formatDate(item.endDate);
        const formattedUpdatedAt = formatDate(item.updated_at);
  
        return {
          id: item._id,
          giftCardTitle: item.giftCardTitle,
          amount: item.amount || 0,
          noOfCustomers: item.noOfCustomers || 0,
          value: item.value || 0,
          startDate: formattedStartDate,  // Store formatted startDate here
          endDate: formattedEndDate,  // Store formatted endDate here
          sortNo: item.sortNo || 0,
          isActive: item.is_active,
          currency: item.currencyId?.currencySymbol || "",
          decimalPoints: item.currencyId?.decimalPoints || 0,
          customerId: customerId,
          currencyId: currencyId,
          description: item.description || "",
          updated_at: formattedUpdatedAt,  // Add formatted updated_at here
          month: item.month || null,
          periodType: item.periodType || null,
          year: item.year || null,
        };
      });
  
      setApiResponse(bannerData.data);
      setRowData(formattedData);
    } else {
      setIsFailed(true);
      setErrorMsg("Failed to fetch gift cards.");
    }
    setLoading(false);
  },[page]);
  

  const columns = [
    {
      field: "giftCardTitle",
      headerName: "Gift Card Title",
      width: 250,
      renderCell: (params: any) => (
        <Link
          to={`/activities/giftCard/${params.row.id}`}
          state={params.row}
          onClick={() => {
            localStorage.setItem(
              "selectedGiftCard",
              JSON.stringify(params.row)
            );
          }}
        >
          {params.value}
        </Link>
      ),
    },
    {
      field: "amount",
      headerName: "Free Credits (BHD)",
      width: 250,
      renderCell: (params: any) =>
        `${params.row.amount.toFixed(params.row.decimalPoints)} ${
          params.row.currency
        }`,
    },
    // {
    //   field: "noOfCustomers",
    //   headerName: "No Of Customers",
    //   width: 150,
    //   renderCell: (params: any) => "10 TC",
    // },
    {
      field: "updated_at",
      headerName: "Created On",
      width: 200,
      renderCell: (params: any) => {
        return params.row.updated_at || ""; // Display the formatted date
      },
    },

    // {
    //   field: "sortNo",
    //   headerName: "Sort No",
    //   width: 150,
    //   renderCell: (params: any) => "1 TC",
    // },
    {
      field: "isActive",
      headerName: "Status",
      width: 150,
      renderCell: (params: any) => (
        <Switch
          checked={params.row.isActive}  // This reflects the correct state value
          onChange={() => {
            // Toggle the current state value and pass the new value to handleChangeStatus
            const newIsActive = !params.row.isActive; // Toggle the value
            handleChangeStatus(params.row.id, newIsActive); // Pass the new value to the function
          }}
          inputProps={{ "aria-label": "controlled" }}
        />
      ),
    },
    {
      field: "edit",
      headerName: "Options",
      width: 200,
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={async (e) => {
              const selectedOption = e.target.value;
              const giftCardId = params.row._id || params.row.id;
    
              if (selectedOption === "edit") {
                // Ensure customerId and currencyId are stored along with other row data
                const rowData = {
                  ...params.row,
                  customerId: params.row.customerId,  // Make sure it's populated
                  currencyId: params.row.currencyId,  // Make sure it's populated
                };
                
                // Store the full row data with customerId and currencyId
                localStorage.setItem("selectedGiftCard", JSON.stringify(rowData));
                navigate(`/activities/giftCard/${giftCardId}`);
              } else if (selectedOption === "delete") {
                deleteGiftCard(giftCardId);
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
  const handleChangeStatus = async (id: string, isActive: boolean) => {
    const url = `https://adminapi.flexiclean.me/api/v1/activities/giftCard/${id}`;
    const updatedStatus = isActive ? "true" : "false"; // Convert boolean to string
  
    if (!token) {
      console.error("No token found");
      Swal.fire("Error", "No token found, please log in", "error");
      return;
    }
  
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Send the token in the Authorization header
        },
        body: JSON.stringify({
          is_active: updatedStatus, // Send "true" or "false" as string
        }),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.statusText}`);
      }
  
      const result = await response.json();
  
      // Check for the 'status' key in the response and ensure it's 'ok'
      if (result && result.status === "ok") {
        Swal.fire("Success", result.message || "Status successfully updated", "success");
        getData(); // Refresh data
      } else {
        // If status is not 'ok', show the error message
        Swal.fire("Error", result?.message || "Something went wrong", "error");
      }
    } catch (error: any) {
      // Catch any errors and show the error message
      Swal.fire("Error", error.message || "Something went wrong", "error");
      console.error("Error updating status:", error);
    }
  };
  
  
  
  
  
  return (
    <>
      <PageTitle>GIFT CARDS</PageTitle>
      <div className="row g-5 g-xl-8">
      
        <div>

          <div className="card-header border-0 pt-5 d-flex justify-content-between mb-5">
            <div>
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">Gift Cards</span>
              </h3>
            </div>
            <div className="card-toolbar">
              <Link
                to={`/activities/giftCard/create`}
                className="btn btn-sm btn-light-primary"
              >
                <KTIcon iconName="plus" className="fs-3" />
                Add Gift Card
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
                  }}
                />
              
              </div>
              
            ) : (
              <DataGrid
                rows={rowData}
                columns={columns}
                hideFooter={true}
                autoHeight={true}
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
        <AlertBox close={closeAlert} type="success">
          {successMsg}
        </AlertBox>
      )}
      {isFailed && (
        <AlertBox close={closeAlert} type="error">
          {errorMsg}
        </AlertBox>
      )}
    </>
  );
};

export default GiftCards;
