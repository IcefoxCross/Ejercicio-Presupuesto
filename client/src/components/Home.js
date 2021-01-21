import React, { useState, useEffect } from 'react';
import UserService from '../services/user.service';
import AuthService from '../services/auth.service';

import Balance from './Balance';

const Home = ({currentUser}) => {
    const [content, setContent] = useState(undefined);
    const user = AuthService.getCurrentUser();

    useEffect(() => {
        if (user) {
            UserService.getUserBoard().then((response) => {
                setContent(response.data);
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
                <Balance expenses={user.expenses} />
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