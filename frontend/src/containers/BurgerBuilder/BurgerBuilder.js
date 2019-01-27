import React, { Component, Fragment } from 'react';
import {connect} from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummery/OrderSummery'
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from './../../hoc/withErrorHandler/withErrorHandler';
import Axios from '../../axios-order';
import * as actionTypes from '../../store/actions'
import { Route, Switch } from 'react-router-dom';
import Orders from './../Orders/Orders';




class BurgerBuilder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            purchasing: false,
            loading: false,
            error: false
        }

    }

    componentDidMount() {
         Axios.get('/ingredients.json')
            .then(response => {

                this.setState({ ingredients: response.data })
            }).catch(error => {
                this.setState({ error: true })

            }) 

            /*Axios.get('/test')
            .then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
                this.setState({ error: true })
            })*/
    }
    
    updatePurchaseState(ingredients) {
        console.log('in updatePurchaseState')
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            });
            return sum > 0;


    }


    purchaseHandler() {
        this.setState({ purchasing: true })
    }


    purchaseCancelHandler() {
        this.setState({ purchasing: false })
    }

    purchaseContineHandler() {
        this.props.history.push('/checkout');

    }
    render() {
        console.log("BurgerBuilder insiede render")
        const disabledInfo = {
            ...this.props.ings
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummery = null;





        let burger = this.state.error ? <p>Error loading ingredients</p> : <Spinner />

        if (this.props.ings) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ings}></Burger>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchaeable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler.bind(this)}
                    />
                </Fragment>);

            orderSummery = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCanceled={this.purchaseCancelHandler.bind(this)}
                    purchaseContinue={this.purchaseContineHandler.bind(this)} />
            );
        }
        if (this.state.loading) {
            orderSummery = <Spinner />

        }





        console.log(this.state.purchasing)

        return (
            
            <Fragment>
                <Route path="/orders" component={Orders} /> 
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler.bind(this)}>
                    {orderSummery}
                </Modal>
                {burger}
            </Fragment>
        );


    }
}

const mapStateToProps = state => {
    console.log("mapStateToPropss")
    console.log(state);

    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    console.log("inside mapDispatchToProps")
    return {
        onIngredientAdded:  (ingName) => dispatch ({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
        onIngredientRemoved:  (ingName) => dispatch ({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));
