import React, { Component } from 'react';
import Header from '../../common/header/Header';
import './Details.css';
import moviesData from '../../common/movieData';
import Typography from '@material-ui/core/Typography';

class Details extends Component {

    constructor() {
        super();
        this.state = {
            movie: {}
        }
    }

    componentWillMount() {
        let currState = this.state;
        currState.movie = moviesData.filter(mov => {
            return mov.id === this.props.movieId
        })[0];
        this.setState({ currState });
        console.log(this.state);
    }

    render() {
        let movie = this.state.movie;
        return (
            <div className="details">
                <Header />
                <div className="flex-containerDetails">
                    <div className="leftDetails">
                        <img src={movie.poster_url} alt={movie.title} />
                    </div>
                    <div className="middleDetails">
                        <div>
                            <Typography variant="headline" component="h2">{movie.title}</Typography>
                        </div>
                        <div>
                            <Typography>
                                <span className="bold">Genre:</span> {movie.genres.join(', ')}
                            </Typography>
                        </div>
                    </div>
                    <div className="rightDetails">

                    </div>
                </div>
            </div>
        );
    }
}

export default Details;