import React, { useEffect, useState } from "react";
import "./Selectoption.css"; // Import your CSS file

function Selectoption() {
  const [tickets, setTickets] = useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [selectedBoxCriteria, setSelectedBoxCriteria] = useState("");
  const [selectedBoxSortOption, setSelectedBoxSortOption] = useState("");

  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((data) => data.json())
      .then((val) => {
        setTickets(val.tickets);
      });
  }, []);

  const groupDataByCriteria = () => {
    let groupedData = {};

    tickets.forEach((ticket) => {
      let groupKey = "";

      if (selectedCriteria === "Status") {
        groupKey = ticket.status;
      } else if (selectedCriteria === "Priority") {
        groupKey = ticket.priority.toString();
      } else if (selectedCriteria === "User") {
        groupKey = ticket.userId;
      }

      if (!groupedData[groupKey]) {
        groupedData[groupKey] = [];
      }

      groupedData[groupKey].push(ticket);
    });

    return groupedData;
  };

  const sortData = (data) => {
    if (selectedSortOption === "Priority") {
      return data.sort((a, b) => b.priority - a.priority);
    } else if (selectedSortOption === "Title") {
      return data.sort((a, b) => a.title.localeCompare(b.title));
    }
    return data;
  };
  const toggleBoxVisibility = () => {
    setIsBoxVisible(!isBoxVisible);
  };

  const groupedData = groupDataByCriteria();
  const sortedData = sortData(tickets);
  return (
    
    <div className="maini">
    <div className="container">
    <div className="dropdowns">
        <div>
          <label>Group By: </label>
          <select value={selectedCriteria} onChange={(e) => setSelectedCriteria(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Status">Status</option>
            <option value="Priority">Priority</option>
            <option value="User">User</option>
          </select>
        </div>
  
        <div>
          <label>Sort By: </label>
          <select value={selectedSortOption} onChange={(e) => setSelectedSortOption(e.target.value)}>
            <option value="">-- Select --</option>
            <option value="Priority">Priority</option>
            <option value="Title">Title</option>
          </select>
        </div>
      </div>

      {selectedCriteria && (
        <div className="columns-container">
          {Object.keys(groupedData).map((group, index) => (
            <div className="column" key={index}>
              <h3>{group}</h3>
              <table>
               
                <tbody>
                  {sortData(groupedData[group]).map((ticket) => (
                    <tr key={ticket.id}>
                      <td className="col_1">
                        <div className="card">
                          <div className="header">
                            <span id="ticket">{ticket.id}</span>
                            <img
                              src="https://www.beyondblue.org.au/images/default-source/3.the-facts/support-someone-else/general-supporting-someone-else_talk-to-someone-youre-worried-about_hero-header_704x508.svg?sfvrsn=cd5b448c_2"
                              alt="Image"
                              className="header-image"
                            />
                          </div>
                          <div className="title">
                            <strong id="title">{ticket.title}</strong>
                          </div>
                          <div className="buttons">
                            <button className="button" id="bt1">
                              ---
                            </button>
                            <button className="button">
                              <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6Zb8hgxy6Dyv8xA0u8P2uNo1QJeCw7si47nfcWYAln2mubNlIhDpbtyh2w1aMfNm4S6c&usqp=CAU"
                                alt="Image"
                                className="button-image"
                              />
                              {ticket.tag}
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}
export default Selectoption;

