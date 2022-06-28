import styled from "styled-components";
import logo from "../img/EYET-logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const [cartNumber, setCartNumber] = useState(0);
  useEffect(() => {
    if (localStorage.getItem("cart")) {
        if (JSON.parse(localStorage.getItem("cart")).length > 0) {
            setCartNumber(JSON.parse(localStorage.getItem("cart")).length)
            console.log(JSON.parse(localStorage.getItem("cart")).length)
        } else {
            console.log(JSON.parse(localStorage.getItem("cart")).length)
        }
      } else {
            setCartNumber(0)
      }
  },[])
  return (
    <Menu>
      <HeaderWrap>
        <NavLink to="/">
          <Logo src={logo} alt="EYET Logo" />
        </NavLink>
        
        <Nav>
          <ul>
            <li>
              <NavLink to="/">Books</NavLink>
            </li>
            <li>
              <NavLink to="/wishlist">Whishlist</NavLink>
            </li>
          </ul>
          <NavLink to="/cart" style={{textDecoration: "none"}}>
            <Cart>
              <FontAwesomeIcon icon={faCartShopping} />{" "}
              <NotificationCircle className="number">{cartNumber}</NotificationCircle>
            </Cart>
          </NavLink>
        </Nav>
      </HeaderWrap>
    </Menu>
  );
}

export default Header;
const Menu = styled.header`
  position: sticky;
  top: 0px;
  padding: 30px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.96);
  z-index: 4;
`;
const HeaderWrap = styled.div`
  width: 100%;
  /* max-width: 1024px; */
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.img`
  width: 120px;
  object-fit: contain;
`;
const Nav = styled.nav`
  display: flex;
  padding: 0 10px;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  gap: 50px;
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    gap: 20px;
    list-style-type: none;
    color: var(--light-text);
    margin-left: 5%;
    @media only screen and (max-width: 1000px) {
      margin-left: -20px;
    }
    li {
      cursor: pointer;
      a {
        text-decoration: none;
        color: var(--light-text);
      }
    }
    li a.active {
      color: var(--gray-and-bold);
    }
  }
`;
const Cart = styled.button`
  color: var(--gray-and-bold);
  font-size: 16px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: -30px;
  display: flex;
  align-items: center;
`;
const NotificationCircle = styled.div`
  width: 15px;
  height: 15px;
  background-color: var(--heart-red);
  color: #fff;
  font-size: 10px;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  top: -10px;
  left: -5px;
  text-decoration: none;
`;
