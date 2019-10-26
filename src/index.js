import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import React from 'react';
import { render } from 'react-dom';

import MemeFlow from 'src/components/meme/MemeFlow'
import Profile from "src/components/profile/Profile";
import Favorites from "src/components/favorites/Favorites";
import Create from "src/components/create/Create";

const NotFound = () => {
    return <div>404 NotFound :(</div>;
};

const App = () => (
    <Router>
        <Switch>
            <Route exact path="/" component={NotFound}/>
            <Route exact path="/learn" component={MemeFlow}/>
            <Route exact path="/create" component={Create}/>
            <Route exact path="/profile" component={Profile}/>
            <Route exact path="/favorites" component={Favorites}/>
            <Route component={NotFound}/>
        </Switch>
    </Router>
);

render(<App/>, document.getElementById('app'));
