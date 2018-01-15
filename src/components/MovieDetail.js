/* eslint react/no-did-mount-set-state: 0,
   eslint Unexpected console statement: 0
*/

import React, { Component } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class MovieDetail extends Component {
  state = {
    movie: {},
  }

  async componentDidMount() {
    try {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${this.props.match.params.id}?api_key=6d6bfb73cf9249c6823b66d288187dd8&append_to_response=videos&language=en-US`);
	  const movie = await res.json();
	  const videoList = movie.videos.results.map(video => video.key);
	  const youtubePrefix = videoList[0];
      this.setState({
        movie,
        youtubePrefix,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { movie } = this.state;
    const TRAILOR_PATH = this.state.youtubePrefix;
    const opts = {
      height: '190',
      width: '340',
      playerVars: {
        autoplay: 0,
      },
    };
    return (
      <MovieWrapper backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}>
        <MovieInfo>
          <Overdrive id={movie.id}>
            <Poster src={`${POSTER_PATH}${movie.poster_path}`} alt={this.state.movie.title} />
          </Overdrive>
          <div>
            <h1>{this.state.movie.title}</h1>
            <p><span className="subDetails">Release Date: </span> {this.state.movie.release_date}</p>
            <p><span className="subDetails">Rating: </span> {this.state.movie.vote_average}</p>
            <div className="container">
              <div className="containerLeft">
                <p className="synopsis">Synopsis:</p>
                <p>{this.state.movie.overview}</p>
              </div>
              <div className="containerRight">
                <YouTube videoId={`${TRAILOR_PATH}`} opts={opts} onReady={this._onReady} />
              </div>
            </div>
          </div>
        </MovieInfo>
      </MovieWrapper>
    );
  }
}

export default MovieDetail;

const MovieWrapper = styled.div`
  position: relative;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const MovieInfo = styled.div`
  background: white;
  text-align: left;
  padding: 2rem 10%;
  display: flex;
  > div {
    margin-left: 20px;
  }
  img {
    position: relative;
    top: -5rem;
  }
`;
