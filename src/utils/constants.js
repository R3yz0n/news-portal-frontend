export const APIURL =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_APIURL_DEVELOPMENT
    : process.env.REACT_APP_APIURL_PRODUCTION;

export const IIMAGE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001/static"
    : process.env.REACT_APP_IIMAGE_PRODUCTION;

// export const APIURL = ;
// // export const APIURL = "http://202.79.43.18:5001/api";
// // export const APIURL = "http://192.168.10.117:5001/api";
// export const IIMAGE_URL = "http://202.79.43.18:5001/static";
