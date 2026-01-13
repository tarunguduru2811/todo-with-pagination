const express = require("express");
const { fetchTodos, seedTodo, createTodo, updateTodo, deleteTodo } = require("../controllers/todoController");
const router  = express.Router();


router.get("/",fetchTodos);
router.post("/seed",seedTodo);
router.post("/",createTodo);
router.put("/:id",updateTodo)
router.delete("/:id",deleteTodo)

module.exports = router