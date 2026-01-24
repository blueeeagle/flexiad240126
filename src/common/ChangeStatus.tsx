import { useState } from 'react';
import Swal from 'sweetalert2';
import { patchRequest, postRequest } from '../app/modules/auth/core/_requests';
import './CommonStyles.scss';

interface ChangeStatusProps {
    id: string;
    status: boolean;
    Url: string;
  }
  
  const changeStatus = async ({ id, status, Url }: ChangeStatusProps) => {
    try {
      const reqBody = {
        is_active: !status,
        id: id,
      };
  
      if (id) {
        const response = await patchRequest(Url, reqBody);
        if (response?.data?.status === 'ok') {
          return { success: true, message: ` ${status ? 'Inactive' : 'Active'} successfully` };
        } else {
          return { success: false, message: 'Something went wrong' };
        }
      }
    } catch (error) {
      return { success: false, message: 'Something went wrong' };
    }
  };
  
  export default changeStatus;
