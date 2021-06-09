import axios from 'axios';
import menus from '../menu-items';
import {toast, Zoom} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();


const headersConfig = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json'
};
const baseURL = process.env.REACT_APP_KB_PORTAL_BASE_URL;
const UNAUTHORIZED = 401;

// Add a request interceptor
axios.interceptors.request.use((config) => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user && user.accessToken) {
        const token = 'Bearer ' + user.accessToken;
        headersConfig.Authorization = token;
        config.headers = headersConfig;
    } else {
         toast.error('Oops... Your session has expired. You will be redirected to the login page!', {
            position: "top-right",
            autoClose: 2500,
            transition:Zoom,            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        })
        // window.location.href = '/auth/signin';
        sessionStorage.clear();
    }
    return config;
});

axios.interceptors.response.use(
    (response) => response,
    (error) => {

        if (error.response?.status === UNAUTHORIZED) {
            // window.location.href = '/auth/signin';
            window.location.reload(true);
            sessionStorage.clear();
        } else {
            return Promise.reject(error);
        }


    }
);

class BackendService {


    async getUserBoard() {
        return await axios.get('/api/test/user');
    }

    async getPmBoard() {
        return await axios.get('/api/test/pm');
    }

    async getAdminBoard() {
        return await axios.get('/api/test/admin');
    }

    async getPaginatedRequest(url, page, size, search) {
        const requestUrl =
            baseURL +
            url +
            '?page=' +
            page +
            '&size=' +
            size +
            '&searchParams=' +
            search;
        return await axios.get(requestUrl);
    }

    async getRequest(url) {
        const requestUrl = baseURL + url;
        return await axios.get(requestUrl);
    }

    async postRequest(url, payload) {
        const requestUrl = baseURL + url;
        return await axios.post(requestUrl, payload);
    }

    async putRequest(url, payload) {
        const requestUrl = baseURL + url;
        return await axios.put(requestUrl, payload);
    }

    validateMenu() {
        return  menus.items;
        // const USER = JSON.parse(sessionStorage.getItem('user'));
        //  if (USER !== null) {
        //      const authorities = USER?.authorities;
        //      authorities.push({
        //          "role": "dashboard"
        //      });
        //     let navigation = [];
        //      menus.items.map(menu => {
        //         if (menu?.id === 'navigation') {
        //             navigation.push(menu);
        //         } else {
        //             let mainChildMenu = menu.children[0];
        //             const subMenus = [];
        //             mainChildMenu.children.map(submenu => {
        //                 if (authorities.some(auth => auth.role === submenu?.role)) {
        //                     subMenus.push(submenu);
        //                 }
        //             });
        //             if (subMenus.length > 0) {
        //                 mainChildMenu.children = subMenus;
        //
        //                 menu.children = [mainChildMenu];
        //
        //             } else {
        //                 menu.children = [];
        //             }
        //             navigation.push(menu);
        //         }
        //     });
        //      return navigation;
        // } else {
        //       return menus.defaultMenu;
        // }
    }

    async notifySuccess (value)  {
        toast.success(value, {
            position: "top-right",
            autoClose: 2500,
            transition:Zoom,            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    async   notifyError (value) {
        toast.error(value, {
            position: "top-right",
            autoClose: 2500,
            transition:Zoom,            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    async   notifyInfo (value) {
        toast.info(value, {
            position: "top-right",
            autoClose: 2500,
            transition:Zoom,            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
}


export default new BackendService();
