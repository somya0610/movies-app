import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import Home from '../home/Home';
import './BookShow.css';
import language from '../../common/language';
import location from '../../common/location';
import showDate from '../../common/showDate';
import showTime from '../../common/showTime';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

class BookShow extends Component {

    constructor() {
        super();
        this.state = {
            location: ""
        }
    }

    backToDetailsHandler = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }

    locationChangeHandler =(event) => {
        this.setState({location: event.target.value});
    }

    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div className="bookShow">
                    <Typography className="back" onClick={this.backToDetailsHandler}>
                        &#60; Back To Movie Details
                    </Typography>
                </div>
                <Card className="cardStyle">
                    <CardContent>
                        <Typography variant="heading" component="h2">BOOK SHOW</Typography>
                        <br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="location">Choose Location: </InputLabel>
                            <Select
                                value={this.state.location}
                                onChange={this.locationChangeHandler}>
                                {location.map(loc => (
                                    <MenuItem key={loc.id} value={loc.location}>
                                        {loc.location}
                                    </MenuItem>
                                ))}</Select>
                        </FormControl>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default BookShow;