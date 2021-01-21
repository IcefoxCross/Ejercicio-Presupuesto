import React from 'react';

import { numberWithCommas } from '../utils/format';

const Transaction = ({transaction}) => {
    const sign = transaction.type === 'expense' ? '-' : '+';
    const date = transaction.date;

    return (
        <tr>
            <td>{transaction.concept}</td>
            <td>{transaction.date}</td>
            <td className={transaction.type === 'expense' ? 'minus' : 'plus'}>{sign} ${numberWithCommas(Math.abs(transaction.amount))}</td>
        </tr>
    )
}

export default Transaction