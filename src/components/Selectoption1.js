import React, { useEffect, useState } from "react";
import "./Selectoption1.css"; // Import your CSS file

function Selectoption1() {
  const [tickets, setTickets] = useState([]);
  const [users,setUsers]=useState([]);
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  useEffect(() => {
    fetch("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((data) => data.json())
      .then((val) => {
        setTickets(val.tickets);
        setUsers(val.users);
      });
  }, []);

  const getPriorityText = (priority) => {
    
    switch (priority) {
      case '4':
        return "Urgent";
      case '3':
        return "High";
      case '2':
       
        return "Medium";
      case '1':
 
        return "Low";
      case '0':
      
        return "No priority";
      default:
        return "";
    }
  };

  const getPriorityImage = (priority) => {
    switch (priority) {
      case '4':
        return 'https://cdn-icons-png.flaticon.com/128/3588/3588294.png';
      case '3':
        // Add image URL for High priority
        return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSpLewK4eSdkRHV84XYlckGcPPOczPvLLfk-iX1pbLGLRt8lNs4SroLCUu30u0Sqkdishg&usqp=CAU';
      case '2':
        // Add image URL for Medium priority
        return 'https://img.freepik.com/premium-vector/phone-signal-wifi-indicator-icon-vector_917138-3288.jpg?w=2000';
      case '1':
        // Add image URL for Low priority
        return 'https://img.freepik.com/premium-vector/phone-signal-wifi-indicator-icon-vector_917138-3296.jpg?w=2000';
      case '0':
        // Add image URL for No priority
        return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAY1BMVEX///8AAADCwsLNzc3Ly8vAwMDo6Ojd3d3Pz8/x8fHV1dXZ2dnj4+PS0tKCgoJFRUWZmZlSUlL39/d6enqjo6MuLi60tLRubm4cHBzu7u5hYWGJiYmRkZEODg6ysrJYWFglJSVa0pkdAAABSUlEQVR4nO3T226CQBQFUBVQKt5bbbX28v9fWZ1hMHEgqQ++rWU0gc2ZjTqMRgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9UTu4UbfBS3SfTNpnfB5O0WBY0bbDIkt3QSJn674Mq9S//3V9d+lfjzGssyIPxLCRvebCOBfs8OYSg7lksfsX3PFiF4PhI/3awvxr1rPMRrq56kk1Itj3JdOimTmHksydZXoNdT7API4eH+sPPNesJVqNzfvIc1tl95ckiJN958BN/w3WexA3U5MFv/A979tBmcA9Nh/pPg/2XPd8UdVHXRXxdzbon9HJQF+3Z62d6dKZle207V8zTSB3PlWHJy7s8poeqiKfjyHU0jTRl1xFruv54nO6tLsrUvwjX17e7W6aR5W0g3EHXDwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8Bx/eR8K2evACPgAAAAASUVORK5CYII=';
        case 'Todo':
        return 'https://cdn-icons-png.flaticon.com/512/33/33759.png';
        case 'In progress':
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg29mhoB1rJCqC2wuaz0jD9EVl2SUxo1qB-vrvhwUqzuxpTt5aPiB8EGVBjh9J0UERg2k&usqp=CAU';
        case 'Backlog':
            return 'https://cdn-icons-png.flaticon.com/512/2620/2620178.png';
        case 'usr-1':
            return 'https://cdn1.iconfinder.com/data/icons/avatars-and-biometry-data/154/online-status-web-person-avatar-512.png';
        case 'usr-2':
            return 'https://static.thenounproject.com/png/3864663-200.png';
        case 'usr-3':
            return 'https://static.thenounproject.com/png/418543-200.png';
        case 'usr-4':
            return 'https://icon-library.com/images/banned-icon/banned-icon-12.jpg';
        case 'usr-5':
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTBXL1BfYlHF39RzHmlMPqX0n83T1VxLtPuCQI90OHhg2ABh3hq7AZ5ANpE_QCMa2uzW0&usqp=CAU'
      default:
        return '';
    }
  };

  

  const getusername=(user_id)=>{
    const user = users.find((user) => user.id === user_id);
    return user ? user.name : "";
  }
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

  return (
    <div className="maini">
      <button className="disp" onClick={toggleBoxVisibility}><b>-_: </b>Display <b className="arrow">v</b></button>
      {isBoxVisible && (
        <div className="dropdowns">
          <div>
            <label>Group by </label>
            <select className="groupi"
              value={selectedCriteria}
              onChange={(e) => setSelectedCriteria(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="Status">Status</option>
              <option value="Priority">Priority</option>
              <option value="User">User</option>
            </select>
          </div>

          <div>
            <label>Sort by </label>
            <select className="sorti"
              value={selectedSortOption}
              onChange={(e) => setSelectedSortOption(e.target.value)}
            >
              <option value="">-- Select --</option>
              <option value="Priority">Priority</option>
              <option value="Title">Title</option>
            </select>
          </div>
        </div>
      )}

      <div className="container">
        {selectedCriteria && (
          <div className="columns-container">
            {Object.keys(groupedData).map((group, index) => (
              <div className="column" key={index}>
                <div className="column-heading">
                  {/* <span>{group}</span> */}
                 
                 <span>
                 <span id='prio'><img className="prio1"src={getPriorityImage(group)} height="25px" width="25px" ></img></span>
                    {selectedCriteria === "Priority"
                      ? getPriorityText(group)
                      : selectedCriteria === "User"
                      ? getusername(group)
                      : group}
                  </span>
                 <span> {groupedData[group].length}</span>
                 <span className="plus">+ ...</span>
                    
                
                </div>
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
                                <form>
                              <span><input type='checkbox' id="title"/>{ticket.title}</span>
                              </form>
                            </div>
                            <div className="buttons">
                              <button className="button_1" id="bt1">
                                ---
                              </button>
                              <button className="button_2">
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

export default Selectoption1;
