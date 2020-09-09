const express = require('express')
const router = express.Router()
const expenseData = require("../../expenses")
const moment = require('moment')
const Expense = require("../routes/model/Expense")

router.get("/test", function (req, res) {
   // expenseData.forEach(s=>{
   //    const newExpense = new Expense(s)
   //    newExpense.save()})
   res.send(expenseData)
})

// router.get("/expenses", function (req, res) {
//    Expense.find({}).sort({ date: -1 }).exec(function (err, expenses) {
//       res.send(expenses)
//    })
// })
router.get("/expenses", function (req, res) {
   const {d1,d2}= req.query
   // const d1 = req.query.d1
   // const d2 = req.query.d2

   if (d1 && d2) {
      Expense.find({
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
      Expense.find({
         $and: [
            { date: { $gt: moment(d1).format('LLLL') } },
            { date: { $lt: moment(new Date()).format('LLLL') } }
         ]
      }, function (err, expenses) {
         res.send(expenses)
      })
   }
   else {
      Expense.find({}).sort({ date: -1 }).exec(function (err, expenses) {
         res.send(expenses)
      })
   }
})
// const dateToParse = req.body.date ? req.body.date : new Date()
// date: moment(dateToParse).format('LLLL')


// Positions.find({
//    unit_id: req.params.unit_id,
//    utc_ts: {
//        $gt:  startDate,
//        $lt:  endDate
//    }
// }, function(err, positions) {
//    if (err) {
//        return err
//    }
//    else {
//        //console.log(positions);
//        res.json(positions);
//    }
// });

// Since we already have an /expenses path, let's add some optional query parameters to it, d1 and d2. Make it so that when we add in specific dates, we see only the expenses during those dates. The logic is as follows:

// If two dates are provided (d1 and d2) you should return only expenses expended between those dates
// If there is one date query parameter (just d1), you should return expenses between that date and now
// If no dates are provided, return all expenses as the route did previously

router.post("/expense", function (req, res) {
   const dateToParse = req.body.date ? req.body.date : new Date()
   const newExpense = new Expense({
      name: req.body.name,
      amount: req.body.amount,
      group: req.body.group,
      date: moment(dateToParse).format('LLLL')
      // date: req.body.date ? req.body.date : new Date()
   })
   // newExpense.save().then(console.log(`${newExpense.name} spent ${newExpense.amount} on ${newExpense.group}`))
   res.send(newExpense)

   Expense.find({ _id: "5f575d77a16029d6fcf3ad14" }, function (err, people) {
      console.log(people)
   })
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



// Add a query parameter to your /expenses/:group called total. If total is true, then instead of returning all results from the category you should aggregate them and return the total amount of money spent in that category. $match will come in handy here.
module.exports = router
