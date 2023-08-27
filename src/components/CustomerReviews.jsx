import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";

function CustomerReviews({ itemId , authToken }) {
  const [rating, setRating] = useState(null);
  const [comment, setComment] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios
        .post(
          "/add-comment",
          {
            rating,
            comment,
            itemId,
          },
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => {
          toast.success("Comment added successfully");
          setComment('');
          setRating(0);
        });
    } catch (error) {
      toast.error(error.response.statusText);
    }
  };
  return (
    <>
      <div className="customer-review-cover">
        <div className="stars-cover">
          {[5,4,3,2,1].map((star) => (
            <React.Fragment key={star}>
              <input
                type="radio"
                id={`rate-${star}`}
                name="rating"
                value={star}
                onChange={() => setRating(star)}
              />
              <label
                htmlFor={`rate-${star}`}
                className={`fa fa-star ${star <= rating ? "active" : ""}`}
              />
            </React.Fragment>
          ))}
        </div>
        <div className="review-box">
          <textarea
            name="cust-review"
            id="cust-review"
            cols="40"
            rows="5"
            placeholder="Describe your experience"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <Button
          variant="success px-4 mt-2"
          id="post-review-btn"
          onClick={handleSubmit}
        >
          Post
        </Button>
      </div>
    </>
  );
}

export default CustomerReviews;
