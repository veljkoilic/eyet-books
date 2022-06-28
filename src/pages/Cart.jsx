import styled from "styled-components";
import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket} from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck, faMoneyBill1 } from "@fortawesome/free-regular-svg-icons"
function Cart() {
  if(!localStorage.getItem("cart")){
    localStorage.setItem("cart", "[]")
}
  const [cartBooks, setCartBooks] = useState([]);
  const [localCart, setlocalCart] = useState(
    JSON.parse(localStorage.getItem("cart"))
  );

  useEffect(() => {
    for (let i = 0; i < localCart.length; i++) {
      const element = localCart[i];
      fetch("https://api.itbook.store/1.0/books/" + element)
        .then((res) => res.json())
        .then((data) => {
          setCartBooks((prev) => {
            return [...prev, data];
          });
        });
    }
  }, []);
  const cartBooksElements = cartBooks.map((book) => {
    return (
      <div style={{ display: "flex" }} key={book.isbn13}>
        <BookCard book={book} pageCart={true} setBooks={setCartBooks} />
      </div>
    );
  });

  let cartTotal = 0;
  for (let i = 0; i < cartBooks.length; i++) {
    const element = Number(cartBooks[i].price.substring(1));
    cartTotal += element;
  }
  cartTotal = cartTotal.toFixed(2);
  return (
    <div>
      <h1>You Cart</h1>
      <Container>
        <BookListWrapper>
          {(!localStorage.getItem("cart") ||
            localStorage.getItem("cart").length) <= 2 && (
            <div>
              <h2>You haven't added any books to your cart yet.</h2>
              <p>Click add to cart and the books will show up here!</p>
            </div>
          )}
          {localStorage.getItem("cart") && cartBooksElements}
          {console.log(cartBooks)}
        </BookListWrapper>
        <Right>
            <div className="price"><h3>Cart Total: ${cartTotal}</h3></div>
            <div className="deliveryInfo">
                <div className="delivery"><FontAwesomeIcon icon={faMoneyBill1}/><p>30 days Money back guarantee!</p></div>
                <div className="delivery"><FontAwesomeIcon icon={faRocket}/><p> Free delivery Worldwide!</p></div>
                <div className="available"><FontAwesomeIcon icon={faCircleCheck}/><p>Expected delivery in 19-24 business days.</p></div>
            </div>
            <div className="buttons">
                <button className="addToCart">Checkout</button>
            </div>

        </Right>
      </Container>
    </div>
  );
}

export default Cart;
const Container = styled.div`
  display: flex;
  gap: 10px;
  @media only screen and (max-width: 1300px) {
    flex-wrap: wrap;
  }
`
const BookListWrapper = styled.div`
  flex: 4;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 250px;
  gap: 20px;
  @media screen and (max-width: 1500px) {
    grid-template-columns: 1fr;
    flex: 1;
  }
`;
const Right = styled.div`
    flex: 1;
    min-width: 250px;
    position: sticky;
    top: 150px;
    border: 2px solid var(--border);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 20px 40px 20px;
    height: 300px;
    margin-bottom: 100px;
        .price{
        justify-self: start;
        font-size: 18px;
        margin: 0;
        color: var(--cash-green);
        border-bottom: 1px solid var(--border);
    }
    .delivery{
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
        p{
            color: var(--gray-and-bold);
        }
        padding-bottom: 1px;
    }
    .available{
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 14px;
        p{
            color: var(--gray-and-bold);
        }
    }
    .buttons{
        display: flex;
        flex-direction: column;
        gap: 10px;
        button{
            border: none;
            padding: 8px;
            border-radius: 7px;
            transition: 0.5s;
            font-size: 14px;
            position: relative;
            cursor: pointer;
        }
        .addToCart{
            background-color: var(--gray-and-bold);
            color: #fff;
            &:hover{
                background-color: var(--cash-green) ;
                transform: scale(1.02)

            }
        }   
        .addToWishlist{
            color: var(--gray-and-bold);
            &:hover{
                background-color: var(--heart-red) ;
                color: #fff;
                transform: scale(1.02)

            }
        }
    }



`
