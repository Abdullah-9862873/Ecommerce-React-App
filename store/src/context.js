import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
// Provider
//Consumer

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0,
  };
  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach((item) => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };
  getItem = (id) => {
    const product = this.state.products.find((item) => {
      return item.id === id;
    });
    return product;
  };
  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addToCart = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    let price = product.price;
    product.total = price;
    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, product],
        };
      },
      () => {
        return this.addTotals();
      }
    );
  };
  openModal = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };
  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };
  incrementation = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.count += 1;
    product.total += product.price;
    this.setState(
      () => {
        return {
          products: tempProducts,
        };
      },
      () => {
        return this.addTotals();
      }
    );
  };
  decrementation = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.total -= product.price;
    if (product.count > 1) {
      product.count -= 1;
      this.setState(
        () => {
          return {
            products: [...this.state.products, product],
          };
        },
        () => {
          return this.addTotals();
        }
      );
    } else {
      product.inCart = false;
      return this.removeItem(id);
    }
  };
  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    const newCart = this.state.cart.filter((item) => {
      return item.id !== id;
    });
    this.setState(
      () => {
        return {
          cart: [...newCart],
        };
      },
      () => {
        return this.addTotals();
      }
    );
  };
  clearCart = () => {
    let tempProducts = [...this.state.products];
    {
      tempProducts.map((product) => {
        product.inCart = false;
      });
    }
    this.setState(() => {
      return {
        cart: [],
        products: [...tempProducts],
      };
    });
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map((item) => (subTotal += item.total));
    const tempTax = subTotal * 0.1;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        cartTax: tax,
        cartTotal: total,
      };
    });
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.incrementation,
          decrement: this.decrementation,
          removeItem: this.removeItem,
          clearCart: this.clearCart,
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };

// We have to put it at the top of the application so we have to import this inside the index.js

// Yaar jahan hum component banate hain wahan destructure karte hain or jahan import karte hain wahan props likhte hain yeh hota hai classes copoentns ke scenes mein

// Lekin agar functional component ho jese Title.js hai iss scenario mein toh aap jahan banate ho component wahan pe props bana sakte ho
