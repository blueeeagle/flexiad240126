import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";

import AlertBox from "../../../../common/AlertBox";
import Lottie from "lottie-react";
import loaderAnimation from "../../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

const NewTax: FC = () => {
  const [loading, setLoading] = useState(false);
  const [loadingGetData, setLoadingGetData] = useState(false);
  const [errorMsg, setErrorMsg] = useState(``);
  const [isFailed, setIsFailed] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState(``);
  const [companyId, setCompanyId] = useState();

  const [formData, setFormData] = useState();
  const closeAlert = () => {
    if (isSuccess) setIsSuccess(false);
    if (isFailed) setIsFailed(false);
  };




  return (
    <>
      <PageTitle>RATE SETTINGS</PageTitle>
      {loadingGetData ? (
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
      <div className="row g-5 g-xl-8">
        <div className="card">
          <div className="card-body py-3">
            <form >
              <h3>Commission Settings</h3>

             

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6">
               
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                    
                        placeholder="Enter Value"
                      />
                    
                    </div>
                  </div>
                </div>
              </div>

              <h3>Payout Settings</h3>

              <div className="row mb-12">
                <label className="col-lg-4 col-form-label fw-bold fs-6">
                  Minimum Payout Amount
                </label>

                <div className="col-lg-8">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="text"
                        
                        placeholder="Enter Value"
                      />
                   
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-footer d-flex justify-content-end py-6 px-9 gap-5">
                <button
                  type="button"
                  className="btn btn-secondary"
               
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
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
            </form>
          </div>
        </div>
      </div>
    )}
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

export default NewTax;
// import React from 'react'

// export default function NewTax() {
//   return (
//     <div>NewTax</div>
//   )
// }
