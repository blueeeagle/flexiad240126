import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { useParams } from "react-router-dom";
import { getRequest } from "../../modules/auth/core/_requests";
import { stringToDate } from "../../../common/Date";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
const AgentRatings: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // Loading state
  const pageSize = 10;
  const { agentId } = useParams();
  const [rating, setRating] = useState(0);
  const [ratingCount, setRatingCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);

  const getCustomers = async () => {
    setLoading(true); // Set loading to true before fetching
    const reviewList = await getRequest(
      `/agent/reviews/${agentId}`,
      `?pageIndex=${page}&pageSize=${pageSize}`
    );
    const data = reviewList?.data;

    if (data?.status === "ok") {
      const { companyRatingInfo, data: reviews, totalCount } = data;

      setRowData(reviews);
      setTotal(totalCount);
      setReviewCount(totalCount);
      setRatingCount(5); // Set the maximum rating count to 5
      setRating(companyRatingInfo?.rating || 0);
    } else {
      setRowData([]);
      setTotal(0);
      setReviewCount(0);
      setRatingCount(0);
      setRating(0);
    }
    setLoading(false); // Set loading to false after fetching
  };

  useEffect(() => {
    getCustomers();
  }, [page]);
  const columns: GridColDef[] = [
    {
      field: "orderDate",
      headerName: "Date",
      width: 100,
      renderCell: (params: any) => stringToDate(params.row.orderId.orderDate),
    },
    {
      field: "orderNo",
      headerName: "order ID",
      width: 250,
      renderCell: (params: any) => params.row.orderId.orderNo,
    },
    {
      field: "customerType",
      headerName: "Customer Name",
      width: 200,
      renderCell: (params: any) =>
        `${params.row.customerId.firstName} ${params.row.customerId.lastName}`,
    },
    {
      field: "mobile",
      headerName: "Mobile No",
      width: 150,
      renderCell: (params: any) => params.row.customerId.mobile,
    },
    {
      field: "orderMode",
      headerName: "Type",
      width: 150,
      renderCell: (params: any) => params.row.orderId.orderMode,
    },
    {
      field: "Rating",
      headerName: "Rating",
      width: 150,
      renderCell: (params: any) => `${params.row.rating}/5`,
    },

    {
      field: "review",
      headerName: "Review",
      width: 150,
      renderCell: (params: any) => params.row.review,
    },
  ];
  return (
    <>
      <PageTitle>REVIEWS & RATINGS</PageTitle>

      {loading ? ( // Loader conditional rendering
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
            style={{ width: 150, height: 150 }}
          />
        </div>
      ) : (
        <>
          <h3 className="card-title align-items-start flex-column mb-4">
            <span className="card-label fw-bold fs-3 mb-1">Ratings</span>
          </h3>

          <div className="card mb-8">
            <div className="card-body bg-light-warning">
              <div className="d-flex align-items-center">
                <div className="col-md-10">
                  <div className="flex-grow-1">
                    <span className="text-muted fw-bold d-block">{`${rating}/${ratingCount}`}</span>
                  </div>
                </div>

                <div className="col-md-2">
                  <span className="badge badge-warning fs-8 fw-bold">{`${total} Reviews`}</span>
                </div>
              </div>
            </div>
          </div>

          <h3 className="card-title align-items-start flex-column mb-4">
            <span className="card-label fw-bold fs-3 mb-1">History</span>
          </h3>
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
        </>
      )}
    </>
  );
};

export default AgentRatings;
