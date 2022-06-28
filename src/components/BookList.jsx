import React from 'react'
import styled from 'styled-components'
import BookCard from './BookCard'
import { useEffect, useState } from 'react'
import { useContext } from 'react'
import { BookContext } from '../BookContext'

function BookList() {
    const {newBooks, setNewBooks}= useContext(BookContext)

    const newBooksElements = newBooks.map((book)=>{
        return <BookCard key={book.isbn13} book={book} />
    })



  return (
        <BookListWrapper>   
            { newBooksElements}
            {newBooks.length < 1 && <p>No results for your search :(</p>}
        </BookListWrapper>
  )
}


export default BookList
const BookListWrapper = styled.div`
        flex: 1;
        /* height: fit-content; */
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 250px;
        gap: 20px;
        @media screen and (max-width: 1300px){
            grid-template-columns: 1fr;

            
        }
        @media screen and (min-width: 1930px){
            grid-template-columns: 1fr 1fr 1fr;
        }
        
`