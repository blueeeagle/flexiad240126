import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { KTSVG } from "../../../../_metronic/helpers";
import { useParams } from "react-router-dom";
import { getRequest, postRequest } from "../../../modules/auth/core/_requests";
import { stringToDate } from "../../../../common/Date";

const AgentPayIn: FC = () => {
  const [rowData, setRowData] = useState([]);
  const { customerId } = useParams();
  const getData = async (countryId = "") => {
    try {
      const transactionData = await postRequest(
        `/activities/orders?pageSize=10&pageIndex=0&fromDate&toDate`,
        ""
      );

      const lookupObj = [transactionData];

      if (transactionData?.data?.status === "ok") {
        setRowData(transactionData?.data?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
  }, [customerId]); // Fetch data when page changes

  const handleCounty = (value: any) => {
    getData(value);
  };
  return (
    <>
      <PageTitle>Agent & PAY IN</PageTitle>
      <h3 className="card-title align-items-start flex-column mb-4">
        <span className="card-label fw-bold fs-3 mb-1">Wallet</span>
      </h3>

      <div className="card mb-8">
        <div className="card-body bg-light-warning">
          <div className="d-flex align-items-center">
            <div className="col-md-8">
              <div className="flex-grow-1">
                <span className="text-muted fw-bold d-block">1089</span>
                <span className="text-muted fw-semibold d-block">BHD</span>
              </div>
            </div>

            <div className="col-md-2">
              <div className="flex-grow-1">
                <span className="text-muted fw-bold d-block">Bank Details</span>
                <span className="text-muted fw-semibold d-block">
                  No bank details
                </span>
              </div>
            </div>

            <div className="col-md-2">
              <button
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_1"
                className="btn btn-sm fw-bold btn-primary"
              >
                Add/Update
              </button>
              <span
                data-bs-toggle="modal"
                data-bs-target="#kt_modal_2"
                className="badge badge-warning fs-8 fw-bold"
              >
                Verification Pending
              </span>
            </div>
          </div>
        </div>
      </div>

      <h3 className="card-title align-items-start flex-column mb-4">
        <span className="card-label fw-bold fs-3 mb-1">TRANSACTIONS</span>
      </h3>

      <div className="card">
        <div className="card-body py-3">
          <div className="table-responsive">
            <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted">
                  <th className="min-w-100px">Date</th>
                  <th className="min-w-200px">Order ID</th>
                  <th className="min-w-100px">Customer Name</th>
                  <th className="min-w-100px">Mobile Number</th>
                  <th className="min-w-150px">Type</th>
                  <th className="min-w-150px">Method</th>
                  <th className="min-w-100px">Amount</th>
                  <th className="min-w-100px">Charges</th>
                  <th className="min-w-100px">Total</th>
                  <th className="min-w-100px">Discount</th>
                  <th className="min-w-100px">Final</th>
                  <th className="min-w-100px">Platform Commission</th>
                  <th className="min-w-100px">Wallet In</th>
                </tr>
              </thead>
              <tbody>
                {rowData?.length > 0 ? (
                  rowData.map((result: any) => (
                    <tr>
                      <td>{stringToDate(result?.orderDate)}</td>
                      <td>{result?.orderNo}</td>
                      <td>{result?.customerId?.firstName}</td>
                      <td>{result?.customerId?.mobile}</td>
                      <td>{result?.orderMode}</td>
                      <td>POS</td>
                      <td>{result?.grossAmt}</td>
                      <td>-1</td>
                      <td>-2</td>
                      <td>{result?.discAmt}</td>
                      <td>{result?.netAmt}</td>
                      {/* <td>{result?.subscribeComm?.type == 'percentage'  ?  result?.subscribeComm?.value + `%`  : result?.subscribeComm?.value                                          }</td> */}
                      <td>{result?.commissionAmount}</td>
                      <td>{result?.payoutAmt}</td>
                    </tr>
                  ))
                ) : (
                  <span> No data found</span>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="modal fade" tabIndex={-1} id="kt_modal_1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">BANK ACCOUNT DETAILS INFO</h5>

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
                  Bank Account Number
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Account Number"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fw-bold fs-6">
                  Account Holder Name
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Account Holder Name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fs-6">
                  Bank Name
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Bank Name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fs-6">
                  Branch Name
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Branch Name"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fs-6">
                  Code
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Code"
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

      <div className="modal fade" tabIndex={-1} id="kt_modal_2">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">ACCOUNT VERIFICATION</h5>

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
                  Enter Amount
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Amount"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fw-bold fs-6">
                  Transaction Date
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="date"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Enter Date"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row ">
                <label className="col-lg-12 col-form-label required fs-6">
                  Transaction ID
                </label>

                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                        placeholder="Transaction ID"
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

export default AgentPayIn;
