import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function DirectBuy({ authToken }) {
  const [price, setPrice] = useState(0);
  const { id, quantity } = useParams();
  const [priceId, setPriceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const [address,setAddress] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        setPrice(response.data.price);
      } catch (error) {
        console.log("Can't fetch data");
      }
    };
    const fetchUser = async () => {
      try {
        const response = await axios.post(
          "/get-user-info",
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching user");
      }
    };

    fetchData();
    fetchUser();
  }, [id]);

  useEffect(() => {
    if (price !== 0 && priceId !== null) {
      onToken();
    }
  }, [price, priceId]);

  const createPrice = async () => {
    try {
      setLoading(true);
      const billing = price * parseInt(quantity, 10);
      const response = await axios.post(
        "/create-price",
        {
          billing: billing,
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

  const onToken = async () => {
    console.log(id,quantity);
    try {
      setLoading(true);
      const response = await axios.post(
        "/payment",
        {
          billing: price * parseInt(quantity, 10),
          priceId,
          id,
          quantity
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

  return (
    <div className="direct-buy-cover">
      <div className="direct-buy-info">
        <h3>Review Your Order</h3>
        <h6 className="fw-bold">To</h6>
        <p>{user.name}</p>
        <h6 className="fw-bold">Email</h6>
        <p>{user.email}</p>
        <h6 className="fw-bold">Delivery Address</h6>
        <input type="text" placeholder="123 Main street..." onChange={(e)=>{setAddress(e.target.value)}}/>
        <button className="address-btn" onClick={updateAddress} >Save</button>
        <button className="btn btn-success" onClick={createPrice}>
          {loading
            ? "Loading"
            : `Proceed To Pay ${price * parseInt(quantity, 10)}`}
        </button>
      </div>
    </div>
  );
}

export default DirectBuy;