import { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";

import { StatisticsWidget5 } from "../../../_metronic/partials/widgets";

const Reports: FC = () => {
  return (
    <>
      <PageTitle>REPORTS</PageTitle>

      <div className="row g-5 g-xl-8">
        <div className="row g-5 col-xl-12">
          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="AGENT TRANSACTIONS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/reports/agentTransactions`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="card-xl-stretch mb-5 mb-xl-8"
              svgIcon=""
              color="light-warning"
              iconColor="black"
              title="CUSTOMER TRANSACTIONS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/reports/customerTransactions`}
            />
          </div>
          <div className="col-xl-4">
            <StatisticsWidget5
              className="card-xl-stretch mb-5 mb-xl-8"
              svgIcon=""
              color="light-warning"
              iconColor="black"
              title="PAYMENT TRANSACTIONS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/reports/paymentTransactions`}
            />
          </div>
          {/* <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="M CREDITS PACKAGE TRANSACTIONS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/reports/mcreditsTransactions`}
            />
          </div> */}

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="REFERRAL TRANSACTIONS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/reports/referralTransactions`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="DISCOUNT TRANSACTIONS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/reports/discountTransactions`}
            />
          </div>

          {/* <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="OVERALL TRANSACTIONS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/reports/overallTransactions`}
            />
          </div> */}

          {/* <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title={`STATS`}
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/reports/stats`}
            />
          </div> */}

          {/* <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title={`ACTIVITY LOG`}
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/reports/activityLog`}
            />
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Reports;
