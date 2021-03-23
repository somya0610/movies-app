import React, {Component} from 'react';
import './Header.css';
import Button from '@material-ui/core/Button';
import logo from '../../assets/logo.svg';
import Modal from 'react-modal';

class Header extends Component {

    constructor() {
        super();
        this.state = {
            modalIsopen: false
        };
    }

    openModelHandler = () => {
        this.setState({modalIsopen: true})
    }

    closeModalHandler = () => {
        this.setState({modalIsopen: false})
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

                </Modal>
            </div>
        )
    }
}

export default Header;