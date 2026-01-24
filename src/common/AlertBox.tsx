import {FC, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './CommonStyles.scss';

// In AlertBox.tsx
interface MyComponentProps {
    children: string;
    close: () => void;
    type: 'success' | 'error';
    redirectUrl?: string | null; // Make redirectUrl optional
}


const AlertBox : FC <MyComponentProps> = ({children, type , close, redirectUrl = null}) => {

    const closeMsg = () => {
        close();
    }

    const history = useNavigate();


    useEffect(() => {
        setTimeout(() => {
            close();
            if(redirectUrl){
                history(redirectUrl)
            }
        },5000)
    }, [])

    return (
        <>
            { type  === 'error' &&
            <div className="alert alert-danger">
                <span onClick={closeMsg} className="closebtn">&times;</span>
                {children}
            </div>
            }

            { type  === 'success' &&
            <div className="alert alert-success">
                <span onClick={closeMsg} className="closebtn">&times;</span>
                {children}
            </div>
            }
        </>
    )
}

export default AlertBox;