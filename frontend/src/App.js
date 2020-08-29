import React, {useState} from "react"
import logo from "./logo.svg"
import "./App.css"
import StripeCheckout from "react-stripe-checkout"

function App() {
  const [product, setproduct] = useState({
    name: "React from FB",
    price: 10,
    productby: "facebook",
  })

  const makePayment = (token) => {
    const body = {
      token,
      product,
    }

    const headers = {
      "Content-Type": "application/json",
    }

    return fetch(`http://localhost:5000/payment`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <StripeCheckout
          stripeKey="pk_test_4Dfr74oHn8RutceLiREV4qwj00YP1gumrr"
          token={makePayment}
          email="gauravbajaj837@gmail.com"
          name="Buy React"
          amount={product.price}
        >
          <button className="btn-large pink">
            Buy React in just {product.price}
          </button>
        </StripeCheckout>
      </header>
    </div>
  )
}

export default App
