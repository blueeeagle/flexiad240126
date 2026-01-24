import {FC} from 'react';
import { PageTitle } from '../../../_metronic/layout/core';

const CurrencyRates : FC = () => {
    return (
        <>
            <PageTitle>CURRENCY VALUES</PageTitle>
            <div className='row g-5 g-xl-8'>
                <div className={`card `}>
                    <div className='card-body py-3'>
                        <div className='table-responsive'>
                        <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                            <thead>
                            <tr className='fw-bold text-muted'>
                                <th className='min-w-150px'>Base Currency Name</th>
                                <th className='min-w-100px'>Base Currency Code</th>
                                <th className='min-w-100px'>Base Currency Value</th>
                                <th className='min-w-100px'>Currency Name</th>
                                <th className='min-w-100px'>Currency Code</th>
                                <th className='min-w-100px'>Amount</th>
                                <th className='min-w-150px'>Last Updated On</th>
                                <th className='min-w-100px text-end'>Activity Log</th>
                            </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Bahrani Dinar</td>
                                    <td>BHD</td>
                                    <td>1</td>
                                    <td>Bahrani Dinar</td>
                                    <td>BHD</td>
                                    <td>1</td>
                                    <td>Date & Time</td>
                                    <td>View (Last30 Days)</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>    
            </div>  
        </>
    )
}

export default CurrencyRates;