import React from 'react'
import styled from 'styled-components'
import Navbar from './../components/Navbar';
import Announcement from './../components/Announcement';
import Newsletter from './../components/Newsletter';
import Footer from '../components/Footer';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";
import axios from 'axios';

const Container = styled.div`

`

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
`

const ImgContainer = styled.div`
    flex: 1;
`

const Image = styled.img`
    width: 100%;
    height: 90vh;
    object-fit: cover;
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
`

const Title = styled.h1`
    font-weight: 200;
`

const Desc = styled.p`
    margin: 20px 0px;
`

const Price = styled.span`
    font-size: 40px;
    font-weight: 100;
`

const FilterContainer = styled.div`
    width: 50%;
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
`

const Filter = styled.div`
    display: flex;
    align-items: center;
`

const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: 2px solid ${(props) => (props.selected ? '#000' : 'white')};
    background-color: ${(props) => props.color};
    margin: 0px 8px;
    cursor: pointer;
`

const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
`

const FilterSizeOption = styled.option`

`

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const QuantityContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`

const Quantity = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    font-weight: 500;
    cursor: pointer;

    &:hover {
        background-color: #f8f4f4;
    }
`

const Product = () => {
    const location = useLocation();
    const id = location.pathname.split("/")[2];
    const [product, setProduct] = useState({});
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [selectedColor, setSelectedColor] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/product/find/${id}`)
                setProduct(res.data)
                setColor(res.data.color[0])
                setSize(res.data.size[0])
            } catch (err) {
                console.log(err);
            }
        };
        getProduct();
    }, [id]);

    useEffect(() => {
        if (product.color?.length > 0) {
            setSelectedColor(product.color[0]);
        }
    }, [product.color]);

    const handleQuantity = (type) => {
        if (type === "dec") {
            quantity > 1 && setQuantity(quantity - 1);
        } else {
            setQuantity(quantity + 1)
        }
    };

    const handleClick = () => {
        dispatch(
          addProduct({ ...product, quantity, color, size })
        );
      };

    const handleColorAndBorder = (c) => {
        setColor(c);
        setSelectedColor(c);
    }
    return (
        <Container>
            <Navbar/>
            <Announcement/>
            <Wrapper>
                <ImgContainer>
                    <Image src = {product.img}/>
                </ImgContainer>
                <InfoContainer>
                    <Title>{product.title}</Title>
                    <Desc>{product.desc}</Desc>
                    <Price>$ {product.price}</Price>
                    <FilterContainer>
                    <Filter>
                        <FilterTitle>Color</FilterTitle>
                        {product.color?.map((c) => (
                            <FilterColor color={c} key={c} selected = {c === selectedColor} onClick = {() => handleColorAndBorder(c)}/>
                        ))}
                    </Filter>
                    <Filter>
                        <FilterTitle>Size</FilterTitle>
                        <FilterSize onChange = {(e) => setSize(e.target.value)}>
                            { product.size?.map((s) => (
                                <FilterSizeOption key = {s}>{s}</FilterSizeOption>
                            ))}
                        </FilterSize>
                    </Filter>
                    </FilterContainer>
                    <AddContainer>
                    <QuantityContainer>
                        <RemoveIcon onClick = {() => handleQuantity("dec")}/>
                        <Quantity>{quantity}</Quantity>
                        <AddIcon onClick = {() => handleQuantity("inc")}/>
                    </QuantityContainer>
                    <Button onClick = {handleClick}>ADD TO CART</Button>
                    </AddContainer>
                </InfoContainer>
            </Wrapper>
            <Newsletter/>
            <Footer/>
        </Container>
    )
}

export default Product
