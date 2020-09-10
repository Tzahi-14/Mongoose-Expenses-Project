const express = require('express')
const bodyParser = require('body-parser')
const moments = require('moment')
const api = require ('./server/routes/api')
const app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', api)

const port = 4300
app.listen(port, function () {
    console.log(`Running on port ${port}`)
})