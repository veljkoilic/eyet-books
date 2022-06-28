import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faRocket, faHeart, faHeartBroken } from "@fortawesome/free-solid-svg-icons"
import { faCircleCheck, faMoneyBill1 } from "@fortawesome/free-regular-svg-icons"
import Comment from "../components/Comment"


function Book() {
    const { id } = useParams()
    const API = 'https://api.itbook.store/1.0/books/'+id
    const [book, setBook]= useState({})
    const [isFavourited, setIsFavourited] = useState(false)
    const [isInCart, setIsInCart] = useState(false)

    useEffect(()=>{
        fetch(API).then(res=>res.json()).then(data=>{
            setBook(data)  
            //check if it is in favourites
            if(localStorage.getItem('favourites')){
                if(JSON.parse(localStorage.getItem('favourites').includes(data.isbn13))){
                    setIsFavourited(true)
                }
                else{
                    setIsFavourited(false)
                }
            }else{
                setIsFavourited(false)
            }    
            if(localStorage.getItem('cart')){
                if(JSON.parse(localStorage.getItem('cart').includes(data.isbn13))){
                    setIsInCart(true)
                }
                else{
                    setIsInCart(false)
                }
            }else{
                setIsInCart(false)
            }        
        })
        
    },[])
    const starRatingElements = [] 
        for (let i = 0; i < parseInt(book.rating); i++) {
            starRatingElements.push(<StarIcon key={i} icon={faStar}/>)
            
        }

        //random texts
        const [fakeComments, setFakeComments] = useState([])
        useEffect(()=>{
            fetch('https://baconipsum.com/api/?type=meat-and-filler').then(res=>res.json()).then(data=>{setFakeComments(data)})
        },[])
        // const commentElements = fakeComments.map(comment=>{
        //     return <Comment key={comment} text={comment}/>
        // })
        // 4+ comments break random user API so sticking with a for loop to limit it as bacon ipsum api result number cant be limited
        let commentElements = []
        for (let i = 0; i < 4; i++) {
            const comment = fakeComments[i];
            commentElements.push(
                <Comment key={i} text={comment}/>
            )
        }
        function saveFavourite(event){
            if(localStorage.getItem('favourites')){
                const favourites = JSON.parse(localStorage.getItem('favourites'))
                if(!favourites.includes(book.isbn13)){
                    favourites.push(book.isbn13)
                    localStorage.setItem("favourites", JSON.stringify(favourites))
                    setIsFavourited(true)
    
                }else{
    
                    let index = favourites.indexOf(book.isbn13)
                    favourites.splice(index, 1);
                    localStorage.setItem("favourites", JSON.stringify(favourites))
                    setIsFavourited(false)
                }
                
            }else{
                localStorage.setItem("favourites", JSON.stringify([book.isbn13]))
                setIsFavourited(true)
    
            }
        }
        function saveToCart(event){
            if(localStorage.getItem('cart')){
                const cartItems = JSON.parse(localStorage.getItem('cart'))
                if(!cartItems.includes(book.isbn13)){
                    cartItems.push(book.isbn13)
                    localStorage.setItem("cart", JSON.stringify(cartItems))
                    setIsInCart(true)
    
                }else{
    
                    let index = cartItems.indexOf(book.isbn13)
                    cartItems.splice(index, 1);
                    localStorage.setItem("cart", JSON.stringify(cartItems))
                    setIsInCart(false)
                }
                
            }else{
                localStorage.setItem("cart", JSON.stringify([book.isbn13]))
                setIsInCart(true)
    
            }
        }


  return (
      <div>
    <BookWrapper>
        <Left className="left">
            <img src={book.image} alt="" />
            <Info className="info">
            <h1>{book.title}</h1>
            <h2>{book.subtitle}</h2>
            <p>{book.rating != 0 && <span>Rating:</span>} <span className="stars">
                    {starRatingElements}
                </span></p>
                <p>By: <span className="grayBold">{book.authors}</span></p>
                <p>Publisher: <span className="grayBold">{book.publisher}</span></p>
                <p>Language:  <span className="grayBold">{book.language}</span></p>

            <p>{book.desc}</p>
            <p>Pages: <span className="grayBold">{book.pages}</span></p>
            <p>Publishing date: <span className="grayBold">{book.year}</span></p>
            </Info>
        </Left>
        <Right>
            <div className="price"><h3>{book.price === '$0.00' ? 'Free' : book.price}</h3></div>
            <div className="deliveryInfo">
                <div className="delivery"><FontAwesomeIcon icon={faMoneyBill1}/><p>30 days Money back guarantee!</p></div>
                <div className="delivery"><FontAwesomeIcon icon={faRocket}/><p> Free delivery Worldwide!</p></div>
                <div className="available"><FontAwesomeIcon icon={faCircleCheck}/><p>Expected delivery in 19-24 business days.</p></div>
            </div>
            <div className="buttons">
                <button className="addToCart" onClick={saveToCart}>{ isInCart ? "Remove":"Add to Cart"}</button>
                <button className="addToWishlist" onClick={saveFavourite} style={isFavourited ? {backgroundColor: 'var(--heart-red)', color:'#fff'} : {}}>{isFavourited ? <span>Remove from Wishlist <FontAwesomeIcon icon={faHeartBroken}/></span>:<span>Add to Wishlist <FontAwesomeIcon icon={faHeart}/></span>}</button>
            </div>

        </Right>
    </BookWrapper>
    <Reviews>
        <h4>Reviews And Comments</h4>
        <div className="commentsWrap">
            <textarea name="" id="" cols="0" rows="2" placeholder='Want to share your thoughts about this book?'></textarea>
            <button>Submit</button>
        {commentElements}
        </div>
    </Reviews>
    </div>

  )
}
export default Book
const BookWrapper = styled.div`
    width: 80%;
    border-radius: 10px;
    padding: 20px 50px;
    display: flex;
    gap: 15px;
    margin: 50px auto;
    font-weight: 300;
    p{
        color: var(--light-text);
        .grayBold{
            color: var(--gray-and-bold);
            font-weight: 500;

    }
    }
@media only screen and (max-width: 1300px){
    flex-direction: column;
}
`
const Left = styled.div`
    display: flex;
    align-items: center;
    flex: 4;
    border: 2px solid var(--border);
    border-radius: 10px;
    @media only screen and (max-width: 900px){
        flex-direction: column;
    }


`
const Right = styled.div`
    flex: 1;
    border: 2px solid var(--border);
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 10px 20px 40px 20px;


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
const Info = styled.div`
    padding: 0px 20px;
    h1{
        color: var(--gray-and-bold);
    }
    h2{
        font-weight: 300;
        font-size: 16px;
    }
`
const StarIcon = styled(FontAwesomeIcon)`
    color: var(--orange-annotate);
`
const Reviews = styled.div`
    width: 100%;
    margin: 0 auto;
    padding: 0px;
    h4{
        font-size: 24px;
        margin-left: 10%;
    }
    .commentsWrap{
        margin: 0 auto;
        width: 80%;
        border: 2px solid var(--border);
        border-radius: 10px;
        padding: 10px 0px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: center;
        textarea{
            margin-top: 20px;
            width: 80%;
            border-radius: 10px;
            border: 2px solid var(--border);
            padding: 10px;
        }
        button{
            width: 30%;
            margin-top: 10px;
            padding:10px;
            border-radius: 10px;
            border: none;
            color: #000;
            transition: 0.5s;
            &:hover{
            background-color: var(--orange-annotate);
            color: #fff;
            transform: scale(1.05);
            transition: 0.5s;
            cursor: pointer;
            }
        }
    }
`