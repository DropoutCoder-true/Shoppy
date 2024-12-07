import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";

const ProductContext = createContext();

export const ProductContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(0)
  const [loading, setLoading] = useState(true)

  async function fetchProducts() {
    try {
      const { data } = await axios.get(`${server}/api/product/all`);
      setProducts(data.products);
      setTopProducts(data.mostSelling);
      setTotalPages(data.totalPages)
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{products, totalPages, topProducts, loading}}>{children}</ProductContext.Provider>
  );
};

export const ProductData = () => useContext(ProductContext);
