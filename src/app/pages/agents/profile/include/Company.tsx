/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { memo } from "react";
import { toAgentApiUrl } from "../../../../../_metronic/helpers";
import logo from "../../../../../../src/_metronic/assets/sass/components/logoimage/logo.png";
const Company = (props: any) => {
  return (
    <>
      <div className="row mb-12">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">
          Company Logo
        </label>

        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-12 fv-row">
              <img
                style={{ width: "100px", height: "100%" }}
                src={
                  props?.formik?.initialValues?.logo
                    ? `http://agentapi.flexiclean.me/${props.formik.initialValues.logo}`
                    : logo
                }
                alt="User Avatar"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = logo;
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row mb-12">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">
          Company Name
        </label>

        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-12 fv-row">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="Enter Company Name"
                {...props?.formik.getFieldProps("companyName")}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-12">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">
          Owner Name
        </label>

        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-12 fv-row">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="Enter Owner Name"
                {...props?.formik.getFieldProps("ownerName")}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-12">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">
          Do you have tax?
        </label>

        <div className="row col-lg-8">
          <div className="col-lg-4">
            <div className="form-check form-check-custom form-check-solid">
              <input
                className="form-check-input"
                type="radio"
                {...props?.formik.getFieldProps("haveTax")}
                checked={true}
                id="flexRadioDefault"
                disabled={true}
              />
              <label className="form-check-label">Yes</label>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="form-check form-check-custom form-check-solid">
              <input
                className="form-check-input"
                type="radio"
                {...props?.formik.getFieldProps("haveTax")}
                id="flexRadioDefault"
                disabled={true}
              />
              <label className="form-check-label">No</label>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-12">
        <label className="col-lg-4 col-form-label required fw-bold fs-6">
          Taxation Number
        </label>

        <div className="col-lg-8">
          <div className="row">
            <div className="col-lg-12 fv-row">
              <input
                type="text"
                className="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                placeholder="Enter Taxation Number"
                value="190938s"
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Company);
