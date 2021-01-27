import React from 'react';

import { numberWithCommas } from '../utils/format';

const Transaction = ({transaction}) => {
    const sign = transaction.type === 'Expense' ? '-' : '+';
    const date = transaction.date.split("T")[0];

    return (
        <tr>
            <td>{transaction.concept}</td>
            <td>{date}</td>
            <td className={transaction.type === 'Expense' ? 'minus' : 'plus'}>{sign} ${numberWithCommas(Math.abs(transaction.amount))}</td>
        </tr>
    )
}

export default Transaction