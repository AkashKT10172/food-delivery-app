import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState({});

  const fetchMyOrder = async () => {
        await fetch("https://food-delivery-app-du11.onrender.com/api/myOrderData", {
            method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: localStorage.getItem("userEmail"),
      }),
    }).then(async (res) => {
      let response = await res.json();

      if (response && response.orderData && response.orderData.order_data) {
        // Sort the order data by date in descending order
        response.orderData.order_data.sort((a, b) => {
          const dateA = new Date(a[0]?.Order_date); // Use optional chaining
          const dateB = new Date(b[0]?.Order_date);
          return dateB - dateA; // Sort in descending order
        });
      }
      setOrderData(response);
    });
  };
  console.log(orderData); // Log the fetched response for debugging
  useEffect(() => {
    fetchMyOrder();
  }, []);

  return (
    <div style={{ background: "#fed8b1" }}>
      <Navbar />

      <div className="container text-black">
        <div className="row m-4">
          {orderData && orderData.orderData?.order_data?.length > 0 ? (
            orderData.orderData.order_data.map((data, index) => {
              // Check if data is a non-empty array
              if (data && data.length > 0) {
                return (
                  <div key={index} className="mb-4">
                    <h5>{data[0].Order_date}</h5>{" "}
                    {/* Display the date for the group */}
                    <hr className="text-black" />
                    <div className="row">
                      {data.slice(1).map((arrayData) =>
                        // Check for valid arrayData before rendering
                        arrayData ? (
                          <div
                            className="col-12 col-md-6 col-lg-3 mb-3"
                            key={arrayData.name + arrayData.qty}
                          >
                            <div
                              className="card bg-white p-2"
                              style={{ width: "100%", maxHeight: "360px" }}
                            >
                              <img
                                src={arrayData.img}
                                className="card-img-top"
                                alt="..."
                                style={{ height: "80px", objectFit: "fill" }}
                              />
                              <div className="card-body">
                                <h5 className="card-title">
                                  {arrayData.name}, {arrayData.qty},{" "}
                                  {arrayData.size}
                                </h5>
                                <div
                                  className="container w-100 p-0"
                                  style={{ height: "50px" }}
                                >
                                  <div className="my-1">
                                    {data[0].Order_date}
                                  </div>{" "}
                                  {/* Reuse date */}
                                  <div className="d-inline my-2 h-100 w-20 fs-5">
                                    Rs.{arrayData.price}/-
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : null // Avoid rendering for invalid arrayData
                      )}
                    </div>
                  </div>
                );
              }
              return null; // Return null for empty data
            })
          ) : (
            <div className="text-center">No Orders Found</div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
