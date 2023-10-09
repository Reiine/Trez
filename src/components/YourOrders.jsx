import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function YourOrders() {
  const [orderInfo, setOrderInfo] = useState([]);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id, orderId, quantity } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUserData = Cookies.get("userData");
        if (storedUserData) {
          const { authToken: storedAuthToken } = JSON.parse(storedUserData);
          setAuthToken(storedAuthToken);
          setLoading(false);

          const response = await axios.post(
            "/get-ordered-items",
            {
              quantity,
            },
            {
              headers: {
                Authorization: `Bearer ${storedAuthToken}`,
              },
            }
          );

          setOrderInfo(response.data);
          navigate('/account')
        }
      } catch (error) {
        console.error("Error fetching order information:", error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    const placeOrder = async () => {
      try {
        const response = await axios.post(
          "/set-ordered-item",
          {
            id,
            orderId,
            quantity,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        toast.success(response.data);
      } catch (error) {
        toast.error("Error placing order, a refund had been initiated");
        console.error("Error placing order:", error);
      }
    };

    if (!loading && authToken) {
      placeOrder();
    }
  }, [authToken, id, orderId, quantity, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="your-orders-cover">
      {orderInfo.length > 0 ? (
        orderInfo.map((data) => (
          <div
            className={`single-product-cover ${
              data.orderStatus === "Yet to confirm by seller"
                ? "pending-order"
                : "order-success"
            }`}
            key={data.id} 
          >
            <img src={data.img} alt={data.img} width={140} height={200} />
            <div className="ordered-product-info">
              <h3>{data.name}</h3>
              <p>{data.des}</p>
              <p>Quantity: {data.quantity}</p>
            </div>
            <div className="order-status">
              <p 
                style={{
                  color: `${
                    data.orderStatus === "Yet to confirm by seller"
                      ? "orange"
                      : "seagreen"
                  }`,
                }}
              >
                Order Status: <br /> {data.orderStatus}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="no-comments">No orders to display</p>
      )}
    </div>
  );
}

export default YourOrders;
