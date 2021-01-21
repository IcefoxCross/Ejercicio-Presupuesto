import React, { useState, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import DatePicker from 'react-date-picker';

import ExpenseService from '../services/expense.service';
import AuthService from '../services/auth.service';

const required = value => {
    if (!value) {
        return(
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const validAmount = (value) => {
    if (value <= 0) {
        return (
            <div className="alert alert-danger" role="alert">
                THe amount must be biggen than 0.
            </div>
        )
    }
}

const AddTransaction = () => {
    const [concept, setConcept] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(undefined);
    const [type, setType] = useState('Expense');
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState('');

    const form = useRef();
    const checkBtn = useRef();

    const onChangeConcept = (e) => {
        setConcept(e.target.value);
    };

    const onChangeAmount = (e) => {
        setAmount(e.target.value);
    };

    const onChangeType = (e) => {
        setType(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage('');
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            const user = AuthService.getCurrentUser();
            ExpenseService.createExpense(concept, amount, date, type, user.id).then( (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message)
                    || error.message || error.toString();
                setSuccessful(false);
                setMessage(resMessage);
            })
        }
    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <Form onSubmit={handleSubmit} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="concept">Concept</label>
                                <Input type="text" className="form-control" name="concept"
                                    value={concept} onChange={onChangeConcept} validations={[required]} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <Input type="number" className="form-control" name="amount"
                                    value={amount} onChange={onChangeAmount} validations={[required, validAmount]} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">Password</label>
                                <DatePicker value={date} onChange={setDate} validations={[required]} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="type">Operation Type</label>
                                <select className="form-control" value={type} onChange={onChangeType}>
                                    <option value="Expense">Expense</option>
                                    <option value="Income">Income</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Add Transaction</button>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={successful ? 'alert alert-success' : 'alert alert-danger'}
                                role="alert">
                                    {message}
                            </div>
                        </div>
                    )}
                    <CheckButton style={{display: "none"}} ref={checkBtn} />
                </Form>
            </div>
        </div>
    )
};

export default AddTransaction;