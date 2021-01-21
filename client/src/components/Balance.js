import React from 'react';

import TransactionList from './TransactionList';

const Balance = ({expenses}) => {

    const amounts = expenses.map(transaction => {
        if (transaction.type === "expense") {
            return transaction.amount * -1;
        } else {
            return transaction.amount;
        }
    });
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
        <div className="container">
            <header className="jumbotron text-center">
                <h2>Total Balance: <span className={total < 0 ? 'minus' : 'plus'}>${total}</span></h2>
            </header>
                        
            <TransactionList expenses={expenses} />
        </div>
    )
}

export default Balance