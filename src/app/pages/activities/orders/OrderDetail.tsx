import { FC } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";

const OrderDetail: FC = () => {
  return (
    <>
      <PageTitle>VIEW ORDERS</PageTitle>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body bg-light-success">
              <div className="d-flex align-items-center mb-8">
                <div className="col-md-12">
                  <div className="flex-grow-1">
                    <span className="fw-bold d-block">Mohammed Nabi</span>
                    <span className="fw-semibold d-block">
                      Mobile Number: +97132322323
                    </span>
                    <span className="fw-semibold d-block">
                      Email: mohammed@gmail.com{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body bg-light-success">
              <div className="d-flex align-items-center mb-8">
                <div className="col-md-8">
                  <div className="flex-grow-1">
                    <span className="fw-semibold d-block">
                      ORD001 | 12/11/2023{" "}
                    </span>
                    <span className="fw-semibold d-block">Booked via POS </span>
                    <span className="fw-semibold d-block">Track Status </span>
                  </div>
                </div>

                <div className="col-md-4">
                  <div className="flex-grow-1">
                    <span className="fw-semibold d-block">
                      <button className="btn btn-primary">Booked</button>
                    </span>
                    <span className="fw-semibold d-block">Update</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body bg-light-success">
              <div className="d-flex align-items-center mb-8">
                <div className="col-md-6">
                  <div className="flex-grow-1">
                    <span className="fw-bold d-block">Delivery Address</span>
                    <span className="fw-semibold d-block">Address</span>
                    <span className="fw-semibold d-block">
                      street, city, region{" "}
                    </span>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="flex-grow-1">
                    <span className="fw-bold d-block">
                      PickUp on : 21/11/23 (5:00 AM - 12:00 PM)
                    </span>
                    <span className="fw-bold d-block">
                      Delivery on : 21/11/23 (5:00 AM - 12:00 PM)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body bg-light-success">
              <div className="d-flex align-items-center mb-8">
                <div className="col-md-12">
                  <div className="flex-grow-1">
                    <span className="fw-semibold d-block">Mohammed </span>
                    <span className="fw-semibold d-block">
                      Area, Region, State, Country
                    </span>
                    <span className="fw-semibold d-block">
                      Mobile: 9087719073{" "}
                    </span>
                    <span className="fw-semibold d-block">
                      Email: nabi@gmail.com{" "}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-md-6">
          <h3 className="card-title align-items-start flex-column mb-4">
            <span className="card-label fw-bold fs-3 mb-1">Items</span>
          </h3>

          <div className="card mb-8">
            <div className="card-body bg-light-warning">
              <div className="d-flex align-items-center">
                <div className="col-md-6">
                  <div className="flex-grow-1">
                    <span className="fw-bold d-block">Item 1</span>
                    <span className="fw-semibold d-block">For: Dry Clean</span>
                    <span className="fw-semibold d-block">2 * 50 BHD</span>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="flex-grow-1">
                    <span className="fw-bold d-block">1</span>
                  </div>
                </div>

                <div className="col-md-2">
                  <div className="flex-grow-1">
                    <span className="fw-bold d-block">100 BHD</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="card-title align-items-start flex-column mb-4">
            <span className="card-label fw-bold fs-3 mb-1">DETERGENTS</span>
          </h3>

          <div className="row mb-8">
            <div className="d-flex align-items-center">
              <div className="col-md-6">
                <div className="flex-grow-1">
                  <span className="text-muted fw-bold d-block">
                    Ironing Type
                  </span>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="col-lg-6 fv-row">
                  <div className="mb-10">
                    <div className="form-check form-switch form-check-custom form-check-solid">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexSwitchDefault"
                      />
                      <label className="form-check-label">Softner</label>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 fv-row">
                  <div className="mb-10">
                    <div className="form-check form-switch form-check-custom form-check-solid">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="flexSwitchDefault"
                      />
                      <label className="form-check-label">Perfume</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <h3 className="card-title align-items-start flex-column mb-4">
            <span className="card-label fw-bold fs-3 mb-1">
              Payment Details
            </span>
          </h3>

          <div className="col-md-12">
            <div className="card">
              <div className="card-body bg-light-success">
                <div className="d-flex align-items-center mb-8">
                  <div className="col-md-6">
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">Total Amount </span>
                      <span className="fw-semibold d-block">
                        (+ Delivery Charges){" "}
                      </span>
                      <span className="fw-semibold d-block">
                        (- Discount Charges){" "}
                      </span>
                      <span className="fw-bold d-block">Final Amount </span>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div className="flex-grow-1">
                      <span className="fw-semibold d-block">10 BHD </span>
                      <span className="fw-semibold d-block">10 BHD</span>
                      <span className="fw-semibold d-block">10 BHD </span>
                      <span className="fw-bold d-block">30 BHD </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetail;
