import React from "react";

const NotFoundPage = (props) => {
  return (
    <div
      className={`flex flex-col items-center justify-center ${
        props.fullPage ? "h-screen " : "h-[23rem]  md:h-[32rem]  "
      }`}
    >
      {/* SVG Illustration */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="189"
        height="204.34"
        viewBox="0 0 189 204.34"
      >
        <defs>
          <style>
            {`.cls-1{fill:#fff;}.cls-2{fill:#3896e3;}.cls-3,.cls-4{fill:none;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}.cls-3{stroke:#3896e3;}.cls-4{stroke:#172121;}`}
          </style>
        </defs>

        <title>somethings_wrong</title>
        <g id="Layer_2" data-name="Layer 2">
          <g id="Notes">
            <path
              class="cls-1"
              d="M169.06,201.16H23.92a3.31,3.31,0,0,1-3-3.5l3-36a3.3,3.3,0,0,1,3-3.5H166a3.3,3.3,0,0,1,3,3.5l3,36A3.31,3.31,0,0,1,169.06,201.16Z"
            />
            <rect
              class="cls-2"
              x="43.97"
              y="67.47"
              width="95.49"
              height="71.62"
              rx="6.37"
            />
            <path
              class="cls-3"
              d="M36.81,24.5v8m-4-4h8m91.51,0v8m-4-4h8M16.91,151.82v8m-4-4h8"
            />
            <circle class="cls-2" cx="152.19" cy="24.5" r="2.39" />
            <path
              class="cls-2"
              d="M28.85,194.79H170.49a4.78,4.78,0,0,1,4.78,4.78h0a4.78,4.78,0,0,1-4.78,4.77H28.85a4.77,4.77,0,0,1-4.77-4.77h0A4.77,4.77,0,0,1,28.85,194.79Z"
            />
            <path
              class="cls-4"
              d="M169.06,201.16H23.92a3.31,3.31,0,0,1-3-3.5l3-36a3.3,3.3,0,0,1,3-3.5H166a3.3,3.3,0,0,1,3,3.5l3,36A3.31,3.31,0,0,1,169.06,201.16ZM35.22,164.55H160.15M42.38,173.31h3.18m-3.18,6.36h6.36m94.7,0H153M51.13,173.31h4m4.78,0h4m5.57,0h3.19M42.38,185.24h3.18m5.57,0h4m4.78,0h4m5.57,0h3.19m5.57-11.93h3.18m-3.18,11.93h30.24M86.94,173.31h4m-36.61,6.36H57.5m5.57,0h4m4.77,0h4m5.57,0h3.18m5.57,0h3.19m5.57,0h4m4.77,0h4m5.57,0h3.18m5.57,0h3.18m5.58,0h4m-43-6.36h4m5.57,0h3.19m5.57,0h3.18m5.57,0h4m4.77,0h4m5.57,0h3.18m5.57,0H153m-39,11.93h3.18m5.57,0h4m4.77,0h4m5.57,0h3.18m5.57,0H153"
            />
            <rect
              class="cls-4"
              x="24.87"
              y="48.37"
              width="143.23"
              height="103.45"
              rx="3.18"
            />
            <path class="cls-4" d="M32.83,56.33h111.4v87.53H32.83Z" />
            <rect
              class="cls-4"
              x="40.79"
              y="64.29"
              width="95.49"
              height="71.62"
              rx="6.37"
            />
            <path
              class="cls-4"
              d="M152.19,56.33v87.53M36,59.51l4,4m97.08,73.21,4,4m0-81.17-4,4M40,136.7l-4,4M64.66,120a27.05,27.05,0,0,1,47.74,0m4-31.83-7.95,8m0-8,7.95,8m-47.74-8-8,8m0-8,8,8"
            />
            <path
              class="cls-3"
              d="M63.63,15a8,8,0,0,1,0,11.26l0,0a6.37,6.37,0,0,1-9,.07l-.07-.07a5.1,5.1,0,0,1,0-7.2l0,0a4.07,4.07,0,0,1,5.74-.07.46.46,0,0,1,.07.07,3.26,3.26,0,0,1,0,4.62h0a2.62,2.62,0,0,1-3.71,0l0,0M129,13.28a8.12,8.12,0,0,0,11.21-2.45h0a6.54,6.54,0,0,0-2-9A5.26,5.26,0,0,0,131,3.41a4.13,4.13,0,0,0,1.25,5.72h0a3.34,3.34,0,0,0,4.61-1h0A2.71,2.71,0,0,0,136,4.45"
            />
            <circle class="cls-3" cx="4.98" cy="143.86" r="3.98" />
            <path class="cls-3" d="M184,143.86v8m-4-4h8" />
            <circle class="cls-2" cx="180.04" cy="163.76" r="2.39" />
            <path
              class="cls-4"
              d="M82.64,4.29l2.47,24.43m.48,4.85.16,1m15.51-2.15-.16.95M96.73,7.15a9.88,9.88,0,0,1,9.94-3.74c5.34,1,8.92,5.65,8,10.43s-5.89,7.88-11.22,6.92l-1.27,6.77"
            />
          </g>
        </g>
      </svg>

      {/* Error Message */}
      <div className="mt-8 text-center">
        <p className="mb-4 text-2xl font-semibold text-gray-700">
          {props.title || "Oops !"}
        </p>
        <p className="text-gray-500 ">
          {props.message || "Something went wrong. Please try again later."}
        </p>
      </div>
    </div>
  );
};

export default NotFoundPage;
