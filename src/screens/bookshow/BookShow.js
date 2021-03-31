import React, { Component } from 'react';
//import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
//import Home from '../home/Home';
//import Confirmation from '../confirmation/Confirmation';
import './BookShow.css';
// import language from '../../common/language';
// import location from '../../common/location';
// import showDate from '../../common/showDate';
// import showTime from '../../common/showTime';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Link } from 'react-router-dom';

class BookShow extends Component {

    constructor() {
        super();
        this.state = {
            location: "",
            theatre: "",
            language: "",
            showDate: "",
            // showTime: "",
            tickets: 0,
            locationRequired: 'dispNone',
            theatreRequired: "dispNone",
            languageRequired: 'dispNone',
            showDateRequired: 'dispNone',
            // showTimeRequired: 'dispNone',
            ticketsRequired: 'dispNone',
            unitPrice: 500,
            availableTickets: 20,
            locations: [],
            languages: [],
            theatres: [],
            showDates: [],
            showTimes: [],
            originalShows: []
        }
    }

    componentWillMount() {
        let that = this;
        let dataShows = null;
        let xhrShows = new XMLHttpRequest();
        xhrShows.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                let response = JSON.parse(this.responseText);
                that.setState({ originalShows: response.shows });
                let newLocations = [];

                for (let show of response.shows) {
                    newLocations.push({ id: show.theatre.city, location: show.theatre.city });
                }

                newLocations = newLocations.filter((loc, index, self) =>
                    index === self.findIndex((c) => (
                        c.id === loc.id
                    ))
                )

                that.setState({ locations: newLocations })
            }
        })

        xhrShows.open("GET", this.props.baseUrl + "movies/" + this.props.match.params.id + "/shows");
        xhrShows.setRequestHeader("Cache-Control", "no-cache");
        xhrShows.send(dataShows);
    }

    // backToDetailsHandler = () => {
    //     ReactDOM.render(<Home />, document.getElementById('root'));
    // }

    locationChangeHandler = (event) => {
        this.setState({ location: event.target.value });
        let newTheatres = [];

        for (let show of this.state.originalShows) {
            if (show.theatre.city === event.target.value) {
                newTheatres.push({ id: show.theatre.name, theatre: show.theatre.name });
            }
        }

        newTheatres = newTheatres.filter((theatre, index, self) =>
            index === self.findIndex((t) => (
                t.id === theatre.id
            ))
        )

        this.setState({ theatres: newTheatres });
    }

    theatreChangeHandler = event => {
        this.setState({ theatre: event.target.value });

        let newLanguages = [];

        for (let show of this.state.originalShows) {
            if (show.theatre.city === this.state.location && show.theatre.name === event.target.value) {
                newLanguages.push({ id: show.language, language: show.language });
            }
        }

        newLanguages = newLanguages.filter((lang, index, self) =>
            index === self.findIndex((l) => (
                l.id === lang.id
            ))
        )
        this.setState({ languages: newLanguages });
    }

    languageChangeHandler = (event) => {
        this.setState({ language: event.target.value });
        let newShowDates = [];

        for (let show of this.state.originalShows) {
            if (show.theatre.city === this.state.location && show.theatre.name === this.state.theatre && show.language === event.target.value) {
                newShowDates.push({ id: show.show_timing, showDate: show.show_timing });
            }
        }

        newShowDates = newShowDates.filter((date, index, self) =>
            index === self.findIndex((d) => (
                d.id === date.id
            ))
        )

        this.setState({ showDates: newShowDates });
    }

    showDateChangeHandler = (event) => {
        this.setState({ showDate: event.target.value });
        let unitPrice = 0;
        let availableTickets = 0;

        for (let show of this.state.originalShows) {
            if (show.theatre.city === this.state.location && show.theatre.name === this.state.theatre && show.language === this.state.language && show.show_timing === event.target.value) {
                unitPrice = show.unit_price;
                availableTickets = show.available_seats;
                this.setState({ showId: show.id });
            }
        }

        this.setState({ unitPrice: unitPrice, availableTickets: availableTickets });
    }

    // showTimeChangeHandler = (event) => {
    //     this.setState({ showTime: event.target.value });
    // }

    ticketsChangeHandler = (event) => {
        // this.setState({ tickets: event.target.value });
        this.setState({ tickets: event.target.value.split(",") });
    }

    bookShowButtonHandler = () => {
        this.state.location === "" ? this.setState({ locationRequired: 'dispBlock' }) : this.setState({ locationRequired: 'dispNone' });
        this.state.theatre === "" ? this.setState({ theatreRequired: "dispBlock" }) : this.setState({ theatreRequired: "dispNone" });
        this.state.language === "" ? this.setState({ languageRequired: 'dispBlock' }) : this.setState({ languageRequired: 'dispNone' });
        this.state.showDate === "" ? this.setState({ showDateRequired: 'dispBlock' }) : this.setState({ showDateRequired: 'dispNone' });
        // this.state.showTime === "" ? this.setState({ showTimeRequired: 'dispBlock' }) : this.setState({ showTimeRequired: 'dispNone' });
        this.state.tickets === 0 ? this.setState({ ticketsRequired: 'dispBlock' }) : this.setState({ ticketsRequired: 'dispNone' });

        //ReactDOM.render(<Confirmation bookingSummary={this.state} />, document.getElementById('root'));

        if ((this.state.location === "") || (this.state.theatre === "")
            || (this.state.language === "") || (this.state.showDate === "")
            || (this.state.tickets === 0)) {
            return;
        }

        this.props.history.push({
            pathname: '/confirm/' + this.props.match.params.id,
            bookingSummary: this.state
        })
    }

    render() {
        return (
            <div>
                <div>
                    <Header />
                </div>
                <div className="bookShow">
                    {/* <Typography className="back" onClick={this.backToDetailsHandler}>
                        &#60; Back To Movie Details
                    </Typography> */}
                    <Typography className="back" >
                        <Link to={"/movie/" + this.props.match.params.id}>&#60; Back to Movie Details</Link>
                    </Typography>
                </div>
                <Card className="cardStyle">
                    <CardContent>
                        <Typography variant="h5">BOOK SHOW</Typography>
                        <br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="location">Choose Location: </InputLabel>
                            <Select
                                value={this.state.location}
                                onChange={this.locationChangeHandler}>
                                {/* {location.map(loc => ( */}
                                {this.state.locations.map(loc => (
                                    <MenuItem key={"loc" + loc.id} value={loc.location}>
                                        {loc.location}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText className={this.state.locationRequired}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="theatre">Choose Theatre:</InputLabel>
                            <Select
                                value={this.state.theatre}
                                onChange={this.theatreChangeHandler}
                            >
                                {this.state.theatres.map(th => (
                                    <MenuItem key={"theatre" + th.id} value={th.theatre}>
                                        {th.theatre}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText className={this.state.theatreRequired}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="language">Choose Language: </InputLabel>
                            <Select
                                value={this.state.language}
                                onChange={this.languageChangeHandler}>
                                {/* {language.map(lang => ( */}
                                {this.state.languages.map(lang => (
                                    <MenuItem key={"lang" + lang.id} value={lang.language}>
                                        {lang.language}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText className={this.state.languageRequired}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <FormControl required className="formControl">
                            <InputLabel htmlFor="showDate">Choose Show Date: </InputLabel>
                            <Select
                                value={this.state.showDate}
                                onChange={this.showDateChangeHandler}>
                                {/* {showDate.map(date => ( */}
                                {this.state.showDates.map(sd => (
                                    <MenuItem key={"showDate" + date.id} value={date.showDate}>
                                        {date.showDate}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText className={this.state.showDateRequired}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        {/* <FormControl required className="formControl">
                            <InputLabel htmlFor="showTime">Choose Show Time: </InputLabel>
                            <Select
                                value={this.state.showTime}
                                onChange={this.showTimeChangeHandler}>
                                {showTime.map(time => (
                                    <MenuItem key={"showTime" + time.id} value={time.showTime}>
                                        {time.showTime}
                                    </MenuItem>
                                ))}
                            </Select>
                            <FormHelperText className={this.state.showTimeRequired}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br /> */}
                        <FormControl required className="formControl">
                            {/* <InputLabel htmlFor="tickets">Tickets: ({this.state.availableTickets} available)</InputLabel> */}
                            <InputLabel htmlFor="tickets">Seat Selection: ( {this.state.availableTickets} available )</InputLabel>
                            <Input id="tickets" value={this.state.tickets !== 0 ? this.state.tickets : ""} onChange={this.ticketsChangeHandler} />
                            <FormHelperText className={this.state.ticketsRequired}>
                                <span className="red">Required</span>
                            </FormHelperText>
                        </FormControl>
                        <br /><br />
                        <Typography>
                            Unit Price: Rs {this.state.unitPrice}
                        </Typography>
                        <Typography>
                            {/* Total Price: Rs {this.state.unitPrice * this.state.tickets} */}
                            Total Price: Rs. {this.state.unitPrice * this.state.tickets.length}
                        </Typography>
                        <br /><br />
                        <Button variant="contained" color="primary" onClick={this.bookShowButtonHandler}>Book Show</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }
}

export default BookShow;