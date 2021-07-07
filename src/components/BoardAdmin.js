import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getAdminBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container-fluid">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>

        <div class="row">
          
                <div class="card">
                <div class="card-body">
                    <h4 class="card-text">Total Received from Donations</h4>
                </div>
                </div>
         
            
            
                <div class="card ml-4">
                <div class="card-body">
                    <h5 class="card-title">Current Balance </h5>
                </div>
                </div>
            
        </div>
            
            <div class="row align-items-right">
                <h3 class="card-title">Transactions </h3>
            </div>
            
            <div class="col-lg">
                <div class="card">
                <div class="card-body">
                    
                    <h5 class="card-text">Amount Donated : </h5>
                    <p class="card-title">Donation By : </p>
                    <h5 class="card-title">Commission To be Earned on Transaction :   </h5>
                    <button class="btn btn-success">Approve</button>
                    <button class="btn btn-dark mt-2">Decline / Cancel</button>
                </div>
                </div>
            </div>
      </div>
    
  );
};

export default BoardAdmin;
