import React from "react";

class Notifications extends React.Component {
    render() {
        return (
            <div>
                <div id="notificationsBG" onClick={this.props.hideNotifications.bind(this)}>
                
                </div>
                <div id="notifications" className="mid col-xl-4 col-la-4 col-md-6 col-sm-10 col-xs-10">
                    <h1>Notifications <span onClick={this.props.hideNotifications.bind(this)} className="fa fa-times"></span></h1>
                </div>
            </div>
        );
    }
}

export default Notifications;