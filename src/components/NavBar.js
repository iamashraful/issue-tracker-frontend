import React, {Component} from 'react';
import BasicStore from '../stores/basic-store';
import {
    HashRouter,
    Route,
    NavLink,
    Switch
} from 'react-router-dom';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const navItems = BasicStore.navItems;
        return (
            <HashRouter>
                <div>
                    <div className="nav-content">
                        <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse fixed-top">
                            <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                                    data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault"
                                    aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <a className="navbar-brand" href="/">My Project</a>
                            <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                                <ul className="navbar-nav ml-auto">
                                    {navItems.map(item =>
                                        <li className="nav-item" key={item.id}>
                                            {/* map require unique key. So, I just put. Nothing special */}
                                            <NavLink className="nav-link" activeClassName="active" to={item.url}>
                                                {item.text}
                                            </NavLink>
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </nav>
                    </div>

                    {/* Defining Route */}
                    <Switch>
                        {
                            navItems.map(item =>
                                <Route exact path={item.url} component={item.component} key={item.id}/>
                            )
                        }
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default NavBar;