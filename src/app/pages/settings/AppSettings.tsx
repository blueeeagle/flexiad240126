// import { FC, useState } from "react";
// import { PageTitle } from "../../../_metronic/layout/core";

// const AppSettings: FC = () => {
//   const [loading, setLoading] = useState(false);

//   return (
//     <>
//       <PageTitle>APP SETTINGS</PageTitle>

//       <div className="row g-5 g-xl-8">
//         <div className="card">
//           <div className="card-body py-3">
//             <div className="row mb-12">
//               <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                 Base Currency
//               </label>

//               <div className="col-lg-8">
//                 <div className="row">
//                   <div className="col-lg-9 fv-row">
//                     <select
//                       value={`BHD`}
//                       className="form-select form-select-solid form-select-lg fw-bold"
//                     >
//                       <option value="">Select Currency...</option>
//                       <option value="BHD">BHD</option>
//                       <option value="Dinar">Dinar</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="row mb-12">
//               <label className="col-lg-4 col-form-label required fw-bold fs-6">
//                 TimeZone
//               </label>

//               <div className="col-lg-8">
//                 <div className="row">
//                   <div className="col-lg-9 fv-row">
//                     <select
//                       value={`GMT +4, the UAE`}
//                       className="form-select form-select-solid form-select-lg fw-bold"
//                     >
//                       <option value="">Select TimeZone...</option>
//                       <option value="GMT +3, Bahrain">GMT +3, Bahrain</option>
//                       <option value="GMT +4, the UAE">GMT +4, the UAE</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="row mb-12">
//               <label className="col-lg-4 col-form-label fw-bold fs-6">
//                 Date Format
//               </label>

//               <div className="col-lg-8">
//                 <div className="row">
//                   <div className="col-lg-12 fv-row">
//                     <input
//                       type="date"
//                       className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
//                       placeholder="Choose"
//                       value="12-05-2023"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>

            // <div className="row mb-12">
            //   <label className="col-lg-4 col-form-label fw-bold fs-6">
            //     Logo (For Login Page)
            //   </label>

            //   <div className="col-lg-8">
            //     <div className="row">
            //       <div className="col-lg-12 fv-row">
            //         <input
            //           type="file"
            //           className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
            //           placeholder="Choose"
            //         />
            //       </div>
            //     </div>
            //   </div>
            // </div>

            // <div className="row mb-12">
            //   <label className="col-lg-4 col-form-label fw-bold fs-6">
            //     Logo (For Header)
            //   </label>

            //   <div className="col-lg-8">
            //     <div className="row">
            //       <div className="col-lg-12 fv-row">
            //         <input
            //           type="file"
            //           className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
            //           placeholder="Choose"
            //         />
            //       </div>
            //     </div>
            //   </div>
            // </div>

            // <div className="row mb-12">
            //   <label className="col-lg-4 col-form-label fw-bold fs-6">
            //     Logo (For Mails)
            //   </label>

            //   <div className="col-lg-8">
            //     <div className="row">
            //       <div className="col-lg-12 fv-row">
            //         <input
            //           type="file"
            //           className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
            //           placeholder="Choose"
            //         />
            //       </div>
            //     </div>
            //   </div>
            // </div>

//             <div className="card-footer d-flex justify-content-end py-6 px-9">
//               <button className="btn btn-secondary">Cancel</button>

//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 disabled={loading}
//               >
//                 {!loading && "Submit"}
//                 {loading && (
//                   <span
//                     className="indicator-progress"
//                     style={{ display: "block" }}
//                   >
//                     Please wait...{" "}
//                     <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AppSettings;
import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../_metronic/layout/core";

const AppSettings: FC = () => {
  const [loading, setLoading] = useState(false);
  const [defaultCurrencyId, setDefaultCurrencyId] = useState("657a6234759f5193012ebccd");
  const [timeZone, setTimeZone] = useState("(GMT+3)");
  const [dateFormat, setDateFormat] = useState("");
  const [companyId, setCompanyId] = useState<string | null>(null);


  useEffect(() => {
    const storedCompanyId = localStorage.getItem("companyId");
    if (storedCompanyId) {
      setCompanyId(storedCompanyId);
    }
  }, []);
  const handleSubmit = async () => {
    if (!companyId) {
      alert("Company ID not found in local storage.");
      return;
    }
  
    const token = localStorage.getItem("token"); 
  
    if (!token) {
      alert("Token not found. Please log in.");
      return;
    }
  
    setLoading(true);
    
    const requestBody = {
        defaultCurrencyId,
      timeZone,
      dateFormat: dateFormat.replace(/-/g, "-"),
    };
  
    try {
      const response = await fetch(`https://adminapi.flexiclean.me/api/v1/settings/app/${companyId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`, // Add Bearer token to headers
        },
        body: JSON.stringify(requestBody),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Settings updated successfully!");
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      alert("Failed to update settings.");
    } finally {
      setLoading(false);
    }
  };
  


  return (
    <>
      <PageTitle>APP SETTINGS</PageTitle>
      <div className="row g-5 g-xl-8">
        <div className="card">
          <div className="card-body py-3">
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                Base Currency
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-9 fv-row">
                    <select
                      value={defaultCurrencyId}
                      onChange={(e) => setDefaultCurrencyId(e.target.value)}
                      className="form-select form-select-solid form-select-lg fw-bold"
                    >
                      <option value="">Select Currency...</option>
                      <option value="657a6234759f5193012ebccd">BHD</option>
                      <option value="other_currency_id">Dinar</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label required fw-bold fs-6">
                TimeZone
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-9 fv-row">
                    <select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                      className="form-select form-select-solid form-select-lg fw-bold"
                    >
                      <option value="">Select TimeZone...</option>
                      <option value="(GMT+3)">GMT +3, Bahrain</option>
                      <option value="(GMT+4)">GMT +4, the UAE</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                Date Format
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-9 fv-row">
                    <input
                      type="date"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="row mb-12">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                Logo (For Login Page)
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="file"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Choose"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                Logo (For Header)
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="file"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Choose"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row mb-12">
              <label className="col-lg-4 col-form-label fw-bold fs-6">
                Logo (For Mails)
              </label>

              <div className="col-lg-8">
                <div className="row">
                  <div className="col-lg-12 fv-row">
                    <input
                      type="file"
                      className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                      placeholder="Choose"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer d-flex justify-content-end py-6 px-9 gap-5">
              <button className="btn btn-secondary">Cancel</button>

              <button
                type="submit"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={loading}
              >
                {!loading && "Submit"}
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
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSettings;
