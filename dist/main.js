const expenseManager = new ExpenseManager()
const renderer = new Renderer()


const loadPage = async function (d1,d2) {
    // console.log(expenseManager.expenses)// 0
    await expenseManager.getExpenses(d1,d2)
    renderer.renderExpenses(expenseManager.expenses)
    console.log(expenseManager.expenses.length) // gets the length after the await

}

const addExpenseToExpenses = async function(name,amount,group,date){
    await expenseManager.addExpense(name,amount,group,date)
    renderer.renderAdd(expenseManager.newExpense)
    console.log(expenseManager.newExpense)
}

$("#btn-dates").on("click", function(){
    const d1 = $("#d1").val()
    const d2 = $("#d2").val()
    loadPage (d1,d2)
    console.log(d1)
    console.log(d2)
})

$("#btn-submit").on("click",function(){
    console.log("hey");
    const name = $("#name").val()
    const amount = $("#amount").val()
    const group = $("#group").val()
    const date = $("#date").val()
    addExpenseToExpenses(name,amount,group,date)

})