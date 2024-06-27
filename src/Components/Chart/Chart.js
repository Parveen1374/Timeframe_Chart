import React, { useState, useEffect, useRef } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush
} from 'recharts';
import { toPng, toJpeg } from 'html-to-image';
import './Chart.css';

// Chart component
const Chart = ({ timeframe }) => {
  // State variables
  const [data, setData] = useState([]); // Store chart data
  const [startDate, setStartDate] = useState(''); // Start date for filtering
  const [endDate, setEndDate] = useState(''); // End date for filtering
  const [minValue, setMinValue] = useState(''); // Minimum value for filtering
  const [maxValue, setMaxValue] = useState(''); // Maximum value for filtering
  const [errorMessage, setErrorMessage] = useState(''); // Error message for validation
  const chartRef = useRef(null); // Ref for the chart container

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/chartData.json');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Handle start date change
  const handleStartDateChange = (e) => {
    const newStartDate = e.target.value;
    setStartDate(newStartDate);

    // Adjust end date if it's before the new start date
    if (endDate && new Date(newStartDate) >= new Date(endDate)) {
      const nextDay = new Date(newStartDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setEndDate(nextDay.toISOString().split('T')[0]);
    } else {
      setErrorMessage('');
    }
  };

  // Handle end date change
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    if (startDate && new Date(startDate) >= new Date(e.target.value)) {
      setErrorMessage('End date must be later than start date');
    } else {
      setErrorMessage('');
    }
  };

  // Handle minimum value change
  const handleMinValueChange = (e) => {
    const newMinValue = e.target.value;
    setMinValue(newMinValue);

    // Adjust maximum value if it's less than the new minimum value
    if (maxValue && Number(newMinValue) >= Number(maxValue)) {
      setMaxValue(Number(newMinValue) + 1);
    } else {
      setErrorMessage('');
    }
  };

  // Handle maximum value change
  const handleMaxValueChange = (e) => {
    setMaxValue(e.target.value);
    if (minValue && Number(minValue) >= Number(e.target.value)) {
      setErrorMessage('Max value must be greater than min value');
    } else {
      setErrorMessage('');
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setStartDate('');
    setEndDate('');
    setMinValue('');
    setMaxValue('');
    setErrorMessage('');
  };

  // Filter data based on selected criteria
  const filteredData = data.filter((d, index) => {
    const date = new Date(d.timestamp);
    const start = startDate ? new Date(startDate) : new Date('1900-01-01');
    const end = endDate ? new Date(endDate) : new Date('2100-01-01');
    const value = d.value;
    const min = minValue ? Number(minValue) : -Infinity;
    const max = maxValue ? Number(maxValue) : Infinity;
    return date >= start && date <= end && value >= min && value <= max;
  }).filter((d, index) => {
    // Further filter data based on the selected timeframe
    if (timeframe === 'daily') {
      return true;
    } else if (timeframe === 'weekly') {
      return index % 7 === 0;
    } else if (timeframe === 'monthly') {
      return index % 30 === 0;
    }
    return false;
  });

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const date = new Date(label).toLocaleDateString();
      return (
        <div className="custom-tooltip">
          <p className="label">{`Date: ${date}`}</p>
          <p className="value">{`Value: ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

  // Export chart as an image
  const exportAsImage = (format) => {
    if (chartRef.current) {
      const exportFunction = format === 'png' ? toPng : toJpeg;
      exportFunction(chartRef.current)
        .then((dataUrl) => {
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `chart.${format}`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Failed to export chart as image', error);
        });
    }
  };

  return (
    <div className='chart-container'>
      {/* Filters */}
      <div className="filters-container">
        <div>
          <div className='date-container'>
            <div> 
              <label>Start Date:</label> 
              <input type="date" value={startDate} onChange={handleStartDateChange} className='input' />
            </div>
            <div>
              <label>End Date:</label>
              <input type="date" value={endDate} onChange={handleEndDateChange} className='input'/>
            </div>
          </div>
          <div className='value-container'>
            <div>
              <label>Min Value:</label>  
              <input type="number" value={minValue} onChange={handleMinValueChange} className='input'/>
             </div>
             <div>
              <label>Max Value:</label>
              <input type="number" value={maxValue} onChange={handleMaxValueChange} className='input'/>
             </div>
          </div>
        </div>
        <button onClick={handleClearFilters} className='clear-button'>Clear Filters</button>
      </div>
      {/* Error message */}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {/* Chart */}
      <div ref={chartRef}>
        <ResponsiveContainer width='100%' height={450}>
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="timestamp" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} isAnimationActive={true} />
            <Brush dataKey="timestamp" height={30} stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      {/* Export buttons */}
      <div className="export-buttons">
        <button onClick={() => exportAsImage('png')}>Export as PNG</button>
        <button onClick={() => exportAsImage('jpg')}>Export as JPG</button>
      </div>
    </div>
  );
};

export default Chart;
