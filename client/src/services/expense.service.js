import axios from 'axios';

const API_URL = "http://localhost:8080/api/expense";

const createExpense = (concept, amount, date, type, userId) => {
    return axios.post(API_URL, {concept, amount, date, type, userId});
};

const getExpenses = (userId) => {
    return axios.get(API_URL + `s/${userId}`);
};

const getExpense = (id) => {
    return axios.get(API_URL + `/${id}`);
};

const updateExpense = (id, concept, amount, date) => {
    return axios.put(API_URL + `/${id}`, {concept, amount, date});
};

const deleteExpense = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createExpense, getExpenses, getExpense, updateExpense, deleteExpense
};