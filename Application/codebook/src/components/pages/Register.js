import React from "react";
import { Link } from "react-router";
import { database } from "../../database/database";

class Register extends React.Component {

    constructor() {
        super();
        this.state = {
            errorMessages: [],
        }
        this.register = this.register.bind(this);
        this.validate = this.validate.bind(this);
    }

    validate(credentials) {
        var that = this;

        // reset function
        function resetErrors(errorMessage, errorType) {
            var errorToReset = that.state.errorMessages.indexOf(errorMessage);
            if (errorToReset > -1) {
                that.state.errorMessages.splice(errorToReset, 1);
                var key = errorType;
                var value = "null";
                var obj = {};
                obj[key] = value;
                that.setState(obj);
            }
        }

        // set a variable for error messages
        var errors = that.state.errorMessages;

        // set an object for error messages
        var errorMessages = {
            errorFirstName: "Fill in your first name.",
            errorLastName: "fill in your last name.",
            errorEmailValid: "Fill in a valid email adress.",
            errorEmailInUse: "Email adress already in use",
            errorPasswordLonger: "Use a longer password",
            errorPasswordMatch: "Passwords must match.",
            errorDayOfBirth: "You are too young.",
            errorDayOfBirthEmpty: "Fill in your day of birth."
        }

        // set up variables to calculate legal age
        var yearofbirth = parseInt(credentials.dayofbirth.substring(0, credentials.dayofbirth.indexOf("-")), 10);
        var legalYear = parseInt(new Date().getFullYear(), 10) - 13;

        // set up mail format
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        // reset email in use error to check again later
        resetErrors(errorMessages.errorEmailInUse, "errorEmail");

        // check first name
        if (credentials.firstname.length === 0) {
            resetErrors(errorMessages.errorFirstName, "errorFirstName")
            errors.push(errorMessages.errorFirstName);
            that.setState({errorMessages: errors, errorFirstName: "errorOverlay"});
        } else {
            resetErrors(errorMessages.errorFirstName, "errorFirstName");
        }

        // check last name
        if (credentials.lastname.length === 0) {
            resetErrors(errorMessages.errorLastName, "errorLastName")
            errors.push(errorMessages.errorLastName);
            that.setState({errorMessages: errors, errorLastName: "errorOverlay"});
        } else {
            resetErrors(errorMessages.errorLastName, "errorLastName")
        }

        // check if email a valid format
        if (!credentials.email.match(mailformat)) {
            resetErrors(errorMessages.errorEmailValid, "errorEmail");
            errors.push(errorMessages.errorEmailValid);
            that.setState({errorMessages: errors, errorEmail: "errorOverlay"});
        } else {
            resetErrors(errorMessages.errorEmailValid, "errorEmail");
        }

        // check passwords match
        if (credentials.password !== credentials.passwordconfirm) {
            resetErrors(errorMessages.errorPasswordMatch, "errorPasswordMatch");
            errors.push(errorMessages.errorPasswordMatch);
            that.setState({errorMessages: errors, errorPasswordMatch: "errorOverlay"});
        } else {
            resetErrors(errorMessages.errorPasswordMatch, "errorPasswordMatch");
        }

        // check password length
        if (credentials.password.length < 6) {
            resetErrors(errorMessages.errorPasswordLonger, "errorPassword");
            errors.push(errorMessages.errorPasswordLonger);
            that.setState({errorMessages: errors, errorPassword: "errorOverlay"});
        } else {
            resetErrors(errorMessages.errorPasswordLonger, "errorPassword");
        }

        // check day of brith filled in
        if (credentials.dayofbirth.length === 0) {
            resetErrors(errorMessages.errorDayOfBirthEmpty, "errorDayOfBirthEmpty");
            errors.push(errorMessages.errorDayOfBirthEmpty);
            that.setState({errorMessages: errors, errorDayOfBirth: "errorOverlay"});
        } else {
            resetErrors(errorMessages.errorDayOfBirthEmpty, "errorDayOfBirthEmpty");
        }

        // check legal age is correct
        if ((legalYear - yearofbirth) < 0) {
            that.setState({errorMessages: [errorMessages.errorDayOfBirth], errorDayOfBirth: "errorOverlay"});
        } else {
            resetErrors(errorMessages.errorDayOfBirth, "errorDayOfBirth");
        }
    }

    register(event) {
        var that = this;

        // prevent default form action
        event.preventDefault();

        // get credentials from the user
        var credentials = {
            email: document.getElementById("txtEmail").value,
            password: document.getElementById("txtPassword").value,
            passwordconfirm: document.getElementById("txtPasswordConfirm").value,
            firstname: document.getElementById("txtFirstName").value,
            lastname: document.getElementById("txtLastName").value,
            dayofbirth: document.getElementById("txtDayOfBirth").value
        }

        // validate credentials
        that.validate(credentials);

        // if validation is succesfull
        if (that.state.errorMessages.length === 0) {
            database.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
            .then( user => {
                // if registration is succesfull, save info to database
                database.database().ref().child(`users/${user.uid}`)
                .set({
                    email: user.email,
                    uid: user.uid,
                    firstName: credentials.firstname,
                    lastName: credentials.lastname,
                    dayOfBirth: credentials.dayofbirth,
                })
            })
            .catch(function(error) {
                // if email is already taken by other user
                that.setState({errorMessages: ["email already in use."]})
            });
        }
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
                <div className="wrapper">
                    <div className="container">
                        <div id="content" className="col col-xl-12 col-la-12 col-md-12 col-sm-12 col-xs-12">
                            <div id="authentication" className="right col col-xl-4 col-la-4 col-md-6 col-sm-12 col-xs-12">
                                <div className="box cf">
                                    <h1>Register</h1>
                                    <div className="cf">
                                        { this.state.errorMessages.map(function(item) {
                                            return <p className="errorMessage"><i className='fa fa-exclamation'></i>{ item }</p>
                                        })}
                                        <form>
                                            <div className={"wrap " + this.state.errorFirstName}>
                                                <input type="text" name="txtFirstName" id="txtFirstName" required/> 
                                                <span className="placeholder">First name</span>
                                            </div>
                                            <div className={"wrap " + this.state.errorLastName}>
                                                <input type="text" name="txtLastName" id="txtLastName" required/>
                                                <span className="placeholder">Last name</span>
                                            </div>
                                            <div className={"wrap " + this.state.errorEmail}>
                                                <input type="text" name="txtEmail" id="txtEmail" required/>
                                                <span className="placeholder">Email</span>
                                            </div>
                                            <div className={"wrap " + this.state.errorPassword}>
                                                <input type="password" name="txtPassword" id="txtPassword" required/>
                                                <span className="placeholder">Password</span>
                                            </div>
                                            <div className={"wrap " + this.state.errorPasswordMatch}>
                                                <input type="password" name="txtPasswordConfirm" id="txtPasswordConfirm" required/>
                                                <span className="placeholder">Confirm password</span>
                                            </div>
                                            <div className={"wrap " + this.state.errorDayOfBirth}>
                                                <input type="date" name="txtDayOfBirth" id="txtDayOfBirth" required/>
                                                <span className="placeholder">Day of birth</span>
                                            </div>
                                            <button type="submit" className="right col col-xl-6 col-la-6 col-md-12 col-sm-12 col-xs-12" onClick={this.register}>Register</button>
                                        </form>
                                        <div id="authOptions" className="col col-xl-12 col-la-12 col-md-12 col-sm-12 col-xs-12">
                                            <p>Already have an account? <Link to="/login">Login</Link></p>
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
            </div>
        );
    }
}

export default Register;