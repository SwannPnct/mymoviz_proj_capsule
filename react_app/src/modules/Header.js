import React,{useState} from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  ButtonDropdown, 
  DropdownToggle, 
  DropdownMenu, 
  DropdownItem
} from 'reactstrap';

const Header = (props) => {

  const [dropdownOpen, setOpen] = useState(false);
  const toggle = () => setOpen(!dropdownOpen);

  const headerStyle = {
    color: "white"
  }

  const imageStyle = {
    width: "220px",
  }

  function handleDelete(name) {
    props.handleDeleteMovie(false, name)
  }

  const genWishlist = props.wishlist.map((e) => {
    return(
      <div>
          <DropdownItem divider />
          <img src={e.img} alt="" style={imageStyle}></img>
          <DropdownItem onClick={() => handleDelete(e.name)}>{e.name}</DropdownItem>
        </div>
    )
  })
  

  return (
    <div>
      <Navbar color="dark" light expand="md" >
        <NavbarBrand href="/"><img alt="brand-img" src="/img/logo.png"/></NavbarBrand>
        <NavbarToggler />
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/"><span style={headerStyle}>Last releases</span></NavLink>
            </NavItem>
            <NavItem>
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle} color="secondary">
            <DropdownToggle caret>
            <span style={headerStyle}>{props.count} Movies</span>
            </DropdownToggle>
            <DropdownMenu>
            <DropdownItem header>Wishlist</DropdownItem>
            {genWishlist}
            </DropdownMenu>
            </ButtonDropdown>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      </div>
  );
}

export default Header;