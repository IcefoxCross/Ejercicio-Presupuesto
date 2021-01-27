import React from 'react';

import Transaction from './Transaction';

const TransactionList = ({expenses, deleteExpense}) => {
    return (
        <>
            <table className="table">
                <thead>
                    <th>Concept</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th></th>
                </thead>
                <tbody>
                    {expenses.map(transaction => (
                        <Transaction key={transaction.id} transaction={transaction} deleteExpense={deleteExpense} />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TransactionList