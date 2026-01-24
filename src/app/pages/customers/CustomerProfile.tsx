import { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";

import { StatisticsWidget5 } from "../../../_metronic/partials/widgets";
import { useParams } from "react-router-dom";

const CustomerProfile : FC = () => {

    const { customerId } = useParams();
    return (
        <>
           <PageTitle>CUSTOMER PROFILE</PageTitle>

           <div className='row g-5 g-xl-8'>
               <div className='row g-5 col-xl-12'>
                   <div className='col-xl-4'>
                       <StatisticsWidget5
                           className='mb-xl-4'
                           svgIcon=''
                           color='light-warning'
                           iconColor='white'
                           title='ACCOUNT'
                           titleColor='black'
                           description=''
                           descriptionColor='white'
                           url={`/customer/account/${customerId}`}
                       />
                   </div>

                   <div className='col-xl-4'>
                       <StatisticsWidget5
                           className='card-xl-stretch mb-5 mb-xl-8'
                           svgIcon=''
                           color='light-warning'
                           iconColor='black'
                           title='SAVED ADDRESSES'
                           titleColor='black'
                           description=''
                           descriptionColor='white'
                           url={`/customer/addresses/${customerId}`}
                       />
                   </div>


                   <div className='col-xl-4'>
                       <StatisticsWidget5
                           className='mb-xl-4'
                           svgIcon=''
                           color='light-warning'
                           iconColor='white'
                           title='PREFERENCES'
                           titleColor='black'
                           description=''
                           descriptionColor='white'
                           url={`/customer/preferences/${customerId}`}
                       />
                   </div>

                   <div className='col-xl-4'>
                       <StatisticsWidget5
                           className='mb-xl-4'
                           svgIcon=''
                           color='light-warning'
                           iconColor='white'
                           title='GIFT CARDS'
                           titleColor='black'
                           description=''
                           descriptionColor='white'
                           url={`/customer/giftCards/${customerId}`}
                       />
                   </div>

                   <div className='col-xl-4'>
                       <StatisticsWidget5
                           className='mb-xl-4'
                           svgIcon=''
                           color='light-warning'
                           iconColor='white'
                           title='TRANSACTIONS'
                           titleColor='black'
                           description=''
                           descriptionColor='white'
                           url={`/customer/transactions/${customerId}`}
                       />
                   </div>

                   {/* <div className='col-xl-4'>
                       <StatisticsWidget5
                           className='mb-xl-4'
                           svgIcon=''
                           color='light-warning'
                           iconColor='white'
                           title='SAVED CARDS'
                           titleColor='black'
                           description=''
                           descriptionColor='white'
                           url={`/customer/cards/${customerId}`}
                       />
                   </div> */}

                   <div className='col-xl-4'>
                       <StatisticsWidget5
                           className='mb-xl-4'
                           svgIcon=''
                           color='light-warning'
                           iconColor='white'
                           title='ORDERS'
                           titleColor='black'
                           description=''
                           descriptionColor='white'
                           url={`/customer/orders/${customerId}`}
                        />
                   </div>

                   {/* <div className='col-xl-4'>
                       <StatisticsWidget5
                           className='mb-xl-4'
                           svgIcon=''
                           color='light-warning'
                           iconColor='white'
                           title='SETTINGS'
                           titleColor='black'
                           description=''
                           descriptionColor='white'
                           url={`/customer/settings/${customerId}`}
                       />
                   </div> */}

                   <div className='col-xl-4'>
                       <StatisticsWidget5
                           className='mb-xl-4'
                           svgIcon=''
                           color='light-warning'
                           iconColor='white'
                           title='REVIEW & RATINGS'
                           titleColor='black'
                           description=''
                           descriptionColor='white'
                           url={`/customer/reviews/${customerId}`}
                       />
                   </div>

               </div>
           </div>
        </>
    )
}

export default CustomerProfile;