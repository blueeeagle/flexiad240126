// import { FC, useCallback, useEffect, useState } from 'react';
// import { PageTitle } from '../../../_metronic/layout/core';
// import ReactPaginate from 'react-paginate';
// import { IconContext } from 'react-icons';
// import Select from "react-select";
// import {
//   AiFillLeftCircle,
//   AiFillRightCircle,
//   AiOutlineArrowDown,
//   AiOutlineArrowUp,
// } from 'react-icons/ai';
// import { Offcanvas, Form } from 'react-bootstrap';

// interface Customer {
//   _id: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   mobile: string;
// }

// interface Currency {
//   currencySymbol: string;
// }

// interface CustomerTransaction {
//   type: string;
//   orderId?: {
//     orderNo?: string;
//     orderDate?: string;
//     companyId?: {
//       companyName?: string;
//     };
//   };
//   transactionId?: string;
//   updated_at: string;
//   customerId: Customer;
//   amount: number;
//   paymentType?: string;
//   userType?: string;
//   currencyId: Currency;
//   orderNo?: string;
//   orderDate?: string;
//   agentName?: string;
// paymentMode?: string;
// }

// interface Payload {
//   startDate?: string;
//   endDate?: string;
//   customers?: string[];
//   type?: 'in' | 'out';
// }

// const CustomerTransactions: FC = () => {
//   const [page, setPage] = useState<number>(0);
//   const [total, setTotal] = useState<number>(0);
//   const [data, setData] = useState<CustomerTransaction[]>([]);
//   const [paymentType, setPaymentType] = useState<'in' | 'out'>('out');
//   const pageSize = 10;
//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
//   const [filters, setFilters] = useState({
//     startDate: '',
//     endDate: '',
//   });
//   const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const token = localStorage.getItem('token');

//   const fetchCustomerTransactions = useCallback(async () => {
//     const payload: Payload = {
//       type: paymentType,
//       customers: selectedCustomers.length > 0 ? selectedCustomers : undefined,
//       startDate: filters.startDate || undefined,
//       endDate: filters.endDate || undefined,
//     };

//     try {
//       const apiUrl = `https://adminapi.flexiclean.me/api/v1/reports/customer/payTrans?pageIndex=${page}&pageSize=${pageSize}`;
//       const response = await fetch(apiUrl, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
//       const result = await response.json();
//       setTotal(result.totalCount || 0);
//       setData(result.data || []);
//     } catch (error) {
//       console.error('Error fetching transactions:', error);
//     }
//   }, [filters, page, paymentType, selectedCustomers, token]);

//   useEffect(() => {
//     fetchCustomerTransactions();
//   }, [fetchCustomerTransactions]);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const res = await fetch(`https://adminapi.flexiclean.me/api/v1/customer/dropdown`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await res.json();
//         if (result.status === 'ok') {
//           setCustomers(result.data);
//         } else {
//           console.error('Failed to load customers');
//         }
//       } catch (err) {
//         console.error('Customer fetch error:', err);
//       }
//     };
//     fetchCustomers();
//   }, [token]);

//   const toggleOffcanvas = (open: boolean) => () => {
//     setIsOffcanvasOpen(open);
//   };

//   const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setPage(0);
//     setPaymentType(e.target.value as 'in' | 'out');
//   };

//   const handleSave = () => {
//     setPage(0);
//     fetchCustomerTransactions();
//     toggleOffcanvas(false)();
//   };

//   return (
//     <>
//       <PageTitle>CUSTOMER TRANSACTIONS</PageTitle>

//       <div className="d-flex justify-content-end mb-3">
//         <button className="btn btn-primary" onClick={toggleOffcanvas(true)}>
//           Filter
//         </button>
//       </div>

//       {/* Offcanvas Filter */}
//       <Offcanvas show={isOffcanvasOpen} onHide={toggleOffcanvas(false)} placement="end">
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>Filter</Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           <Form>
//             <div className="d-flex justify-content-between">
//               <Form.Group className="mb-4 me-2">
//                 <Form.Label>Start Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={filters.startDate}
//                   onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
//                 />
//               </Form.Group>
//               <Form.Group className="mb-4">
//                 <Form.Label>End Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={filters.endDate}
//                   onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
//                 />
//               </Form.Group>
//             </div>

//             <Form.Group className="mb-3">
//               <Form.Label>Customer</Form.Label>
//               <Select
//                 options={customers.map((c) => ({
//                   value: c._id,
//                   label: `${c.firstName} ${c.lastName}`,
//                 }))}
//                 isMulti
//                 value={customers
//                   .filter((c) => selectedCustomers.includes(c._id))
//                   .map((c) => ({
//                     value: c._id,
//                     label: `${c.firstName} ${c.lastName}`,
//                   }))}
//                 onChange={(selected) =>
//                   setSelectedCustomers(selected.map((s) => s.value))
//                 }
//               />
//             </Form.Group>

//             <div className="d-flex justify-content-end">
//               <button className="btn btn-primary" type="button" onClick={handleSave}>
//                 Apply
//               </button>
//             </div>
//           </Form>
//         </Offcanvas.Body>
//       </Offcanvas>

//       {/* Payment Type Filter */}
//       <div className="row mb-4 justify-content-end">
//         <div className="col-md-3">
//           <label className="form-label fw-bold">Payment Type</label>
//           <select
//             className="form-select"
//             value={paymentType}
//             onChange={handlePaymentTypeChange}
//           >
//             <option value="out">Pay In</option>
//             <option value="in">Pay Out</option>
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="table-responsive">
//         <table className="table table-row-bordered align-middle">
//           <thead>
//             <tr className="fw-bold text-muted">
//               {paymentType === 'out' ? (
//                 <>
//                   <th>Order No</th>
//                   <th>Order Date</th>
//                   <th>Agent Name</th>
//                   <th>Customer Name</th>
//                   <th>Amount</th>
//                   <th>Currency</th>
//                 </>
//               ) : (
//                 <>
//                   <th>Date</th>
//                   <th>Customer Name</th>
//                   <th>Payment Method</th>
//                   <th>Amount</th>
//                   <th>Currency</th>
//                 </>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((dt, idx) => (
//               <tr key={idx}>
//                 {paymentType === 'out' ? (
//                   <>
//                     <td>{dt.orderId?.orderNo || '-'}</td>
//                     <td>
//                       {dt.orderId?.orderDate
//                         ? new Intl.DateTimeFormat('en-GB').format(new Date(dt.orderId.orderDate))
//                         : '-'}
//                     </td>
//                     <td>{dt.orderId?.companyId?.companyName || '-'}</td>
//                     <td>{`${dt.customerId?.firstName} ${dt.customerId?.lastName}`}</td>
//                     <td>
//                       {dt.amount >= 0 ? (
//                         <AiOutlineArrowUp color="green" size={18} />
//                       ) : (
//                         <AiOutlineArrowDown color="red" size={18} />
//                       )}
//                       {dt.amount}
//                     </td>
//                     <td>{dt.currencyId?.currencySymbol || '-'}</td>
//                   </>
//                 ) : (
//                   <>
//                     <td>
//                       {dt.updated_at
//                         ? new Intl.DateTimeFormat('en-GB').format(new Date(dt.updated_at))
//                         : '-'}
//                     </td>
//                     <td>{`${dt.customerId?.firstName} ${dt.customerId?.lastName}`}</td>
//                     <td>{dt.paymentMode || '-'}</td>
//                     <td>
//                       {dt.amount >= 0 ? (
//                         <AiOutlineArrowUp color="green" size={18} />
//                       ) : (
//                         <AiOutlineArrowDown color="red" size={18} />
//                       )}
//                       {dt.amount}
//                     </td>
//                     <td>{dt.currencyId?.currencySymbol || '-'}</td>
//                   </>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="d-flex justify-content-end mt-4">
//         <ReactPaginate
//           containerClassName="pagination"
//           pageClassName="page-item"
//           activeClassName="active"
//           onPageChange={(event) => setPage(event.selected)}
//           pageCount={Math.ceil(total / pageSize)}
//           breakLabel="..."
//           previousLabel={
//             <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
//               <AiFillLeftCircle />
//             </IconContext.Provider>
//           }
//           nextLabel={
//             <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
//               <AiFillRightCircle />
//             </IconContext.Provider>
//           }
//         />
//       </div>
//     </>
//   );
// };

// export default CustomerTransactions;
import { FC, useCallback, useEffect, useState } from 'react';
import { PageTitle } from '../../../_metronic/layout/core';
import ReactPaginate from 'react-paginate';
import { IconContext } from 'react-icons';
import Select from "react-select";
import {
  AiFillLeftCircle,
  AiFillRightCircle,
  AiOutlineArrowDown,
  AiOutlineArrowUp,
} from 'react-icons/ai';
import { Offcanvas, Form } from 'react-bootstrap';
import { getReportsPermissions } from '../../utils/getPermissions';

interface Customer {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
}

interface Currency {
  currencySymbol: string;
}

interface CustomerTransaction {
  type: string;
  orderId?: {
    orderNo?: string;
    orderDate?: string;
    companyId?: {
      companyName?: string;
    };
  };
  transactionId?: string;
  updated_at: string;
  customerId: Customer;
  amount: number;
  paymentType?: string;
  userType?: string;
  currencyId: Currency;
  orderNo?: string;
  orderDate?: string;
  agentName?: string;
  paymentMode?: string;
}

interface Payload {
  startDate?: string;
  endDate?: string;
  customers?: string[];
  type?: 'in' | 'out';
}

const CustomerTransactions: FC = () => {
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [data, setData] = useState<CustomerTransaction[]>([]);
  const [paymentType, setPaymentType] = useState<'in' | 'out'>('out');
  const pageSize = 10;
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  });
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const token = localStorage.getItem('token');

  // Permissions
  const permissions = getReportsPermissions();
  const canView = permissions.includes("view");
  const canEdit = permissions.includes("edit");
  const canDelete = permissions.includes("delete");
  const canCreate = permissions.includes("create");

  console.log("CustomerTransactions Permissions:", { canView, canEdit, canDelete, canCreate });

  // Block page if user cannot view
  if (!canView) {
    return (
      <>
        <PageTitle>Access Denied</PageTitle>
        <div className="alert alert-warning">
          You don't have permission to view this page.
        </div>
      </>
    );
  }

  const fetchCustomerTransactions = useCallback(async () => {
    const payload: Payload = {
      type: paymentType,
      customers: selectedCustomers.length > 0 ? selectedCustomers : undefined,
      startDate: filters.startDate || undefined,
      endDate: filters.endDate || undefined,
    };

    try {
      const apiUrl = `https://adminapi.flexiclean.me/api/v1/reports/customer/payTrans?pageIndex=${page}&pageSize=${pageSize}`;
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
      const result = await response.json();
      setTotal(result.totalCount || 0);
      setData(result.data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  }, [filters, page, paymentType, selectedCustomers, token]);

  useEffect(() => {
    fetchCustomerTransactions();
  }, [fetchCustomerTransactions]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch(`https://adminapi.flexiclean.me/api/v1/customer/dropdown`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await res.json();
        if (result.status === 'ok') {
          setCustomers(result.data);
        } else {
          console.error('Failed to load customers');
        }
      } catch (err) {
        console.error('Customer fetch error:', err);
      }
    };
    fetchCustomers();
  }, [token]);

  const toggleOffcanvas = (open: boolean) => () => {
    setIsOffcanvasOpen(open);
  };

  const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPage(0);
    setPaymentType(e.target.value as 'in' | 'out');
  };

  const handleSave = () => {
    setPage(0);
    fetchCustomerTransactions();
    toggleOffcanvas(false)();
  };

  return (
    <>
      <PageTitle>CUSTOMER TRANSACTIONS</PageTitle>

      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={toggleOffcanvas(true)}>
          Filter
        </button>
      </div>

      {/* Offcanvas Filter */}
      <Offcanvas show={isOffcanvasOpen} onHide={toggleOffcanvas(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Filter</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form>
            <div className="d-flex justify-content-between">
              <Form.Group className="mb-4 me-2">
                <Form.Label>Start Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                />
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3">
              <Form.Label>Customer</Form.Label>
              <Select
                options={customers.map((c) => ({
                  value: c._id,
                  label: `${c.firstName} ${c.lastName}`,
                }))}
                isMulti
                value={customers
                  .filter((c) => selectedCustomers.includes(c._id))
                  .map((c) => ({
                    value: c._id,
                    label: `${c.firstName} ${c.lastName}`,
                  }))}
                onChange={(selected) =>
                  setSelectedCustomers(selected.map((s) => s.value))
                }
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" type="button" onClick={handleSave}>
                Apply
              </button>
            </div>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Payment Type Filter */}
      <div className="row mb-4 justify-content-end">
        <div className="col-md-3">
          <label className="form-label fw-bold">Payment Type</label>
          <select
            className="form-select"
            value={paymentType}
            onChange={handlePaymentTypeChange}
          >
            <option value="out">Pay In</option>
            <option value="in">Pay Out</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-row-bordered align-middle">
          <thead>
            <tr className="fw-bold text-muted">
              {paymentType === 'out' ? (
                <>
                  <th>Order No</th>
                  <th>Order Date</th>
                  <th>Agent Name</th>
                  <th>Customer Name</th>
                  <th>Amount</th>
                  <th>Currency</th>
                </>
              ) : (
                <>
                  <th>Date</th>
                  <th>Customer Name</th>
                  <th>Payment Method</th>
                  <th>Amount</th>
                  <th>Currency</th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map((dt, idx) => (
              <tr key={idx}>
                {paymentType === 'out' ? (
                  <>
                    <td>{dt.orderId?.orderNo || '-'}</td>
                    <td>
                      {dt.orderId?.orderDate
                        ? new Intl.DateTimeFormat('en-GB').format(new Date(dt.orderId.orderDate))
                        : '-'}
                    </td>
                    <td>{dt.orderId?.companyId?.companyName || '-'}</td>
                    <td>{`${dt.customerId?.firstName} ${dt.customerId?.lastName}`}</td>
                    <td>
                      {dt.amount >= 0 ? (
                        <AiOutlineArrowUp color="green" size={18} />
                      ) : (
                        <AiOutlineArrowDown color="red" size={18} />
                      )}
                      {dt.amount}
                    </td>
                    <td>{dt.currencyId?.currencySymbol || '-'}</td>
                  </>
                ) : (
                  <>
                    <td>
                      {dt.updated_at
                        ? new Intl.DateTimeFormat('en-GB').format(new Date(dt.updated_at))
                        : '-'}
                    </td>
                    <td>{`${dt.customerId?.firstName} ${dt.customerId?.lastName}`}</td>
                    <td>{dt.paymentMode || '-'}</td>
                    <td>
                      {dt.amount >= 0 ? (
                        <AiOutlineArrowUp color="green" size={18} />
                      ) : (
                        <AiOutlineArrowDown color="red" size={18} />
                      )}
                      {dt.amount}
                    </td>
                    <td>{dt.currencyId?.currencySymbol || '-'}</td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="d-flex justify-content-end mt-4">
        <ReactPaginate
          containerClassName="pagination"
          pageClassName="page-item"
          activeClassName="active"
          onPageChange={(event) => setPage(event.selected)}
          pageCount={Math.ceil(total / pageSize)}
          breakLabel="..."
          previousLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
              <AiFillLeftCircle />
            </IconContext.Provider>
          }
          nextLabel={
            <IconContext.Provider value={{ color: '#B8C1CC', size: '36px' }}>
              <AiFillRightCircle />
            </IconContext.Provider>
          }
        />
      </div>
    </>
  );
};

export default CustomerTransactions;