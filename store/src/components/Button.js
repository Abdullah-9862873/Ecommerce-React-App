import styled from "styled-components";

export default styled.button`
  text-decoration: none;
  text-transform: captilize;
  font-size: 1.4rem;
  background: transparent;
  border: ${(props) =>
    props.cart
      ? "0.05rem solid var(--mainYellow)"
      : "0.05rem solid var(--lightBlue)"};

  color: ${(props) => (props.cart ? "var(--mainYellow)" : "var(--lightBlue)")};

  border-radius: 0.5rem;
  padding: 0.5rem 0.2rem;
  cursor: pointer;
  margin: 0.2rem 0.5rem 0.2rem 0;
  transition: all 0.3s ease-in-out;
  &:hover {
    background: ${(props) =>
      props.cart ? "var(--mainYellow)" : "var(--lightBlue)"};
    color: var(--mainBlue);
  }
  &:focus {
    outline: none;
  }
`;
