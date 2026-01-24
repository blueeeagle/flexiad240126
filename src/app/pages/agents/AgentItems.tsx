import { FC, useState, useEffect } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { StatisticsWidget2 } from "../../../_metronic/partials/widgets";
import { getRequest } from "../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";
import Lottie from "lottie-react";
import loaderAnimation from "../../../_metronic/assets/sass/components/Animation - 1716715571159.json"; 

const AgentItems: FC = () => {
  const [rowData, setRowData] = useState([]);
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true); // State for loader
  const pageSize = 10;
  const { agentId } = useParams();

  const getData = async () => {
    setLoading(true); // Start loader before fetching
    const itemData = await getRequest(
      `/agent/items/${agentId}?pageIndex=${page}&pageSize=${pageSize}`,
      ``
    );

    const lookupObj = [itemData];
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
          itemData: d[0]?.data?.status === "ok" ? d[0]?.data?.data : [],
        };
        console.log("Fetched Data:", dataobj.itemData);
        setRowData(dataobj?.itemData);
        setTotal(dataobj?.itemData?.totalCount);
        setLoading(false); // Stop loader after fetching
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
      <PageTitle>ITEMS PRICING</PageTitle>
      <div className="row g-5 g-xl-8">
        <div className="row g-5 col-xl-12">
          {loading ? ( // Show loader while loading
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
                style={{ width: 150, height: 150 }}
              />
            </div>
          ) : rowData?.length > 0 ? (
            rowData.map((result: any) => {
              return (
                <div className="col-xl-3" key={result?._id}>
                  <StatisticsWidget2
                    className="card-xl-stretch mb-xl-8"
                    avatar={result?.productId?.productImageURL}
                    title={result?.productId?.productName}
                    description={result?.productId?.categoryId?.categoryName}
                    result={result}
                  />
                </div>
              );
            })
          ) : (
            <div>No Items Found</div>
          )}
        </div>
      </div>
    </>
  );
};

export default AgentItems;
