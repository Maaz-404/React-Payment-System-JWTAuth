import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import * as serviceWorker from "./serviceWorker";
// Import Stripe api
// import { loadStripe } from "@stripe/stripe-js";
// import { Elements } from "@stripe/react-stripe-js";
// 
// Load Stripe api
// const stripePromise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

ReactDOM.render(
    <BrowserRouter>
            <App />
    </BrowserRouter>,
  document.getElementById("root")
);

serviceWorker.unregister();
