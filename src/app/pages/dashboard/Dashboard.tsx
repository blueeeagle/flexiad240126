import { FC, useCallback, useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import { PageTitle } from '../../../_metronic/layout/core';
import RegisterList from './include/RegisterList';
import QuickInfo from './include/QuickInfo';
import {
  StatisticsWidget5,
  StatisticsWidget1,
} from '../../../_metronic/partials/widgets';
import CountryDropdown from './CountryDropdown';
import { useNavigate } from 'react-router-dom';

interface StatusWiseOrder {
  status: string;
  count: number;
}

interface OrderCountItem {
  statusWiseOrders: StatusWiseOrder[];
}

interface OrderPayment {
  orderNo: string;
  orderDate: string;
  firstName: string;
  lastName: string;
  orderAmount: number;
  paymentMode: string;
  companyDetails: {
    companyName: string;
  };
  currencyId: {
    currencySymbol: string;
  };
  addressDetails: {
    street: string;
    building: string;
    block: string;
    others: string;
    countryId: string;
  };
}

interface DashboardData {
  totalCustomers: number;
  totalAgents: number;
  totalOrderAmount: number;
  payoutAmount: number;
  netRevenue: number;
  grossPayments: number;
  recentCustomers?: any[];
  recentAgents?: any[];
  data: any[];

  orderCount?: OrderCountItem[];
  payoutCount?: number;
  bankVerificationCount?: number;
  orderPayments?: OrderPayment[];
}

const Dashboard: FC = () => {
  // const navigate=useNavigate()

  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const intl = useIntl();
  const [body, setBody] = useState<{ countryId: string; agentId?: string }>({
    countryId: '6566946881f360c33361e259',
  });

  const handleCountrySelect = (countryId: string) => {
    setBody((prev) => ({ ...prev, countryId }));
  };

  const handleAgentSelect = (agentId: string) => {
    setBody((prev) => ({ ...prev, agentId: agentId || undefined }));
  };

  const fetchDashboard = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const response = await fetch(
        'https://adminapi.flexiclean.me/api/v1/reports/dashboard',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result: { data: DashboardData } = await response.json();
      console.log(result, "dashb");

      setData(result?.data ?? null);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setData(null);
    }
  }, [body]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: 'MENU.DASHBOARD' })}
      </PageTitle>
      {error && <div className="alert alert-danger">{error}</div>}
      <DashboardContent
        data={data}
        onCountrySelect={handleCountrySelect}
        onAgentSelect={handleAgentSelect}
      />
    </>
  );
};

interface DashboardContentProps {
  data: DashboardData | null;
  onCountrySelect: (countryId: string) => void;
  onAgentSelect: (agentId: string) => void;
}

const DashboardContent: FC<DashboardContentProps> = ({
  data,
  onCountrySelect,
  onAgentSelect,
}) => {
  if (!data) {
    return <div>Loading...</div>; // Display loading if data is null
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate()
  const {
    totalCustomers,
    totalAgents,
    grossPayments,
    payoutAmount,
    netRevenue,
    recentCustomers = [],
    recentAgents = [],
  } = data;
  return (
    <>
      <div className="w-100 d-flex justify-content-end align-items-end mb-5">
        <CountryDropdown onCountrySelect={onCountrySelect} />
      </div>

      <div className="row g-5 g-xl-8">
        <div className="row g-4">
          {/* Customers */}
          <div className="col-12 col-md-6 col-lg-3">
            <div onClick={() => navigate("/customer/list")} className="h-100 cursor-pointer">
              <StatisticsWidget5
                className="card h-100 shadow-sm border-0"
                svgIcon="basket"
                color="danger"
                iconColor="white"
                title="Customers"
                titleColor="white"
                description={totalCustomers.toString()}
                descriptionColor="white"
              />
            </div>
          </div>

          {/* Agents */}
          <div className="col-12 col-md-6 col-lg-3">
            <div onClick={() => navigate("/agent/list")} className="h-100 cursor-pointer">
              <StatisticsWidget5
                className="card h-100 shadow-sm border-0"
                svgIcon="chart-simple-3"
                color="success"
                iconColor="white"
                title="Agents"
                titleColor="white"
                description={totalAgents.toString()}
                descriptionColor="white"
              />
            </div>
          </div>

          {/* Gross Collection */}
          <div className="col-12 col-sm-6 col-lg-2">
            <StatisticsWidget1
              className="card h-100 shadow-sm border-0 text-center"
              image="abstract-4.svg"
              title="Gross Collection"
              time={`${grossPayments ?? 0} BHD`}
              description=""
            />
          </div>

          {/* Payment Paid */}
          <div className="col-12 col-sm-6 col-lg-2">
            <StatisticsWidget1
              className="card h-100 shadow-sm border-0 text-center"
              image="abstract-2.svg"
              title="Payment Paid"
              time={`${payoutAmount ?? 0} BHD`}
              description=""
            />
          </div>

          {/* Net Revenue */}
          <div className="col-12 col-sm-6 col-lg-2">
            <StatisticsWidget1
              className="card h-100 shadow-sm border-0 text-center"
              image="abstract-1.svg"
              title="Net Revenue"
              time={`${netRevenue ?? 0} BHD`}
              description=""
            />
          </div>
        </div>

        <div className="d-flex justify-content-center align-items-center mt-5">
          <div className="col-xl-12">
            <RegisterList
              data={{
                recentCustomers,
                recentAgents,
              }}
            />
          </div>
        </div>

        <div className="row g-5 g-xl-8 mt-5">
          <QuickInfo data={data} onAgentSelect={onAgentSelect} />

        </div>
      </div>
    </>
  );
};

export { Dashboard };
