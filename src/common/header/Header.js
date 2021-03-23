import React, {Component} from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsopen: false,
            value: 0
        };
    }

    openModelHandler = () => {
        this.setState({modalIsopen: true})
    }

    closeModalHandler = () => {
        this.setState({modalIsopen: false})
    }

    changeHandler = (event, value) => {
        this.setState({value});
    }

    render() {
        return  (
            <div>
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="Movies App Logo"></img>
                    <div className="login-button">
                        <Button variant="contained" color="default" onClick={this.openModelHandler}>Login</Button>
                    </div>
                </header>
                <Modal ariaHideApp={false} isOpen={this.state.modalIsopen} contentLabel="Login" onRequestClose={this.closeModalHandler}>
                    <Tabs value={this.state.value} onChange={this.changeHandler} >
                        <Tab label="Login" />
                        <Tab label="Register" />
                    </Tabs>
                </Modal>
            </div>
        )
    }
}

export default Header;