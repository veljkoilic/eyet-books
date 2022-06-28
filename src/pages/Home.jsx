import BookList from "../components/BookList"
import Sidebar from "../components/Sidebar"
import styled from "styled-components"
import { useEffect, useState } from "react"
import { BookContext } from "../BookContext"

function Home() {
  const [newBooks, setNewBooks] = useState([])
  const API = 'https://api.itbook.store/1.0/new'
  useEffect(()=>{
      fetch(API).then(res=>res.json()).then(data=>{setNewBooks(data.books)})
  },[])
  return (
    <HomeDiv>
        <Content>
            <BookContext.Provider value={{newBooks, setNewBooks}}>  
              <Sidebar/>
              <BookList/>
            </BookContext.Provider>
        </Content>

    </HomeDiv>
  )
}

export default Home
const Content = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    @media screen and (max-width: 1000px){
      flex-direction: column;
      .sidebar{
        position: static;
        margin-bottom: 30px;
        .pages{
          position: relative;
          bottom: -55px;
        }
    }
    }


`
const HomeDiv = styled.div`
    width: 90%;
    margin: 0 auto;
`