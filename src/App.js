import React, { useState, createContext } from 'react';
import Chart from './Components/Chart/Chart.js';
import TimeframeSelector from './Components/TimeframeSelector/TimeFrameSelector.js';
import './App.css';
import ReactSwitch from 'react-switch';

// Create a ThemeContext to manage theme state
export const ThemeContext = createContext(null);

const App = () => {
  // State to manage the selected timeframe for the chart
  const [timeframe, setTimeframe] = useState('weekly');
  // State to manage the theme (light or dark)
  const [theme, setTheme] = useState('light');

  // Function to handle timeframe change
  const handleTimeframeChange = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  // Function to toggle between light and dark theme
  const toggleTheme = () => {
    setTheme((curr) => curr === 'light' ? 'dark' : 'light');
  };

  return (
    // Provide the theme context to child components
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {/* Container with dynamic theme-based ID */}
      <div className="container" id={theme}>
        <div className='title-theme'>
          {/* Title of the app */}
          <h1 className='title'>Timeframe <span>Chart</span></h1>
          {/* Theme switcher component */}
          <div className='theme-switch'>
            <ReactSwitch onChange={toggleTheme} checked={theme === 'dark'} height={19} width={38} />
            <label>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</label>
          </div>
        </div>
        <div className='responsive-container'>
          {/* Chart component with selected timeframe */}
          <Chart timeframe={timeframe} />
          {/* TimeframeSelector component to choose timeframe */}
          <TimeframeSelector onSelect={handleTimeframeChange} />
        </div>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
