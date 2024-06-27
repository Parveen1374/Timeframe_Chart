# React Chart Application
This project is a React.js application that displays a chart using the Recharts library. The chart supports timeframe breakdown, timeframe zooming, and interactive click events. Chart data is provided in JSON format.

# To run this project locally, follow these steps:

-> Make sure you have Node.js installed on your local development machine.

# Installing Dependencies
 => 1. Clone the repository to your local machine:
         git clone <repository-url>
 => 2. Navigate into the project directory:
         cd my-chart-app
 => 3. Install dependencies using npm:
         npm install

# Running the Application

Once all dependencies are installed, you can start the React development server:
=> npm start



# Project Structure 

->The project structure is organized as follows:

react-chart-application/
├── public/
│   ├── index.html
│   └── timeChartData.json
├── src/
│   ├── components/
│   │   ├── Chart.js
│   │   └── TimeFrameSelector
│   ├── data/
│   │   └── chart-data.json
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md


# Timeframe Chart Application

## Overview
The Timeframe Chart Application is a React-based web application that allows users to view and interact with a chart displaying data over different timeframes (daily, weekly, monthly). Users can also filter data based on date and value ranges, and toggle between light and dark themes.

## Features
- **Timeframe Selection**: Users can switch between daily, weekly, and monthly views.
- **Date Range Filtering**: Filter data by selecting a start date and end date.
- **Value Range Filtering**: Filter data by setting minimum and maximum values.
- **Theme Toggle**: Switch between light and dark themes using a toggle switch.
- **Interactive Chart**: Click on data points to get details.

# Dependencies
=> React
=> Recharts
=> React Switch
