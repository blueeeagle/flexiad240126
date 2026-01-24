// import { FC, ReactNode, useEffect, useState } from 'react';
// import axios from 'axios';
// import { KTIcon } from '../../../../_metronic/helpers';
// import { useNavigate } from 'react-router-dom';

// interface StatusWiseOrder {
//   status: string;
//   count: number;
// }

// interface OrderCountItem {
//   statusWiseOrders: StatusWiseOrder[];
// }

// interface Currency {
//   currencySymbol: string;
// }

// interface CompanyDetails {
//   companyName: string;
// }

// interface AddressDetails {
//   street: string;
//   building: string;
//   block: string;
//   others: string;
//   countryId: string;
// }

// interface OrderPayment {
//   orderNo: string;
//   orderDate: string;
//   firstName: string;
//   lastName: string;
//   orderAmount: number;
//   paymentMode: string;
//   companyDetails: CompanyDetails;
//   currencyId: Currency;
//   addressDetails: AddressDetails;
// }

// interface QuickInfoProps {
//   data: {
//     orderCount?: OrderCountItem[];
//     payoutCount?: number;
//     pickupCounts?:any[];
//     bankVerficationCount?: number;
//     orderPayments?: OrderPayment[];
//   } | null;
//   onAgentSelect: (agentId: string) => void;
// }


// interface Agent {
//   companyName: ReactNode;
//   _id: string | number | readonly string[] | undefined;
//   id: number;
//   name: string;
// }

// // Helper function to get the count of orders by status, defaulting to 0 if not found
// const getStatusCount = (data: QuickInfoProps['data'], status: string): number => {
//   return data?.orderCount?.[0]?.statusWiseOrders?.find(item => item.status === status)?.count ?? 0;
// };

// // Icon map per status (extend as needed)
// const statusIconMap: Record<string, { icon: string; iconClass: string }> = {
//   Completed: { icon: 'check-circle', iconClass: 'text-success' },
//   'Pick Up': { icon: 'truck', iconClass: 'text-warning' },
//   Received: { icon: 'package', iconClass: 'text-info' },
//   Booked: { icon: 'calendar', iconClass: 'text-primary' },
//   Cancelled: { icon: 'cross-circle', iconClass: 'text-danger' },
//   Delivered: { icon: 'gift', iconClass: 'text-success' },
// };

// const InfoCard: FC<{ icon: string; iconClass: string; title: string; value: number }> = ({
//   icon,
//   iconClass,
//   title,
//   value,
// }) => (
//   <div className="col-md-6">
//     <div className="d-flex align-items-center bg-white p-4 rounded shadow-sm h-100">
//       <div className="symbol symbol-50px me-4">
//         <div className="symbol-label bg-light">
//           <KTIcon iconName={icon} className={`fs-1 ${iconClass}`} />
//         </div>
//       </div>
//       <div className="d-flex justify-content-between w-100 gap-4">
//         <div className="fs-6 text-black">{title}</div>
//         <div className="fs-4 text-gray-900 fw-bold">{value}</div>
//       </div>
//     </div>
//   </div>
// );

// const StatBox: FC<{ title: string; value: string | number; bg: string ;onClick?: () => void}> = ({ title, value, bg,onClick }) => (
//   <div className="col-md-6"   style={{ cursor: onClick ? 'pointer' : 'default' }}  onClick={onClick}>
//     <div className={`d-flex justify-content-between align-items-center p-4 bg-light-${bg} rounded shadow-sm`}>
//       <span className="fw-semibold text-gray-800">{title}</span>
//       <span className={`fw-bold text-${bg}`}>{value}</span>
//     </div>
//   </div>
// );

// const QuickInfo: FC<QuickInfoProps> = ({ data, onAgentSelect }) => {
//   console.log(data);
  
//   const [agents, setAgents] = useState<Agent[]>([]);
//   const [selectedAgent, setSelectedAgent] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate()
//   useEffect(() => {
//     const fetchAgents = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) return setError('No token found');

//       try {
//         setLoading(true);
//         const response = await axios.get('https://adminapi.flexiclean.me/api/v1/agent/dropdown', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         setAgents(response.data.data);
//         setError('');
//       } catch (err) {
//         console.error('Failed to fetch agents', err);
//         setError('Failed to load agents');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAgents();
//   }, []);

//   const handleAgentChange = (agentId: string) => {
//     setSelectedAgent(agentId);
//     onAgentSelect(agentId);
//   };
//   const handleOrder = (orderNo: string) => {
//     navigate(`/customer/order/${orderNo}`)
//   }

//   const statusWiseOrders = data?.orderCount?.[0]?.statusWiseOrders ?? [];
//   const totalOrders = statusWiseOrders.reduce((sum, order) => sum + order.count, 0);
// console.log(data?.pickupCounts,"dftg");

//   return (
//     <div className="row g-6">
//       {/* Left Panel */}
//       <div className="col-xl-6 d-flex flex-column gap-10">
//         {/* Agent Selector & Info Cards */}
//         <div className="card card-flush p-6 shadow-sm">
//           <div className="d-flex justify-content-between align-items-center mb-5">
//             <h3 className="fw-bold">Quick Info</h3>
//             <div className="d-flex flex-column">
//               <select
//                 className="form-select form-select-sm w-150px shadow-sm"
//                 value={selectedAgent}
//                 onChange={(e) => handleAgentChange(e.target.value)}
//               >
//                 <option value="">All Agents</option>
//                 {agents.map((agent) => (
//                   <option key={agent.id} value={agent._id}>
//                     {agent.companyName}
//                   </option>
//                 ))}
//               </select>
//               {error && <span className="text-danger small">{error}</span>}
//               {loading && <span className="text-muted small">Loading...</span>}
//             </div>
//           </div>

//           <div className="row g-4">
//             <InfoCard icon="handcart" iconClass="text-primary" title="Total Orders" value={totalOrders} />

//             {['Booked', 'Cancelled', 'Completed', 'Pick Up', 'Delivered', 'Received'].map((status) => {
//               const count = getStatusCount(data, status);
//               const iconData = statusIconMap[status] || { icon: 'dots', iconClass: 'text-muted' };
//               return (
//                 <InfoCard
//                   key={status}
//                   icon={iconData.icon}
//                   iconClass={iconData.iconClass}
//                   title={status}
//                   value={count}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         {/* Stat Boxes */}
//         <div className="card card-flush p-6 shadow-sm">
//           <div className="row g-4">
//             {/* <StatBox title="Pay In Approvals" value="0" bg="warning" /> */}
//             <StatBox title="Pay Out Approvals" value={data?.payoutCount ?? 0} bg="success" onClick={() => navigate('/activities/agentPayOut?status=pending')}  />
//             <StatBox title="My Pickup Request" value={data?.pickupCounts?.[0]?.count??0} bg="danger"  onClick={() => navigate('/activities/orders?orderstatus=Booked')}/>
//             <StatBox title="My Delivery Request"value={data?.pickupCounts?.[1]?.count??0}bg="info"  onClick={() => navigate('/activities/orders?orderstatus=Ready')} />
//             <StatBox title="Bank Verification" value={data?.bankVerficationCount ?? 0} bg="primary" onClick={() => navigate('/agent/list?bankVerified=false')} />
//           </div>
//         </div>
//       </div>

//       {/* Right Panel */}
//       <div className="col-xl-6">
//         <div className="card card-flush p-6 shadow-sm">
//           <div className="d-flex justify-content-between align-items-center mb-4">
//             <h4 className="fw-bold">Order Payments</h4>
//           </div>

//           <div className="row g-4">
//             {data?.orderPayments?.length ? (
//               data.orderPayments.map((payment, index) => (
//                 <div key={index} className="col-12  mb-1 rounded " style={{ cursor: 'pointer' }} onClick={() => handleOrder(payment.orderNo)}  >
//                   <>
//                     <style>{`
//                        .custom-hover {
//                                  background-color: #6c757d; /* Bootstrap bg-secondary */
//                                  color: white;
//                                  padding: 1rem;
//                                 border-radius: 0.25rem;
//                                 box-shadow: 0 .125rem .25rem rgba(0,0,0,.075);
//                                 transition: background-color 0.3s ease;
//                              }

//                          .custom-hover:hover {
//                                background-color: #5a6268; /* Slightly darker on hover */
//                             }
//                         `}</style>
//                     <div className=" custom-hover p-4 rounded shadow-sm">
//                       <div className="d-flex justify-content-between mb-2">
//                         <div className="fw-bold text-dark">Order No: {payment.orderNo}</div>
//                         <span className="badge bg-warning text-dark">Pending</span>
//                       </div>

//                       <div className="text-muted mb-2">
//                         <div>
//                           <strong>Customer:</strong> {payment.firstName} {payment.lastName}
//                         </div>
//                         <div>
//                           <strong>Company:</strong> {payment.companyDetails?.companyName ?? 'N/A'}
//                         </div>
//                       </div>

//                       <div className="d-flex justify-content-between">
//                         <div>
//                           <strong>Payment Mode:</strong> {payment.paymentMode}
//                         </div>
//                         <div className="fw-bold">
//                           {payment.currencyId?.currencySymbol ?? 'BD'} {payment.orderAmount}
//                         </div>
//                       </div>
//                     </div>
//                   </>
//                 </div>
//               ))
//             ) : (
//               <div className="text-muted ps-2">No order payments found.</div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuickInfo;




// import { FC, ReactNode, useEffect, useState } from 'react';
// import axios from 'axios';
// import { KTIcon } from '../../../../_metronic/helpers';
// import { useNavigate } from 'react-router-dom';

// interface StatusWiseOrder {
//   status: string;
//   count: number;
// }

// interface OrderCountItem {
//   statusWiseOrders: StatusWiseOrder[];
// }

// interface Currency {
//   currencySymbol: string;
// }

// interface CompanyDetails {
//   companyName: string;
// }

// interface AddressDetails {
//   street: string;
//   building: string;
//   block: string;
//   others: string;
//   countryId: string;
// }

// interface OrderPayment {
//   orderNo: string;
//   orderDate: string;
//   firstName: string;
//   lastName: string;
//   orderAmount: number;
//   paymentMode: string;
//   companyDetails: CompanyDetails;
//   currencyId: Currency;
//   addressDetails: AddressDetails;
// }

// interface QuickInfoProps {
//   data: {
//     orderCount?: OrderCountItem[];
//     payoutCount?: number;
//     pickupCounts?: any[];
//     bankVerficationCount?: number;
//     orderPayments?: OrderPayment[];
//   } | null;
//   onAgentSelect: (agentId: string) => void;
// }

// interface Agent {
//   companyName: ReactNode;
//   _id: string | number | readonly string[] | undefined;
//   id: number;
//   name: string;
// }

// const getStatusCount = (data: QuickInfoProps['data'], status: string): number =>
//   data?.orderCount?.[0]?.statusWiseOrders?.find((item) => item.status === status)?.count ?? 0;

// const statusIconMap: Record<string, { icon: string; iconClass: string }> = {
//   Completed: { icon: 'check-circle', iconClass: 'text-success' },
//   'Pick Up': { icon: 'truck', iconClass: 'text-warning' },
//   Received: { icon: 'package', iconClass: 'text-info' },
//   Booked: { icon: 'calendar', iconClass: 'text-primary' },
//   Cancelled: { icon: 'cross-circle', iconClass: 'text-danger' },
//   Delivered: { icon: 'gift', iconClass: 'text-success' },
// };

// const InfoCard: FC<{ icon: string; iconClass: string; title: string; value: number }> = ({
//   icon,
//   iconClass,
//   title,
//   value,
// }) => (
//   <div className="col-md-6 col-lg-4">
//     <div className="d-flex align-items-center p-4 rounded bg-light shadow-sm hover-shadow-sm h-100 transition">
//       <div className="symbol symbol-50px me-4">
//         <div className="symbol-label bg-light-primary">
//           <KTIcon iconName={icon} className={`fs-1 ${iconClass}`} />
//         </div>
//       </div>
//       <div className="flex-grow-1">
//         <div className="fw-semibold text-gray-700">{title}</div>
//         <div className="fs-5 fw-bold text-dark">{value}</div>
//       </div>
//     </div>
//   </div>
// );

// const StatBox: FC<{
//   title: string;
//   value: string | number;
//   bg: string;
//   onClick?: () => void;
// }> = ({ title, value, bg, onClick }) => (
//   <div className="col-sm-6 col-md-6" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
//     <div className={`p-4 bg-${bg}-light rounded shadow-sm transition hover-shadow-sm`}>
//       <div className="d-flex justify-content-between align-items-center">
//         <span className="fw-semibold text-dark">{title}</span>
//         <span className={`fw-bold text-${bg}`}>{value}</span>
//       </div>
//     </div>
//   </div>
// );

// const QuickInfo: FC<QuickInfoProps> = ({ data, onAgentSelect }) => {
//   const [agents, setAgents] = useState<Agent[]>([]);
//   const [selectedAgent, setSelectedAgent] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string>('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchAgents = async () => {
//       const token = localStorage.getItem('token');
//       if (!token) return setError('No token found');

//       try {
//         setLoading(true);
//         const response = await axios.get('https://adminapi.flexiclean.me/api/v1/agent/dropdown', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json',
//           },
//         });
//         setAgents(response.data.data);
//         setError('');
//       } catch (err) {
//         console.error('Failed to fetch agents', err);
//         setError('Failed to load agents');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAgents();
//   }, []);

//   const handleAgentChange = (agentId: string) => {
//     setSelectedAgent(agentId);
//     onAgentSelect(agentId);
//   };

//   const statusWiseOrders = data?.orderCount?.[0]?.statusWiseOrders ?? [];
//   const totalOrders = statusWiseOrders.reduce((sum, order) => sum + order.count, 0);

//   return (
//     <div className="row g-6">
//       <div className="col-xl-8">
//         <div className="card card-flush p-6 shadow-sm">
//           <div className="d-flex justify-content-between align-items-center mb-5">
//             <h3 className="fw-bold mb-0">Quick Info</h3>
//             <select
//               className="form-select form-select-sm w-200px"
//               value={selectedAgent}
//               onChange={(e) => handleAgentChange(e.target.value)}
//             >
//               <option value="">All Agents</option>
//               {agents.map((agent) => (
//                 <option key={agent.id} value={agent._id}>
//                   {agent.companyName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {error && <span className="text-danger small">{error}</span>}
//           {loading && <span className="text-muted small">Loading...</span>}

//           <div className="row g-4">
//             <InfoCard icon="handcart" iconClass="text-primary" title="Total Orders" value={totalOrders} />
//             {['Booked', 'Cancelled', 'Completed', 'Pick Up', 'Delivered', 'Received'].map((status) => {
//               const count = getStatusCount(data, status);
//               const iconData = statusIconMap[status] || { icon: 'dots', iconClass: 'text-muted' };
//               return (
//                 <InfoCard
//                   key={status}
//                   icon={iconData.icon}
//                   iconClass={iconData.iconClass}
//                   title={status}
//                   value={count}
//                 />
//               );
//             })}
//           </div>
//         </div>

//         <div className="card card-flush p-6 shadow-sm mt-6">
//           <div className="row g-4">
//             <StatBox
//               title="Pay Out Approvals"
//               value={data?.payoutCount ?? 0}
//               bg="success"
//               onClick={() => navigate('/activities/agentPayOut?status=pending')}
//             />
//             <StatBox
//               title="My Pickup Request"
//               value={data?.pickupCounts?.[0]?.count ?? 0}
//               bg="danger"
//               onClick={() => navigate('/activities/orders?orderstatus=Booked')}
//             />
//             <StatBox
//               title="My Delivery Request"
//               value={data?.pickupCounts?.[1]?.count ?? 0}
//               bg="info"
//               onClick={() => navigate('/activities/orders?orderstatus=Ready')}
//             />
//             <StatBox
//               title="Bank Verification"
//               value={data?.bankVerficationCount ?? 0}
//               bg="primary"
//               onClick={() => navigate('/agent/list?bankVerified=false')}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuickInfo;




import { FC, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { KTIcon } from '../../../../_metronic/helpers';
import { useNavigate } from 'react-router-dom';

interface StatusWiseOrder {
  status: string;
  count: number;
}

interface OrderCountItem {
  statusWiseOrders: StatusWiseOrder[];
}

interface Currency {
  currencySymbol: string;
}

interface CompanyDetails {
  companyName: string;
}

interface AddressDetails {
  street: string;
  building: string;
  block: string;
  others: string;
  countryId: string;
}

interface OrderPayment {
  orderNo: string;
  orderDate: string;
  firstName: string;
  lastName: string;
  orderAmount: number;
  paymentMode: string;
  companyDetails: CompanyDetails;
  currencyId: Currency;
  addressDetails: AddressDetails;
}

interface QuickInfoProps {
  data: {
    orderCount?: OrderCountItem[];
    payoutCount?: number;
    pickupCounts?: any[];
    bankVerficationCount?: number;
    orderPayments?: OrderPayment[];
  } | null;
  onAgentSelect: (agentId: string) => void;
}

interface Agent {
  companyName: ReactNode;
  _id: string | number | readonly string[] | undefined;
  id: number;
  name: string;
}

const getStatusCount = (data: QuickInfoProps['data'], status: string): number =>
  data?.orderCount?.[0]?.statusWiseOrders?.find((item) => item.status === status)?.count ?? 0;

const statusIconMap: Record<string, { icon: string; iconClass: string }> = {
  Completed: { icon: 'check-circle', iconClass: 'text-success' },
  'Pick Up': { icon: 'truck', iconClass: 'text-warning' },
  Received: { icon: 'package', iconClass: 'text-info' },
  Booked: { icon: 'calendar', iconClass: 'text-primary' },
  Cancelled: { icon: 'cross-circle', iconClass: 'text-danger' },
  Delivered: { icon: 'gift', iconClass: 'text-success' },
};

const InfoCard: FC<{ icon: string; iconClass: string; title: string; value: number }> = ({
  icon,
  iconClass,
  title,
  value,
}) => (
  <div className="col-md-6 col-lg-6">
    <div className="d-flex align-items-center p-4 rounded bg-light shadow-sm hover-shadow-sm h-100 transition">
      <div className="symbol symbol-50px me-4">
        <div className="symbol-label bg-light-primary">
          <KTIcon iconName={icon} className={`fs-1 ${iconClass}`} />
        </div>
      </div>
      <div className="flex-grow-1">
        <div className="fw-semibold text-gray-700">{title}</div>
        <div className="fs-5 fw-bold text-dark">{value}</div>
      </div>
    </div>
  </div>
);

const StatBox: FC<{
  title: string;
  value: string | number;
  bg: string;
  onClick?: () => void;
}> = ({ title, value, bg, onClick }) => (
  <div className="col-12 mb-4" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
    <div className={`p-4 bg-${bg}-light rounded shadow-sm transition hover-shadow-sm`}>
      <div className="d-flex justify-content-between align-items-center">
        <span className="fw-semibold text-dark">{title}</span>
        <span className={`fw-bold text-${bg}`}>{value}</span>
      </div>
    </div>
  </div>
);

const QuickInfo: FC<QuickInfoProps> = ({ data, onAgentSelect }) => {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAgents = async () => {
      const token = localStorage.getItem('token');
      if (!token) return setError('No token found');

      try {
        setLoading(true);
        const response = await axios.get('https://adminapi.flexiclean.me/api/v1/agent/dropdown', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        setAgents(response.data.data);
        setError('');
      } catch (err) {
        console.error('Failed to fetch agents', err);
        setError('Failed to load agents');
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleAgentChange = (agentId: string) => {
    setSelectedAgent(agentId);
    onAgentSelect(agentId);
  };

  const statusWiseOrders = data?.orderCount?.[0]?.statusWiseOrders ?? [];
  const totalOrders = statusWiseOrders.reduce((sum, order) => sum + order.count, 0);

  return (
    <>
      {/* Header Section with Dropdown */}
      <div className="d-flex justify-content-between align-items-center mb-6">
        <h3 className="fw-bold mb-0">Quick Info</h3>
        <select
          className="form-select form-select-sm w-200px"
          value={selectedAgent}
          onChange={(e) => handleAgentChange(e.target.value)}
        >
          <option value="">All Agents</option>
          {agents.map((agent) => (
            <option key={agent.id} value={agent._id}>
              {agent.companyName}
            </option>
          ))}
        </select>
      </div>
      {error && <span className="text-danger small">{error}</span>}
      {loading && <span className="text-muted small">Loading...</span>}

      {/* Main Split Layout */}
      <div className="row">
        {/* Left Column - Order Info Cards */}
        <div className="col-lg-8">
          <div className="row g-4">
            <InfoCard icon="handcart" iconClass="text-primary" title="Total Orders" value={totalOrders} />
            {['Booked', 'Cancelled', 'Completed', 'Pick Up', 'Delivered', 'Received'].map((status) => {
              const count = getStatusCount(data, status);
              const iconData = statusIconMap[status] || { icon: 'dots', iconClass: 'text-muted' };
              return (
                <InfoCard
                  key={status}
                  icon={iconData.icon}
                  iconClass={iconData.iconClass}
                  title={status}
                  value={count}
                />
              );
            })}
          </div>
        </div>

        {/* Right Column - Stat Boxes */}
        <div className="col-lg-4">
          <StatBox
            title="Pay Out Approvals"
            value={data?.payoutCount ?? 0}
            bg="success"
            onClick={() => navigate('/activities/agentPayOut?status=pending')}
          />
          <StatBox
            title="My Pickup Request"
            value={data?.pickupCounts?.[0]?.count ?? 0}
            bg="danger"
            onClick={() => navigate('/activities/orders?orderstatus=Booked')}
          />
          <StatBox
            title="My Delivery Request"
            value={data?.pickupCounts?.[1]?.count ?? 0}
            bg="info"
            onClick={() => navigate('/activities/orders?orderstatus=Ready')}
          />
          <StatBox
            title="Bank Verification"
            value={data?.bankVerficationCount ?? 0}
            bg="primary"
            onClick={() => navigate('/agent/list?bankVerified=false')}
          />
        </div>
      </div>
    </>
  );
};

export default QuickInfo;
