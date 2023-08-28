import React from 'react'
import styled from 'styled-components'
import Product from './Product'
import { popularProducts } from '../data'
import { useState, useEffect } from 'react'
import axios from "axios"

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const Products = ({cat, filters, sort}) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get( 
          cat 
          ? `http://localhost:5000/api/product?category=${cat}` 
          : `http://localhost:5000/api/product`
        )

        const productsWithId = res.data.map((product) => ({
          ...product,
          id: product._id,
        }));
        setProducts(productsWithId)
      } catch (err) {
        console.log(err)
      }
    }
    getProducts();
  }, [cat]);

  useEffect(() => {
    if (cat) {
      cat && setFilteredProducts(
        products.filter((item) => Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
        ))
      );
    } else {
      setFilteredProducts(products)
    }
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <Container>
        {
          cat 
          ? filteredProducts.map((item) => <Product key = {item.id} item = {item} />)
          : products.map((item) => <Product key = {item.id} item = {item} />)
        }  
    </Container>
  )
}

export default Products