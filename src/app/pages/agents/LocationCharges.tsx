import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { KTSVG } from "../../../_metronic/helpers";
import { getRequest } from "../../modules/auth/core/_requests";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import "../../assets/sass/pagnition.scss";
import { useParams } from "react-router-dom";
import LocationChargesModel from "./LocationChargesModel";
import { Switch } from "@mui/material";
import changeStatus from "../../../common/ChangeStatus";
import Swal from "sweetalert2";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
const LocationCharges: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [filterData, setFilterData] = useState();
  const pageSize = 10;
  const { agentId } = useParams();
  const [initialValues, setInitialValues] = useState({
    deliveryCharge: "",
    isFreeDelivery: false,
    minOrderAmt: "",
    areaId: "",
    companyId: "",
    id: "",
  });
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    setLoading(true); // Start loading
    const locationData = await getRequest(
      `/agent/locations/${agentId}`,
      `?pageIndex=${page}&pageSize=${pageSize}`
    );

    const lookupObj = [locationData];
    let data1: Array<any> = [];
    return Promise.allSettled(lookupObj)
      .then((result) => {
        result.forEach((res: any) => {
          data1.push(res.value);
        });
        return data1;
      })
      .then((d) => {
        const dataobj = {
          locationData: d[0]?.data?.status === "ok" ? d[0]?.data : [],
        };
        setRowData(dataobj?.locationData?.data);
        setTotal(dataobj?.locationData?.totalCount);
        setLoading(false); // Stop loading
      })
      .catch(() => {
        setLoading(false); // Stop loading in case of error
        Swal.fire("Error", "Failed to load data", "error");
      });
  };

  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
  }, []);

  const handleModel = (result: any) => {
    setInitialValues({
      deliveryCharge: result?.deliveryCharge,
      isFreeDelivery: result?.isFreeDelivery,
      minOrderAmt: result?.minOrderAmt,
      areaId: result?.areaId._id,
      companyId: result?.companyId,
      id: result?._id,
    });
  };

  const handleChangeStatus = async (id: any, status: any) => {
    setLoading(true); // Start loading
    const result = await changeStatus({
      id,
      status,
      Url: `/agent/location/${id}`,
    });
    setLoading(false); // Stop loading

    if (result) {
      if (result.success) {
        Swal.fire("Success", result.message, "success");
        getData(); // Update the list if necessary
      } else {
        Swal.fire("Error", result.message, "error");
      }
    } else {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  return (
    <>
      <PageTitle>LOCATION & CHARGES</PageTitle>
  
      {loading && ( // Loader display
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
      )}
  
      {!loading && (
        <>
          {rowData?.length > 0 ? (
            rowData.map((result: any) => {
              return (
                <div className={`card mb-8`} key={result._id}>
                  <div className="card-body bg-light">
                    <div className="d-flex align-items-center mb-8">
                      <div className="col-md-3">
                        <div className="flex-grow-1">
                          <span className="text-muted fw-bold d-block">
                            {result?.areaId?.name}
                          </span>
                          <span className="text-muted fw-semibold d-block">
                            {result?.areaId?.countryId?.name} /{" "}
                            {result?.areaId?.cityId?.name}
                          </span>
                        </div>
                      </div>
  
                      <div className="col-md-2">
                        <div className="flex-grow-1">
                          <span className="text-muted fw-bold d-block">
                            {result?.minOrderAmt} BHD
                          </span>
                          <span className="text-muted fw-semibold d-block">
                            Min Order Amount
                          </span>
                        </div>
                      </div>
  
                      <div className="col-md-2">
                        <div className="flex-grow-1">
                          <span className="text-muted fw-bold d-block">
                            {result?.isFreeDelivery ? `Free` : result?.deliveryCharge}
                          </span>
                          <span className="text-muted fw-semibold d-block">
                            Delivery Charges
                          </span>
                        </div>
                      </div>
  
                      <div className="col-md-3">
                        <div className="flex-grow-1">
                          <span className="text-muted fw-bold d-block">
                            Service Available
                          </span>
                          <div className="form-check form-switch form-check-custom form-check-solid">
                            <Switch
                              checked={result?.is_active || false}
                              onChange={() =>
                                handleChangeStatus(result?._id, !result?.is_active)
                              }
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          </div>
                        </div>
                      </div>
  
                      <span
                        data-bs-toggle="modal"
                        data-bs-target="#kt_modal_1"
                        onClick={() => handleModel(result)}
                        className="badge badge-warning fs-8 fw-bold"
                      >
                        Update Charges
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <tr>
              <td>No Locations Found</td>
            </tr>
          )}
          <LocationChargesModel initialValues={initialValues} />
        </>
      )}
    </>
  );
  
  
};

export default LocationCharges;
