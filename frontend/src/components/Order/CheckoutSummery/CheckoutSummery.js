import React from 'react'
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummery.module.css';


const CheckoutSummery = (props) => {
    return (
        <div className={classes.CheckoutSummery}>
            <h1>We hopre it tastes well!</h1>
            <div style={{ width: '100%', margin: 'auto' }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button
                btnType="Danger"
                clicked={props.onCheckoutCancelled}>CANCEL</Button>
            <Button
                btnType="Success"
                clicked={props.onCheckoutContinue} >CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummery
