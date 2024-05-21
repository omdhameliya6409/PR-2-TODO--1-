const express  = require("express")

const Todo = express();

let initialTodo = [{title:"HTML",isCompleted:true,id:1},{title:"javascript",isCompleted:true,id:2},{title:"React",isCompleted:false,id:3}]
let Delete_data =[]
Todo.use(express.json())

Todo.get("/",(req,res) =>
{
    res.send("welcome to the todo api")
})

Todo.get("/todos",(req,res) =>
{
    let todo_data = {title,isCompleted,id} = req.body
    todo_data.id = initialTodo.length+1
    res.send(initialTodo)
})

Todo.get("/todo/:id", (req,res) =>
{
    const ID = parseInt(req.params.id,10)
    const todos_data = initialTodo.find(e => e.id === ID)
    if(todos_data)
    {
        res.send(todos_data)
    }
    else
    {
        res.send("Data Not Found")
    }    
})

Todo.post("/addtodo", (req,res) => 
{
   let data = {title,isCompleted,id} = req.body
   data.id = initialTodo.length+1
   initialTodo.push(data)
   res.send(data)
})

Todo.patch("/update/:id" ,(req,res) =>
{
    let {id} = req.params
    initialTodo[id] = {...initialTodo[id],...req.body}
    res.send(initialTodo[id])
})

Todo.get("/findbystatus",(req,res) =>
{
    let {isCompleted} = req.query;
    let temp = initialTodo.filter((ele) => ele.isCompleted==isCompleted)
    res.send(temp)
})

Todo.delete("/delete/:id",(req,res) =>
{
    let {id} = req.params
    
    let  deletedTodo = initialTodo.splice(id-1,1)[0]
    res.send({deletedTodo:deletedTodo,todos:Todo});
})


Todo.listen(8090,() =>
{
    console.log("Server Is Running On Port 8090");
})