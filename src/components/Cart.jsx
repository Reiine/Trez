import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchItemDetails } from "./apiutils/apiUtils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Cart({ isLogin, authToken, updateCartItemCount, goToBilling,getUser }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    async function fetchCartItemsAndDetails() {
      if (authToken) {
        try {
          const response = await axios.post(
            "/fetch-cart-items",
            {},
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
            getUser(response.data.user);
          const updatedCartItems = await Promise.all(
            response.data.userMatch[0].cartItems.map(async (item) => {
              const itemDetails = await fetchItemDetails(item.itemId);
              return {
                ...item,
                price: itemDetails.price,
                name: itemDetails.name,
                img: itemDetails.img,
                des: itemDetails.des,
              };
            })
          );

          setCartItems(updatedCartItems);
          const calculatedTotalPrice = calculateTotalPrice(updatedCartItems);
          setTotalPrice(calculatedTotalPrice);
        } catch (e) {
          console.log("Error fetching cart items:", e);
        }
      }
    }

    fetchCartItemsAndDetails();
  }, [authToken]);

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  const handleQuantityChange = async (e, item) => {
    const newQuantity = parseInt(e.target.value);

    try {
      await axios.post(
        "/quantity-update",
        {
          itemId: item.itemId,
          newQuantity: newQuantity,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      const updatedCartItems = cartItems.map((cartItem) => {
        if (cartItem.itemId === item.itemId) {
          return { ...cartItem, quantity: newQuantity };
        }
        return cartItem;
      });

      setCartItems(updatedCartItems);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleCartItemDelete = async (itemId) => {
    try {
      await axios.delete(`/cart-item-delete/${itemId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      toast.error("Item deleted");
      const updatedCartItems = cartItems.filter(
        (item) => item.itemId !== itemId
      );
      setCartItems(updatedCartItems);
      updateCartItemCount(updatedCartItems.length);
    } catch (error) {
      toast.error("Error deleting cart item");
    }
  };

  return (
    <>
      {cartItems.length === 0 ? (
        <div className="cartcover">
          {!isLogin ? (
            <>
              <p>Please Register/Login to access the cart</p>
              <div className="log-reg-btn">
                <button className="btn btn-dark">
                  <Link to={`/account/`}>Register</Link>
                </button>
                <button className="btn btn-dark">
                  <Link to={`/account/login`}>Login</Link>
                </button>
              </div>
            </>
          ) : (
            <h1>No items in your cart</h1>
          )}
        </div>
      ) : (
        <div className="logged-in-cart">
          {isLogin ? (
            <>
              <p>Your Cart: </p>
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <img src={item.img} alt="item" height={200} />
                  <div className="item-name-des">
                    <h6>{item.name}</h6>
                    <p>{item.des}</p>
                  </div>
                  <div className="cart-quantity-cover">
                    <select
                      name="quantity"
                      id="cart-quantity"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(e, item)}
                    >
                      {[...Array(5).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="price-n-btn">
                    <p>Rs. {item.price * item.quantity}</p>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCartItemDelete(item.itemId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <div className="cart-buttons">
                <p>
                  Total: <span> Rs. {calculateTotalPrice()}</span>
                </p>
                <button
                  className="btn btn-success"
                  onClick={() => {
                    goToBilling(()=>calculateTotalPrice());
                    navigate("/billing");
                  }}
                >
                  Proceed to pay
                </button>
                <Link to={"/shop"}>Continue shopping {">"}</Link>
              </div>
            </>
          ) : (
            <div className="cartcover">
              <p>Please Register/Login to access the cart</p>
              <div className="log-reg-btn">
                <button className="btn btn-dark">
                  <Link to={`/account/signup`}>Register</Link>
                </button>
                <button className="btn btn-dark">Login</button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Cart;
