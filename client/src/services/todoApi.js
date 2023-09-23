import api from "./axiosInstances.js";

const todoApi = {
  getAll: (limit = 10, page = 1) => {
    const url = `/todo?limit=${limit}&page=${page}`;
    return api.get(url);
  },
  createTodo: (NewTask) => {
    const url = "/todo/";
    return api.post(url, NewTask);
  },
  updateTodo: (_id) => {
    const url = `/todo/${_id}`;
    return api.put(url);
  },
};

export default todoApi;
