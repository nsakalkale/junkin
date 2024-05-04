import Navbar from "../essentials/Navbar";
import { Link } from "react-router-dom";
import burger from "../images/burger.jpg";
import pizza from "../images/pizza.jpg";
import sandwich from "../images/sandwich.jpg";
import tacos from "../images/tacos.jpg";
import chicken from "../images/chicken.jpg";
import fries from "../images/fries.jpg";
import Footer from "../essentials/Footer";

export default function Dashboard() {
  return (
    <>
      <title>Dashboard</title>
      <Navbar />
      <div className="averta bg-cream">
        <div className="carousel-div">
          <div
            id="carouselExampleAutoplaying"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide-to="0"
                className="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide-to="4"
                aria-label="Slide 5"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleAutoplaying"
                data-bs-slide-to="5"
                aria-label="Slide 6"
              ></button>
            </div>
            <div className="carousel-inner carousel_in">
              <div className="carousel-item active">
                <img
                  className="carousel-image d-block w-100 carousel_in"
                  src={pizza}
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>
                    <b>PIZZAS</b>
                  </h1>
                  <h4>
                    "Delicious pizzas, crafted with passion, served hot to
                    satisfy your cravings."
                  </h4>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="carousel-image d-block w-100 carousel_in"
                  src={burger}
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>
                    <b>BURGERS</b>
                  </h1>
                  <h4>
                    "Juicy burgers grilled to perfection, stacked with your
                    favorite toppings for an irresistible bite."
                  </h4>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="carousel-image d-block w-100 carousel_in"
                  src={sandwich}
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>
                    <b>SANDWICHES</b>
                  </h1>
                  <h4>
                    "Savor the crunch of our freshly made sandwiches, packed
                    with flavor and served with a side of satisfaction."
                  </h4>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="carousel-image d-block w-100 carousel_in"
                  src={tacos}
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>
                    <b>TACO BELL</b>
                  </h1>
                  <h4>
                    "Experience the bold flavors of our Taco Bell creations,
                    filled with savory meats, fresh veggies, and zesty sauces
                    for a fiesta in your mouth."
                  </h4>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="carousel-image d-block w-100 carousel_in"
                  src={fries}
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>
                    <b>FRIES</b>
                  </h1>
                  <h4>
                    "Golden fries, crispy on the outside and fluffy on the
                    inside, seasoned to perfection for a mouthwatering
                    experience."
                  </h4>
                </div>
              </div>
              <div className="carousel-item">
                <img
                  className="carousel-image d-block w-100 carousel_in"
                  src={chicken}
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h1>
                    <b>CHICKEN</b>
                  </h1>
                  <h4>
                    "Tender, succulent chicken cooked to perfection, bursting
                    with flavor in every bite."
                  </h4>
                </div>
              </div>
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleAutoplaying"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="p-3">
          <div className="text-center">
            <h3>Explore Our Mouth Watering Products and Desserts</h3>
            <br />
            <Link to="/products" className="links">
              <button className="btn-junkin">Explore</button>
            </Link>
            <br />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
