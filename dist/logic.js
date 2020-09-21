class ExpenseManager {
    constructor() {
        this.expenses = []
        this.newExpense = {}
    }

    async addExpense(name,amount,group,date) {
        const addObjExpenses = {
            name: name,
            amount: amount,
            group: group,
            date: date
        }
        this.newExpense = addObjExpenses
       await $.post("/expense", addObjExpenses)
    }

    async getExpenses(d1, d2) {
        const getAllExpenses = await $.get(`/expenses/?d1=${d1}&d2=${d2}`)
        this.expenses = []
        getAllExpenses.forEach(expense => {
            this.expenses.push(expense)
        });
        console.log(this.expenses)
        console.log(getAllExpenses)
    }
}