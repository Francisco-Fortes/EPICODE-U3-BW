import React from 'react'
import { Container, Row } from 'react-bootstrap'


export default function LeftSidebar() {
  return (
    <Container className='leftsidebar'>
        <div> <img src="" alt="" /> </div>
        <div> <img src="" alt="" /> </div>
        <div><h4>Welcome, name!</h4>
        <hr/> 
        <div className='connflex'><p>Connections</p> <p><a href="">0</a></p></div>
        <hr />
        <a className='premiumlink' href="">Try premium for free</a>
        <hr />
        <p><a href="">My items</a></p>
    </div>
    </Container>
  )
}
