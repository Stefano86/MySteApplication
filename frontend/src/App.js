import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import Homepage  from './components/Homepage/Homepage';
import LoginPage from './containers/LoginPage/LoginPage'
class App extends Component {



  render() {
	    
//    console.log(process.env.NODE_ENV);
//    console.log(process.env);
//    console.log(process.env.REACT_APP_DEV_API_URL);
    
    return (
      <div>
        <Layout>
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute path="/" component={BurgerBuilder} />
{/* 
             <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} /> 
             <Route path="" component={BurgerBuilder} />  */}
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
