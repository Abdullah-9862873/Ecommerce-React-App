import React, { Component } from "react";
import { ProductConsumer } from "../context";
import { Link } from "react-router-dom";
import ButtonContainer from "./Button";

export default class Details extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { id, company, img, info, price, title, inCart } =
            value.detailProduct;
          return (
            <div className="container py-5">
              {/* Title */}
              <div className="row">
                <div className="col-10 mx-auto text-center text-slanted text-blue my-5">
                  <h1>{title}</h1>
                </div>
              </div>
              {/* End Title */}
              {/* Product Info */}
              <div className="row">
                <div className="col-10 mx-auto col-md-6 my-3">
                  <img src={img} className="img-fluid" alt="product" />
                </div>
              </div>
              {/* Product Text */}
              <div className="col-10 mx-auto my-3 col-md-6 text-capitalize">
                <h2>Model: {title}</h2>
                <h4 className="text-title text-uppercase text-muted mt-3 mb-3">
                  made by: <span className="text-uppercase">{company}</span>
                </h4>
                <h4 className="text-blue">
                  <strong>
                    price: <span>$</span>
                    {price}
                  </strong>
                </h4>
                <p className="text-capitalize fw-bold mt-3 mb-0">
                  some info about products
                </p>
                <p className="text-muted lead">{info}</p>
                <div>
                  <ButtonContainer>
                    <Link to="/" style={{ textDecoration: "none" }}>
                      Back to Products
                    </Link>
                  </ButtonContainer>
                  <ButtonContainer
                    cart
                    disabled={inCart ? true : false}
                    onClick={() => {
                      value.addToCart(id);
                      value.openModal(id);
                    }}
                  >
                    {inCart ? "inCart" : "Add to cart"}
                  </ButtonContainer>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
