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
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
      <div class="align-items-between">
        Current Balance
        Total Received
        Commission/Earned
      </div>
      <div class="align-items-between"> {/* Use Map function here to loop over senders & display data */ }
        Sent By (Name here)
        Amount sent
        <button type="button">Approve</button>  
        <button type="button">Cancel</button> 
      </div>
    </div>
  );
};

export default BoardAdmin;
