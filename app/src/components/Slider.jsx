import { Carousel } from "react-bootstrap";

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src="/shopping-bag.jpg"
          alt="shopping-bag-image"
          className="d-block w-100"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/shopping-bag.jpg"
          alt="shopping-bag-image"
          className="d-block w-100"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/shopping-bag.jpg"
          alt="shopping-bag-image"
          className="d-block w-100"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
