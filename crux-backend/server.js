require("dotenv").config()
const express = require("express")
const app = express()
const { getCruxData } = require("./controller/apiController");

app.use(express.json({ limit: "200mb" }))
app.post("/getCruxData", getCruxData)
app.use(express.static("public"))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(
    `CRUX report [${new Date().toLocaleTimeString()}]: listening at http://localhost:${PORT}`
  )
})
