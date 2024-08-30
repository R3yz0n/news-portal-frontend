import React from "react";

const svgStyles = `
  .cls-1 {
    fill: #1d384d;
  }
`;

const NoTransactionsFound = () => {
  return (
    <div className="mt-16 flex flex-col items-center justify-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        className="mb-4 h-40 w-40 text-gray-500"
      >
        <defs>
          <style> {svgStyles} </style>
        </defs>
        <g id="icons_without_caption" data-name="icons without caption">
          <g id="GROWTH">
            <path
              className="cls-1"
              d="M160 92a34.15 34.15 0 0 0 2.43-12.74 34.48 34.48 0 0 0-69 0A34.15 34.15 0 0 0 96 92a29.3 29.3 0 1 0 32.1 42.88c3.27 5.52 11 15 25.44 15A29.3 29.3 0 0 0 160 92zm-6.55 53.86c-17.46 0-23.37-15.56-23.61-16.22l-1.83-5-1.92 5a25.3 25.3 0 1 1-27.01-34.18l2.75-.37-1.22-2.49a30.18 30.18 0 0 1-3.09-13.37 30.48 30.48 0 0 1 61 0 30.18 30.18 0 0 1-3.09 13.37l-1.22 2.49 2.75.37a25.3 25.3 0 0 1-3.42 50.36z"
            />
            <path
              className="cls-1"
              d="M126 130.29h4v26.15h-4zM87.32 162.87l12.35 48.39h55.53l13.55-48.39zm76.15 4-3.31 11.82H95.49l-3-11.82zm-11.31 40.39h-49.38l-6.27-24.56H159zM139.22 101.68c0 4.93-3.47 8.39-9.33 8.86v5.85h-3.23v-5.89a16.83 16.83 0 0 1-9.88-4.74l2.52-3a13.71 13.71 0 0 0 9.31 4c3.56 0 6.2-1.77 6.2-4.81 0-3.46-2.78-4.62-7.23-6-5.28-1.7-10.09-3.35-10.09-9.1 0-4.69 3.28-8.25 9.17-8.53V72.2h3.23v6.32a19.75 19.75 0 0 1 8.22 3.48l-2.43 3a15 15 0 0 0-8.13-2.85c-3.37 0-5.73 1.58-5.73 4.41 0 3 2.92 4.13 7 5.45 5.94 1.89 10.44 3.46 10.44 9.66z"
            />
          </g>
        </g>
      </svg>
      <h2 className="mb-2 text-2xl font-bold text-gray-800">
        No Transactions Found !
      </h2>
      <p className="text-gray-600">
        Please check and adjust the start and end dates or try a different
        client.
      </p>
    </div>
  );
};

export default NoTransactionsFound;
