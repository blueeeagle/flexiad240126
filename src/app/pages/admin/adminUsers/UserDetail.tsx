import { FC, useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { PageTitle } from "../../../../_metronic/layout/core";
import AlertBox from "../../../../common/AlertBox";

interface Country {
  _id: string;
  name: string;
  dialCode: string;
}

interface Role {
  _id: string;
  roleName: string;
  created_by: string;
}

const AdminUserDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Check if we have user data passed from list page (edit mode)
  const passedUser = (location.state as any)?.user;
  const isEditMode = !!passedUser && !!id;

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyId: "",
    dialCode: "",
    mobile: "",
    userType: "adminUser",
    role: "",
    is_active: true,
    profileImg: null as File | null,
  });

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);

  // Fetch countries and roles (common for both modes)
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await fetch(
          "https://adminapi.flexiclean.me/api/v1/master/countries",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = await res.json();
        setCountries(data.data || []);
      } catch (err) {
        console.error("Country fetch error", err);
      }
    };


    fetchCountries();
    fetchRoles();
  }, [token, isEditMode]);
  const fetchRoles = async () => {
    try {
      const res = await fetch(
        "https://adminapi.flexiclean.me/api/v1/admin/roles",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      const rolesList: Role[] = data.data || [];
      setRoles(rolesList);

      // For create mode (no passed user), set default role and companyId
      if (!isEditMode && rolesList.length > 0) {
        const adminRole = rolesList.find((r) => r.roleName === "Admin");
        const defaultRole = adminRole || rolesList[0];
        setFormData((prev) => ({
          ...prev,
          role: defaultRole._id,
          companyId: defaultRole.created_by,
        }));
      }
    } catch (err) {
      console.error("Roles fetch error", err);
    }
  };

  // If edit mode, pre-fill form with data from route state
  useEffect(() => {
    if (isEditMode && passedUser) {
      // Map the passed row data to form fields
      setFormData({
        name: passedUser.name || "",
        email: passedUser.email || "",
        companyId: passedUser.companyId?._id || passedUser.companyId || "",
        dialCode: passedUser.dialCode || "",
        mobile: passedUser.mobile || "",
        userType: passedUser.userType || "adminUser",
        role: passedUser.role?._id || passedUser.role || "",
        is_active: passedUser.isActive ?? true,
        profileImg: null,
      });
    }
  }, [isEditMode, passedUser]);

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRoleId = e.target.value;
    const selectedRole = roles.find((r) => r._id === selectedRoleId);
    if (selectedRole) {
      setFormData((prev) => ({
        ...prev,
        role: selectedRole._id,
        companyId: selectedRole.created_by,
      }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (name !== "role") {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({ ...prev, profileImg: e.target.files![0] }));
    }
  };

  const closeAlert = () => {
    setIsSuccess(false);
    setIsFailed(false);
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    closeAlert();

    // Validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.companyId ||
      !formData.dialCode ||
      !formData.mobile ||
      !formData.role
    ) {
      setErrorMsg(
        "Please fill all required fields: Name, Email, Dial Code, Mobile Number, and select a Role."
      );
      setIsFailed(true);
      setLoading(false);
      return;
    }

    if (roles.length === 0) {
      setErrorMsg("No roles available. Please contact administrator.");
      setIsFailed(true);
      setLoading(false);
      return;
    }

    // Prepare payload
    const dataPayload = {
      name: formData.name,
      email: formData.email,
      companyId: formData.companyId,
      dialCode: formData.dialCode,
      mobile: formData.mobile,
      userType: formData.userType,
      role: formData.role,
      is_active: formData.is_active,
    };

    let url = "https://adminapi.flexiclean.me/api/v1/admin/user";
    let method = "POST";

    if (isEditMode) {
      url = `https://adminapi.flexiclean.me/api/v1/admin/user/${id}`;
      method = "PATCH";
    }

    // Always use FormData to handle file upload uniformly
    const formDataToSend = new FormData();
    formDataToSend.append("data", JSON.stringify(dataPayload));
    if (formData.profileImg) {
      formDataToSend.append("profileImg", formData.profileImg);
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    try {
      const response = await fetch(url, {
        method,
        body: formDataToSend,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      clearTimeout(timeoutId);
      const rawText = await response.text();
      let result;
      try {
        result = JSON.parse(rawText);
      } catch {
        result = { message: rawText || "Empty response from server" };
      }

      if (response.ok) {
        setSuccessMsg(
          isEditMode ? "User updated successfully!" : "User created successfully!"
        );
        setIsSuccess(true);
        if (!isEditMode) {
          // Reset form for create mode
          setFormData((prev) => ({
            ...prev,
            name: "",
            email: "",
            mobile: "",
            profileImg: null,
            dialCode: "",
            is_active: true,
          }));
          const fileInput = document.querySelector(
            'input[name="profilePicture"]'
          ) as HTMLInputElement;
          if (fileInput) fileInput.value = "";
        }
      
        fetchRoles(); // Refresh roles to get any new changes
        setTimeout(() => {
          navigate("/adminUsers");
        }, 1000);
      } else {
        setErrorMsg(
          `Error ${response.status}: ${result.message || JSON.stringify(result)}`
        );
        setIsFailed(true);
      }
    } catch (error: any) {
      if (error.name === "AbortError") {
        setErrorMsg("Request timed out. Please check your network and try again.");
      } else {
        console.error("Fetch error:", error);
        setErrorMsg("Network error. Check the console for details.");
      }
      setIsFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle>{isEditMode ? "EDIT USER" : "ADD USER"}</PageTitle>
      <div className="row g-5 g-xl-8">
        <div className="card">
          <div className="card-body py-3">
            <form noValidate className="form" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Name
                </label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Email
                </label>
                <div className="col-lg-8">
                  <input
                    type="email"
                    name="email"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Role Dropdown */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Role
                </label>
                <div className="col-lg-8">
                  <select
                    name="role"
                    className="form-select form-select-solid form-select-lg fw-bold"
                    value={formData.role}
                    onChange={handleRoleChange}
                    required
                  >
                    <option value="">Select a Role</option>
                    {roles.map((c) => ((role) => (
                      <option key={role._id} value={role._id}>
                        {role.roleName}
                      </option>
                    ))(c))}
                  </select>
                </div>
              </div>

              {/* Dial Code */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Dial Code
                </label>
                <div className="col-lg-8">
                  <select
                    name="dialCode"
                    className="form-select form-select-solid form-select-lg fw-bold"
                    value={formData.dialCode}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c._id} value={c.dialCode}>
                        {c.name} ({c.dialCode})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Mobile */}
              <div className="row mb-12">
                <label className="col-lg-4 col-form-label required fw-bold fs-6">
                  Mobile Number
                </label>
                <div className="col-lg-8">
                  <input
                    type="text"
                    name="mobile"
                    className="form-control form-control-lg form-control-solid"
                    placeholder="Enter Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6">
                  Profile Picture
                </label>
                <div className="col-lg-8">
                  <input
                    type="file"
                    name="profilePicture"
                    className="form-control form-control-lg form-control-solid"
                    onChange={handleFileChange}
                    accept="image/*"
                  />

                </div>
              </div>

              {/* Active Status */}
              {/* <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6">
                  Active
                </label>
                <div className="col-lg-8">
                  <input
                    type="checkbox"
                    name="is_active"
                    className="form-check-input"
                    checked={formData.is_active}
                    onChange={handleChange}
                  />
                </div>
              </div> */}

              {/* Submit Button */}
              <div className="row mb-12">
                <div className="col-lg-8 offset-lg-4">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : isEditMode ? "Update" : "Submit"}
                  </button>
                </div>
              </div>

              {isSuccess && (
                <AlertBox redirectUrl={null} close={closeAlert} type="success">
                  {successMsg}
                </AlertBox>
              )}
              {isFailed && (
                <AlertBox redirectUrl={null} close={closeAlert} type="error">
                  {errorMsg}
                </AlertBox>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUserDetail;