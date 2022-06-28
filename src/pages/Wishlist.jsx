import styled from "styled-components"
import {useState, useEffect} from'react'
import BookCard from "../components/BookCard"
function Wishlist() {
    if(!localStorage.getItem("favourites")){
        localStorage.setItem("favourites", "[]")
    }
    const [favouriteBooks, setFavouriteBooks] = useState([])
    const [localFavourites, setLocalFavourites] = useState(JSON.parse(localStorage.getItem('favourites')))

    useEffect(()=>{
        for (let i = 0; i < localFavourites.length; i++) {
            const element = localFavourites[i]
            fetch('https://api.itbook.store/1.0/books/'+element).then(res=>res.json()).then(data=>{
                setFavouriteBooks((prev)=>{
                    return [
                        ...prev,
                        data
                    ]
                })
            })
        }
    },[])

    const favouriteBooksElements = favouriteBooks.map((book)=>{
        return <BookCard key={book.isbn13} book={book} wishlist={true} />
    })

  return (
    <div>
        <h1>Books You Liked</h1>

        <BookListWrapper>

            {(!localStorage.getItem('favourites') || localStorage.getItem('favourites').length) <=2 && <div>
                <h2>You haven't liked any books yet.</h2>
                <p>Click a heart next to a book and the books will show up here!</p>
            </div>}
            {localStorage.getItem('favourites') && favouriteBooksElements}
            {console.log(favouriteBooks)}
        </BookListWrapper>

    </div>
  )
}

export default Wishlist
const BookListWrapper = styled.div`
        flex: 1;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 250px;
        gap: 20px;
        @media screen and (max-width: 1300px){
            grid-template-columns: 1fr;

            
        }
`