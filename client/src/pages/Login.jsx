import React from 'react';
import styled from 'styled-components';
import { login } from "../redux/userApiCalls";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
import { resetError } from '../redux/userRedux';
import { getC, updateC } from '../redux/cartApiCalls';
import { updateCart } from '../redux/cartRedux';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
        ),
        url('https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') 
        center;

    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: white;
`;

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 10px 0px;
    padding: 10px;
`;

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    margin-top: 5px;
    background-color: teal;
    color: white;
    cursor: pointer;
    &:disabled{
        background-color: lightgray;
        cursor: not-allowed;
    }
`;

const LinkText = styled.p`
    margin-top: 10px;
    font-size: 12px;
    text-decoration: underline;
    cursor: pointer;
`;

const Error = styled.span`
    color: red;
`;

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nonEmpty, setNonEmpty] = useState(false);
    const { isFetching, error } = useSelector((state) => state.user);

    useEffect(() => {
        setNonEmpty(!username || !password);
    }, [username, password]);

    useEffect(() => {
        dispatch(resetError());
    }, [dispatch]);

    const handleClick = async (e) => {
        e.preventDefault();
        const _id = await login(dispatch, { username, password });
        const cart = await getC(_id);
        dispatch(updateCart({ products: cart.data.products, quantity: cart.data.quantity, total: cart.data.total}));
        if (!error) {
            navigate("/")
        }
    };

    return (
        <Container>
            <Wrapper>
                <Title>SIGN IN</Title>
                <Form>
                    <Input placeholder = 'Username' onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder = 'Password' type = 'password' onChange={(e) => setPassword(e.target.value)}/>
                    <Button onClick={handleClick} disabled={!isFetching && nonEmpty}>LOG IN</Button>
                    {error && <Error>{error}</Error>}
                    <LinkText>DO NOT REMEMBER THE PASSWORD?</LinkText>
                    <Link to = {`/register`}><LinkText>CREATE A NEW ACCOUNT</LinkText></Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Login
