import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
import { useLocation } from "react-router-dom";
import AlertBox from "../../../../common/AlertBox";


interface Banner {
  id: string;
  section: string;
  sortNo: string;
  language: string;
  imgUrl: string;
}

const BannerDetail: FC<{ bannerId?: string }> = ({ bannerId }) => {
  const [section, setSection] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [sortNo, setSortNo] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [companyId, setCompanyId] = useState<string>("");
  const [imgUrl, setImgUrl] = useState<string>("");
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  // Alert states
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isFailed, setIsFailed] = useState<boolean>(false);
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    const storedBanner = localStorage.getItem("selectedBanner");
  
    if (storedBanner) {
      const selectedBanner: Banner = JSON.parse(storedBanner);
      setSection(selectedBanner.section);
      setSortNo(selectedBanner.sortNo);
      setLanguage(selectedBanner.language === "ar" ? "ar" : "en"); // Explicitly check for "ar" or default to "en"
      setImgUrl(selectedBanner.imgUrl);
      setPreviewImage(selectedBanner.imgUrl);
    }
  }, []);
  useEffect(() => {
    if (location.pathname !== "/activities/banner/create") {
      const storedBanner = localStorage.getItem("selectedBanner");
      const storedImageUrl = localStorage.getItem("selectedImageUrl");

      if (storedBanner) {
        const selectedBanner: Banner = JSON.parse(storedBanner);
        setSection(selectedBanner.section);
        setSortNo(selectedBanner.sortNo);
        setLanguage(selectedBanner.language);
        setImgUrl(selectedBanner.imgUrl);
        setPreviewImage(selectedBanner.imgUrl);
      }

      if (storedImageUrl) {
        setPreviewImage(storedImageUrl);
      }
    }
  }, [companyId, location.pathname]);

  const handleSectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSection(e.target.value);
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSortNoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSortNo(e.target.value);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Log the selected language to verify it's being set correctly
    console.log("Selected language:", language);
  
    const formData = new FormData();
    const bodyData = {
      section,
      sortNo,
      language, // Ensure language is included here
    };
  
    formData.append("data", JSON.stringify(bodyData));
  
    if (image) {
      formData.append("imgUrl", image);
    }
  
    try {
      let response;
  
      if (companyId && companyId.length === 24) {
        response = await fetch(
          `https://adminapi.flexiclean.me/api/v1/activities/banner/${companyId}`,
          {
            method: "PATCH",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
      } else {
        response = await fetch(
          "https://adminapi.flexiclean.me/api/v1/activities/banner",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMsg(errorData.message || "Failed to save banner");
        setIsFailed(true);
        setIsSuccess(false);
        throw new Error(errorData.message || "Failed to save banner");
      }
  
      const data = await response.json();
      setSuccessMsg("Banner saved successfully.");
      setIsSuccess(true);
      setIsFailed(false);
      console.log("Banner saved successfully:", data);
    } catch (error: any) {
      console.error("Error saving banner:", error);
      setErrorMsg("Error saving banner: " + error.message);
      setIsFailed(true);
      setIsSuccess(false);
    }
  };
  

  const closeAlert = () => {
    setIsSuccess(false);
    setIsFailed(false);
  };

  const buttonText =
    companyId && companyId.length === 24 ? "Save Changes" : "Add";

  return (
    <>
      <PageTitle>{buttonText}</PageTitle>

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

      <div className="card">
        <div className="card-body">
          <form onSubmit={onSubmit}>
            {/* Rest of your form fields */}
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Choose Section
              </label>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <select
                      className="form-select form-select-solid form-select-lg fw-bold"
                      value={section}
                      onChange={handleSectionChange}
                    >
                      <option value="">Choose ..</option>
                      <option value="home">Home</option>
                      {/* Add more sections if needed */}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Language
              </label>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                  <select
          className="form-select form-select-solid form-select-lg fw-bold"
          value={language}
          onChange={handleLanguageChange}
        >
          <option value="en">English</option>
          <option value="ar">Arabic</option>
        </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                Preview Image
              </label>
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Selected Banner"
                  style={{ maxWidth: "150px", height: "150px" }}
                />
              )}
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Upload Image
              </label>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="file"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      onChange={handleImageChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Sort No
              </label>
              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="text"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Enter No"
                      value={sortNo}
                      onChange={handleSortNoChange}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-stack pt-15">
              <div className="mr-2">
                <button
                  type="button"
                  className="btn btn-lg btn-light-primary me-3"
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary"
                >
                  {buttonText} {/* Save Changes or Add */}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BannerDetail;
