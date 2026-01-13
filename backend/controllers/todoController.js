const Todo = require("../schemas/Todo");


exports.fetchTodos = async (req,res) => {
    try{
        const {search="",page=1,limit=5} = req.query;
        const filter = {};
        
        if(search){
            filter.name = {$regex:search,$options:"i"}
        };

        const totalTasks = await Todo.countDocuments(filter);

        const skip = (page-1)*limit;
        
        const todos = await Todo.find(filter).skip(skip).limit(Number(limit));

        return res.status(200).json({
            message:"Todos Fetched Successfully",
            todos,
            page:Number(page),
            totalPages:Math.ceil(totalTasks/limit)
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
} 

exports.seedTodo = async (req,res) => {
    try{
        const todoData = {
            name:"Sample",
            description:"This is Sample Todo",
        }

        const todo = await Todo.create(todoData);

        return res.status(200).json({
            message:"Data Seeded Successfully"
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}

exports.createTodo = async (req,res) => {
    try{
         const {name,description} = req.body;
         const newTodo = await Todo.create({name,description});

         return res.status(200).json({
            message:"Todo Created Successfully",
            newTodo
         })
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}

exports.updateTodo = async (req,res) => {
    try{
        const todo = await Todo.findById(req.params.id);
        const { name,description,completed} = req.body;
        if(!todo){
            return res.status(400).json({
                message:"No Todo Task Found",
            })
        }

        if(name){
            todo.name = name;
        }

        if(description){
            todo.description =description
        }

        if(completed){
            todo.completed = completed;
        }

        const updatedTodo = await todo.save();

        return res.status(200).json({
            message:"Updated Successfully",
            updatedTodo
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}

exports.deleteTodo = async (req,res) => {
    try{
        const todo = await Todo.findById(req.params.id);

        if(!todo){
            return res.status(400).json({
                message:"No Todo Task Found"
            })
        }

        await Todo.findByIdAndDelete(req.params.id);

        return res.status(200).json({
            message:"Deleted Successfully"
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error",
            error:err.message
        })
    }
}