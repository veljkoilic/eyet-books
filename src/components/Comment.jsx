import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

function Comment({text}) {
    const [user, setUser] = useState({})
    useEffect(()=>{
        fetch('https://randomuser.me/api/?nat=gb').then(res=>res.json()).then(data=> setUser(()=>{
            return {
                name: data.results[0].name.first + " " + data.results[0].name.last,
                pictureURL: data.results[0].picture.medium
            }
        }))
    },[])
  return (
    <SingleComent>
        <div>
            <img src={user.pictureURL} alt="" />
            <h5>{user.name}</h5>
        </div>
        <p>{text}</p>
    </SingleComent>
  )
}

export default Comment
const SingleComent = styled.div`
padding: 10px 20px;
&:last-of-type{
    border: none;
}
display: flex;
flex-direction: column;
border-bottom: 1px solid var(--border);
div{
    display: flex;
    align-items: center;
    padding-top: 10px;
}
p{
    font-size: 14px;
    font-weight: 300;
    padding: 20px 20px 10px 10px;
    margin-top: 0;
    align-self: f;
}
img{
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 1000px;
    padding: 2px;
    border: 2px solid var(--orange-annotate);
}
h5{
    font-size: 16px;
    padding: 0px 20px;
    margin: 0;
}
    
`