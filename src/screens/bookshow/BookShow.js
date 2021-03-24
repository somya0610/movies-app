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
            location: "",
            language: "",
            showDate: "",
            showTime: ""
        }
    }

    backToDetailsHandler = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }

    locationChangeHandler =(event) => {
        this.setState({location: event.target.value});
    }

    languageChangeHandler =(event) => {
        this.setState({language: event.target.value});
    }

    showDateChangeHandler =(event) => {
        this.setState({showDate: event.target.value});
    }

    showTimeChangeHandler =(event) => {
        this.setState({showTime: event.target.value});
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
                                    <MenuItem key={"loc" + loc.id} value={loc.location}>
                                        {loc.location}
                                    </MenuItem>
                                ))}</Select>
                        </FormControl>
                        <br /><br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="language">Choose Language: </InputLabel>
                            <Select
                                value={this.state.language}
                                onChange={this.languageChangeHandler}>
                                {language.map(lang => (
                                    <MenuItem key={"lang" + lang.id} value={lang.language}>
                                        {lang.language}
                                    </MenuItem>
                                ))}</Select>
                        </FormControl>
                        <br /><br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="showDate">Choose Show Date: </InputLabel>
                            <Select
                                value={this.state.showDate}
                                onChange={this.showDateChangeHandler}>
                                {showDate.map(date => (
                                    <MenuItem key={"showDate" + date.id} value={date.showDate}>
                                        {date.showDate}
                                    </MenuItem>
                                ))}</Select>
                        </FormControl>
                        <br /><br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="showTime">Choose Show Time: </InputLabel>
                            <Select
                                value={this.state.showTime}
                                onChange={this.showTimeChangeHandler}>
                                {showTime.map(time => (
                                    <MenuItem key={"showTime" + time.id} value={time.showTime}>
                                        {time.showTime}
                                    </MenuItem>
                                ))}</Select>
                        </FormControl>
                        <br /><br />
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default BookShow;