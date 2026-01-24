import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { KTSVG } from "../../../_metronic/helpers/components/KTSVG";
import { patchRequest, postRequest } from "../../modules/auth/core/_requests";
import AlertBox from "../../../common/AlertBox";

const validationSchema = Yup.object().shape({
  minOrderAmt: Yup.number().required("Min Order Amount is required"),
  isFreeDelivery: Yup.boolean().required("Delivery type is required"),
  // deliveryCharge: Yup.number().when('isFreeDelivery', {
  //     is: false,
  //     then: Yup.number().required('Delivery Charge is required'),
  //     otherwise: Yup.number(),
  // }),
});

interface InitialValues {
  minOrderAmt: string;
  isFreeDelivery: boolean;
  deliveryCharge: string;
  areaId: string;
  companyId: string;
  id: string;
}

interface LocationChargesModelProps {
  initialValues: InitialValues;
}

const LocationChargesModel: FC<LocationChargesModelProps> = ({
  initialValues,
}) => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [formData, setFormData] = useState(initialValues);

  useEffect(() => {
    setFormData(initialValues);
  }, [initialValues]);

  const closeAlert = () => {
    setIsSuccess(false);
    setIsFailed(false);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const reqBody = {
        companyId: values.companyId,
        areaId: values.areaId,
        minOrderAmt: values.minOrderAmt,
        isFreeDelivery: values.isFreeDelivery,
        deliveryCharge: values.deliveryCharge,
        id: values.id,
      };

      try {
        const response = await patchRequest(
          `/agent/location/${values.id}`,
          reqBody
        );
        if (response?.data?.status === "ok") {
          setIsSuccess(true);
          setSuccessMsg("Location updated successfully");
        } else {
          setIsFailed(true);
          setErrorMsg("Something went wrong");
        }
      } catch (error) {
        setIsFailed(true);
        setErrorMsg("Something went wrong");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="modal fade" tabIndex={-1} id="kt_modal_1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              Area 1 <br />
            </h5>
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
          <form onSubmit={formik.handleSubmit}>
            <div className="modal-body">
              <h3 className="modal-title mb-4">Update Charges</h3>
              <div className="row">
                <label className="col-lg-12 col-form-label required fs-6">
                  Min Order Amount
                </label>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="number"
                        className={`form-control form-control-lg form-control-solid mb-3 mb-lg-0 ${
                          formik.touched.minOrderAmt &&
                          formik.errors.minOrderAmt
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter Amount"
                        {...formik.getFieldProps("minOrderAmt")}
                      />
                      {formik.touched.minOrderAmt &&
                      formik.errors.minOrderAmt ? (
                        <div className="invalid-feedback">
                          {formik.errors.minOrderAmt}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <label className="col-lg-12 col-form-label required fw-bold fs-6">
                  Type
                </label>
                <div className="row col-lg-12">
                  <div className="col-lg-6">
                    <div className="form-check form-check-custom form-check-solid">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="true"
                        id="flexRadioFree"
                        checked={formik.values.isFreeDelivery === true}
                        onChange={() =>
                          formik.setFieldValue("isFreeDelivery", true)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioFree"
                      >
                        Free
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-check form-check-custom form-check-solid">
                      <input
                        className="form-check-input"
                        type="radio"
                        value="false"
                        id="flexRadioPaid"
                        checked={formik.values.isFreeDelivery === false}
                        onChange={() =>
                          formik.setFieldValue("isFreeDelivery", false)
                        }
                      />
                      <label
                        className="form-check-label"
                        htmlFor="flexRadioPaid"
                      >
                        Paid
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <label className="col-lg-12 col-form-label required fs-6">
                  Delivery Charges
                </label>
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 fv-row">
                      <input
                        type="number"
                        className={`form-control form-control-lg form-control-solid mb-3 mb-lg-0 ${
                          formik.touched.deliveryCharge &&
                          formik.errors.deliveryCharge
                            ? "is-invalid"
                            : ""
                        }`}
                        placeholder="Enter Amount"
                        {...formik.getFieldProps("deliveryCharge")}
                        disabled={formik.values.isFreeDelivery}
                      />
                      {formik.touched.deliveryCharge &&
                      formik.errors.deliveryCharge ? (
                        <div className="invalid-feedback">
                          {formik.errors.deliveryCharge}
                        </div>
                      ) : null}
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
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
      {isSuccess && (
        <AlertBox
          redirectUrl={`/agent/${initialValues?.id}/locationCharges`}
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
    </div>
  );
};

export default LocationChargesModel;
