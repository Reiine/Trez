import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function BillingPage({ billing, authToken, user }) {
  const [loading, setLoading] = useState(false);
  const [priceId, setPriceId] = useState(null);
  const [address, setAddress] = useState("");

  const createPrice = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/create-price",
        {
          billing,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
        
      setPriceId(response.data.priceId);

      setLoading(false);
    } catch (error) {
      console.log("Error creating price:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (priceId !== null) {
      onToken();
    }
  }, [priceId]);

  const onToken = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/payment",
        {
          billing,
          priceId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      const url = response.data.sessionUrl;
      window.location.href = `${url}`;
    } catch (error) {
      toast.error("Error submitting payment");
    } finally {
      setLoading(false);
    }
  };
  const handleAddress = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/set-address",
        {
          address,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data);
      setLoading(false);
    } catch (error) {
      console.log("Error creating price:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="direct-buy-cover">
        <div className="direct-buy-info">
          <h3>Review Your Order:</h3>
          <h6 className="fw-bold">To:</h6>
          <p>
            {user.name} <br /> {user.email}
          </p>
          <h6 className="fw-bold">Delivery Address:</h6>
          {user.address !== null && user.address !== undefined ? (
            user.address
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter Your Address"
                onChange={(e) => setAddress(e.target.value)}
              />
              <button className="btn btn-outline-dark px-1 my-1" onClick={handleAddress}>Save</button>
            </>
          )}
          <button onClick={createPrice} className="btn btn-success">
            {loading ? "Loading..." : `Proceed To Pay ${billing}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BillingPage;
