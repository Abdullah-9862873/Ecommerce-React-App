import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";

export default function CartItem({ item, value }) {
  const { id, img, title, price, total, count } = item;
  const { increment, decrement, removeItem, clearCart } = value;
  return (
    <div className="row my-2 text-capitalize text-center">
      <div className="col-10 col-lg-2 mx-auto">
        <img
          src={img}
          alt="product"
          className="img-fluid"
          style={{ width: "5rem", height: "5rem" }}
        />
      </div>
      <div className="col-10 col-lg-2 mx-auto">
        <div className="d-lg-none">product : </div>
        {title}
      </div>
      <div className="col-10 col-lg-2 mx-auto">
        <div className="d-lg-none">price : </div>
        {price}
      </div>
      <div className="col-10 col-lg-2 mx-auto my-2 my-lg-0">
        <div className="d-flex justify-content-center">
          <div>
            <span className="btn btn-black mx-1" onClick={() => decrement(id)}>
              -
            </span>
          </div>
          <div>
            <span className="btn btn-black mx-1">{count}</span>
          </div>
          <div>
            <span className="btn btn-black mx-1" onClick={() => increment(id)}>
              +
            </span>
          </div>
        </div>
      </div>
      <div className="col-10 col-lg-2 mx-auto">
        <div className="cart-icon">
          <FontAwesomeIcon
            icon={solid("trash")}
            onClick={() => {
              return removeItem(id);
            }}
          />
        </div>
      </div>
      <div className="col-10 col-lg-2 mx-auto">
        <strong>Item total : $ {total}</strong>
      </div>
    </div>
  );
}
