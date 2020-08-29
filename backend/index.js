const cors = require("cors")
const express = require("express")
const app = express()
const uuid = require("uuid")
const stripe = require("stripe")(
  "sk_test_51FLopOD6vsN6xEGIRMtaJBpFBWQdyfybOJ1rwq9wOt26Aq8o3w8qRH2ha6xNB1lcYZ7OJpPgHEq0GRz2VnTJh22R00MlZfiBQe"
)

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
  res.json("helllo")
})

app.post("/payment", (req, res) => {
  const {product, token} = req.body
  console.log("product", product)
  console.log("productPrice", product.price)
  const idempontencyKey = uuid.v4()

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: product.price * 100,
          currency: "usd",
          customer: customer.id,
          receipt_email: token.email,
          description: `purchase of ${product.name}`,
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        {idempontencyKey}
      )
    })
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err))
})

app.listen(5000, () => {
  console.log(`listening  at port 5000`)
})
