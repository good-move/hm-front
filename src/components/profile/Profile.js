import React from 'react';

import AppBar from 'src/components/common/AppBar';
import BottomTabBar from 'src/components/common/BottomTabBar';


class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            route: null
        };

        this.switchRoute = this.switchRoute.bind(this)
    }

    switchRoute(route) {
        this.props.history.push('/' + route)
    };

    render() {

        return (
            <div>
                <AppBar title={'Profile'}/>
                <BottomTabBar value={'profile'} onTabChange={this.switchRoute}/>
            </div>
        );

    }

}

export default Profile;