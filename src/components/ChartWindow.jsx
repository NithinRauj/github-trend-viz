import React from 'react';
import '../styles/ChartWindow.css';

const ChartWindow = ({ title, children, xLabel, xLabelPosition, yLabel, yLabelPosition }) => {
    return (
        <div className='window'>
            <h2>{title ? title : 'Chart Title'}</h2>
            {children}
            <div
                className='x-label'
                style={{ ...xLabelPosition }}
            >
                {xLabel}
            </div>
            <div
                className='y-label'
                style={{ ...yLabelPosition }}
            >
                {yLabel}
            </div>
        </div >
    );
}

export default ChartWindow;