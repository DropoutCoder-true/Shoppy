import { Badge, Container } from "react-bootstrap"
import { ProductData } from "../context/ProductContext"

const Products = () => {
  const {products, loading} = ProductData()  

  return (
    <Container className="mt-4"> 
      <h4> 
        Our Products <Badge bg="secondary"> All Products </Badge>
      </h4>
    </Container>
  )
}

export default Products
