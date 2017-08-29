import EventEmitter from "events";
import dispatcher from "../dispatcher";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Home from "../components/Home";

class BasicStore extends EventEmitter {
    constructor() {
        super();

        this.apiUrl = 'https://tester-ash.herokuapp.com/';
        this.navItems = [
            {
                id: 10,
                text: 'Home',
                url: '/',
                component: Home
            },
            {
                id: 20,
                text: 'Dashboard',
                url: '/dashboard',
                component: Dashboard
            },
            {
                id: 30,
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