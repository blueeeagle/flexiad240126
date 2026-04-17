import axios from "axios";
import { AuthModel, UserModel } from "./_models";

const API_URL = import.meta.env.VITE_APP_API_URL;

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/verify_token`;
export const LOGIN_URL = `${API_URL}/login`;
export const CHANGE_PASSWORD_URL = `${API_URL}/forgetPwd/changePassword`;
export const REGISTER_URL = `${API_URL}/register`;
export const REQUEST_PASSWORD_URL = `${API_URL}/me/forgot`;
export const VERIFICATION_CODE_URL = `${API_URL}/otpVerify`;
// Server should return AuthModel
export function login(email: string, password: string) {
  return axios.post<AuthModel>(LOGIN_URL, {
    email,
    password,
  }).then((response: any) => {
    return response;
  });
}
export function changePassword(email: string, password: string) {
  return axios.post<AuthModel>(CHANGE_PASSWORD_URL, {
    email,
    password,
  }).then((response: any) => {
    return response;
  });
}
// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  });
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(email: string) {
  return axios.post<{ result: boolean }>(REQUEST_PASSWORD_URL, {
    email,
  });
}
export function verificationCode(verificationCode: string) {
  return axios.post<{ result: boolean }>(VERIFICATION_CODE_URL, {
    verificationCode,
  });
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  });
}


export function postRequest(URL: string, reqBody: any) {
  const token = localStorage.getItem('token');
  return axios.post(API_URL + URL, reqBody, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  ).then((response: any) => {
    return response;
  });
}

export function getRequest(URL: string, QUERY: string) {
  const token = localStorage.getItem('token');
  return axios.get(API_URL + URL + QUERY, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  ).then((response: any) => {
    return response;
  });
}
export async function getRequestPost(URL: string, QUERY: string) {
  const token = localStorage.getItem('token');

  // Make sure token exists
  if (!token) {
    throw new Error('No token found');
  }

  return axios.post(API_URL + URL + QUERY, {}, { // Empty object for POST body
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }).then((response: any) => {
    return response;
  }).catch((error: any) => {
    console.error('Error in API call:', error);
    throw error; // Rethrow error so the calling function can handle it
  });
}
export function patchRequest(URL: string, reqBody: any | null) {
  const token = localStorage.getItem('token');
  return axios.patch(API_URL + URL, reqBody, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  ).then((response: any) => {
    return response;
  });
}

export function deleteRequest(URL: string) {

  const token = localStorage.getItem('token');
  return axios.delete(API_URL + URL, {
    headers: {
      'Authorization': `Bearer ${token}`,
    }
  }
  ).then((response: any) => {
    return response;
  });
}

export const saveBankDetail = async (payload: any, bankDetailId: any) => {
  const token = localStorage.getItem('token');
  const url = bankDetailId
    ? `${API_URL}/activities/wallet/bank/${bankDetailId}`
    : `${API_URL}/activities/wallet/bank`;

  const method = bankDetailId ? "PATCH" : "POST";

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (response.ok && result.status === "ok") {
      return { success: true, data: result.data };
    } else {
      return { success: false, message: result.message || "Failed to save record." };
    }
  } catch (error) {
    console.error("Error occurred:", error);
    return { success: false, message: "An unexpected error occurred. Please try again." };
  }
};

export const savePendingData = async (
  companyIdNumber: string, payload: any) => {
  const token = localStorage.getItem("token");
try {
  console.log(
    companyIdNumber,"api id");

  
    const response = await fetch(
      `${API_URL}/activities/wallet/addTrans/${companyIdNumber}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      return { success: true };
    } else {
      return { success: false, message: "Error saving data" };
    }
  } catch (error) {
    console.error("Error:", error);
    return { success: false, message: "An unexpected error occurred" };
  }
};




// Define the Order interface
// Define the Order interface
interface Order {
  _id: string;
  companyName: string;
  companyLogo: string;
  customerName: string;
  customerEmail: string;
  customerGender: string;
  customerMobile: string;
  mobile: number;
  orderNo: string;
  orderDate: string;
  orderMode: string;
  grossAmt: number;
  netAmt: number;
  payoutAmt: number;
  discAmt: number;
  addressStreet: string;
  addressBlock: string | null;
  addressBuilding: string | null;
  addressCity: string;
  addressArea: string;
  addressCountry: string;
  addressState: string;
  addressZipcode: string;
  agentName: string;
  commissionAmount: number; // Added commission amount
}


// Update the fetchOrders function
export const fetchOrders = async (companyId: string): Promise<Order[]> => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/activities/orders?pageSize=10&pageIndex=0&fromDate&toDate`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          companyId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();


    if (result.data && result.data.data) {
      return result.data.data.map((order: any) => ({
        _id: order._id,
        companyName: order.companyId?.companyName || "N/A",
        companyLogo: order.companyId?.companyLogo || "",
        customerName: `${order.customerId?.firstName || ""} ${order.customerId?.lastName || ""}`,
        customerEmail: order.customerId?.email || "N/A",
        customerGender: order.customerId?.gender || "N/A",
        customerMobile: order.customerId?.mobile || "N/A",
        mobile: order.customerId?.mobile || 0,
        currencySymbol: order.currency || "-",
        orderNo: order.orderNo || "N/A",
        orderDate: order.orderDate ? new Date(order.orderDate).toLocaleDateString() : "N/A",
        orderMode: order.orderMode || "N/A",
        grossAmt: order.grossAmt || 0,
        netAmt: order.netAmt || 0,
        payoutAmt: order.payoutAmt || 0,
        discAmt: order.discAmt || 0,
        addressStreet: order.addressDetails?.street || "N/A",
        addressBlock: order.addressDetails?.block || "N/A",
        addressBuilding: order.addressDetails?.building || "N/A",
        addressCity: order.addressDetails?.cityId?.name || "N/A",
        addressArea: order.addressDetails?.areaId?.name || "N/A",
        addressCountry: order.addressDetails?.countryId?.name || "N/A",
        addressState: order.addressDetails?.stateId?.name || "N/A",
        addressZipcode: order.addressDetails?.zipcode || "N/A",
        agentName: order.companyId?.agentId?.name || "N/A",
        commissionAmount: order.commissionAmount || 0,
      }));
    } else {
      console.error("Unexpected data format", result);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};



export const fetchPayouts = async (companyId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/activities/payouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ companyId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("API raw response:", result); // Log full response

    // Return the correct mapped data
    return result.data.map((payout: any) => ({
      _id: payout._id,
      requestId: payout.requestId,
      acNo: payout.acNo,
      amount: payout.amount,
      date: payout.date,
      status: payout.status,
      companyId: payout.companyId,
      created_by: payout.created_by,
      currencyId: payout.currencyId,
      is_active: payout.is_active,
      updated_at: payout.updated_at,
    }));
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

