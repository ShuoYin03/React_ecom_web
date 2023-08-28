import React from 'react'
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { register, login } from '../redux/userApiCalls'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { createC, updateC } from '../redux/cartApiCalls'

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
        ),
        url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940') 
        center;

    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: white;
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`

const Agreement = styled.span`
    font-size: 12px;
    margin: 20px 0px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
    &:disabled {
        background-color: lightgray;
        cursor: not-allowed;
    }
`

const LinkText = styled.p`
    margin-top: 15px;
    font-size: 12px;
    color: #000;
    text-decoration: underline;
    cursor: pointer;
`

const Register = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector((state) => state.cart)
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [passwordMatch, setPasswordMatch] = useState(false);
    const [nonEmpty, setNonEmpty] = useState(false);
    const { registered, error } = useSelector((state) => state.user);

    useEffect(() => {
        setPasswordMatch(password === confirm);
        setNonEmpty(!firstname || !lastname || !username || !email || !password || !confirm);
    }, [firstname, lastname, username, email, password, confirm]);

    const handleRegister = async (e) => {
        e.preventDefault();
        const res = await register(dispatch, { firstname, lastname, username, email, password, confirm })
        createC({ _id: res.data._id, cart: cart })
        await login(dispatch, { username, password })
        if (!error) {
            navigate("/");
        }
    }

    const print = () => {
        console.log(registered)
        console.log(error)
    }

    return (
        <Container>
            <Wrapper>
                <Title>CREATE AN ACCOUNT</Title>
                <Form>
                    <Input placeholder = 'First Name' onChange={(e) => setFirstname(e.target.value)}/>
                    <Input placeholder = 'Last Name' onChange={(e) => setLastname(e.target.value)}/>
                    <Input placeholder = 'Username' onChange={(e) => setUsername(e.target.value)}/>
                    <Input placeholder = 'Email' onChange={(e) => setEmail(e.target.value)}/>
                    <Input placeholder = 'Password' onChange={(e) => setPassword(e.target.value)}/>
                    <Input placeholder = 'Confirm Password' onChange={(e) => setConfirm(e.target.value)}/>
                    <Agreement onClick = {print}>
                        By creating an account, I consent to the processing of my personal 
                        data in accordance with the <b>PRIVACY POLICY</b>
                    </Agreement>
                    <Button onClick = {handleRegister} disabled = {!passwordMatch || nonEmpty}>CREATE</Button>
                    <Link to = {`/login`}><LinkText>ALREADY HAVE AN ACCOUNT?</LinkText></Link>
                </Form>
            </Wrapper>
        </Container>
    )
}

export default Register
