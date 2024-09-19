import { FaMinus, FaPlus } from "react-icons/fa";
import React, { Fragment } from "react";

export default function QuantityCounter({
  quantity,
  updateTime,
  handleDecrement,
  handleIncrement,
}) {
  return (
    <Fragment>
      <div className="quantity-counter">
        <FaMinus className="counter-button" onClick={handleDecrement} />
        <span className="quantity">{quantity}</span>
        <FaPlus className="counter-button" onClick={handleIncrement} />
      </div>
      {updateTime && (
        <div className="last-update-text">
          Last Updated: {updateTime.split(",")}
        </div>
      )}
    </Fragment>
  );
}
