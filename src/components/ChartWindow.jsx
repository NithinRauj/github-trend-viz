import React from 'react';
import '../styles/ChartWindow.css';

const ChartWindow = ({ title, children }) => {
    return (
        <div className='window'>
            <h2>{title}</h2>
            {children}
        </div>
    );
}

export default ChartWindow;