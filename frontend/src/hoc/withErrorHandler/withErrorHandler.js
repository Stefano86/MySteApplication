import React, { Component,Fragment} from 'react'
import Modal from '../../components/UI/Modal/Modal';


const withErrorHandler = (WrappedComponent, axios) => {

  return class extends Component {

    state = {
        error: null
    }
    componentWillMount () {
        this.reqIntercepor = axios.interceptors.request.use(req => {
            this.setState({error: null});
            return req;
        })
        this.resIntercepor = axios.interceptors.response.use( res=> res, error => {
            this.setState({error: error})
        });
    }

    componentWillUnmount () {
        axios.interceptors.request.eject(this.reqIntercepor)
        axios.interceptors.response.eject(this.resIntercepor)
    }

    errorConfirmHandler = function(){
        this.setState({error:null})
    }
      render () {
        return (
            <Fragment>
                <Modal show={this.state.error}
                        modalClosed={this.errorConfirmHandler.bind(this)} >
                      {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Fragment>
  
        );
      }
  }

}

export default withErrorHandler
