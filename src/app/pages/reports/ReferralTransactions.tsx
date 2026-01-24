// import { FC, useCallback, useEffect, useState } from "react";
// import { PageTitle } from "../../../_metronic/layout/core";
// import { IconContext } from "react-icons";
// import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
// import ReactPaginate from "react-paginate";
// import {
//   Offcanvas,
//   Form,
//   Dropdown,
//   Row,
//   Col,
//   Button,
// } from "react-bootstrap";

// // Types
// interface ICustomer {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   customerType?: string;
// }

// interface ICurrency {
//   currencySymbol: string;
// }

// interface ITransaction {
//   updated_at?: string;
//   refname?: string;
//   customerId?: ICustomer;
//   currencyId?: ICurrency;
//   amount?: number;
// }

// interface Payload {
//   startDate?: string;
//   endDate?: string;
//   customers?: string[];
// }

// const ReferralTransactions: FC = () => {
//   const [page, setPage] = useState<number>(0);
//   const [total, setTotal] = useState<number>(0);
//   const [data, setData] = useState<ITransaction[]>([]);
//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
//   const [selectAllCustomers, setSelectAllCustomers] = useState<boolean>(false);
//   const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
//   const [customers, setCustomers] = useState<ICustomer[]>([]);
//   const [filters, setFilters] = useState({ startDate: "", endDate: "" });

//   const pageSize = 10;
//   const token = localStorage.getItem("token");

//   // Fetch Transactions
//   const fetchReferralTransactions = useCallback(async () => {
//     const payload: Payload = {};

//     if (selectedCustomers.length > 0) {
//       payload.customers = selectedCustomers;
//     }
//     if (filters.startDate) payload.startDate = filters.startDate;
//     if (filters.endDate) payload.endDate = filters.endDate;

//     try {
//       if (!token) throw new Error("Token not found");

//       const response = await fetch(
//         `https://adminapi.flexiclean.me/api/v1/reports/customer/payTrans?pageIndex=${page}&pageSize=${pageSize}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//           ...payload,
//             paymentType: "Referal Credit",
//           }),
//         }
//       );

//       if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

//       const result = await response.json();
//       setTotal(result?.totalCount || 0);
//       setData(result?.data || []);
//     } catch (error) {
//       console.error("Error fetching transaction data:", error);
//     }
//   }, [page, filters, selectedCustomers, token]);

//   // Fetch Customers
//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await fetch(
//           "https://adminapi.flexiclean.me/api/v1/customer/dropdown",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         const result = await response.json();
//         if (result.status === "ok") {
//           setCustomers(result.data);
//         } else {
//           console.error("Failed to fetch customers");
//         }
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//       }
//     };
//     fetchCustomers();
//   }, [token]);

//   useEffect(() => {
//     fetchReferralTransactions();
//   }, [fetchReferralTransactions]);

//   const toggleOffcanvas = (open: boolean) => () => {
//     setIsOffcanvasOpen(open);
//   };

//   const handleSelectAllCustomers = () => {
//     setSelectAllCustomers((prev) => {
//       const newSelected = !prev ? customers.map((c) => c._id) : [];
//       setSelectedCustomers(newSelected);
//       return !prev;
//     });
//   };

//   const handleCheckboxChange = (id: string) => {
//     setSelectedCustomers((prev) =>
//       prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
//     );
//   };

//   const handleSave = () => {
//     fetchReferralTransactions();
//     toggleOffcanvas(false)();
//   };

//   return (
//     <>
//       <PageTitle>REFERRAL TRANSACTIONS</PageTitle>

//       <div className="d-flex justify-content-end">
//         <Button
//           className="custom-btn-verify-pending"
//           style={{ background: "#1e4894" }}
//           onClick={toggleOffcanvas(true)}
//         >
//           Filter
//         </Button>
//       </div>

//       {/* Offcanvas Filter Panel */}
//       <Offcanvas show={isOffcanvasOpen} onHide={toggleOffcanvas(false)} placement="end" style={{ width: "500px" }}>
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Filter</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <Form>
//             <Row>
//               <Col>
//                 <Form.Group className="mb-4">
//                   <Form.Label>Booked Start Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={filters.startDate}
//                     onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//               <Col>
//                 <Form.Group className="mb-4">
//                   <Form.Label>Booked End Date</Form.Label>
//                   <Form.Control
//                     type="date"
//                     value={filters.endDate}
//                     onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
//                   />
//                 </Form.Group>
//               </Col>
//             </Row>
//             <Form.Group className="mb-4">
//               <Form.Label>Customer</Form.Label>
//               <Dropdown className="w-100">
//                 <Dropdown.Toggle variant="light" className="w-100">
//                   {selectedCustomers.length > 0 ? "Customers Selected" : "Select Customer"}
//                 </Dropdown.Toggle>
//                 <Dropdown.Menu style={{ maxHeight: "300px", overflowY: "auto" }}>
//                   <Form.Group className="px-3">
//                     <Form.Check
//                       type="checkbox"
//                       label="Select All"
//                       checked={selectAllCustomers}
//                       onChange={handleSelectAllCustomers}
//                     />
//                   </Form.Group>
//                   <Dropdown.Divider />
//                   {customers.map((customer) => (
//                     <Form.Group key={customer._id} className="px-3">
//                       <Form.Check
//                         type="checkbox"
//                         label={`${customer.firstName} ${customer.lastName} (${customer.customerType || "N/A"})`}
//                         checked={selectedCustomers.includes(customer._id)}
//                         onChange={() => handleCheckboxChange(customer._id)}
//                       />
//                     </Form.Group>
//                   ))}
//                 </Dropdown.Menu>
//               </Dropdown>
//             </Form.Group>
//           </Form>
//           <div className="d-flex justify-content-end">
//             <Button onClick={handleSave}>Apply</Button>
//           </div>
//         </Offcanvas.Body>
//       </Offcanvas>

//       {/* Transaction Table */}
//       <table className="table table-bordered mt-4">
//         <thead style={{ borderTop: "1px solid blue", borderBottom: "1px solid blue" }}>
//           <tr>
//             <th className="text-muted fw-bold">DD/MM/YY<br /><span className="fw-semibold">Time</span></th>
//             <th className="text-muted fw-bold">Referral Name</th>
//             <th className="text-muted fw-bold">Customer Name / Email</th>
//             <th className="text-muted fw-bold">Credits</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.length > 0 ? (
//             data.map((dt, idx) => (
//               <tr key={idx}>
//                 <td>
//                   {dt.updated_at
//                     ? `${new Date(dt.updated_at).toLocaleDateString("en-GB")} ${new Date(
//                         dt.updated_at
//                       ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
//                     : "-"}
//                 </td>
//                 <td>{dt.refname || "-"}</td>
//                 <td>
//                   {dt.customerId
//                     ? `${dt.customerId.firstName} ${dt.customerId.lastName} / ${dt.customerId.email}`
//                     : "-"}
//                 </td>
//                 <td>{dt.currencyId ? `${dt.currencyId.currencySymbol} ${dt.amount}` : "-"}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan={4} className="text-center text-muted">
//                 No transactions found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>

//       {/* Pagination */}
//       <div className="pagewrapper mt-3">
//         <ReactPaginate
//           containerClassName="pagination"
//           pageClassName="page-item"
//           pageLinkClassName="page-link"
//           activeClassName="active"
//           onPageChange={(event) => setPage(event.selected)}
//           pageCount={Math.ceil(total / pageSize)}
//           breakLabel="..."
//           previousLabel={
//             <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
//               <AiFillLeftCircle />
//             </IconContext.Provider>
//           }
//           nextLabel={
//             <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
//               <AiFillRightCircle />
//             </IconContext.Provider>
//           }
//         />
//       </div>
//     </>
//   );
// };

// export default ReferralTransactions;



import { FC, useCallback, useEffect, useState } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { IconContext } from "react-icons";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import ReactPaginate from "react-paginate";
import {
  Offcanvas,
  Form,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import Select from "react-select";

// Types
interface ICustomer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  customerType?: string;
}

interface ICurrency {
  currencySymbol: string;
}

interface ITransaction {
  paymentType: string;
  updated_at?: string;
  refname?: string;
  customerId?: ICustomer;
  currencyId?: ICurrency;
  amount?: number;
}

interface Payload {
  startDate?: string;
  endDate?: string;
  customers?: string[];
}

const ReferralTransactions: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [data, setData] = useState<ITransaction[]>([]);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [filters, setFilters] = useState({ startDate: "", endDate: "" });

  const pageSize = 10;
  const token = localStorage.getItem("token");

  const customerOptions = customers.map((c) => ({
    value: c._id,
    label: `${c.firstName} ${c.lastName} (${c.customerType || "N/A"})`,
  }));

  // Fetch Transactions
  const fetchReferralTransactions = useCallback(async () => {
    const payload: Payload = {};

    if (selectedCustomers.length > 0) {
      payload.customers = selectedCustomers;
    }
    if (filters.startDate) payload.startDate = filters.startDate;
    if (filters.endDate) payload.endDate = filters.endDate;

    try {
      if (!token) throw new Error("Token not found");

      const response = await fetch(
        `https://adminapi.flexiclean.me/api/v1/reports/customer/payTrans?pageIndex=${page}&pageSize=${pageSize}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...payload,
            paymentType: "Referal Credit",
          }),
        }
      );

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();
      setTotal(result?.totalCount || 0);
      setData(result?.data || []);
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  }, [page, filters, selectedCustomers, token]);

  // Fetch Customers
  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch(
          "https://adminapi.flexiclean.me/api/v1/customer/dropdown",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = await response.json();
        if (result.status === "ok") {
          setCustomers(result.data);
        } else {
          console.error("Failed to fetch customers");
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, [token]);

  useEffect(() => {
    fetchReferralTransactions();
  }, [fetchReferralTransactions]);

  const toggleOffcanvas = (open: boolean) => () => {
    setIsOffcanvasOpen(open);
  };

  const handleSave = () => {
    fetchReferralTransactions();
    toggleOffcanvas(false)();
  };

  return (
    <>
      <PageTitle>REFERRAL TRANSACTIONS</PageTitle>

      <div className="d-flex justify-content-end">
        <Button
          className="custom-btn-verify-pending"
          style={{ background: "#1e4894" }}
          onClick={toggleOffcanvas(true)}
        >
          Filter
        </Button>
      </div>

      {/* Offcanvas Filter Panel */}
      <Offcanvas show={isOffcanvasOpen} onHide={toggleOffcanvas(false)} placement="end" style={{ width: "500px" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <Row>
              <Col>
                <Form.Group className="mb-4">
                  <Form.Label>Booked Start Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={filters.startDate}
                    onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-4">
                  <Form.Label>Booked End Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={filters.endDate}
                    onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Updated Customer Filter */}
            <Form.Group className="mb-4">
              <Form.Label>Customer</Form.Label>
              <Select
                isMulti
                options={customerOptions}
                value={customerOptions.filter((opt) => selectedCustomers.includes(opt.value))}
                onChange={(selected) => {
                  const ids = selected.map((s) => s.value);
                  setSelectedCustomers(ids);
                }}
                placeholder="Select customers..."
              />
            </Form.Group>
          </Form>

          <div className="d-flex justify-content-end">
            <Button onClick={handleSave}>Apply</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Transaction Table */}
      <table className="table table-bordered mt-4">
        <thead style={{ borderTop: "1px solid blue", borderBottom: "1px solid blue" }}>
          <tr>
            <th className="text-muted fw-bold">DD/MM/YY<br /><span className="fw-semibold">Time</span></th>
            <th className="text-muted fw-bold">Referral Name</th>
            <th className="text-muted fw-bold">Customer Name / Email</th>
            <th className="text-muted fw-bold">Credits</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((dt, idx) => (
              <tr key={idx}>
                <td>
                  {dt.updated_at
                    ? `${new Date(dt.updated_at).toLocaleDateString("en-GB")} ${new Date(
                        dt.updated_at
                      ).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`
                    : "-"}
                </td>
                <td>{dt.paymentType || "-"}</td>
                <td>
                  {dt.customerId
                    ? `${dt.customerId.firstName} ${dt.customerId.lastName} / ${dt.customerId.email}`
                    : "-"}
                </td>
                <td>{dt.currencyId ? `${dt.currencyId.currencySymbol} ${dt.amount}` : "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center text-muted">
                No transactions found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagewrapper mt-3">
        <ReactPaginate
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="active"
          onPageChange={(event) => setPage(event.selected)}
          pageCount={Math.ceil(total / pageSize)}
          breakLabel="..."
          previousLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ color: "#B8C1CC", size: "36px" }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
      </div>
    </>
  );
};

export default ReferralTransactions;
