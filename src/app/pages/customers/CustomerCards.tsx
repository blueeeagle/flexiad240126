import { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";
import { KTIcon } from "../../../_metronic/helpers";

const CustomerCards : FC = () => {
    return (
        <>
            <PageTitle>SAVED CARDS</PageTitle>

            <div className='card mb-8'>
                <div className='card-body bg-light'>
                    <div className='d-flex align-items-center'>
                        <div className='col-md-10'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Car No Binding with 4242</span>
                                <span className='text-muted fw-semibold d-block'>Active</span>
                            </div>
                        </div>

                        <div className='col-md-2'>
                            <div className='flex-grow-1'>
                                <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                                    <KTIcon iconName='trash' className='fs-3' />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>   

            <div className='card mb-8'>
                <div className='card-body bg-light'>
                    <div className='d-flex align-items-center'>
                        <div className='col-md-10'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>Car No Binding with 4242</span>
                                <span className='text-muted fw-semibold d-block'>Active</span>
                            </div>
                        </div>

                        <div className='col-md-2'>
                            <div className='flex-grow-1'>
                                <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
                                    <KTIcon iconName='trash' className='fs-3' />
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>  
        </>
    )
}

export default CustomerCards;