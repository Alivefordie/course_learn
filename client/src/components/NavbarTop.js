import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const NavbarTop = ({ NavbarLink }) => {
  return (
    <div>
      <Navbar bg="white" className="NavbarTop">
        <Navbar.Brand style={{ marginLeft: "10px" }}>
          <Link to="/">
            <img src="../course_learn.png" width="125" height="60" />
          </Link>
        </Navbar.Brand>
        {NavbarLink && <NavbarLink />}
      </Navbar>
    </div>
  );
};

export default NavbarTop;
