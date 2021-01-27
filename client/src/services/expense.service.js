import axios from 'axios';

const API_URL = "http://localhost:8080/api/expense";

const createExpense = (concept, amount, date, type, userId) => {
    return axios.post(API_URL, {concept, amount, date, type, userId});
};

const getExpenses = (userId) => {
    return axios.get(API_URL + `/${userId}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createExpense, getExpenses
};