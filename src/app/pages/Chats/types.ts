export interface Message {
    timeSent: any;
    id: number;
    text: string;
    senderId: string;
    time: string;
    date: string;
    message:string;

  }
  
  export interface Chat {
    _id: number | null;
    companyName: string;
    id: number;
    name: string;
    role: string;
    messages: Message[];
  }
  
export interface User{
  userId: any;

}
export const API_KEY = import.meta.env.VITE_API_KEY as string;
export const AUTH_DOMAIN = import.meta.env.VITE_AUTH_DOMIN as string;
export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID as string;
export const STORAGE_BUCKET = import.meta.env.VITE_STORAGE_BUCKET as string;
export const MESSAGE_SENDING_ID = import.meta.env.VITE_MESSAGE_SENDING_ID as string;
export const APP_ID = import.meta.env.VITE_APP_ID as string;
export const MEASUREMENT_ID = import.meta.env.VITE_MEASUMERMENT_ID as string;
