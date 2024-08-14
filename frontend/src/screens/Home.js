import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import biryani from "../components/images/biryani.jpg";
import pizza from "../components/images/pizza.jpg";
import noodles from "../components/images/noodles.jpg";

const Home = () => {
  const [search, setSearch] = useState("")

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    });

    response = await response.json();
    //console.log(response[0], response[1])
    setFoodCat(response[1]);
    setFoodItem(response[0]);
  };

  useEffect(() => {
    loadData();
  }, []);
  //console.log(foodCat.length);
  return (
    <div>
      <div>
        {" "}
        <Navbar />{" "}
      </div>
      <div>
        <div
          id="carouselExampleFade"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
          style={{ objectFit: "contain !important" }}
        >
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center">
                <input
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value = {search}
                  className = 'div-control me-2 w-100 bg-white text-dark rounded-3 p-2'
                  onChange={(e) => {setSearch(e.target.value)}}
                />
                {/* <button
                  className="btn btn-outline-success text-white bg-success"
                  type="submit"
                >
                  Search
                </button> */}
              </div>
            </div>
            <div className="carousel-item active">
              <img
                src={noodles}
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item">
              <img
                src={pizza}
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
            <div className="carousel-item active">
              <img
                src={biryani}
                className="d-block w-100"
                style={{ filter: "brightness(30%)" }}
                alt="..."
              />
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExampleFade"
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
            data-bs-target="#carouselExampleFade"
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
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">
                  {data.CategoryName}
                </div>
                <hr />
                {foodItem.length > 0 ? (
                  foodItem
                    .filter((item) => (item.CategoryName === data.CategoryName)
                    && (item.name.toLowerCase().includes(search.toLowerCase()))) 
                    .map((filterItems) => {
                      return (
                        <div
                          key={filterItems._id}
                          className="col-10 col-md-6 col-lg-3"
                        >
                          <Card
                            foodName={filterItems.name}
                            options={filterItems.options[0]}
                            imgsrc={filterItems.img}
                            desc={filterItems.description}
                          />
                        </div>
                      );
                    })
                ) : (
                  <div> No Data Found! </div>
                )}
              </div>
            );
          })
        ) : (
          <div> nothing to display </div>
        )}
      </div>
      <div>
        {" "}
        <Footer />{" "}
      </div>
    </div>
  );
};

export default Home;