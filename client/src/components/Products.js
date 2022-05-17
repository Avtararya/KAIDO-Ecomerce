import styled from 'styled-components';
import { popularProducts } from '../data';
import ProductItem from './ProductItem';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const Products = ({ filters, sort, category }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          category
            ? `http://localhost:8000/api/product?category=${category}`
            : `http://localhost:8000/api/product`
        );
        setProducts(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [category]);

  useEffect(() => {
    category &&
      setFilteredProducts(
        products.filter(item =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, category, filters]);

  useEffect(() => {
    if (sort === 'newest') {
      setFilteredProducts(prev =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === 'asc') {
      setFilteredProducts(prev => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProducts(prev => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <Container>
      {category
        ? filteredProducts.map(item => (
            <ProductItem item={item} key={item.id} />
          ))
        : products
            .slice(0, 8)
            .map(item => <ProductItem item={item} key={item.id} />)}
    </Container>
  );
};

export default Products;
