import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";

const Home = () => {
  const [search, setSearch] = useState("");

  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    let response = await fetch("https://food-delivery-app-du11.onrender.com/api/foodData", {
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
    <div style={{background : "#fed8b1"}}>
      <Navbar />
      <div className="d-flex justify-content-center">
        <input
          type="search"
          placeholder="What are you looking for today?"
          aria-label="Search"
          value={search}
          className="div-control mt-5 mb-2 w-75 bg-white text-dark rounded-3 p-2"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
      </div>
      <div className="container">
        {foodCat.length > 0 ? (
          foodCat.map((data) => {
            return (
              <div className="row mb-3">
                <div key={data._id} className="fs-3 mb-3 mt-3 text-center text-black">
                  {data.CategoryName}
                </div>
                <hr className="text-dark"/>
                <div className="d-flex flex-row flex-wrap justify-content-center justify-content-sm-start">
                {foodItem.length > 0 ? (
                  foodItem
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((filterItems) => {
                      return (
                        
                          <Card
                            foodItem={filterItems}
                            options={filterItems.options[0]}
                          />
                        
                      );
                    })
                ) : (
                  <div> No Data Found! </div>
                )}
                </div>
              </div>
            );
          })
        ) : (
          <div> nothing to display </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
