import Axios from 'axios';

const instance = Axios.create({
	
	
	//baseURL: process.env.REACT_APP_SERVER_URL
		  
		  
    baseURL: 'https://react-my-burger-e43e6.firebaseio.com/'
})

export default instance;