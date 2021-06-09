import axios from 'axios';
import {useHistory} from 'react-router-dom';

const headers = {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    Accept: 'application/json'
};

class AuthenticationService {
    signin = async (username, password) => {
        const baseURL = process.env.REACT_APP_KB_PORTAL_BASE_URL;
        const singinURL = process.env.REACT_APP_KB_PORTAL_SIGN_IN;
        const loginRequest = {username: username, password: password};
        return axios
            .post(baseURL + singinURL, loginRequest, headers)
            .then((response) => {
                if (response.data.accessToken) {
                    sessionStorage.setItem('user', JSON.stringify(response.data));
                }
                console.log(response);
                return response;
            })
            .catch((err) => {
                console.log(err);
                throw err;
            });
    };

    SignOut = () => {
        const {push} = useHistory();
        sessionStorage.clear();
        push('/auth/signin');
    };

    register = async (firstname, lastname, username, email, password) => {
        return axios.post('/api/auth/signup', {
            firstname,
            lastname,
            username,
            email,
            password
        });
    };

    getCurrentUser = () => {
        return JSON.parse(localStorage.getItem('user'));
    };
}

export default new AuthenticationService();
