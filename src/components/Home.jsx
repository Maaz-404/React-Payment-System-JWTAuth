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
  
  const [channelID, setChannelID] = useState("0");
  
  const [amount, setAmount] = useState("2.00");
  
  const [orderID, setOrderID] = useState("");

  const [isDisabled, setIsDisabled] = useState(true);

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
  
  function createOrder(
        data: Record<string, unknown>,
        actions: CreateOrderActions
    ) {
        return actions.order
            .create({
                purchase_units: [
                    {
                        amount: {
                            value: amount,
                        },
                    },
                ],
            })
            .then((orderID) => {
                setOrderID(orderID);
                return orderID;
            });
    }
    
    function onChange(event: ChangeEvent<HTMLSelectElement>) {
        setAmount(event.target.value);
        setOrderID("");
    }
    
    function onChannelID(event: ChangeEvent<HTMLInputElement>) {
        setChannelID(event.target.value)
        setIsDisabled(!event.target.value);
    }

    
  return (
    <div className="container">
    
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
        <label for="Channel ID">Channel ID </label>
        <input type="text" value={channelID} onChange={onChannelID} required />
        <label for="Amount">Amount </label>
        
        <select onChange={onChange} name="amount" id="amount">
                <option value="5.00">$5.00</option>
                <option value="20.00">$20.00</option>
                <option value="50.00">$50.00</option>
                <option value="100.00">$100.00</option>
                <option value="300.00">$300.00</option>
                <option value="500.00">$500.00</option>
            </select>
            <p>Order ID: {orderID ? orderID : "unknown"}</p>
            
            
        <h4 style={{textDecoration: "underline"}}> Pay with Card </h4>
        <Elements stripe={promise}>
            <CheckoutForm />
        </Elements>
        
        <h4 style={{textDecoration: "underline"}}> Pay using Paypal </h4>

        <PayPalScriptProvider options={initialOptions}>
        
            <PayPalButtons style={{ layout: "horizontal" }}
                            
                        createOrder={createOrder} forceReRender={[amount]}
                        
                        disabled={isDisabled}
            />
        
        </PayPalScriptProvider>


    </div>
  );
};

export default Home;
