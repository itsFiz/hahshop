import React, { useState, useEffect } from 'react'

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate fetching data from an API
    fetch('http://localhost:9090/shoppingCart')
      .then((response) => response.json())
      .then((data) => {
        setCartItems(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setIsLoading(false)
      })
  }, [])

  const handleCheckout = () => {
    // You can implement the checkout logic here
    // For example, send a request to a payment gateway
    alert('Checkout button clicked! Implement your checkout logic here.')
  }

  const handleDeleteItem = (itemId) => {
    // Implement logic to remove the item from the shopping cart
    // You can update the cartItems state accordingly
  }

  const handleIncreaseQuantity = (item) => {
    // Implement logic to increase the quantity of the item
    // You can update the cartItems state accordingly
  }

  const handleDecreaseQuantity = (item) => {
    // Implement logic to decrease the quantity of the item
    // You can update the cartItems state accordingly
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    width="50"
                    height="50"
                  />
                  {item.name} - ${item.price}
                  <button onClick={() => handleDeleteItem(item.id)}>
                    Delete
                  </button>
                  <div>
                    <button onClick={() => handleDecreaseQuantity(item)}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncreaseQuantity(item)}>
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your shopping cart is empty.</p>
          )}
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      )}
    </div>
  )
}

export default ShoppingCart
