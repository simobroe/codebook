import React from "react";
import { logout } from "../../index"
import { database } from "../../database/database";

class ChatNavigation extends React.Component {

    logout() {
        database.auth().signOut();
    }

    render() {
        return (
            <div id="ChatNavigation" className="hideMobile">
                <div>
                    <div id="chatHeadContainer">

                    </div>
                    <div id="logout">
                        <button onClick={this.logout}>
                            <i className="fa fa-power-off"></i>
                            Sign out
                        </button>
                    </div>               
                </div>
            </div>
        );
    }
}

// export into layout
export default ChatNavigation;