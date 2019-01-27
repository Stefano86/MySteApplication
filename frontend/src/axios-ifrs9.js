import Axios from 'axios';

const instance = Axios.create({
	
	
	baseURL: process.env.REACT_APP_ENV_SERVER_URL || process.env.REACT_APP_IFRS9_CONTEXT
		  
		  
    //baseURL: 'https://react-my-burger-e43e6.firebaseio.com/'
})

export default instance;