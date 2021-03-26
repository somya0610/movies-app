import React, { Component } from 'react';
//import ReactDom from 'react-dom';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
//import BookShow from '../../screens/bookshow/BookShow';
import { Link } from 'react-router-dom';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
}

const TabContainer = function (props) {
    return (
        <Typography component="div" style={{ padding: 0, textAlign: 'center' }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired
}

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsopen: false,
            value: 0,
            username: '',
            loginPassword: '',
            usernameRequired: 'dispNone',
            loginPasswordRequired: 'dispNone',
            firstname: '',
            lastname: '',
            email: '',
            passwordReg: '',
            contact: '',
            firstnameRequired: 'dispNone',
            lastnameRequired: 'dispNone',
            emailRequired: 'dispNone',
            passwordRegRequired: 'dispNone',
            contactRequired: 'dispNone',
            registrationSuccess: false,
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true
        };
    }

    openModelHandler = () => {
        this.setState({
            modalIsopen: true,
            value: 0,
            username: '',
            loginPassword: '',
            usernameRequired: 'dispNone',
            loginPasswordRequired: 'dispNone',
            firstname: '',
            lastname: '',
            email: '',
            passwordReg: '',
            contact: '',
            firstnameRequired: 'dispNone',
            lastnameRequired: 'dispNone',
            emailRequired: 'dispNone',
            passwordRegRequired: 'dispNone',
            contactRequired: 'dispNone'
        })
    }

    closeModalHandler = () => {
        this.setState({ modalIsopen: false })
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: 'dispBlock' }) : this.setState({ usernameRequired: 'dispNone' });
        this.state.loginPassword === "" ? this.setState({ loginPasswordRequired: 'dispBlock' }) : this.setState({ loginPasswordRequired: 'dispNone' })

        let dataLogin = null;
        let xhrLogin = new XMLHttpRequest();
        let that = this;
        xhrLogin.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                sessionStorage.setItem("uuid", JSON.parse(this.responseText).id);
                sessionStorage.setItem("access-token", xhrLogin.getResponseHeader("access-token"));

                that.setState({loggedIn: true });

                that.closeModalHandler();
            }
        });

        xhrLogin.open("POST", this.props.baseUrl + "auth/login");
        xhrLogin.setRequestHeader("Authorization", "Basic " + window.btoa(this.state.username + ":" + this.state.loginPassword));
        xhrLogin.setRequestHeader("Content-Type", "application/json");
        xhrLogin.setRequestHeader("Cache-Control", "no-cache");
        xhrLogin.send(dataLogin);
    }

    inputUsernameChangeHandler = (event) => {
        this.setState({ username: event.target.value })
    }

    inputLoginPasswordChangeHandler = (event) => {
        this.setState({ loginPassword: event.target.value })
    }

    registerClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: 'dispBlock' }) : this.setState({ firstnameRequired: 'dispNone' });
        this.state.lastname === "" ? this.setState({ lastnameRequired: 'dispBlock' }) : this.setState({ lastnameRequired: 'dispNone' });
        this.state.email === "" ? this.setState({ emailRequired: 'dispBlock' }) : this.setState({ emailRequired: 'dispNone' });
        this.state.passwordReg === "" ? this.setState({ passwordRegRequired: 'dispBlock' }) : this.setState({ passwordRegRequired: 'dispNone' });
        this.state.contact === "" ? this.setState({ contactRequired: 'dispBlock' }) : this.setState({ contactRequired: 'dispNone' });

        let dataSignup = JSON.stringify({
            "email_address": this.state.email,
            "first_name": this.state.firstname,
            "last_name": this.state.lastname,
            "mobile_number": this.state.contact,
            "password": this.state.registerPassword
        });

        let xhrSignup = new XMLHttpRequest();
        let that = this;
        xhrSignup.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                console.log(JSON.parse(this.responseText));
                that.setState({registrationSuccess: true
                });
            }
        });

        xhrSignup.open("POST", this.props.baseUrl + "signup");
        xhrSignup.setRequestHeader("Content-Type", "application/json");
        xhrSignup.setRequestHeader("Cache-Control", "no-cache");
        xhrSignup.send(dataSignup);
    }

    inputFirstNameChangeHandler = (event) => {
        this.setState({ firstname: event.target.value })
    }

    inputlastNameChangeHandler = (event) => {
        this.setState({ lastname: event.target.value })
    }

    inputEmailChangeHandler = (event) => {
        this.setState({ email: event.target.value })
    }

    inputPasswordRegChangeHandler = (event) => {
        this.setState({ passwordReg: event.target.value })
    }

    inputContactChangeHandler = (event) => {
        this.setState({ contact: event.target.value })
    }

    // bookshowHandler = () => {
    //     ReactDom.render(<BookShow />, document.getElementById('root'));
    // }

    logoutHandler = (e) => {
        sessionStorage.removeItem("uuid");
        sessionStorage.removeItem("access-token");

        this.setState({
            loggedIn: false
        });
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="Movies App Logo"></img>
                    {/* <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModelHandler}>Login</Button>
                    </div> */}
                    {!this.state.loggedIn ?
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.openModalHandler}>
                                Login
                            </Button>
                        </div>
                        :
                        <div className="login-button">
                            <Button variant="contained" color="default" onClick={this.logoutHandler}>
                                Logout
                            </Button>
                        </div>
                    }
                    {this.props.showBookShowButton === "true" ?
                        <div className="bookshow-button">
                            {/* <Button variant="contained" color="primary" onClick={this.bookshowHandler}>Book Show</Button> */}
                            <Link to={"/bookshow/" + this.props.id}>
                                <Button variant="contained" color="primary">
                                    Book Show
                                </Button>
                            </Link>
                        </div> : ""}
                </header>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsopen} contentLabel="Login" onRequestClose={this.closeModalHandler}
                    style={customStyles}>
                    <Tabs className="tabs" value={this.state.value} onChange={this.tabChangeHandler} >
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                    {this.state.value === 0 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="userName">Username </InputLabel>
                                <Input id="userName" type="text" username={this.state.username}
                                    onChange={this.inputUsernameChangeHandler} />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="loginPassword">Password </InputLabel>
                                <Input id="loginPassword" type="password" loginpassword={this.state.loginPassword}
                                    onChange={this.inputLoginPasswordChangeHandler} />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.loggedIn === true &&
                                <FormControl>
                                    <span className="successText">
                                        Login Successful!
                                    </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                        </TabContainer>}
                    {this.state.value === 1 &&
                        <TabContainer>
                            <FormControl required>
                                <InputLabel htmlFor="firstName">First Name </InputLabel>
                                <Input id="firstName" type="text" firstname={this.state.firstname}
                                    onChange={this.inputFirstNameChangeHandler} />
                                <FormHelperText className={this.state.firstnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="lastName">Last Name </InputLabel>
                                <Input id="lastName" type="text" lastname={this.state.lastname}
                                    onChange={this.inputlastNameChangeHandler} />
                                <FormHelperText className={this.state.lastnameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="email">Email </InputLabel>
                                <Input id="email" type="text" email={this.state.email}
                                    onChange={this.inputEmailChangeHandler} />
                                <FormHelperText className={this.state.emailRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="passwordReg">Password </InputLabel>
                                <Input id="passwordReg" type="password" passwordreg={this.state.passwordReg}
                                    onChange={this.inputPasswordRegChangeHandler} />
                                <FormHelperText className={this.state.passwordRegRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required>
                                <InputLabel htmlFor="contact">Contact No. </InputLabel>
                                <Input id="contact" type="text" contact={this.state.contact}
                                    onChange={this.inputContactChangeHandler} />
                                <FormHelperText className={this.state.contactRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            {this.state.registrationSuccess === true &&
                                <FormControl>
                                    <span className="successText">
                                        Registration Successful. Please Login!
                                      </span>
                                </FormControl>
                            }
                            <br /><br />
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </TabContainer>}
                </Modal>
            </div>
        )
    }
}

export default Header;