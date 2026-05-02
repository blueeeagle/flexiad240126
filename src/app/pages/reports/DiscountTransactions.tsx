// import { FC, useCallback, useEffect, useState } from 'react';
// import { PageTitle } from '../../../_metronic/layout/core';
// import ReactPaginate from 'react-paginate';
// import { IconContext } from 'react-icons';
// import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
// import { Offcanvas, Form } from "react-bootstrap";
// import Select from 'react-select';

// interface Customer {
//   _id: string;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   customerType?: string;
// }

// interface Agent {
//   firstName?: string;
//   lastName?: string;
//   email?: string;
// }

// interface Order {
//   orderNo?: string;
//   grossAmt?: number;
//   discAmt?: number;
//   netAmt?: number;
// }

// interface Currency {
//   currencySymbol?: string;
// }

// interface DiscountTransaction {
//   companyId: any;
//   discountId: any;
//   updated_at?: string;
//   booking?: string;
//   promoCodeName?: string;
//   customerId?: Customer;
//   agentId?: Agent;
//   orderId?: Order;
//   currencyId?: Currency;
// }

// interface Payload {
//   startDate?: string;
//   endDate?: string;
//   companyId?: string | string[];
//   customers?: string[];
//   orderNo?: string;
//   bookedOn?: string;
//   paymentMethod?: string;
//   agentId?: string | string[];
//   orderId?: string;
//   orderMode?: string | string[];
//   orderStatus?: string | string[];
//   paymentStatus?: string | string[];
//   orderType?: string | string[];
//   type?: string[];
//   logistics?: boolean;
// }

// const DiscountTransactions: FC = () => {
//   const [data, setData] = useState<DiscountTransaction[]>([]);
//   const [page, setPage] = useState<number>(0);
//   const [total, setTotal] = useState<number>(0);
//   const pageSize = 10;
//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [selectedCustomers, setSelectedCustomers] = useState<{ value: string; label: string }[]>([]);
//   const [filters, setFilters] = useState({
//     startDate: "",
//     endDate: ""
//   });
//   const token = localStorage.getItem("token");

//   const fetchDiscountTransactionData = useCallback(async () => {
//     const payload: Payload = {
//       startDate: filters.startDate,
//       endDate: filters.endDate,
//     };

//     if (selectedCustomers.length > 0) {
//       payload.customers = selectedCustomers.map(c => c.value);
//     }

//     try {
//       const response = await fetch(
//         `https://adminapi.flexiclean.me/api/v1/reports/customer/discounts?pageIndex=${page}&pageSize=${pageSize}`,
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(payload),
//         }
//       );

//       const result = await response.json();
//       if (result?.data) {
//         setData(result.data);
//         setTotal(result.totalCount);
//       }
//     } catch (error) {
//       console.error("Error fetching transaction data:", error);
//     }
//   }, [filters, page, selectedCustomers, token]);

//   useEffect(() => {
//     fetchDiscountTransactionData();
//   }, [fetchDiscountTransactionData]);

//   useEffect(() => {
//     const fetchCustomers = async () => {
//       try {
//         const response = await fetch("https://adminapi.flexiclean.me/api/v1/customer/dropdown", {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const result = await response.json();
//         if (result.status === "ok") {
//           setCustomers(result.data);
//         }
//       } catch (error) {
//         console.error("Error fetching customers:", error);
//       }
//     };
//     fetchCustomers();
//   }, [token]);

//   const toggleOffcanvas = (open: boolean) => () => {
//     setIsOffcanvasOpen(open);
//   };

//   const handleSave = () => {
//     fetchDiscountTransactionData();
//     toggleOffcanvas(false)();
//   };

//   const customerOptions = customers.map(c => ({
//     value: c._id,
//     label: `${c.firstName || ''} ${c.lastName || ''} (${c.customerType || 'Type'})`
//   }));

//   return (
//     <>
//       <PageTitle>DISCOUNT TRANSACTIONS</PageTitle>
//       <div className="d-flex justify-content-end mb-3">
//         <button className="btn btn-primary" onClick={toggleOffcanvas(true)}>Filter</button>
//       </div>

//       <Offcanvas show={isOffcanvasOpen} onHide={toggleOffcanvas(false)} placement="end" style={{ width: "500px" }}>
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
//               <Form.Group className="mb-4 ms-2">
//                 <Form.Label>End Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={filters.endDate}
//                   onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
//                 />
//               </Form.Group>
//             </div>

//             <Form.Group className="mb-4">
//               <Form.Label>Customer</Form.Label>
//               <Select
//                 isMulti
//                 options={customerOptions}
//                 value={selectedCustomers}
//                 onChange={(selected) => setSelectedCustomers(selected as any)}
//               />
//             </Form.Group>
//           </Form>

//           <div className="d-flex justify-content-end">
//             <button type="button" className="btn btn-success" onClick={handleSave}>
//               Apply
//             </button>
//           </div>
//         </Offcanvas.Body>
//       </Offcanvas>

//       <div className="table-responsive mt-5">
//         <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//           <thead>
//             <tr className="fw-bold text-muted">
//               <th>Date</th>
//               <th>Booking ID</th>
//               <th>Promo Code</th>
//               <th>Customer Name</th>
//               <th>Customer Email</th>
//               <th>Agent Name</th>
//               {/* <th>Agent Email</th> */}
//               <th>Order Value</th>
//               <th>Discount Amount</th>
//               <th>Final Value</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((dt, idx) => (
//               <tr key={idx}>
//                 <td>{dt.updated_at ? new Intl.DateTimeFormat('en-GB').format(new Date(dt.updated_at)) : '-'}</td>
//                 <td>{dt.orderId?.orderNo || '-'}</td>
//                 <td>{dt.discountId.promoTitle || '-'}</td>
//                 <td>{dt.customerId?.firstName || '-'} {dt.customerId?.lastName || ''}</td>
//                 <td>{dt.customerId?.email || '-'}</td>
//                 <td>{dt.companyId && dt.companyId.companyName ? dt.companyId.companyName : '-'}</td>
//                  {/* <td>{dt.agentId?.email || '-'}</td> */}
//                 <td>{dt.currencyId?.currencySymbol || ''} {dt.orderId?.grossAmt || '0'}</td>
//                 <td>{dt.currencyId?.currencySymbol || ''} {dt.orderId?.discAmt || '0'}</td>
//                 <td>{dt.currencyId?.currencySymbol || ''} {dt.orderId?.netAmt || '0'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="pagewrapper mt-4">
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

// export default DiscountTransactions;
import { FC, useCallback, useEffect, useState } from 'react';
import { PageTitle } from '../../../_metronic/layout/core';
import ReactPaginate from 'react-paginate';
import { IconContext } from 'react-icons';
import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';
import { Offcanvas, Form } from "react-bootstrap";
import Select from 'react-select';
import { getReportsPermissions } from '../../utils/getPermissions';

interface Customer {
  _id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  customerType?: string;
}

interface Agent {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface Order {
  orderNo?: string;
  grossAmt?: number;
  discAmt?: number;
  netAmt?: number;
}

interface Currency {
  currencySymbol?: string;
}

interface DiscountTransaction {
  companyId: any;
  discountId: any;
  updated_at?: string;
  booking?: string;
  promoCodeName?: string;
  customerId?: Customer;
  agentId?: Agent;
  orderId?: Order;
  currencyId?: Currency;
}

interface Payload {
  startDate?: string;
  endDate?: string;
  companyId?: string | string[];
  customers?: string[];
  orderNo?: string;
  bookedOn?: string;
  paymentMethod?: string;
  agentId?: string | string[];
  orderId?: string;
  orderMode?: string | string[];
  orderStatus?: string | string[];
  paymentStatus?: string | string[];
  orderType?: string | string[];
  type?: string[];
  logistics?: boolean;
}

const DiscountTransactions: FC = () => {
  const [data, setData] = useState<DiscountTransaction[]>([]);
  const [page, setPage] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const pageSize = 10;
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [selectedCustomers, setSelectedCustomers] = useState<{ value: string; label: string }[]>([]);
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: ""
  });
  const token = localStorage.getItem("token");

  // Permissions
  const permissions = getReportsPermissions();
  const canView = permissions.includes("view");
  const canEdit = permissions.includes("edit");
  const canDelete = permissions.includes("delete");
  const canCreate = permissions.includes("create");

  console.log("DiscountTransactions Permissions:", { canView, canEdit, canDelete, canCreate });

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

  const fetchDiscountTransactionData = useCallback(async () => {
    const payload: Payload = {
      startDate: filters.startDate,
      endDate: filters.endDate,
    };

    if (selectedCustomers.length > 0) {
      payload.customers = selectedCustomers.map(c => c.value);
    }

    try {
      const response = await fetch(
        `https://adminapi.flexiclean.me/api/v1/reports/customer/discounts?pageIndex=${page}&pageSize=${pageSize}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (result?.data) {
        setData(result.data);
        setTotal(result.totalCount);
      }
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    }
  }, [filters, page, selectedCustomers, token]);

  useEffect(() => {
    fetchDiscountTransactionData();
  }, [fetchDiscountTransactionData]);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await fetch("https://adminapi.flexiclean.me/api/v1/customer/dropdown", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        if (result.status === "ok") {
          setCustomers(result.data);
        }
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };
    fetchCustomers();
  }, [token]);

  const toggleOffcanvas = (open: boolean) => () => {
    setIsOffcanvasOpen(open);
  };

  const handleSave = () => {
    fetchDiscountTransactionData();
    toggleOffcanvas(false)();
  };

  const customerOptions = customers.map(c => ({
    value: c._id,
    label: `${c.firstName || ''} ${c.lastName || ''} (${c.customerType || 'Type'})`
  }));

  return (
    <>
      <PageTitle>DISCOUNT TRANSACTIONS</PageTitle>
      <div className="d-flex justify-content-end mb-3">
        <button className="btn btn-primary" onClick={toggleOffcanvas(true)}>Filter</button>
      </div>

      <Offcanvas show={isOffcanvasOpen} onHide={toggleOffcanvas(false)} placement="end" style={{ width: "500px" }}>
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
              <Form.Group className="mb-4 ms-2">
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-4">
              <Form.Label>Customer</Form.Label>
              <Select
                isMulti
                options={customerOptions}
                value={selectedCustomers}
                onChange={(selected) => setSelectedCustomers(selected as any)}
              />
            </Form.Group>
          </Form>

          <div className="d-flex justify-content-end">
            <button type="button" className="btn btn-success" onClick={handleSave}>
              Apply
            </button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <div className="table-responsive mt-5">
        <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
          <thead>
            <tr className="fw-bold text-muted">
              <th>Date</th>
              <th>Booking ID</th>
              <th>Promo Code</th>
              <th>Customer Name</th>
              <th>Customer Email</th>
              <th>Agent Name</th>
              <th>Order Value</th>
              <th>Discount Amount</th>
              <th>Final Value</th>
            </tr>
          </thead>
          <tbody>
            {data.map((dt, idx) => (
              <tr key={idx}>
                <td>{dt.updated_at ? new Intl.DateTimeFormat('en-GB').format(new Date(dt.updated_at)) : '-'}</td>
                <td>{dt.orderId?.orderNo || '-'}</td>
                <td>{dt.discountId?.promoTitle || '-'}</td>
                <td>{dt.customerId?.firstName || '-'} {dt.customerId?.lastName || ''}</td>
                <td>{dt.customerId?.email || '-'}</td>
                <td>{dt.companyId && dt.companyId.companyName ? dt.companyId.companyName : '-'}</td>
                <td>{dt.currencyId?.currencySymbol || ''} {dt.orderId?.grossAmt || '0'}</td>
                <td>{dt.currencyId?.currencySymbol || ''} {dt.orderId?.discAmt || '0'}</td>
                <td>{dt.currencyId?.currencySymbol || ''} {dt.orderId?.netAmt || '0'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagewrapper mt-4">
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

export default DiscountTransactions;