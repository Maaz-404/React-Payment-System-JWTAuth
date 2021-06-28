import React, { useState, useEffect } from "react";

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

  return (
    <div className="container">
    
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>

        <Elements stripe={promise}>
            <CheckoutForm />
        </Elements>

    </div>
  );
};

export default Home;
