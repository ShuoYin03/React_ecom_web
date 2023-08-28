import React from 'react'
import styled from 'styled-components'
import { PropTypes } from 'prop-types'
import { Link } from "react-router-dom";

const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 70vh;
  position: relative;
`
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`
const Info = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
const Title = styled.h1`
  color: white;
  margin: 20px;
`
const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  font-weight: 600;
  cursor: pointer;
`

const CategoryItem = ({item}) => {
  return (
    <Container>
      <Link to = {`/products/${item.cat}`}>
        <Image src = {item.img}/>
        <Info>
            <Title>{item.title}</Title>
            <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  )
}

CategoryItem.propTypes = {
  item: PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired
}

export default CategoryItem
