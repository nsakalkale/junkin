import React, { useState, useEffect } from "react";
import Navbar from "../essentials/Navbar";
import axios from "axios";
import Footer from "../essentials/Footer";
import { useNavigate, Link } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [filterOption, setFilterOption] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/auth/login");
    }
    const storedCartItems = JSON.parse(sessionStorage.getItem("cartItems"));
    if (storedCartItems) {
      setCartItems(storedCartItems);
      setCartCount(storedCartItems.length);
    }

    axios
      .get("http://localhost:8080/getproduct")
      .then((response) => {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCartCount(cartItems.length);
  }, [cartItems]);

  useEffect(() => {
    const filtered = products.filter((product) => {
      const meetsCategoryFilter =
        categoryFilter === "all" || product.type === categoryFilter;
      const meetsVegetarianFilter =
        filterOption === "all" ||
        (filterOption === "veg" && product.vnvg === "VEG") ||
        (filterOption === "non-veg" && product.vnvg === "NON-VEG");
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return meetsCategoryFilter && meetsVegetarianFilter && matchesSearch;
    });
    setFilteredProducts(filtered);
  }, [products, filterOption, categoryFilter, searchQuery]);

  const addToCart = (product) => {
    const existingItem = cartItems.find((item) => item._id === product._id);
    if (existingItem) {
      const updatedItems = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateCartItem = (productId, operation) => {
    const updatedItems = cartItems.map((item) => {
      if (item._id === productId) {
        if (operation === "increment") {
          return { ...item, quantity: item.quantity + 1 };
        } else if (operation === "decrement") {
          return { ...item, quantity: item.quantity - 1 };
        }
      }
      return item;
    });

    setCartItems(updatedItems.filter((item) => item.quantity > 0));
  };

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleCategoryFilterChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <>
      <title>Products</title>
      <Navbar cartCount={cartCount} cartItems={cartItems} />
      <div className="averta">
        <div className="bg-cream p-3">
          <Link to="/cart" className="position-fixed">
            <button className="btn-junkin">Go To Cart</button>
          </Link>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-3">
                <select
                  className="form-select mb-3"
                  value={filterOption}
                  onChange={handleFilterChange}
                >
                  <option value="all">All</option>
                  <option value="veg">Veg</option>
                  <option value="non-veg">Non-Veg</option>
                </select>
              </div>
              <div className="col-md-3">
                <select
                  className="form-select mb-3"
                  value={categoryFilter}
                  onChange={handleCategoryFilterChange}
                >
                  <option value="all">All Categories</option>
                  <option value="pizza">Pizza</option>
                  <option value="chicken">Chicken</option>
                  <option value="sandwich">Sandwiches</option>
                  <option value="taco">Tacos</option>
                  <option value="burger">Burgers</option>
                  <option value="fries">Fries</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center">
              <div className="col-md-6 col-12">
                <input
                  type="text"
                  className="form-control mb-3"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </div>
            <div className="row justify-content-center">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="card div-links hover-shadow col-sm-3 m-2"
                >
                  <div className="price-tag">₹ {product.price}</div>
                  <img
                    src={product.img_url}
                    className="card-img-top w-100 rounded mt-2"
                    alt="..."
                    height={200}
                  />
                  <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <p className="d-none">{product.type}</p>
                      <h5 className="card-title">
                        <b>{product.name}</b>
                      </h5>
                      <h6
                        className={`text-white rounded ${
                          product.vnvg === "VEG" ? "bg-success" : "bg-danger"
                        }`}
                        style={{
                          padding: "2px 7px 2px 7px",
                          fontWeight: "bold",
                        }}
                      >
                        {product.vnvg}
                      </h6>
                    </div>
                    <div className="">
                      <p className="card-text text-muted">
                        <b>{product.type.toUpperCase()}</b>
                      </p>
                    </div>
                    <p
                      className="card-text text-muted"
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {product.description}
                    </p>
                    {cartItems.some((item) => item._id === product._id) ? (
                      <div className="d-flex">
                        <button
                          onClick={() =>
                            updateCartItem(product._id, "decrement")
                          }
                          className="px-3 py-2 border bg-black text-white"
                        >
                          <b>
                            {cartItems.find((item) => item._id === product._id)
                              .quantity === 1
                              ? "🗑"
                              : "-"}
                          </b>
                        </button>
                        <div className="px-3 py-2 border">
                          {
                            cartItems.find((item) => item._id === product._id)
                              .quantity
                          }
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-3 py-2 border bg-black text-white"
                        >
                          <b>+</b>
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-2 bg-black text-white btn-junkin"
                      >
                        <b>Add to Cart</b>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
