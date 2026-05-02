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
//   <div className="col-md-6 col-lg-6">
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
//   <div className="col-12 mb-4" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
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
//     <>
//       {/* Header Section with Dropdown */}
//       <div className="d-flex justify-content-between align-items-center mb-6">
//         <h3 className="fw-bold mb-0">Quick Info</h3>
//         <select
//           className="form-select form-select-sm w-200px"
//           value={selectedAgent}
//           onChange={(e) => handleAgentChange(e.target.value)}
//         >
//           <option value="">All Agents</option>
//           {agents.map((agent) => (
//             <option key={agent.id} value={agent._id}>
//               {agent.companyName}
//             </option>
//           ))}
//         </select>
//       </div>
//       {error && <span className="text-danger small">{error}</span>}
//       {loading && <span className="text-muted small">Loading...</span>}

//       {/* Main Split Layout */}
//       <div className="row">
//         {/* Left Column - Order Info Cards */}
//         <div className="col-lg-8">
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

//         {/* Right Column - Stat Boxes */}
//         <div className="col-lg-4">
//           <StatBox
//             title="Pay Out Approvals"
//             value={data?.payoutCount ?? 0}
//             bg="success"
//             onClick={() => navigate('/activities/agentPayOut?status=pending')}
//           />
//           <StatBox
//             title="My Pickup Request"
//             value={data?.pickupCounts?.[0]?.count ?? 0}
//             bg="danger"
//             onClick={() => navigate('/activities/orders?orderstatus=Booked')}
//           />
//           <StatBox
//             title="My Delivery Request"
//             value={data?.pickupCounts?.[1]?.count ?? 0}
//             bg="info"
//             onClick={() => navigate('/activities/orders?orderstatus=Ready')}
//           />
//           <StatBox
//             title="Bank Verification"
//             value={data?.bankVerficationCount ?? 0}
//             bg="primary"
//             onClick={() => navigate('/agent/list?bankVerified=false')}
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default QuickInfo;
import { FC, ReactNode, useEffect, useState } from 'react';
import axios from 'axios';
import { KTIcon } from '../../../../_metronic/helpers';
import { useNavigate } from 'react-router-dom';
import { getDashboardPermissions } from '../../../utils/getPermissions';

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

  // Permissions
  const permissions = getDashboardPermissions();
  const canView = permissions.includes("view");
  const canEdit = permissions.includes("edit");
  const canDelete = permissions.includes("delete");
  const canCreate = permissions.includes("create");

  console.log("QuickInfo Permissions:", { canView, canEdit, canDelete, canCreate });

  // Block component if user cannot view
  // if (!canView) {
  //   return (
  //     <div className="alert alert-warning">
  //       You don't have permission to view this dashboard widget.
  //     </div>
  //   );
  // }

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