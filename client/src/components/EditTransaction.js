import React, { useState, useEffect, useRef } from 'react';
import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import CheckButton from 'react-validation/build/button';
import DatePicker from 'react-date-picker';

import ExpenseService from '../services/expense.service';

const required = value => {
    if (!value) {
        return(
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        )
    }
}

const validConcept = (value) => {
    if (value.length < 1 || value.length > 20) {
        return (
            <div className="alert alert-danger" role="alert">
                The concept must be between 1 and 20 characters.
            </div>
        )
    }
}

const validAmount = (value) => {
    if (value <= 0) {
        return (
            <div className="alert alert-danger" role="alert">
                The amount must be bigger than 0.
            </div>
        )
    }
}

const EditTransaction = (props) => {
    const [concept, setConcept] = useState('');
    const [amount, setAmount] = useState(0);
    const [date, setDate] = useState(new Date());
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

    const handleSubmit = (e) => {
        e.preventDefault();

        setMessage('');
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            ExpenseService.updateExpense(props.match.params.id, concept, amount, date).then( (response) => {
                setMessage(response.data.message);
                setSuccessful(true);
                props.history.goBack();
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message)
                    || error.message || error.toString();
                setSuccessful(false);
                setMessage(resMessage);
            })
        }
    };

    useEffect(() => {
        ExpenseService.getExpense(props.match.params.id)
            .then( (response) => {
                const expense = response.data;
                setConcept(expense.concept);
                setAmount(expense.amount);
                setDate(new Date(expense.date));
            }, (error) => {
                const resMessage = (error.response && error.response.data && error.response.data.message)
                    || error.message || error.toString();
                setSuccessful(false);
                setMessage(resMessage);
            })
    }, [])

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <Form onSubmit={handleSubmit} ref={form}>
                    {!successful && (
                        <div>
                            <div className="form-group">
                                <label htmlFor="concept">Concept</label>
                                <Input type="text" className="form-control" name="concept"
                                    value={concept} onChange={onChangeConcept} validations={[required, validConcept]} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="amount">Amount</label>
                                <Input type="number" className="form-control" name="amount"
                                    value={amount} onChange={onChangeAmount} validations={[required, validAmount]} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="date">Date</label>
                                <DatePicker value={date} onChange={setDate} required={true} />
                            </div>

                            <div className="form-group">
                                <button className="btn btn-primary btn-block">Update Transaction</button>
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

export default EditTransaction;