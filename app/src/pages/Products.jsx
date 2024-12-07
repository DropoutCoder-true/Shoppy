import { Badge, Container, Row } from "react-bootstrap"
import { ProductData } from "../context/ProductContext"
import ProductCard from "../components/ProductCard"
import Loader from "../components/Loader"

const Products = () => {
  const {products, loading} = ProductData()  

  return (
    <Container className="mt-4"> 
      <h4> 
        Our Products <Badge bg="secondary"> All Products </Badge>
      </h4>
      {
        loading ? <Loader/> : <Row className="justify-content-center" style={{gap: "1rem"}}>
          { products && products.length > 0 ? (products.map((e) =>  <ProductCard key={e._id} product={e}/>)) : (<p>No Products Yet</p>)}
        </Row>
      }
    </Container>
  )
}

export default Products
