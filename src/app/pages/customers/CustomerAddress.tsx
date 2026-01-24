/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { KTIcon } from "../../../_metronic/helpers";
import { KTSVG } from "../../../_metronic/helpers";
import { getRequest } from "../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
const CustomerAddress: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const pageSize = 100;
  const { customerId } = useParams();
  const getDate = async () => {
    setLoading(true);
    try {
      const addressList = await getRequest(`/customer/address/${customerId}`, ``);
      
      const dataObj = {
        addressList: addressList?.data?.status === "ok" ? addressList?.data : [],
      };
  
      setRowData(dataObj?.addressList?.data);
      setTotal(dataObj?.addressList?.totalCount);
    } catch (error) {
      console.error("Error fetching address data:", error);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };
  

  useEffect(() => {
    async function fetchData() {
      await getDate();
    }
    fetchData();
  }, [page]);

  return (
    <>
      <PageTitle>ADDRESSES</PageTitle>
      <div className="row mb-8">
        <div
          className="card-toolbar"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_1"
        >
          <a
            href="#"
            style={{ float: "right" }}
            className="btn btn-sm btn-light-primary"
          >
            <KTIcon iconName="plus" className="fs-3" />
            Add Address
          </a>
        </div>
      </div>

      {loading ? ( // Show loading indicator
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
      ) : rowData?.length > 0 ? (
        rowData.map((result: any) => {
          return (
            <div className="card mb-8">
              <div className="card-body bg-light">
                <div className="d-flex align-items-center">
                  <div className="col-md-10">
                    <div className="flex-grow-1">
                      <span className="text-muted fw-semibold d-block">
                        <strong>Block</strong> : {result?.block}
                      </span>
                      <span className="text-muted fw-semibold d-block">
                        <strong>Building</strong> : {result?.building}
                      </span>
                      <span className="text-muted fw-semibold d-block">
                        <strong>Address</strong> : {result?.street},{" "}
                        {result?.areaId?.name}, {result?.cityId?.name},{" "}
                        {result?.state?.name}
                      </span>
                      <span className="text-muted fw-semibold d-block">
                        {" "}
                        {result?.countryId?.name} - {result?.zipcode}
                      </span>
                    </div>
                  </div>

                  {/* <div className="col-md-2">
                    <div className="flex-grow-1">
                      <a
                        href="/customer/profile?customerId=1234"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="pencil" className="fs-3" />
                      </a>
                      <a
                        href="#"
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                      >
                        <KTIcon iconName="trash" className="fs-3" />
                      </a>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="card mb-8">
          <div className="card-body bg-light">
            <div className="d-flex align-items-center">
              <div className="col-md-12">
                <div className="flex-grow-1">
                  <div> No Record Found </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="modal fade" tabIndex={-1} id="kt_modal_1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Address <br />{" "}
                <label style={{ fontSize: "0.75rem" }}>Address Title</label>
              </h5>

              <div
                className="btn btn-icon btn-sm btn-primary ms-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <KTSVG
                  path="media/icons/duotune/arrows/arr061.svg"
                  className="svg-icon svg-icon-2x"
                />
              </div>
            </div>
            <div className="modal-body">
              <div className="row ">
                <label className="col-lg-12 col-form-label required fs-6">
                  Address Title
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Title"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fw-bold fs-6">
                  Door No & Street
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Door No & Street"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fs-6">
                  Locality / Landmark
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Locality"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fs-6">
                  Area
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Area"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fs-6">
                  City
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter City"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fs-6">
                  State / Province
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter State"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fs-6">
                  Country
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Country"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fs-6">
                  Post Code
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Post Code"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-light"
                data-bs-dismiss="modal"
              >
                Discard
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerAddress;
