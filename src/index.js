import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AnimatePresence } from "framer-motion";
import store from "./store/store";
import { Toaster } from "react-hot-toast";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <AnimatePresence>
      <Provider store={store}>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              backgroundColor: "rgb(220,220,220)",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              maxWidth: "500px",
              position: "relative",
              top: "85px",
            },
          }}
          reverseOrder={false}
        />
      </Provider>
    </AnimatePresence>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
