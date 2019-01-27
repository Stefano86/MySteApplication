import React, { Component } from 'react'
import CheckoutSummery from '../../components/Order/CheckoutSummery/CheckoutSummery';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';

class Checkout extends Component {

    state = {
        ingredients : {
            salad: 1,
            meat: 1,
            cheese: 1,
            bacon: 1
        },
        totalPrice: 0

    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0
        }
        let price = 0;
        for( let param of query.entries()) {
            if(param[0] === 'price' ){
                price = param[1]
            } else{
                ingredients[param[0]] = +param[1];
            }
            
        }
        this.setState({ingredients: ingredients, totalPrice: price});

    }

    checkoutCancelledHandler = function() {
        this.props.history.goBack();
    }

    checkoutContinueHandler = function(){
        this.props.history.replace('/checkout/contact-data');

    }


    render() {
        return (
            <div>
                <CheckoutSummery ingredients={this.props.ings}
                onCheckoutCancelled={this.checkoutCancelledHandler.bind(this)}
                onCheckoutContinue={this.checkoutContinueHandler.bind(this)}/>
                <Route path={this.props.match.path + '/contact-data' } 
                component ={ContactData} />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout)