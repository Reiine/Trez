import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function YourComments({ authToken }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getComments = async () => {
      console.log(authToken);
      try {
        const response = await axios.post(
          "/fetch-comments",
          {},
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        setComments(response.data);
        setLoading(false);
      } catch (error) {
        console.log("Error occurred");
        setLoading(false);
      }
    };
    getComments();
  }, [authToken]);

  return (
    <div className="your-comments-cover">
      {loading ? (
        <div>Loading...</div>
      ) : comments.length > 0 ? (
        <div className="your-orders-cover">
          {comments.map((data) => {
            const stars = Array.from(
              { length: data.comment.rating },
              (_, index) => index + 1
            );

            return (
              <div className={`single-product-cover comment-product-cover`} key={data.comment._id}>
                <img
                  src={data.productDetail.img}
                  alt={data.productDetail.name}
                  width={10}
                  height={150}
                />
                <div className="ordered-product-info">
                  <Link to={`/items/${data.productDetail._id}`}>
                    <h3>{data.productDetail.name}</h3>
                  </Link>
                  <div className="your-comment">
                    <p>{stars.map((star) => "⭐").join("")}</p>
                    <p>
                      {data.comment.date.day}/{data.comment.date.month}/
                      {data.comment.date.year}
                    </p>
                    <p>{data.comment.comment}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-comments">No comments found</p>
      )}
    </div>
  );
}

export default YourComments;
