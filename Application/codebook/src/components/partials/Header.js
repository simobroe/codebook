import React from "react";
import { Link } from "react-router";
import Notifications from "./Notifications";
import { database } from "../../database/database";

class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            navigatie: [
                {
                    name: "overview",
                    link: "overview",
                    icon: "fa fa-file-text"
                },
                {
                    name: "profile",
                    link: "profile",
                    icon: "fa fa-user"
                },
                {
                    name: "messages",
                    link: "messages",
                    icon: "fa fa-comments"
                },
            ],
            notifications: {
                name: "notifications",
                link: "notifications",
                icon: "fa fa-bell"
            },
            showNotifications: false
        }
    }

    logout() {
        database.auth().signOut();
    }

    toggleNav() {
        document.getElementById("navDropdown").classList.toggle("hidden");
    }
    
    showNotifications(e) {
        e.preventDefault();
        this.setState({
            showNotifications: true
        });
    }
    
    hideNotifications(e) {
        e.preventDefault();
        this.setState({
            showNotifications: false
        });
    }

    render() {
        return (
            <div>
                <div className="wrapper" id="header">
                    <div className="container">
                        <div className="col col-xl-12 col-la-12 col-md-12 col-sm-12 col-xs-12">
                            <div id="branding" className="col col-xl-3 col-la-4 col-md-2 col-sm-2 col-xs-2">
                                <Link to="/">
                                    <img src="images/Codebook_logo.svg" alt="Codebook" />
                                </Link>
                                <Link className="hideMobile" to="/">
                                    <h1>Codebook</h1>
                                </Link>
                            </div>
                            <ul className="hideMobile col col-xl-6 col-la-4">
                                { this.state.navigatie.map(function(item) {
                                    return <li><Link to={ item.link } className={ item.icon }></Link></li>
                                })}
                                <li><a href="#" onClick={this.showNotifications.bind(this)} className={ this.state.notifications.icon }></a></li>
                            </ul>
                            <form className="col col-xl-3 col-la-4 col-md-7 col-sm-7 col-xs-7">
                                <div id="searchbar">
                                    <label className="fa fa-search">
                                        <input type="text" name="searchQuery" placeholder="Search..."/>
                                    </label>
                                </div>
                            </form>
                            <div id="mobileNotification" className="hideDesktop col col-md-3 col-sm-3 col-xs-3">
                                <a href="#" onClick={this.toggleNav} className="fa fa-ellipsis-v"></a>
                                <a href="#" onClick={this.showNotifications.bind(this)} className={ this.state.notifications.icon }></a>
                            </div>
                        </div>
                    </div>
                </div>
                {this.state.showNotifications && <Notifications hideNotifications={this.hideNotifications.bind(this)} />}
                <div id="mobileNavigation" className="hideDesktop">
                    { this.state.navigatie.map(function(item) {
                        return <Link to={ item.link } className={ item.icon }></Link>
                    })}
                </div>
                <ul id="navDropdown" className="hidden">
                    <li onClick={this.logout}>Logout</li>
                </ul>
            </div>
        );
    }
}

// export into layout
export default Header;