import React from 'react';
import { Link } from 'react-router-dom';

import { numberWithCommas } from '../utils/format';

const Transaction = ({transaction, deleteExpense}) => {
    const sign = transaction.type === 'Expense' ? '-' : '+';
    const date = transaction.date.split("T")[0];

    return (
        <tr>
            <td>{transaction.concept}</td>
            <td>{date}</td>
            <td className={transaction.type === 'Expense' ? 'minus' : 'plus'}>{sign} ${numberWithCommas(Math.abs(transaction.amount))}</td>
            <td>
                <Link to={`/edit/${transaction.id}`}><button className="btn btn-success mr-2"><i className="fa fa-pencil"></i> Edit</button></Link>
                <button className="btn btn-danger" onClick={() => deleteExpense(transaction.id)}><i className="fa fa-trash"></i> Delete</button>
            </td>
        </tr>
    )
}

export default Transaction