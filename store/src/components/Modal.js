import React, { Component } from "react";
import styled from "styled-components";
import ButtonContainer from "./Button";
import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";

export default class Modal extends Component {
  render() {
    return (
      <ProductConsumer>
        {(value) => {
          const { modalOpen, closeModal } = value;
          const { img, price, title } = value.modalProduct;

          if (!modalOpen) {
            return null;
          } else {
            return (
              <ModalContainer>
                <div className="container">
                  <div className="row">
                    <div
                      id="modal"
                      className="mx-auto text-capitalize text-center col-8 col-md-6 col-lg-4 p-5"
                    >
                      <h5>Item added to the cart</h5>
                      <img src={img} className="img-fluid" alt="product" />
                      <h5>{title}</h5>
                      <h5 className="text-muted"> price: $ {price}</h5>
                      <Link to="/">
                        <ButtonContainer onClick={() => closeModal()}>
                          Continue Shopping
                        </ButtonContainer>
                      </Link>
                      <Link to="/store">
                        <ButtonContainer cart onClick={() => closeModal()}>
                          Go To Cart
                        </ButtonContainer>
                      </Link>
                    </div>
                  </div>
                </div>
              </ModalContainer>
            );
          }
        }}
      </ProductConsumer>
    );
  }
}

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  jusitfy-content: center;
  #modal {
    background: var(--mainWhite);
  }
`;
