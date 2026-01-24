import { FC, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { getRequest } from "../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json";

const CustomerPreferences: FC = () => {
  const initVal = {
    softener: false,
    perfume: true,
    ironType: "",
    clothReturn: "",
    starchLevel: "",
  };

  const [initialValue, setInitialValue] = useState(initVal);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const pageSize = 10;
  const { customerId } = useParams();
  const [loading, setLoading] = useState(true);

  const getPreference = async () => {
    try {
      setLoading(true); // Show loader
      const reviewList = await getRequest(`/customer/washingPref/${customerId}`, ``);
  
      const lookupObj = [reviewList];
      let data1: Array<any> = [];
  
      await Promise.allSettled(lookupObj).then((result) => {
        result.forEach((res: any) => {
          data1.push(res.value);
        });
      });
  
      const dataobj = {
        getData: data1[0]?.data?.status === "ok" ? data1[0]?.data : [],
      };
  
      let values = {
        ...dataobj?.getData?.data,
        // Handle the typo in API response
        starchLevel: dataobj?.getData?.data?.starchLevel || dataobj?.getData?.data?.strachLevel || "none",
      };
  
      setInitialValue(values);
      setTotal(dataobj?.getData?.totalCount);
    } catch (error) {
      console.error("Error fetching preferences:", error);
    } finally {
      setLoading(false); // Hide loader
    }
  };
  
  useEffect(() => {
    async function fetchData() {
      await getPreference();
    }
    fetchData();
  }, [page]);

  return (
    <>
      <PageTitle>PREFERENCES</PageTitle>
      {loading ? (
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
        <>
          <h3 className="card-title align-items-start flex-column mb-4">
            <span className="card-label fw-bold fs-3 mb-1">Detergents</span>
          </h3>

          <div className="row mb-8" style={{ borderBottom: "1px solid #000" }}>
            <div className="d-flex align-items-center">
              <div className="col-md-10">
                <div className="flex-grow-1">
                  <span className="text-muted fw-bold d-block">Softener</span>
                  <span className="text-muted fw-semibold d-block">
                    Can we use softener
                  </span>
                </div>
              </div>

              <div className="col-md-2">
                <div className="flex-grow-1">
                  <div className="form-check form-switch form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={initialValue?.softener === true}
                      id="flexSwitchDefault"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-8" style={{ borderBottom: "1px solid #000" }}>
            <div className="d-flex align-items-center">
              <div className="col-md-10">
                <div className="flex-grow-1">
                  <span className="text-muted fw-bold d-block">Perfume</span>
                  <span className="text-muted fw-semibold d-block">
                    Can we add perfume to clothes
                  </span>
                </div>
              </div>

              <div className="col-md-2">
                <div className="flex-grow-1">
                  <div className="form-check form-switch form-check-custom form-check-solid">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={initialValue?.perfume === true}
                      id="flexSwitchDefault"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-8" style={{ borderBottom: "1px solid #000" }}>
            <div className="d-flex align-items-center">
              <div className="col-md-12">
                <div className="flex-grow-1">
                  <span className="text-muted fw-bold d-block">
                    Iron Type
                  </span>
                </div>
                <div className="d-flex flex-wrap">
                  {initialValue?.ironType?.toLowerCase() === "none" && (
                    <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fw-bolder">NONE</div>
                      </div>
                    </div>
                  )}

                  {initialValue?.ironType?.toLowerCase() === "triangle" && (
                    <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fw-bolder">TRIANGLE</div>
                      </div>
                    </div>
                  )}
                  {initialValue?.ironType?.toLowerCase() === "square" && (
                    <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fw-bolder">SQUARE</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-8" style={{ borderBottom: "1px solid #000" }}>
            <div className="d-flex align-items-center">
              <div className="col-md-12">
                <div className="flex-grow-1">
                  <span className="text-muted fw-bold d-block">
                    Starch Level
                  </span>
                </div>
                <div className="d-flex flex-wrap">
                  {initialValue?.starchLevel?.toLowerCase() === "none" && (
                    <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fw-bolder">NONE</div>
                      </div>
                    </div>
                  )}
                  {initialValue?.starchLevel?.toLowerCase() === "light" && (
                    <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fw-bolder">LIGHT</div>
                      </div>
                    </div>
                  )}
                  {initialValue?.starchLevel?.toLowerCase() === "medium" && (
                    <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fw-bolder">MEDIUM</div>
                      </div>
                    </div>
                  )}
                  {initialValue?.starchLevel?.toLowerCase() === "high" && (
                    <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fw-bolder">HIGH</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row mb-8" style={{ borderBottom: "1px solid #000" }}>
            <div className="d-flex align-items-center">
              <div className="col-md-12">
                <div className="flex-grow-1">
                  <span className="text-muted fw-bold d-block">
                    Clothes Returned
                  </span>
                </div>
                <div className="d-flex flex-wrap">
                  {initialValue?.clothReturn?.toLowerCase() === "hanger" && (
                    <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fw-bolder">HANGER</div>
                      </div>
                    </div>
                  )}

                  {initialValue?.clothReturn?.toLowerCase() === "folded" && (
                    <div className="border border-gray-300 border-dashed rounded py-3 px-4 me-6 mb-3">
                      <div className="d-flex align-items-center">
                        <div className="fw-bolder">FOLDED</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CustomerPreferences;
