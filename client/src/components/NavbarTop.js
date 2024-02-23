import { Navbar } from "react-bootstrap";

const NavbarTop = ({ NavbarLink }) => {
  return (
    <div>
      <Navbar bg="white">
        <Navbar.Brand style={{ marginLeft: "10px" }}>
          <img src=".\course_learn.png" width="125" height="60" />
        </Navbar.Brand>
        {NavbarLink && <NavbarLink />}
      </Navbar>
    </div>
  );
};

export default NavbarTop;
