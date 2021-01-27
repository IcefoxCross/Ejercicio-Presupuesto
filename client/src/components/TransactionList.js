import React from 'react';

import Transaction from './Transaction';

const TransactionList = ({expenses}) => {
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
                        <Transaction key={transaction.id} transaction={transaction} />
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TransactionList