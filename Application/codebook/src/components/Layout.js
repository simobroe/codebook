import React from "react";

// import partials
import Header from "./partials/Header";
import ChatNavigation from "./partials/ChatNavigation";

class Layout extends React.Component {

    render() {
        return (
            <div>
                <Header />
                <div id="spacer"></div>
                <ChatNavigation />
                <div className="wrapper">
                    <div className="container">
                        <div id="content" className="col col-xl-12 col-la-11 col-md-12 col-sm-12 col-xs-12 right">
                            { this.props.children }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

// export into main component
export default Layout;