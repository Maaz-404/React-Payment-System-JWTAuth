import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
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
    <div className="container">
      <header className="jumbotron">
        <h1>Dashboard</h1>
        <h3>{content}</h3>
      </header>
     
        <div class="row">
            <div class="col-sm-6">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Channel ID:  </h5>
                    <p class="card-text">Channel Name.</p>
                    <button class="btn btn-link">Share / Copy</button>
                </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Current Balance  </h5>
                    <p class="card-text">Total Received</p>
                    <button class="btn btn-success">Withdraw</button>
                </div>
                </div>
            </div>
        </div>
    </div>
  );
};

export default BoardUser;
