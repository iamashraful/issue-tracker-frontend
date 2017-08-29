import EventEmitter from "events";
import dispatcher from "../dispatcher";
import Home from "../components/Home";
import Login from "../components/Login";

class BasicStore extends EventEmitter {
    constructor() {
        super();

        this.apiUrl = 'https://tester-ash.herokuapp.com/';
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
        };
        // Temporary Data
        this.tempData = undefined;
    }

    setToken(token) {
        this.token = token;
    }

    getToken() {
        return this.token;
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