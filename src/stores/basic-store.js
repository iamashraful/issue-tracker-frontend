import EventEmitter from "events";
import dispatcher from "../dispatcher";
import Dashboard from "../components/Dashboard";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Home from "../components/Home";
import UserRegistration from "../components/UserRegistration";
import Settings from "../components/Settings";
import ProjectsList from "../components/ProjectsList";
import IssuesList from "../components/IssuesList";

class BasicStore extends EventEmitter {
    constructor() {
        super();

        // Change the url when API server is changed.
        this.apiUrl = 'http://localhost:8000/';
        // All the urls paths
        this.urlPaths = {
            home: '/',
            dashboard: '/dashboard',
            projects: '/projects',
            settings: '/settings',
            register: '/register',
            login: '/login',
            logout: '/logout',
            notFound: '/404',
            issues: '/issues',
            create: '/create',
            edit: '/edit',
        };

        // API Response data
        this.projects = [];
        this.profiles = [];

        // Enum like object (Similar to backend Enum)
        this.issueStatusEnum = {
            newIssue: 0,
            inProgress: 1,
            onHold: 2,
            awaitingQA: 3,
            qaVerified: 4,
            // Reverse way access
            0: "New",
            1: "In Progress",
            2: "On Hold",
            3: "Awaiting WA",
            4: "QA Verified"
        };

        this.issueTrackerEnum = {
            bug: 0,
            feature: 1,
            support: 2,
            // Reverse way access
            0: "Bug",
            1: "Feature",
            2: "Support"
        };

        this.issuePriorityEnum = {
            low: 0,
            normal: 1,
            high: 2,
            urgent: 3,
            // Reverse way access
            0: "Low",
            1: "Normal",
            2: "High",
            3: "Urgent"
        };

        this.navItems = [
            {
                id: 10,
                text: 'Home',
                url: this.urlPaths.home,
                component: Home,
                auth: false
            },
            {
                id: 15,
                text: 'Projects',
                url: this.urlPaths.projects,
                component: ProjectsList,
                auth: true
            },
            {
                id: 17,
                text: 'Issues',
                url: this.urlPaths.issues,
                component: IssuesList,
                auth: true
            },
            {
                id: 20,
                text: 'Dashboard',
                url: this.urlPaths.dashboard,
                component: Dashboard,
                auth: true
            },
            {
                id: 25,
                text: 'Settings',
                url: this.urlPaths.settings,
                component: Settings,
                auth: true
            },
            {
                id: 29,
                text: 'Register',
                url: this.urlPaths.register,
                component: UserRegistration,
                auth: false
            },
            {
                id: 30,
                text: 'Login',
                url: this.urlPaths.login,
                component: Login,
                auth: false
            },
            {
                id: 31,
                text: 'Logout',
                url: this.urlPaths.logout,
                component: Logout,
                auth: true
            },
        ];
        // Token -- Accessing from local storage
        this.token = localStorage.getItem('token') || '';
        this.userRole = localStorage.getItem('role') || '';

        // Declaring all urls
        this.allUrls = [];

        // Headers
        this.headers = {
            'Content-Type': 'application/json'
        };
        if (this.token !== "") {
            this.headers.Authorization = "Token " + this.token;
        }
        // Authentication data
        this.isAuthentication = this.token !== "";
    }

    setProjects(projectList) {
        this.projects = projectList;
    }

    fetchProjects() {
        const url = this.makeUrl('api/v1/pms/projects/');
        const payload = {
            method: 'GET',
            headers: this.headers
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            this.projects = data.results;
        }).catch((err) => {
            console.log(err);
        });
    }

    fetchProfiles() {
        const url = this.makeUrl('api/v1/core/profiles/');
        const payload = {
            method: 'GET',
            headers: this.headers
        };
        fetch(url, payload).then((response) => {
            return response.json();
        }).then((data) => {
            this.profiles = data.results;
        }).catch((err) => {
            console.log(err);
        });
    }

    makeUrl(path) {
        return this.apiUrl + path;
    }

    setToken(token, role) {
        this.token = token;
        this.userRole = role;
        // Set token to local storage
        localStorage.setItem('token', String(token));
        // Set role to local storage
        localStorage.setItem('role', String(role));
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
        this.userRole = '';
        // Set local storage token empty
        localStorage.setItem('token', '');
        // Set local storage role empty
        localStorage.setItem('role', '');
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
basicStore.setMaxListeners(100);
dispatcher.register(basicStore.handleActions.bind(basicStore));
export default basicStore;