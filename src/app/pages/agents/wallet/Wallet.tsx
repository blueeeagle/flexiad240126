// // import { FC, useEffect, useState } from 'react';
// // import { PageTitle } from '../../../../_metronic/layout/core';
// // import { KTSVG } from '../../../../_metronic/helpers';
// // import { useParams } from 'react-router-dom';
// // import { getRequest, postRequest } from '../../../modules/auth/core/_requests';
// // import { stringToDate } from '../../../../common/Date';

// // const AgentWallet: FC = () => {

// //     const [rowData, setRowData] = useState([]);
// //     const { customerId } = useParams();
// //     const getData = async (countryId = '') => {
// //         try {
// //             const transactionData = await postRequest(`/activities/orders?pageSize=10&pageIndex=0&fromDate&toDate`, '');

// //             const lookupObj = [transactionData];

// //             if (transactionData?.data?.status === 'ok') {
// //                 setRowData(transactionData?.data?.data?.data);
// //             }
// //         } catch (error) {
// //             console.error('Error fetching data:', error);
// //         }
// //     };

// //     useEffect(() => {
// //         async function fetchData() {
// //             await getData();
// //         }
// //         fetchData();
// //     }, [customerId]); // Fetch data when page changes

// //     const handleCounty = (value: any) => {
// //         getData(value);
// //     }
// //     return (
// //         <>
// //             <PageTitle>WALLET & PAYOUT</PageTitle>
// //             <h3 className='card-title align-items-start flex-column mb-4'>
// //                 <span className='card-label fw-bold fs-3 mb-1'>Wallet</span>
// //             </h3>

// //             <div className='card mb-8'>

// //                 <div className='card-body bg-light-warning'>
// //                     <div className='d-flex align-items-center'>
// //                         <div className='col-md-8'>
// //                             <div className='flex-grow-1'>
// //                                 <span className='text-muted fw-bold d-block'>1089</span>
// //                                 <span className='text-muted fw-semibold d-block'>BHD</span>
// //                             </div>
// //                         </div>

// //                         <div className='col-md-2'>
// //                             <div className='flex-grow-1'>
// //                                 <span className='text-muted fw-bold d-block'>Bank Details</span>
// //                                 <span className='text-muted fw-semibold d-block'>No bank details</span>
// //                             </div>
// //                         </div>

// //                         <div className='col-md-2'>
// //                             <button data-bs-toggle="modal" data-bs-target="#kt_modal_1" className='btn btn-sm fw-bold btn-primary'>Add/Update</button>
// //                             <span data-bs-toggle="modal" data-bs-target="#kt_modal_2" className='badge badge-warning fs-8 fw-bold'>Verification Pending</span>

// //                         </div>

// //                     </div>
// //                 </div>
// //             </div>

// //             <h3 className='card-title align-items-start flex-column mb-4'>
// //                 <span className='card-label fw-bold fs-3 mb-1'>TRANSACTIONS</span>

// //             </h3>

// //             <div className='card'>
// //                 <div className='card-body py-3'>
// //                     <div className='table-responsive'>
// //                         <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
// //                             <thead>
// //                                 <tr className='fw-bold text-muted'>
// //                                     <th className='min-w-100px'>Date</th>
// //                                     <th className='min-w-200px'>Order ID</th>
// //                                     <th className='min-w-100px'>Customer Name</th>
// //                                     <th className='min-w-100px'>Mobile Number</th>
// //                                     <th className='min-w-150px'>Type</th>
// //                                     <th className='min-w-150px'>Method</th>
// //                                     <th className='min-w-100px'>Amount</th>
// //                                     <th className='min-w-100px'>Charges</th>
// //                                     <th className='min-w-100px'>Total</th>
// //                                     <th className='min-w-100px'>Discount</th>
// //                                     <th className='min-w-100px'>Final</th>
// //                                     <th className='min-w-100px'>Platform Commission</th>
// //                                     <th className='min-w-100px'>Wallet In</th>
// //                                 </tr>
// //                             </thead>
// //                             <tbody>
// //                                 {
// //                                     rowData?.length > 0 ? rowData.map((result: any) => (
// //                                         <tr>
// //                                             <td>{stringToDate(result?.orderDate)}</td>
// //                                             <td>{result?.orderNo}</td>
// //                                             <td>{result?.customerId?.firstName}</td>
// //                                             <td>{result?.customerId?.mobile}</td>
// //                                             <td>{result?.orderMode}</td>
// //                                             <td>POS</td>
// //                                             <td>{result?.grossAmt}</td>
// //                                             <td>-1</td>
// //                                             <td>-2</td>
// //                                             <td>{result?.discAmt}</td>
// //                                             <td>{result?.netAmt}</td>
// //                                             {/* <td>{result?.subscribeComm?.type == 'percentage'  ?  result?.subscribeComm?.value + `%`  : result?.subscribeComm?.value                                          }</td> */}
// //                                             <td>{result?.commissionAmount}</td>
// //                                             <td>{result?.payoutAmt}</td>
// //                                         </tr>
// //                                     )) : <span> No data found</span>}
// //                             </tbody>
// //                         </table>
// //                     </div>
// //                 </div>

// //             </div>

// //             <div className="modal fade" tabIndex={-1} id="kt_modal_1">
// //                 <div className="modal-dialog">
// //                     <div className="modal-content">
// //                         <div className="modal-header">
// //                             <h5 className="modal-title">BANK ACCOUNT DETAILS INFO</h5>

// //                             <div
// //                                 className="btn btn-icon btn-sm btn-primary ms-2"
// //                                 data-bs-dismiss="modal"
// //                                 aria-label="Close"
// //                             >
// //                                 <KTSVG
// //                                     path="media/icons/duotune/arrows/arr061.svg"
// //                                     className="svg-icon svg-icon-2x"
// //                                 />
// //                             </div>
// //                         </div>
// //                         <div className="modal-body">

// //                             <div className='row '>
// //                                 <label className='col-lg-12 col-form-label required fs-6'>Bank Account Number</label>

// //                                 <div className='col-lg-12'>
// //                                     <div className='row'>
// //                                         <div className='col-lg-12 fv-row'>
// //                                             <input
// //                                                 type='text'
// //                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
// //                                                 placeholder='Enter Account Number'
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className='row '>
// //                                 <label className='col-lg-12 col-form-label required fw-bold fs-6'>Account Holder Name</label>

// //                                 <div className='col-lg-12'>
// //                                     <div className='row'>
// //                                         <div className='col-lg-12 fv-row'>
// //                                             <input
// //                                                 type='text'
// //                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
// //                                                 placeholder='Enter Account Holder Name'
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className='row '>
// //                                 <label className='col-lg-12 col-form-label required fs-6'>Bank Name</label>

// //                                 <div className='col-lg-12'>
// //                                     <div className='row'>
// //                                         <div className='col-lg-12 fv-row'>
// //                                             <input
// //                                                 type='text'
// //                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
// //                                                 placeholder='Enter Bank Name'
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className='row '>
// //                                 <label className='col-lg-12 col-form-label required fs-6'>Branch Name</label>

// //                                 <div className='col-lg-12'>
// //                                     <div className='row'>
// //                                         <div className='col-lg-12 fv-row'>
// //                                             <input
// //                                                 type='text'
// //                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
// //                                                 placeholder='Enter Branch Name'
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className='row '>
// //                                 <label className='col-lg-12 col-form-label required fs-6'>Code</label>

// //                                 <div className='col-lg-12'>
// //                                     <div className='row'>
// //                                         <div className='col-lg-12 fv-row'>
// //                                             <input
// //                                                 type='text'
// //                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
// //                                                 placeholder='Enter Code'
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>
// //                         </div>

// //                         <div className="modal-footer">
// //                             <button
// //                                 type="button"
// //                                 className="btn btn-light"
// //                                 data-bs-dismiss="modal"
// //                             >
// //                                 Discard
// //                             </button>
// //                             <button type="button" className="btn btn-primary">
// //                                 Save
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>

// //             <div className="modal fade" tabIndex={-1} id="kt_modal_2">
// //                 <div className="modal-dialog">
// //                     <div className="modal-content">
// //                         <div className="modal-header">
// //                             <h5 className="modal-title">ACCOUNT VERIFICATION</h5>

// //                             <div
// //                                 className="btn btn-icon btn-sm btn-primary ms-2"
// //                                 data-bs-dismiss="modal"
// //                                 aria-label="Close"
// //                             >
// //                                 <KTSVG
// //                                     path="media/icons/duotune/arrows/arr061.svg"
// //                                     className="svg-icon svg-icon-2x"
// //                                 />
// //                             </div>
// //                         </div>
// //                         <div className="modal-body">

// //                             <div className='row '>
// //                                 <label className='col-lg-12 col-form-label required fs-6'>Enter Amount</label>

// //                                 <div className='col-lg-12'>
// //                                     <div className='row'>
// //                                         <div className='col-lg-12 fv-row'>
// //                                             <input
// //                                                 type='text'
// //                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
// //                                                 placeholder='Enter Amount'
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className='row '>
// //                                 <label className='col-lg-12 col-form-label required fw-bold fs-6'>Transaction Date</label>

// //                                 <div className='col-lg-12'>
// //                                     <div className='row'>
// //                                         <div className='col-lg-12 fv-row'>
// //                                             <input
// //                                                 type='date'
// //                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
// //                                                 placeholder='Enter Date'
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                             <div className='row '>
// //                                 <label className='col-lg-12 col-form-label required fs-6'>Transaction ID</label>

// //                                 <div className='col-lg-12'>
// //                                     <div className='row'>
// //                                         <div className='col-lg-12 fv-row'>
// //                                             <input
// //                                                 type='text'
// //                                                 className='form-control form-control-lg form-control-solid mb-3 mb-lg-0'
// //                                                 placeholder='Transaction ID'
// //                                             />
// //                                         </div>
// //                                     </div>
// //                                 </div>
// //                             </div>

// //                         </div>

// //                         <div className="modal-footer">
// //                             <button
// //                                 type="button"
// //                                 className="btn btn-light"
// //                                 data-bs-dismiss="modal"
// //                             >
// //                                 Discard
// //                             </button>
// //                             <button type="button" className="btn btn-primary">
// //                                 Save
// //                             </button>
// //                         </div>
// //                     </div>
// //                 </div>
// //             </div>
// //         </>
// //     )
// // }

// // export default AgentWallet;
// /* eslint-disable @typescript-eslint/no-explicit-any */

import { FC, useState, useEffect, useCallback } from "react";
import { PageTitle } from "../../../../_metronic/layout/core";
// import { KTSVG } from "../../../../_metronic/helpers";
import "../../../../../src/_metronic/assets/sass/components/Wallet.scss";
import { message } from "antd";
import { Row, Col, Nav, Tab, Button, } from "react-bootstrap";
import TransactionsTable from "./TransactionsTable";
import PayoutTable from "./PayoutTable";
import { useParams } from "react-router-dom";
import VerifyPendingModal from "./VerifyPendingModal";
import BankDetailsModal from "./BankDetailsModal";
import {
  // fetchOrders,
  saveBankDetail,
  savePendingData,
} from "../../../modules/auth/core/_requests";
import { JSX } from "react/jsx-runtime";
// import { json } from "stream/consumers";

interface BankDetails {
  acNo: string;
  acName: string;
  bank: string;
  branch: string;
  code: string;
  created_at: string;
  isVerified: boolean;
  updated_at: string;
  _id: string;
}
interface VerifyDeatils {
  amount: string;
  date: string,
  transactionId: string
}
// interface Order {
//   _id: string;
//   companyName: string;
//   companyLogo: string;
//   customerName: string;
//   customerEmail: string;
//   customerGender: string;
//   customerMobile: string;
//   mobile: number;
//   orderDate: string;
//   orderMode: string;
//   grossAmt: number;
//   netAmt: number;
//   payoutAmt: number;
//   discAmt: number;
//   addressStreet: string;
//   addressBlock: string | null;
//   addressBuilding: string | null;
//   addressCity: string;
//   addressArea: string;
//   addressCountry: string;
//   addressState: string;
//   addressZipcode: string;
//   agentName: string;
//   commissionAmount: number; // Added commission amount
// }
interface CurrencyId {
  _id: string;
  currency: string;
  currencySymbol: string;
  currencyCode: string;
  centValue: number;
  decimalPoints: number;
}

interface WalletData {
  _id: string;
  companyId: string;
  balance: number;
  currencyId: CurrencyId;
  bankDetails: string;
}

interface ApiResponse {
  status: string;
  data: WalletData[];
  totalCount: number;
}
const AgentWallet: FC = () => {
  // const location = useLocation();
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [acNo, setAcNo] = useState<string>("");


  const [acName, setAcName] = useState<string>("");
  const [bank, setBank] = useState<string>("");
  const [branch, setBranch] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [lastAcNo, setLastAcNo] = useState<string>("");
  const [hasBankDetails, setHasBankDetails] = useState<boolean>(false);
  const [bankDetailId, setBankDetailId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [bankDetails, setBankDetails] = useState<BankDetails | null>(null);
  const [verifyDetails, setVerifyDeatils] = useState<VerifyDeatils | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [transactionDate, setTransactionDate] = useState<string>("");
  const [transactionId, setTransactionId] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [amountError, setAmountError] = useState("");
  const [transactionDateError, setTransactionDateError] = useState("");
  const [transactionIdError, setTransactionIdError] = useState("");
  // const [payoutAmt, setPayoutAmt] = useState<number | null>(null); // State for payout amount
  // const [orderMode, setOrderMode] = useState<string | null>(null);
  const { agentId } = useParams<{ agentId: string }>();
  const companyId = agentId;
  const [companyIdNumber, setCompanyIdNumber] = useState<string>("");
  // const [rows, setRows] = useState<Order[]>([]);
  const token = localStorage.getItem("token");
 const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  


  {error} {loading}

  interface BankDetails {
    acNo?: any;
    acName?: string;
    bank?: string;
    branch?: string;
    code?: string;
    isVerified?: boolean|any;
    _id?: string;
    verificationDetails?:any;
  }
  
  interface ApiResponse {
    map(arg0: (item: any) => JSX.Element): import("react").ReactNode;
    length: number;
    data: {
      bankDetails: BankDetails;
    };
  }
  
  
  const fetchData = useCallback( async () => {
    try {
        const response = await fetch(`https://adminapi.flexiclean.me/api/v1/agent/company/${companyId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });
 
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
  
        const result: ApiResponse = await response.json();
 
         
           
        setBankDetails(result.data.bankDetails);
        setVerifyDeatils(result.data.bankDetails.verificationDetails);
        setHasBankDetails(!!result.data.bankDetails.acNo);
        setLastAcNo(result.data.bankDetails.acNo || null);
        setBankDetailId(result.data.bankDetails._id || null);
        setAcNo(result.data.bankDetails.acNo || "");
        setAcName(result.data.bankDetails.acName || "");
        setBank(result.data.bankDetails.bank || "");
        setBranch(result.data.bankDetails.branch || "");
        setCode(result.data.bankDetails.code || "");
        setIsVerified(result.data.bankDetails.isVerified);
  
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    },[companyId, token]);
  
    useEffect(() => {
    fetchData();
  }, [companyId, fetchData, token]);

  const onSubmit = () => {
    const payload = {
      amount,
      transactionDate,
      transactionId,
    };

        if (companyIdNumber) {
      localStorage.setItem(
        `pendingTransaction ${companyIdNumber}`,
        JSON.stringify(payload)
      );
      
    } else {
      console.error("Error: companyIdNumber is undefined.");
    }



    handlePending(companyId!)
      .then(() => {
        // If the API call was successful, update local storage again if needed
        const updatedBankDetails = JSON.parse(localStorage.getItem('bankDetails') || '[]');
        if (updatedBankDetails.length > 0) {
          updatedBankDetails[0].verificationDetails = {
            amount: Number(amount),
            transactionId,
            date: transactionDate,
          };
          localStorage.setItem('bankDetails', JSON.stringify(updatedBankDetails));
        }
        // Close modal after successful operation
        // onClose();
        setPaymentModalOpen(false);
        fetchData();
      })
      .catch((error) => {
        console.error("Error saving transaction:", error);
        // Optionally handle error (e.g., show a message to the user)
      });
  };


  const handlePending = async (id: string) => {
    let hasError = false;
    setAmountError("");
    setTransactionDateError("");
    setTransactionIdError("");

    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      setAmountError("Please enter a valid amount greater than 0.");
      hasError = true;
    }

    if (!transactionDate) {
      setTransactionDateError("Please select a transaction date.");
      hasError = true;
    }

    if (!transactionId) {
      setTransactionIdError("Please enter a transaction ID.");
      hasError = true;
    }

    if (hasError) return;

    const payload = {
      amount: numericAmount,
      transactionId,
      date: transactionDate,
    };

    const result = await savePendingData(id, payload);

    if (result?.success) {
      message.success("Pending Updated");
      setAmount("");
      setTransactionDate("");
      setTransactionId("");
      setIsModalOpen(false);
    } else if (result) {
      message.error(result.message);
    } else {
      message.error("An unexpected error occurred.");
    }
  }

  


  useEffect(() => {
    const url = window.location.href; // Get the current URL
    const urlObject = new URL(url); // Create a URL object

    // Extract the pathname and split it to get the ID
    const pathname = urlObject.pathname;
    const extractedId = pathname.split("/")[2];

    // Update the state with the extracted ID
    setCompanyIdNumber(extractedId);
  }, []);
  useEffect(() => {
    const url = `https://adminapi.flexiclean.me/api/v1/activities/wallet/${companyId}`;


    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add Bearer token
          },
        });

         const result = await response.json();
         console.log(result?.data,"inner");
         setData(result?.data)

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId, token]);

console.log(data);

  useEffect(() => {
    if (paymentModalOpen && bankDetails) {
      setAcNo(bankDetails.acNo ?? "");
      setAcName(bankDetails.acName ?? "");
      setBank(bankDetails.bank ?? "");
      setBranch(bankDetails.branch ?? "");
      setCode(bankDetails.code ?? "");
    }
  }, [paymentModalOpen, bankDetails]);

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};
    if (!acNo) newErrors.acNo = "Account Number is required";
    if (!acName) newErrors.acName = "Account Holder Name is required";
    if (!bank) newErrors.bank = "Bank Name is required";
    if (!branch) newErrors.branch = "Branch Name is required";
    if (!code) newErrors.code = "Code is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  useEffect(() => {
    if (paymentModalOpen && verifyDetails) {
      setAmount(verifyDetails.amount ?? "");
      setTransactionDate(verifyDetails.date.split("T")[0] ?? "")
      setTransactionId(verifyDetails.transactionId ?? "");
    }
  }, [paymentModalOpen, verifyDetails]);


  // const Verifyvalidate = () => {
  //   const newErrors: { [key: string]: string } = {};

  //   if (!amount) newErrors.amount = "Amount is required";
  //   // if (!transactionDate) newErrors.date = "Date is required";
  //   if (!transactionId) newErrors.transactionId = "Transaction ID is required";

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleSave = async () => {
    if (!validateFields()) {
      message.error("Please fill out all required fields.");
      return;
    }

    const payload = { acNo, acName, bank, branch, code, companyId };
    if (bankDetailId) {
      delete payload.companyId; // Ensure not to send companyId if editing an existing record
    }



    const result = await saveBankDetail(payload, companyId);

    if (result.success) {
      setIsModalOpen(false);
      fetchData();
      message.success(result.data.message || "Bank successfully updated");
      // Update the state with the latest bank details
      const updatedBankDetails = result.data.bankDetails;

      if (updatedBankDetails && updatedBankDetails.length > 0) {
        const lastBankDetail =
          updatedBankDetails[updatedBankDetails.length - 1];

        // Update the state with the new bank details
        setBankDetails(lastBankDetail);
        setAcNo(lastBankDetail.acNo);
        setAcName(lastBankDetail.acName);
        setBank(lastBankDetail.bank);
        setBranch(lastBankDetail.branch);
        setCode(lastBankDetail.code);

        // Update local storage with the new bank details
        localStorage.setItem("bankDetails", JSON.stringify(updatedBankDetails));
       
      } else {
        // Reset state if no bank details are found
        localStorage.removeItem("bankDetails");
        setHasBankDetails(false);
        setAcNo("");
        setAcName("");
        setBank("");
        setBranch("");
        setCode("");
      }
    } else {
      message.error(result.message);
    }
  };


  const getFirstFiveDigits = (acNo: string) => acNo.slice(0, 5);


  return (
    <>
      <PageTitle>WALLET & PAYOUT</PageTitle>
      <h3 className="card-title align-items-start flex-column mb-4">
        <span className="card-label fw-bold fs-3 mb-1">Wallet</span>
      </h3>

      <div className="custom-card mb-8">
        <div className="custom-card-body">
          <div className="custom-flex-container">
            <div className="custom-col-md-8">
              <div className="custom-flex-grow">
                <div>
                    {data && data.length > 0 ?(
                      data.map((item) => (
                      
                      <div key={item._id}>
                        {item.currencyId && (
                          <div>
                            <h2 className="custom-h2">
                              {(item.balance).toFixed(item.currencyId.decimalPoints)}
                            </h2>
                            <h4 className="custom-h4">
                              {item.currencyId.currencyCode}
                            </h4>
                          </div>

                        )}
                      </div>
                    ))
                  ) : (
                    <p>No data available.</p>
                  )}
                </div>
              </div>
            </div>

            <div className="custom-col-md-2">
              <div className="custom-flex-grow">
                <h2 className="custom-h2">Bank Details</h2>
                <h4 className="custom-h4">
                  {hasBankDetails
                    ? `${getFirstFiveDigits(lastAcNo)}****`
                    : "No bank details found"}
                </h4>
              </div>
            </div>

            <div className="custom-btn-container">
              {isVerified === true ? (
                <div className="verified-container">
                  <i className="fas fa-check-circle"></i> Verified
                </div>
              ) : isVerified === false && hasBankDetails ? (
                <>
                  <div>
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="custom-btn-verify-pending"
                      style={{ background: "#1e4894" }}
                    >
                      <i className="bi bi-pencil"></i> Update
                    </Button>
                  </div>
                  <div>
                    <Button
                      onClick={() => setPaymentModalOpen(true)}
                      className="custom-btn-verify-pending btn-warning"
                    >
                      <i className="bi bi-check-circle"></i>Verify Pending
                    </Button>
                  </div>
                </>
              ) : (
                <div>
                  <Button
                    onClick={() => setIsModalOpen(true)}
                    className="custom-btn-verify-pending"
                    style={{ background: "#192A52" }}
                  >
                    <i className="bi bi-plus"></i>
                    Add
                  </Button>

                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Row>
        <Col>
          <Tab.Container id="left-tabs-example" defaultActiveKey="Transactions">
            <Nav variant="tabs" className="border-0">
              <Nav.Item>
                <Nav.Link eventKey="Transactions" className="border-0">
                  Transactions
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="Payout" className="border-0">
                  Payout History
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey="Transactions">
                <TransactionsTable />
              </Tab.Pane>
              <Tab.Pane eventKey="Payout">
                <PayoutTable />
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Col>
      </Row>

      <VerifyPendingModal
        show={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        amount={amount}
        companyIdNumber={companyIdNumber}
        setAmount={setAmount}
        transactionDate={transactionDate}
        setTransactionDate={setTransactionDate}
        transactionId={transactionId}
        setTransactionId={setTransactionId}
        amountError={amountError}
        transactionDateError={transactionDateError}
        transactionIdError={transactionIdError}
        handlePending={handlePending}
        onSubmit={onSubmit}
      />

      <BankDetailsModal
        show={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        acNo={acNo}
        setAcNo={setAcNo}
        acName={acName}
        setAcName={setAcName}
        bank={bank}
        setBank={setBank}
        branch={branch}
        setBranch={setBranch}
        code={code}
        setCode={setCode}
        errors={errors}
        handleSave={handleSave}
        hasBankDetails={hasBankDetails}
      />
    </>
  );
};

export default AgentWallet;
