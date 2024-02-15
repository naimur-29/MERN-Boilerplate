const genController = require("./base.controller");
const TodoModel = require("../models/todo.model");
const { TodoResponses } = require("../schemas/todo.schemas");

const todoController = genController(TodoModel, {
  async add(req, res) {
    try {
      const data = req.body;
      console.log(data);
      const resData = await this.model.create(data);
      return res.status(201).json(TodoResponses.onAdd(resData));
    } catch (error) {
      console.error(error);
      return res.status(400).json({ message: "Post unsuccessful!", error });
    }
  },
  async getAll(_req, res) {
    try {
      const data = await this.model.find();
      return res.status(200).json({ data: TodoResponses.onAdd(data) });
    } catch (error) {
      console.error(error);
      return res.status(404).json({ message: "Not found!", error });
    }
  },
});

module.exports = todoController;
