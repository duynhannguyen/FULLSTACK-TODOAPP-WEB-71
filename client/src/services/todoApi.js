import api from "./axiosInstances.js";

const todoApi = {
  getAll: (limit = 10, page = 1) => {
    const url = `/todo?limit=${limit}&page=${page}`;
    return api.get(url);
  },
  createTodo: (newTask) => {
    const url = "/todo/";
    return api.post(url, newTask);
  },
  updateTodo: (_id, updatedTask) => {
    const url = `/todo/${_id}`;
    return api.put(url, updatedTask);
  },
  deleteTodo: (_id) => {
    const url = `/todo/${_id}`;
    return api.delete(url);
  },
};

export default todoApi;
