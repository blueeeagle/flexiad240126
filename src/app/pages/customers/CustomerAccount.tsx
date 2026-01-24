/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { useNavigate, useParams } from "react-router-dom";
import { getRequest } from "../../modules/auth/core/_requests";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import logo from "../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
const CustomerAccount: FC = () => {
  const { customerId } = useParams();
  const [customerDetails, setCustomerDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  const getData = async () => {
    setLoading(true); // Set loading to true before API call
    try {
      const customerDetails = await getRequest(
        `/customer/detail/${customerId}`,
        ``
      );

      const lookupObj = [customerDetails];
      let data1: Array<any> = [];
      const results = await Promise.allSettled(lookupObj);

      results.forEach((req: any) => {
        if (req.status === "fulfilled") {
          data1.push(req.value);
        }
      });

      const customerData = {
        customerDetails:
          data1[0]?.data?.status === "ok" ? data1[0]?.data?.data[0] : [],
      };

      setCustomerDetails(customerData?.customerDetails);
    } catch (error) {
      console.error("Error fetching customer details:", error);
    } finally {
      setLoading(false); // Set loading to false after API call
    }
  };

  useEffect(() => {
    getData();
  }, [customerId]);

  const navigation = useNavigate();

  const handleCancel = () => {
    navigation("/customer/list");
  };

  return (
    <>
      <PageTitle>ACCOUNT</PageTitle>

      {loading ? ( // Show loading indicator while fetching data
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
        <div className="card">
          <div className="card-body">
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Customer Profile
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <img
                      style={{ width: "100px", height: "100%" }}
                      src={logo}
                      alt="Customer Profile"
                    />
                  </div>
                </div>
              </div>
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                First & Last Name
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Enter Company Name"
                      value={`${customerDetails?.firstName} ${customerDetails?.lastName}`}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Email Id
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="email"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Enter Owner Name"
                      value={`${customerDetails?.email}`}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Gender
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Enter Company Name"
                      value={`${customerDetails?.gender}`}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Mobile Number
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Enter Mobile Number"
                      value={`${customerDetails?.mobile}`}
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Updated AT
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Enter Company Name"
                      value={
                        customerDetails?.updated_at
                          ? new Date(
                              customerDetails.updated_at
                            ).toLocaleDateString("en-GB")
                          : ""
                      }
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Special Discount (
                {customerDetails?.discounts != null &&
                customerDetails?.discounts.length > 0
                  ? customerDetails?.discounts[0].discType == "percentage"
                    ? "%"
                    : ""
                  : ""}
                )
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Enter Special Discount"
                      value={
                        customerDetails?.discounts != null &&
                        customerDetails?.discounts.length > 0
                          ? `${customerDetails?.discounts[0].value}`
                          : ""
                      }
                      disabled={true}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Status
              </label>

              <div className="col-lg-8">
                <div className="col-lg-12 fv-row">
                  <div className="mb-10">
                    <div className="form-check form-switch form-check-custom form-check-solid">
                      <input
                        className="form-check-input"
                        checked={customerDetails?.is_active}
                        type="checkbox"
                        value=""
                        id="flexSwitchDefault"
                      />
                      <label className="form-check-label">
                        (Inactive / Active)
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* <div className="d-flex flex-stack pt-15">
            <div className="mr-2">
              <button
                type="button"
                className="btn btn-lg btn-light-primary me-3"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>

            <div>
              <button type="submit" className="btn btn-lg btn-primary me-3">
                Submit
              </button>
            </div>
          </div> */}
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerAccount;
