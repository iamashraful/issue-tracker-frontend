import EventEmitter from "events";
import dispatcher from "../dispatcher";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Logout from "../components/Logout";
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
            {
                id: 31,
                text: 'Logout',
                url: '/logout',
                component: Logout,
                auth: true
            },
        ];
        // Token -- Accessing from local storage
        this.token = localStorage.getItem('token') || "";

        // Headers
        this.headers = {
            'Content-Type': 'application/json'
        };
        if(this.token !== "") {
            this.headers.Authorization = "Token " + this.token;
        }
        // Authentication data
        this.isAuthentication = this.token !== "";
    }

    setToken(token) {
        this.token = token;
        // Set token to local storage
        localStorage.setItem('token', String(token));
        // Change the authentication value
        this.isAuthentication = true;
        if (this.token !== '') {
            this.headers.Authorization = 'Token ' + this.token;
        }
        // Response to components for store change
        this.emit("change");
    }

    destroyToken() {
        this.token = '';
        // Set local storage token empty
        localStorage.setItem('token', '');
        this.isAuthentication = false;
        // Trick to delete Authorization when no need
        delete this.headers.Authorization;
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