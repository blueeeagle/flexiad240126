import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { KTSVG } from "../../../_metronic/helpers/components/KTSVG";
import { patchRequest } from "../../modules/auth/core/_requests";
import AlertBox from "../../../common/AlertBox";
import { toApiUrl } from "../../../_metronic/helpers";

const validationSchema = Yup.object().shape({
  minOrderAmt: Yup.number().required("Min Order Amount is required"),
  isFreeDelivery: Yup.boolean().required("Delivery type is required"),
});

interface InitialValues {
  minOrderAmt: string;
  isFreeDelivery: boolean;
  deliveryCharge: string;
  priceList: any[];
  companyId: string;
  _id: string;
  product_image: string;
  product_name: string;
  productId: string;
}

interface AgentItemModelProps {
  initialValuesDetails: InitialValues;
  closeModal: () => void; // Add closeModal prop
}

const AgentItemModel: FC<AgentItemModelProps> = ({ initialValuesDetails, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isFailed, setIsFailed] = useState(false);
  const [formData, setFormData] = useState<InitialValues>(initialValuesDetails);
  const [serviceList, setServiceList] = useState(initialValuesDetails.priceList);
  const [chargeType, setChargeType] = useState("normal");

  useEffect(() => {
    setFormData(initialValuesDetails);
    setServiceList(initialValuesDetails.priceList ?? []);
  }, [initialValuesDetails]);

  const closeAlert = () => {
    setIsSuccess(false);
    setIsFailed(false);
  };

  const handleAmountChange = (id: any, value: string, type: string, chargeName: any) => {
    const updatedList = serviceList.map((service) =>
      type === service.chargeType && chargeName === service.chargeId.chargeName
        ? { ...service, amount: value }
        : service
    );
    setServiceList(updatedList);
    setFormData({ ...formData, priceList: updatedList });
  };

  const handleActiveChange = (id: any, value: boolean, type: string, chargeName: any) => {
    const updatedList = serviceList.map((service) =>
      type === service.chargeType && chargeName === service.chargeId.chargeName
        ? { ...service, is_active: value }
        : service
    );
    setServiceList(updatedList);
    setFormData({ ...formData, priceList: updatedList });
  };

  const handleSave = async () => {
    const reqBody = {
      companyId: initialValuesDetails.companyId,
      priceList: serviceList,
      product_id: initialValuesDetails.productId,
    };
    try {
      const response = await patchRequest(`/agent/location/${initialValuesDetails._id}`, reqBody);
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
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formData,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      const reqBody = {
        companyId: values.companyId,
        priceList: values.priceList,
        _id: values._id,
      };
      // Perform the save operation here
    },
  });

  let filteredServices = serviceList.filter((service) => service.chargeType === chargeType);

  return (
    <div
      key={initialValuesDetails._id}
      className="modal fade show"
      tabIndex={-1}
      style={{ display: 'block' }} // Ensure the modal displays
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update Product</h5>
            <div
              className="btn btn-icon btn-sm btn-primary ms-2"
              onClick={closeModal} // Call closeModal here
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
              <h3 className="modal-title mb-4">Product Info</h3>
              <div className="col-md-4 mb-4">
  <div className="card shadow-sm text-center p-3">
    <div className="d-flex justify-content-center align-items-center mb-3">
      <img
        src={`https://adminapi.flexiclean.me/${formData?.product_image}`}
        alt="Product"
        style={{ height: "90px", objectFit: "contain" }}
        className="img-fluid"
      />
    </div>
    <h6 className="fw-semibold text-dark">{formData?.product_name}</h6>
  </div>
</div>

              <h5 className="modal-title mb-4">Charge Type</h5>
              <div className="btn-group mb-4" role="group" aria-label="Basic example">
                <button
                  type="button"
                  className={`btn ${chargeType === "normal" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setChargeType("normal")}
                >
                  Normal
                </button>
                <button
                  type="button"
                  className={`btn ${chargeType === "urgent" ? "btn-primary" : "btn-outline-primary"}`}
                  onClick={() => setChargeType("urgent")}
                >
                  Urgent
                </button>
              </div>
              <h5 className="modal-title mb-4">Price Info</h5>
                <div>
                {filteredServices.map((service: any, index: number) => (
                  <div
                    key={index}
                    className="form-group d-flex align-items-center justify-content-between m-2"
                  >
                    <div className="d-flex align-items-center">
                      <div
                        className="product-image me-2 d-flex align-items-center justify-content-between gap-10"
                        style={{ height: "35px", width: "35px" }}
                      >
                        <img
                          src={`https://adminapi.flexiclean.me/${(service.chargeId?.imgURL)}`}
                          style={{ height: "35px", width: "35px" }}
                          alt={
                            service.chargeId.chargeName ||
                            "Charge not available"
                          }
                        />
                        <div className="text-nowrap">
                          <span
                            className="font-bold"
                            style={{ fontWeight: "bold" }}
                          >
                            {service.chargeId.chargeName ||
                              "Charge not available"}
                          </span>
                        </div>
                      </div>
                      <h6
                        className="align-self-center mb-0"
                        style={{ minWidth: "150px" }}
                      >
                        {service.name}
                      </h6>
                      <div className="d-flex position-relative">
                        <input
                          type="text"
                          placeholder="amount"
                          className="form-control form-control-lg"
                          style={{ width: "150px" }}
                          value={service.amount}
                          onChange={(e) =>
                            handleAmountChange(
                              service.id,
                              e.target.value,
                              chargeType,
                              service.chargeId.chargeName
                            )
                          }
                        />
                        <span
                          className="d-flex align-items-center fw-500 me-2 position-absolute end-0"
                          style={{ top: 0, bottom: 0 }}
                        >
                          INR
                        </span>
                      </div>
                    </div>

                    <div className="form-check form-switch ps-0">
                      <input
                        type="checkbox"
                        role="switch"
                        className="form-check-input ms-0"
                        checked={service.is_active}
                        onChange={(e) =>
                          handleActiveChange(
                            service.id,
                            e.target.checked,
                            chargeType,
                            service.chargeId.chargeName
                          )
                        }
                      />
                    </div>
                  </div>
                ))}
              </div>
           
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={closeModal}>
                Close
              </button>
              <button type="submit" className="btn btn-primary" onClick={handleSave} disabled={loading}>
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AgentItemModel;
