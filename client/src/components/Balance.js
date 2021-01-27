import React from 'react';
import { Link } from 'react-router-dom';

import TransactionList from './TransactionList';

const Balance = ({username, expenses, deleteExpense}) => {

    const amounts = expenses.map(transaction => {
        if (transaction.type === "Expense") {
            return transaction.amount * -1;
        } else {
            return transaction.amount;
        }
    });
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
        <div className="container">
            <header className="jumbotron text-center">
                <h3>{username}</h3>
                <h2>Total Balance: <span className={total < 0 ? 'minus' : 'plus'}>${total}</span></h2>
                <Link to={'/new'}><button className="btn btn-info btn-block">Add Transaction</button></Link>
            </header>
            <TransactionList expenses={expenses} deleteExpense={deleteExpense} />
        </div>
    )
}

export default Balance