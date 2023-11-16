import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

const ViewMyOrders = () => {
  let user = JSON.parse(sessionStorage.getItem("active-customer"));

  const [orders, setOrders] = useState([]);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState({});
  const customer_jwtToken = sessionStorage.getItem("customer-jwtToken");

  useEffect(() => {
    const getAllOrders = async () => {
      const allOrders = await retrieveCart();
      if (allOrders) {
        setOrders(allOrders.orders);
        const initialSelectedStatus = {};
        allOrders.orders.forEach((order) => {
          initialSelectedStatus[order.orderId] = "";
        });
        setSelectedOrderStatus(initialSelectedStatus);
      }
    };

    getAllOrders();
  }, []);

  const retrieveCart = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch/user-wise?userId=" + user.id,
      {
        headers: {
          Authorization: "Bearer " + customer_jwtToken,
        },
      }
    );
    return response.data;
  };

  const handleStatusChange = async (orderId) => {
    if (!selectedOrderStatus[orderId]) {
      alert("Please select a status.");
      return;
    }

    const updateData = {
      orderId: orderId,
      deliveryStatus: selectedOrderStatus[orderId],
    };

    try {
      const response = await axios.put(
        "http://localhost:8080/api/order/update/delivery-status",
        updateData,
        {
          headers: {
            Authorization: "Bearer " + customer_jwtToken,
          },
        }
      );
      console.log(response.data);

      // Update the order status in the local state
      const updatedOrders = orders.map((order) => {
        if (order.orderId === orderId) {
          return { ...order, status: selectedOrderStatus[orderId] };
        }
        return order;
      });

      setOrders(updatedOrders);

      // Clear the selected status for this order
      setSelectedOrderStatus({
        ...selectedOrderStatus,
        [orderId]: "",
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      // Handle the error, e.g., show an error message.
    }
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString();

    return formattedDate;
  };

  return (
    <div className="mt-3">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "40rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center bg-color"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>My Orders</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <div className="table-responsive">
            <table className="table  text-color text-center">
              <thead className="table-bordered border-color bg-color custom-bg-text">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Order Time</th>
                  <th scope="col">Order Status</th>
                  
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  return (
                    <tr key={order.orderId}>
                      <td>
                        <b>{order.orderId}</b>
                      </td>
                      <td>
                        <img
                          src={
                            "http://localhost:8080/api/product/" +
                            order.product.image1
                          }
                          className="img-fluid"
                          alt="product_pic"
                          style={{
                            maxWidth: "90px",
                          }}
                        />
                      </td>
                      <td>
                        <b>{order.product.name}</b>
                      </td>
                      <td>
                        <b>{order.product.category.name}</b>
                      </td>
                      <td>
                        <b>{order.product.seller.firstName}</b>
                      </td>
                      <td>
                        <b>{order.product.price}</b>
                      </td>
                      <td>
                        <b>{order.quantity}</b>
                      </td>
                      <td>
                        <b>{formatDateFromEpoch(order.orderTime)}</b>
                      </td>
<<<<<<< HEAD:front-end-finale/src/OrderComponent/ViewMyOrders.js
                      <td >
=======
                      <td>
>>>>>>> 9574590000e5203c90c6d42ed81f077059a247bf:front-end/src/OrderComponent/ViewMyOrders.js
                        <b>{order.status}</b>
                      </td>
                     
                     
                      
                      <td>
                        <select
                          className="form-select"
                          value={selectedOrderStatus[order.orderId]}
                          onChange={(e) =>
                            setSelectedOrderStatus({
                              ...selectedOrderStatus,
                              [order.orderId]: e.target.value,
                            })
                          }
                        >
<<<<<<< HEAD:front-end-finale/src/OrderComponent/ViewMyOrders.js
                          <option value=""> Status</option>
=======
                          <option value="">Select Status</option>
>>>>>>> 9574590000e5203c90c6d42ed81f077059a247bf:front-end/src/OrderComponent/ViewMyOrders.js
                          
                          
                          <option value="Delivered">Delivered</option>
                          
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          className="btn btn-primary mt-2"
                          onClick={() => handleStatusChange(order.orderId)}
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMyOrders;
