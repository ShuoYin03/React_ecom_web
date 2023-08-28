import React from 'react'
import styled from 'styled-components'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { PropTypes } from 'prop-types';
import { FavoriteBorder } from '@material-ui/icons';
import { Search } from '@material-ui/icons';
import { Link } from 'react-router-dom'

const Info = styled.div`
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    z-index: 3;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.5s ease;
    cursor: pointer;
`

const Container = styled.div`
    flex: 1;
    margin: 5px;
    min-width: 280px;
    height: 350px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position: relative;

    &:hover ${Info}{
        opacity: 1;
    }
`

const Circle = styled.div`
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: white;
    position: absolute;
`

const Image = styled.img`
    height: 75%;
    z-index: 2;
`

const Icon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    transition: all 0.5s ease;
    &:hover {
        background-color: #e9f5f5;
        transform: scale(1.1);
  }
`

const Product = ({item}) => {

    const handleCart = () => {

    }

    return (
        <Container>
            <Circle/>
            <Image src = {item.img}/>
            <Info>
                <Icon>
                    <Link to = {`/cart`}>
                        <ShoppingCartIcon onClick = {handleCart} style = {{color: 'black'}}/>
                    </Link>
                </Icon>
                <Icon>
                    <Link to = {`/product/${item._id}`}>
                        <Search style = {{color: 'black'}}/>
                    </Link>
                </Icon>
                <Icon>
                    <FavoriteBorder />
                </Icon>
            </Info>
        </Container>
    )
}

Product.propTypes = {
    item: PropTypes.shape({
        img: PropTypes.string.isRequired,
    }).isRequired
}

export default Product
