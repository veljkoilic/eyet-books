import styled from "styled-components"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faAngleLeft, faAngleRight, faBugSlash } from "@fortawesome/free-solid-svg-icons"
import { BookContext } from "../BookContext"
import { useContext, useEffect, useState } from "react"

function Sidebar() {
    const topics = ['Programming', 'HTML', 'JavaScript','Python', 'SQL', 'Management']

    const sidebarData = [
        {
            title: 'Programing',
            subitems: ['Programming', 'HTML', 'JavaScript','Python', 'SQL', 'PHP']
        },
        {
            title: 'Management',
            subitems: ['Product management', 'Team management']
        },
        {
            title: 'Databases',
            subitems: ['MySQL', 'MongoDB', 'Relational Databases','Non-relational Databases']
        }
    ]
    const sidebarElements = sidebarData.map((element)=>{

        return(
            <div key={element.title}>
                <h5>{element.title}</h5>
                <ul>
                    {element.subitems.map((e)=>{
                        return <li className="sideBarElements" key={e} data-category={e} onClick={categorySwitch}>{e}</li>})
                    }
                </ul>
            </div>
        )
    })


    const {newBooks, setNewBooks}= useContext(BookContext)
    function categorySwitch(e){
            setCurrentQuery(e.target.getAttribute('data-category'))
            setCurrentPage(1)
            sideBarElementsColorReset()
            e.target.style.color='#2c3235'
            
    }
    function sideBarElementsColorReset(){
        let sidebarElements = document.getElementsByClassName('sideBarElements')
        for (let i = 0; i < sidebarElements.length; i++) {
            sidebarElements[i].style.color ="#afaeb0"
        }
    }
    function categorySearch(event){
        const API = 'https://api.itbook.store/1.0/search/'
            if(event.target.value != '' && event.target.value.length > 2) {
                setCurrentQuery(event.target.value)
                sideBarElementsColorReset()
            }else{
                fetch('https://api.itbook.store/1.0/new').then(res=>res.json()).then(data=>{setNewBooks(data.books)})
                sideBarElementsColorReset()
                setCurrentQuery(false)

            }
    }

    const topicsElement = topics.map(topic=>{
        return <li key={topic}>{topic}</li>
    })

    const [currentPage, setCurrentPage] = useState(1)
    function changePage(event, buttonVal = null){

        setCurrentPage(prevPage=>{
            if(prevPage == 1 && buttonVal < 1){
                setCurrentPage(1)
            }
            if(prevPage == totalPages && buttonVal === 1){
                setCurrentPage(totalPages)
            }
            return prevPage += buttonVal
        })
        
        
    }
    const [currentQuery, setCurrentQuery] = useState(false)
    const API = 'https://api.itbook.store/1.0/search/'

    const [totalPages,setTotalPages] = useState(0) 

    function changeResults(currentQuery, currentPage){
        fetch(API + currentQuery + '/' + currentPage).then(res=>res.json()).then(data=>{
            setNewBooks(data.books)
            let total = Math.ceil(data.total/10)
            setTotalPages(total)
        })

    }
    useEffect(()=>{
        changeResults(currentQuery, currentPage)
    }, [currentPage, currentQuery])


  return (

    <SidebarWrap className="sidebar">
        <div>
            <SearchBar type="text" placeholder="Title, Author..." onChange={categorySearch}/>
            <Icon icon={faSearch} />
        </div>

        <ul>
            <h5 className="new" onClick={()=>{
                fetch('https://api.itbook.store/1.0/new').then(res=>res.json()).then(data=>{setNewBooks(data.books)})
                sideBarElementsColorReset()
                setCurrentQuery(false)
            }}>New Books</h5>
           {sidebarElements}
        </ul>
        {currentQuery && <div className="pages">
                <FontAwesomeIcon icon={faAngleLeft} onClick={()=>{changePage(false, -1)}}/>
                <input type="number" min='1'  disabled value={currentPage} onChange={changePage}/> <span>/ {totalPages}</span>
                <FontAwesomeIcon icon={faAngleRight} onClick={()=>{changePage(false, 1)}}/>

        </div>}
    </SidebarWrap>
  )
}

export default Sidebar

const SidebarWrap = styled.div`
    height: fit-content; 
    position: sticky;
    top: 120px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 0;
    max-width: max-content;
    margin: 0 auto;
    padding: 20px 30px;

    background-color: var(--sidebar);
    border-radius: 20px;
    h5{
        font-size: 20px;
        margin: 0;
        padding: 0 20px;
    }
    .new{
        font-size: 20px;
        margin: 0 0 30px 0;
        padding: 0 20px;
        color: coral;
        cursor: pointer;
        transition: 0.3s;

        &:hover{
            transform: scale(1.1);
            transition: 0.3s;
        }

    }
    ul{
        padding: 20px 20px 0 20px;
        list-style: none;
        li{
            padding: 10px 0;
            color: var(--light-text);
            font-size: 12px;
            cursor: pointer;
            transition: 0.2s;
                &:hover{
                    transform: scale(1.1);
                    transition: 0.2s;
                }
        }
    }
    .pages{
        position: absolute;
        bottom: -40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        svg{
            padding: 6px 10px;
            border-radius: 100px;
            background-color: var(--sidebar);
            color: gray;
            cursor: pointer;
            transition: 0.5s;
            &:hover{
                transition: 0.5s;
                /* transform: scale(1.1); */
                position: relative;
                font-size: 18px;
                color: var(--orange-annotate);

            }
        }
            input{
                width: 20px;
                padding: 2px;
                text-align: center;
                margin: 0 10px;
                outline: none;
                border: none;
                font-size: 15px;
                font-weight: bold;
                color: var(--bold-and-gray);
            }
            input::-webkit-outer-spin-button,
            input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
            }

            /* Firefox */
            input[type=number] {
            -moz-appearance: textfield;
            }
            span{
                color: var(--light-text);
                letter-spacing: 5px;
                font-size: 15px;

            }
        }
`
const SearchBar = styled.input`
    border: none;
    outline: none;
    border-bottom: 2px solid #f1f1f1;
    background-color: transparent;
    color: var(--light-text);
    font-size: 14px;
    padding: 10px;
    &:focus {
        color: var(--gray-and-bold);
        font-weight: 700;

    }
`
const Icon = styled(FontAwesomeIcon)`
        color: var(--light-text);
        font-size: 14px;
        position: relative;
        left: -20px;
        cursor: pointer;


`