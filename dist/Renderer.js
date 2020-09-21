class Renderer {
    constructor(){

    }

    renderExpenses(data){
        $("#expenses").empty()
        const source = $("#expenses-template").html()
        const template = Handlebars.compile(source)
        const newHtml = template({data})
        $("#expenses").append(newHtml)
    }

    renderAdd(data){
        $("#expenses").empty()
        const source = $("#addExpenses-template").html()
        const template = Handlebars.compile(source)
        const newHtml = template(data)
        $("#expenses").append(newHtml)
    }
}