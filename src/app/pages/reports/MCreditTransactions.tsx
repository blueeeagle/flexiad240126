import {FC} from 'react';
import { PageTitle } from '../../../_metronic/layout/core';

const MCreditTransactions : FC = () => {
    return (
        <>
            <PageTitle>M CREDITS PACKAGE TRANSACTIONS</PageTitle>

            <h3 className='card-title align-items-start flex-column mb-4'>
                <span className='card-label fw-bold fs-3 mb-1'>SUBSCRIPTIONS</span>
            </h3>

            <div  style={{borderBottom: '1px solid blue', borderTop: '1px solid blue' }}>
                <div style={{padding: '10px'}}>
                    <div className='d-flex align-items-center'>
                        <div className='col-md-2'>
                                <div className='flex-grow-1'>
                                    <span className='text-muted fw-bold d-block'>DD/MM/YY</span>
                                    <span className='text-muted fw-semibold d-block'>Time</span>
                                </div>
                        </div>

                        <div className='col-md-2'>
                                <div className='flex-grow-1'>
                                    <span className='text-muted fw-bold d-block'>Transaction ID</span>
                                </div>
                        </div>

                        <div className='col-md-2'>
                                <div className='flex-grow-1'>
                                    <span className='text-muted fw-bold d-block'>Subscribed By</span>
                                    <span className='text-muted fw-bold d-block'>Agent Company name / Email Id</span>
                                </div>
                        </div>


                        <div className='col-md-2'>
                        <p>5 BHD</p>
                        <p>Amount</p>
                        </div>

                        <div className='col-md-2'>
                        <p>5 BHD</p>
                        <p>Amount</p>
                        </div>

                        <div className='col-md-1'>
                        <span   className='badge badge-success fs-8 fw-bold'>Payment Success</span>
                
                        </div>
            
                    </div>
                </div>   
            </div> 

            <h3 style={{marginTop : '20px'}} className='card-title align-items-start flex-column mb-4'>
                <span className='card-label fw-bold fs-3 mb-1'>M CREDITS</span>
            </h3>

            <div style={{borderBottom: '1px solid blue', borderTop: '1px solid blue' }}>
                <div style={{padding: '10px'}}>
                    <div className='d-flex align-items-center'>
                        <div className='col-md-2'>
                                <div className='flex-grow-1'>
                                    <span className='text-muted fw-bold d-block'>DD/MM/YY</span>
                                    <span className='text-muted fw-semibold d-block'>Time</span>
                                </div>
                        </div>

                        <div className='col-md-2'>
                                <div className='flex-grow-1'>
                                    <span className='text-muted fw-bold d-block'>Transaction ID</span>
                                    <span className='text-muted fw-semibold d-block'>Package Title</span>
                         
                                </div>
                        </div>

                        <div className='col-md-2'>
                                <div className='flex-grow-1'>
                                    <span className='text-muted fw-bold d-block'>Purchased By</span>
                                    <span className='text-muted fw-bold d-block'>Customer name / Email Id</span>
                                </div>
                        </div>
                        <div className='col-md-1'>
                        <p>5 BHD</p>
                        <p>Amount</p>
                        </div>

                        <div className='col-md-1'>
                        <p>5 BHD</p>
                        <p>Amount</p>
                        </div>

                        <div className='col-md-1'>
                        <p>5 BHD</p>
                        <p>Amount</p>
                        </div>

                        <div className='col-md-2'>
                        <span   className='badge badge-success fs-8 fw-bold'>Payment Success</span>
                
                        </div>
            
                    </div>
                </div>   
            </div> 





        </>
    )
}

export default MCreditTransactions;