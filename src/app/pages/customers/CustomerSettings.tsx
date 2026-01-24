import { FC } from "react";
import { PageTitle } from "../../../_metronic/layout/core";

const CustomerSettings : FC = () => {
    return (
        <>
             <PageTitle>SETTINGS</PageTitle>

             <div className='card mb-8'>
                <div className='card-body bg-light'>
                    <div className='d-flex align-items-center'>
                        <div className='col-md-10'>
                            <div className='flex-grow-1'>
                                <span className='text-muted fw-bold d-block'>BAHRAIN</span>
                                <span className='text-muted fw-semibold d-block'>Set Your Preferred location</span>
                            </div>
                        </div>

                        <div className='col-md-2'>
                            <div className='flex-grow-1'>
                                <button className='btn btn-sm btn-secondary'>Change</button>
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
                                <span className='text-muted fw-bold d-block'>English</span>
                                <span className='text-muted fw-semibold d-block'>Set Your Preferred language</span>
                            </div>
                        </div>

                        <div className='col-md-2'>
                            <div className='flex-grow-1'>
                                <button className='btn btn-sm btn-secondary'>Change</button>
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
                                <span className='text-muted fw-bold d-block'>Status Notification</span>
                                <span className='text-muted fw-semibold d-block'>Would you like to receive notifications?</span>
                            </div>
                        </div>

                        <div className='col-md-2'>
                            <div className='flex-grow-1'>
                            <div className="form-check form-switch form-check-custom form-check-solid">
                                        <input className="form-check-input" type="checkbox" value="" id="flexSwitchDefault" />

                                    </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div> 
        </>
    )
}

export default CustomerSettings;