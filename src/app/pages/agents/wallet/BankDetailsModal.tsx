import React, { FC } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface BankDetailsModalProps {
  show: boolean;
  onClose: () => void;
  acNo: string;
  setAcNo: (value: string) => void;
  acName: string;
  setAcName: (value: string) => void;
  bank: string;
  setBank: (value: string) => void;
  branch: string;
  setBranch: (value: string) => void;
  code: string;
  setCode: (value: string) => void;
  errors: { [key: string]: string };
  handleSave: () => void;
  hasBankDetails: boolean;
}

const BankDetailsModal: FC<BankDetailsModalProps> = ({
  show,
  onClose,
  acNo,
  setAcNo,
  acName,
  setAcName,
  bank,
  setBank,
  branch,
  setBranch,
  code,
  setCode,
  errors,
  handleSave,
  hasBankDetails
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{hasBankDetails ? "Update Bank Details" : "Add Bank Details"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formAccountNumber">
            <Form.Label>Account Number</Form.Label>
            <Form.Control
              type="text"
              value={acNo}
              onChange={(e) => setAcNo(e.target.value)}
              isInvalid={!!errors.acNo}
            />
            <Form.Control.Feedback type="invalid">
              {errors.acNo}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formAccountHolderName" className="mt-3">
            <Form.Label>Account Holder Name</Form.Label>
            <Form.Control
              type="text"
              value={acName}
              onChange={(e) => setAcName(e.target.value)}
              isInvalid={!!errors.acName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.acName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBankName" className="mt-3">
            <Form.Label>Bank Name</Form.Label>
            <Form.Control
              type="text"
              value={bank}
              onChange={(e) => setBank(e.target.value)}
              isInvalid={!!errors.bank}
            />
            <Form.Control.Feedback type="invalid">
              {errors.bank}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formBranchName" className="mt-3">
            <Form.Label>Branch Name</Form.Label>
            <Form.Control
              type="text"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              isInvalid={!!errors.branch}
            />
            <Form.Control.Feedback type="invalid">
              {errors.branch}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="formCode" className="mt-3">
            <Form.Label>Bank Code</Form.Label>
            <Form.Control
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              isInvalid={!!errors.code}
            />
            <Form.Control.Feedback type="invalid">
              {errors.code}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          {hasBankDetails ? "Save" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BankDetailsModal;
