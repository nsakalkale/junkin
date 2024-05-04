import React, { useState } from "react";
import ManagerNavbar from "../essentials/ManagerNavbar";
import axios from "axios";
import Footer from "../essentials/Footer";

export default function AddProducts() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    img_url: "",
    type: "",
    vnvg: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/addproducts", formData);
      setFormData({
        name: "",
        description: "",
        price: "",
        img_url: "",
        type: "",
        vnvg: "",
      });
      alert("Product added successfully!");
    } catch (error) {
      alert("Error adding product:", error);
    }
  };

  return (
    <>
      <title>Add Products</title>
      <div className="averta bg-cream">
        <ManagerNavbar />

        <div className="container">
          <div className="text-center">
            <h2 className="mt-2">
              <b>Add Product</b>
            </h2>
          </div>
          <div className="d-flex justify-content-center">
            <div className="col-md-6 bg-white rounded border p-5">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="img_url" className="form-label">
                    Image URL
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="img_url"
                    name="img_url"
                    value={formData.img_url}
                    onChange={handleChange}
                    required
                    autoComplete="off"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="type" className="form-label">
                    Type
                  </label>
                  <select
                    className="form-select"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="chicken">Chicken</option>
                    <option value="burger">Burger</option>
                    <option value="pizza">Pizza</option>
                    <option value="sandwich">Sandwiches</option>
                    <option value="taco">Tacos</option>
                    <option value="fries">Fries</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label htmlFor="vnvg" className="form-label">
                    VEG / NON-VEG
                  </label>
                  <select
                    className="form-select"
                    id="vnvg"
                    name="vnvg"
                    value={formData.vnvg}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select VEG / NON-VEG</option>
                    <option value="VEG">VEG</option>
                    <option value="NON-VEG">NON-VEG</option>
                  </select>
                </div>
                <button type="submit" className="btn-junkin">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
        <br />
        <Footer />
      </div>
    </>
  );
}
