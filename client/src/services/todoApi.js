import api from "./axiosInstances.js";

const todoApi = {
  getAll: (limit = 10, page = 1) => {
    const url = `/todo?limit=${limit}&page=${page}`;
    return api.get(url);
  },
  createTodo: (data) => {
    const url = "/todo/";
    return api.post(url, data);
  },
  updateTodo: (_id) => {
    const url = `/todo/${_id}`;
    return api.put(url);
  },
};

export default todoApi;
