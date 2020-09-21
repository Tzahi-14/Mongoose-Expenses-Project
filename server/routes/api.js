const express = require('express')
const router = express.Router()
const expenseData = require("../../expenses")
const moment = require('moment')
const Expense = require("../routes/model/Expense")

router.get("/test", function (req, res) {
   res.send(expenseData)
})

router.get("/expenses",async function (req, res) {
   const {d1,d2}= req.query
   console.log(d1,d2)

   if (d1 && d2) {
     await Expense.find({
         $and: [
            { date: { $gt: moment(d1).format('LLLL') } },
            { date: { $lt: moment(d2).format('LLLL') } }
         ]
      }, function (err, expenses) {
         res.send(expenses)
      }
      )
   }

   else if (d1) {
      await Expense.find({
         $and: [
            { date: { $gt: moment(d1).format('LLLL') } },
            { date: { $lt: moment(new Date()).format('LLLL') } }
         ]
      }, function (err, expenses) {
         res.send(expenses)
      })
   }
   else {
     await Expense.find({}).sort({ date: -1 }).exec(function (err, expenses) {
         res.send(expenses)
      })
   }
})

router.post("/expense", async function (req, res) {
   const dateToParse = req.body.date ? req.body.date : new Date()
   const newExpense = new Expense({
      name: req.body.name,
      amount: req.body.amount,
      group: req.body.group,
      date: moment(dateToParse).format('LLLL')
   })
   newExpense.save()
   res.send(newExpense)

   // Expense.find({ _id: "5f575d77a16029d6fcf3ad14" }, function (err, people) {
   //    console.log(people)
   // })
})

router.put("/update", function (req, res) {
   const { group1, group2 } = req.body
   Expense.findOneAndUpdate({ group: `${group1}` }, { group: `${group2}` }, { new: true }).exec(function (err, group) {
      res.send(group)
      console.log(group)
   })
})

router.get("/expenses/:group/", function (req, res) {
   const groupToSearch = req.params.group
   const addTotal = req.query.total
   try {
      if (addTotal === "true") {
         Expense.aggregate([
            { $match: { group: `${groupToSearch}` } },
            {
               $group: { _id: null, amount: { $sum: "$amount" } }
            }
         ]).exec(function (err, group) {
            res.send(group)
         })
      }
      else {
         Expense.find({ group: `${groupToSearch}` }).exec(function (err, group) {
            console.log(group)
            res.send(group)
         })
      }
   }
   catch (err) {
      res.status(400).send({
         message: "Try other fillters"
      })
   }
})


module.exports = router
