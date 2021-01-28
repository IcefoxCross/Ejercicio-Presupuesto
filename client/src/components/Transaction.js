import React from 'react';
import { Link } from 'react-router-dom';

import { numberWithCommas } from '../utils/format';

const Transaction = ({transaction, deleteExpense}) => {
    const sign = transaction.type === 'Expense' ? '-' : '+';
    const date = transaction.date.split("T")[0];

    return (
        <tr>
            <td className="align-middle">{transaction.concept}</td>
            <td className="align-middle">{date}</td>
            <td className={transaction.type === 'Expense' ? 'minus align-middle' : 'plus align-middle'}>{sign} ${numberWithCommas(Math.abs(transaction.amount))}</td>
            <td>
                <div className="d-flex flex-row">
                    <Link to={`/edit/${transaction.id}`}><button className="btn btn-success mr-2"><i className="fa fa-pencil"></i></button></Link>
                    <button className="btn btn-danger" onClick={() => deleteExpense(transaction.id)}><i className="fa fa-trash"></i></button>
                </div>
            </td>
        </tr>
    )
}

export default Transaction