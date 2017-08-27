import EventEmitter from "events";
import dispatcher from "../dispatcher";
import Home from "../components/Home";
import Login from "../components/Login";

import 'whatwg-fetch';

class BasicStore extends EventEmitter {
    constructor() {
        super();
        this.navItems = [
            {
                id: 1,
                text: 'Home',
                url: '/home',
                component: Home
            },
            {
                id: 2,
                text: 'Login',
                url: '/login',
                component: Login
            },
        ];
        // Token
        this.token = '';
        // Headers
        this.headers = {
            'Content-Type': 'application/json'
        }
    }

    setToken(tok) {
        this.token = tok;
    }

    getToken() {
        return this.token;
    }

    callApi(url, method, body) {
        /**
         * @param url: Actually this is api endpoint. Example: https://iashraful.me/api/v1/some-api/
         * This method has used fetch from (https://github.com/github/fetch)
         * fetch returns promise. This library helps to get json from promise.
         */
        let bodyData = undefined;
        let meta = {headers: this.headers};

        if (method) {
            meta.method = method;
            // Simply no reason for body when it is GET method.
            bodyData = method.toLowerCase() !== 'get' ? body : undefined;
        }
        if (bodyData) {
            // Only body is added when it is not GET method
            meta.body = JSON.stringify(bodyData);
        }
        // fetch gonna use here...
        let result = fetch(
            /**
             * First param -> url
             * Second param -> an object for headers, method, body, etc....
             */
            url, meta
        );

        result.then((response) => {
            /* Fetch will return promise here. */
            return response.json();
            /* From here it's returning the JSON of response data */
        }).catch((exp) => {
            /* If any errors occur. It will passed to action */
            console.error(exp);
        })
    }

    handleActions(action) {
        switch (action.type) {
            case "CREATE":
                console.log("Create Action");
                break;
            case "UPDATE":
                console.log("UPDATE Action");
                break;
            case "DELETE":
                console.log("DELETE Action");
                break;
            default:
                console.log('No specified action');
        }
    }
}

const basicStore = new BasicStore();
dispatcher.register(basicStore.handleActions.bind(basicStore));
export default basicStore;