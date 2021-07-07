import React, { useState, useEffect } from "react";

import { PayPalScriptProvider, PayPalButtons} from "@paypal/react-paypal-js";

import UserService from "../services/user.service";

//Import Stripe api
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

//Load Stripe api
const promise = loadStripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const Home = () => {
    
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);
  
  const initialOptions = {
    "client-id": "test",
    currency: "USD",
    intent: "capture",
  };

    
  return (
    <div className="container">
    
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
        <label for="Channel ID">Channel ID: </label>
        <input type="text">
        <h4 style={{textDecoration: "underline"}}> Pay with Card </h4>
        <Elements stripe={promise}>
            <CheckoutForm />
        </Elements>
        
        <h4 style={{textDecoration: "underline"}}> Pay using Paypal </h4>

        <PayPalScriptProvider options={initialOptions}>
        
            <PayPalButtons style={{ layout: "horizontal" }}
                            
                        createOrder={(data, actions) => {
                                return actions.order.create({
                                    purchase_units: [
                                        {
                                            amount: {
                                                value: "10.00",
                                            },
                                        },
                                    ],
                                });
                        }}
            />
        
        </PayPalScriptProvider>


    </div>
  );
};

export default Home;
