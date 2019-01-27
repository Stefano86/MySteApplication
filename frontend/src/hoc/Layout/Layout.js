import React, {Component,Fragment} from 'react';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import SideBar from '../../components/Navigation/SideBar/SideBar';


class Layout extends Component {

    state = {
        showSideDrawer: false
    }

    SideDrawerClosedHandler = function() {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = function() {
        this.setState((prevState) => {
            return {showSideDrawer: !prevState.showSideDrawer};
        } );
            
    }

    render () {
        return (
            <Fragment>
                <Toolbar drawerToggleClicked={this.sideDrawerToggleHandler.bind(this)}/>
                <SideBar></SideBar>
                <SideDrawer 
                    open={this.state.showSideDrawer} 
                    closed={this.SideDrawerClosedHandler.bind(this)}>
                </SideDrawer>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Fragment>
        )


    }

}




export default Layout;