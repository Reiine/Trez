import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import YourOrders from "./YourOrders";
import YourComments from "./YourComments";
import EditInfo from "./EditInfo";
import Nav from "react-bootstrap/Nav";

function AccountInfo({ authToken, onLogout }) {
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("your-orders");
  const [initialTabClick, setInitialTabClick] = useState(false);
  const tabButtonsRef = useRef({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          "/fetch-user",
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setUser(response.data[0]);
        setInitialTabClick(true); // Set the initial tab click flag
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [authToken]);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleLogout = () => {
    Cookies.remove("userData");
    window.location.replace("http://localhost:3000/");
  };

  return (
    <div className="account-info-cover" >
      <div className="display-user-info">
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <p>{user.address}</p>
        <button className="btn btn-outline-dark" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <hr />
      <div className="tab">
        <button
          ref={(button) => (tabButtonsRef.current["your-orders"] = button)}
          className={`tablinks your-orders ${
            activeTab === "your-orders" && initialTabClick ? "active" : ""
          }`}
          onClick={() => handleTabClick("your-orders")}
        >
          Your Orders
        </button>
        <button
          ref={(button) => (tabButtonsRef.current["your-comments"] = button)}
          className={`tablinks ${
            activeTab === "your-comments" && initialTabClick ? "active" : ""
          }`}
          onClick={() => handleTabClick("your-comments")}
        >
          Your Comments
        </button>
        <button
          ref={(button) => (tabButtonsRef.current["edit-info"] = button)}
          className={`tablinks ${
            activeTab === "edit-info" && initialTabClick ? "active" : ""
          }`}
          onClick={() => handleTabClick("edit-info")}
        >
          Edit Information
        </button>
      </div>

      {/* Tab content */}
      <div className="tabsss">
        {initialTabClick && activeTab === "your-orders" && (
          <YourOrders authToken={authToken} />
        )}
        {initialTabClick && activeTab === "your-comments" && (
          <YourComments authToken={authToken} />
        )}
        {initialTabClick && activeTab === "edit-info" && (
          <EditInfo authToken={authToken} />
        )}
      </div>
    </div>
  );
}

export default AccountInfo;
