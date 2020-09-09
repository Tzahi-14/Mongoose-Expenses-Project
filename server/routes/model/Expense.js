const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense', { useNewUrlParser: true })

const Schema = mongoose.Schema
const expenseSchema = new Schema({
    name: String,
    amount: Number,
    date: { type: Date, default: Date.now() },
    group: String
})

const Expense = mongoose.model("Expense", expenseSchema)

module.exports = Expense

