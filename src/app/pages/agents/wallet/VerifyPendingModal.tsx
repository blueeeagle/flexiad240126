
import { FC, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import "../../../../../src/_metronic/assets/sass/components/modal.scss";

interface BankDetails {
  _id: string;
  acNo: string;
  acName: string;
  bank: string;
  branch: string;
  code: string;
  verificationDetails: {
    amount: number;
    transactionId: string;
    date: string;
  };
}

interface VerifyPendingModalProps {
  show: boolean;
  companyIdNumber:string,
  onClose: () => void;
  amount: string;
  setAmount: (value: string) => void;
  transactionDate: string;
  setTransactionDate: (value: string) => void;
  transactionId: string;
  setTransactionId: (value: string) => void;
  amountError: string;
  onSubmit:()=>void;
  
  transactionDateError: string;
  transactionIdError: string;
  handlePending: (id: string, payload: unknown) => Promise<void>; // Ensure this returns a promise
}

const VerifyPendingModal: FC<VerifyPendingModalProps> = ({
  show,
  companyIdNumber,
  onClose,
  amount,
  setAmount,
  transactionDate,
  setTransactionDate,
  transactionId,
  setTransactionId,
  amountError,
  transactionDateError,
  transactionIdError,
  onSubmit,
 
}) => {


  const [companyId, setCompanyId] = useState<string>('');
console.log(companyId);


  useEffect(() => {
    if (show) {
      // Fetch bank details from local storage whenever the modal is shown
      const storedBankDetails = localStorage.getItem('bankDetails');
      if (storedBankDetails) {
        const bankDetails: BankDetails[] = JSON.parse(storedBankDetails);
        const verificationDetails = bankDetails[0]?.verificationDetails; // Accessing the first item
        // const verificationDetailsId = bankDetails[0]?._id;
        setCompanyId(companyIdNumber);

        // Set state values based on the retrieved verification details
        if (verificationDetails) {
          setAmount(verificationDetails.amount.toString());
          setTransactionDate(verificationDetails.date.split('T')[0]); // Format to "YYYY-MM-DD"
          setTransactionId(verificationDetails.transactionId);
        }
      }
    }
  }, [show, setAmount, setTransactionDate, setTransactionId, companyIdNumber]);

  
  return (
    <Modal show={show} className="custom-modal" onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Verify Pending Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <label>Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          {amountError && <div style={{ color: "red" }}>{amountError}</div>}
        </div>
        <div>
          <label>Transaction Date</label>
          <input
            type="date"
            value={transactionDate}
            onChange={(e) => setTransactionDate(e.target.value)}
          />
          {transactionDateError && (
            <div style={{ color: "red" }}>{transactionDateError}</div>
          )}
        </div>
        <div>
          <label>Transaction ID</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
          />
          {transactionIdError && (
            <div style={{ color: "red" }}>{transactionIdError}</div>
          )}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default VerifyPendingModal;
