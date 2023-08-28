import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Announcement from '../components/Announcement'
import Footer from './../components/Footer';
import StripeCheckout from 'react-stripe-checkout'
import { clearCart } from '../redux/cartRedux';
import { userRequest } from '../requestMethods';
import { styled } from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid";

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`
const Left = styled.div`
  display: flex;
  width: 60%;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
`
const Info = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin-bottom: 50px;
`
const Row = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`
const FirstName = styled.input`
  flex: 1;
  height: 60px;
  border: 1px solid lightgrey;
  padding-left: 15px;
  margin: 15px 10px 0px 0px;
  outline: none;

  &.focus::placeholder {
      transform: translateY(-18px);
  }
  
  &::placeholder {
    color: #000;
    transition: all 0.3s ease;
  }
`
const LastName = styled.input`
  flex: 1;
  height: 60px;
  border: 1px solid lightgrey;
  padding-left: 15px;
  margin: 15px 0px 0px 5px;
  outline: none;

  &.focus::placeholder {
      transform: translateY(-18px);
  }
  
  &::placeholder {
    color: #000;
    transition: all 0.3s ease;
  }
`
const AddressLine1 = styled.input`
  height: 60px;
  border: 1px solid lightgrey;
  padding-left: 15px;
  margin: 15px 0px 0px 0px;
  outline: none;

  &.focus::placeholder {
      transform: translateY(-18px);
  }
  
  &::placeholder {
    color: #000;
    transition: all 0.3s ease;
  }
`
const AddressLine2 = styled.input`
  height: 60px;
  border: 1px solid lightgrey;
  padding-left: 15px;
  margin: 15px 0px 0px 0px;
  outline: none;

  &.focus::placeholder {
      transform: translateY(-18px);
  }
  
  &::placeholder {
    color: #000;
    transition: all 0.3s ease;
  }
`
const PostCode = styled.input`
  flex: 1;
  height: 60px;
  border: 1px solid lightgrey;
  padding-left: 15px;
  margin: 15px 10px 0px 0px;
  outline: none;

  &.focus::placeholder {
      transform: translateY(-18px);
  }
  
  &::placeholder {
    color: #000;
    transition: all 0.3s ease;
  }
`
const PhoneNumber = styled.input`
  flex: 1;
  height: 60px;
  border: 1px solid lightgrey;
  
  padding-left: 15px;
  margin: 15px 0px 0px 5px;
  outline: none;

  &.focus::placeholder {
      transform: translateY(-18px);
  }
  
  &::placeholder {
    color: #000;
    transition: all 0.3s ease;
  }
`
const MakeDefaultLabel = styled.label`
  height: 20px;
  width: 20px;
  margin: 15px 0px 0px 0px;
  border-radius: 5px;
  border: 0.5px solid lightgrey;
  cursor: pointer;
`
const MakeDefault = styled.input`
  display: none;

  &:checked + ${MakeDefaultLabel} {
    background-color: teal;
  }
`
const DefaultMess = styled.span`
  margin: 15px 0px 0px 10px;
`
const OrderItems = styled.div`
  flex: 3;
  width: 100%;
`
const Product = styled.div`
  padding-top: 10px;
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
const Right = styled.div`
  display: flex;
  flex: 1;
  height: 70vh;
  padding: 40px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`
const Summary = styled.div`
  width: 100%;
  margin-top: 15px;
`
const SummaryItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``
const VoucherMess = styled.span`
  font-weight: bold;
  align-self: flex-start;
`
const Voucher = styled.input`
  width: 70%;
  height: 40px;
  border: 1px solid lightgrey;
  outline: none;
  padding: 0px 10px;
  margin: 5px 3px 20px 0px;
`
const AddVoucher = styled.button`
  flex: 1;
  align-items: center;
  height: 41px;
  border: 1px solid lightgrey;
  margin: 5px 0px 20px 0px;
  font-size: 15px;
  font-weight: 800;
  cursor: pointer;
`
const Button = styled.button`
  width: 100%;
  padding: 20px;
  background-color: black;
  border: none;
  color: white;
  font-weight: 600;
  &:disabled{
    background-color: lightgray;
    cursor: not-allowed;
  }
`

const Checkout = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const [stripeToken, setStripeToken] = useState(null);
  const [isFocusedF, setIsFocusedF] = useState(false);
  const [isFocusedL, setIsFocusedL] = useState(false);
  const [isFocusedA1, setIsFocusedA1] = useState(false);
  const [isFocusedA2, setIsFocusedA2] = useState(false);
  const [isFocusedPo, setIsFocusedPo] = useState(false);
  const [isFocusedPh, setIsFocusedPh] = useState(false);

  const onToken = (token) => {
    setStripeToken(token);
  };

  const handleFocusF = () => {setIsFocusedF(true);};
  const handleBlurF = () => {setIsFocusedF(false);};

  const handleFocusL = () => {setIsFocusedL(true);};
  const handleBlurL = () => {setIsFocusedL(false);};

  const handleFocusA1 = () => {setIsFocusedA1(true);};
  const handleBlurA1 = () => {setIsFocusedA1(false);};

  const handleFocusA2 = () => {setIsFocusedA2(true);};
  const handleBlurA2 = () => {setIsFocusedA2(false);};

  const handleFocusPo = () => {setIsFocusedPo(true);};
  const handleBlurPo = () => {setIsFocusedPo(false);};

  const handleFocusPh = () => {setIsFocusedPh(true);};
  const handleBlurPh = () => {setIsFocusedPh(false);};

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 501,
        });
        navigate("/success", { state: {
          stripeData: res.data,
          cart: cart }});
        dispatch(clearCart());
      } catch(err) {
        console.log(err)
      }

    };
    stripeToken && makeRequest();
  }, [stripeToken]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Left>
          <Title>Shipping Address</Title>
          <Info>
            <Row>
              <FirstName className={isFocusedF ? 'focus' : ''} placeholder = "First Name" onFocus={handleFocusF} onBlur={handleBlurF}/>
              <LastName className={isFocusedL ? 'focus' : ''} placeholder = "Last Name" onFocus={handleFocusL} onBlur={handleBlurL}/>
            </Row>
            <AddressLine1 className={isFocusedA1 ? 'focus' : ''} placeholder = "Address Line 1" onFocus={handleFocusA1} onBlur={handleBlurA1}/>
            <AddressLine2 className={isFocusedA2 ? 'focus' : ''} placeholder = "Address Line 2" onFocus={handleFocusA2} onBlur={handleBlurA2}/>
            <Row>
              <PostCode className={isFocusedPo ? 'focus' : ''} placeholder = "Post Code" onFocus={handleFocusPo} onBlur={handleBlurPo}/>
              <PhoneNumber className={isFocusedPh ? 'focus' : ''} placeholder = "Phone Number" onFocus={handleFocusPh} onBlur={handleBlurPh}/>
            </Row>
            <Row>
              <MakeDefault type="checkbox" id="checkbox"/>
              <MakeDefaultLabel htmlFor="checkbox"/>
              <DefaultMess>Make Default</DefaultMess>
            </Row>
          </Info>
          <Title>Product Details</Title>
          <OrderItems>
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
                    <ProductAmount>x {product.quantity}</ProductAmount>
                  </ProductAmountContainer>
                  <ProductPrice>$ {product.price}</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
          </OrderItems>
        </Left>
        <Right>
          <Title>Order Summary</Title>
          <Summary>
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
            <VoucherMess>Voucher Code</VoucherMess>
            <Row>
              <Voucher/>
              <AddVoucher>Apply</AddVoucher>
            </Row>
            <StripeCheckout
              name="Lama Shop"
              image="https://avatars.githubusercontent.com/u/1486366?v=4"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}>
              <Button disabled = {cart.total === 0}>CONTINUE TO PAYMENT</Button>
            </StripeCheckout>
          </Summary>
        </Right>
      </Wrapper>
      <Footer/>
    </Container>
  )
}

export default Checkout
