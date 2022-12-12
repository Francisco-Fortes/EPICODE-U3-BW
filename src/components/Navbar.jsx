import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function MyNavbar() {
  return (
    <Navbar className='navflex' bg="light" expand="lg">
      
      <Container fluid>
    
        <Navbar.Brand href="#"><img className='logo' src="./linkedinlogo.png" alt="linkedin logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
           
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            </Form>
               

            <Nav.Link className='naviconflex' href="#action2"><img className='navicon' src="./icons8-home.svg" alt="Home" />Home</Nav.Link>
            <Nav.Link className='naviconflex' href="#action2"><img className='navicon' src="./group-svgrepo-com.svg" alt="Home" />My Network</Nav.Link>
            <Nav.Link className='naviconflex' href="#action2"><img className='navicon' src="./briefcase-svgrepo-com.svg" alt="Home" />Jobs</Nav.Link>
            <Nav.Link className='naviconflex' href="#action2"><img className='navicon' src="./bell-svgrepo-com.svg" alt="Home" />Notifications</Nav.Link>

            <div className='naviconflex'><img className='navpicture' src="./linkedinlogo.png" alt="pfpic" /><NavDropdown title="Me" id="navbarScrollingDropdown"> 
            <NavDropdown.Item className='dropdownflex' href="#action11"><div className='smallerdropdownflex'><img className='smallprofile' src="./linkedinlogo.png" alt="" /> <p className='dropdownname'>Name</p> <p >Title</p> </div><Button className='viewprofile'>View Profile</Button></NavDropdown.Item>
            <NavDropdown.Divider />
                <h5 className='dropdowntitle'>Account</h5>
              <NavDropdown.Item href="#action3">Settings & Privacy</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Help
              </NavDropdown.Item>
              <NavDropdown.Item href="#action5">
                Language
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <h5 className='dropdowntitle'>Manage</h5>
              <NavDropdown.Item href="#action6">
                Posts & Activity
              </NavDropdown.Item>
              <NavDropdown.Item href="#action7">
                Job Posting Account
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action8">
                Sign out
              </NavDropdown.Item>
            </NavDropdown>
            </div>
            <Nav.Link className='naviconflex' href="#action2"><img className='navicon' src="./dots-menu-svgrepo-com.svg" alt="Home" />Work</Nav.Link>
            <Nav.Link className='naviconflex' href="#action2"><img className='navicon' src="open-book-svgrepo-com.svg" alt="Home" />Learning</Nav.Link>
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNavbar;