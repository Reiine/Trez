import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function DirectBuy({ authToken }) {
  const [price, setPrice] = useState(0);
  const { id, quantity } = useParams(); 
  const [priceId, setPriceId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/product/${id}`);
        setPrice(response.data.price);
      } catch (error) {
        console.log("Can't fetch data");
      }
    };

    fetchData();
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
    try {
      setLoading(true);
      const response = await axios.post(
        "/payment",
        {
          billing: price * parseInt(quantity, 10),
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

  return (
    <div className="direct-buy-cover">
      <div className="direct-buy-info">
        <h3>Review Your Order</h3>
        <h6 className="fw-bold">To</h6>
        <p>Reiine Iangar</p>
        <h6 className="fw-bold">Email</h6>
        <p>example@demo.com</p>
        <h6 className="fw-bold">Contact</h6>
        <p>+234 803 123 4567</p>
        <h6 className="fw-bold">Delivery Address</h6>
        <button className="btn btn-success" onClick={createPrice}>
          {loading ? "Loading" : `Proceed To Pay ${price * parseInt(quantity, 10)}`}
        </button>
      </div>
    </div>
  );
}

export default DirectBuy;
