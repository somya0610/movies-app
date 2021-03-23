import React, { Component } from 'react';
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
            password: '',
            usernameRequired: 'dispNone',
            passwordRequired: 'dispNone',
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
        };
    }

    openModelHandler = () => {
        this.setState({
            modalIsopen: true,
            value: 0,
            username: '',
            password: '',
            usernameRequired: 'dispNone',
            passwordRequired: 'dispNone',
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
        this.state.password === "" ? this.setState({ passwordRequired: 'dispBlock' }) : this.setState({ passwordRequired: 'dispNone' })
    }

    inputUsernameChangeHandler = (event) => {
        this.setState({ username: event.target.value })
    }

    inputPasswordChangeHandler = (event) => {
        this.setState({ password: event.target.value })
    }

    registerClickHandler = () => {
        this.state.firstname === "" ? this.setState({ firstnameRequired: 'dispBlock' }) : this.setState({ firstnameRequired: 'dispNone' });
        this.state.lastname === "" ? this.setState({ lastnameRequired: 'dispBlock' }) : this.setState({ lastnameRequired: 'dispNone' });
        this.state.email === "" ? this.setState({ emailRequired: 'dispBlock' }) : this.setState({ emailRequired: 'dispNone' });
        this.state.passwordReg === "" ? this.setState({ passwordRegRequired: 'dispBlock' }) : this.setState({ passwordRegRequired: 'dispNone' });
        this.state.contact === "" ? this.setState({ contactRequired: 'dispBlock' }) : this.setState({ contactRequired: 'dispNone' });
    }

    inputFirstNameChangeHandler = (event) => {
        this.setState({firstname: event.target.value})
    }

    inputlastNameChangeHandler = (event) => {
        this.setState({lastname: event.target.value})
    }

    inputEmailChangeHandler = (event) => {
        this.setState({email: event.target.value})
    }

    inputPasswordRegChangeHandler = (event) => {
        this.setState({passwordReg: event.target.value})
    }

    inputContactChangeHandler = (event) => {
        this.setState({contact: event.target.value})
    }

    render() {
        return (
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="Movies App Logo"></img>
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModelHandler}>Login</Button>
                    </div>
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
                                <InputLabel htmlFor="password">Password </InputLabel>
                                <Input id="password" type="password" password={this.state.password}
                                    onChange={this.inputPasswordChangeHandler} />
                                <FormHelperText className={this.state.passwordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
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
                            <Button variant="contained" color="primary" onClick={this.registerClickHandler}>REGISTER</Button>
                        </TabContainer>}
                </Modal>
            </div>
        )
    }
}

export default Header;