import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/appContext';

const Alert = () => {
    const { alertType, alertText } = useAppContext();
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            {visible && (
                <div className={`alert alert-${alertType}`}>
                    {alertText}
                </div>
            )}
        </>
    );
};

export default Alert;
