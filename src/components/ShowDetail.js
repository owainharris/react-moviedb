/* eslint react/no-did-mount-set-state: 0,
   eslint Unexpected console statement: 0
*/

import React, { Component } from 'react';
import styled from 'styled-components';
import Overdrive from 'react-overdrive';
import { Poster } from './Movie';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w154';
const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

class ShowDetail extends Component {
  state = {
    show: {},
  }

  async componentDidMount() {
    try {
      const res2 = await fetch(`https://api.themoviedb.org/3/tv/${this.props.match.params.id}?api_key=6d6bfb73cf9249c6823b66d288187dd8&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&include_null_first_air_dates=false`);
	  const show = await res2.json();
	  console.log(show);
      this.setState({
        show,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    const { show } = this.state;
    return (
      <ShowWrapper backdrop={`${BACKDROP_PATH}${show.backdrop_path}`}>
        <ShowInfo>
          <Overdrive id={show.id}>
            <Poster src={`${POSTER_PATH}${show.poster_path}`} alt={this.state.show.title} />
          </Overdrive>
          <div>
            <h1>{this.state.show.title}</h1>
            <p><span className="subDetails">Release Date: </span> {this.state.show.first_air_date}</p>
            <p><span className="subDetails">Rating: </span> {this.state.show.vote_average}</p>
            <p className="synopsis">Synopsis:</p>
            <p>{this.state.show.overview}</p>
          </div>
        </ShowInfo>
      </ShowWrapper>
    );
  }
}

export default ShowDetail;

const ShowWrapper = styled.div`
  position: relative;
  containerRight: text-align: center;
  padding-top: 50vh;
  background: url(${props => props.backdrop}) no-repeat;
  background-size: cover;
`;

const ShowInfo = styled.div`
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
