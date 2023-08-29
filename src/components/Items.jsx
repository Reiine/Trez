import React, { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CardComponent } from "./HomeCard";
import axios from "axios";
import { toast } from "react-toastify";
import CustomerReviews from "./CustomerReviews";
function Items({ authToken, setCartAccessed, cartAccessed }) {
  const [filterNew, setFilterNew] = useState([]);
  const { id } = useParams();
  const [itemFilter, setItemFilter] = useState(null);
  const [cartStock, setCartStock] = useState(5);
  const [quantity, setQuantity] = useState(1);
  const [itemId, setItemId] = useState("");
  const [commentDetails, setCommentDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/product`)
      .then((response) => {
        const data = response.data;
        const item = data.find((item) => item._id === id);
        if (item) {
          setItemId(item._id); 
          setItemFilter(item);
          const temp = data.filter((dataItem) => dataItem.name !== id);
          const newtemp = temp.length > 8 ? temp.splice(0, 8) : temp;
          setFilterNew(newtemp);
        }
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, [id]);

  async function handleCart() {
    if (!authToken) {
      toast.error("Please Login To Access Cart!");
      return;
    }

    try {
      await axios.post(
        "/addToCart",
        {
          quantity,
          itemId,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      toast.success("Item Added To Cart");
      setCartAccessed((prev) => !prev);
    } catch (e) {
      toast.error("Error adding to cart", e);
    }
  }

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.post("/fetchComments", {
          itemId,
        });
        if (Array.isArray(response.data)) {
          setCommentDetails(response.data);
        } else {
          setCommentDetails([response.data]);
        }
      } catch (error) {
        toast.error("Error fetching comment");
      }
    };

    if (itemId !== "") {
      fetchComments();
    }
  }, [itemId]);

  const handleRedirect = () =>{
    navigate(`/billing/${itemFilter._id}/${quantity}`);
  }

  return (
    <div className="itemscover">
      {itemFilter && (
        <div className="itemParentDiv">
          <div className="sticky-item">
            <img src={itemFilter.img} alt="item" />
          </div>
          <div className="textonly">
            <h5>{itemFilter.name}</h5>
            <p>{itemFilter.brand}</p>
            <p>Rs. {itemFilter.price}</p>
            <div className="itemquantity">
              <label htmlFor={`quantity-${itemFilter.name}`}>Quantity:</label>
              <select
                name="quantity"
                id={`quantity`}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              >
                {Array.from({ length: cartStock }, (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="itembuttons">
              <Button variant="success" size="lg" onClick={handleRedirect}>
                Buy Now
              </Button>
              <Button variant="warning" size="lg" onClick={handleCart}>
                Add to cart
              </Button>
            </div>
            <div className="browseotheritemscover">
              <div className="write-review">
                <h3>Leave a review</h3>
                <CustomerReviews itemId={itemId} authToken={authToken} />
              </div>
              <div className="customer-reviews">
                <h3>Customer Reviews</h3>
                <div className={`all-user-comment ${commentDetails.length<3 ? '' : 'allusercommentheight'} `}>
                  {commentDetails.length === 0 ? (
                    <p className="fs-5 center text-muted " >Be the first to leave a review!</p>
                  ) : (
                    commentDetails.map((comment, index) => (
                      <div className="comment" key={index}>
                        <p>{comment.user}</p>
                        <div>
                          {Array.from(
                            { length: comment.rating },
                            (_, starIndex) => (
                              <i
                                key={starIndex}
                                className="fa fa-star"
                                style={{ color: "gold" }}
                              ></i>
                            )
                          )}
                        </div>
                        <p>
                          {comment.date.day}/{comment.date.month}/
                          {comment.date.year}
                        </p>
                        <p>{comment.comment}</p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Items;
