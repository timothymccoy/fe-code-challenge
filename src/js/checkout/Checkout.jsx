import React from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import {push} from 'connected-react-router';
import { Link } from 'react-router-dom'
import Button from 'common/Button';
import formatPhone from 'utils/formatPhone';

import SpotItem from 'spot/SpotItem';

const validate = (values) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    const errors = {};
        if(!values.email || !emailRegex.test(values.email)){
            errors.email = 'Please enter a valid email';
        }
        if(!values.phoneNumber){
            errors.phoneNumber = 'Please enter a valid phone number';
        }
    return errors;
}

const completeCheckout = (values, pushTo) => {
    if(values.email){
        pushTo("/confirmation");
    }
}

const renderInput = ({input, meta, label}) => {
    return(
        <div className="field">
            <label>{label}</label>
            <input className={meta.error && meta.touched ? 'error' : ''} {...input}/>
            {meta.error && meta.touched && <p style={{color:"#ff0000",fontSize:"12px",marginTop:"10px"}}>{meta.error}</p>}
        </div>
    );
}

const myOnChange = (evt) => {
    const regex = /^[0-9\b]+$/;
    const value = evt.target.value;
    if (value === '' || regex.test(value)) {
       this.setState({ value })
    }
}

let Checkout = ({handleSubmit, submitting, selectedSpot, pushTo}) => {
    if (!selectedSpot) {
        pushTo('/');
        return null;
    }else{
        return (
                <div className="checkoutFormContainer">
                    <div className="containerHeader">
                        <Link to="/">{'< '}Back to Search</Link>
                    </div>
                    <div style={{padding:"25px 25px 0 25px"}}>
                        <SpotItem
                                    data={selectedSpot}
                                    isSelected={false}
                                    showDetails={false}
                                />
                    </div>
                    <div className="formWrapper">
                        <form className="ui form" onSubmit={handleSubmit((values)=>{completeCheckout(values, pushTo);})}>
                            <Field name="firstName" label="First Name" component={renderInput}/>
                            <Field name="lastName" label="Last Name" component={renderInput}/>
                            <Field name="email" label="Email" component={renderInput}/>
                            <Field name="phoneNumber" label="Phone Number" normalize={formatPhone}  component={renderInput}/>
                            <div style={{display:'flex',justifyContent:'flex-end',marginTop:"30px"}}>
                                <Button disabled={submitting} type="submit" className="ui positive button" style={{padding:'10px', fontSize:'14px', width:'180px'}}>
                                    {`Purchase for $${(selectedSpot.price/100).toFixed(2)}`}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
        );
    }
}; 

const mapStateToProps = state => {
    const {
        spot: {
            selected: selectedSpot
        }
    } = state;

    return {
        selectedSpot
    };
};

const mapDispatchToProps = {
    pushTo: push
};

Checkout = reduxForm({
    form: 'checkout', 
    validate,
    destroyOnUnmount: false,
    enableReinitialize: true
})(Checkout);

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
