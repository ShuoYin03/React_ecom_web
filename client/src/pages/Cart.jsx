import React, { useEffect } from "react"
import styled from "styled-components"
import Navbar from "../components/Navbar"
import Announcement from "../components/Announcement"
import RemoveIcon from '@mui/icons-material/Remove'
import AddIcon from '@mui/icons-material/Add'
import { updateC } from "../redux/cartApiCalls"
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux"
import { removeProduct, updateQuantity } from '../redux/cartRedux' 
import { v4 as uuidv4 } from "uuid";

const Container = styled.div``

const Wrapper = styled.div`
  padding: 20px;
`

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
  &:disabled{
    background-color: lightgray;
    cursor: not-allowed;
  }
`

const TopTexts = styled.div``

const TopText = styled.span`
  margin: 0px 10px;
  text-decoration: underline;
  cursor: pointer;
`

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`

const Info = styled.div`
  flex: 3;
`

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`

const Image = styled.img`
  width: 200px;
`

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`

const ProductName = styled.span``

const ProductId = styled.span``

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid #000;
  background-color: ${(props) => props.color};
`

const ProductSize = styled.span``

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`

const Remove = styled.p`
  margin-top: 28px;
  cursor: pointer;
`

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`

const SummaryTitle = styled.h1`
  font-weight: 200;
`

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span``

const SummaryItemPrice = styled.span``

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  border: none;
  color: white;
  font-weight: 600;
  cursor: pointer;
  &:disabled{
    background-color: lightgray;
    cursor: not-allowed;
  }
`

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentUserId = useSelector((state) => state.user.currentUserId)

  useEffect(() => {
    updateC(dispatch, { currentUserId, cart });
  }, [cart])

  const handleCheckout = () => {
    console.log(currentUser)
    currentUser 
    ? navigate('/checkout')
    : NAVIGATE('/login')
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title onClick = {print}>YOUR BAG</Title>
        <Top>
          <Link to = "/">
            <TopButton>CONTINUE SHOPPING</TopButton>
          </Link>
          <TopTexts>
            <TopText>Shopping Bag ({cart.quantity})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
          <TopButton type="filled" disabled = {cart.total === 0} onClick = {handleCheckout}>CHECKOUT NOW</TopButton>
        </Top>
        <Bottom>
          <Info>
              {cart.products.map((product) => (
                <Product key = {uuidv4()}>
                  <ProductDetail>
                    <Image src = {product.img}/>
                    <Details>
                      <ProductName><b>Product:</b> {product.title}</ProductName>
                      <ProductId><b>ID:</b> {product._id}</ProductId>
                      <ProductColor color = {product.color}/>
                      <ProductSize><b>Size:</b> {product.size}</ProductSize>
                    </Details>
                  </ProductDetail>
                  <PriceDetail>
                    <ProductAmountContainer>
                      <AddIcon onClick = {() => dispatch(updateQuantity({ productId: product._id, type: "inc"}))}/>
                      <ProductAmount>{product.quantity}</ProductAmount>
                      <RemoveIcon onClick = {() => dispatch(updateQuantity({ productId: product._id, type: "dec"}))}/>
                    </ProductAmountContainer>
                    <ProductPrice>$ {product.price}</ProductPrice>
                    <Remove onClick = {() => dispatch(removeProduct({ productId: product._id }))}>Remove Item</Remove>
                  </PriceDetail>
                </Product>
              ))}
            
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ 0</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <Button disabled = {cart.total === 0} onClick = {handleCheckout}>CHECKOUT NOW</Button>
          </Summary>
        </Bottom>
      </Wrapper>
    </Container>
  );
};

export default Cart;