# Cryptowave

Cryptowave is a React application that allows users to explore and analyze the world of cryptocurrencies. It provides a user-friendly interface to view information about various cryptocurrencies, sort them based on different criteria, select different currencies for pricing information, search for specific cryptocurrencies, and view graphs depicting the performance of cryptocurrencies over different time intervals. The app utilizes the CoinGecko API to fetch cryptocurrency data and incorporates Chart.js, Material-UI, Bootstrap, and React Bootstrap for enhanced user experience.

## Features

- **Cryptocurrency List:** View a comprehensive list of cryptocurrencies with relevant information such as name, symbol, current price, 24-hour change, and market capitalization.

- **Sorting Functionality:** Sort the list of cryptocurrencies based on coin name, price, and market capitalization. Click on the table headers to toggle between ascending and descending order.

- **Currency Selection:** Choose different currencies to display the pricing information for cryptocurrencies. This feature enables users to view cryptocurrency prices in their preferred currency.

- **Search Functionality:** Search for specific cryptocurrencies using their name or symbol. The search feature provides a convenient way to find and focus on particular cryptocurrencies of interest.

- **Interactive Graphs:** Visualize the performance of cryptocurrencies over different time intervals using interactive graphs. The graphs can be customized to display data for 24 hours, 1 day, or specific months, providing valuable insights into price trends and market behavior.

## Demo

A live demo of Cryptowave can be accessed [here](https://your-demo-link).

## Installation

To run Cryptowave locally, follow these steps:

1. Clone the repository: `git clone <repository-url>`
2. Navigate to the project directory: `cd cryptowave`
3. Install dependencies: `npm install`

## Usage

1. Obtain an API key from CoinGecko by signing up [here](https://www.coingecko.com).
2. Rename the `.env.example` file to `.env` and replace the `REACT_APP_COINGECKO_API_KEY` placeholder with your CoinGecko API key.
3. Start the development server: `npm start`
4. Open the app in your browser: `http://localhost:3000`

## Dependencies

Cryptowave relies on the following dependencies:

- **React:** A JavaScript library for building user interfaces.
- **Axios:** A promise-based HTTP client for making API requests.
- **Chart.js:** A flexible charting library for creating interactive and visually appealing graphs.
- **Material-UI:** A popular React UI framework that provides a set of customizable components following the Material Design guidelines.
- **Bootstrap:** A widely used CSS framework for developing responsive and mobile-first websites.
- **React Bootstrap:** React components built on top of Bootstrap for seamless integration and enhanced UI capabilities.

## API

Cryptowave utilizes the CoinGecko API to fetch cryptocurrency data. The API documentation can be found [here](https://www.coingecko.com/api/documentation). It provides a comprehensive set of endpoints to retrieve information about cryptocurrencies, including price data, market trends, historical data, and more.

## Contributing

Contributions to Cryptowave are welcome! If you encounter any issues or have suggestions for improvement, please submit a pull request or open an issue. Contributions can include bug fixes, new features, UI enhancements, documentation improvements, and more.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). You are free to modify and distribute the codebase as per the terms of this license.

