import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';
import ExpenseService from '../services/expense.service';

import Balance from './Balance';

const Home = () => {
    const [content, setContent] = useState(undefined);
    const [expenses, setExpenses] = useState([]);
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        if (user) {
            ExpenseService.getExpenses(user.id).then((response) => {
                setExpenses(response.data);
            }, (error) => {
                const _content = (error.response && error.response.data) || error.message || error.toString();
                setContent(_content);
            });
        } else {
            UserService.getPublicContent().then((response) => {
                setContent(response.data);
            }, (error) => {
                const _content = (error.response && error.response.data) || error.message || error.toString();
                setContent(_content);
            });
        }
    }, []);

    if (user) {
        return (
            <div className="container">
                <Balance username={user.username} expenses={expenses} />
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
}

export default Home