import React from "react";
import { Link } from "react-router";
import { login } from "../../index";
import { database } from "../../database/database";

class Login extends React.Component {

    constructor() {
        super();
        this.state = {
            errorMessage: null
        }
        this.login = this.login.bind(this);
    }

    login(event) {
        event.preventDefault();
        var email = document.getElementById("txtEmail").value;
        var password = document.getElementById("txtPassword").value;
        var that = this;
        database.auth().signInWithEmailAndPassword(email, password)
        .then( 
            that.setState({errorMessage: null, errorEmail: null, errorPassword: null})
        )
        .catch(function(error) {
            switch(error.code) {
                case "auth/invalid-email":
                that.setState({
                    errorMessage: <p className="errorMessage"><i className='fa fa-exclamation'></i>Please use a valid Email adress.</p>,
                    errorEmail: "errorOverlay", 
                    errorPassword: null
                });
                break;
                case "auth/wrong-password":
                that.setState({
                    errorMessage: <p className="errorMessage"><i className='fa fa-exclamation'></i>Wrong password.</p>,
                    errorEmail: null, 
                    errorPassword: "errorOverlay"
                });
                break;
                case "auth/user-not-found":
                that.setState({
                    errorMessage: <p className="errorMessage"><i className='fa fa-exclamation'></i>No user with this email adress.</p>,
                    errorEmail: "errorOverlay", 
                    errorPassword: null
                });
                break;
                default:
                that.setState({
                    errorMessage: <p className="errorMessage"><i className='fa fa-exclamation'></i>Something went wrong...</p>,
                    errorEmail: null, 
                    errorPassword: null
                });
            }
        });
    }

    render() {
        return (
            <div>
                <div className="wrapper" id="header">
                    <div className="container">
                        <div className="col col-xl-12 col-la-12 col-md-12 col-sm-12 col-xs-12">
                            <div id="branding" className="col col-xl-12 col-la-12 col-md-12 col-sm-12 col-xs-12">
                                <Link to="/">
                                    <img src="images/Codebook_logo.svg" alt="Codebook" />
                                    <h1 className="hideMobile">Codebook</h1>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="spacer"></div>
                <div className="wrapper" id="content">
                    <div className="container">
                        <div id="authentication" className="right col col-xl-4 col-la-4 col-md-12 col-sm-12 col-xs-12">
                            <div className="box cf">
                                <h1>Login</h1>
                                <div className="cf">
                                    { this.state.errorMessage }
                                    <form>
                                        <div className={"wrap " + this.state.errorEmail}>
                                            <input type="text" name="txtEmail" id="txtEmail" required/>
                                            <span className="placeholder">Email</span>
                                        </div>
                                        <div className={"wrap " + this.state.errorPassword}>
                                            <input type="password" name="txtPassword" id="txtPassword" required/>
                                            <span className="placeholder">Password</span>
                                        </div>
                                        <button type="submit" className="right col col-xl-6 col-la-6 col-md-12 col-sm-12 col-xs-12" onClick={this.login}>Login</button>
                                    </form>
                                    <div id="authOptions" className="col col-xl-12 col-la-12 col-md-12 col-sm-12 col-xs-12">
                                        <p>No account? <Link to="/register">Register here</Link></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="welcomeAuth" className="col col-xl-8 col-la-8 hideMobile">
                            <img src="images/Codebook_logo.svg" alt="welcome to Codebook" />
                            <h1>Welcome to Codebook!</h1>
                            <p>Where web developers unite</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;