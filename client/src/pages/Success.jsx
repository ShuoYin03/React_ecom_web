import React from "react";
import styled from "styled-components";
import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethods";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";

const Container = styled.div``
const OrderInfo = styled.div`
  display: flex;
  flex: 1;
  width: 60%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 50px;
  margin-left: 30px;
  margin-bottom: 20px;
`
const Toptext = styled.h1`
  color: teal;
  font-size: 50px;
  font-weight: 2000;
`
const Hr = styled.hr`
  width: 100%;
  color: #000;
  margin: 10px 0;
`
const OrderId = styled.p`
  font-size: 20px;
`
const OrderTime = styled.p`
  font-size: 20px;
`
const OrderDelieveryInfo = styled.p``
const OrderPrice = styled.p`
  font-size: 20px;
`
const Recommandations = styled.p``
const OrderItems = styled.div`
  flex: 1;
  width: 100%;
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
const HomeButton = styled.button`
  width: 250px;
  height: 50px;
  padding: 10px;
  margin-top: 20px;
  background-color: teal;
  color: white;
  border: none;
`

const Success = () => {
  const location = useLocation();
  const data = location.state.stripeData;
  const cart = location.state.cart;
  const currentUser = useSelector((state) => state.user.currentUser);
  const [order, setOrder] = useState(null);

  useEffect(() => {

    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            title: item.title,
            img: item.img,
            size: item.size,
            color: item.color,
            quantity: item._quantity,
            price: item.price,
          })),
          amount: cart.total,
          address: data.billing_details.address,
        });
        setOrder(res.data);
      } catch (err) {
        console.log(err)
      }
    };

    if (!order && data) {
      data && createOrder();
    }
  }, [cart, data, currentUser]);

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <OrderInfo>
        {order ? (
          <>
            <Toptext>Order Created. Thank you!</Toptext>
            <Hr/>
            <OrderId>Order ID: {order._id}</OrderId>
            <OrderTime>Order time: {order.createdAt}</OrderTime>
            {/* <OrderDelieveryInfo>{order.address}</OrderDelieveryInfo> */}
            <OrderPrice>Total Price: {order.amount}</OrderPrice>
            <OrderItems>
              {order.products.map((product) => (
                <Product key = {product._id}>
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
            <Recommandations>{}</Recommandations>
          </>
        ) : (
          <Toptext onClick = {print}>Order Processing...</Toptext>
        )}
        <Link to = '/'>
          <HomeButton>Go to Homepage</HomeButton>
        </Link>
      </OrderInfo>
      <Footer/>
    </Container>
  );
};

export default Success;