/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState, useEffect, useCallback } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { KTIcon, toAgentApiUrl, toApiUrl } from "../../../_metronic/helpers";
import { toAbsoluteUrl } from "../../../_metronic/helpers";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { stringToDate } from "../../../common/Date";
import { getRequest, patchRequest } from "../../modules/auth/core/_requests";
import ReactPaginate from "react-paginate";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import logo from "../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
import Modal from "../../../common/ModalPopup";
import useModal from "../../../hooks/useModal";
import { useFormik } from "formik";
import clsx from "clsx";
import AlertBox from "../../../common/AlertBox";
import * as Yup from "yup";
// import { deleteRequest } from '../../modules/auth/core/_requests';
import Swal from "sweetalert2";
import { Switch } from "@mui/material";
import changeStatus from "../../../common/ChangeStatus";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import "../../../../src/_metronic/assets/sass/components/AgentList.scss";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
import { log } from "console";
const statusSchema = Yup.object().shape({
  reason: Yup.string().required("Reason is required"),
});
const AgentList: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isOpen, toggle } = useModal();
  const [companyId, setCompanyId] = useState("");
  const [searchValue, setSearchValue] = useState("");
  //searchValue
  const navigate = useNavigate();
  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const BankVerification = queryParams.get('bankVerified') || '';
  console.log(BankVerification);

  const getData =useCallback( async () => {
    setLoading(true); // Show loader
    let query = `?pageIndex=${page}&pageSize=${pageSize}&searchValue=${searchValue}`;

    if (BankVerification === 'false') {
      query += `&bankVerified=false`;
    }
    try {
      const countryData = await getRequest(`/agent/list`, query);

      let data1: Array<any> = [];

      const isVerified = countryData?.data?.[0]?.bankDetails?.[0]?.isVerified; // Fetch isVerified from bankDetails

      const lookupObj = [countryData];

      return Promise.allSettled(lookupObj)
        .then((result) => {
          result.forEach((res: any) => {
            data1.push(res.value);
          });
          return data1;
        })
        .then((d) => {
          const dataobj = {
            agentData: d[0]?.data?.status === "ok" ? d[0]?.data : [],
          };
          setRowData(
            dataobj?.agentData?.data.map((agent: any) => ({
              ...agent,
              isVerified: agent?.bankDetails?.[0]?.isVerified,
            }))
          );
          setTotal(dataobj?.agentData?.totalCount);
          setLoading(false); // Hide loader
        })
        .catch(() => {
          setLoading(false); // Hide loader in case of error
        });
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false); // Hide loader in case of error
    }
  },[BankVerification, page, searchValue])

  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
  }, [getData, page]);

  useEffect(() => {
    setCompanyId(" ");
  }, [isSuccess]);

  const handleRejectModal = async (id: any) => {
    setCompanyId(id);
    toggle();
  };

  const initialValues = {
    reason: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    validationSchema: statusSchema,
    onSubmit: async (values) => {
      setLoading(true);

      let reqBody = {
        reason: values?.reason,
      };

      try {
        if (companyId) {
          await patchRequest(
            `/agent/company/reject/${companyId}`,
            reqBody
          ).then((response) => {
            if (response?.data?.status === "ok") {
              setIsSuccess(true);
              setSuccessMsg(`Status Updated successfully`);
              setLoading(false);
            } else {
              setIsFailed(true);
              setLoading(false);
              setErrorMsg(response);
            }
          });
          toggle();
          await getData();
        }
      } catch (error) {
        setIsFailed(true);
        setLoading(false);
        setErrorMsg(`Something Went Wrong${error}`);
      }
    },
  });

  const handleApprove = (id: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this agent!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "No, keep it",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform deletion action
        agentApprove(id);
        // Example: deleteItem(itemId);
        Swal.fire("Approved!", "Agent has been approved.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your item is safe :)", "error");
      }
    });
  };

  const agentApprove = async (id: any) => {
    await patchRequest(`/agent/company/approve/${id}`, "").then((response) => {
      if (response?.data?.status === "ok") {
        setIsSuccess(true);
        setSuccessMsg(`Status Updated successfully`);
        setLoading(false);
        getData();
      } else {
        setIsFailed(true);
        setLoading(false);
        setErrorMsg(response);
        getData();
      }
    });
  };

  const handleChangeStatus = async (id: any, status: any) => {
    const result = await changeStatus({
      id,
      status,
      Url: `/agent/company/changeStatus/${id}`,
    });

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

  function listOfServices(params: any) {
    if (!Array.isArray(params)) {
      return "";
    }

    return params.map((element: any) => element.serviceName).join(",");
  }

  const columns: GridColDef[] = [
    {
      field: "companyLogo",
      headerName: "Logo",
      width: 100,
      renderCell: (params: any) => (
        <img
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
          src={
            params.row.companyLogo
              ? `http://agentapi.flexiclean.me/${params.row.companyLogo}`
              : logo
          }
          alt="Logo"
          onError={(e) => {
            (e.target as HTMLImageElement).src = logo;
          }}
        />
      ),
    },
    {
      field: "companyName",
      headerName: "Company Name",
      width: 200,
      renderCell: (params: any) => (
        <Link
          to={`/agent/${params.row._id}?isverified=${params.row.isVerified ?? "false"
            }&company=${params.row.companyName.replace(/\s+/g, "-").toLowerCase() || "n-a"
            }`}
        >
          {params.row.companyName || "N/A"}
        </Link>
      ),
    },

    {
      field: "services",
      headerName: "Services",
      width: 150,
      renderCell: (params: any) => listOfServices(params.value),
    },
    {
      field: "type",
      headerName: "Type",
      width: 150,
      renderCell: (params: any) =>
        params.row.agentId?.pos && params.row.agentId?.online
          ? "POS, Online"
          : params.row.agentId?.pos
            ? "POS"
            : params.row.agentId?.online
              ? "Online"
              : "",
    },
    {
      field: "registeredOn",
      headerName: "Registered On",
      width: 150,
      renderCell: (params: any) => stringToDate(params.row.agentId?.created_at),
    },
    {
      field: "updatedOn",
      headerName: "Updated On",
      width: 150,
      renderCell: (params: any) => stringToDate(params.row.updated_at),
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
        <div className="sticky-cell">
          {params.value === "Approved" ? (
            <span className="badge badge-primary fs-8 fw-bold">
              {params.value}
            </span>
          ) : (
            <span className="badge badge-danger fs-8 fw-bold">
              {params.value || "In progress"}
            </span>
          )}
        </div>
      ),
    },
    {
      field: "is_active",
      headerName: "Active",
      width: 100,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
        <div className="sticky-cell">
          <Switch
            checked={params.value || false}
            onChange={() => handleChangeStatus(params.row._id, params.value)}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      headerClassName: "sticky-header",
      renderCell: (params: any) => (
        <div className="action-dropdown">
          <select
            className="form-select"
            onChange={(e) => {
              const selectedValue = e.target.value;
              if (selectedValue === "edit") {
                navigate(`/agent/${params.row._id}`);
              } else if (selectedValue === "delete") {
                // Implement delete action here
              } else if (selectedValue === "accept") {
                handleApprove(params.row._id);
              } else if (selectedValue === "reject") {
                handleRejectModal(params.row._id);
              }
              e.target.value = ""; // Reset dropdown after selection
            }}
            defaultValue=""
          >
            <option value="" disabled>
              ...
            </option>
            <option value="edit">Edit</option>
            <option value="delete">Delete</option>
            {params.row.status !== "Approved" && (
              <>
                <option value="accept">Accept</option>
                <option value="reject">Reject</option>
              </>
            )}
          </select>
        </div>
      ),
    },

    // {
    //   field: "verification",
    //   headerName: "Verification",
    //   width: 150,
    //   renderCell: (params: any) =>
    //     params.row.isVerified === undefined
    //       ? "No Data"
    //       : params.row.isVerified
    //       ? "Verified"
    //       : "Not Verified",
    // },
  ];
  const handleRowClick = (data: any) => {

    localStorage.setItem("bankDetails", JSON.stringify(data.bankDetails));
    localStorage.setItem("selectedRow", JSON.stringify(data));
    console.log("All data stored in local storage:", data);
    console.log(data);
  };

  const handleInputChange = (e:any) => {
    setSearchValue(e.target.value);
  };

  const handleSelectChange = (e:any) => {
    setSearchValue(e.target.value);
  };


  return (
    <>
      <PageTitle>AGENTS</PageTitle>
      <div className="row g-5 g-xl-8">

        <div className="">
          <div className="d-flex justify-content-end w-100 align-items-end gap-3">
            {/* Search Input */}
            <input
              type="text"
              className="form-control"
              name="searchValue"
              value={searchValue}
              onChange={handleInputChange}
              placeholder="Search..."
              style={{ width: "200px" }}
            />

            {/* Select Dropdown */}
            <select
              className="form-select"
              name="searchValue"
              value={searchValue}
              onChange={handleSelectChange}
              style={{ width: "200px" }}
            >
              <option value="">Select an option</option>
              <option value="Approval Pending">Approval Pending</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
            </select>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <div className="card-header border-0 pt-5">
              <h3 className="card-title align-items-start flex-column">
                <span className="card-label fw-bold fs-3 mb-1">Agent List</span>
              </h3>
            </div>
            {/* <div
              className="card-toolbar"
              data-bs-toggle="tooltip"
              data-bs-placement="top"
              data-bs-trigger="hover"
              title="Click to add a user"
            >
              <Link
                to={`/agent/create`}
                className="btn btn-sm btn-light-primary"
              >
                <KTIcon iconName="plus" className="fs-3" />
                New Agent
              </Link>
            </div> */}
          </div>

          <div className="py-3">
            <div className="data-grid-container">

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
                <div className="">
                  <DataGrid
                    rows={rowData}
                    columns={columns}
                    getRowId={(row) => row._id}
                    hideFooter={true}
                    rowCount={total}
                    onRowClick={(params) => handleRowClick(params.row)}
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
            {total > pageSize && (
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
                  onPageChange={(event) => setPage(event.selected)}
                  pageCount={Math.ceil(total / pageSize)}
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
            )}
          </div>
        </div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <form onSubmit={formik.handleSubmit} noValidate className="form">
            <h2 style={{ display: "flex", justifyContent: "center" }}>
              Rejected
            </h2>
            <h4
              style={{ display: "flex", justifyContent: "center" }}
              className="p-5 pt-10"
            >
              Are you sure you want to reject the agent?
            </h4>
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Reason
              </label>

              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <textarea
                      {...formik.getFieldProps("reason")}
                      className={clsx(
                        "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                        {
                          "is-invalid":
                            formik.touched.reason && formik.errors.reason,
                        },
                        {
                          "is-valid":
                            formik.touched.reason && !formik.errors.reason,
                        }
                      )}
                      placeholder="Remarks"
                    />
                    {formik.touched.reason && formik.errors.reason && (
                      <div
                        style={{ color: "red" }}
                        className="fv-plugins-message-container"
                      >
                        <span role="alert">{formik.errors.reason}</span>

                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-end py-6 px-9">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {!loading && "Save Changes"}
                {loading && (
                  <span
                    className="indicator-progress"
                    style={{ display: "block" }}
                  >
                    Please wait...{" "}
                    <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </Modal>
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

export default AgentList;
