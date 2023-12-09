import React from "react";
import Taskbar from "./Taskbar.css";
const Card= () => {
  return (
    <div className="card">
      <div className="header" >
        <span id="ticket">Text at left end</span>
        <img src="https://www.beyondblue.org.au/images/default-source/3.the-facts/support-someone-else/general-supporting-someone-else_talk-to-someone-youre-worried-about_hero-header_704x508.svg?sfvrsn=cd5b448c_2" alt="Image" className="header-image" />
      </div>
      <div className="title">
        <strong id="title">Title with bold letters</strong>
      </div>
      <div className="buttons">
        <button className="button" id="bt1">---</button>
        <button className="button">
          <img src="data:image/jpeg;base64,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" alt="Image" className="button-image" />
          Button 2
        </button>
      </div>
    </div>
  );
};

export default Card;
