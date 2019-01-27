import React, {Component, Fragment} from 'react';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component  {

    //Debug
    /*componentWillUpdate(){
        console.log('asda')
    }*/

    render (props) {

        const ingredientSummery = Object.keys(this.props.ingredients)
        .map(igKey => {
            return (
                <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span> : {this.props.ingredients[igKey]}
                 </li>
            );
        });

        return (
            <Fragment>
                <h3>Your Order</h3>
                <p>A delicious burge with the followig ingredients:</p>
                <ul>
                    {ingredientSummery}
                </ul>
                <p><strong>Total Proce: {this.props.price.toFixed(2)}</strong></p>
                <p>Continue To Checkout</p>
                <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Fragment>
        );
    }
}

export default OrderSummery
