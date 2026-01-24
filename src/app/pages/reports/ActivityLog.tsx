import {FC} from 'react';
import { PageTitle } from '../../../_metronic/layout/core';

const ActivityLog : FC = () => {
    return (
        <>
            <PageTitle>ACTIVITY LOG</PageTitle>


<div className='card'>
            <div className='card-body bg-light'>
                <div className='d-flex align-items-center'>
                    <div className='col-md-10'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Action</span>
                                <span className='text-muted fw-semibold d-block'>Updated on dd/mm/yy</span>
                                <span className='text-muted fw-semibold d-block'>Action taken By: Admin</span>
                            </div>
                    </div>

                    <div className='col-md-2'>
                      <button className='btn btn-sm fw-bold btn-primary'>View Details</button>
                    </div>
        
                </div>
            </div>   
        </div> 



        </>
    )
}

export default ActivityLog;