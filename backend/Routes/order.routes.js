const express = require('express')
const bodyParser = require('body-parser')
const cors=require('cors')
const createOrderController = require('../controller/createOrder.controller')
const orderRouter=express.Router()

orderRouter.use(bodyParser.urlencoded({ extended: false }))
orderRouter.use(bodyParser.json())
orderRouter.post('/create/orderId/:userId',cors(), createOrderController) 
module.exports=orderRouter