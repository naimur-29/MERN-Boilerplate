const genModel = require("./base.model");
const { TodoSchema } = require("../schemas/todo.schemas");
const todoModel = genModel("Todo", TodoSchema);

module.exports = todoModel;
