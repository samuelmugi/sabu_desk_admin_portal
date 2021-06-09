import React, {Component} from 'react';
import {Dropdown} from 'react-bootstrap';

import ChatList from './ChatList';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar1 from '../../../../../assets/images/user/avatar-1.jpg';
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import Avatar3 from '../../../../../assets/images/user/avatar-3.jpg';

class NavRight extends Component {
    state = {
        listOpen: false
    };


    logout(e) {
        e.preventDefault();
        window.location.href = '/auth/signin';
        sessionStorage.clear();

    }

    render() {
        const user = JSON.parse(sessionStorage.getItem('user'));

        return (
            <Aux>
                <ul className="navbar-nav ml-auto">

                    <li>
                        <Dropdown alignRight={!this.props.rtlLayout} className="drp-user">
                            <Dropdown.Toggle variant={'link'} id="dropdown-basic">
                                <i className="icon feather icon-log-out"/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu alignRight className="profile-notification">
                                <div >
                                     <span>{user?.firstName.toUpperCase()}</span>
                                    <br/>
                                    <a href={DEMO.LOGOUT_LINK} className="dud-logout"
                                       onClick={e =>
                                           this.logout(e)
                                       }
                                       title="Logout">
                                        <i className="feather icon-log-out"/>Logout
                                    </a>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <ChatList listOpen={this.state.listOpen} closed={() => {
                    this.setState({listOpen: false});
                }}/>
            </Aux>
        );
    }
}

export default NavRight;
