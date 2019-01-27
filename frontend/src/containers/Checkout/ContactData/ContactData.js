import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Axios from '../../../axios-order';
import Spinner from './../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/input'
import {connect} from 'react-redux';

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:  'Your Name'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:  'Street'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:  'ZIP CODE'
                },
                value:'',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5,
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder:  'Country'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder:  'Your E-Mail'
                },
                value:'',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [ 
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                ]
                },
                value:'',
                validation: {},
                valid: true,
            },
        },
        formIsValid: false,
        loading: false
    }
    
    orderHandler = function(event){
        event.preventDefault()

         this.setState({ loading: true });
        
        const formData = {}

        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
        }


        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
        }
        Axios.post('/orders.json', order).then(response => {
            console.log(response)
            this.setState({ loading: false })
            this.props.history.push('/');
        }).catch(error => {
            console.log(error);
            this.setState({ loading: false })
        }) 
    }

    checkValidity(value, rules){
        let isValid = true;

        if(!rules){
            return true;
        }

        if ( rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if ( rules.minLength) {

            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid
    }

    inputChangedHandler = ( inputIdentifier, event) => {

        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }        
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;

        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
        }

        this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
    }

  render() {
    const formElementsArray = [];

    for(let key in this.state.orderForm){
        formElementsArray.push({
            id:key,
            config: this.state.orderForm[key]
        })
    }

    let form = (
        <form>
            {formElementsArray.map(formElement => (
                <Input 
                key={formElement.id}
                elementType={formElement.config.elementType} 
                elementConfig={formElement.config.elementConfig} 
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                changed={this.inputChangedHandler.bind(this,formElement.id)}
                />
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler.bind(this)}>ORDER</Button>
        </form>
    );
    if (this.state.loading){
        form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
          <h4>Enter your Contact Data</h4>
            {form}
          
      </div>
    )
  }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps) (ContactData)