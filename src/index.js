import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./redux/index";
import { Provider } from "react-redux";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./HOC/auth-provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({ reducer: reducers, middleware: [thunk] });
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <ChakraProvider>
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </ChakraProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
