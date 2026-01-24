import { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";

import { StatisticsWidget5 } from "../../../_metronic/partials/widgets";

const Activity: FC = () => {
  return (
    <>
      <PageTitle>ACTIVITIES</PageTitle>

      <div className="row g-5 g-xl-8">
        <div className="row g-5 col-xl-12">
          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="M CREDIT"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/activities/mcreditlist`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="card-xl-stretch mb-5 mb-xl-8"
              svgIcon=""
              color="light-warning"
              iconColor="black"
              title="DISCOUNTS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/activities/discounts`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="REFERRALS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/activities/referrals`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="GIFT CARDS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/activities/giftCards`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="BANNERS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/activities/banners`}
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
              url={`/activities/orders`}
            />
          </div>

          {/* <div className='col-xl-4'>
                       <StatisticsWidget5
                           className='mb-xl-4'
                           svgIcon=''
                           color='light-warning'
                           iconColor='white'
                           title={`AGENT PAYIN'S`}
                           titleColor='black'
                           description=''
                           descriptionColor='white'
                           url={`/activities/agentPayIn/:driverId`}
                       />
                   </div> */}

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title={`AGENT PAYOUT'S`}
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/activities/agentPayOut/`}
            />
          </div>

          <div className="col-xl-4">
            <StatisticsWidget5
              className="mb-xl-4"
              svgIcon=""
              color="light-warning"
              iconColor="white"
              title="M DRIVERS"
              titleColor="black"
              description=""
              descriptionColor="white"
              url={`/activities/drivers`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Activity;
