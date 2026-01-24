import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import PersonalDetail from "./include/PersonalDetail";
import Permission from "./include/Permission";
import { useParams } from "react-router-dom";
import { getRequest } from "../../../modules/auth/core/_requests";
import { useFormik } from "formik";

const AgentUserDetail: FC = () => {
  const [permissions, setPermissions] = useState([]);
  const [userData, setUserData] = useState({});
  const [steps, setSteps] = useState(1);
  const { agentId, userId } = useParams();

  const initialValues = {
    name: "",
    email: "",
    dialCode: "",
    mobile: "",
    userType: "",
    role: "",
    userName: "",
    status: false,
    profileImg: "",
  };
  const [formData, setFormData] = useState(initialValues);

  const nextStep = (step: any) => {
    setSteps(step);
  };

  const formik = useFormik({
    initialValues: formData,
    enableReinitialize: true,
    //validationSchema: itemSchema,
    onSubmit: async (values) => {},
  });

  const getData = async () => {
    const userData = await getRequest(`/agent/users/list/${agentId}`, ``);
    const permissionList = await getRequest(`/agent/permissions`, ``);

    const lookupObj = [userData, permissionList];
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
          userData: d[0]?.data?.status === "ok" ? d[0]?.data : [],
          permissionListData: d[1]?.data?.status === "ok" ? d[1]?.data : [],
        };
        let userDetail = dataobj?.userData?.data?.find(
          (i: any) => i?._id == userId
        );

        setUserData(userDetail);
        setPermissions(dataobj?.permissionListData?.data);

        const initialValues = {
          name: userDetail?.name,
          email: userDetail?.email,
          dialCode: userDetail?.dialCode,
          mobile: userDetail?.dialCode + " - " + userDetail?.mobile,
          userType: userDetail?.userType,
          role: userDetail?.role?._id,
          userName: userDetail?.userName,
          status: userDetail?.is_active,
          profileImg: userDetail?.profileImg,
        };
        setFormData(initialValues);
      });
  };

  useEffect(() => {
    async function fetchData() {
      await getData();
    }
    fetchData();
  }, []);

  return (
    <>
      <PageTitle>ADD/UPDATE USER </PageTitle>

      <div className="card">
        <div className="card-body">
          <div className="stepper stepper-links d-flex flex-column pt-15">
            <div className="stepper-nav mb-10">
              <div
                onClick={(e) => nextStep(1)}
                className={`stepper-item ${steps === 1 ? `current` : ``}`}
                data-kt-stepper-element="nav"
              >
                <h3 className="stepper-title">1. User Personal Details</h3>
              </div>

              <div
                onClick={(e) => nextStep(2)}
                className={`stepper-item ${steps === 2 ? `current` : ``}`}
                data-kt-stepper-element="nav"
              >
                <h3 className="stepper-title">2. Permission Details</h3>
              </div>
            </div>
            {steps === 1 && (
              <div className="row g-5 g-xl-8">
                <PersonalDetail userDetail={userData} formik={formik} />
              </div>
            )}
            {steps === 2 && (
              <div className="row g-5 g-xl-8">
                <Permission permission={permissions} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentUserDetail;
