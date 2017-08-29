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
                component: Home,
                auth: false
            },
            {
                id: 20,
                text: 'Dashboard',
                url: '/dashboard',
                component: Dashboard,
                auth: true
            },
            {
                id: 30,
                text: 'Login',
                url: '/login',
                component: Login,
                auth: false
            },
        ];
        // Token
        this.token = '';
        // Headers
        this.headers = {
            'Content-Type': 'application/json'
        };
        // Authentication data
        this.isAuthentication = false;
        // Temporary Data
        this.tempData = undefined;
    }

    setToken(token) {
        this.token = token;
        // Change the authentication value
        this.isAuthentication = true;
        // Response to components for store change
        this.emit("change");
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