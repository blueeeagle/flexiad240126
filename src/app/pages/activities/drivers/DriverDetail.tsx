import { FC, useEffect, useRef, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import {
  getRequest,
  patchRequest,
  postRequest,
} from "../../../modules/auth/core/_requests";
import AlertBox from "../../../../common/AlertBox";
import clsx from "clsx";

const ActivitiesDriverDetails: FC = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userName: "",
    dialCode: "",
    mobile: "",
    is_active: true,
    profilePic: "",
  });

  const { driverId } = useParams();
  const fileRef = useRef(null);

  // const driverSchema = Yup.object().shape({
  //   name: Yup.string().required("Name is required"),
  //   userName: Yup.string().required("User name is required"),
  //   email: Yup.string()
  //     .email("Invalid email address")
  //     .required("Email is required"),
  //   dialCode: Yup.string().required("Dial code is required"),
  //   mobile: Yup.string().required("Mobile number is required"),
  //   // profilePic: Yup.mixed().required('File is required'),
  // });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setImagePreview(fileURL);

      formik.setFieldValue("profilePic", file);
    }
  };
  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    // validationSchema: driverSchema,
    onSubmit: async (values) => {
      setLoading(true);

      const reqBody = {
        name: values.name,
        email: values.email,
        userName: values.name,
        dialCode: values.dialCode,
        mobile: values.mobile,
        userType: "adminDriver", 
        is_active: true,
      };
      const requestData = new FormData();
      requestData.append("data", JSON.stringify(reqBody));
      // requestData.append('profileImg',values?.profilePic)
      try {
        if (driverId !== "create") {
          await patchRequest(
            `/driver/updateDriver/${driverId}`,
            requestData
          ).then((response) => {
            if (response?.data?.status === "ok") {
              setIsSuccess(true);
              setSuccessMsg("Driver has been updated successfully");
              setLoading(false);
            } else {
              setIsFailed(true);
              setErrorMsg("Something went wrong");
              setLoading(false);
            }
          });
        } else {
          await postRequest("/activities/driver", requestData).then(
            (response) => {
              if (response?.data?.status === "ok") {
                setIsSuccess(true);
                setSuccessMsg("Driver has been added successfully");
                setLoading(false);
              } else {
                setIsFailed(true);
                setErrorMsg("Something went wrong");
                setLoading(false);
              }
            }
          );
        }
      } catch (error) {
        setIsFailed(true);
        setLoading(false);
        setErrorMsg("Something went wrong");
      }
    },
  });

  const getData = async () => {
    if (driverId !== "create") {
      const storedDriverData = localStorage.getItem("editDriverData");
      if (storedDriverData) {
        const parsedData = JSON.parse(storedDriverData);
        const {
          name,
          email,
          userName,
          dialCode,
          mobile,
          is_active,
          profileImg,
        } = parsedData;
        setFormData({
          name,
          email,
          userName,
          dialCode,
          mobile,
          is_active,
          profilePic: profileImg,
        });
      } else {
        const driverData = await getRequest(`/driver/list/?id=${driverId}`, "");
        if (driverData?.data?.status === "ok") {
          const {
            name,
            email,
            userName,
            dialCode,
            mobile,
            is_active,
            profileImg,
          } = driverData?.data?.data[0];
          setFormData({
            name,
            email,
            userName,
            dialCode,
            mobile,
            is_active,
            profilePic: profileImg,
          });
        }
      }
    }
  };

  useEffect(() => {
    getData();
  }, [driverId]);

  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };

  return (
    <>
      <PageTitle>
        {driverId === "create" ? "ADD DRIVER" : "UPDATE DRIVER"}
      </PageTitle>

      <div className="row g-5 g-xl-8">
        <div className="card">
          <div className="card-body py-3">
            <form noValidate className="form" onSubmit={formik.handleSubmit}>
              {/* Name Input */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Name
                </label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    {...formik.getFieldProps("name")}
                    className={clsx(
                      "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid": formik.touched.name && formik.errors.name,
                      },
                      { "is-valid": formik.touched.name && !formik.errors.name }
                    )}
                    placeholder="Enter Name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Email
                </label>
                <div className="col-lg-8">
                  <input
                    type="email"
                    {...formik.getFieldProps("email")}
                    className={clsx(
                      "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.email && formik.errors.email,
                      },
                      {
                        "is-valid":
                          formik.touched.email && !formik.errors.email,
                      }
                    )}
                    placeholder="Enter Email"
                  />
                </div>
              </div>

              {/* Username Input */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Username
                </label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    {...formik.getFieldProps("name")}
                    className={clsx(
                      "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.userName && formik.errors.userName,
                      },
                      {
                        "is-valid":
                          formik.touched.userName && !formik.errors.userName,
                      }
                    )}
                    placeholder="Enter Username"
                  />
                </div>
              </div>
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6"></label>
                <div className="col-lg-8">
                  {imagePreview && (
                    <div className="mt-3">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        style={{
                          maxWidth: "100px",
                          height: "auto",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6">
                  Profile Picture
                </label>
                <div className="col-lg-8">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className={clsx(
                      "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.profilePic && formik.errors.profilePic,
                      },
                      {
                        "is-valid":
                          formik.touched.profilePic &&
                          !formik.errors.profilePic,
                      }
                    )}
                  />
                </div>
              </div>

              {/* Display the preview of the image */}

              {/* Dial Code Input */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Dial Code
                </label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    {...formik.getFieldProps("dialCode")}
                    className={clsx(
                      "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.dialCode && formik.errors.dialCode,
                      },
                      {
                        "is-valid":
                          formik.touched.dialCode && !formik.errors.dialCode,
                      }
                    )}
                    placeholder="Enter Dial Code"
                  />
                </div>
              </div>

              {/* Mobile Input */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Mobile Number
                </label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    {...formik.getFieldProps("mobile")}
                    className={clsx(
                      "form-control form-control-lg form-control-solid mb-3 mb-lg-0",
                      {
                        "is-invalid":
                          formik.touched.mobile && formik.errors.mobile,
                      },
                      {
                        "is-valid":
                          formik.touched.mobile && !formik.errors.mobile,
                      }
                    )}
                    placeholder="Enter Mobile"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="card-footer d-flex justify-content-end py-6 px-9">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {!loading && "Save"}
                  {loading && (
                    <span
                      className="indicator-progress"
                      style={{ display: "block" }}
                    >
                      Please wait...
                      <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {isSuccess && (
        <AlertBox
          redirectUrl={`/activities/drivers`}
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

export default ActivitiesDriverDetails;
