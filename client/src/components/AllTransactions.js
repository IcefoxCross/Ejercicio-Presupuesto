import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AuthService from '../services/auth.service';
import ExpenseService from '../services/expense.service';
import TransactionList from './TransactionList';

const AllTransactions = () => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [content, setContent] = useState(undefined);

    const user = AuthService.getCurrentUser();

    const deleteExpense = (id) => {
        if (window.confirm(`Delete Transaction?`)) {
            ExpenseService.deleteExpense(id).then(res => {
              setExpenses(expenses.filter(e => e.id !== id));
              setIncomes(incomes.filter(i => i.id !== id));
            });
        }
    };

    useEffect(() => {
        if (user) {
            ExpenseService.getExpenses(user.id).then((response) => {
                const sorted_expenses = response.data.sort((a,b) => b - a);
                setExpenses(sorted_expenses.filter(e => e.type === 'Expense'));
                setIncomes(sorted_expenses.filter(e => e.type === 'Income'));
            }, (error) => {
                const _content = (error.response && error.response.data) || error.message || error.toString();
                setContent(_content);
            });
        }
    }, []);

    if (user) {
        return (
            <div className="container">
                <div className="row justify-content-center">
                        <Link to={'/new'}><button className="btn btn-info">Add Transaction</button></Link>
                </div>
                <div className="d-flex flex-row justify-content-around mt-3">
                    <div className="p-3">
                        <h3 className="text-center">Incomes</h3>
                        <TransactionList expenses={incomes} deleteExpense={deleteExpense} />
                    </div>
                    <div className="p-3">
                    <h3 className="text-center">Expenses</h3>
                        <TransactionList expenses={expenses} deleteExpense={deleteExpense} />
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>{content}</h3>
                </header>
            </div>
        )
    }
};

export default AllTransactions;