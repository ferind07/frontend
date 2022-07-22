import React from "react";
import { Empty } from "antd";
import CommentComp from "./CommentComp";

const ReviewContent = (props) => {
  const listReview = props.review;

  const renderReview = () => {
    if (listReview.length == 0) {
      return <Empty description="no reviews" className="mt-5" />;
    } else {
      const component = [];
      listReview.forEach((element) => {
        component.push(
          <div className="col-12">
            <CommentComp
              name={element.name}
              rating={element.rating}
              comment={element.comment}
              className={element.title}
            />
          </div>
        );
      });
      return component;
    }
  };

  return (
    <div style={{ height: "100vh" }}>
      <div className="row" style={{ overFlow: "auto" }}>
        {renderReview()}
      </div>
    </div>
  );
};

export default ReviewContent;
