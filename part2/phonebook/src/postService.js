import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => axios.get(baseUrl).then(response => response.data);

const create = newPerson =>
  axios.post(baseUrl, newPerson)
    .then(response => response.data)
    .catch(error => {
      console.error("API error:", error);
      return Promise.reject(error);
    });

const update = (id, updatedPerson) =>
  axios.put(`${baseUrl}/${id}`, updatedPerson).then(response => response.data);

const remove = id =>
  axios.delete(`${baseUrl}/${id}`).then(response => response.data);

export default { getAll, create, update, remove };
