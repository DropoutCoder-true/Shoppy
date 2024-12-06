import { Carousel } from "react-bootstrap";

const Slider = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          src="/image-1.jpg"
          alt="shopping-bag-image"
          className="d-block w-100"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/image-2.jpg"
          alt="shopping-bag-image"
          className="d-block w-100"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="/image-3.jpg"
          alt="shopping-bag-image"
          className="d-block w-100"
        />
      </Carousel.Item>
    </Carousel>
  );
};

export default Slider;
