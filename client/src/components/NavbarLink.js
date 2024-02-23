import { Nav } from "react-bootstrap";

const NavbarLink = () => {
    return (    
        <Nav style={{ marginLeft: "auto", marginRight:'10px' }}>
            <Nav.Link href="/page1" style={{  flexDirection: 'column', textAlign: 'center' }}>
                <img src=".\course.png" style={{  width: '40px', height: '40px' }} />
                <div style={{ fontSize: '10px' }}>myCourses</div>
            </Nav.Link>
            <Nav.Link href="/" style={{ flexDirection: 'column', textAlign: 'center' }}>
                <img src=".\history.png" style={{ width: '40px', height: '40px' }} />
                <div style={{ fontSize: '10px' }}>History</div>
            </Nav.Link>
            <Nav.Link href="/cart" style={{ flexDirection: 'column', textAlign: 'center' }}>
                <img src=".\cart.png" style={{ width: '40px', height: '40px' }} />
                <div style={{ fontSize: '10px' }}>myCart</div>
            </Nav.Link>
        </Nav>
    )
}

export default NavbarLink;