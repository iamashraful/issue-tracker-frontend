import EventEmitter from "events";
import dispatcher from "../dispatcher";
import Home from "../components/Home";

class BasicStore extends EventEmitter {
    constructor() {
        super();
        this.navItems = [
            {
                id: 1,
                text: 'Home',
                url: '#home',
                component: Home
            }
        ]
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