const { Schema } = require("mongoose");

const TodoSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  context: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    default: false,
  },
});

// responses:
const TodoResponses = {
  onAdd(todo) {
    // if list of items:
    if (todo instanceof Array) {
      const res = [];
      for (const ele of todo)
        res.push({
          id: ele.id,
          context: ele.context,
          state: ele.state,
        });
      return res;
    }

    // one item:
    return {
      id: todo.id,
      context: todo.context,
      state: todo.state,
    };
  },
};

module.exports = { TodoSchema, TodoResponses };
