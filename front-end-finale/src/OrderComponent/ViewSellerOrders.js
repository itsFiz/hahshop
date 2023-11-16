import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";

const ViewSellerOrders = () => {
  const seller = JSON.parse(sessionStorage.getItem("active-seller"));
  const [orders, setOrders] = useState([]);

  const seller_jwtToken = sessionStorage.getItem("seller-jwtToken");

  const [orderId, setOrderId] = useState("");
  const [tempOrderId, setTempOrderId] = useState("");

  const [assignOrderId, setAssignOrderId] = useState("");

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const [selectedOrderStatus, setSelectedOrderStatus] = useState({});

  useEffect(() => {
    const getAllOrders = async () => {
      let allOrders;
      if (orderId) {
        allOrders = await retrieveOrdersById();
      } else {
        allOrders = await retrieveAllorders();
      }

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
  }, [orderId]);

  const retrieveAllorders = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch/seller-wise?sellerId=" + seller.id,
      {
        headers: {
          Authorization: "Bearer " + seller_jwtToken,
        },
      }
    );
    return response.data;
  };

  const retrieveOrdersById = async () => {
    const response = await axios.get(
      "http://localhost:8080/api/order/fetch?orderId=" + orderId
    );
    return response.data;
  };

  const formatDateFromEpoch = (epochTime) => {
    const date = new Date(Number(epochTime));
    const formattedDate = date.toLocaleString();

    return formattedDate;
  };

  const searchOrderById = (e) => {
    e.preventDefault();
    setOrderId(tempOrderId);
  };

  const assignDelivery = (orderId, e) => {
    setAssignOrderId(orderId);
    handleShow();
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
            Authorization: "Bearer " + seller_jwtToken,
          },
        }
      );

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

  return (
    <div className="mt-3 pg-background">
      <div className="pg-blur">
      <div
        className="card form-card ms-2 me-2 mb-5 custom-bg shadow-lg"
        style={{
          height: "40rem",
        }}
      >
        <div
          className="card-header custom-bg-text text-center glass"
          style={{
            borderRadius: "1em",
            height: "50px",
          }}
        >
          <h2>Seller Orders</h2>
        </div>
        <div
          className="card-body"
          style={{
            overflowY: "auto",
          }}
        >
          <form class="row g-3">
            <div class="col-auto">
              <input
                type="text"
                class="form-control"
                id="inputPassword2"
                placeholder="Enter Order Id..."
                onChange={(e) => setTempOrderId(e.target.value)}
                value={tempOrderId}
              />
            </div>
            <div class="col-auto">
              <button
                type="submit"
                class="btn bg-color custom-bg-text mb-3"
                onClick={searchOrderById}
              >
                Search
              </button>
            </div>
          </form>

          <div className="table-responsive glass">
            <table className="table text-color text-center">
              <thead className="table-bordered border-color glass custom-bg-text">
                <tr>
                  <th scope="col">Order Id</th>
                  <th scope="col">Product</th>
                  <th scope="col">Product Name</th>
                  <th scope="col">Category</th>
                  <th scope="col">Seller</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Customer</th>
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
                        <b>{order.user.firstName}</b>
                      </td>
                      <td>
                        <b>{formatDateFromEpoch(order.orderTime)}</b>
                      </td>
                      <td>
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
                          <option value="">Select Status</option>
                          <option value="Pending">Pending</option>
                          <option value="On the way">On the way</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Processing">Processing</option>
                          <option value="Cancelled">Cancel</option>
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
    </div>
  );
};

export default ViewSellerOrders;
