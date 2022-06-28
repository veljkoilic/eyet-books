import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as emptyHeart } from "@fortawesome/free-regular-svg-icons";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BookList from "./BookList";

function BookCard({ book, wishlist, pageCart,setBooks }) {
  const [isFavourited, setIsFavourited] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  useEffect(() => {
    //Check if favourites exists, if yes, checks if current book is inside the favourites. Adjusts the favourites state accordingly

    if (localStorage.getItem("favourites")) {
      if (
        JSON.parse(localStorage.getItem("favourites").includes(book.isbn13))
      ) {
        setIsFavourited(true);
      } else {
        setIsFavourited(false);
      }
    } else {
      setIsFavourited(false);
    }
    //Check if cart exists, if yes, checks if current book is inside the cart. Adjusts the cart state accordingly
    if (localStorage.getItem("cart")) {
      if (JSON.parse(localStorage.getItem("cart").includes(book.isbn13))) {
        setIsInCart(true);
      } else {
        setIsInCart(false);
      }
    } else {
      setIsInCart(false);
    }
  }, []);
  function saveFavourite(event) {
    if (localStorage.getItem("favourites")) {
      const favourites = JSON.parse(localStorage.getItem("favourites"));
      if (!favourites.includes(book.isbn13)) {
        favourites.push(book.isbn13);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        setIsFavourited(true);
      } else {
        let index = favourites.indexOf(book.isbn13);
        favourites.splice(index, 1);
        localStorage.setItem("favourites", JSON.stringify(favourites));
        setIsFavourited(false);
        if (wishlist) {
          event.target.parentNode.parentNode.parentNode.parentNode.style.height = 0;
          event.target.parentNode.parentNode.parentNode.parentNode.style.opacity = 0;

          setTimeout(() => {
            event.target.parentNode.parentNode.parentNode.parentNode.style.display =
              "none";
          }, 350);
        }
      }
    } else {
      localStorage.setItem("favourites", JSON.stringify([book.isbn13]));
      setIsFavourited(true);
    }
  }
  // set cart

  function saveToCart(event) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      if (!cart.includes(book.isbn13)) {
        cart.push(book.isbn13);
        localStorage.setItem("cart", JSON.stringify(cart));
        setIsInCart(true);
      } else {
        let index = cart.indexOf(book.isbn13);
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        setIsInCart(false);
        if (pageCart) {
          event.target.parentNode.parentNode.parentNode.style.height = 0;
          event.target.parentNode.parentNode.parentNode.style.opacity = 0;

          setTimeout(() => {
            event.target.parentNode.parentNode.parentNode.parentNode.style.display =
              "none";
          }, 350);
        }
      }
    } else {
      localStorage.setItem("cart", JSON.stringify([book.isbn13]));
      setIsInCart(true);
    }
  }
 
  return (
    <CardWrapper className="card">
      <CardLink to={`/book/${book.isbn13}`}>
        <img src={book.image} alt="" />
      </CardLink>

      <div className="info">
        <CardLink to={`/book/${book.isbn13}`}>
          <h4 className="title">{book.title}</h4>
        </CardLink>
        <h5 className="subtitile">{book.subtitle}</h5>

        {!pageCart && <span className="price">
          {book.price == "$0.00" ? "FREE " : book.price}
        </span>}
        <div className="cartHeart">
          <button onClick={saveToCart}>
            {isInCart ? "Remove" : "Add to cart"}
          </button>
          <HeartIcon
            icon={isFavourited ? faHeart : emptyHeart}
            onClick={saveFavourite}
          />
        </div>
      </div>
      {pageCart && <CartRight>
            <BigPrice>{book.price == "$0.00" ? "FREE " : book.price}</BigPrice>
          </CartRight>}
    </CardWrapper>
  );
}

export default BookCard;
const CardLink = styled(Link)`
  text-decoration: none;
`;
const CartRight = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  padding-right: 20px;
`;
const BigPrice = styled.div`
    font-size: 25px;
    color: var(--cash-green);
`;
const CardWrapper = styled.div`
  width: 100%;
  /* min-width: 420px; */
  height: 100%;
  display: flex;
  align-items: center;
  border-radius: 10px;
  border: 1px solid var(--border);
  padding: 10px;
  box-sizing: border-box;
  transition: 0.5s;
  overflow: hidden;
  &:hover {
    background-color: whitesmoke;
  }
  img {
    width: 200px;
    object-fit: cover;
    border-radius: 10px 0 0 10px;
    @media screen and (max-width: 1300px) {
      width: 150px;
    }
  }
  .info {
    display: flex;
    flex-direction: column;
    padding: 35px 0;
    .title {
      font-weight: 500;
      color: var(--gray-and-bold);
      margin: 0;
      padding-bottom: 10px;
      text-overflow: clip;
      word-wrap: break-word;
      overflow: hidden;
      max-height: 2em;
      line-height: 1.4em;
      &:hover {
        text-decoration: underline;
      }
      @media screen and (max-width: 1300px) {
        font-size: 14px;
      }
    }
    .subtitile {
      color: var(--light-text);
      font-weight: 300;
      height: 20px;
      margin: 0px 0 15px 0;

      display: block;
      text-overflow: clip;
      word-wrap: break-word;
      overflow: hidden;
      max-height: 5.2em;
      line-height: 1.8em;
    }
    .price {
      color: var(--cash-green);
      font-size: 15px;
      padding-bottom: 10px;
    }
    .cartHeart {
      display: flex;
      align-items: center;
      gap: 10px;
      svg {
        z-index: 3;
        transition: 0.1s;
        &:hover {
          transition: 0.1s;

          transform: scale(1.1);
        }
      }
      button {
        background-color: var(--gray-and-bold);
        color: #fff;
        padding: 10px 20px;
        border: none;
        border-radius: 1000px;
        transition: 0.5s;
        @media screen and (max-width: 1300px) {
          font-size: 12px;
          padding: 10px 15px;
        }
        &:hover {
          background-color: var(--cash-green);
          cursor: pointer;
          padding: 10px 30px;
        }
      }
    }
  }
`;
const HeartIcon = styled(FontAwesomeIcon)`
  color: var(--heart-red);
`;
const StarIcon = styled(FontAwesomeIcon)`
  color: var(--orange-annotate);
`;
