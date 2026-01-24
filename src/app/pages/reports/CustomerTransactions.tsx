// import { FC, useCallback, useEffect, useState } from 'react';
// import { PageTitle } from '../../../_metronic/layout/core';
// import ReactPaginate from 'react-paginate';
// import { IconContext } from 'react-icons';
// import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

// interface Customer {
//   firstName: string;
//   lastName: string;
//   email: string;
//   mobile: string;
// }

// interface Currency {
//   currencySymbol: string;
// }

// interface CustomerTransaction {
//   transactionId: string;
//   updated_at: string;
//   customerId: Customer;
//   amount: number;
//   paymentType: string;
//   userType: string;
//   currencyId: Currency;
// }

// interface ApiResponse {
//   data: CustomerTransaction[];
//   totalCount: number;
// }

// const CustomerTransactions: FC = () => {
//   const [page, setPage] = useState<number>(0);
//   const [total, setTotal] = useState<number>(0);
//   const [data, setData] = useState<CustomerTransaction[]>([]);
//   const pageSize = 10;

//   const fetchCustomerTransactions = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(
//         `https://adminapi.flexiclean.me/api/v1/reports/customer/payTrans?pageIndex=${page}&pageSize=${pageSize}`,
//         {
//           method: 'POST',
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             // paymentType: 'package',
//           }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result: ApiResponse = await response.json();
//       setTotal(result?.totalCount || 0);
//       setData(result?.data || []);
//     } catch (error) {
//       console.error('Error fetching transaction data:', error);
//     }
//   }, [page]);

//   useEffect(() => {
//     fetchCustomerTransactions();
//   }, [fetchCustomerTransactions]);

//   return (
//     <>
//       <PageTitle>CUSTOMER TRANSACTIONS</PageTitle>

//       <div className="table-responsive">
//         <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//           <thead>
//             <tr className="fw-bold text-muted">
//               <th className="min-w-100px">Transaction ID</th>
//               <th className="min-w-200px">Date</th>
//               <th className="min-w-200px">Customer Name</th>
//               <th className="min-w-200px">Customer Email</th>
//               <th className="min-w-200px">Customer Mobile</th>
//               <th className="min-w-100px">Amount</th>
//               <th className="min-w-100px">Payment Type</th>
//               <th className="min-w-100px">User Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((dt, idx) => (
//               <tr key={idx}>
//                 <td>{dt.transactionId || '-'}</td>
//                 <td>
//                   {dt.updated_at
//                     ? new Intl.DateTimeFormat('en-GB').format(new Date(dt.updated_at))
//                     : '-'}
//                 </td>
//                 <td>
//                   {dt.customerId?.firstName || '-'} {dt.customerId?.lastName || ''}
//                 </td>
//                 <td>{dt.customerId?.email || '-'}</td>
//                 <td>{dt.customerId?.mobile || '-'}</td>
//                 <td>
//                   {dt.currencyId?.currencySymbol || ''} {dt.amount ?? '-'}
//                 </td>
//                 <td>{dt.paymentType || '-'}</td>
//                 <td>{dt.userType || '-'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="pagewrapper">
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




// import { FC, useCallback, useEffect, useState } from 'react';
// import { PageTitle } from '../../../_metronic/layout/core';
// import ReactPaginate from 'react-paginate';
// import { IconContext } from 'react-icons';
// import { AiFillLeftCircle, AiFillRightCircle } from 'react-icons/ai';

// interface Customer {
//   firstName: string;
//   lastName: string;
//   email: string;
//   mobile: string;
// }

// interface Currency {
//   currencySymbol: string;
// }
// interface InTransaction{
//   transactionId: string;
//   updated_at: string;
//   customerId: Customer;
//   amount: number;
//   paymentType: string;
//   userType: string;
//   currencyId: Currency;
// }
// interface CustomerTransaction {
//   transactionId: string;
//   updated_at: string;
//   customerId: Customer;
//   amount: number;
//   paymentType: string;
//   userType: string;
//   currencyId: Currency;
//   data:InTransaction[];
// }

// interface ApiResponse {
//   data: CustomerTransaction[];
//   totalCount: number;
// }

// const CustomerTransactions: FC = () => {
//   const [page, setPage] = useState<number>(0);
//   const [total, setTotal] = useState<number>(0);
//   const [data, setData] = useState<CustomerTransaction[]>([]);
//   const [paymentType, setPaymentType] = useState<string>(''); 
//   const pageSize = 10;

//   const getApiUrl =useCallback( () => {
//     switch (paymentType) {
//       case 'In':
//         return `https://adminapi.flexiclean.me/api/v1/activities/orders`;
//       case 'out':
//         return `https://adminapi.flexiclean.me/api/v1/activities/outs`;
//       default:
//         return `https://adminapi.flexiclean.me/api/v1/reports/customer/payTrans`;
//     }
//   },[paymentType])

//   const fetchCustomerTransactions = useCallback(async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const apiUrl = `${getApiUrl()}?pageIndex=${page}&pageSize=${pageSize}`;

//       const response = await fetch(apiUrl, {
//         method: 'post',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result: ApiResponse = await response.json();
//       setTotal(result?.totalCount || 0);

//       if (paymentType === 'In') {
//         setData(result?.data?.data || []);
//       } else {
//         setData(result?.data || []);
//       }
//     } catch (error) {
//       console.error('Error fetching transaction data:', error);
//     }
//   }, [getApiUrl, page, paymentType]);

//   useEffect(() => {
//     fetchCustomerTransactions();
//   }, [fetchCustomerTransactions]);

//   const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setPage(0);
//     setPaymentType(e.target.value);
//   };
// console.log(data);

//   return (
//     <>
//       <PageTitle>CUSTOMER TRANSACTIONS</PageTitle>

//       <div className="mb-4">
//         <label htmlFor="paymentType" className="form-label fw-bold">
//           Filter by Payment Type:
//         </label>
//         <select
//           id="paymentType"
//           className="form-select"
//           value={paymentType}
//           onChange={handlePaymentTypeChange}
//         >
//           <option value="">All</option>
//           <option value="In">Pay In</option>
//           <option value="out">Pay Out</option>
//         </select>
//       </div>

//       <div className="table-responsive">
//         <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
//           <thead>
//             <tr className="fw-bold text-muted">
//               <th className="min-w-100px">Transaction ID</th>
//               <th className="min-w-200px">Date</th>
//               <th className="min-w-200px">Customer Name</th>
//               <th className="min-w-200px">Customer Email</th>
//               <th className="min-w-200px">Customer Mobile</th>
//               <th className="min-w-100px">Amount</th>
//               <th className="min-w-100px">Payment Type</th>
//               <th className="min-w-100px">User Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.map((dt, idx) => (
//               <tr key={idx}>
//                 <td>{dt.transactionId || '-'}</td>
//                 <td>
//                   {dt.updated_at
//                     ? new Intl.DateTimeFormat('en-GB').format(new Date(dt.updated_at))
//                     : '-'}
//                 </td>
//                 <td>
//                   {dt.customerId?.firstName || '-'} {dt.customerId?.lastName || ''}
//                 </td>
//                 <td>{dt.customerId?.email || '-'}</td>
//                 <td>{dt.customerId?.mobile || '-'}</td>
//                 <td>
//                   {dt.currencyId?.currencySymbol || ''} {dt.amount ?? '-'}
//                 </td>
//                 <td>{dt.paymentType || '-'}</td>
//                 <td>{dt.userType || '-'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="pagewrapper">
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


// import { FC, useCallback, useEffect, useState } from 'react';
// import { PageTitle } from '../../../_metronic/layout/core';
// import ReactPaginate from 'react-paginate';
// import { IconContext } from 'react-icons';
// import { AiFillLeftCircle, AiFillRightCircle, AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';
// import {
//   Offcanvas,
//   Form,
//   Dropdown,
// } from "react-bootstrap";
// // import { log } from 'console';

// interface Customer {
//   firstName: string;
//   lastName: string;
//   email: string;
//   mobile: string;
// }

// interface Currency {
//   currencySymbol: string;
// }

// interface CustomerTransaction {
//   transactionId: string;
//   updated_at: string;
//   customerId: Customer;
//   amount: number;
//   paymentType: string;
//   userType: string;
//   currencyId: Currency;
// }

// interface Payload {
//   startDate?: string;
//   endDate?: string;
//   companyId?: string | string[];
//  customers?: string | string[];
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
//   logistics?: boolean; // boolean for true (ML) or false (OWN)
// }

// const CustomerTransactions: FC = () => {
//   const [page, setPage] = useState<number>(0);
//   const [total, setTotal] = useState<number>(0);
//   const [data, setData] = useState<CustomerTransaction[]>([]);
//   const [paymentType, setPaymentType] = useState<string>('');
//   const pageSize = 10;
//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
//   const [filters, setFilters] = useState({
//     startDate: "",
//     endDate: "",
//     companyId: "",
//     customerId: "",
//     orderNo: "",
//     orderMode: "",
//     agentId: "",
//     orderStatus: "",
//     bookedOn: "",
//     type: "",
//     bookingStatus: "",
//     paymentStatus: "",
//     paymentMethod: "",
//     logistics: "",
//     agentName: "",
//   });
//   const [selectAllCustomers, setSelectAllCustomers] = useState(false);
//   const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
//   const token = localStorage.getItem("token");
//   const [customers, setCustomers] = useState<any[]>([]);
//   const getApiUrl = useCallback(() => {
//     switch (paymentType) {
//       case 'In':
//         return `https://adminapi.flexiclean.me/api/v1/activities/orders`;
//       case 'out':
//         return `https://adminapi.flexiclean.me/api/v1/activities/outs`;
//       default:
//         return `https://adminapi.flexiclean.me/api/v1/reports/customer/payTrans`;
//     }
//   }, [paymentType]);

// const fetchCustomerTransactions = useCallback(async () => {
//   const payload: Payload = {};
//   if (selectedCustomers.length > 0) {
//     payload.customers = selectedCustomers;
//   }
//   // Add values to payload if they exist
//   const { startDate, endDate, customerId } = filters;
 
//   if (customerId)   
//     payload.customers = Array.isArray(customerId) ? customerId : [customerId];
//   if (startDate) payload.startDate = startDate;
//   if (endDate) payload.endDate = endDate;

//   try {
//     const token = localStorage.getItem('token');
//     const apiUrl = `${getApiUrl()}?pageIndex=${page}&pageSize=${pageSize}`;

//     const response = await fetch(apiUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(payload), 
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const result = await response.json();
//     console.log(result);

//     if (paymentType === 'In' && result?.data?.data) {
//       setTotal(result.data.totalCount || 0);
//       setData(result.data.data || []);
//     } else {
//       setTotal(result.totalCount || 0);
//       setData(result.data || []);
//     }
//   } catch (error) {
//     console.error('Error fetching transaction data:', error);
//   }
// }, [filters, getApiUrl, page, paymentType, selectedCustomers]);


//   useEffect(() => {
//     fetchCustomerTransactions();
//   }, [fetchCustomerTransactions]);
  
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

//         const data = await response.json();
//         if (data.status === "ok") {
//           setCustomers(data.data);
//         } else {
//           console.error("Failed to fetch data");
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchCustomers();
//   }, [token]);
//   const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setPage(0);
//     setPaymentType(e.target.value);
//   };

//   const toggleOffcanvas = (open: boolean) => () => {
//     setIsOffcanvasOpen(open);
//   };
//   const handleSelectAllCustomers = () => {
//     setSelectAllCustomers((prevSelectAll) => {
//       if (!prevSelectAll) {
//         // Select all customer IDs
//         setSelectedCustomers(customers.map((customer) => customer._id));
//       } else {
//         // Deselect all
//         setSelectedCustomers([]);
//       }
//       return !prevSelectAll;
//     });
//   };
//   const handleCheckboxChange = (id: any) => {
//     setSelectedCustomers((prevSelected) =>

//       prevSelected.includes(id)
//         ? prevSelected.filter((customerId) => customerId !== id)
//         : [...prevSelected, id]
//     );
//   };
//    const handleSave = () => {
//     fetchCustomerTransactions();
//     toggleOffcanvas(false)();
//   };
  
  
//   return (
//     <>
//       <PageTitle>CUSTOMER TRANSACTIONS</PageTitle>
//       <div>
//         <div className="d-flex justify-content-end" >
//           <button
//             className="custom-btn-verify-pending"
//             style={{ background: "#1e4894" }}
//             onClick={toggleOffcanvas(true)}
//           >
//             Filter
//           </button>
//         </div>
//         <div>
//           <div>
//             <Offcanvas
//               show={isOffcanvasOpen}
//               onHide={toggleOffcanvas(false)}
//               placement="end"
//               className="custom-offcanvas"
//               style={{ width: "500px" }}
//             >
//               <Offcanvas.Header closeButton>
//                 <Offcanvas.Title>Filter</Offcanvas.Title>
//               </Offcanvas.Header>
//               <Offcanvas.Body>
//                 <Form>
//                   <div className="d-flex justify-content-between">
//                     {/* Start Date */}
//                     <Form.Group className="mb-4">
//                       <Form.Label className="custom-label">
//                          start Date
//                       </Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={filters.startDate}
//                         onChange={(e) =>
//                           setFilters({ ...filters, startDate: e.target.value })
//                         }
//                       />
//                     </Form.Group>

//                     {/* End Date */}
//                     <Form.Group className="mb-4">
//                       <Form.Label className="custom-label">
//                          End Date
//                       </Form.Label>
//                       <Form.Control
//                         type="date"
//                         value={filters.endDate}
//                         onChange={(e) =>
//                           setFilters({ ...filters, endDate: e.target.value })
//                         }
//                       />
//                     </Form.Group>
//                   </div>
//                   <Form.Group className="mb-4">
//                     <Form.Label className="custom-label">Customer</Form.Label>
//                     <Dropdown
//                       className="w-100"
//                       style={{
//                         border: "1px solid #ced4da",
//                         borderRadius: "0.25rem",
//                       }}
//                     >
//                       <Dropdown.Toggle
//                         variant="secondary"
//                         className="w-100"
//                         style={{
//                           backgroundColor: "#f8f9fa",
//                           border: "1px solid #ced4da",
//                           color: "#495057",
//                           display: "flex",
//                           justifyContent: "space-between",
//                           alignItems: "center",
//                         }}
//                       >
//                         <span style={{ marginRight: "auto" }}>
//                           {selectedCustomers.length > 0
//                             ? "Select All"
//                             : "Select Customer"}
//                         </span>
//                       </Dropdown.Toggle>

//                       <Dropdown.Menu
//                         className="w-100"
//                         style={{
//                           maxHeight: "200px",
//                           overflowY: "auto",
//                           borderRadius: "0.25rem",
//                           boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//                         }}
//                       >
//                         <Form.Group className="px-3">
//                           <Form.Check
//                             type="checkbox"
//                             label="Select All"
//                             checked={selectAllCustomers}
//                             onChange={handleSelectAllCustomers}
//                             style={{ marginBottom: "0.5rem" }}
//                           />
//                         </Form.Group>

//                         <Dropdown.Divider style={{ margin: "0.5rem 0" }} />

//                         {customers.map((customer) => (
//                           <Form.Group
//                             key={customer._id}
//                             className="px-3"
//                             style={{ marginBottom: "0.5rem" }}
//                           >
//                             <Form.Check
//                               type="checkbox"
//                               label={`${customer.firstName} ${customer.lastName} (${customer.customerType})`}
//                               checked={selectedCustomers.includes(customer._id)}
//                               onChange={() =>
//                                 handleCheckboxChange(customer._id)
//                               }
//                             />
//                           </Form.Group>
//                         ))}
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </Form.Group>
//                 </Form>
//                  <div className="d-flex justify-content-end">
//                     <button
//                       type="button"
//                       className="btn btn-primary"
//                       onClick={handleSave}
//                     >
//                       Apply
//                     </button>
//                   </div>
//               </Offcanvas.Body>
//             </Offcanvas>
//           </div>
//         </div>
//       </div>
//       <div className="row mb-4 justify-content-end">
//         <div className="col-md-3">
//           <label htmlFor="paymentType" className="form-label fw-bold">
//             Filter by Payment Type:
//           </label>
//           <select
//             id="paymentType"
//             className="form-select"
//             value={paymentType}
//             onChange={handlePaymentTypeChange}
//           >
//             <option value="">All</option>
//             <option value="In">Pay In</option>
//             <option value="out">Pay Out</option>
//           </select>
//         </div>
//       </div>
//       <div className="table-responsive ">
//         <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4 p-2">
//           <thead>
//             <tr className="fw-bold text-muted">
//               <th className="min-w-100px">Transaction ID</th>
//               <th className="min-w-200px">Date</th>
//               <th className="min-w-200px">Customer Name</th>
//               <th className="min-w-200px">Customer Email</th>
//               <th className="min-w-200px">Customer Mobile</th>
//               <th className="min-w-100px">Amount</th>
//               <th className="min-w-100px">Payment Type</th>
//               <th className="min-w-100px">User Type</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data?.map((dt, idx) => (
//               <tr key={idx}>
//                 <td>{dt.transactionId || '-'}</td>
//                 <td>
//                   {dt.updated_at
//                     ? new Intl.DateTimeFormat('en-GB').format(new Date(dt.updated_at))
//                     : '-'}
//                 </td>
//                 <td>
//                   {dt.customerId?.firstName || '-'} {dt.customerId?.lastName || ''}
//                 </td>
//                 <td>{dt.customerId?.email || '-'}</td>
//                 <td>{dt.customerId?.mobile || '-'}</td>
//                 <td>

//                   {typeof dt.amount === 'number' ? (
//                     <>
//                       {dt.amount >= 0 ? (
//                         <AiOutlineArrowUp color="green" size={24} />
//                       ) : (
//                         <AiOutlineArrowDown color="red" size={24} />
//                       )}
//                       {dt.currencyId?.currencySymbol || ''}
//                       {dt.amount > 0
//                         ? '+' + dt.amount
//                         : dt.amount < 0
//                           ? dt.amount.toString()
//                           : '0'}
//                     </>
//                   ) : (
//                     '-'
//                   )}
//                 </td>

//                 <td>{dt.paymentType || '-'}</td>
//                 <td>{dt.userType || '-'}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="pagewrapper">
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
// import { Offcanvas, Form,  } from 'react-bootstrap';

// interface Customer {
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
//   orderId: any;
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
//   paymentMethod?: string;
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
//   const [paymentType, setPaymentType] = useState<string>('out'); // '' | 'In' | 'out'
//   const pageSize = 10;
//   const [isOffcanvasOpen, setIsOffcanvasOpen] = useState<boolean>(false);
//   const [filters, setFilters] = useState({
//     startDate: '',
//     endDate: '',
//     customerId: '',
//   });
//   const [selectAllCustomers, setSelectAllCustomers] = useState(false);
//   const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
//   const token = localStorage.getItem('token');
//   const [customers, setCustomers] = useState<any[]>([]);

//   const fetchCustomerTransactions = useCallback(async () => {
//     const payload: Payload = {
//       type: paymentType as 'in' | 'out',
//     };
//     if (selectedCustomers.length > 0) {
//       payload.customers = selectedCustomers;
//     }
//     if (filters.startDate) payload.startDate = filters.startDate;
//     if (filters.endDate) payload.endDate = filters.endDate;

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
//     setPaymentType(e.target.value);
//   };

//   const handleSelectAllCustomers = () => {
//     setSelectAllCustomers((prev) => {
//       if (!prev) {
//         setSelectedCustomers(customers.map((c) => c._id));
//       } else {
//         setSelectedCustomers([]);
//       }
//       return !prev;
//     });
//   };

//   const handleCheckboxChange = (id: string) => {
//     setSelectedCustomers((prev) =>
//       prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
//     );
//   };

//   const handleSave = () => {
//     fetchCustomerTransactions();
//     toggleOffcanvas(false)();
//   };

//   return (
//     <>
//       <PageTitle>CUSTOMER TRANSACTIONS</PageTitle>

//       <div className="d-flex justify-content-end mb-3">
//         <button
//           className="btn btn-primary"
//           onClick={toggleOffcanvas(true)}
//         >
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
//                   onChange={(e) =>
//                     setFilters({ ...filters, startDate: e.target.value })
//                   }
//                 />
//               </Form.Group>
//               <Form.Group className="mb-4">
//                 <Form.Label>End Date</Form.Label>
//                 <Form.Control
//                   type="date"
//                   value={filters.endDate}
//                   onChange={(e) =>
//                     setFilters({ ...filters, endDate: e.target.value })
//                   }
//                 />
//               </Form.Group>
//             </div>

//            <Form.Group className="mb-3">
//               <Form.Label>Customer</Form.Label>
//               <Select
//                 options={customers.map((c) => ({ value: c._id, label: `${c.firstName} ${c.lastName}` }))}
//                 isMulti
//                 value={customers
//                   .filter((c) => filters.customerIds.includes(c._id))
//                   .map((c) => ({ value: c._id, label: `${c.firstName} ${c.lastName}` }))}
//                 onChange={(selected) =>
//                   setFilters((prev) => ({ ...prev, customerIds: selected.map((s) => s.value) }))
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
//             {data?.map((dt, idx) => (
//               <tr key={idx}>
//                 {paymentType === 'out' ? (
//                   <>
//                     <td>{dt.orderId?.orderNo || '-'}</td>
                    
//                     <td>    {dt.orderId?.orderDate
//                         ? new Intl.DateTimeFormat('en-GB').format(new Date(dt.orderId?.orderDate))
//                         : '-'}</td>
//                     <td>{dt.orderId?.companyId?.companyName|| '-'}</td>
//                     <td>
//                       {dt.customerId?.firstName} {dt.customerId?.lastName}
//                     </td>
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
//                     <td>
//                       {dt.customerId?.firstName} {dt.customerId?.lastName}
//                     </td>
//                     <td>{dt.type || '-'}</td>
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
