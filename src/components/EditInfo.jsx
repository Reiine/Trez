import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

function EditInfo({ authToken, setAddressUpdate }) {
  const [address, setAddress] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const updateAddress = async () => {
    try {
      const response = await axios.post(
        "/set-address",
        {
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success(response.data);
      setAddress("");
    } catch (error) {
      toast.error("Error updating address");
    }
  };

  const updatePassword = async () => {
    try {
      const response = await axios.post(
        "/update-password",
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success(response.data);
    } catch (error) {
      console.log("Error updating password");
    }
  };

  return (
    <div className="edit-info-cover m-5">
      <div className="info-cover">
        <h5>Address:</h5>
        <input
          type="text"
          placeholder="123 Main Street..."
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            setAddressUpdate(e.target.value); 
          }}
        />
        <br />
        <button
          className="btn btn-outline-dark w-100 rounded-0"
          onClick={updateAddress}
        >
          Save
        </button>
        <br />
        <h5>Password:</h5>
        <input
          type="password"
          placeholder="current password"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="new password"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br />
        <button
          className="btn btn-outline-dark w-100 rounded-0"
          onClick={updatePassword}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditInfo;
