import axios from 'axios';
import authHeader from './auth-header';

const API_URL = "http://localhost:8080/api/expense";

const createExpense = (concept, amount, date, type, userId) => {
    return axios.post(API_URL, {concept, amount, date, type, userId});
};

const getExpenses = () => {
    return axios.get(API_URL, {headers: authHeader()});
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    createExpense, getExpenses
};