/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
import axios from "axios";

// query functions:
const fetchTodosQ = async () => {
  const response = await axios.get("http://localhost:8000/api/todo");
  return response.data;
};

export default function Todo() {
  // states:
  const [userInput, setUserInput] = useState("");

  // React Queries:
  const fetchTodos = useQuery("fetchTodos", fetchTodosQ);
  const addTodo = useMutation((todo) =>
    axios.post("http://localhost:8000/api/todo", todo)
  );
  const deleteTodo = useMutation((todoId) =>
    axios.delete(`http://localhost:8000/api/todo/${todoId}`)
  );
  const updateTodo = useMutation((info) =>
    axios.put(`http://localhost:8000/api/todo/${info.id}`, info.updatedData)
  );

  // handle functions:
  const handleAddTodo = () => {
    if (userInput.trim().length <= 0) return;
    addTodo.mutate({
      id:
        fetchTodos.data.data.length < 1
          ? 1
          : fetchTodos.data.data[fetchTodos.data.data.length - 1].id + 1,
      context: userInput.trim(),
    });
    setUserInput("");
  };

  // use effects:
  useEffect(() => {
    fetchTodos.refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addTodo.isLoading, deleteTodo.isLoading, updateTodo.isLoading]);

  return (
    <section className="flex flex-col items-center h-screen p-4 todo-page-container">
      {/* Add Todo */}
      <div className="add-todo-container p-2 bg-yellow-600 w-full max-w-[720px] flex items-center justify-between gap-2 mb-[12px] rounded-md cursor-pointer">
        <input
          type="text"
          className="w-full h-[37px] px-2 text-xl rounded-md outline-yellow-100"
          value={userInput}
          onChange={(e) => {
            e.preventDefault();
            setUserInput(e.target.value);
          }}
        />
        <button
          className="text-2xl font-bold text-yellow-100 uppercase outline-yellow-100"
          onClick={handleAddTodo}
        >
          {addTodo.isLoading
            ? "Loading..."
            : deleteTodo.isLoading
            ? "Deleting..."
            : updateTodo.isLoading
            ? "Updating..."
            : "Add"}
        </button>
      </div>
      {/* Add Todo */}

      {/* Render Todo(s) */}
      <div className="display-todo-container w-full max-w-[720px] p-2 flex flex-col gap-1 cursor-pointer">
        {fetchTodos.data?.data?.map((ele, index) => (
          <TodoItem
            key={index}
            value={ele}
            deleteTodo={deleteTodo}
            updateTodo={updateTodo}
          />
        ))}
      </div>
      {/* Render Todo(s) */}
    </section>
  );
}

// eslint-disable-next-line react/prop-types
const TodoItem = ({ value, deleteTodo, updateTodo }) => {
  return (
    <div className="todo-container bg-yellow-200 p-1 px-2 text-lg flex items-start justify-between border-[3px] border-yellow-500">
      <p className="w-[80vw] break-words h-full flex items-center">
        {value.context}
      </p>

      <div className="flex items-center gap-2 select-none buttons-container">
        <div
          className={`circle w-[1.7rem] aspect-square border-[3px] rounded-full active:scale-90 transition-[background-color] duration-300 ${
            value.state
              ? "bg-green-300 border-green-500"
              : "bg-yellow-50 border-yellow-500"
          }`}
          onClick={() => {
            updateTodo.mutate({
              id: value.id,
              updatedData: {
                state: !value.state,
              },
            });
          }}
        ></div>

        <div
          className={`circle w-[1.7rem] aspect-square flex items-center justify-center text-3xl text-red-400 font-bold active:scale-90`}
          onClick={() => {
            deleteTodo.mutate(value.id);
          }}
        >
          X
        </div>
      </div>
    </div>
  );
};
