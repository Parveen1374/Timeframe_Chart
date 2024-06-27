import React from 'react';
import './TimeFrameSelector.css';

// TimeframeSelector component
const TimeframeSelector = ({ onSelect }) => (
  <div className="timeframe-selector">
    {/* Button to select 'Daily' timeframe */}
    <button onClick={() => onSelect('daily')} className='button'>Daily</button>
    {/* Button to select 'Weekly' timeframe */}
    <button onClick={() => onSelect('weekly')} className='button'>Weekly</button>
    {/* Button to select 'Monthly' timeframe */}
    <button onClick={() => onSelect('monthly')} className='button'>Monthly</button>
  </div>
);

export default TimeframeSelector;
