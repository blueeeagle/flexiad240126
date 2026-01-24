import { FC, useCallback, useEffect, useState } from "react";
import { getRequest, postRequest } from "../../modules/auth/core/_requests";
import { useParams } from "react-router-dom";

const CustomerTransactions: FC = () => {
  const [rowData, setRowData] = useState([]);


  const [customerData, setCustomerData] = useState<string | number>("-");
  const { customerId } = useParams();
  // const [countryList, setCountryList] = useState([]);
  const [countryList, setCountryList] = useState<any[]>([]);
  const [selectedCountryId, setSelectedCountryId] = useState("6566946881f360c33361e259");
  const [ispayin, setIspayin] = useState(true);
  const [type, setType] = useState("in")
  const getData = useCallback(async (countryId = "") => {
    try {
      const transactionData = getRequest(
        `/payment/walletBal/${customerId}/${countryId}`,
        ""
      );
      const countryData = postRequest(`/master/countries`, "");
      const typeChange = await postRequest(
        `/payment/transactions/${customerId}/${selectedCountryId}`,
        { type }
      );
      const lookupObj = [transactionData, countryData, typeChange];
      const results = await Promise.allSettled(lookupObj);

      const data1 = results.map((result) => {
        if (result.status === "fulfilled") {
          return result.value;
        } else {
          console.error(`Error in request: ${result.reason}`);
          return null;
        }
      });

      const rate = data1[0]?.data?.data?.[0]?.balance ?? "-";


      setCustomerData(typeof rate === "object" ? "-" : rate);

      const dataobj = {
        transactionData:
          data1[0]?.data?.status === "ok"
            ? data1[0]?.data?.data.length !== 0
              ? data1[0]?.data?.data[0].walletHistory
              : []
            : [],
        countryData:
          data1[1]?.data?.status === "ok" ? data1[1]?.data?.data : [],
      };
      // console.log(,"daa");

      setRowData(data1?.[2]?.data?.data || []);
      setCountryList(dataobj?.countryData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [customerId, selectedCountryId, type])

  useEffect(() => {
    getData(selectedCountryId);

  }, [customerId, getData, selectedCountryId]);

  const handleCountryChange = (value: string) => {
    setSelectedCountryId(value);
  };

  const handleTransaction = async (type: string) => {
    setType(type)

    if (type === "in") {

      setIspayin(true)
    }
    if (type === "out") {
      setIspayin(false)
    }
  };

  const countryCurrency = countryList?.find((conlist: any) => conlist._id === selectedCountryId)?.currencyId.currencyCode || "-";

  return (
    <>
      {/* <div className="w-full d-flex gap-5 ">
        {countryList?.map((curr: any, idx) => (
          <button
            key={idx}
            onClick={() => handleCountryChange(curr._id)}
            className={`btn border px-3 py-2 transition ${selectedCountryId === curr._id ? "btn-primary text-white" : "btn-light"}`}
          >
            {curr.name || "-"}
          </button>
        ))}
      </div> */}
      <div className="w-100 d-flex justify-content-end">
        <div style={{ minWidth: '200px' }} className="d-flex gap-3 align-items-center" >
          <label htmlFor="">Country:</label>
          <select
            className="form-select px-3 py-2"
            value={selectedCountryId}
            onChange={(e) => handleCountryChange(e.target.value)}
          >
            <option value="" disabled>Select a country</option>
            {countryList?.map((curr: any) => (
              <option key={curr._id} value={curr._id}>
                {curr.name || "-"}
              </option>
            ))}
          </select>
        </div>
      </div>


      <br />
      <div className="card mb-8">
        <div className="card-body bg-light-warning">
          <div className="d-flex align-items-center">
            <div className="col-md-10">
              <div className="flex-grow-1">
                <span className="text-muted fw-bold d-block">
                  {customerData} <span>{countryCurrency}</span>
                </span>
              </div>
            </div>
            <div className="col-md-2 d-flex gap-3">
              <button className="btn btn-sm fw-bold btn-primary" onClick={() => handleTransaction("in")}>
                PAY IN
              </button>
              <button className="btn btn-sm fw-bold btn-primary" onClick={() => handleTransaction("out")}>
                PAY OUT
              </button>
            </div>
          </div>
        </div>
      </div>
      <h3 className="card-title align-items-start flex-column mb-4">
        <span className="card-label fw-bold fs-3 mb-1">TRANSACTIONS</span>
      </h3>
      {rowData.length > 0 ? (
        <div className="table-responsive table table-bordered">
          <table className="table table-striped table-hover table-bordered align-left">
            <thead className="table text-center">
              <tr>

                {ispayin && <th className="px-3">Type</th>}
                <th className="px-3">Transaction ID</th>
                {!ispayin && <th className="px-3"> Payment Mode</th>}
                <th className="px-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {rowData.map((result: any, index) => (
                <tr key={index}>
                  {ispayin &&

                    <td className="text-center">{result.paymentType != null && result?.paymentType.includes("DEBIT") ? result.paymentMode : result?.paymentType}</td>
                  }
                  <td className="text-center">{result?.paymentId?.transactionId || result?.transactionId}</td>

                  {!ispayin && (
                    <td className="text-center">
                      {/* {result?.type === "order"
                        ? result?.orderId?.companyId?.companyName || "N/A"
                        : result?.paymentId?.paymentMode || "N/A"} */}
                      wallet
                    </td>
                  )}
                  <td className="text-center">
                    <span className="badge bg-warning text-dark py-2 fs-6 fw-bold">
                      {result?.paymentId?.amount || result?.amount} <span className="px-1">{countryCurrency}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-muted">No data available</p>
      )}
    </>
  );
};

export default CustomerTransactions;



