import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import AlertBox from "../../../../common/AlertBox";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";
const UserRoleDetail: FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<any>({});
  const [companyId, setCompanyId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const { roleId } = useParams();
  const [successMsg, setSuccessMsg] = useState(``);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };
  useEffect(() => {
    const url = window.location.href; // Get the current URL
    const urlObject = new URL(url); // Create a URL object

    // Extract the pathname and split it to get the ID
    const pathname = urlObject.pathname;
    const extractedId = pathname.split('/')[2];

    // Update the state with the extracted ID
    setCompanyId("66947d4f3397b14671f90f5d");
    // console.log(extractedId);
    
  }, []);
  // Fetch permissions data
  const getData = async (id: any) => {
    setIsLoading(true);
    let roleData = [];
    if (id) {
      roleData = await getRequest(`/admin/roles`, `?pageIndex=&pageSize=10`);
      if (roleData?.data?.status === "ok") {
        setRowData(roleData?.data?.data[0]?.permissions);
        setSelectedPermissions(roleData?.data?.data[0]?.permissions);
        setRoleName(roleData?.data?.data[0]?.roleName);
        setDescription(roleData?.data?.data[0]?.description);
      }
    } else {
      roleData = await getRequest(`/admin/permissions`, ``);
      if (roleData?.data?.status === "ok") {
        setRowData(roleData?.data?.data[0]?.permissions);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData(roleId !== "create" ? roleId : "");
  }, [roleId]);
  // console.log('row', selectedPermissions);

  // Handle checkbox changes
  const handleCheckboxChange = (
    label: string,
    permission: string,
    isSubMenu: boolean = false,
    subMenuLabel: string = ""
  ) => {
    setSelectedPermissions((prev: any) => {
      const newPermissions = { ...prev };
      // console.log('newPermissions',newPermissions,prev);

      if (!isSubMenu) {
        // Ensure we initialize the array if it doesn't exist
        if (!Array.isArray(newPermissions[label])) {
          newPermissions[label] = [];
        }

        // Toggle the permission in the main menu
        if (newPermissions[label].includes(permission)) {
          // Remove the permission if already selected
          newPermissions[label] = newPermissions[label].filter(
            (p: string) => p !== permission
          );
        } else {
          // Add the permission if not selected
          newPermissions[label].push(permission);
        }
      } else {
      
        if (!newPermissions[label]) {
          newPermissions[label] = {};
        }


        if (!Array.isArray(newPermissions[label][subMenuLabel])) {
          newPermissions[label][subMenuLabel] = [];
        }

        // Toggle the permission in the submenu
        if (newPermissions[label][subMenuLabel].includes(permission)) {
          // Remove the permission if already selected
          newPermissions[label][subMenuLabel] = newPermissions[label][
            subMenuLabel
          ].filter((p: string) => p !== permission);
        } else {
          // Add the permission if not selected
          newPermissions[label][subMenuLabel].push(permission);
        }
      }

      return newPermissions;
    });
  };


  const handleSubmit = async () => {
    const payload = {
      companyId: companyId, // Example companyId, you can make it dynamic
      roleName,
      description,
      permissions: rowData.map((item, index: any) => ({
        label: item.label,
        permissions: selectedPermissions[item.label] || item.permissions,
        subMenu: item.subMenu?.map((sub: any) => ({
          label: sub.label,
          permissions:
            selectedPermissions[item.label]?.[sub.label] ||
            item.subMenu[index]?.permissions,
        })),
      })),
    };

    try {
      if (roleId && roleId !== "create") {
        const response = await patchRequest(`/admin/role/${roleId}`, payload);
        console.log("Response:", response);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Permission has been updated successfully`);
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      } else {
        const response = await postRequest("/admin/role", payload);
        console.log("Response:", response);
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg(`Permission has been created successfully`);
        } else {
          setIsFailed(true);
          setErrorMsg(`Something Went Wrong`);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <PageTitle>ADD/UPDATE USER ROLE</PageTitle>
      {isLoading ? (
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
      <div className="row g-5 g-xl-8">
        <div className="card">
          <div className="card-body py-3">
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Role
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                  placeholder="Enter Role Name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </div>
            </div>
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Description
              </label>
              <div className="col-lg-8">
                <input
                  type="text"
                  className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                  placeholder="Enter Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr className="fw-bold text-muted">
                    <th className="min-w-200px">Label</th>
                    <th className="min-w-100px">View</th>
                    <th className="min-w-100px">Create</th>
                    <th className="min-w-100px">Edit</th>
                    <th className="min-w-100px">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {rowData?.length > 0 ? (
                    rowData.map((result: any) => (
                      <>
                        <tr key={result?.label}>
                          <td>
                            <label className="form-check form-check-custom form-check-solid align-items-start">
                              {/* <input
                                                            className='form-check-input'
                                                            type='checkbox'
                                                            data-kt-check='true'
                                                            data-kt-check-target='.widget-9-check'
                                                        /> */}
                              <span className="form-check-label d-flex flex-column align-items-start">
                                <span className="fw-bolder fs-5 mb-0">
                                  {result?.label}
                                </span>
                              </span>
                            </label>
                          </td>
                          {["view", "create", "edit", "delete"].map((perm) => (
                            <td key={perm}>
                              <label className="form-check form-check-custom form-check-solid align-items-start">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={
                                    Array.isArray(
                                      selectedPermissions[result?.label]
                                    )
                                      ? selectedPermissions[
                                          result?.label
                                        ]?.includes(perm)
                                      : Array.isArray(result?.permissions) &&
                                        result?.permissions?.includes(perm)
                                  }
                                  onChange={() =>
                                    handleCheckboxChange(result?.label, perm)
                                  }
                                />
                              </label>
                            </td>
                          ))}
                        </tr>
                        {result?.subMenu &&
                          result?.subMenu.length > 0 &&
                          result.subMenu.map((subMenu: any, index: any) => (
                            <tr key={subMenu.label}>
                              <td className="px-4">
                                <label className="form-check form-check-custom form-check-solid align-items-start">
                                  {/* <input
                                                                    className='form-check-input'
                                                                    type='checkbox'
                                                                    data-kt-check='true'
                                                                    data-kt-check-target='.widget-9-check'
                                                                /> */}
                                  <span className="form-check-label d-flex flex-column align-items-start">
                                    <span className="fw-bolder fs-5 mb-0">
                                      {subMenu?.label}
                                    </span>
                                  </span>
                                </label>
                              </td>
                              {["view", "create", "edit", "delete"].map(
                                (perm) => (
                                  <td key={perm}>
                                    <label className="form-check form-check-custom form-check-solid align-items-start">
                                      <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={
                                          Array.isArray(
                                            selectedPermissions[
                                              result?.label
                                            ]?.[subMenu?.label]
                                          )
                                            ? selectedPermissions[
                                                result?.label
                                              ]?.[subMenu?.label]?.includes(
                                                perm
                                              )
                                            : Array.isArray(
                                                result?.subMenu[index]
                                                  ?.permissions
                                              ) &&
                                              result?.subMenu[
                                                index
                                              ]?.permissions?.includes(perm)
                                        }
                                        onChange={() =>
                                          handleCheckboxChange(
                                            result?.label,
                                            perm,
                                            true,
                                            subMenu?.label
                                          )
                                        }
                                      />
                                    </label>
                                  </td>
                                )
                              )}
                            </tr>
                          ))}
                      </>
                    ))
                  ) : (
                    <tr>
                      <td>No Data Found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
          )}
      {isSuccess && (
        <AlertBox
          redirectUrl={`/userRoles`}
          close={closeAlert}
          type={`success`}
        >
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

export default UserRoleDetail;
