import React from 'react';
import styled from 'styled-components';
import { Search } from '@material-ui/icons';
import Badge from '@mui/material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import MailIcon from '@mui/icons-material/Mail'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from "../redux/userRedux";

const Container = styled.div`
  height: 60px;
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const Left = styled.div`
  flex:1;
  display: flex;
  align-items: center;
`

const SearchContainer = styled.div`
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
`

const Input = styled.input`
  border: none;
`

const Center = styled.div`
  flex:1;
  text-align: center;
`

const Logo = styled.h1`
  font-weight: bold;
`

const Right = styled.div`  
  flex:1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const MenuItem = styled.div`
  border: 1px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>
            EN
          </Language>
          <SearchContainer>
            <Input placeholder = "Search"/>
            <Search style={{color: 'gray', fontSize: 16}}/>
          </SearchContainer>
        </Left>
        <Center>
          <Link to = "/" style={{ textDecoration: 'none', color: 'black' }}>
            <Logo>LAMA.</Logo>
          </Link>
        </Center>
        <Right>
          {user.currentUser ? (
            <>
              <MenuItem onClick = {handleLogOut}>LOG OUT</MenuItem>
              <Link to = {`/profile`} style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem>PROFILE</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <Link to = {`/register`} style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to = {`/login`} style={{ textDecoration: 'none', color: 'black' }}>
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          )}
          <Link to = {`/cart`} style={{ textDecoration: 'none', color: 'black' }}>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartIcon sx={{ fontSize: 25 }}/>
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
