import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { getRequest } from "../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";
import { stringToDate } from "../../../common/Date";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

interface Review {
  _id: string;
  orderId: {
    orderDate: string;
    orderMode: string;
  };
  companyId: {
    companyName: string;
  };
  customerId: {
    firstName: string;
    lastName: string;
    mobile: string;
  };
  rating: number;
  review: string;
}

const CustomerReviews: FC = () => {
  const [rowData, setRowData] = useState<Review[]>([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const pageSize = 10;
  const { customerId } = useParams();

  const getCustomers = async () => {
    setLoading(true); // Start loading
    setError(null); // Reset error state
    try {
      const reviewList = await getRequest(
        `/customer/reviews/${customerId}`,
        `?pageIndex=${page}&pageSize=${pageSize}`
      );
      console.log(reviewList);

      const modifiedData: Review[] = reviewList.data.data.map((review: Review) => ({
        ...review,
        id: review._id, // Assign the existing _id to a new id property
      }));

      setRowData(modifiedData);
      setTotal(reviewList.data.totalCount || 0);
    } catch (error) {
      console.error("Error fetching customer reviews:", error);
      setError("Failed to load reviews. Please try again later.");
    } finally {
      setLoading(false); // End loading
    }
  };

  useEffect(() => {
    getCustomers();
  }, [page]);

  const columns = [
    {
      field: "orderDate",
      headerName: "Date",
      width: 100,
      renderCell: (params: any) => stringToDate(params.row.orderId.orderDate),
    },
    { field: "_id", headerName: "Order ID", width: 250 },
    {
      field: "companyName",
      headerName: "Company Name",
      width: 150,
      renderCell: (params: any) => params.row.companyId.companyName,
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

      <div className="table-responsive">
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
                filter: "hue-rotate(200deg)", // Adjust the degree for a blue effect
              }}
            />
          </div>
        ) : (
          <>
            <DataGrid
              rows={rowData}
              columns={columns}
              getRowId={(row: Review) => row._id}
              hideFooter={true}
              autoHeight
            />

            {total > pageSize && (
              <div className="pagewrapper">
                <ReactPaginate
                  containerClassName={"pagination"}
                  pageClassName={"page-item"}
                  activeClassName={"active"}
                  onPageChange={(event) => setPage(event.selected)}
                  pageCount={Math.ceil(total / pageSize)}
                  breakLabel="..."
                  previousLabel={
                    <IconContext.Provider
                      value={{ color: "#B8C1CC", size: "36px" }}
                    >
                      <AiFillLeftCircle />
                    </IconContext.Provider>
                  }
                  nextLabel={
                    <IconContext.Provider
                      value={{ color: "#B8C1CC", size: "36px" }}
                    >
                      <AiFillRightCircle />
                    </IconContext.Provider>
                  }
                />
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default CustomerReviews;
