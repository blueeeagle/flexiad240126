import { FC } from "react";
import { useParams } from "react-router-dom";

import { StatisticsWidget5 } from "../../../_metronic/partials/widgets";

const AgentUpdate: FC = () => {
  const { agentId } = useParams();
  const searchParams = new URLSearchParams(window.location.search);
  const paramsObject = Object.fromEntries(searchParams.entries());

  const queryString = new URLSearchParams(paramsObject).toString();

  return (
    <>
      <div className="row g-5 g-xl-8">
        <div className="row g-5 col-xl-12">
          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="COMPANY"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/agent/${agentId}/profile`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="card-xl-stretch mb-5 mb-xl-8"
              svgIcon=""
              color="light-warning"
              iconColor="black"
              title="LOCATION & CHARGES"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/agent/${agentId}/locationCharges`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="TIMESLOTS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/agent/${agentId}/timeslots`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="USERS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/agent/${agentId}/users`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="MY SUBSCRIPTIONS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/agent/${agentId}/subscriptions`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="ITEMS PRICING"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/agent/${agentId}/items`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="WALLETS & PAYOUTS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/agent/${agentId}/wallet?${queryString}`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="ORDERS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/agent/${agentId}/orders`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="STATS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/agent/${agentId}/stats`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="REVIEW & RATINGS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/agent/${agentId}/ratings`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AgentUpdate;
